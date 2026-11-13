import { useState, useRef } from 'react';
import type { ZoneId } from '../../types';
import { ZONES, INTERACTIVE_OBJECTS } from '../../data/zones';
import type { MovementInput } from '../3d/FirstPersonController';
import { soundManager } from '../../audio/soundManager';
import {
  Compass,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Pause,
  Sliders,
  Sparkles,
  Zap,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Hand
} from 'lucide-react';

interface FirstPersonHUDProps {
  isNight: boolean;
  onToggleNight: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  mouseSensitivity: number;
  onSensitivityChange: (val: number) => void;
  hoveredObjectId: string | null;
  onInteract: (id: string) => void;
  onPause: () => void;
  onSelectZonePath: (zoneId: ZoneId) => void;
  activeNavZoneId: ZoneId | null;
  onCancelNav: () => void;
  cameraMode: 'first-person' | 'overview';
  onToggleCameraMode: () => void;
  onMovementInputChange: (input: MovementInput) => void;
  onTouchLookDelta: (delta: { x: number; y: number } | null) => void;
}

export const FirstPersonHUD: React.FC<FirstPersonHUDProps> = ({
  isNight,
  onToggleNight,
  isMuted,
  onToggleMute,
  mouseSensitivity,
  onSensitivityChange,
  hoveredObjectId,
  onInteract,
  onPause,
  onSelectZonePath,
  activeNavZoneId,
  onCancelNav,
  cameraMode,
  onToggleCameraMode,
  onMovementInputChange,
  onTouchLookDelta,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [movementState, setMovementState] = useState<MovementInput>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
  });

  // Touch look handling on right half of screen
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  const updateMovement = (key: keyof MovementInput, val: boolean) => {
    setMovementState((prev) => {
      const next = { ...prev, [key]: val };
      onMovementInputChange(next);
      return next;
    });
  };

  const hoveredObj = INTERACTIVE_OBJECTS.find((o) => o.id === hoveredObjectId) || null;
  const activeNavZone = ZONES.find((z) => z.id === activeNavZoneId) || null;

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-20 flex flex-col justify-between overflow-hidden">
      {/* 1. TOP BAR: STATUS, AUDIO, SETTINGS & PAUSE */}
      <div className="p-3 sm:p-4 flex items-center justify-between w-full pointer-events-auto">
        {/* Brand Pill */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-white/10 shadow-lg">
          <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center font-black text-amber-400 text-xs shadow-inner">
            M
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
              <span>McDonald's 3D</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {cameraMode === 'first-person' ? 'FPS WALK' : 'DRONE VIEW'}
              </span>
            </div>
          </div>
        </div>

        {/* Top-Right Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Camera Mode Toggle (First Person vs Overview) */}
          <button
            onClick={() => {
              soundManager.playClick();
              onToggleCameraMode();
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-white/10 text-stone-200 hover:text-white hover:bg-stone-800 transition-all shadow-md flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title="Đổi chế độ xem (Góc nhìn thứ nhất / Toàn cảnh)"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">
              {cameraMode === 'first-person' ? 'Toàn Cảnh' : 'Góc Nhìn Thứ Nhất'}
            </span>
          </button>

          {/* Day / Night Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              onToggleNight();
            }}
            className="p-2 rounded-full bg-stone-900/80 backdrop-blur-md border border-white/10 text-stone-300 hover:text-white hover:bg-stone-800 transition-all shadow-md cursor-pointer"
            title={isNight ? 'Chuyển sang Ban ngày' : 'Chuyển sang Ban đêm ấm cúng'}
          >
            {isNight ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-300" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              onToggleMute();
            }}
            className="p-2 rounded-full bg-stone-900/80 backdrop-blur-md border border-white/10 text-stone-300 hover:text-white hover:bg-stone-800 transition-all shadow-md cursor-pointer"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Sensitivity Settings Popover Button */}
          <div className="relative">
            <button
              onClick={() => {
                soundManager.playClick();
                setShowSettings((prev) => !prev);
              }}
              className="p-2 rounded-full bg-stone-900/80 backdrop-blur-md border border-white/10 text-stone-300 hover:text-white hover:bg-stone-800 transition-all shadow-md cursor-pointer"
              title="Độ nhạy chuột / Cảm ứng"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
            </button>

            {showSettings && (
              <div className="absolute right-0 top-11 w-64 p-3.5 rounded-xl bg-stone-900/95 backdrop-blur-xl border border-white/15 shadow-2xl text-xs space-y-2.5 z-40">
                <div className="flex items-center justify-between text-stone-200 font-semibold border-b border-white/10 pb-1.5">
                  <span>Độ nhạy chuột (Sensitivity)</span>
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
                <div className="text-[11px] text-stone-400 flex justify-between">
                  <span>Chậm (0.4x)</span>
                  <span>Mặc định (1.0x)</span>
                  <span>Nhanh (2.5x)</span>
                </div>
              </div>
            )}
          </div>

          {/* Pause Menu Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onPause();
            }}
            className="p-2 rounded-full bg-stone-900/80 backdrop-blur-md border border-white/10 text-stone-300 hover:text-white hover:bg-stone-800 transition-all shadow-md cursor-pointer"
            title="Tạm dừng / Bảng điều khiển (ESC)"
          >
            <Pause className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. CENTER FPS CROSSHAIR & INTERACTION PROMPT */}
      {cameraMode === 'first-person' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {/* Minimal FPS Reticle Crosshair */}
          <div className="relative flex items-center justify-center">
            {hoveredObj ? (
              // Active interactive target reticle
              <div className="w-8 h-8 rounded-full border-2 border-amber-400 bg-amber-400/20 animate-pulse flex items-center justify-center shadow-[0_0_12px_rgba(251,191,36,0.6)]">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
            ) : (
              // Subtle resting dot crosshair
              <div className="w-2 h-2 rounded-full bg-white/75 shadow-[0_0_4px_rgba(0,0,0,0.8)]" />
            )}
          </div>

          {/* Interaction Toast Pill (Press [E] to interact) */}
          {hoveredObj && (
            <div className="mt-8 pointer-events-auto animate-bounce">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onInteract(hoveredObj.id);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-2xl transition-all cursor-pointer border border-amber-300/40"
              >
                <Hand className="w-4 h-4" />
                <span>Nhấn [E] hoặc chạm để tương tác: {hoveredObj.name}</span>
              </button>
            </div>
          )}

          {/* Auto-Walk Traveling Banner */}
          {activeNavZone && (
            <div className="absolute top-24 pointer-events-auto">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-stone-900/90 backdrop-blur-md border border-amber-500/40 text-xs text-amber-300 shadow-xl">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                <span>Đang tự động bước tới: <strong>{activeNavZone.name}</strong></span>
                <button
                  onClick={onCancelNav}
                  className="ml-2 px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-[10px] text-stone-300 cursor-pointer"
                >
                  Dừng
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. TOUCH-LOOK SURFACE (RIGHT HALF FOR MOBILE SWIPING) */}
      <div
        className="absolute right-0 top-16 bottom-24 w-1/2 pointer-events-auto touch-none"
        onTouchStart={(e) => {
          if (e.touches[0]) {
            touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }
        }}
        onTouchMove={(e) => {
          if (touchStartPos.current && e.touches[0]) {
            const dx = e.touches[0].clientX - touchStartPos.current.x;
            const dy = e.touches[0].clientY - touchStartPos.current.y;
            onTouchLookDelta({ x: dx, y: dy });
            touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }
        }}
        onTouchEnd={() => {
          touchStartPos.current = null;
          onTouchLookDelta(null);
        }}
      />

      {/* 4. BOTTOM CONTROLS: D-PAD MOVEMENT BUTTONS (LEFT) & ROOM NAVIGATION (CENTER/RIGHT) */}
      <div className="p-3 sm:p-4 flex items-end justify-between w-full pointer-events-none">
        {/* On-Screen D-Pad Movement Controller (Bottom-Left) */}
        {cameraMode === 'first-person' && (
          <div className="pointer-events-auto bg-stone-900/80 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center gap-1.5 select-none touch-none">
            {/* Forward Button */}
            <button
              onPointerDown={() => updateMovement('forward', true)}
              onPointerUp={() => updateMovement('forward', false)}
              onPointerLeave={() => updateMovement('forward', false)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                movementState.forward
                  ? 'bg-amber-500 text-stone-950 font-bold scale-95'
                  : 'bg-stone-800/90 hover:bg-stone-700 text-white'
              }`}
              title="Đi tới (W / Phím Lên)"
            >
              <ChevronUp className="w-5 h-5" />
            </button>

            {/* Middle Row: Left, Sprint, Right */}
            <div className="flex items-center gap-1.5">
              <button
                onPointerDown={() => updateMovement('left', true)}
                onPointerUp={() => updateMovement('left', false)}
                onPointerLeave={() => updateMovement('left', false)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  movementState.left
                    ? 'bg-amber-500 text-stone-950 font-bold scale-95'
                    : 'bg-stone-800/90 hover:bg-stone-700 text-white'
                }`}
                title="Sang trái (A / Phím Trái)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Sprint Button */}
              <button
                onPointerDown={() => updateMovement('sprint', !movementState.sprint)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  movementState.sprint
                    ? 'bg-amber-400 text-stone-950 font-black shadow-lg shadow-amber-500/30'
                    : 'bg-stone-800/90 hover:bg-stone-700 text-amber-400/80'
                }`}
                title="Chạy nhanh (Shift)"
              >
                <Zap className="w-5 h-5" />
              </button>

              <button
                onPointerDown={() => updateMovement('right', true)}
                onPointerUp={() => updateMovement('right', false)}
                onPointerLeave={() => updateMovement('right', false)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  movementState.right
                    ? 'bg-amber-500 text-stone-950 font-bold scale-95'
                    : 'bg-stone-800/90 hover:bg-stone-700 text-white'
                }`}
                title="Sang phải (D / Phím Phải)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Backward Button */}
            <button
              onPointerDown={() => updateMovement('backward', true)}
              onPointerUp={() => updateMovement('backward', false)}
              onPointerLeave={() => updateMovement('backward', false)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                movementState.backward
                  ? 'bg-amber-500 text-stone-950 font-bold scale-95'
                  : 'bg-stone-800/90 hover:bg-stone-700 text-white'
              }`}
              title="Đi lùi (S / Phím Xuống)"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Room Navigation Dock (Quick Walk Destination Pills) */}
        <div className="pointer-events-auto ml-auto overflow-x-auto max-w-full pb-1">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-stone-900/85 backdrop-blur-md border border-white/10 shadow-2xl">
            {ZONES.map((zone) => {
              const isActive = activeNavZoneId === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => {
                    soundManager.playClick();
                    onSelectZonePath(zone.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/25'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/90'
                  }`}
                >
                  <span>{zone.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
