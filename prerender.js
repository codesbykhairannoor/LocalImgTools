import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error("Vite index.html not found! Run npm run build first.");
  process.exit(1);
}

let template = fs.readFileSync(templatePath, 'utf8');
// Clean up original description meta tags to avoid duplication
template = template.replace(/<meta name="description".*?\/>/gi, '');

const languages = ['en', 'id', 'es', 'fr', 'de', 'pt'];
const formats = ['PNG', 'JPG', 'WEBP', 'AVIF', 'SVG', 'HEIC', 'PDF'];

const translations = {
  en: {
    title: "SuperOptimize",
    tagline: "Ultra-fast, client-side bulk image optimizer and format converter. 100% secure, zero uploads.",
    dropzoneDefault: "Drag & drop images here, or click to browse",
    featuresTitle: "Why SuperOptimize?",
    featPrivacyTitle: "100% Secure & Private",
    featPrivacyDesc: "All conversions happen locally in your browser. Your private images are never uploaded to any server.",
    featSpeedTitle: "Lightning Fast",
    featSpeedDesc: "No upload queues or slow download waiting times. Processing starts instantly using your device's power.",
    featFreeTitle: "Unlimited & Free",
    featFreeDesc: "No file size limits. No daily conversion limits. Free forever without watermarks or signups.",
    faqTitle: "Frequently Asked Questions",
    targetFormat: "Target Format",
    original: "Original",
    compressed: "Optimized",
    quality: "Quality"
  },
  id: {
    title: "SuperOptimize",
    tagline: "Pengoptimal gambar massal & konverter format client-side super cepat. 100% aman, tanpa upload.",
    dropzoneDefault: "Seret & lepas gambar di sini, atau klik untuk memilih",
    featuresTitle: "Mengapa SuperOptimize?",
    featPrivacyTitle: "100% Aman & Privat",
    featPrivacyDesc: "Semua konversi terjadi secara lokal di browser Anda. Gambar pribadi Anda tidak pernah dikirim ke server mana pun.",
    featSpeedTitle: "Sangat Cepat",
    featSpeedDesc: "Tanpa antrean upload atau waktu tunggu unduhan yang lambat. Pemrosesan dimulai instan memanfaatkan prosesor perangkat Anda.",
    featFreeTitle: "Tanpa Batas & Gratis",
    featFreeDesc: "Tanpa batas ukuran file. Tanpa batas konversi harian. Gratis selamanya tanpa watermark atau pendaftaran.",
    faqTitle: "Pertanyaan yang Sering Diajukan",
    targetFormat: "Format Output",
    original: "Asli",
    compressed: "Dioptimalkan",
    quality: "Kualitas"
  },
  es: {
    title: "SuperOptimize",
    tagline: "Optimizador de imágenes por lotes y convertidor de formato ultrarrápido del lado del cliente. 100% seguro, cero subidas.",
    dropzoneDefault: "Arrastre y suelte imágenes aquí, o haga clic para buscar",
    featuresTitle: "¿Por qué SuperOptimize?",
    featPrivacyTitle: "100% Seguro y Privado",
    featPrivacyDesc: "Todas las conversiones ocurren localmente en su navegador. Sus imágenes privadas nunca se suben a ningún servidor.",
    featSpeedTitle: "Rápido como el Rayo",
    featSpeedDesc: "Sin colas de subida ni tiempos de espera de descarga. El procesamiento comienza instantáneamente usando la potencia de su dispositivo.",
    featFreeTitle: "Ilimitado y Gratis",
    featFreeDesc: "Sin límites de tamaño de archivo. Sin límites de conversión diaria. Gratis para siempre sin marcas de agua ni registros.",
    faqTitle: "Preguntas Frecuentes",
    targetFormat: "Formato de Salida",
    original: "Original",
    compressed: "Optimizado",
    quality: "Calidad"
  },
  fr: {
    title: "SuperOptimize",
    tagline: "Optimiseur d'images en masse et convertisseur de format client-side ultra-rapide. 100% sécurisé, zéro upload.",
    dropzoneDefault: "Faites glisser et déposez des images ici, ou cliquez pour parcourir",
    featuresTitle: "Pourquoi SuperOptimize ?",
    featPrivacyTitle: "100% Sécurisé & Privé",
    featPrivacyDesc: "Toutes les conversions se font localement dans votre navigateur. Vos images privées ne sont jamais envoyées sur un serveur.",
    featSpeedTitle: "Rapide comme l'éclair",
    featSpeedDesc: "Pas de file d'attente ni de téléchargement lent. Le traitement commence instantanément en utilisant la puissance de votre appareil.",
    featFreeTitle: "Illimité & Gratuit",
    featFreeDesc: "Aucune limite de taille de fichier. Aucune limite quotidienne. Gratuit à vie sans filigrane ni inscription.",
    faqTitle: "Questions Fréquemment Posées",
    targetFormat: "Format de Sortie",
    original: "Original",
    compressed: "Optimisé",
    quality: "Qualité"
  },
  de: {
    title: "SuperOptimize",
    tagline: "Ultraschneller, clientseitiger Massen-Bildoptimierer und Formatkonverter. 100% sicher, kein Upload.",
    dropzoneDefault: "Bilder hierher ziehen oder klicken zum Auswählen",
    featuresTitle: "Warum SuperOptimize?",
    featPrivacyTitle: "100% Sicher & Privat",
    featPrivacyDesc: "Alle Konvertierungen finden lokal in Ihrem Browser statt. Ihre privaten Bilder werden niemals auf einen Server hochgeladen.",
    featSpeedTitle: "Blitzschnell",
    featSpeedDesc: "Keine Warteschlangen oder langsame Downloads. Die Verarbeitung startet sofort mit der Leistung Ihres Geräts.",
    featFreeTitle: "Unbegrenzt & Kostenlos",
    featFreeDesc: "Keine Dateigrößenbeschränkungen. Keine täglichen Limits. Für immer kostenlos ohne Wasserzeichen oder Anmeldung.",
    faqTitle: "Häufig Gestellte Fragen",
    targetFormat: "Ausgabeformat",
    original: "Original",
    compressed: "Optimiert",
    quality: "Qualität"
  },
  pt: {
    title: "SuperOptimize",
    tagline: "Otimizador e conversor de imagens em lote ultrarrápido do lado do cliente. 100% seguro, sem uploads.",
    dropzoneDefault: "Arraste e solte imagens aqui, ou clique para navegar",
    featuresTitle: "Por que o SuperOptimize?",
    featPrivacyTitle: "100% Seguro & Privado",
    featPrivacyDesc: "Todas as conversões ocorrem localmente no seu navegador. Suas imagens privadas nunca são enviadas para nenhum servidor.",
    featSpeedTitle: "Rápido como um Raio",
    featSpeedDesc: "Sem filas de upload ou downloads lentos. O processamento começa instantaneamente usando o poder do seu dispositivo.",
    featFreeTitle: "Ilimitado & Grátis",
    featFreeDesc: "Sem limites de tamanho de arquivo. Sem limites diários de conversão. Grátis para sempre sem marcas d'água ou registros.",
    faqTitle: "Perguntas Frecuentes",
    targetFormat: "Formato de Saída",
    original: "Original",
    compressed: "Otimizado",
    quality: "Qualidade"
  }
};

