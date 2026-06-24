import heic2any from 'heic2any';
import { jsPDF } from 'jspdf';

const mimeTypes = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  avif: 'image/avif'
};

// Helper to load an image from URL
const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = url;
  });
};

// Helper to convert blob to data URL
const blobToDataURL = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(blob);
  });
};

const applyWatermark = (ctx, finalWidth, finalHeight, watermark) => {
  if (!watermark || !watermark.text) return;
  const { text, color = '#ffffff', position = 'bottom-right', opacity = 0.5 } = watermark;
  
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  
  const fontSize = Math.max(16, Math.floor(finalWidth * 0.05));
  ctx.font = `bold ${fontSize}px sans-serif`;
  
  const textMetrics = ctx.measureText(text);
  const textWidth = textMetrics.width;
  const padding = fontSize * 0.5;
  
  let x = padding;
  let y = padding + fontSize;
  
  if (position === 'bottom-right') {
    x = finalWidth - textWidth - padding;
    y = finalHeight - padding;
  } else if (position === 'center') {
    x = (finalWidth - textWidth) / 2;
    y = (finalHeight + fontSize * 0.3) / 2;
  } else if (position === 'bottom-left') {
    x = padding;
    y = finalHeight - padding;
  } else if (position === 'top-right') {
    x = finalWidth - textWidth - padding;
    y = padding + fontSize;
  }

  // Draw slight shadow for contrast
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  ctx.fillText(text, x, y);
  ctx.restore();
};

// SVG Sanitizer using browser native parser (mendeteksi XSS / tag script berbahaya)
export const sanitizeSvgContent = (svgText) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  
  const parserError = doc.querySelector('parsererror');
  if (parserError) {
    throw new Error("Invalid SVG structure");
  }
  
  // Remove all <script> nodes
  const scripts = doc.getElementsByTagName('script');
  while (scripts.length > 0) {
    scripts[0].parentNode.removeChild(scripts[0]);
  }

  // Remove event handlers and javascript: link targets
  const allElements = doc.getElementsByTagName('*');
  for (let i = 0; i < allElements.length; i++) {
    const el = allElements[i];
    const attrs = Array.from(el.attributes);
    for (const attr of attrs) {
      const attrName = attr.name.toLowerCase();
      if (attrName.startsWith('on')) {
        el.removeAttribute(attr.name);
      } else if (['href', 'xlink:href'].includes(attrName) && 
                 attr.value.trim().toLowerCase().startsWith('javascript:')) {
        el.removeAttribute(attr.name);
      }
    }
  }

  const serializer = new XMLSerializer();
  return serializer.serializeToString(doc);
};

