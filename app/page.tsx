'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import AudioPlayer from '../components/AudioPlayer';

const RomanticGallery = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Mostrar u ocultar el botón de scroll
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const photos = [
    {
      src: '/foto1.jpg',
      text: 'Gracias Dios por cruzar nuestros caminos en el momento perfecto💍',
      position: 'start',
    },
    {
      src: '/foto2.jpg',
      text: 'Es un privilegio compartir mi vida con una mujer tan maravillosa✨',
      position: 'center',
    },
    {
      src: '/foto3.jpg',
      text: 'En la inmensidad del mar, encuentro calma y el amor en tu mirada😍',
      position: 'end',
    },
  ];

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const yProgress = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const handlePhotoClick = (index: number) => {
    setSelectedPhoto(index);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-purple-950 relative overflow-hidden"
    >
      {/* Componente de Reproducción de Audio */}
      <AudioPlayer />

      {/* Efecto Fondo Dinámico */}
      <motion.div
        style={{ scale: scaleProgress, y: yProgress }}
        className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-violet-900/30 to-purple-950/50 backdrop-blur-3xl"
      />

      {/* Header con Efecto Parallax */}
      <motion.header className="relative h-screen flex items-center justify-center text-center px-4">
        <div className="relative z-20 space-y-4 md:space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-5xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-200 font-cinzel tracking-wider"
          >
            Nuestro Amor Bonito
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed"
          >
            Hagamos de este 14 de Febrero un día para dar gracias a Dios por nuestro amor🙏🏻❤️
          </motion.p>
        </div>
      </motion.header>

      {/* Galería Interactiva */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12 p-4 md:p-8 max-w-7xl mx-auto">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-25%" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="group relative h-[400px] md:h-[700px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer"
            onClick={() => handlePhotoClick(index)}
          >
            <Image
              src={photo.src}
              alt="Momento especial"
              fill
              className="object-cover transform transition-all duration-700 group-hover:scale-105"
            />
            {/* Overlay de Texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-900/30 to-transparent flex items-end p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center space-y-2 md:space-y-4"
              >
                <div className="inline-block bg-purple-900/30 backdrop-blur-sm px-4 py-2 md:px-6 md:py-4 rounded-2xl">
                  <p className="text-lg md:text-2xl text-purple-50 italic font-light leading-snug">
                    {photo.text}
                  </p>
                </div>
              </motion.div>
            </div>
            {/* Efecto Borde */}
            <div className="absolute inset-0 border-4 border-purple-300/10 group-hover:border-purple-200/30 transition-all duration-500 rounded-3xl" />
          </motion.div>
        ))}
      </div>
  {/* Sección de Emojis */}
  <div className="relative z-10 flex items-center justify-center p-8">
        <div className="text-5xl md:text-6xl text-center">
          <p>🐥🐥🎀</p>
        </div>
      </div>
      {/* Modal para la Foto Seleccionada */}
      {selectedPhoto !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4 md:p-8"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-full md:max-w-4xl w-full h-auto rounded-3xl overflow-hidden border-4 border-purple-300/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de Cierre */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 md:top-4 md:right-4 bg-purple-500/30 backdrop-blur-lg text-white p-2 md:p-3 rounded-full shadow-lg hover:bg-purple-400/40 transition-all z-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Imagen Ampliada */}
            <Image
              src={photos[selectedPhoto].src}
              alt="Momento especial"
              width={1200}
              height={800}
              className="object-cover w-full h-full"
            />
            {/* Texto de la Foto */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-900/30 to-transparent flex items-end p-4 md:p-8">
              <div className="text-center space-y-2 md:space-y-4 w-full">
                <div className="inline-block bg-purple-900/30 backdrop-blur-sm px-4 py-2 md:px-6 md:py-4 rounded-2xl">
                  <p className="text-lg md:text-2xl text-purple-50 italic font-light leading-snug">
                    {photos[selectedPhoto].text}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Botón Scroll (Solo visible después de hacer scroll) */}
      {showScrollButton && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 bg-purple-500/30 backdrop-blur-lg text-white p-4 rounded-full shadow-xl hover:bg-purple-400/40 transition-all z-50"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}

      {/* Barra de Progreso */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-400 to-pink-300 z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
};

export default RomanticGallery;