const getSeoContent = (lang, from = '', to = '') => {
  const isGeneric = !from || !to;
  
  const content = {
    en: {
      headline: isGeneric 
        ? "SuperOptimize | Free Client-Side Image Converter & Compressor" 
        : `Convert ${from.toUpperCase()} to ${to.toUpperCase()} Online (100% Local & Secure)`,
      description: isGeneric 
        ? "Optimize, compress, and convert PNG, JPG, WEBP, AVIF, SVG, and HEIC images in your browser. Absolutely secure with zero server uploads." 
        : `Free online ${from.toUpperCase()} to ${to.toUpperCase()} converter. All conversions run locally on your device for absolute privacy. No size limits.`,
      introTitle: isGeneric 
        ? "Fast, Safe, and Zero Server Fees" 
        : `Why Convert ${from.toUpperCase()} to ${to.toUpperCase()}?`,
      introText: isGeneric 
        ? "SuperOptimize runs entirely client-side. We utilize browser WebAssembly and Canvas APIs so you can process large image bundles in seconds. No data ever leaves your computer." 
        : `Converting ${from.toUpperCase()} to ${to.toUpperCase()} helps you optimize web compatibility and performance. ${
            from.toLowerCase() === 'heic' ? "Apple's HEIC format is highly compressed but not compatible with Windows or Android. Converting it to JPG/PNG solves all compatibility issues." : ''
          } ${
            to.toLowerCase() === 'webp' ? "WebP is the modern standard recommended by Google. It reduces file sizes by up to 80% compared to PNG or JPG while keeping transparency." : ''
          } ${
            from.toLowerCase() === 'svg' ? "SVG is a vector format. Converting it to a raster format like PNG or JPG makes it easy to use on social media and other platforms." : ''
          } ${
            to.toLowerCase() === 'pdf' ? "Converting images to PDF bundles all your photos into a single, clean document, perfect for printing, sharing, or submitting official documents." : ''
          } Enjoy fast, secure, offline conversions.`,
      faqs: [
        {
          q: `Is this ${from.toUpperCase()} to ${to.toUpperCase()} converter safe?`,
          a: `Yes, 100%. Unlike online converters, SuperOptimize does not upload your files to any external server. All conversion logic runs locally inside your browser.`
        },
        {
          q: `How long does the ${from.toUpperCase()} to ${to.toUpperCase()} conversion take?`,
          a: "It takes less than a second per image because the file is processed locally on your computer, eliminating upload and download bottlenecks."
        },
        {
          q: "Are there any file size limits?",
          a: "No! Since files are processed on your device rather than our servers, you can process raw or high-resolution photos without limits."
        }
      ]
    },
    id: {
      headline: isGeneric 
        ? "SuperOptimize | Konverter & Kompresor Gambar Lokal Gratis" 
        : `Konversi ${from.toUpperCase()} ke ${to.toUpperCase()} Online (100% Lokal & Aman)`,
      description: isGeneric 
        ? "Optimalkan, kompres, dan konversi gambar PNG, JPG, WEBP, AVIF, SVG, dan HEIC di browser Anda. Aman tanpa unggah ke server." 
        : `Konverter ${from.toUpperCase()} ke ${to.toUpperCase()} online gratis. Pemrosesan berjalan lokal di perangkat Anda demi menjaga privasi penuh. Tanpa batas ukuran.`,
      introTitle: isGeneric 
        ? "Cepat, Aman, dan Tanpa Biaya Server" 
        : `Mengapa Mengonversi ${from.toUpperCase()} ke ${to.toUpperCase()}?`,
      introText: isGeneric 
        ? "SuperOptimize berjalan sepenuhnya secara client-side. Kami memanfaatkan API WebAssembly dan Canvas browser agar Anda bisa memproses banyak gambar sekaligus. Data Anda tidak pernah keluar dari komputer." 
        : `Mengonversi ${from.toUpperCase()} ke ${to.toUpperCase()} membantu Anda mengoptimalkan kecocokan dan performa web. ${
            from.toLowerCase() === 'heic' ? "Format HEIC Apple sangat ringkas tetapi tidak didukung Windows atau Android. Mengonversinya ke JPG/PNG menyelesaikan masalah kompatibilitas secara instan." : ''
          } ${
            to.toLowerCase() === 'webp' ? "WebP adalah standar modern yang direkomendasikan Google. Format ini memotong ukuran file hingga 80% dibanding PNG/JPG tanpa merusak transparansi." : ''
          } ${
            from.toLowerCase() === 'svg' ? "SVG adalah format vektor. Mengonversinya ke format raster seperti PNG atau JPG memudahkan Anda membagikannya di media sosial." : ''
          } ${
            to.toLowerCase() === 'pdf' ? "Mengubah gambar ke PDF menggabungkan semua foto Anda ke satu dokumen bersih, cocok untuk dicetak, dibagikan, atau dokumen administrasi." : ''
          } Nikmati konversi lokal yang cepat, aman, dan offline.`,
      faqs: [
        {
          q: `Apakah konverter ${from.toUpperCase()} ke ${to.toUpperCase()} ini aman?`,
          a: `Sangat aman. Berbeda dengan konverter online lainnya, SuperOptimize tidak mengunggah file Anda ke server eksternal mana pun. Pemrosesan berjalan di browser Anda.`
        },
        {
          q: `Berapa lama proses konversi ${from.toUpperCase()} ke ${to.toUpperCase()}?`,
          a: "Kurang dari satu detik per gambar karena file diproses secara lokal di komputer Anda, menghilangkan antrean unggah dan unduh."
        },
        {
          q: "Apakah ada batasan ukuran file?",
          a: "Tidak ada! Karena file diproses di perangkat Anda dan bukan di server kami, Anda dapat memproses foto resolusi tinggi tanpa batasan."
        }
      ]
    },
    es: {
      headline: isGeneric 
        ? "SuperOptimize | Convertidor y Compresor de Imágenes Gratis" 
        : `Convertir ${from.toUpperCase()} a ${to.toUpperCase()} Gratis (100% Local y Seguro)`,
      description: isGeneric 
        ? "Optimice, comprima y convierta imágenes PNG, JPG, WEBP, AVIF, SVG y HEIC en su navegador. Completamente seguro sin subir al servidor." 
        : `Convertidor gratis de ${from.toUpperCase()} a ${to.toUpperCase()} online. Todas las conversiones se ejecutan localmente para una privacidad absoluta. Sin límites.`,
      introTitle: isGeneric 
        ? "Rápido, Seguro y sin Costos de Servidor" 
        : `¿Por qué convertir ${from.toUpperCase()} a ${to.toUpperCase()}?`,
      introText: isGeneric 
        ? "SuperOptimize se ejecuta completamente en el lado del cliente. Utilizamos las API WebAssembly y Canvas del navegador para procesar lotes de imágenes en segundos. Sus datos nunca salen de su computadora." 
        : `Convertir ${from.toUpperCase()} a ${to.toUpperCase()} le ayuda a optimizar el rendimiento y compatibilidad web. ${
            from.toLowerCase() === 'heic' ? "El formato HEIC de Apple ahorra espacio pero no es compatible con Windows o Android. Convertirlo a JPG resuelve problemas de compatibilidad." : ''
          } ${
            to.toLowerCase() === 'webp' ? "WebP es el formato moderno recomendado por Google. Reduce el tamaño del archivo hasta en un 80% en comparación con PNG/JPG." : ''
          } ${
            from.toLowerCase() === 'svg' ? "SVG es un formato vectorial. Convertirlo a PNG o JPG lo hace fácil de usar en redes sociales y otras plataformas web." : ''
          } ${
            to.toLowerCase() === 'pdf' ? "Convertir imágenes a PDF le permite agrupar fotos en un solo documento limpio, ideal para imprimir, compartir o enviar solicitudes oficiales." : ''
          } Disfrute de conversiones rápidas, seguras y sin conexión.`,
      faqs: [
        {
          q: `¿Es seguro este convertidor de ${from.toUpperCase()} a ${to.toUpperCase()}?`,
          a: "Sí, al 100%. A diferencia de otros convertidores en línea, SuperOptimize no sube sus archivos a ningún servidor externo. Todo ocurre en su propio navegador."
        },
        {
          q: `¿Cuánto tiempo toma convertir de ${from.toUpperCase()} a ${to.toUpperCase()}?`,
          a: "Toma menos de un segundo por imagen ya que se procesa localmente en su computadora, sin necesidad de esperar subidas o descargas."
        },
        {
          q: "¿Hay algún límite en el tamaño de los archivos?",
          a: "¡No! Dado que los archivos se procesan en su dispositivo, no hay límites artificiales. Puede procesar fotos pesadas o de alta resolución fácilmente."
        }
      ]
    },
    fr: {
      headline: isGeneric 
        ? "SuperOptimize | Convertisseur d'images et Optimiseur gratuit" 
        : `Convertir ${from.toUpperCase()} en ${to.toUpperCase()} en ligne (100% local et sécurisé)`,
      description: isGeneric 
        ? "Optimisez, compressez et convertissez les images PNG, JPG, WEBP, AVIF, SVG et HEIC dans votre navigateur. Totalement sécurisé sans aucun upload." 
        : `Convertisseur gratuit en ligne de ${from.toUpperCase()} en ${to.toUpperCase()}. Toutes les conversions s'exécutent localement pour une confidentialité absolue.`,
      introTitle: isGeneric 
        ? "Rapide, sécurisé et sans frais de serveur" 
        : `Pourquoi convertir ${from.toUpperCase()} en ${to.toUpperCase()} ?`,
      introText: isGeneric 
        ? "SuperOptimize fonctionne entièrement côté client. Nous utilisons les API WebAssembly et Canvas du navigateur pour traiter vos images en quelques secondes. Aucune donnée ne quitte votre ordinateur." 
        : `La conversion de ${from.toUpperCase()} en ${to.toUpperCase()} vous aide à optimiser la compatibilité et les performances de vos pages web. ${
            from.toLowerCase() === 'heic' ? "Le format HEIC d'Apple est très compressé mais incompatible avec Windows ou Android. Le convertir en JPG résout tous les problèmes de compatibilité." : ''
          } ${
            to.toLowerCase() === 'webp' ? "Le WebP est le standard recommandé par Google. Il réduit la taille des fichiers jusqu'à 80% par rapport au PNG ou JPG." : ''
          } ${
            from.toLowerCase() === 'svg' ? "Le SVG est un format vectoriel. Le convertir en format raster comme le PNG ou JPG permet de l'utiliser facilement sur les réseaux sociaux." : ''
          } ${
            to.toLowerCase() === 'pdf' ? "Convertir vos images en PDF regroupe toutes vos photos en un seul document propre, idéal pour l'impression ou le partage." : ''
          } Profitez de conversions locales rapides, gratuites et sans connexion.`,
      faqs: [
        {
          q: `Est-ce que ce convertisseur de ${from.toUpperCase()} vers ${to.toUpperCase()} est sécurisé ?`,
          a: "Oui, à 100%. Contrairement aux convertisseurs en ligne classiques, SuperOptimize ne télécharge jamais vos images sur un serveur externe. Tout est traité localement."
        },
        {
          q: `Combien de temps prend la conversion de ${from.toUpperCase()} vers ${to.toUpperCase()} ?`,
          a: "Moins d'une seconde par image car elle est traitée localement sur votre ordinateur, évitant ainsi les files d'attente d'upload ou de téléchargement."
        },
        {
          q: "Existe-t-il une limite de taille pour les fichiers ?",
          a: "Non ! Comme les fichiers sont traités sur votre machine, il n'y a pas de limites artificielles de taille."
        }
      ]
    },
    de: {
      headline: isGeneric 
        ? "SuperOptimize | Kostenloser Bildkonverter & Optimierer" 
        : `Konvertieren Sie ${from.toUpperCase()} in ${to.toUpperCase()} Online (100% lokal & sicher)`,
      description: isGeneric 
        ? "Optimieren, komprimieren und konvertieren Sie PNG, JPG, WEBP, AVIF, SVG und HEIC Bilder direkt im Browser. 100% sicher ohne Server-Uploads." 
        : `Kostenloser Online-${from.toUpperCase()}-in-${to.toUpperCase()}-Konverter. Alle Prozesse laufen lokal auf Ihrem Gerät für absolute Privatsphäre.`,
      introTitle: isGeneric 
        ? "Schnell, sicher und absolut kostenlos" 
        : `Warum ${from.toUpperCase()} in ${to.toUpperCase()} konvertieren?`,
      introText: isGeneric 
        ? "SuperOptimize läuft vollständig auf der Client-Seite. Wir nutzen WebAssembly und Canvas-APIs Ihres Browsers, um Bildpakete in Sekunden zu verarbeiten. Es werden keine Daten übertragen." 
        : `Die Konvertierung von ${from.toUpperCase()} in ${to.toUpperCase()} verbessert die Web-Kompatibilität und Performance. ${
            from.toLowerCase() === 'heic' ? "Das HEIC-Format von Apple ist stark komprimiert, aber nicht mit Windows oder Android kompatibel. Die Konvertierung in JPG löst dieses Problem." : ''
          } ${
            to.toLowerCase() === 'webp' ? "WebP ist der moderne Google-Standard. Er reduziert Dateigrößen um bis zu 80% gegenüber PNG/JPG bei gleichbleibender Qualität." : ''
          } ${
            from.toLowerCase() === 'svg' ? "SVG ist ein Vektorformat. Die Konvertierung in ein Rasterbild wie PNG/JPG erleichtert die Nutzung in sozialen Medien." : ''
          } ${
            to.toLowerCase() === 'pdf' ? "Die Konvertierung von Bildern in PDF fasst alle Ihre Fotos in einem einzigen Dokument zusammen, ideal zum Drucken oder Versenden." : ''
          } Nutzen Sie schnelle, sichere und offline-fähige Konvertierungen.`,
      faqs: [
        {
          q: `Ist dieser ${from.toUpperCase()}-in-${to.toUpperCase()}-Konverter sicher?`,
          a: "Ja, absolut. Im Gegensatz zu anderen Online-Tools lädt SuperOptimize Ihre Dateien nicht hoch. Alles wird direkt lokal in Ihrem Browser verarbeitet."
        },
        {
          q: `Wie lange dauert die Konvertierung von ${from.toUpperCase()} in ${to.toUpperCase()}?`,
          a: "Weniger als eine Sekunde pro Bild, da die Verarbeitung lokal auf Ihrem Computer erfolgt und langsame Uploads entfallen."
        },
        {
          q: "Gibt es ein Limit für die Dateigröße?",
          a: "Nein! Da die Dateien auf Ihrem eigenen Gerät verarbeitet werden, gibt es keine künstlichen Einschränkungen."
        }
      ]
    },
    pt: {
      headline: isGeneric 
        ? "SuperOptimize | Conversor e Otimizador de Imagem Grátis" 
        : `Converter ${from.toUpperCase()} para ${to.toUpperCase()} Online (100% Local & Seguro)`,
      description: isGeneric 
        ? "Otimize, comprima e converta imagens PNG, JPG, WEBP, AVIF, SVG e HEIC no seu navegador. Totalmente seguro sem upload de imagens." 
        : `Conversor online gratuito de ${from.toUpperCase()} para ${to.toUpperCase()}. Todas as conversões ocorrem localmente no seu dispositivo. Sem limites de tamanho.`,
      introTitle: isGeneric 
        ? "Rápido, seguro e livre de custos de servidor" 
        : `Por que converter ${from.toUpperCase()} para ${to.toUpperCase()}?`,
      introText: isGeneric 
        ? "O SuperOptimize funciona inteiramente no lado do cliente. Usamos APIs WebAssembly e Canvas do navegador para processar suas fotos em segundos, garantindo total privacidade." 
        : `Converter ${from.toUpperCase()} para ${to.toUpperCase()} ajuda a otimizar a compatibilidade e a velocidade do seu site. ${
            from.toLowerCase() === 'heic' ? "O formato HEIC da Apple economiza espaço, mas não abre no Windows ou Android. A conversão para JPG resolve essa incompatibilidade." : ''
          } ${
            to.toLowerCase() === 'webp' ? "WebP é o formato de nova geração recomendado pelo Google, reduzindo o peso das imagens em até 80% sem perder qualidade." : ''
          } ${
            from.toLowerCase() === 'svg' ? "SVG é um formato vetorial. Convertê-lo em um formato rasterizado como PNG ou JPG facilita o uso em redes sociais e sites." : ''
          } ${
            to.toLowerCase() === 'pdf' ? "Converter imagens em PDF junta todas as suas fotos em um único arquivo limpo, excelente para impressão ou envio por e-mail." : ''
          } Aproveite conversões rápidas, seguras e offline.`,
      faqs: [
        {
          q: `Este conversor de ${from.toUpperCase()} para ${to.toUpperCase()} é seguro?`,
          a: "Sim, 100%. Ao contrário de conversores na nuvem, o SuperOptimize não envia suas fotos para servidores externos. Todo o processo ocorre no seu navegador."
        },
        {
          q: `Quanto tempo demora a conversão de ${from.toUpperCase()} para ${to.toUpperCase()}?`,
          a: "Leva menos de um segundo por imagem, pois ela é processada localmente na sua máquina, sem demoras de upload ou download."
        },
        {
          q: "Existe limite de tamanho de imagem?",
          a: "Não! Como as imagens são processadas localmente, você pode converter fotos pesadas de alta resolução sem qualquer restrição."
        }
      ]
    }
  };

  return content[lang] || content['en'];
};

