
import React, { useState } from 'react';

interface Props {
  onAccept: () => void;
}

const SliderProposal: React.FC<Props> = ({ onAccept }) => {
  const [value, setValue] = useState(50);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);
    setValue(newVal);
    
    // Trigger accept on either extreme
    if (newVal >= 98 || newVal <= 2) {
      setTimeout(() => onAccept(), 300);
    }
  };

  // Logic for the transforming label
  const getLeftLabel = () => {
    if (value < 40) return "HELL YES! ✨";
    return "NO";
  };

  const getRightLabel = () => {
    if (value > 60) return "YASSSS! 💖";
    return "YES";
  };

  return (
    <div className="w-full max-w-lg glass p-10 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(255,77,109,0.37)] transition-all">
      <div className="flex justify-between items-center mb-8 px-4 h-12">
        <span className={`kawaii-text font-black transition-all duration-300 transform ${value < 40 ? 'text-red-400 scale-125' : 'text-white/60 scale-100'} text-3xl drop-shadow-lg`}>
          {getLeftLabel()}
        </span>
        <span className={`kawaii-text font-black transition-all duration-300 transform ${value > 60 ? 'text-pink-400 scale-125' : 'text-white/60 scale-100'} text-3xl drop-shadow-lg`}>
          {getRightLabel()}
        </span>
      </div>
      
      <div className="relative h-12 flex items-center">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={value}
          onChange={handleChange}
          className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer accent-transparent"
          style={{
            background: `linear-gradient(90deg, #ff4d6d 0%, #ff758f ${value}%, rgba(255,255,255,0.1) ${value}%, rgba(255,255,255,0.1) 100%)`
          }}
        />
        
        {/* Custom thumb aesthetic */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75"
          style={{ left: `calc(${value}% - 20px)` }}
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.8)] border-4 border-pink-500 animate-pulse">
            <span className="text-xl">💝</span>
          </div>
        </div>
      </div>
      
      <p className="text-center text-white/50 text-sm mt-8 font-medium italic kawaii-text tracking-wide">
        {value === 50 ? "Make your choice, darling..." : value < 40 ? "Wait, look what you're choosing!" : "BIG ANSWER, no pressure!"}
      </p>

      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 40px;
          width: 40px;
          background: transparent;
          cursor: pointer;
        }
        input[type=range]::-moz-range-thumb {
          height: 40px;
          width: 40px;
          background: transparent;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SliderProposal;
