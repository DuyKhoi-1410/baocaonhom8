import React from 'react';
import { X, MousePointer, Move, ZoomIn, Sparkles, Keyboard } from 'lucide-react';
import { soundManager } from '../../audio/soundManager';

interface HelpOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpOverlay: React.FC<HelpOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-stone-900 border border-white/15 rounded-3xl p-6 shadow-2xl text-white flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold">
              ?
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">Hướng Dẫn Khám Phá 3D</h3>
              <p className="text-xs text-stone-400">Cách tương tác và điều khiển mô hình</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mouse / Touch Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
            <MousePointer className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Xoay 360° (Rotate)</h4>
              <p className="text-[11px] text-stone-400">Nhấp giữ chuột trái và kéo để ngắm mô hình từ mọi góc.</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
            <ZoomIn className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Phóng to / Thu nhỏ</h4>
              <p className="text-[11px] text-stone-400">Cuộn con lăn chuột hoặc chụm 2 ngón tay trên điện thoại.</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
            <Move className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Di chuyển (Pan)</h4>
              <p className="text-[11px] text-stone-400">Nhấp chuột phải hoặc dùng 2 ngón tay kéo để tịnh tiến.</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Tương tác đồ vật</h4>
              <p className="text-[11px] text-stone-400">Click vào đàn piano, hồ cá, mèo may mắn, quầy cà phê để kích hoạt.</p>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <Keyboard className="w-4 h-4" />
            <span>Phím tắt nhanh</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-300">
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-200 font-mono text-[10px] border border-white/10">1-9</kbd>
              <span>Chuyển 9 khu vực</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-200 font-mono text-[10px] border border-white/10">N</kbd>
              <span>Bật / Tắt chế độ đêm</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-200 font-mono text-[10px] border border-white/10">M</kbd>
              <span>Bật / Tắt âm thanh</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-200 font-mono text-[10px] border border-white/10">R</kbd>
              <span>Reset góc nhìn camera</span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-400 text-stone-950 hover:bg-amber-300 transition-colors cursor-pointer"
        >
          Đã hiểu, bắt đầu khám phá!
        </button>
      </div>
    </div>
  );
};
