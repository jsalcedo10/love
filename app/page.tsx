'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import AudioPlayer from '../components/AudioPlayer';

const RomanticGallery = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const photos = [
    {
      src: '/foto1.jpg',
      text: 'Nuestro encuentro no fue coincidencia, fue el plan perfecto de Dios y por eso siempre estaré agradecido💍',
      position: 'start',
    },
    {
      src: '/foto2.jpg',
      text: 'Es un lujo tenerte en mi vida, sentir tu amor y saber que no hay nadie en el mundo con quien prefiera estar✨',
      position: 'center',
    },
    {
      src: '/foto3.jpg',
      text: 'La magia del océano se refleja en tu sonrisa, transformando cada atardecer en un poema de amor😍',
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
      <motion.header
        className="relative h-screen flex items-center justify-center text-center px-4"
      >
        <div className="relative z-20 space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-5xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-200 font-cinzel tracking-wider"
          >
            Para el amor de mi vida
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed"
          >
            Que este 14 de Febrero sea un día para agradecerle a Dios por el regalo más hermoso: nuestro amor🙏🏻❤️
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
            whileTap={{ scale: 0.95 }}
            className="group relative h-[300px] md:h-[700px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer"
            onClick={() => handlePhotoClick(index)}
          >
            <Image
              src={photo.src}
              alt="Momento especial"
              fill
              quality={100}
              draggable={false}
              className="object-cover transform transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(event, info) => {
              if (isMobile && Math.abs(info.offset.y) > 100) {
                closeModal();
              }
            }}
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
              quality={100}
              draggable={false}
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

      {/* Elementos Decorativos */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Partículas CSS Puras */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              rotate: Math.random() * 360,
              scale: 0,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50
            }}
            animate={{
              rotate: Math.random() * 360,
              scale: [0, 1, 0],
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute text-3xl text-purple-300/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Botón Scroll */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-purple-500/30 backdrop-blur-lg text-white p-5 rounded-full shadow-xl hover:bg-purple-400/40 transition-all z-50"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>

      {/* Barra de Progreso */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-400 to-pink-300 z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
};

export default RomanticGallery;
