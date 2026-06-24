import fs from 'fs';
import path from 'path';

// Local signature verification logic replicated for Node.js test environment
const validateBufferSignature = (buffer, fileName) => {
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

  // SVG: check for starting <xml or containing <svg
  const text = buffer.toString('utf8', 0, 100);
  const cleanText = text.trim().toLowerCase();
  if (cleanText.startsWith('<?xml') || cleanText.includes('<svg') || cleanText.startsWith('<svg')) {
    return 'SVG';
  }
  
  return null;
};

// Safe name sanitization logic
const sanitizeFileName = (name) => {
  const extIndex = name.lastIndexOf('.');
  const ext = extIndex !== -1 ? name.substring(extIndex) : '';
  const base = extIndex !== -1 ? name.substring(0, extIndex) : name;
  const cleanBase = base.replace(/[^a-zA-Z0-9_\s.-]/g, '_');
  const secureBase = cleanBase.replace(/<script.*?>.*?<\/script>/gi, '').replace(/<\/?[^>]+(>|$)/g, "");
  return secureBase + ext;
};

// RUN TESTS
console.log("=== RUNNING CYBERSECURITY UNIT TESTS ===");

try {
  // Test 1: Fake Image blocking (TXT file renamed to PNG)
  const fakePngPath = path.join(process.cwd(), 'fake_image.png');
  const fakePngBuffer = fs.readFileSync(fakePngPath);
  const fakePngResult = validateBufferSignature(fakePngBuffer, 'fake_image.png');
  console.log(`Test 1 (Disguised PNG signature check): ${fakePngResult === null ? 'PASSED (Blocked safely)' : 'FAILED'}`);

  // Test 2: Valid SVG signature check
  const xssSvgPath = path.join(process.cwd(), 'xss_test.svg');
  const xssSvgBuffer = fs.readFileSync(xssSvgPath);
  const xssSvgResult = validateBufferSignature(xssSvgBuffer, 'xss_test.svg');
  console.log(`Test 2 (SVG signature check): ${xssSvgResult === 'SVG' ? 'PASSED (Identified correctly)' : 'FAILED'}`);

  // Test 3: Filename sanitization checks
  const unsafeName = "malicious_file_<script>alert(1)</script>_dir/../../image.png";
  const sanitized = sanitizeFileName(unsafeName);
  const isSafe = !sanitized.includes('<script>') && !sanitized.includes('/') && !sanitized.includes('<');
  console.log(`Test 3 (Filename Sanitization): ${isSafe ? `PASSED (${sanitized})` : 'FAILED'}`);

} catch (err) {
  console.error("Test execution failed with error:", err);
}
