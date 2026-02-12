
import React, { useState } from 'react';
import { AppState } from './types';
import FloatingHearts from './components/FloatingHearts';
import SurrealVisuals from './components/SurrealVisuals';
import SliderProposal from './components/SliderProposal';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.ASKING);

  const handleYes = () => {
    setState(AppState.ACCEPTED);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      {/* BACKGROUND LAYER (Surreal Moodboard) */}
      <SurrealVisuals isAccepted={state === AppState.ACCEPTED} />
      
      {/* UI LAYER (Middle) */}
      <main className="z-20 w-full max-w-4xl px-6 flex flex-col items-center gap-12 text-center">
        
        {state === AppState.ASKING ? (
          <div className="flex flex-col items-center gap-10 animate-in fade-in slide-in-from-top-12 duration-1000">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1 bg-pink-500/20 backdrop-blur-md rounded-full border border-pink-400/30 text-pink-200 text-xs font-bold tracking-[0.3em] uppercase mb-4 animate-pulse shadow-lg">
                ✨ A Strange Proposal ✨
              </div>
              <h1 className="text-6xl md:text-9xl font-black text-white kawaii-text leading-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                Will You Be My <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-red-400 to-pink-300 animate-gradient-x underline decoration-white/20 underline-offset-4">Valentine</span>?
              </h1>
            </div>
            
            <SliderProposal onAccept={handleYes} />

            <div className="max-w-sm glass p-5 rounded-2xl shadow-2xl border-white/10">
              <p className="text-white font-medium text-sm italic kawaii-text leading-relaxed drop-shadow-sm">
                "My love is like your personality; slightly weird, organic, and extremely edible."
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8 text-center animate-in fade-in zoom-in duration-700">
            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
              <h1 className="relative text-7xl md:text-[11rem] font-black text-white leading-tight kawaii-text drop-shadow-[0_15px_50px_rgba(255,77,109,0.8)]">
                OMG YESS! 🌸
              </h1>
            </div>
            
            <div className="space-y-6 mt-8">
              <p className="text-white text-3xl md:text-4xl font-bold kawaii-text tracking-wide drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                another day in our future begins saturday <br/>
                <span className="text-pink-300 text-2xl font-light">i love you</span>
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center mt-10">
                <div className="px-8 py-4 glass rounded-[2rem] text-white font-bold text-xl kawaii-text border-pink-500/40 shadow-xl transform hover:scale-110 transition-transform">
                  🐸 Froggie-Approved
                </div>
                <div className="px-8 py-4 glass rounded-[2rem] text-white font-bold text-xl kawaii-text border-pink-500/40 shadow-xl transform hover:scale-110 transition-transform">
                  🥩 Wagyu-Certified
                </div>
                <div className="px-8 py-4 glass rounded-[2rem] text-white font-bold text-xl kawaii-text border-pink-500/40 shadow-xl transform hover:scale-110 transition-transform">
                  👀 Duck-Witnessed
                </div>
              </div>

              {/* Deets Button */}
              <div className="mt-12 flex justify-center">
                <a 
                  href="mailto:Tobiasiriah@icloud.com?subject=I%20said%20yes&body=I%20HAVE%20AGREED%20TO%20SMOOCH%20YOUR%20FACE%20OFF.%0A%0ATO%20DO%20THIS%20YOU%20MUST%20MEET%20ME%20AT%0A51.5055%C2%B0%20N%2C%200.0905%C2%B0%20W%0A%0ATHIS%20SATURDAY%20%40%202%3A15pm."
                  className="px-12 py-5 bg-gradient-to-r from-pink-600 to-red-500 rounded-full text-white font-black text-2xl kawaii-text shadow-[0_10px_30px_rgba(255,77,109,0.6)] border-2 border-white/20 hover:scale-110 active:scale-95 transition-all animate-bounce"
                >
                  deets 😘
                </a>
              </div>
            </div>

            <button 
              onClick={() => setState(AppState.ASKING)}
              className="mt-20 text-white/40 text-xs hover:text-white/90 transition-all uppercase tracking-[0.4em] hover:scale-105 active:scale-95"
            >
              [ go back ]
            </button>
          </div>
        )}
      </main>

      {/* FOREGROUND LAYER (Hearts) */}
      <FloatingHearts />

      {/* FOOTER ACCENTS */}
      <div className="fixed bottom-8 left-8 right-8 flex justify-between items-end z-30 pointer-events-none opacity-40">
        <div className="text-white text-[10px] uppercase tracking-[1em] [writing-mode:vertical-lr] kawaii-text font-bold">
          VALENTINE CORE v3.0
        </div>
        <div className="text-white text-[10px] uppercase tracking-[1em] [writing-mode:vertical-lr] kawaii-text font-bold">
          ROMANCE ENGINE ACTIVATED
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
