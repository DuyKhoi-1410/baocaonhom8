import { useMemo, useState } from 'react';
import {
  getKidsRoomPatchworkTexture,
  getTomAndJerryPosterTexture
} from '../../textures/textureGenerators';
import { soundManager } from '../../audio/soundManager';

interface KidsRoomProps {
  onObjectClick?: (objectId: string) => void;
  isNight?: boolean;
}

export const KidsRoom: React.FC<KidsRoomProps> = ({ onObjectClick, isNight = false }) => {
  const patchworkTex = useMemo(() => getKidsRoomPatchworkTexture(), []);
  const tomJerryTex = useMemo(() => getTomAndJerryPosterTexture(), []);
  const [activeKey, setActiveKey] = useState<number | null>(null);

  // 8 Rainbow Piano Keys (C4 to C5)
  const pianoKeys = useMemo(
    () => [
      { note: 'C', color: '#ef4444', x: -1.4 },
      { note: 'D', color: '#f97316', x: -1.0 },
      { note: 'E', color: '#eab308', x: -0.6 },
      { note: 'F', color: '#22c55e', x: -0.2 },
      { note: 'G', color: '#06b6d4', x: 0.2 },
      { note: 'A', color: '#3b82f6', x: 0.6 },
      { note: 'B', color: '#a855f7', x: 1.0 },
      { note: 'C2', color: '#ec4899', x: 1.4 },
    ],
    []
  );

  const handleKeyClick = (index: number, e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setActiveKey(index);
    soundManager.playPianoNote(index);
    setTimeout(() => setActiveKey(null), 250);
  };

  return (
    <group position={[8.5, 0, -6.8]}>
      {/* 1. Room White Foam-Board Enclosure Structure (Spacious 5.4 x 5.6) */}
      {/* Back Wall */}
      <mesh position={[0, 2.5, -2.8]} receiveShadow>
        <boxGeometry args={[5.4, 5.0, 0.2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>

      {/* Right Outer Wall */}
      <mesh position={[2.7, 2.5, 0]} receiveShadow>
        <boxGeometry args={[0.2, 5.0, 5.6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>

      {/* Left Wall Partition with Large Cutaway Window (Photo 2) */}
      <group position={[-2.7, 2.5, 0]}>
        <mesh position={[0, -1.25, 0]} receiveShadow>
          <boxGeometry args={[0.2, 2.5, 5.6]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>
        <mesh position={[0, 2.05, 0]} receiveShadow>
          <boxGeometry args={[0.2, 0.9, 5.6]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.5, -2.2]} receiveShadow>
          <boxGeometry args={[0.2, 1.8, 1.2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.5, 2.2]} receiveShadow>
          <boxGeometry args={[0.2, 1.8, 1.2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>
      </group>

      {/* 2. Front Graphic Patchwork Wall ("KIDS ROOM" Archway Entrance - Photo 6!) */}
      <group
        position={[0, 2.5, 2.8]}
        onClick={(e) => {
          e.stopPropagation();
          onObjectClick?.('kids-room');
        }}
      >
        {/* Left Wall Panel */}
        <mesh position={[-1.6, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 5.0, 0.18]} />
          <meshStandardMaterial
            map={patchworkTex}
            roughness={0.5}
            emissive={isNight ? '#fde047' : '#000000'}
            emissiveIntensity={isNight ? 0.15 : 0}
          />
        </mesh>

        {/* Right Wall Panel */}
        <mesh position={[1.6, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 5.0, 0.18]} />
          <meshStandardMaterial
            map={patchworkTex}
            roughness={0.5}
            emissive={isNight ? '#fde047' : '#000000'}
            emissiveIntensity={isNight ? 0.15 : 0}
          />
        </mesh>

        {/* Overhead Header with "KIDS ROOM" Bubble Logo */}
        <mesh position={[0, 1.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.4, 1.6, 0.2]} />
          <meshStandardMaterial
            map={patchworkTex}
            roughness={0.5}
            emissive={isNight ? '#fde047' : '#000000'}
            emissiveIntensity={isNight ? 0.25 : 0}
          />
        </mesh>
      </group>

      {/* 3. Green LEGO Stud Baseplate on Floor (Photo 5) */}
      <group position={[0, 0.06, 0.2]}>
        <mesh receiveShadow>
          <boxGeometry args={[4.2, 0.08, 3.6]} />
          <meshStandardMaterial
            color="#16a34a" // Vibrant Lego Green
            roughness={0.3}
            metalness={0.08}
          />
        </mesh>

        {/* 6x6 Grid of 3D Cylindrical Lego Studs */}
        {[-1.6, -0.96, -0.32, 0.32, 0.96, 1.6].map((sx, i) =>
          [-1.4, -0.84, -0.28, 0.28, 0.84, 1.4].map((sz, j) => (
            <mesh
              key={`lego-stud-spacious-${i}-${j}`}
              position={[sx, 0.06, sz]}
              castShadow
            >
              <cylinderGeometry args={[0.14, 0.14, 0.06, 12]} />
              <meshStandardMaterial
                color="#22c55e"
                roughness={0.3}
                metalness={0.08}
              />
            </mesh>
          ))
        )}
      </group>

      {/* 4. Interactive Rainbow Piano Keyboard along the Back Wall (Photo 5!) */}
      <group
        position={[0, 0.14, -2.1]}
        onClick={(e) => {
          e.stopPropagation();
          onObjectClick?.('piano-keyboard');
        }}
      >
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[3.8, 0.08, 0.9]} />
          <meshStandardMaterial color="#ffffff" roughness={0.35} />
        </mesh>

        {/* Rainbow Piano Keys (C, D, E, F, G, A, B, C) */}
        {pianoKeys.map((key, idx) => {
          const isPressed = activeKey === idx;
          return (
            <mesh
              key={`piano-k-${idx}`}
              position={[key.x, isPressed ? -0.03 : 0.05, 0]}
              castShadow
              onClick={(e) => handleKeyClick(idx, e)}
            >
              <boxGeometry args={[0.38, 0.06, 0.8]} />
              <meshStandardMaterial
                color={key.color}
                roughness={0.25}
                metalness={0.08}
                emissive={isPressed ? '#ffffff' : '#000000'}
                emissiveIntensity={isPressed ? 0.6 : 0}
              />
            </mesh>
          );
        })}

        {/* Black Accidental Keys */}
        {[-1.2, -0.8, 0.0, 0.4, 0.8].map((bx, bIdx) => (
          <mesh
            key={`black-acc-${bIdx}`}
            position={[bx, 0.1, -0.18]}
            castShadow
          >
            <boxGeometry args={[0.2, 0.08, 0.44]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* 5. Framed "TOM AND JERRY FRENEMIES FOREVER" Happy Meal Poster (Photo 5) */}
      <group
        position={[0, 3.3, -2.68]}
        onClick={(e) => {
          e.stopPropagation();
          onObjectClick?.('tom-jerry-poster');
        }}
      >
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[3.5, 2.5, 0.06]} />
          <meshStandardMaterial color="#da291c" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[3.3, 2.3]} />
          <meshStandardMaterial
            map={tomJerryTex}
            roughness={0.4}
            metalness={0.05}
          />
        </mesh>
      </group>
    </group>
  );
};
