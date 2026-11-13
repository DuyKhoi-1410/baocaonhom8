import { soundManager } from '../../audio/soundManager';
import { Play, Compass, Mouse, Move, Zap, Hand } from 'lucide-react';

interface StartScreenProps {
  onStartFPS: () => void;
  onStartOverview: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartFPS, onStartOverview }) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-stone-950/85 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="max-w-md w-full bg-stone-900/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
        {/* McDonald's Iconic Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-red-600 border-2 border-amber-400 flex items-center justify-center shadow-lg shadow-red-600/30">
            <span className="text-4xl font-black text-amber-400 leading-none">M</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
            McDonald's Miniature World
          </h1>
          <p className="text-sm font-medium text-amber-400">
            Trải Nghiệm Bước Vào Mô Hình Thủ Công (First-Person 3D)
          </p>
          <p className="text-xs text-stone-400">
            Khám phá nhà hàng McDonald's thu nhỏ dưới góc nhìn một người đang trực tiếp dạo bước bên trong.
          </p>
        </div>

        {/* Controls Card */}
        <div className="bg-stone-950/60 rounded-2xl p-4 border border-white/10 text-left text-xs space-y-2.5 text-stone-300">
          <div className="font-bold text-white text-xs border-b border-white/10 pb-1.5 flex items-center gap-2">
            <span>🎮</span>
            <span>HƯỚNG DẪN ĐIỀU KHIỂN (CONTROLS):</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center gap-2">
              <Move className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>W A S D</strong>: Di chuyển</span>
            </div>
            <div className="flex items-center gap-2">
              <Mouse className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Chuột</strong>: Nhìn 360°</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Shift</strong>: Chạy nhanh</span>
            </div>
            <div className="flex items-center gap-2">
              <Hand className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Phím E</strong>: Tương tác</span>
            </div>
          </div>
          <div className="text-[10px] text-stone-400 pt-1 border-t border-white/5">
            💡 Có đầy đủ nút bấm điều hướng trên màn hình cảm ứng điện thoại.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          {/* Main Primary Button: START EXPLORING */}
          <button
            onClick={() => {
              soundManager.playZoneTransition();
              onStartFPS();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>BẮT ĐẦU KHÁM PHÁ (START EXPLORING)</span>
          </button>

          {/* Secondary Button: Overview Drone Mode */}
          <button
            onClick={() => {
              soundManager.playClick();
              onStartOverview();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-800/80 hover:bg-stone-700/80 text-stone-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Xem Chế Độ Toàn Cảnh (Drone View)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
