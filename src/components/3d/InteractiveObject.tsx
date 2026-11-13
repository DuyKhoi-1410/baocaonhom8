import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import type { InteractiveObjectInfo } from '../../types';

interface InteractivePinProps {
  info: InteractiveObjectInfo;
  onClick: (id: string) => void;
  visible?: boolean;
}

export const InteractivePin: React.FC<InteractivePinProps> = ({ info, onClick, visible = true }) => {
  const pinRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (pinRef.current) {
      // Gentle floating bob
      const t = state.clock.getElapsedTime() * 2 + info.position[0];
      pinRef.current.position.y = info.position[1] + Math.sin(t) * 0.12 + 0.3;
    }
  });

  if (!visible) return null;

  return (
    <group ref={pinRef} position={[info.position[0], info.position[1] + 0.3, info.position[2]]}>
      <Html center distanceFactor={14} zIndexRange={[100, 0]}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick(info.id);
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-300 shadow-lg cursor-pointer select-none backdrop-blur-md ${
            hovered
              ? 'bg-amber-400 text-stone-900 scale-110 shadow-amber-500/50 -translate-y-1 ring-2 ring-white'
              : 'bg-stone-900/80 text-amber-300 hover:bg-stone-900 shadow-black/40 border border-amber-400/40'
          }`}
          style={{
            transform: hovered ? 'scale(1.15) translateY(-4px)' : 'scale(1)',
            transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
          <span className="whitespace-nowrap">{info.name}</span>
        </button>
      </Html>
    </group>
  );
};
