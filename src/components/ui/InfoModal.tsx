import React from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import type { ZoneConfig, InteractiveObjectInfo } from '../../types';
import { soundManager } from '../../audio/soundManager';
import confetti from 'canvas-confetti';

interface InfoModalProps {
  zone: ZoneConfig | null;
  objectInfo: InteractiveObjectInfo | null;
  onClose: () => void;
  onViewPhoto?: (photoUrl: string, caption: string) => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  zone,
  objectInfo,
  onClose,
}) => {
  if (!zone && !objectInfo) return null;

  const title = objectInfo ? objectInfo.title : zone?.name;
  const subtitle = objectInfo ? objectInfo.subtitle : 'Khu Vực Kiến Trúc Handmade';
  const description = objectInfo ? objectInfo.description : zone?.description;

  const handleActionClick = () => {
    if (!objectInfo) return;

    switch (objectInfo.actionType) {
      case 'piano':
        soundManager.playPianoNote(Math.floor(Math.random() * 8));
        break;
      case 'cat':
        soundManager.playLuckyBell();
        break;
      case 'coffee':
        soundManager.playCoffeeBrew();
        break;
      case 'bubbles':
        soundManager.playBubble();
        break;
      case 'flash':
        soundManager.playCameraShutter();
        break;
      case 'confetti':
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.5 },
        });
        soundManager.playZoneTransition();
        break;
      case 'fries':
        soundManager.playClick();
        confetti({
          particleCount: 30,
          spread: 50,
          colors: ['#ffc72c', '#da291c', '#ffffff'],
          origin: { y: 0.5 },
        });
        break;
      default:
        soundManager.playClick();
    }
  };

  return (
    <div className="absolute top-20 right-4 sm:right-6 z-30 w-[92vw] max-w-md pointer-events-auto animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-stone-900/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 shadow-2xl shadow-black/60 text-white flex flex-col gap-4">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {objectInfo ? 'Vật Thể Tương Tác' : 'Phân Khu Chi Tiết'}
              </span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight font-sans">
              {title}
            </h2>
            <p className="text-xs text-amber-400/90 font-medium">
              {subtitle}
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Đóng bảng thông tin"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description Text (Pure Text as requested) */}
        <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-normal">
          {description}
        </p>

        {/* Handmade Craft Specifications / Highlights */}
        {zone?.highlights && (
          <div className="flex flex-col gap-1.5 pt-2 border-t border-white/10">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              Đặc điểm kiến trúc handmade
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {zone.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Action Button (if applicable) */}
        {objectInfo?.actionText && (
          <button
            onClick={handleActionClick}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-red-600 via-amber-500 to-amber-600 text-stone-950 hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {objectInfo.actionText}
          </button>
        )}
      </div>
    </div>
  );
};