export const convertImage = async (file, targetFormat, options = { quality: 0.92, scale: 1.0 }) => {
  let activeBlob = file;

  // Security Sanitization: If input file is SVG, sanitize it first
  if (file.type.includes('svg') || file.name.toLowerCase().endsWith('.svg')) {
    try {
      const text = await file.text();
      const sanitized = sanitizeSvgContent(text);
      activeBlob = new Blob([sanitized], { type: 'image/svg+xml' });
    } catch (err) {
      console.error("SVG security sanitization failed", err);
      throw new Error("Security Alert: SVG file contains malformed or dangerous XML structures.");
    }
  }

  // 1. Pre-process HEIC/HEIF files
  if (file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
    const converted = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: options.quality || 0.92
    });
    activeBlob = Array.isArray(converted) ? converted[0] : converted;
  }

  // 2. SVG Processing or Raster Formatting via Canvas
  const objectUrl = URL.createObjectURL(activeBlob);
  
  try {
    const img = await loadImage(objectUrl);
    
    // If target format is PDF, use jsPDF
    if (targetFormat.toLowerCase() === 'pdf') {
      const finalWidth = options.resizeWidth || (img.width * (options.scale || 1.0));
      const finalHeight = options.resizeHeight || (img.height * (options.scale || 1.0));

      const doc = new jsPDF({
        orientation: finalWidth > finalHeight ? 'landscape' : 'portrait',
        unit: 'px',
        format: [finalWidth, finalHeight]
      });
      
      const formatType = file.type.includes('png') ? 'PNG' : 'JPEG';
      let dataUrl = '';
      
      if (file.type.includes('svg')) {
        // Render SVG to Canvas first to get PNG data URL
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        dataUrl = canvas.toDataURL('image/png');
      } else {
        dataUrl = await blobToDataURL(activeBlob);
      }

      doc.addImage(dataUrl, 'PNG', 0, 0, finalWidth, finalHeight);
      const pdfBlob = doc.output('blob');
      
      URL.revokeObjectURL(objectUrl);
      return new File([pdfBlob], file.name.substring(0, file.name.lastIndexOf('.')) + '.pdf', {
        type: 'application/pdf'
      });
    }

    // Special handling for SVG target format
    if (targetFormat.toLowerCase() === 'svg') {
      const finalWidth = options.resizeWidth || (img.width * (options.scale || 1.0));
      const finalHeight = options.resizeHeight || (img.height * (options.scale || 1.0));

      const canvas = document.createElement('canvas');
      canvas.width = finalWidth;
      canvas.height = finalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
      
      applyWatermark(ctx, finalWidth, finalHeight, options.watermark);
      
      const dataUrl = canvas.toDataURL('image/png');
      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${finalWidth}" height="${finalHeight}" viewBox="0 0 ${finalWidth} ${finalHeight}">
  <image width="${finalWidth}" height="${finalHeight}" xlink:href="${dataUrl}"/>
</svg>`;
      const sanitizedSvg = sanitizeSvgContent(svgContent);
      const svgBlob = new Blob([sanitizedSvg], { type: 'image/svg+xml' });
      URL.revokeObjectURL(objectUrl);
      const origName = file.name.substring(0, file.name.lastIndexOf('.'));
      return new File([svgBlob], `${origName}.svg`, { type: 'image/svg+xml' });
    }

    // Normal image formats (JPG, PNG, WEBP, AVIF)
    const finalWidth = options.resizeWidth || (img.width * (options.scale || 1.0));
    const finalHeight = options.resizeHeight || (img.height * (options.scale || 1.0));

    const canvas = document.createElement('canvas');
    canvas.width = finalWidth;
    canvas.height = finalHeight;
    const ctx = canvas.getContext('2d');
    
    // Draw white background if converting PNG/SVG with transparency to JPEG/JPG
    if (['jpg', 'jpeg'].includes(targetFormat.toLowerCase())) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
    applyWatermark(ctx, finalWidth, finalHeight, options.watermark);
    
    const mime = mimeTypes[targetFormat.toLowerCase()] || 'image/jpeg';
    
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(objectUrl);
        if (blob) {
          const extension = targetFormat.toLowerCase();
          const origName = file.name.substring(0, file.name.lastIndexOf('.'));
          resolve(new File([blob], `${origName}.${extension}`, { type: mime }));
        } else {
          reject(new Error("Canvas conversion failed"));
        }
      }, mime, options.quality || 0.92);
    });

  } catch (error) {
    URL.revokeObjectURL(objectUrl);
    throw error;
  }
};

// Helper to convert multiple files into a single consolidated PDF
export const convertToSinglePdf = async (files, options = { quality: 0.92, scale: 1.0 }) => {
  if (files.length === 0) return null;
  
  const doc = new jsPDF({
    unit: 'px',
    compress: true
  });
  
  let isFirstPage = true;

  for (let i = 0; i < files.length; i++) {
    const fileObj = files[i];
    let activeBlob = fileObj.originalFile;

    // Convert HEIC
    if (fileObj.name.toLowerCase().endsWith('.heic') || fileObj.name.toLowerCase().endsWith('.heif')) {
      const converted = await heic2any({
        blob: activeBlob,
        toType: 'image/jpeg',
        quality: options.quality || 0.92
      });
      activeBlob = Array.isArray(converted) ? converted[0] : converted;
    }

    const objectUrl = URL.createObjectURL(activeBlob);
    
    try {
      const img = await loadImage(objectUrl);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();
      
      // Calculate aspect ratio
      const ratio = Math.min(pdfWidth / img.width, pdfHeight / img.height);
      const finalWidth = options.resizeWidth ? (options.resizeWidth * ratio) : (img.width * ratio * (options.scale || 1.0));
      const finalHeight = options.resizeHeight ? (options.resizeHeight * ratio) : (img.height * ratio * (options.scale || 1.0));
      const x = (pdfWidth - finalWidth) / 2;
      const y = (pdfHeight - finalHeight) / 2;

      if (!isFirstPage) {
        doc.addPage();
      } else {
        isFirstPage = false;
      }

      let dataUrl = '';
      if (activeBlob.type.includes('svg')) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        dataUrl = canvas.toDataURL('image/png');
      } else {
        dataUrl = await blobToDataURL(activeBlob);
      }

      doc.addImage(dataUrl, 'PNG', x, y, finalWidth, finalHeight);
    } catch (e) {
      console.error("Error adding page to consolidated PDF", e);
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }

  return doc.output('blob');
};
