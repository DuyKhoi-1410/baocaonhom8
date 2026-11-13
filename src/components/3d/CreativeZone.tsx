import { useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  getCreativeZoneSignTexture,
  getMascotStandeeTexture
} from '../../textures/textureGenerators';

interface CreativeZoneProps {
  onObjectClick?: (objectId: string) => void;
  isNight?: boolean;
}

export const CreativeZone: React.FC<CreativeZoneProps> = ({ onObjectClick, isNight = false }) => {
  const creativeSignTex = useMemo(() => getCreativeZoneSignTexture(), []);
  const mascotTex = useMemo(() => getMascotStandeeTexture(), []);

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
    onObjectClick?.('lego-creative-wall');
  };

  return (
    <group position={[-4.0, 0, -10.4]} onClick={handleClick}>
      {/* 1. Mascot Standees on Top of the Wall: "WELCOME TO DUE - HAPPY, BE BRIGHT" (Matching Image 3!) */}
      <group position={[0, 4.85, 0.12]}>
        <mesh castShadow>
          <planeGeometry args={[3.2, 1.5]} />
          <meshBasicMaterial
            map={mascotTex}
            transparent
            opacity={0.98}
          />
        </mesh>
      </group>

      {/* 2. Overhead "CREATIVE ZONE" Speech Bubble Sign (Matching Image 3) */}
      <group position={[0, 4.0, 0.14]}>
        <mesh castShadow>
          <planeGeometry args={[2.8, 1.35]} />
          <meshBasicMaterial
            map={creativeSignTex}
            transparent
            opacity={0.96}
            color={isNight ? '#38bdf8' : '#ffffff'}
          />
        </mesh>
      </group>

      {/* 3. Dark Slate-Grey 16x16 LEGO Stud Baseplate on Wall (Matching Image 3!) */}
      <group position={[0, 2.5, 0.12]}>
        {/* Grey Baseplate */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2.7, 2.2, 0.1]} />
          <meshStandardMaterial
            color="#334155" // Slate grey matching real Lego piece in Image 3
            roughness={0.35}
            metalness={0.08}
          />
        </mesh>

        {/* 6x5 Grid of 3D Lego Studs */}
        {[-1.05, -0.63, -0.21, 0.21, 0.63, 1.05].map((sx, i) =>
          [-0.75, -0.38, 0, 0.38, 0.75].map((sy, j) => (
            <mesh
              key={`wall-stud-due-${i}-${j}`}
              position={[sx, sy, 0.07]}
              rotation={[Math.PI / 2, 0, 0]}
              castShadow
            >
              <cylinderGeometry args={[0.08, 0.08, 0.04, 10]} />
              <meshStandardMaterial color="#475569" roughness={0.35} />
            </mesh>
          ))
        )}

        {/* Interlocking Colorful 3D Lego Bricks (Matching Pattern in Image 3!) */}
        {/* Pink Tile on Top Left */}
        <mesh position={[-0.6, 0.55, 0.13]} castShadow>
          <boxGeometry args={[0.8, 0.5, 0.08]} />
          <meshStandardMaterial color="#ec4899" roughness={0.3} />
        </mesh>

        {/* Blue Blocks in Center */}
        <mesh position={[-0.2, 0.1, 0.13]} castShadow>
          <boxGeometry args={[0.7, 0.6, 0.08]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.3} />
        </mesh>

        {/* Orange & Yellow Bricks on Right Side (Image 3) */}
        <mesh position={[0.65, 0.15, 0.13]} castShadow>
          <boxGeometry args={[0.8, 1.1, 0.08]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.3} />
        </mesh>

        {/* Green Brick at Bottom */}
        <mesh position={[-0.5, -0.45, 0.13]} castShadow>
          <boxGeometry args={[0.6, 0.4, 0.08]} />
          <meshStandardMaterial color="#10b981" roughness={0.3} />
        </mesh>

        {/* Red Accent Brick */}
        <mesh position={[0.1, -0.5, 0.13]} castShadow>
          <boxGeometry args={[0.4, 0.35, 0.08]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} />
        </mesh>
      </group>

      {/* 4. Red Wooden Storage Rack with 4 Clear Pull-out Bins (Matching Image 3!) */}
      <group position={[0, 0.65, 0.4]}>
        {/* Red Frame Box */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.7, 1.1, 0.65]} />
          <meshStandardMaterial color="#991b1b" roughness={0.55} wireframe />
        </mesh>
        <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.65, 0.06, 0.62]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.5} />
        </mesh>

        {/* 4 Clear Plastic Tubs filled with Colorful Lego Bricks (2x2 arrangement as in Image 3!) */}
        {[-0.65, 0.65].map((bx, col) =>
          [-0.22, 0.32].map((by, row) => (
            <group key={`tub-${col}-${row}`} position={[bx, by, 0.05]}>
              {/* Clear Tub */}
              <mesh castShadow>
                <boxGeometry args={[1.1, 0.4, 0.55]} />
                <meshPhysicalMaterial
                  color="#f1f5f9"
                  transparent
                  opacity={0.5}
                  roughness={0.1}
                  transmission={0.8}
                />
              </mesh>
              {/* Colorful Lego Pieces inside */}
              {[-0.3, 0, 0.3].map((px, pi) => (
                <mesh key={`p-${pi}`} position={[px, -0.08, 0]}>
                  <boxGeometry args={[0.18, 0.12, 0.18]} />
                  <meshStandardMaterial
                    color={['#ef4444', '#3b82f6', '#facc15', '#10b981'][(col * 2 + row + pi) % 4]}
                    roughness={0.3}
                  />
                </mesh>
              ))}
            </group>
          ))
        )}
      </group>
    </group>
  );
};
