import React from 'react';
import {
  Layers,
  Store,
  Coffee,
  Sparkles,
  Fish,
  Smile,
  Music,
  Utensils,
  Camera
} from 'lucide-react';
import type { ZoneId } from '../../types';
import { ZONES } from '../../data/zones';
import { soundManager } from '../../audio/soundManager';

interface NavigationDockProps {
  activeZone: ZoneId;
  onSelectZone: (zoneId: ZoneId) => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Layers,
  Store,
  Coffee,
  Sparkles,
  Fish,
  Smile,
  Music,
  Utensils,
  Camera,
};

export const NavigationDock: React.FC<NavigationDockProps> = ({
  activeZone,
  onSelectZone,
}) => {
  return (
    <nav className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none max-w-[95vw]">
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 bg-stone-900/90 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-full shadow-2xl shadow-black/50 overflow-x-auto no-scrollbar">
        {ZONES.map((zone) => {
          const Icon = iconMap[zone.icon] || Layers;
          const isActive = activeZone === zone.id;

          return (
            <button
              key={zone.id}
              onClick={() => {
                soundManager.playZoneTransition();
                onSelectZone(zone.id);
              }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl sm:rounded-full text-xs font-bold transition-all duration-300 cursor-pointer select-none whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-red-600 via-amber-500 to-amber-600 text-stone-950 shadow-md shadow-amber-500/30 scale-105'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-stone-950' : 'text-amber-400'}`} />
              <span className="text-[11px] sm:text-xs tracking-tight">{zone.shortName}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
