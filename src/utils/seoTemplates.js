export const getCompressSeoContent = (lang, format = '') => {
  const isGeneric = !format;
  const f = format.toUpperCase();
  
  const content = {
    en: {
      headline: isGeneric ? "Best Free Online Image Compressor" : `Compress ${f} Images Without Losing Quality`,
      description: isGeneric ? "Reduce image file size instantly with the best free online image compressor. Perfect for website optimization and saving storage space. 100% secure, no uploads." : `Free online ${f} compressor. Reduce ${f} file size locally on your device for absolute privacy. Optimize images for web performance.`,
      introTitle: isGeneric ? "Fast Image Compression Tool" : `Why Compress ${f} Images?`,
      introText: `Compressing ${f ? f : 'image'} files is the most effective way to save bandwidth and improve website loading speeds. Local Img Tools is a client-side image optimizer, meaning your files are processed directly in your browser and never uploaded to any server.`,
      faqs: [
        { q: `Is this ${f ? f : 'bulk image'} compressor safe?`, a: "Yes, 100%. Local Img Tools does not upload your files to any external server. All compression runs securely on your local machine." },
        { q: `How much can I compress my ${f ? f : 'images'}?`, a: "You can reduce file sizes by up to 80-90% depending on the format and selected quality, with minimal visible quality loss, making it the best image compressor for website optimization." }
      ]
    },
    id: {
      headline: isGeneric ? "Local Img Tools | Kompresor Gambar Online Gratis" : `Kompres Gambar ${f} Online (100% Lokal)`,
      description: isGeneric ? "Kompres dan kurangi ukuran file gambar tanpa kehilangan kualitas. Proses berjalan sepenuhnya offline di browser Anda." : `Kompresor ${f} online gratis. Kurangi ukuran file ${f} secara lokal di perangkat Anda demi privasi mutlak.`,
      introTitle: isGeneric ? "Kompresi Gambar Cepat" : `Mengapa Mengompres Gambar ${f}?`,
      introText: `Mengompres file ${f ? f : 'gambar'} membantu Anda menghemat bandwidth dan meningkatkan kecepatan muat situs web. Local Img Tools berjalan sepenuhnya client-side, file Anda tidak pernah diunggah.`,
      faqs: [
        { q: `Apakah kompresor ${f ? f : ''} ini aman?`, a: "Ya, 100%. Local Img Tools tidak mengunggah file Anda ke server eksternal mana pun. Pemrosesan lokal." },
        { q: `Seberapa banyak saya bisa mengompres ${f ? f : 'gambar'}?`, a: "Anda dapat mengurangi ukuran file hingga 80-90% dengan kehilangan kualitas visual yang minimal." }
      ]
    }
    // Fallback to English for other languages for brevity in this expansion
  };

  return content[lang] || content['en'];
};

export const getResizeSeoContent = (lang, format = '') => {
  const isGeneric = !format;
  const f = format.toUpperCase();
  
  const content = {
    en: {
      headline: isGeneric ? "Free Online Image Resizer & Dimension Changer" : `Resize ${f} Images for Web & Social Media`,
      description: isGeneric ? "Change image dimensions and resize pictures easily in your browser. The best bulk image resizer for e-commerce and social platforms. Absolutely secure and private." : `Free online ${f} resizer. Change dimensions of ${f} images locally on your device without limits or uploads.`,
      introTitle: isGeneric ? "Resize Images Instantly" : `Why Resize ${f} Images?`,
      introText: `Resizing ${f ? f : 'image'} files is essential for social media, web performance, and meeting specific e-commerce platform requirements (like Shopify or Amazon). Local Img Tools acts as a powerful bulk image resizer directly in your browser.`,
      faqs: [
        { q: `Is this ${f ? f : ''} resizer private?`, a: "Yes, 100%. We use your browser's Canvas API to resize images locally. No data ever leaves your device." },
        { q: `Does resizing ${f ? f : 'images'} affect quality?`, a: "Downsizing images generally retains crispness. We use high-quality interpolation algorithms to ensure the best results when changing dimensions." }
      ]
    },
    id: {
      headline: isGeneric ? "Local Img Tools | Pengubah Ukuran Gambar Gratis" : `Ubah Ukuran ${f} Online (100% Lokal)`,
      description: isGeneric ? "Ubah dimensi gambar dengan mudah di browser Anda. Sangat aman dan privat." : `Pengubah ukuran ${f} online gratis. Ubah dimensi ${f} secara lokal di perangkat Anda tanpa batas.`,
      introTitle: isGeneric ? "Ubah Ukuran Instan" : `Mengapa Mengubah Ukuran ${f}?`,
      introText: `Mengubah ukuran ${f ? f : 'gambar'} penting untuk media sosial dan performa web. Local Img Tools mengubah ukuran gambar Anda secara lokal.`,
      faqs: [
        { q: `Apakah pengubah ukuran ${f ? f : ''} ini privat?`, a: "Ya, 100%. Pemrosesan lokal menggunakan Canvas API." },
        { q: `Apakah mengubah ukuran mempengaruhi kualitas?`, a: "Mengecilkan gambar tetap menjaga ketajaman berkat interpolasi kualitas tinggi yang kami gunakan." }
      ]
    }
  };

  return content[lang] || content['en'];
};