const getHowToSchema = (lang, from, to) => {
  const stepsText = {
    en: [
      { name: "Upload File", text: `Select and upload your ${from} image using the drag-and-drop area.` },
      { name: "Adjust Settings", text: "Select your target output quality using the slider." },
      { name: "Download Output", text: `Click Optimize to start the client-side processing, then download your converted ${to} file.` }
    ],
    id: [
      { name: "Unggah Berkas", text: `Pilih dan unggah gambar ${from} Anda melalui area seret-dan-lepas.` },
      { name: "Sesuaikan Kualitas", text: "Tentukan tingkat kompresi kualitas output menggunakan slider." },
      { name: "Unduh Hasil", text: `Klik Optimalkan untuk memproses berkas secara lokal, lalu unduh file ${to} Anda.` }
    ],
    es: [
      { name: "Cargar Archivo", text: `Seleccione y cargue su imagen ${from} arrastrándola al convertidor.` },
      { name: "Ajustar Calidad", text: "Establezca la calidad de compresión de salida usando el control deslizante." },
      { name: "Descargar Resultado", text: `Haga clic en Optimizar para procesar el archivo localmente y descargue su imagen ${to}.` }
    ],
    fr: [
      { name: "Télécharger le Fichier", text: `Sélectionnez et déposez votre image ${from} dans la zone de dépôt.` },
      { name: "Ajuster les Paramètres", text: "Réglez la qualité de compression de sortie à l'aide du curseur." },
      { name: "Télécharger le Résultat", text: `Cliquez sur Tout Optimiser pour démarrer la conversion locale, puis téléchargez votre fichier ${to}.` }
    ],
    de: [
      { name: "Datei Hochladen", text: `Wählen Sie Ihr ${from}-Bild aus und laden Sie es über das Drag-and-Drop-Feld hoch.` },
      { name: "Einstellungen Anpassen", text: "Wählen Sie die gewünschte Ausgabequalität über den Schieberegler." },
      { name: "Ergebnis Herunterladen", text: `Klicken Sie auf Optimieren, um die Konvertierung zu starten, und laden Sie die fertige ${to}-Datei herunter.` }
    ],
    pt: [
      { name: "Enviar Arquivo", text: `Selecione e envie sua imagem ${from} usando a área de arrastar e soltar.` },
      { name: "Ajustar Qualidade", text: "Selecione a qualidade de compressão de saída usando o controle deslizante." },
      { name: "Baixar Resultado", text: `Clique em Otimizar para iniciar o processamento local e baixe seu arquivo ${to} convertido.` }
    ]
  };

  const steps = stepsText[lang] || stepsText['en'];

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": lang === 'id' ? `Cara Mengonversi ${from} ke ${to}` : lang === 'es' ? `Cómo convertir ${from} a ${to}` : `How to Convert ${from} to ${to}`,
    "step": steps.map((s, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": s.name,
      "text": s.text
    }))
  };
};

