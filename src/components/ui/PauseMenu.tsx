import { soundManager } from '../../audio/soundManager';
import { Play, Compass, RotateCcw, Image, Sliders, Volume2, VolumeX, Moon, Sun } from 'lucide-react';

interface PauseMenuProps {
  onResume: () => void;
  onResetToEntrance: () => void;
  cameraMode: 'first-person' | 'overview';
  onToggleCameraMode: () => void;
  mouseSensitivity: number;
  onSensitivityChange: (val: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isNight: boolean;
  onToggleNight: () => void;
  onOpenPhotoGallery: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({
  onResume,
  onResetToEntrance,
  cameraMode,
  onToggleCameraMode,
  mouseSensitivity,
  onSensitivityChange,
  isMuted,
  onToggleMute,
  isNight,
  onToggleNight,
  onOpenPhotoGallery,
}) => {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="max-w-md w-full bg-stone-900/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-center">
        {/* Header */}
        <div className="space-y-1">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1 border border-amber-500/30">
            PAUSE MENU
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Tạm Dừng Trải Nghiệm
          </h2>
          <p className="text-xs text-stone-400">
            Con trỏ chuột đã được giải phóng. Bạn có thể điều chỉnh cài đặt hoặc tiếp tục bước đi.
          </p>
        </div>

        {/* Quick Settings: Sensitivity, Audio, Night */}
        <div className="bg-stone-950/60 rounded-2xl p-4 border border-white/10 space-y-3.5 text-left text-xs">
          {/* Mouse Sensitivity */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between font-semibold text-stone-200">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Độ nhạy xoay chuột</span>
              </span>
              <span className="text-amber-400 font-bold">{mouseSensitivity.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.4"
              max="2.5"
              step="0.1"
              value={mouseSensitivity}
              onChange={(e) => onSensitivityChange(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Quick Toggles */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <button
              onClick={() => {
                soundManager.playClick();
                onToggleMute();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-200 text-xs cursor-pointer transition-all"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              <span>{isMuted ? 'Bật Âm Thanh' : 'Tắt Âm Thanh'}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onToggleNight();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-200 text-xs cursor-pointer transition-all"
            >
              {isNight ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-300" />}
              <span>{isNight ? 'Ban Ngày' : 'Ban Đêm'}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          {/* Resume Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onResume();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-stone-950" />
            <span>TIẾP TỤC KHÁM PHÁ (RESUME)</span>
          </button>

          {/* Reset to Entrance */}
          <button
            onClick={() => {
              soundManager.playClick();
              onResetToEntrance();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span>Về Cổng Chính Mặt Tiền</span>
          </button>

          {/* Toggle Camera Mode */}
          <button
            onClick={() => {
              soundManager.playClick();
              onToggleCameraMode();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>
              {cameraMode === 'first-person' ? 'Chuyển Sang Chế Độ Toàn Cảnh (Drone View)' : 'Chuyển Sang Góc Nhìn Thứ Nhất (FPS Walk)'}
            </span>
          </button>

          {/* Open Real Photo Gallery */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenPhotoGallery();
            }}
            className="w-full py-2 px-4 rounded-xl text-stone-400 hover:text-stone-200 text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Image className="w-3.5 h-3.5 text-amber-400" />
            <span>Xem Ảnh Chụp Thật & Bản Vẽ Kỹ Thuật CAD</span>
          </button>
        </div>
      </div>
    </div>
  );
};
