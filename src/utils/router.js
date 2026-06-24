export const parseRoute = () => {
  const path = window.location.pathname;
  const parts = path.split('/').filter(Boolean);
  
  let lang = 'en';
  let tool = 'convert'; // default tool
  let fromFormat = '';
  let toFormat = '';

  const supportedLanguages = ['en', 'id', 'es', 'fr', 'de', 'pt'];

  // /:lang/:tool/... or /:tool/...
  let startIdx = 0;
  if (parts.length > 0 && supportedLanguages.includes(parts[0])) {
    lang = parts[0];
    startIdx = 1;
  }

  if (parts.length > startIdx) {
    const maybeTool = parts[startIdx];
    if (['convert', 'compress', 'resize', 'watermark'].includes(maybeTool)) {
      tool = maybeTool;
      
      const formatPart = parts[startIdx + 1];
      if (formatPart) {
        if (tool === 'convert') {
          const formats = formatPart.split('-to-');
          if (formats.length === 2) {
            fromFormat = formats[0].toUpperCase();
            toFormat = formats[1].toUpperCase();
          }
        } else if (tool === 'compress' || tool === 'resize' || tool === 'watermark') {
          fromFormat = formatPart.toUpperCase();
        }
      }
    }
  }

  return { lang, tool, fromFormat, toFormat };
};

export const navigateTo = (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('popstate'));
};

export const getRoutePath = (lang, tool = 'convert', fromFormat = '', toFormat = '') => {
  const base = lang === 'en' ? '' : `/${lang}`;
  
  if (tool === 'convert') {
    if (fromFormat && toFormat) {
      return `${base}/convert/${fromFormat.toLowerCase()}-to-${toFormat.toLowerCase()}`;
    }
    return base || '/';
  } else if (tool === 'compress' || tool === 'resize' || tool === 'watermark') {
    if (fromFormat) {
      return `${base}/${tool}/${fromFormat.toLowerCase()}`;
    }
    return `${base}/${tool}`;
  }
  
  return base || '/';
};