const getFormatComparisonData = (from, to, lang) => {
  const translationsSpec = {
    en: {
      type: "Format Type",
      transparency: "Transparency Support",
      animation: "Animation Support",
      size: "Typical File Size",
      use: "Primary Use Case",
      yes: "Yes",
      no: "No",
      details: {
        png: { type: 'Raster (Lossless)', use: 'Web graphics with transparency, screenshots' },
        jpg: { type: 'Raster (Lossy)', use: 'Digital photos, standard web images' },
        jpeg: { type: 'Raster (Lossy)', use: 'Digital photos, standard web images' },
        webp: { type: 'Raster (Lossy/Lossless)', use: 'Optimized modern web delivery (Recommended)' },
        avif: { type: 'Raster (Lossy/Lossless)', use: 'Next-gen web image compression' },
        svg: { type: 'Vector (Lossless)', use: 'Logos, vector icons, responsive layout shapes' },
        heic: { type: 'Raster (Lossy/Lossless)', use: 'Apple iPhone device default photo storage' },
        pdf: { type: 'Document (Lossless)', use: 'Document presentation, multi-page portfolios' }
      }
    },
    id: {
      type: "Tipe Format",
      transparency: "Dukungan Transparansi",
      animation: "Dukungan Animasi",
      size: "Rata-rata Ukuran File",
      use: "Tujuan Penggunaan Utama",
      yes: "Ya",
      no: "Tidak",
      details: {
        png: { type: 'Raster (Tanpa Hilang)', use: 'Grafik web transparan, tangkapan layar' },
        jpg: { type: 'Raster (Kompresi Hilang)', use: 'Foto digital, gambar web standar' },
        jpeg: { type: 'Raster (Kompresi Hilang)', use: 'Foto digital, gambar web standar' },
        webp: { type: 'Raster (Dua Kompresi)', use: 'Pengiriman gambar web yang dioptimalkan (Rekomendasi)' },
        avif: { type: 'Raster (Dua Kompresi)', use: 'Kompresi gambar web generasi berikutnya' },
        svg: { type: 'Vektor (Tanpa Hilang)', use: 'Logo, ikon vektor, grafik web responsif' },
        heic: { type: 'Raster (Dua Kompresi)', use: 'Penyimpanan foto default perangkat Apple iPhone' },
        pdf: { type: 'Dokumen (Tanpa Hilang)', use: 'Presentasi dokumen, portofolio banyak halaman' }
      }
    },
    es: {
      type: "Tipo de Formato",
      transparency: "Soporte de Transparencia",
      animation: "Soporte de Animación",
      size: "Tamaño Típico de Archivo",
      use: "Caso de Uso Principal",
      yes: "Sí",
      no: "No",
      details: {
        png: { type: 'Rasterizado (Sin pérdidas)', use: 'Gráficos web con transparencia, capturas de pantalla' },
        jpg: { type: 'Rasterizado (Con pérdidas)', use: 'Fotos digitales, imágenes web estándar' },
        jpeg: { type: 'Rasterizado (Con pérdidas)', use: 'Fotos digitales, imágenes web estándar' },
        webp: { type: 'Rasterizado (Con/Sin pérdidas)', use: 'Entrega web optimizada moderna (Recomendado)' },
        avif: { type: 'Rasterizado (Con/Sin pérdidas)', use: 'Compresión de imagen web de próxima generación' },
        svg: { type: 'Vectorial (Sin pérdidas)', use: 'Logotipos, iconos vectoriales, gráficos web responsivos' },
        heic: { type: 'Rasterizado (Con/Sin pérdidas)', use: 'Almacenamiento de fotos predeterminado de iPhone' },
        pdf: { type: 'Documento (Sin pérdidas)', use: 'Presentación de documentos, portafolios de varias páginas' }
      }
    },
    fr: {
      type: "Type de format",
      transparency: "Prise en charge de la transparence",
      animation: "Prise en charge de l'animation",
      size: "Taille de fichier typique",
      use: "Cas d'utilisation principal",
      yes: "Oui",
      no: "Non",
      details: {
        png: { type: 'Raster (Sans perte)', use: 'Graphismes web transparents, captures d\'écran' },
        jpg: { type: 'Raster (Avec perte)', use: 'Photos numériques, images web standard' },
        jpeg: { type: 'Raster (Avec perte)', use: 'Photos numériques, images web standard' },
        webp: { type: 'Raster (Avec/Sans perte)', use: 'Affichage web moderne optimisé (Recommandé)' },
        avif: { type: 'Raster (Avec/Sans perte)', use: 'Compression web de nouvelle génération' },
        svg: { type: 'Vectoriel (Sans perte)', use: 'Logos, icônes vectorielles, graphismes web réactifs' },
        heic: { type: 'Raster (Avec/Sans perte)', use: 'Stockage photo par défaut sur Apple iPhone' },
        pdf: { type: 'Document (Sans perte)', use: 'Présentation de documents, portfolios multi-pages' }
      }
    },
    de: {
      type: "Format-Typ",
      transparency: "Transparenz-Unterstützung",
      animation: "Animations-Unterstützung",
      size: "Typische Dateigröße",
      use: "Primärer Verwendungszweck",
      yes: "Ja",
      no: "Nein",
      details: {
        png: { type: 'Raster (Verlustfrei)', use: 'Webgrafiken mit Transparenz, Screenshots' },
        jpg: { type: 'Raster (Verlustbehaftet)', use: 'Digitale Fotos, Standard-Webbilder' },
        jpeg: { type: 'Raster (Verlustbehaftet)', use: 'Digitale Fotos, Standard-Webbilder' },
        webp: { type: 'Raster (Verlustbehaftet/Verlustfrei)', use: 'Optimierte moderne Webausgabe (Empfohlen)' },
        avif: { type: 'Raster (Verlustbehaftet/Verlustfrei)', use: 'Web-Bildkompression der nächsten Generation' },
        svg: { type: 'Vektor (Verlustfrei)', use: 'Logos, Vektorsymbole, responsive Webgrafiken' },
        heic: { type: 'Raster (Verlustbehaftet/Verlustfrei)', use: 'Standard-Fotospeicher auf Apple iPhones' },
        pdf: { type: 'Dokument (Verlustfrei)', use: 'Dokumentenpräsentation, mehrseitige Portfolios' }
      }
    },
    pt: {
      type: "Tipo de Formato",
      transparency: "Suporte de Transparência",
      animation: "Suporte de Animação",
      size: "Tamanho de Arquivo Típico",
      use: "Caso de Uso Principal",
      yes: "Sim",
      no: "Não",
      details: {
        png: { type: 'Rasterizado (Sem perdas)', use: 'Gráficos web transparentes, capturas de tela' },
        jpg: { type: 'Rasterizado (Com perdas)', use: 'Fotos digitais, imagens de sites comuns' },
        jpeg: { type: 'Rasterizado (Com perdas)', use: 'Fotos digitais, imagens de sites comuns' },
        webp: { type: 'Rasterizado (Com/Sem perdas)', use: 'Entrega web moderna otimizada (Recomendado)' },
        avif: { type: 'Rasterizado (Com/Sem perdas)', use: 'Compressão de imagem web de próxima geração' },
        svg: { type: 'Vetorial (Sem perdas)', use: 'Logotipos, ícones vetoriais, gráficos de sites responsivos' },
        heic: { type: 'Rasterizado (Com/Sem perdas)', use: 'Armazenamento de fotos padrão do Apple iPhone' },
        pdf: { type: 'Documento (Sem perdas)', use: 'Apresentação de documentos, portfólios multi-páginas' }
      }
    }
  };

  const tSpec = translationsSpec[lang] || translationsSpec['en'];
  
  const rawDetails = {
    png: { transparency: tSpec.yes, animation: tSpec.no, size: 'Medium/Large' },
    jpg: { transparency: tSpec.no, animation: tSpec.no, size: 'Medium' },
    jpeg: { transparency: tSpec.no, animation: tSpec.no, size: 'Medium' },
    webp: { transparency: tSpec.yes, animation: tSpec.yes, size: 'Tiny/Small' },
    avif: { transparency: tSpec.yes, animation: tSpec.yes, size: 'Ultra Tiny' },
    svg: { transparency: tSpec.yes, animation: tSpec.yes, size: 'Very Small' },
    heic: { transparency: tSpec.yes, animation: tSpec.no, size: 'Small' },
    pdf: { transparency: tSpec.no, animation: tSpec.no, size: 'Large' }
  };

  const fFrom = from.toLowerCase();
  const fTo = to.toLowerCase();

  const detailsFrom = { ...rawDetails[fFrom], ...tSpec.details[fFrom] };
  const detailsTo = { ...rawDetails[fTo], ...tSpec.details[fTo] };

  return {
    headers: [tSpec.type, tSpec.transparency, tSpec.animation, tSpec.size, tSpec.use],
    fromName: from.toUpperCase(),
    toName: to.toUpperCase(),
    fromData: [detailsFrom.type, detailsFrom.transparency, detailsFrom.animation, detailsFrom.size, detailsFrom.use],
    toData: [detailsTo.type, detailsTo.transparency, detailsTo.animation, detailsTo.size, detailsTo.use]
  };
};

