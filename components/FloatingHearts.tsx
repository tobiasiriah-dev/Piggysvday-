
import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; delay: string; duration: string; size: string }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${8 + Math.random() * 12}s`,
      size: `${15 + Math.random() * 35}px`
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(110vh) rotate(0deg) scale(0.5); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(-20vh) rotate(720deg) scale(1.2); opacity: 0; }
        }
        .heart {
          position: absolute;
          animation: floatUp linear infinite;
          color: #ff4d6d;
          filter: drop-shadow(0 0 15px rgba(255, 77, 109, 0.6));
          user-select: none;
        }
      `}</style>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            fontSize: heart.size,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
