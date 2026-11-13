import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { soundManager } from '../../audio/soundManager';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(15);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setProgress(45), 250);
    const timer2 = setTimeout(() => setProgress(78), 600);
    const timer3 = setTimeout(() => {
      setProgress(100);
      setIsReady(true);
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleStart = () => {
    soundManager.startAmbient();
    soundManager.playZoneTransition();
    onLoaded();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950 text-white p-6">
      <div className="flex flex-col items-center max-w-md w-full text-center gap-6">
        {/* Animated Golden Arches 'M' Emblem */}
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-2xl shadow-red-900/50 border-2 border-amber-400 animate-pulse">
            <span className="text-amber-300 font-black text-6xl tracking-tighter leading-none select-none font-sans scale-x-125">
              M
            </span>
          </div>
          <div className="absolute -inset-2 rounded-3xl bg-amber-400/20 blur-xl -z-10" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-sans mb-2">
            McDonald's <span className="text-amber-400">Miniature World</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-400">
            Trải nghiệm không gian 3D tương tác tái hiện từ mô hình kiến trúc handmade
          </p>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-full flex flex-col gap-2">
          <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-amber-400 to-amber-500 rounded-full transition-all duration-300 shadow-lg shadow-amber-400/50"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-stone-400 font-medium">
            <span>Đang tải vật liệu & kết cấu 3D...</span>
            <span className="font-bold text-amber-400">{progress}%</span>
          </div>
        </div>

        {/* Enter World Button */}
        {isReady && (
          <button
            onClick={handleStart}
            className="w-full py-3.5 px-6 rounded-2xl font-black text-sm bg-gradient-to-r from-red-600 via-amber-500 to-amber-600 text-stone-950 hover:brightness-110 shadow-xl shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer animate-bounce"
          >
            <Sparkles className="w-4 h-4" />
            Khám Phá Nhà Hàng Ngay
          </button>
        )}
      </div>
    </div>
  );
};
