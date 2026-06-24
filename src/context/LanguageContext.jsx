import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    title: "SuperOptimize",
    tagline: "Ultra-fast, client-side bulk image optimizer and format converter. 100% secure, zero uploads.",
    dropzoneActive: "Drop your files here...",
    dropzoneDefault: "Drag & drop images here, or click to browse",
    dropzoneFormats: "Supports PNG, JPG, WEBP, AVIF, SVG, and HEIC formats",
    quality: "Quality",
    optimizeAll: "Optimize All",
    optimizing: "Optimizing...",
    watermarkAll: "Watermark All",
    watermarking: "Watermarking...",
    downloadAll: "Download All (ZIP)",
    clearAll: "Clear All",
    successMsg: "All files optimized successfully!",
    featuresTitle: "Why SuperOptimize?",
    featPrivacyTitle: "100% Secure & Private",
    featPrivacyDesc: "All conversions happen locally in your browser. Your private images are never uploaded to any server.",
    featSpeedTitle: "Lightning Fast",
    featSpeedDesc: "No upload queues or slow download waiting times. Processing starts instantly using your device's power.",
    featFreeTitle: "Unlimited & Free",
    featFreeDesc: "No file size limits. No daily conversion limits. Free forever without watermarks or signups.",
    faqTitle: "Frequently Asked Questions",
    faq1Q: "Does SuperOptimize upload my photos?",
    faq1A: "No, never. SuperOptimize uses HTML5 and WebAssembly APIs to process your files locally in your browser. Your images stay on your device.",
    faq2Q: "Can I convert Apple HEIC photos on Windows?",
    faq2A: "Yes! Simply drop your HEIC or HEIF files, select your output format (like JPG or PNG), and they will be converted locally.",
    faq3Q: "How does the bulk optimizer work?",
    faq3A: "You can upload multiple files at once. The app compresses each image using browser APIs and groups them into a downloadable ZIP folder.",
    faq4Q: "Is there a file size limit?",
    faq4A: "No. Since files are processed on your device, there are no artificial limits. You can process extremely large raw images easily.",
    backToHome: "Back to Home",
    targetFormat: "Target Format",
    original: "Original",
    compressed: "Optimized",
    saving: "Saving",
    statusPending: "Pending",
    statusProcessing: "Processing",
    statusDone: "Done",
    statusError: "Error"
  },
  id: {
    title: "SuperOptimize",
    tagline: "Pengoptimal gambar massal & konverter format client-side super cepat. 100% aman, tanpa upload.",
    dropzoneActive: "Lepaskan file Anda di sini...",
    dropzoneDefault: "Seret & lepas gambar di sini, atau klik untuk memilih",
    dropzoneFormats: "Mendukung format PNG, JPG, WEBP, AVIF, SVG, dan HEIC",
    quality: "Kualitas",
    optimizeAll: "Optimalkan Semua",
    optimizing: "Mengoptimalkan...",
    watermarkAll: "Tambahkan Watermark",
    watermarking: "Memproses Watermark...",
    downloadAll: "Unduh Semua (ZIP)",
    clearAll: "Hapus Semua",
    successMsg: "Semua file berhasil dioptimalkan!",
    featuresTitle: "Mengapa SuperOptimize?",
    featPrivacyTitle: "100% Aman & Privat",
    featPrivacyDesc: "Semua konversi terjadi secara lokal di browser Anda. Gambar pribadi Anda tidak pernah dikirim ke server mana pun.",
    featSpeedTitle: "Sangat Cepat",
    featSpeedDesc: "Tanpa antrean upload atau waktu tunggu unduhan yang lambat. Pemrosesan dimulai instan memanfaatkan prosesor perangkat Anda.",
    featFreeTitle: "Tanpa Batas & Gratis",
    featFreeDesc: "Tanpa batas ukuran file. Tanpa batas konversi harian. Gratis selamanya tanpa watermark atau pendaftaran.",
    faqTitle: "Pertanyaan yang Sering Diajukan",
    faq1Q: "Apakah SuperOptimize mengunggah foto saya?",
    faq1A: "Tidak, sama sekali tidak. SuperOptimize menggunakan API HTML5 dan WebAssembly untuk memproses file Anda secara lokal di browser. Gambar Anda tetap di perangkat Anda.",
    faq2Q: "Bisakah saya mengonversi foto Apple HEIC di Windows?",
    faq2A: "Ya! Cukup masukkan file HEIC atau HEIF Anda, pilih format output (seperti JPG atau PNG), dan file akan dikonversi secara lokal.",
    faq3Q: "Bagaimana cara kerja pengoptimal massal?",
    faq3A: "Anda dapat mengunggah banyak file sekaligus. Aplikasi mengompresi setiap gambar menggunakan API browser lalu menggabungkannya ke dalam folder ZIP yang dapat diunduh.",
    faq4Q: "Apakah ada batas ukuran file?",
    faq4A: "Tidak. Karena file diproses di perangkat Anda, tidak ada batasan buatan. Anda dapat memproses gambar mentah yang sangat besar dengan mudah.",
    backToHome: "Kembali ke Beranda",
    targetFormat: "Format Output",
    original: "Asli",
    compressed: "Dioptimalkan",
    saving: "Hemat",
    statusPending: "Menunggu",
    statusProcessing: "Memproses",
    statusDone: "Selesai",
    statusError: "Gagal"
  },
  es: {
    title: "SuperOptimize",
    tagline: "Optimizador de imágenes por lotes y convertidor de formato ultrarrápido del lado del cliente. 100% seguro, cero subidas.",
    dropzoneActive: "Suelte sus archivos aquí...",
    dropzoneDefault: "Arrastre y suelte imágenes aquí, o haga clic para buscar",
    dropzoneFormats: "Soporta formatos PNG, JPG, WEBP, AVIF, SVG y HEIC",
    quality: "Calidad",
    optimizeAll: "Optimizar Todo",
    optimizing: "Optimizando...",
    watermarkAll: "Añadir Marca de Agua",
    watermarking: "Añadiendo Marca...",
    downloadAll: "Descargar Todo (ZIP)",
    clearAll: "Borrar Todo",
    successMsg: "¡Todos los archivos optimizados con éxito!",
    featuresTitle: "¿Por qué SuperOptimize?",
    featPrivacyTitle: "100% Seguro y Privado",
    featPrivacyDesc: "Todas las conversiones ocurren localmente en su navegador. Sus imágenes privadas nunca se suben a ningún servidor.",
    featSpeedTitle: "Rápido como el Rayo",
    featSpeedDesc: "Sin colas de subida ni tiempos de espera de descarga. El procesamiento comienza instantáneamente usando la potencia de su dispositivo.",
    featFreeTitle: "Ilimitado y Gratis",
    featFreeDesc: "Sin límites de tamaño de archivo. Sin límites de conversión diaria. Gratis para siempre sin marcas de agua ni registros.",
    faqTitle: "Preguntas Frecuentes",
    faq1Q: "¿SuperOptimize sube mis fotos?",
    faq1A: "No, nunca. SuperOptimize utiliza las API de HTML5 y WebAssembly para procesar sus archivos localmente en su navegador. Sus imágenes permanecen en su dispositivo.",
    faq2Q: "¿Puedo convertir fotos Apple HEIC en Windows?",
    faq2A: "¡Sí! Simplemente arrastre sus archivos HEIC o HEIF, seleccione su formato de salida (como JPG o PNG) y se convertirán localmente.",
    faq3Q: "¿Cómo funciona el optimizador por lotes?",
    faq3A: "Puede cargar varios archivos a la vez. La aplicación comprime cada imagen utilizando las API del navegador y las agrupa en una carpeta ZIP descargable.",
    faq4Q: "¿Hay un límite de tamaño de archivo?",
    faq4A: "No. Dado que los archivos se procesan en su dispositivo, no hay límites artificiales. Puede procesar imágenes crudas extremadamente grandes fácilmente.",
    backToHome: "Volver al Inicio",
    targetFormat: "Formato de Salida",
    original: "Original",
    compressed: "Optimizado",
    saving: "Ahorro",
    statusPending: "Pendiente",
    statusProcessing: "Procesando",
    statusDone: "Completado",
    statusError: "Error"
  },
  fr: {
    title: "SuperOptimize",
    tagline: "Optimiseur d'images en masse et convertisseur de format client-side ultra-rapide. 100% sécurisé, zéro upload.",
    dropzoneActive: "Déposez vos fichiers ici...",
    dropzoneDefault: "Faites glisser et déposez des images ici, ou cliquez pour parcourir",
    dropzoneFormats: "Prend en charge les formats PNG, JPG, WEBP, AVIF, SVG et HEIC",
    quality: "Qualité",
    optimizeAll: "Tout Optimiser",
    optimizing: "Optimisation...",
    watermarkAll: "Ajouter Filigrane",
    watermarking: "Ajout du filigrane...",
    downloadAll: "Tout Télécharger (ZIP)",
    clearAll: "Tout Effacer",
    successMsg: "Tous les fichiers ont été optimisés avec succès !",
    featuresTitle: "Pourquoi SuperOptimize ?",
    featPrivacyTitle: "100% Sécurisé & Privé",
    featPrivacyDesc: "Toutes les conversions se font localement dans votre navigateur. Vos images privées ne sont jamais envoyées sur un serveur.",
    featSpeedTitle: "Rapide comme l'éclair",
    featSpeedDesc: "Pas de file d'attente ni de téléchargement lent. Le traitement commence instantanément en utilisant la puissance de votre appareil.",
    featFreeTitle: "Illimité & Gratuit",
    featFreeDesc: "Aucune limite de taille de fichier. Aucune limite quotidienne. Gratuit à vie sans filigrane ni inscription.",
    faqTitle: "Questions Fréquemment Posées",
    faq1Q: "Est-ce que SuperOptimize télécharge mes photos ?",
    faq1A: "Non, jamais. SuperOptimize utilise les API HTML5 et WebAssembly pour traiter vos fichiers localement. Vos images restent sur votre appareil.",
    faq2Q: "Puis-je convertir des photos Apple HEIC sur Windows ?",
    faq2A: "Oui ! Déposez simplement vos fichiers HEIC ou HEIF, sélectionnez votre format de sortie (comme JPG ou PNG), et ils seront convertis localement.",
    faq3Q: "Comment fonctionne l'optimiseur en masse ?",
    faq3A: "Vous pouvez télécharger plusieurs fichiers à la fois. L'application compresse chaque image à l'aide des API de votre navigateur et les regroupe dans un fichier ZIP.",
    faq4Q: "Y a-t-il une limite de taille de fichier ?",
    faq4A: "Non. Puisque les fichiers sont traités sur votre appareil, il n'y a pas de limites artificielles. Vous pouvez traiter de très grandes images facilement.",
    backToHome: "Retour à l'Accueil",
    targetFormat: "Format de Sortie",
    original: "Original",
    compressed: "Optimisé",
    saving: "Économie",
    statusPending: "En attente",
    statusProcessing: "Traitement",
    statusDone: "Terminé",
    statusError: "Erreur"
  },
  de: {
    title: "SuperOptimize",
    tagline: "Ultraschneller, clientseitiger Massen-Bildoptimierer und Formatkonverter. 100% sicher, kein Upload.",
    dropzoneActive: "Dateien hier ablegen...",
    dropzoneDefault: "Bilder hierher ziehen oder klicken zum Auswählen",
    dropzoneFormats: "Unterstützt die Formate PNG, JPG, WEBP, AVIF, SVG und HEIC",
    quality: "Qualität",
    optimizeAll: "Alle Optimieren",
    optimizing: "Optimierung...",
    watermarkAll: "Wasserzeichen Hinzufügen",
    watermarking: "Hinzufügen...",
    downloadAll: "Alle Herunterladen (ZIP)",
    clearAll: "Alle Löschen",
    successMsg: "Alle Dateien erfolgreich optimiert!",
    featuresTitle: "Warum SuperOptimize?",
    featPrivacyTitle: "100% Sicher & Privat",
    featPrivacyDesc: "Alle Konvertierungen finden lokal in Ihrem Browser statt. Ihre privaten Bilder werden niemals auf einen Server hochgeladen.",
    featSpeedTitle: "Blitzschnell",
    featSpeedDesc: "Keine Warteschlangen oder langsame Downloads. Die Verarbeitung startet sofort mit der Leistung Ihres Geräts.",
    featFreeTitle: "Unbegrenzt & Kostenlos",
    featFreeDesc: "Keine Dateigrößenbeschränkungen. Keine täglichen Limits. Für immer kostenlos ohne Wasserzeichen oder Anmeldung.",
    faqTitle: "Häufig Gestellte Fragen",
    faq1Q: "Lädt SuperOptimize meine Fotos hoch?",
    faq1A: "Nein, niemals. SuperOptimize nutzt HTML5- und WebAssembly-APIs, um Ihre Dateien lokal im Browser zu verarbeiten. Ihre Bilder bleiben auf Ihrem Gerät.",
    faq2Q: "Kann ich Apple HEIC-Fotos unter Windows konvertieren?",
    faq2A: "Ja! Legen Sie einfach Ihre HEIC- oder HEIF-Dateien ab, wählen Sie Ihr Ausgabeformat (wie JPG oder PNG) und sie werden lokal konvertiert.",
    faq3Q: "Wie funktioniert der Massenoptimierer?",
    faq3A: "Sie können mehrere Dateien auf einmal hochladen. Die App komprimiert jedes Bild über Browser-APIs und fasst sie in einer ZIP-Datei zusammen.",
    faq4Q: "Gibt es eine Dateigrößenbeschränkung?",
    faq4A: "Nein. Da die Dateien auf Ihrem Gerät verarbeitet werden, gibt es keine künstlichen Limits. Sie können sehr große Rohbilder problemlos verarbeiten.",
    backToHome: "Zurück zur Startseite",
    targetFormat: "Ausgabeformat",
    original: "Original",
    compressed: "Optimiert",
    saving: "Ersparnis",
    statusPending: "Wartend",
    statusProcessing: "Verarbeitung",
    statusDone: "Fertig",
    statusError: "Fehler"
  },
  pt: {
    title: "SuperOptimize",
    tagline: "Otimizador e conversor de imagens em lote ultrarrápido do lado do cliente. 100% seguro, sem uploads.",
    dropzoneActive: "Solte seus arquivos aqui...",
    dropzoneDefault: "Arraste e solte imagens aqui, ou clique para navegar",
    dropzoneFormats: "Suporta os formatos PNG, JPG, WEBP, AVIF, SVG e HEIC",
    quality: "Qualidade",
    optimizeAll: "Otimizar Todos",
    optimizing: "Otimizando...",
    watermarkAll: "Adicionar Marca d'água",
    watermarking: "Adicionando Marca...",
    downloadAll: "Baixar Todos (ZIP)",
    clearAll: "Limpar Todos",
    successMsg: "Todos os arquivos otimizados com sucesso!",
    featuresTitle: "Por que o SuperOptimize?",
    featPrivacyTitle: "100% Seguro & Privado",
    featPrivacyDesc: "Todas as conversões ocorrem localmente no seu navegador. Suas imagens privadas nunca são enviadas para nenhum servidor.",
    featSpeedTitle: "Rápido como um Raio",
    featSpeedDesc: "Sem filas de upload ou downloads lentos. O processamento começa instantaneamente usando o poder do seu dispositivo.",
    featFreeTitle: "Ilimitado & Grátis",
    featFreeDesc: "Sem limites de tamanho de arquivo. Sem limites diários de conversão. Grátis para sempre sem marcas d'água ou registros.",
    faqTitle: "Perguntas Frequentes",
    faq1Q: "O SuperOptimize faz upload das minhas fotos?",
    faq1A: "Não, nunca. O SuperOptimize usa APIs HTML5 e WebAssembly para processar arquivos localmente no navegador. Suas imagens permanecem no seu dispositivo.",
    faq2Q: "Posso converter fotos Apple HEIC no Windows?",
    faq2A: "Sim! Basta soltar seus arquivos HEIC ou HEIF, selecionar o formato de saída (como JPG ou PNG) e eles serão convertidos localmente.",
    faq3Q: "Como funciona o otimizador em lote?",
    faq3A: "Você pode enviar vários arquivos de uma vez. O aplicativo comprime cada imagem usando APIs do navegador e as agrupa em um arquivo ZIP para download.",
    faq4Q: "Existe um limite de tamanho de arquivo?",
    faq4A: "Não. Como os arquivos são processados no seu próprio dispositivo, não há limites artificiais. Você pode processar imagens gigantes facilmente.",
    backToHome: "Voltar ao Início",
    targetFormat: "Formato de Saída",
    original: "Original",
    compressed: "Otimizado",
    saving: "Economia",
    statusPending: "Pendente",
    statusProcessing: "Processando",
    statusDone: "Concluído",
    statusError: "Erro"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    // Check URL path first
    const path = window.location.pathname;
    const pathLang = path.split('/')[1];
    
    if (translations[pathLang]) {
      setLanguageState(pathLang);
      return;
    }

    // Super Geo-targeting Bypass: Fetch geolocation data to determine exact user country
    const detectGeoLocation = async () => {
      try {
        const res = await fetch('https://freeipapi.com/api/json');
        if (res.ok) {
          const data = await res.json();
          const countryCode = data.countryCode ? data.countryCode.toLowerCase() : '';
          
          const countryToLang = {
            id: 'id',
            es: 'es', mx: 'es', ar: 'es', co: 'es', cl: 'es', pe: 'es',
            br: 'pt', pt: 'pt',
            fr: 'fr', be: 'fr', ca: 'fr',
            de: 'de', at: 'de', ch: 'de'
          };
          
          const targetLang = countryToLang[countryCode];
          if (targetLang && targetLang !== 'en') {
            setLanguage(targetLang);
          }
        }
      } catch (err) {
        console.warn("Geo-IP location API bypass failed, falling back to browser setting", err);
        // Fallback to browser preference language detection
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang.split('-')[0];
        if (translations[shortLang]) {
          setLanguageState(shortLang);
        }
      }
    };

    detectGeoLocation();
  }, []);

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
      // Update URL path dynamically to support SEO routing
      const currentPath = window.location.pathname;
      const parts = currentPath.split('/').filter(Boolean);
      
      if (translations[parts[0]]) {
        if (lang === 'en') {
          parts.shift();
        } else {
          parts[0] = lang;
        }
      } else {
        if (lang !== 'en') {
          parts.unshift(lang);
        }
      }
      
      const newPath = '/' + parts.join('/');
      window.history.pushState({}, '', newPath + window.location.search);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  const t = (key) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
