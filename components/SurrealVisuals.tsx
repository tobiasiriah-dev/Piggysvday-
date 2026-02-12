import React, { useState, useEffect, useMemo } from 'react';
import { generateSurrealImage } from '../services/gemini';

interface Props {
  isAccepted: boolean;
}

const SurrealVisuals: React.FC<Props> = ({ isAccepted }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Custom GIFs including the requested Kermit/Miss Piggy one
  const myCustomGifs: string[] = [
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWM0djRmb29mcG00ajhzMHhjcWd2bXIzdGZzNjcyd21icGZzdzNqaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1160lGMl2hNWDu/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmxmYjN0aDAzbTcyYmVidzJvd2pzNGRhYXBwa3dobDV6ZWNud2dxMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lqH9dCVjcy9sohHczY/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWd5YW9mOWh5eGJlbnNsZHVhM3NoY2Eydm9wbTd3ejVxZWxjbGNxcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mp7hNslS8CAYo/giphy.gif"
  ]; 

  const surrealPrompts = [
    "A photorealistic frog sitting on a mushroom, slowly croaking with visible throat expansion",
    "A surreal anatomical cow standing in a meadow, its skin peeling away cleanly like a zipper to reveal marbled raw wagyu steak underneath",
    "Surreal ducks floating on a lake of mercury, holding strings of balloons made of giant, realistic human eyeballs"
  ];

  const celebratoryPrompt = "A group of cute frogs and cows wearing tiny party hats, celebrating with colorful confetti and floating pink hearts, cinematic lighting, 8k, joyful surrealism";

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      
      let baseImages: string[] = [];

      if (isAccepted) {
        const img = await generateSurrealImage(celebratoryPrompt);
        if (img) baseImages = [img];
      } else {
        const results = await Promise.all(surrealPrompts.map(p => generateSurrealImage(p)));
        const validGenerated = results.filter((img): img is string => img !== null);
        baseImages = [...myCustomGifs, ...validGenerated];
      }
      
      setImages(baseImages);
      setLoading(false);
    };

    fetchImages();
  }, [isAccepted]);

  const polaroids = useMemo(() => {
    return images.map((src, idx) => {
      const isLeftSide = idx % 2 === 0;
      const leftPos = isLeftSide 
        ? `${1 + Math.random() * 15}%` 
        : `${82 + Math.random() * 15}%`;
      
      const topPos = `${5 + Math.random() * 80}%`;
      const rotation = Math.random() * 30 - 15;
      const duration = 10 + Math.random() * 10;
      const delay = -(Math.random() * 20);

      return {
        id: idx,
        src,
        caption: isAccepted ? "LOVE FOREVER! ✨" : (surrealPrompts[idx - myCustomGifs.length]?.split(',')[0] || ""),
        rotation,
        top: topPos,
        left: leftPos,
        duration,
        delay
      };
    });
  }, [images, isAccepted]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-0 bg-pink-900/40 flex flex-col items-center justify-center backdrop-blur-md">
        <div className="text-white text-2xl font-bold animate-pulse kawaii-text">Curating your romantic moodboard...</div>
        <div className="w-48 h-1 bg-white/20 mt-4 rounded-full overflow-hidden">
          <div className="h-full bg-pink-400 animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
      {/* Moodboard background texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div>
      
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-pink-950/10 to-black pointer-events-none"></div>

      {polaroids.map((p) => (
        <div
          key={`${p.src}-${p.id}`}
          className="absolute transition-all duration-1000 ease-out hover:z-40 hover:scale-110"
          style={{
            top: p.top,
            left: p.left,
            animation: `floatLoop ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            // @ts-ignore
            '--rot': `${p.rotation}deg`
          }}
        >
          <div className="bg-[#fefefe] p-2 md:p-3 pb-6 md:pb-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/40 group relative">
            {/* The Pin */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-pink-500 rounded-full shadow-lg border-2 border-pink-200 z-10 flex items-center justify-center">
               <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            </div>
            
            <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gray-100 overflow-hidden relative">
              <img
                src={p.src}
                alt="Valentine Memory"
                className="w-full h-full object-cover transition-all duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
            </div>
            
            <div className="mt-3 md:mt-6 kawaii-text text-gray-700 text-center font-bold text-xs md:text-lg px-2 italic opacity-80 group-hover:opacity-100 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
              {p.caption}
            </div>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes floatLoop {
          0% { transform: translate(0, 0) rotate(var(--rot)); }
          25% { transform: translate(15px, -20px) rotate(calc(var(--rot) + 5deg)); }
          50% { transform: translate(-10px, -35px) rotate(calc(var(--rot) - 3deg)); }
          75% { transform: translate(-20px, -15px) rotate(calc(var(--rot) + 2deg)); }
          100% { transform: translate(0, 0) rotate(var(--rot)); }
        }
        
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0); }
          100% { width: 0%; transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default SurrealVisuals;