const generateComparisonTableHtml = (from, to, lang) => {
  if (!from || !to) return '';
  const data = getFormatComparisonData(from, to, lang);
  
  return `
    <div class="glass-panel" style="margin-top: 2rem;">
      <h3 class="section-title text-gradient" style="margin-bottom: 1.5rem; text-align: center;">
        ${data.fromName} vs ${data.toName}
      </h3>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; min-width: 500px;">
          <thead>
            <tr style="border-bottom: 2px solid var(--glass-border);">
              <th style="padding: 1rem; color: var(--text-muted);">Feature</th>
              <th style="padding: 1rem; font-weight: 600;">${data.fromName}</th>
              <th style="padding: 1rem; font-weight: 600;">${data.toName}</th>
            </tr>
          </thead>
          <tbody>
            ${data.headers.map((header, idx) => `
              <tr style="border-bottom: 1px solid var(--glass-border);">
                <td style="padding: 1rem; font-weight: 600; color: var(--text-muted);">${header}</td>
                <td style="padding: 1rem;">${data.fromData[idx]}</td>
                <td style="padding: 1rem;">${data.toData[idx]}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
};

const generateLinkingGridHtml = (lang, currentFrom, currentTo) => {
  const gridFormats = ['PNG', 'JPG', 'WEBP', 'AVIF', 'SVG', 'HEIC', 'PDF'];
  const titles = {
    en: "Other Popular Converters",
    id: "Konverter Populer Lainnya",
    es: "Otros Convertidores Populares",
    fr: "Autres Convertisseurs Populaires",
    de: "Andere Beliebte Konverter",
    pt: "Outros Conversores Populares"
  };

  let html = `
    <div class="glass-panel" style="margin-top: 3rem; padding: 2.5rem 2rem;">
      <h3 class="section-title text-gradient" style="margin-bottom: 2rem; text-align: center; font-size: 1.4rem;">${titles[lang] || titles['en']}</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1.2rem;">
  `;

  // Generate contextual links to match SPA
  const links = [];
  
  if (currentFrom && currentTo) {
    // 1. Same source conversions
    for (const fTo of gridFormats) {
      if (fTo !== 'HEIC' && fTo !== currentFrom && fTo !== currentTo) {
        links.push({ from: currentFrom, to: fTo });
      }
    }
    
    // 2. Same target conversions
    for (const fFrom of gridFormats) {
      if (fFrom !== 'PDF' && fFrom !== currentFrom && fFrom !== currentTo) {
        links.push({ from: fFrom, to: currentTo });
      }
    }
  }

  // 3. General fallbacks
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

  const visibleLinks = links.slice(0, 16);

  visibleLinks.forEach(link => {
    const routePath = lang === 'en' 
      ? `convert/${link.from.toLowerCase()}-to-${link.to.toLowerCase()}` 
      : `${lang}/convert/${link.from.toLowerCase()}-to-${link.to.toLowerCase()}`;
    
    const label = `${link.from} ➔ ${link.to}`;
    html += `
      <a href="/${routePath}" class="linking-grid-anchor">${label}</a>
    `;
  });

  html += `
      </div>
    </div>
  `;
  return html;
};

