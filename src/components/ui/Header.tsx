import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Camera,
  Eye,
  EyeOff,
  HelpCircle,
  Footprints
} from 'lucide-react';
import { soundManager } from '../../audio/soundManager';

interface HeaderProps {
  isNight: boolean;
  onToggleNight: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  showPins: boolean;
  onTogglePins: () => void;
  onResetCamera: () => void;
  onOpenPhotoGallery: () => void;
  onToggleHelp: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  cameraMode?: 'first-person' | 'overview';
  onToggleCameraMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isNight,
  onToggleNight,
  isMuted,
  onToggleMute,
  showPins,
  onTogglePins,
  onResetCamera,
  onOpenPhotoGallery,
  onToggleHelp,
  isFullscreen,
  onToggleFullscreen,
  cameraMode = 'overview',
  onToggleCameraMode,
}) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 pointer-events-none p-3 sm:p-5 flex items-start justify-between gap-3">
      {/* Brand & Title Info */}
      <div className="pointer-events-auto flex items-center gap-3 bg-stone-900/85 backdrop-blur-xl border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl shadow-black/30">
        {/* McDonald's Iconic 'M' Emblem */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-md shadow-red-900/40 border border-amber-400/40">
          <span className="text-amber-300 font-black text-2xl tracking-tighter leading-none select-none font-sans scale-x-125">
            M
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-white font-black text-sm sm:text-base tracking-wide font-sans">
              McDonald's <span className="text-amber-400">Miniature World</span>
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Handmade 3D
            </span>
          </div>
          <p className="text-stone-400 text-xs font-medium">
            Mô hình kiến trúc thủ công bằng giấy & đất sét
          </p>
        </div>
      </div>

      {/* Top Right Action Toolbar */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 bg-stone-900/85 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl shadow-xl shadow-black/30">
        {/* Switch to First-Person Walkthrough Button */}
        <button
          onClick={() => {
            soundManager.playZoneTransition();
            onToggleCameraMode?.();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-md shadow-red-600/30 cursor-pointer animate-pulse"
          title={cameraMode === 'first-person' ? 'Về chế độ Toàn cảnh' : 'Chuyển sang góc nhìn người thật đi dạo trong nhà hàng (FPS Walkthrough)'}
        >
          <Footprints className="w-4 h-4" />
          <span>{cameraMode === 'first-person' ? 'Toàn Cảnh' : 'Góc Nhìn Thật (FPS Walk)'}</span>
        </button>

        {/* Real Photographs Gallery Button (7 Real Photos) */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenPhotoGallery();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 hover:brightness-110 shadow-md shadow-amber-500/20 cursor-pointer"
          title="Xem 7 ảnh chụp mô hình handmade thật"
        >
          <Camera className="w-3.5 h-3.5" />
          <span className="hidden md:inline">7 Ảnh Thật</span>
        </button>

        {/* Day / Night Mode Toggle */}
        <button
          onClick={() => {
            soundManager.playClick();
            onToggleNight();
          }}
          className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title={isNight ? 'Chuyển sang chế độ Ban Ngày' : 'Chuyển sang chế độ Ban Đêm'}
        >
          {isNight ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-300" />}
        </button>

        {/* Audio Sound Toggle */}
        <button
          onClick={() => {
            onToggleMute();
          }}
          className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>

        {/* Toggle Interactive Pins */}
        <button
          onClick={() => {
            soundManager.playClick();
            onTogglePins();
          }}
          className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title={showPins ? 'Ẩn điểm ghim tương tác' : 'Hiện điểm ghim tương tác'}
        >
          {showPins ? <Eye className="w-4 h-4 text-amber-300" /> : <EyeOff className="w-4 h-4 text-stone-500" />}
        </button>

        {/* Reset Camera to Overview */}
        <button
          onClick={() => {
            soundManager.playClick();
            onResetCamera();
          }}
          className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Đặt lại góc nhìn camera"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Controls Help Guide */}
        <button
          onClick={() => {
            soundManager.playClick();
            onToggleHelp();
          }}
          className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Hướng dẫn điều khiển & phím tắt"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={() => {
            soundManager.playClick();
            onToggleFullscreen();
          }}
          className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
