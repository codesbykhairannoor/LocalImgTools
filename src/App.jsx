import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaFileImage, FaCheckCircle, FaSpinner, FaDownload, FaLock, FaUnlock, FaBolt, FaGlobe, FaChevronRight, FaExchangeAlt, FaCompressArrowsAlt, FaExpandArrowsAlt, FaStamp } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { useTranslation, LanguageProvider } from './context/LanguageContext';
import { parseRoute, navigateTo, getRoutePath } from './utils/router';
import { getSeoContent, getCompressSeoContent, getResizeSeoContent, getWatermarkSeoContent, updatePageMeta, getFormatComparisonData } from './utils/seoTemplates';
import { convertImage, convertToSinglePdf } from './utils/converter';
import './index.css';

const formatOptions = ['JPG', 'PNG', 'WEBP', 'AVIF', 'SVG', 'PDF'];
const supportedInputFormats = ['JPG', 'PNG', 'WEBP', 'AVIF', 'SVG'];
const supportedOutputFormats = ['JPG', 'PNG', 'WEBP', 'AVIF', 'PDF'];

const validateImageSignature = async (file) => {
  const blob = file.slice(0, 12);
  const buffer = await blob.arrayBuffer();
  const arr = new Uint8Array(buffer);
  
  if (arr.length < 4) return null;
  
  // PNG: 89 50 4E 47
  if (arr[0] === 0x89 && arr[1] === 0x50 && arr[2] === 0x4E && arr[3] === 0x47) {
    return 'PNG';
  }
  
  // JPEG/JPG: FF D8 FF
  if (arr[0] === 0xFF && arr[1] === 0xD8 && arr[2] === 0xFF) {
    return 'JPG';
  }
  
  // GIF: 47 49 46 38
  if (arr[0] === 0x47 && arr[1] === 0x49 && arr[2] === 0x46 && arr[3] === 0x38) {
    return 'GIF';
  }
  
  // WEBP: RIFF....WEBP (offset 8 has 'WEBP')
  if (arr[0] === 0x52 && arr[1] === 0x49 && arr[2] === 0x46 && arr[3] === 0x46 &&
      arr[8] === 0x57 && arr[9] === 0x45 && arr[10] === 0x42 && arr[11] === 0x50) {
    return 'WEBP';
  }
  
  // AVIF: ....ftypavif (offset 4 has 'ftyp', offset 8 has 'avif')
  if (arr[4] === 0x66 && arr[5] === 0x74 && arr[6] === 0x79 && arr[7] === 0x70 &&
      arr[8] === 0x61 && arr[9] === 0x76 && arr[10] === 0x69 && arr[11] === 0x66) {
    return 'AVIF';
  }
  
  // HEIC: ....ftypheic or ....ftypmif1
  if (arr[4] === 0x66 && arr[5] === 0x74 && arr[6] === 0x79 && arr[7] === 0x70 &&
      ((arr[8] === 0x68 && arr[9] === 0x65 && arr[10] === 0x69 && arr[11] === 0x63) ||
       (arr[8] === 0x6d && arr[9] === 0x69 && arr[10] === 0x66 && arr[11] === 0x31))) {
    return 'HEIC';
  }

  // SVG: starts with xml or includes <svg
  const textBlob = file.slice(0, 100);
  const text = await textBlob.text();
  const cleanText = text.trim().toLowerCase();
  if (cleanText.startsWith('<?xml') || cleanText.includes('<svg') || cleanText.startsWith('<svg')) {
    return 'SVG';
  }
  
  return null;
};

const sanitizeFileName = (name) => {
  const extIndex = name.lastIndexOf('.');
  const ext = extIndex !== -1 ? name.substring(extIndex) : '';
  const base = extIndex !== -1 ? name.substring(0, extIndex) : name;
  const cleanBase = base.replace(/[^a-zA-Z0-9_\s.-]/g, '_');
  const secureBase = cleanBase.replace(/<script.*?>.*?<\/script>/gi, '').replace(/<\/?[^>]+(>|$)/g, "");
  return secureBase + ext;
};