export const getWatermarkSeoContent = (lang, format = '') => {
  const isGeneric = !format;
  const f = format.toUpperCase();
  
  const content = {
    en: {
      headline: isGeneric ? "Local Img Tools | Free Online Image Watermark" : `Watermark ${f} Images Online (100% Local)`,
      description: isGeneric ? "Add text watermarks to your images instantly in your browser. Absolutely secure and private." : `Free online ${f} watermark tool. Protect your ${f} images locally on your device without uploads.`,
      introTitle: isGeneric ? "Watermark Images Instantly" : `Why Watermark ${f} Images?`,
      introText: `Watermarking ${f ? f : 'image'} files protects your copyright and brand identity. Local Img Tools watermarks your images locally using your device's power, ensuring zero risk of theft.`,
      faqs: [
        { q: `Is this ${f ? f : ''} watermark tool private?`, a: "Yes, 100%. We use your browser's Canvas API to stamp images locally. No data leaves your device." },
        { q: `Can I watermark multiple ${f ? f : 'images'} at once?`, a: "Absolutely! Our bulk processor allows you to watermark hundreds of images in seconds." }
      ]
    },
    id: {
      headline: isGeneric ? "Local Img Tools | Watermark Gambar Gratis" : `Watermark ${f} Online (100% Lokal)`,
      description: isGeneric ? "Tambahkan watermark teks ke gambar dengan mudah di browser Anda. Sangat aman dan privat." : `Alat watermark ${f} online gratis. Lindungi gambar ${f} secara lokal di perangkat Anda tanpa batas.`,
      introTitle: isGeneric ? "Watermark Instan" : `Mengapa Menambahkan Watermark pada ${f}?`,
      introText: `Menambahkan watermark pada ${f ? f : 'gambar'} melindungi hak cipta Anda. Local Img Tools memproses watermark secara lokal, memastikan gambar Anda tidak pernah diunggah ke server manapun.`,
      faqs: [
        { q: `Apakah alat watermark ${f ? f : ''} ini privat?`, a: "Ya, 100%. Pemrosesan lokal menggunakan Canvas API." },
        { q: `Bisakah saya menambahkan watermark pada banyak gambar sekaligus?`, a: "Tentu! Alat kami memproses ratusan gambar dalam hitungan detik." }
      ]
    }
  };

  return content[lang] || content['en'];
};