// Generate pre-rendered static content string to be hydrated inside #root
const generateStaticHtml = (lang, from = '', to = '') => {
  const trans = translations[lang];
  const seo = getSeoContent(lang, from, to);
  
  const fromDisplay = from || 'PNG';
  const toDisplay = to || 'WEBP';

  return `
    <div class="app-container">
      <header class="main-header">
        <div class="header-top">
          <div class="logo-area">
            <h1 class="logo"><span class="text-gradient">${trans.title}</span></h1>
          </div>
          <div class="lang-selector">
            <span>🌐 ${lang.toUpperCase()}</span>
          </div>
        </div>
        <div class="hero-content">
          <h2 class="headline">${seo.headline}</h2>
          <p class="subtitle">${seo.description}</p>
        </div>
      </header>

      <main class="main-content">
        <div class="glass-panel format-selector-card" style="text-align: center;">
          <h3 class="section-title">${trans.targetFormat}</h3>
          <p style="font-size: 1.2rem; font-weight: 600; color: var(--secondary);">${fromDisplay} ➔ ${toDisplay}</p>
        </div>

        <div class="glass-panel converter-card" style="padding: 4rem 2rem; text-align: center; border: 2px dashed var(--glass-border);">
          <div style="font-size: 4rem; margin-bottom: 1rem; color: var(--secondary);">☁️</div>
          <h3>${trans.dropzoneDefault}</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">Accepts only .${fromDisplay.toLowerCase()} files</p>
        </div>

        ${from && to ? generateComparisonTableHtml(from, to, lang) : ''}

        <section class="seo-intro-section glass-panel">
          <h3 class="section-title text-gradient">${seo.introTitle}</h3>
          <p class="seo-text">${seo.introText}</p>
        </section>

        <div class="features-grid">
          <div class="feature-card">
            <div style="font-size: 2.2rem; color: var(--secondary); margin-bottom: 1.2rem;">🔒</div>
            <h4 class="feature-title">${trans.featPrivacyTitle}</h4>
            <p class="feature-desc">${trans.featPrivacyDesc}</p>
          </div>
          <div class="feature-card">
            <div style="font-size: 2.2rem; color: var(--secondary); margin-bottom: 1.2rem;">⚡</div>
            <h4 class="feature-title">${trans.featSpeedTitle}</h4>
            <p class="feature-desc">${trans.featSpeedDesc}</p>
          </div>
          <div class="feature-card">
            <div style="font-size: 2.2rem; color: var(--secondary); margin-bottom: 1.2rem;">♾️</div>
            <h4 class="feature-title">${trans.featFreeTitle}</h4>
            <p class="feature-desc">${trans.featFreeDesc}</p>
          </div>
        </div>

        <section class="faq-section glass-panel">
          <h3 class="section-title text-gradient" style="text-align: center; margin-bottom: 2rem;">${trans.faqTitle}</h3>
          <div class="faq-list">
            ${seo.faqs.map(faq => `
              <div class="faq-item">
                <h4 class="faq-question">❓ ${faq.q}</h4>
                <p class="faq-answer">${faq.a}</p>
              </div>
            `).join('')}
          </div>
        </section>

        ${generateLinkingGridHtml(lang, from, to)}
      </main>

      <footer style="text-align: center; padding: 2rem 0; margin-top: 3rem; border-top: 1px solid var(--glass-border); color: var(--text-muted);">
        <p>&copy; 2026 ${trans.title}. Engineered for speed and privacy.</p>
      </footer>
    </div>
  `;
};