function MainApp() {
  const { language, setLanguage, t, translations } = useTranslation();
  const [route, setRoute] = useState(parseRoute());
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(0.8);
  const [scale, setScale] = useState(0.5);
  const [resizeWidth, setResizeWidth] = useState('');
  const [resizeHeight, setResizeHeight] = useState('');
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [showAdvancedCompress, setShowAdvancedCompress] = useState(false);
  const [watermarkText, setWatermarkText] = useState('© SuperOptimize');
  const [watermarkColor, setWatermarkColor] = useState('#ffffff');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.8);
  const [watermarkPosition, setWatermarkPosition] = useState('bottom-right');
  const [fromFormat, setFromFormat] = useState('PNG');
  const [toFormat, setToFormat] = useState('WEBP');
  const [isProcessingAll, setIsProcessingAll] = useState(false);
  const [combinePdf, setCombinePdf] = useState(false);
  const [activeCompareFile, setActiveCompareFile] = useState(null);

  // Sync route state on load and popstate (back/forward browser action)
  useEffect(() => {
    const handleLocationChange = () => {
      const parsed = parseRoute();
      setRoute(parsed);
      
      // If path specifies a language, sync it with context
      if (parsed.lang !== language) {
        setLanguage(parsed.lang);
      }

      // If path specifies a tool and formats, set format selectors
      if (parsed.tool === 'convert' && parsed.fromFormat && parsed.toFormat) {
        setFromFormat(parsed.fromFormat.toUpperCase());
        setToFormat(parsed.toFormat.toUpperCase());
      } else if ((parsed.tool === 'compress' || parsed.tool === 'resize' || parsed.tool === 'watermark') && parsed.fromFormat) {
        setFromFormat(parsed.fromFormat.toUpperCase());
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    // Initial call
    handleLocationChange();

    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [language, setLanguage]);

  // Update Page Meta (SEO injection) dynamically when route, language, or formats change
  useEffect(() => {
    updatePageMeta(language, route.tool, fromFormat, toFormat);
  }, [language, route, fromFormat, toFormat]);

  // Handle format selector changes and update URL path to boost SEO ranking
  const handleFormatChange = (from, to) => {
    setFromFormat(from);
    setToFormat(to);
    setFiles([]); // Clear list for new conversion context

    const newPath = getRoutePath(language, route.tool, from, to);
    navigateTo(newPath);
  };

  const handleLangChange = (newLang) => {
    setLanguage(newLang);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const newFiles = [];
    
    for (const file of acceptedFiles) {
      // Validate file size is under 100MB to prevent client crash
      if (file.size > 100 * 1024 * 1024) {
        alert(language === 'id' ? `Berkas ${file.name} terlalu besar! Batas maksimal adalah 100MB.` : `File ${file.name} is too large! Maximum limit is 100MB.`);
        continue;
      }

      // Verify file signature magic number to ensure cybersecurity
      const signatureType = await validateImageSignature(file);
      if (!signatureType) {
        alert(language === 'id' ? `Berkas ${file.name} gagal validasi keamanan! Format data tidak valid.` : `File ${file.name} failed signature security check! Invalid image data format.`);
        continue;
      }
      
      const cleanName = sanitizeFileName(file.name);
      
      newFiles.push({
        id: Math.random().toString(36).substring(7),
        originalFile: file,
        name: cleanName,
        originalSize: file.size,
        status: 'pending', // pending, processing, done, error
        compressedFile: null,
        compressedSize: null,
        progress: 0,
        width: 0,
        height: 0
      });
    }
    
    if (newFiles.length > 0) {
      // For the first file, read dimensions to initialize Resize inputs
      if (route.tool === 'resize' && newFiles[0]) {
        const objectUrl = URL.createObjectURL(newFiles[0].originalFile);
        const img = new Image();
        img.onload = () => {
          setResizeWidth(img.width);
          setResizeHeight(img.height);
          URL.revokeObjectURL(objectUrl);
        };
        img.src = objectUrl;
      }
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, [language, route.tool]);

  const handleTrySampleImage = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering dropzone click
    try {
      const response = await fetch('https://picsum.photos/800/600');
      const blob = await response.blob();
      const file = new File([blob], 'sample-image.jpg', { type: 'image/jpeg' });
      onDrop([file]);
    } catch (err) {
      console.error("Failed to fetch sample image", err);
      alert(language === 'id' ? 'Gagal mengambil gambar contoh.' : 'Failed to fetch sample image.');
    }
  };

  // Set dropzone validation dynamically based on chosen 'from' format
  const getAcceptedFileTypes = () => {
    const fromLower = fromFormat.toLowerCase();
    if (fromLower === 'png') return { 'image/png': ['.png'] };
    if (fromLower === 'jpg' || fromLower === 'jpeg') return { 'image/jpeg': ['.jpg', '.jpeg'] };
    if (fromLower === 'webp') return { 'image/webp': ['.webp'] };
    if (fromLower === 'avif') return { 'image/avif': ['.avif'] };
    if (fromLower === 'heic') return { 'image/heic': ['.heic'], 'image/heif': ['.heif'] };
    if (fromLower === 'svg') return { 'image/svg+xml': ['.svg'] };
    
    // Generic acceptance
    return {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.heic', '.heif', '.svg']
    };
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({ 
    onDrop,
    accept: getAcceptedFileTypes()
  });

  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const processFile = async (fileObj) => {
    setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'processing', progress: 20 } : f));
    
    try {
      setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, progress: 50 } : f));
      
      const options = {
        quality: route.tool === 'compress' ? quality : 0.92,
        scale: route.tool === 'resize' ? scale : 1.0,
        resizeWidth: route.tool === 'resize' ? parseInt(resizeWidth) : null,
        resizeHeight: route.tool === 'resize' ? parseInt(resizeHeight) : null,
        watermark: route.tool === 'watermark' ? {
          text: watermarkText,
          color: watermarkColor,
          opacity: watermarkOpacity,
          position: watermarkPosition
        } : null
      };
      
      // Default to fromFormat if it's watermark, except PDF handles differently
      const targetConversion = route.tool === 'watermark' ? (toFormat || fromFormat) : toFormat;
      const result = await convertImage(fileObj.originalFile, targetConversion, options);
      
      setFiles(prev => prev.map(f => f.id === fileObj.id ? { 
        ...f, 
        status: 'done', 
        progress: 100,
        compressedFile: result,
        compressedSize: result.size,
        name: result.name
      } : f));
    } catch (error) {
      console.error(error);
      setFiles(prev => prev.map(f => f.id === fileObj.id ? { 
        ...f, 
        status: 'error', 
        progress: 0,
        errorMsg: error.message || 'Conversion failed'
      } : f));
    }
  };

  const processAll = async () => {
    setIsProcessingAll(true);
    const pendingFiles = files.filter(f => f.status === 'pending' || f.status === 'error');
    
    for (const fileObj of pendingFiles) {
      await processFile(fileObj);
    }
    
    setIsProcessingAll(false);

    // Show a premium visual reward (Confetti) if any files succeeded
    const isSuccess = files.some(f => f.status === 'pending' || f.status === 'error');
    if (isSuccess) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const downloadFile = (fileObj) => {
    if (fileObj.compressedFile) {
      saveAs(fileObj.compressedFile, fileObj.name);
    }
  };

  const downloadAll = async () => {
    const doneFiles = files.filter(f => f.status === 'done');
    if (doneFiles.length === 0) return;

    if (toFormat === 'PDF' && combinePdf) {
      setIsProcessingAll(true);
      try {
        const options = {
          quality: route.tool === 'compress' ? quality : 0.92,
          scale: route.tool === 'resize' ? scale : 1.0,
          watermark: route.tool === 'watermark' ? {
            text: watermarkText,
            color: watermarkColor,
            opacity: watermarkOpacity,
            position: watermarkPosition
          } : null
        };
        const mergedPdfBlob = await convertToSinglePdf(doneFiles, options);
        if (mergedPdfBlob) {
          saveAs(mergedPdfBlob, "consolidated_images.pdf");
        }
      } catch (err) {
        console.error("Merged PDF download failed", err);
      } finally {
        setIsProcessingAll(false);
      }
      return;
    }

    if (doneFiles.length === 1) {
      downloadFile(doneFiles[0]);
      return;
    }

    const zip = new JSZip();
    doneFiles.forEach(f => {
      zip.file(f.name, f.compressedFile);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `superoptimize_${toFormat.toLowerCase()}.zip`);
  };

  const clearAll = () => {
    setFiles([]);
  };

  let seo;
  if (route.tool === 'compress') seo = getCompressSeoContent(language, fromFormat);
  else if (route.tool === 'resize') seo = getResizeSeoContent(language, fromFormat);
  else if (route.tool === 'watermark') seo = getWatermarkSeoContent(language, fromFormat);
  else seo = getSeoContent(language, fromFormat, toFormat);

  const themeClass = route.tool === 'compress' ? 'theme-green' : route.tool === 'resize' ? 'theme-purple' : route.tool === 'watermark' ? 'theme-orange' : 'theme-blue';

  return (
    <div className={`app-wrapper ${themeClass}`}>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-area" onClick={() => handleFormatChange('PNG', 'WEBP')} style={{ cursor: 'pointer' }}>
            <h1 className="logo"><span className="text-gradient">{t('title')}</span></h1>
          </div>
          
          <div className="nav-links tool-links">
            <a href="#" className={route.tool === 'convert' ? 'active-tool' : ''} onClick={(e) => {e.preventDefault(); navigateTo(getRoutePath(language, 'convert', fromFormat, toFormat))}}>
              <FaExchangeAlt style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Convert
            </a>
            <a href="#" className={route.tool === 'compress' ? 'active-tool' : ''} onClick={(e) => {e.preventDefault(); navigateTo(getRoutePath(language, 'compress', fromFormat))}}>
              <FaCompressArrowsAlt style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Compress
            </a>
            <a href="#" className={route.tool === 'resize' ? 'active-tool' : ''} onClick={(e) => {e.preventDefault(); navigateTo(getRoutePath(language, 'resize', fromFormat))}}>
              <FaExpandArrowsAlt style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Resize
            </a>
            <a href="#" className={route.tool === 'watermark' ? 'active-tool' : ''} onClick={(e) => {e.preventDefault(); navigateTo(getRoutePath(language, 'watermark', fromFormat))}}>
              <FaStamp style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Watermark
            </a>
          </div>

          <div className="lang-selector">
            <FaGlobe className="lang-icon" />
            <select value={language} onChange={(e) => handleLangChange(e.target.value)}>
              <option value="en">EN</option>
              <option value="id">ID</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
              <option value="pt">PT</option>
            </select>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {files.length === 0 ? (
          /* HERO AREA: Fullscreen Dropzone (No Files) */
          <section id="converter" className="fullscreen-converter-area">
            <div {...getRootProps()} className={`fullscreen-dropzone ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              
              <div className="dropzone-content-wrapper" onClick={(e) => e.stopPropagation()}>
                <h2 className="headline">{seo.headline}</h2>
                <p className="subtitle">{seo.description}</p>

                <div className="compact-format-selector">
                   {route.tool === 'convert' && (
                     <>
                       <span className="selector-text">Convert</span>
                       <select value={fromFormat} onChange={(e) => handleFormatChange(e.target.value, toFormat)} className="inline-select">
                         {supportedInputFormats.map(fmt => <option key={fmt} value={fmt}>{fmt}</option>)}
                       </select>
                       <span className="selector-text">to</span>
                       <select value={toFormat} onChange={(e) => handleFormatChange(fromFormat, e.target.value)} className="inline-select">
                         {supportedOutputFormats.map(fmt => <option key={fmt} value={fmt}>{fmt}</option>)}
                       </select>
                     </>
                   )}
                   {route.tool === 'compress' && (
                     <>
                       <span className="selector-text">Compress</span>
                       <select value={fromFormat} onChange={(e) => handleFormatChange(e.target.value, toFormat)} className="inline-select">
                         {supportedInputFormats.map(fmt => <option key={fmt} value={fmt}>{fmt}</option>)}
                       </select>
                       <span className="selector-text">Images</span>
                     </>
                   )}
                   {route.tool === 'resize' && (
                     <>
                       <span className="selector-text">Resize</span>
                       <select value={fromFormat} onChange={(e) => handleFormatChange(e.target.value, toFormat)} className="inline-select">
                         {supportedInputFormats.map(fmt => <option key={fmt} value={fmt}>{fmt}</option>)}
                       </select>
                       <span className="selector-text">Images</span>
                     </>
                   )}
                </div>

                <div className="dropzone-actions">
                  <button className="btn btn-massive" onClick={(e) => { e.preventDefault(); e.stopPropagation(); document.querySelector('.fullscreen-dropzone input').click(); }}>
                    <FaCloudUploadAlt style={{fontSize: '1.5rem'}} /> Select Images
                  </button>
                </div>
                
                <p className="file-meta" style={{marginTop: '0.8rem', fontSize: '0.95rem'}}>
                  or drop images here
                </p>
              </div>
            </div>
            
            {fileRejections.length > 0 && (
              <div className="file-errors fixed-error-toast">
                <h4>⚠️ {language === 'id' ? 'Berkas Ditolak' : 'Files Rejected'}</h4>
                <ul>
                  {fileRejections.map(({ file, errors }) => (
                    <li key={file.name}><strong>{file.name}</strong> - {errors.map(e => e.message).join(', ')}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ) : (
          /* WORKSPACE AREA: Active Processing (Files Present) */
          <section id="workspace" className="workspace-area">
            <div className="workspace-header">
              <h2>{route.tool === 'compress' ? 'Ready to Compress' : route.tool === 'resize' ? 'Ready to Resize' : 'Ready to Convert'}</h2>
              <div className="compact-format-selector" style={{marginBottom: 0}}>
                 <span className="selector-text" style={{textTransform: 'capitalize'}}>{route.tool}</span>
                 <select value={fromFormat} onChange={(e) => handleFormatChange(e.target.value, toFormat)} className="inline-select" disabled={isProcessingAll}>
                    {formatOptions.filter(f => f !== 'PDF').map(opt => <option key={opt} value={opt}>{opt}</option>)}
                 </select>
                 {route.tool === 'convert' && (
                   <>
                     <span className="selector-text">to</span>
                     <select value={toFormat} onChange={(e) => handleFormatChange(fromFormat, e.target.value)} className="inline-select" disabled={isProcessingAll}>
                        {formatOptions.filter(f => f !== fromFormat).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                     </select>
                   </>
                 )}
                 {route.tool !== 'convert' && (
                   <span className="selector-text">Images</span>
                 )}
              </div>
            </div>

            <div className="workspace-grid">
              <div className="workspace-files glass-panel">
                <div {...getRootProps()} className={`workspace-dropzone ${isDragActive ? 'active' : ''}`}>
                  <input {...getInputProps()} />
                  <FaCloudUploadAlt /> <span>Add more files</span>
                </div>

                <div className="file-list">
                  {files.map(file => (
                    <div key={file.id} className="file-item">
                      <div className="file-info">
                        <FaFileImage className="file-icon" />
                        <div className="file-details">
                          <span className="file-name" title={file.name}>{file.name}</span>
                          <span className="file-meta">
                            {t('original')}: {formatBytes(file.originalSize)} 
                            {file.compressedSize && ` → ${route.tool === 'compress' ? 'Compressed' : route.tool === 'resize' ? 'Resized' : 'Converted'}: ${formatBytes(file.compressedSize)} (-${Math.round((1 - file.compressedSize / file.originalSize) * 100)}%)`}
                          </span>
                        </div>
                      </div>
                      
                      <div className="file-status">
                        {file.status === 'pending' && <span className="status-badge status-pending">{t('statusPending')}</span>}
                        {file.status === 'processing' && (
                          <div className="status-badge status-processing">
                            <FaSpinner className="spin" style={{marginRight: '5px'}}/> {file.progress}%
                          </div>
                        )}
                        {file.status === 'done' && (
                          <>
                            <span className="status-badge status-done" style={{ cursor: 'pointer' }} onClick={() => setActiveCompareFile(file)} title="Compare quality">
                              <FaCheckCircle style={{marginRight: '5px'}}/> {t('statusDone')}
                            </span>
                            {toFormat.toLowerCase() !== 'pdf' && (
                              <button className="btn btn-primary btn-mini" onClick={() => setActiveCompareFile(file)} title="Compare quality" style={{ marginRight: '5px' }}>
                                👁️
                              </button>
                            )}
                            <button className="btn btn-primary btn-mini" onClick={() => downloadFile(file)}>
                              <FaDownload />
                            </button>
                          </>
                        )}
                        {file.status === 'error' && (
                          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem'}}>
                            <span className="status-badge status-error">{t('statusError')}</span>
                            {file.errorMsg && <span style={{fontSize: '0.75rem', color: 'var(--danger)'}}>{file.errorMsg}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="workspace-sidebar glass-panel">
                <h3 className="section-title">
                  {route.tool === 'convert' ? 'Converting...' : route.tool === 'compress' ? 'Compressing...' : route.tool === 'watermark' ? 'Watermarking...' : 'Resizing...'}
                </h3>
                
                <div className="controls-area">
                  {route.tool === 'compress' && (
                    <div className="compress-options">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Smart Compression applied.</span>
                        <button 
                          className="btn btn-outline btn-mini" 
                          onClick={() => setShowAdvancedCompress(!showAdvancedCompress)}
                        >
                          {showAdvancedCompress ? 'Hide Settings' : 'Advanced Settings'}
                        </button>
                      </div>
                      
                      {showAdvancedCompress && (
                        <div className="quality-slider animate-slide-up" style={{ padding: '1rem', background: 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>
                          <label htmlFor="quality" style={{fontWeight: 600}}>Compression Quality: {Math.round(quality * 100)}%</label>
                          <input 
                            type="range" 
                            id="quality" 
                            min="0.1" max="1" step="0.05" 
                            value={quality} 
                            onChange={(e) => setQuality(parseFloat(e.target.value))}
                            disabled={isProcessingAll}
                          />
                          <small style={{display: 'block', marginTop: '0.5rem', color: 'var(--text-muted)'}}>Lower quality = smaller file size.</small>
                        </div>
                      )}
                    </div>
                  )}

                  {route.tool === 'resize' && (
                    <div className="resize-options">
                      <div className="resize-inputs" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                        <div className="input-group" style={{ flex: 1 }}>
                          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Width (px)</label>
                          <input 
                            type="number" 
                            className="text-input" 
                            value={resizeWidth} 
                            onChange={(e) => setResizeWidth(e.target.value)}
                            disabled={isProcessingAll}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--glass-border)' }}
                          />
                        </div>
                        <div 
                          className="aspect-ratio-lock" 
                          onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                          style={{ cursor: 'pointer', color: maintainAspectRatio ? 'var(--primary)' : '#cbd5e1', paddingTop: '1.2rem' }}
                          title="Maintain Aspect Ratio"
                        >
                          {maintainAspectRatio ? <FaLock /> : <FaUnlock />}
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Height (px)</label>
                          <input 
                            type="number" 
                            className="text-input" 
                            value={resizeHeight} 
                            onChange={(e) => setResizeHeight(e.target.value)}
                            disabled={isProcessingAll}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--glass-border)' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {route.tool === 'watermark' && (
                    <div className="watermark-options">
                      <div className="input-group" style={{ marginBottom: '1rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Watermark Text</label>
                        <input 
                          type="text" 
                          className="text-input" 
                          value={watermarkText} 
                          onChange={(e) => setWatermarkText(e.target.value)}
                          disabled={isProcessingAll}
                          style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--glass-border)' }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <div className="input-group" style={{ flex: 1 }}>
                          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Color</label>
                          <input 
                            type="color" 
                            value={watermarkColor} 
                            onChange={(e) => setWatermarkColor(e.target.value)}
                            disabled={isProcessingAll}
                            style={{ width: '100%', height: '38px', padding: '0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                          />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Position</label>
                          <select 
                            value={watermarkPosition} 
                            onChange={(e) => setWatermarkPosition(e.target.value)}
                            disabled={isProcessingAll}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--glass-border)' }}
                          >
                            <option value="bottom-right">Bottom Right</option>
                            <option value="bottom-left">Bottom Left</option>
                            <option value="top-right">Top Right</option>
                            <option value="center">Center</option>
                          </select>
                        </div>
                      </div>
                      <div className="quality-slider">
                        <label htmlFor="opacity" style={{fontWeight: 600}}>Opacity: {Math.round(watermarkOpacity * 100)}%</label>
                        <input 
                          type="range" 
                          id="opacity" 
                          min="0.1" max="1" step="0.1" 
                          value={watermarkOpacity} 
                          onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                          disabled={isProcessingAll}
                        />
                      </div>
                    </div>
                  )}

                  {toFormat === 'PDF' && (
                    <div className="checkbox-group" style={{marginTop: '1rem'}}>
                      <input 
                        type="checkbox" 
                        id="combine-pdf" 
                        checked={combinePdf} 
                        onChange={(e) => setCombinePdf(e.target.checked)} 
                      />
                      <label htmlFor="combine-pdf">Combine into single PDF</label>
                    </div>
                  )}
                  
                  <div className="sidebar-actions">
                    <button className="btn btn-primary btn-massive" style={{width: '100%', marginBottom: '1rem'}} onClick={processAll} disabled={isProcessingAll || files.every(f => f.status === 'done')}>
                      {isProcessingAll ? <><FaSpinner className="spin"/> {route.tool === 'compress' ? 'Compressing...' : route.tool === 'resize' ? 'Resizing...' : 'Converting...'}</> : <><FaBolt /> {route.tool === 'convert' ? 'Convert All' : route.tool === 'compress' ? 'Compress All' : route.tool === 'watermark' ? 'Watermark All' : 'Resize All'}</>}
                    </button>
                    {files.some(f => f.status === 'done') && (
                      <button className="btn btn-success btn-massive" style={{width: '100%', marginBottom: '1rem', background: 'var(--success)', color: 'white'}} onClick={downloadAll}>
                        <FaDownload /> {toFormat === 'PDF' && combinePdf ? 'Download PDF' : t('downloadAll')}
                      </button>
                    )}
                    <button className="btn btn-outline" style={{width: '100%'}} onClick={clearAll} disabled={isProcessingAll}>{t('clearAll')}</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="seo-content-wrapper">
          <div className="seo-container">
            {route.isConvertRoute && (
              <CompareTable from={fromFormat} to={toFormat} language={language} />
            )}

            {/* Adaptive SEO Text Section */}
            <section id="features" className="seo-intro-section glass-panel">
              <h3 className="section-title">{seo.introTitle}</h3>
              <p className="seo-text">{seo.introText}</p>
            </section>

            {/* Value Proposition features */}
            <div className="features-grid">
              <div className="feature-card">
                <FaLock className="feature-icon" />
                <h4 className="feature-title">{t('featPrivacyTitle')}</h4>
                <p className="feature-desc">{t('featPrivacyDesc')}</p>
              </div>
              <div className="feature-card">
                <FaBolt className="feature-icon" />
                <h4 className="feature-title">{t('featSpeedTitle')}</h4>
                <p className="feature-desc">{t('featSpeedDesc')}</p>
              </div>
              <div className="feature-card">
                <FaUnlock className="feature-icon" />
                <h4 className="feature-title">{t('featFreeTitle')}</h4>
                <p className="feature-desc">{t('featFreeDesc')}</p>
              </div>
            </div>

            {/* Dynamic FAQ Accordion Section */}
            <section id="faq" className="faq-section glass-panel">
              <h3 className="section-title" style={{textAlign: 'center', marginBottom: '2rem'}}>{t('faqTitle')}</h3>
              <div className="faq-list">
                {seo.faqs.map((faq, idx) => (
                  <div key={idx} className="faq-item">
                    <h4 className="faq-question">❓ {faq.q}</h4>
                    <p className="faq-answer">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="fat-footer">
        <div className="footer-container">
          <LinkingGrid currentFrom={fromFormat} currentTo={toFormat} language={language} />
          
          <div className="footer-bottom">
            <div className="footer-logo">
              <h2>{t('title')}</h2>
              <p>Engineered for speed and privacy. 100% serverless.</p>
            </div>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact Us</a>
            </div>
            <div className="footer-copyright">
              <p>&copy; {new Date().getFullYear()} SuperOptimize. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {activeCompareFile && (
        <ComparisonModal 
          file={activeCompareFile} 
          onClose={() => setActiveCompareFile(null)} 
          t={t} 
        />
      )}
    </div>
  );
}

function LinkingGrid({ currentFrom, currentTo, language }) {
  const gridFormats = ['PNG', 'JPG', 'WEBP', 'AVIF', 'SVG', 'HEIC', 'PDF'];
  
  const titles = {
    en: "Other Popular Converters",
    id: "Konverter Populer Lainnya",
    es: "Otros Convertidores Populares",
    fr: "Autres Convertisseurs Populaires",
    de: "Andere Beliebte Konverter",
    pt: "Outros Conversores Populares"
  };

  const handleLinkClick = (e, fFrom, fTo) => {
    e.preventDefault();
    const path = getRoutePath(language, fFrom, fTo);
    navigateTo(path);
  };

  // Generate contextual links to boost crawl relevance
  const links = [];
  
  // 1. Same source conversions (e.g. currentFrom to others)
  for (const fTo of gridFormats) {
    if (fTo !== 'HEIC' && fTo !== currentFrom && fTo !== currentTo) {
      links.push({ from: currentFrom, to: fTo });
    }
  }
  
  // 2. Same target conversions (e.g. others to currentTo)
  for (const fFrom of gridFormats) {
    if (fFrom !== 'PDF' && fFrom !== currentFrom && fFrom !== currentTo) {
      links.push({ from: fFrom, to: currentTo });
    }
  }
  
  // 3. Popular general fallbacks
  for (const fFrom of gridFormats) {
    if (fFrom === 'PDF') continue;
    for (const fTo of gridFormats) {
      if (fTo === 'HEIC' || fFrom === fTo) continue;
      const alreadyAdded = links.some(l => l.from === fFrom && l.to === fTo);
      const isCurrent = fFrom === currentFrom && fTo === currentTo;
      if (!alreadyAdded && !isCurrent) {
        links.push({ from: fFrom, to: fTo });
      }
    }
  }

  // Display top 16 for a rich crawl structure
  const visibleLinks = links.slice(0, 16);

  return (
    <div className="glass-panel" style={{ marginTop: '3rem' }}>
      <h3 className="section-title text-gradient" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {titles[language] || titles['en']}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.2rem' }}>
        {visibleLinks.map((link, idx) => (
          <a
            key={idx}
            href={`/convert/${link.from.toLowerCase()}-to-${link.to.toLowerCase()}`}
            onClick={(e) => handleLinkClick(e, link.from, link.to)}
            className="linking-grid-anchor"
            style={{
              display: 'block',
              padding: '0.8rem 1rem',
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid var(--glass-border)',
              borderRadius: '10px',
              color: 'var(--secondary)',
              textDecoration: 'none',
              fontWeight: 600,
              textAlign: 'center',
              fontSize: '0.95rem'
            }}
          >
            {link.from} ➔ {link.to}
          </a>
        ))}
      </div>
    </div>
  );
}
function CompareTable({ from, to, language }) {
  const data = getFormatComparisonData(from, to, language);
  
  return (
    <div className="glass-panel" style={{ marginTop: '2rem' }}>
      <h3 className="section-title text-gradient" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        {data.fromName} vs {data.toName}
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--glass-border)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Feature</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>{data.fromName}</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>{data.toName}</th>
            </tr>
          </thead>
          <tbody>
            {data.headers.map((header, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>{header}</td>
                <td style={{ padding: '1rem' }}>{data.fromData[idx]}</td>
                <td style={{ padding: '1rem' }}>{data.toData[idx]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ComparisonModal({ file, onClose, t }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [origUrl, setOrigUrl] = useState('');
  const [compUrl, setCompUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let oUrl = '';
    let cUrl = '';

    const initUrls = () => {
      try {
        oUrl = URL.createObjectURL(file.originalFile);
        setOrigUrl(oUrl);

        if (file.compressedFile) {
          cUrl = URL.createObjectURL(file.compressedFile);
          setCompUrl(cUrl);
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to load images for comparison", err);
      }
    };

    initUrls();

    return () => {
      if (oUrl) URL.revokeObjectURL(oUrl);
      if (cUrl) URL.revokeObjectURL(cUrl);
    };
  }, [file]);

  if (loading) {
    return (
      <div className="preview-modal-overlay">
        <div className="preview-modal-content" style={{ textAlign: 'center', padding: '3rem' }}>
          <FaSpinner className="spin" style={{ fontSize: '2.5rem', color: 'var(--secondary)' }} />
        </div>
      </div>
    );
  }

  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const savings = file.compressedSize 
    ? Math.round((1 - file.compressedSize / file.originalSize) * 100)
    : 0;

  return (
    <div className="preview-modal-overlay" onClick={onClose}>
      <div className="preview-modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="preview-modal-header">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <h3 className="text-gradient" style={{ fontSize: '1.2rem' }}>Quality Comparison</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{file.originalFile.name}</span>
          </div>
          <button className="preview-close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="preview-modal-body">
          <div className="comparison-slider-container">
            {/* Original image (underneath) */}
            <img src={origUrl} alt="Original" className="comparison-image-under" />
            <div className="badge-original">Original ({formatBytes(file.originalSize)})</div>

            {/* Compressed image (over top, clipped by width) */}
            <div className="comparison-image-over-wrap" style={{ width: `${sliderPosition}%` }}>
              <img src={compUrl || origUrl} alt="Optimized" className="comparison-image-over" />
              <div className="badge-compressed">Optimized ({formatBytes(file.compressedSize || file.originalSize)})</div>
            </div>

            {/* Slider bar handle */}
            <div className="comparison-slider-bar" style={{ left: `${sliderPosition}%` }}>
              <div className="comparison-slider-handle">↔</div>
            </div>

            {/* Invisible native range input to handle dragging smoothly */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderPosition} 
              onChange={(e) => setSliderPosition(e.target.value)} 
              className="slider-overlay-input"
            />
          </div>
        </div>

        <div className="preview-modal-footer">
          <div className="saving-summary-badge">
            ⚡ Saved {savings}% ({formatBytes(file.originalSize - (file.compressedSize || file.originalSize))})
          </div>
          <button className="btn btn-primary" onClick={() => {
            saveAs(file.compressedFile, file.name);
          }}>
            <FaDownload /> Download Image
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="global-footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <FaBolt /> SuperOptimize
          </div>
          <p style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
            The ultimate client-side bulk image optimizer. 100% secure, zero uploads, unlimited usage. Process files locally with WebAssembly power.
          </p>
        </div>
        <div className="footer-section">
          <h4>Tools</h4>
          <ul>
            <li><a href="/convert/png-to-jpg">Convert PNG to JPG</a></li>
            <li><a href="/compress/png">Compress PNG</a></li>
            <li><a href="/resize/jpg">Resize JPG</a></li>
            <li><a href="/convert/heic-to-jpg">HEIC to JPG</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal & Privacy</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Security Infrastructure</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">
          &copy; {currentYear} SuperOptimize. All conversions happen on your device.
        </div>
        <div className="footer-socials" style={{ display: 'flex', gap: '1rem' }}>
          <a href="#" style={{ color: '#94a3b8' }}><FaGlobe /> English</a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <LanguageProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <MainApp />
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