export const getSeoContent = (lang, from = '', to = '') => {
  const isGeneric = !from || !to;
  
  const content = {
    en: {
      headline: isGeneric 
        ? "Free Client-Side Image Converter & Optimizer" 
        : `Convert ${from.toUpperCase()} to ${to.toUpperCase()} Without Losing Quality`,
      description: isGeneric 
        ? "Optimize, compress, and convert PNG, JPG, WEBP, AVIF, SVG, and HEIC images in your browser. The safest client-side image tool with zero server uploads." 
        : `Free online ${from.toUpperCase()} to ${to.toUpperCase()} converter. Fast client-side conversion for absolute privacy. No size limits, no server uploads.`,
      introTitle: isGeneric 
        ? "Fast, Safe, and Zero Server Fees" 
        : `Why Convert ${from.toUpperCase()} to ${to.toUpperCase()}?`,
      introText: isGeneric 
        ? "Local Img Tools is a premium client-side image optimizer. We utilize browser WebAssembly and Canvas APIs so you can process large image bundles in seconds. No data ever leaves your computer." 
        : `Converting ${from.toUpperCase()} to ${to.toUpperCase()} helps you optimize web compatibility and performance. ${
            from.toLowerCase() === 'heic' ? "Converting HEIC to JPG is crucial because Apple's HEIC format is highly compressed but often incompatible with Windows, Android, or web uploads. Our tool converts HEIC to JPG without losing quality, instantly in your browser." : ''
          } ${
            to.toLowerCase() === 'webp' ? "WebP is the modern standard recommended by Google. It reduces file sizes by up to 80% compared to PNG or JPG while keeping transparency, making it ideal for website speed optimization." : ''
          } ${
            from.toLowerCase() === 'svg' ? "SVG is a vector format. Converting it to a raster format like PNG or JPG makes it easy to use on social media and other platforms." : ''
          } ${
            to.toLowerCase() === 'pdf' ? "Converting images to PDF bundles all your photos into a single, clean document, perfect for printing, sharing, or submitting official documents." : ''
          } Enjoy fast, secure, offline conversions.`,
      faqs: [
        {
          q: `Is this ${from.toUpperCase()} to ${to.toUpperCase()} converter safe?`,
          a: `Yes, 100%. Unlike typical online converters, Local Img Tools does not upload your files to any external server. All conversion logic runs securely inside your browser.`
        },
        {
          q: `How long does the ${from.toUpperCase()} to ${to.toUpperCase()} conversion take?`,
          a: "It takes less than a second per image because the file is processed locally on your computer, eliminating upload and download bottlenecks entirely."
        },
        {
          q: "Are there any file size limits for conversion?",
          a: "No! Since files are processed on your device rather than our servers, you can process high-resolution raw photos without limits or subscription fees."
        }
      ]
    },
    id: {
      headline: isGeneric 
        ? "Local Img Tools | Konverter & Kompresor Gambar Lokal Gratis" 
        : `Konversi ${from.toUpperCase()} ke ${to.toUpperCase()} Online (100% Lokal & Aman)`,
      description: isGeneric 
        ? "Optimalkan, kompres, dan konversi gambar PNG, JPG, WEBP, AVIF, SVG, dan HEIC di browser Anda. Aman tanpa unggah ke server." 
        : `Konverter ${from.toUpperCase()} ke ${to.toUpperCase()} online gratis. Pemrosesan berjalan lokal di perangkat Anda demi menjaga privasi penuh. Tanpa batas ukuran.`,
      introTitle: isGeneric 
        ? "Cepat, Aman, dan Tanpa Biaya Server" 
        : `Mengapa Mengonversi ${from.toUpperCase()} ke ${to.toUpperCase()}?`,
      introText: isGeneric 
        ? "Local Img Tools berjalan sepenuhnya secara client-side. Kami memanfaatkan API WebAssembly dan Canvas browser agar Anda bisa memproses banyak gambar sekaligus. Data Anda tidak pernah keluar dari komputer." 
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
          a: `Sangat aman. Berbeda dengan konverter online lainnya, Local Img Tools tidak mengunggah file Anda ke server eksternal mana pun. Pemrosesan berjalan di browser Anda.`
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
        ? "Local Img Tools | Convertidor y Compresor de Imágenes Gratis" 
        : `Convertir ${from.toUpperCase()} a ${to.toUpperCase()} Gratis (100% Local y Seguro)`,
      description: isGeneric 
        ? "Optimice, comprima y convierta imágenes PNG, JPG, WEBP, AVIF, SVG y HEIC en su navegador. Completamente seguro sin subir al servidor." 
        : `Convertidor gratis de ${from.toUpperCase()} a ${to.toUpperCase()} online. Todas las conversiones se ejecutan localmente para una privacidad absoluta. Sin límites.`,
      introTitle: isGeneric 
        ? "Rápido, Seguro y sin Costos de Servidor" 
        : `¿Por qué convertir ${from.toUpperCase()} a ${to.toUpperCase()}?`,
      introText: isGeneric 
        ? "Local Img Tools se ejecuta completamente en el lado del cliente. Utilizamos las API WebAssembly y Canvas del navegador para procesar lotes de imágenes en segundos. Sus datos nunca salen de su computadora." 
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
          a: "Sí, al 100%. A diferencia de otros convertidores en línea, Local Img Tools no sube sus archivos a ningún servidor externo. Todo ocurre en su propio navegador."
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
        ? "Local Img Tools | Convertisseur d'images et Optimiseur gratuit" 
        : `Convertir ${from.toUpperCase()} en ${to.toUpperCase()} en ligne (100% local et sécurisé)`,
      description: isGeneric 
        ? "Optimisez, compressez et convertissez les images PNG, JPG, WEBP, AVIF, SVG et HEIC dans votre navigateur. Totalement sécurisé sans aucun upload." 
        : `Convertisseur gratuit en ligne de ${from.toUpperCase()} en ${to.toUpperCase()}. Toutes les conversions s'exécutent localement pour une confidentialité absolue.`,
      introTitle: isGeneric 
        ? "Rapide, sécurisé et sans frais de serveur" 
        : `Pourquoi convertir ${from.toUpperCase()} en ${to.toUpperCase()} ?`,
      introText: isGeneric 
        ? "Local Img Tools fonctionne entièrement côté client. Nous utilisons les API WebAssembly et Canvas du navigateur pour traiter vos images en quelques secondes. Aucune donnée ne quitte votre ordinateur." 
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
          a: "Oui, à 100%. Contrairement aux convertisseurs en ligne classiques, Local Img Tools ne télécharge jamais vos images sur un serveur externe. Tout est traité localement."
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
        ? "Local Img Tools | Kostenloser Bildkonverter & Optimierer" 
        : `Konvertieren Sie ${from.toUpperCase()} in ${to.toUpperCase()} Online (100% lokal & sicher)`,
      description: isGeneric 
        ? "Optimieren, komprimieren und konvertieren Sie PNG, JPG, WEBP, AVIF, SVG und HEIC Bilder direkt im Browser. 100% sicher ohne Server-Uploads." 
        : `Kostenloser Online-${from.toUpperCase()}-in-${to.toUpperCase()}-Konverter. Alle Prozesse laufen lokal auf Ihrem Gerät für absolute Privatsphäre.`,
      introTitle: isGeneric 
        ? "Schnell, sicher und absolut kostenlos" 
        : `Warum ${from.toUpperCase()} in ${to.toUpperCase()} konvertieren?`,
      introText: isGeneric 
        ? "Local Img Tools läuft vollständig auf der Client-Seite. Wir nutzen WebAssembly und Canvas-APIs Ihres Browsers, um Bildpakete in Sekunden zu verarbeiten. Es werden keine Daten übertragen." 
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
          a: "Ja, absolut. Im Gegensatz zu anderen Online-Tools lädt Local Img Tools Ihre Dateien nicht hoch. Alles wird direkt lokal in Ihrem Browser verarbeitet."
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
        ? "Local Img Tools | Conversor e Otimizador de Imagem Grátis" 
        : `Converter ${from.toUpperCase()} para ${to.toUpperCase()} Online (100% Local & Seguro)`,
      description: isGeneric 
        ? "Otimize, comprima e converta imagens PNG, JPG, WEBP, AVIF, SVG e HEIC no seu navegador. Totalmente seguro sem upload de imagens." 
        : `Conversor online gratuito de ${from.toUpperCase()} para ${to.toUpperCase()}. Todas as conversões ocorrem localmente no seu dispositivo. Sem limites de tamanho.`,
      introTitle: isGeneric 
        ? "Rápido, seguro e livre de custos de servidor" 
        : `Por que converter ${from.toUpperCase()} para ${to.toUpperCase()}?`,
      introText: isGeneric 
        ? "O Local Img Tools funciona inteiramente no lado do cliente. Usamos APIs WebAssembly e Canvas do navegador para processar suas fotos em segundos, garantindo total privacidade." 
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
          a: "Sim, 100%. Ao contrário de conversores na nuvem, o Local Img Tools não envia suas fotos para servidores externos. Todo o processo ocorre no seu navegador."
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

export const updatePageMeta = (lang, tool = 'convert', from = '', to = '') => {
  let seo;
  if (tool === 'compress') {
    seo = getCompressSeoContent(lang, from);
  } else if (tool === 'resize') {
    seo = getResizeSeoContent(lang, from);
  } else if (tool === 'watermark') {
    seo = getWatermarkSeoContent(lang, from);
  } else {
    seo = getSeoContent(lang, from, to);
  }
  
  // Update titles & meta tags
  document.title = seo.headline;
  
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', seo.description);
  
  // Update og/twitter properties
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', seo.headline);
  
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', seo.description);

  // Update canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  
  const baseDomain = "https://localimgtools.com";
  const pathLang = lang === 'en' ? '' : `/${lang}`;
  let pathTool = '';
  if (tool === 'convert' && from && to) {
    pathTool = `/convert/${from}-to-${to}`;
  } else if ((tool === 'compress' || tool === 'resize' || tool === 'watermark') && from) {
    pathTool = `/${tool}/${from}`;
  } else if (tool !== 'convert') {
    pathTool = `/${tool}`;
  }
  canonical.setAttribute('href', `${baseDomain}${pathLang}${pathTool}`);
  
  // Inject structured JSON-LD data for Google/AI bots
  let schemaScript = document.getElementById('json-ld-schema');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.setAttribute('type', 'application/ld+json');
    schemaScript.setAttribute('id', 'json-ld-schema');
    document.head.appendChild(schemaScript);
  }

  const appName = "Local Img Tools";
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": appName,
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": seo.description,
    "featureList": [
      "100% Client-Side Processing",
      "No Server Uploads",
      "Bulk Image Compression",
      "HEIC, SVG, PNG, JPG, WEBP, AVIF Conversion"
    ]
  };

  // Dual schema injection: App + HowTo step list (only for specific routes)
  if (tool === 'convert' && from && to) {
    const howTo = getHowToSchema(lang, from, to);
    schemaScript.textContent = JSON.stringify([schemaData, howTo]);
  } else {
    schemaScript.textContent = JSON.stringify(schemaData);
  }
};

export const getFormatComparisonData = (from, to, lang) => {
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