// Generates hreflang alternate headers
const getHreflangHtml = (from, to) => {
  const baseDomain = "https://superoptimize.com";
  const pathConvert = from && to ? `/convert/${from.toLowerCase()}-to-${to.toLowerCase()}` : '';
  
  return languages.map(l => {
    const langPrefix = l === 'en' ? '' : `/${l}`;
    return `<link rel="alternate" hreflang="${l}" href="${baseDomain}${langPrefix}${pathConvert}" />`;
  }).join('\n    ');
};

const getJsonLdSchema = (seoDescription) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SuperOptimize",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": seoDescription,
    "featureList": [
      "100% Client-Side Processing",
      "No Server Uploads",
      "Bulk Image Compression",
      "HEIC, SVG, PNG, JPG, WEBP, AVIF Conversion"
    ]
  };
  return `<script type="application/ld+json" id="json-ld-schema">${JSON.stringify(schema)}</script>`;
};

// Start generation matrix
const routes = [];

// Main generic routes
languages.forEach(lang => {
  routes.push({ lang, from: '', to: '', path: lang === 'en' ? '' : lang });
});

// Conversion pages routing
languages.forEach(lang => {
  formats.forEach(fFrom => {
    // Convert tool
    formats.forEach(fTo => {
      if (fFrom !== fTo && fFrom !== 'PDF' && fTo !== 'HEIC') {
        const routePath = lang === 'en' 
          ? `convert/${fFrom.toLowerCase()}-to-${fTo.toLowerCase()}` 
          : `${lang}/convert/${fFrom.toLowerCase()}-to-${fTo.toLowerCase()}`;
        
        routes.push({ lang, tool: 'convert', from: fFrom, to: fTo, path: routePath });
      }
    });

    // Compress tool
    if (fFrom !== 'PDF' && fFrom !== 'HEIC') {
      const compressPath = lang === 'en'
        ? `compress/${fFrom.toLowerCase()}`
        : `${lang}/compress/${fFrom.toLowerCase()}`;
      routes.push({ lang, tool: 'compress', from: fFrom, to: '', path: compressPath });
    }

    // Resize tool
    if (fFrom !== 'PDF' && fFrom !== 'HEIC') {
      const resizePath = lang === 'en'
        ? `resize/${fFrom.toLowerCase()}`
        : `${lang}/resize/${fFrom.toLowerCase()}`;
      routes.push({ lang, tool: 'resize', from: fFrom, to: '', path: resizePath });
    }
  });
});

console.log(`Generating ${routes.length} Programmatic SEO Pages...`);

routes.forEach(route => {
  const { lang, tool, from, to, path: routePath } = route;
  
  let seo;
  // This is a simplified fallback for prerender
  if (tool === 'compress') seo = { headline: `Compress ${from} Online`, description: `Free online ${from} compressor.` };
  else if (tool === 'resize') seo = { headline: `Resize ${from} Online`, description: `Free online ${from} resizer.` };
  else seo = getSeoContent(lang, from, to);
  
  // Dynamic Head tags replacement
  let html = template;
  
  // Replace page Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${seo.headline}</title>`);
  
  // Replace/Inject Meta Description
  const metaDescTag = `<meta name="description" content="${seo.description}" />`;
  html = html.replace(/<meta name="viewport".*?\/>/, match => `${match}\n    ${metaDescTag}`);

  // Inject hreflangs, canononical and JSON-LD
  const canonicalUrl = `https://superoptimize.com/${routePath}`;
  const seoInjections = `
    <link rel="canonical" href="${canonicalUrl}" />
    ${getHreflangHtml(from, to)}
    ${getJsonLdSchema(seo.description)}
  `;
  
  html = html.replace('</head>', `${seoInjections}\n</head>`);
  
  // Pre-render static HTML inside #root
  const staticContent = generateStaticHtml(lang, from, to);
  html = html.replace('<div id="root"></div>', `<div id="root">${staticContent}</div>`);
  
  // Save HTML to output
  const targetDir = path.join(distDir, routePath);
  if (routePath !== '' && !fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  const targetFile = routePath === '' 
    ? path.join(distDir, 'index.html') 
    : path.join(targetDir, 'index.html');
    
  fs.writeFileSync(targetFile, html, 'utf8');
});

// GENERATE SITEMAP.XML
console.log("Generating XML Sitemap Index...");
const baseDomain = "https://superoptimize.com";
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

routes.forEach(route => {
  const { tool, from, to, path: routePath } = route;
  const url = `${baseDomain}/${routePath}`;
  
  sitemapXml += `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${from && to ? '0.8' : '1.0'}</priority>\n`;
    
  languages.forEach(l => {
    let alternatePath = l;
    if (tool === 'convert' && from && to) {
      alternatePath = l === 'en' ? `convert/${from.toLowerCase()}-to-${to.toLowerCase()}` : `${l}/convert/${from.toLowerCase()}-to-${to.toLowerCase()}`;
    } else if (tool === 'compress' && from) {
      alternatePath = l === 'en' ? `compress/${from.toLowerCase()}` : `${l}/compress/${from.toLowerCase()}`;
    } else if (tool === 'resize' && from) {
      alternatePath = l === 'en' ? `resize/${from.toLowerCase()}` : `${l}/resize/${from.toLowerCase()}`;
    }
      
    sitemapXml += `    <xhtml:link rel="alternate" hreflang="${l}" href="${baseDomain}/${alternatePath}" />\n`;
  });
  
  sitemapXml += `  </url>\n`;
});

sitemapXml += `</urlset>`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');

console.log("Sitemap XML successfully created.");
console.log("Programmatic SEO generation COMPLETED successfully!");
