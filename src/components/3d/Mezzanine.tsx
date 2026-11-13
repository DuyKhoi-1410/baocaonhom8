import { useMemo } from 'react';
import {
  getDragonBridgeTexture,
  getMcCafeMenuTexture,
  getGalaxyCeilingTexture
} from '../../textures/textureGenerators';
import { soundManager } from '../../audio/soundManager';

interface MezzanineProps {
  onObjectClick?: (objectId: string) => void;
  isNight?: boolean;
}

export const Mezzanine: React.FC<MezzanineProps> = ({ onObjectClick, isNight = false }) => {
  const dragonTex = useMemo(() => getDragonBridgeTexture(), []);
  const mccafeMenuTex = useMemo(() => getMcCafeMenuTexture(), []);
  const galaxyTex = useMemo(() => getGalaxyCeilingTexture(), []);

  const handleCoffeeClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    soundManager.playCoffeeBrew();
    onObjectClick?.('mccafe-counter');
  };

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Magnificent Starry Night / Galaxy / Milky Way Ceiling Mural (Matching Image 2!) */}
      <group position={[0, 8.8, -1.5]}>
        {/* Ceiling Backing Panel */}
        <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[26.5, 18.5]} />
          <meshStandardMaterial
            map={galaxyTex}
            roughness={0.2}
            metalness={0.1}
            emissive={isNight ? '#1e1b4b' : '#000000'}
            emissiveIntensity={isNight ? 0.35 : 0.05}
          />
        </mesh>

        {/* Modern Industrial Hanging Pendant Lamps (Matching Image 2!) */}
        {[
          { x: -8.0, z: 2.0, cordLen: 4.2 },
          { x: -4.5, z: 2.0, cordLen: 4.2 },
          { x: -1.0, z: 2.0, cordLen: 4.2 },
          { x: -6.5, z: -5.0, cordLen: 2.2 },
          { x: -2.5, z: -5.0, cordLen: 2.2 },
          { x: 1.5, z: -5.0, cordLen: 2.2 },
          { x: 5.5, z: -5.0, cordLen: 2.2 },
          { x: 8.5, z: -1.5, cordLen: 2.2 },
        ].map((p, idx) => (
          <group key={`pendant-light-${idx}`} position={[p.x, 0, p.z]}>
            {/* Black Cord */}
            <mesh position={[0, -p.cordLen / 2, 0]}>
              <cylinderGeometry args={[0.015, 0.015, p.cordLen, 6]} />
              <meshBasicMaterial color="#0f172a" />
            </mesh>
            {/* Brass / Warm Gold Cone Lamp Shade (Image 2) */}
            <mesh position={[0, -p.cordLen, 0]} castShadow>
              <coneGeometry args={[0.32, 0.28, 16, 1, true]} />
              <meshStandardMaterial
                color="#f59e0b" // Warm brass
                metalness={0.8}
                roughness={0.25}
              />
            </mesh>
            {/* Glowing Bulb inside shade */}
            <mesh position={[0, -p.cordLen + 0.05, 0]}>
              <sphereGeometry args={[0.08, 10, 10]} />
              <meshBasicMaterial color="#fef08a" />
            </mesh>
            {/* Downward Warm Point Light */}
            <pointLight
              position={[0, -p.cordLen - 0.1, 0]}
              intensity={isNight ? 1.8 : 0.8}
              distance={6.5}
              color="#fde047"
            />
          </group>
        ))}
      </group>

      {/* 2. Wooden Staircase Connecting Ground Floor to Mezzanine (Right Side - Image 0 & 2) */}
      <group position={[6.5, 2.4, -3.2]} rotation={[0.48, 0, 0]}>
        {/* Left Stringer Beam */}
        <mesh position={[-0.85, 0, 0]} castShadow>
          <boxGeometry args={[0.09, 6.2, 0.2]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>
        {/* Right Stringer Beam */}
        <mesh position={[0.85, 0, 0]} castShadow>
          <boxGeometry args={[0.09, 6.2, 0.2]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>
        {/* 13 Teak Wooden Steps (Matching CAD Image 0) */}
        {[-2.6, -2.15, -1.7, -1.25, -0.8, -0.35, 0.1, 0.55, 1.0, 1.45, 1.9, 2.35, 2.8].map((ry, idx) => (
          <mesh key={`stair-step-${idx}`} position={[0, ry, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.65, 0.08, 0.24]} />
            <meshStandardMaterial color="#b45309" roughness={0.6} />
          </mesh>
        ))}
        {/* Modern Safety Handrails & Wire Cables (Image 2) */}
        <mesh position={[-0.85, 0.6, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 6.2, 8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0.85, 0.6, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 6.2, 8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>

      {/* 3. Elevated Mezzanine Platform Floor (Y = 4.8) */}
      <group position={[0, 4.8, 0]}>
        {/* Back Gallery Wing (Width 25.0, Depth 4.8) */}
        <mesh position={[-1.0, 0, -8.0]} receiveShadow>
          <boxGeometry args={[25.0, 0.2, 5.0]} />
          <meshStandardMaterial color="#ffffff" roughness={0.35} />
        </mesh>
        {/* Right McCafé Gallery Wing (Width 5.5, Depth 9.5) */}
        <mesh position={[8.5, 0, -2.5]} receiveShadow>
          <boxGeometry args={[6.0, 0.2, 9.5]} />
          <meshStandardMaterial color="#ffffff" roughness={0.35} />
        </mesh>

        {/* Bright Sunny Yellow Safety Edge Trim / Fascia Band (Matching Image 2!) */}
        <mesh position={[-4.0, -0.15, -5.5]} castShadow>
          <boxGeometry args={[19.0, 0.5, 0.12]} />
          <meshStandardMaterial color="#eab308" roughness={0.3} />
        </mesh>
        <mesh position={[5.5, -0.15, -1.5]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[8.0, 0.5, 0.12]} />
          <meshStandardMaterial color="#eab308" roughness={0.3} />
        </mesh>

        {/* Modern Minimalist Glass / Wire Safety Railing along Mezzanine Edge (Image 2) */}
        <group position={[0, 0.55, 0]}>
          {/* Back Railing Wire */}
          <mesh position={[-4.0, 0.45, -5.5]}>
            <boxGeometry args={[19.0, 0.04, 0.04]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[-4.0, 0.15, -5.5]}>
            <boxGeometry args={[19.0, 0.025, 0.025]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} />
          </mesh>
          {/* Posts */}
          {[-12.5, -9.5, -6.5, -3.5, -0.5, 2.5, 5.5].map((rx, i) => (
            <mesh key={`post-back-${i}`} position={[rx, 0.25, -5.5]}>
              <cylinderGeometry args={[0.025, 0.025, 0.9, 8]} />
              <meshStandardMaterial color="#64748b" metalness={0.8} />
            </mesh>
          ))}
          {/* Right Railing Wire */}
          <mesh position={[5.5, 0.45, -1.5]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[8.0, 0.04, 0.04]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* 4. Row of Soft Colorful Beanbag Poufs / Armchairs (Matching Image 2!) */}
        {/* Yellow Beanbag */}
        <group position={[-8.5, 0.38, -8.0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.7, 0.5, 0.6, 16]} />
            <meshStandardMaterial color="#facc15" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.28, 0]}>
            <sphereGeometry args={[0.55, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#fef08a" roughness={0.85} />
          </mesh>
        </group>

        {/* Butter Cream Beanbag */}
        <group position={[-5.8, 0.38, -8.0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.68, 0.48, 0.6, 16]} />
            <meshStandardMaterial color="#fef3c7" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.28, 0]}>
            <sphereGeometry args={[0.54, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#ffffff" roughness={0.85} />
          </mesh>
        </group>

        {/* White Beanbag */}
        <group position={[-3.2, 0.38, -8.0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.7, 0.5, 0.6, 16]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.28, 0]}>
            <sphereGeometry args={[0.55, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#ffffff" roughness={0.85} />
          </mesh>
        </group>

        {/* Blue Beanbag */}
        <group position={[-0.5, 0.38, -8.0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.68, 0.48, 0.6, 16]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.28, 0]}>
            <sphereGeometry args={[0.54, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#7dd3fc" roughness={0.85} />
          </mesh>
        </group>

        {/* Teal Beanbag */}
        <group position={[2.0, 0.38, -8.0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.7, 0.5, 0.6, 16]} />
            <meshStandardMaterial color="#0d9488" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.28, 0]}>
            <sphereGeometry args={[0.55, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#2dd4bf" roughness={0.85} />
          </mesh>
        </group>

        {/* 5. McCafé Service Bar & Pastry Showcase (Right Mezzanine Wing - Image 2) */}
        <group position={[8.5, 0, -3.5]} onClick={handleCoffeeClick}>
          {/* Main Service Counter L-Shape (Yellow Body + Wood Countertop) */}
          <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
            <boxGeometry args={[3.2, 1.5, 1.8]} />
            <meshStandardMaterial color="#eab308" roughness={0.3} metalness={0.05} />
          </mesh>
          <mesh position={[0, 1.52, 0]} castShadow receiveShadow>
            <boxGeometry args={[3.3, 0.08, 1.9]} />
            <meshStandardMaterial color="#78350f" roughness={0.4} />
          </mesh>

          {/* "TỦ BÁNH McCafé" (Glass Pastry Showcase - Image 2) */}
          <group position={[-0.7, 1.85, 0]}>
            <mesh>
              <boxGeometry args={[1.4, 0.65, 0.8]} />
              <meshPhysicalMaterial
                color="#e0f2fe"
                transparent
                opacity={0.32}
                roughness={0.04}
                transmission={0.92}
              />
            </mesh>
            {/* Shelf */}
            <mesh position={[0, -0.05, 0]}>
              <boxGeometry args={[1.35, 0.02, 0.75]} />
              <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </mesh>
            {/* Miniature Pastries (Croissants, Muffins, Donuts) */}
            <mesh position={[-0.38, 0.08, 0]} rotation={[0, 0.4, 0]}>
              <torusGeometry args={[0.11, 0.05, 8, 12, Math.PI * 1.4]} />
              <meshStandardMaterial color="#b45309" roughness={0.6} />
            </mesh>
            <mesh position={[0.1, 0.09, 0]}>
              <cylinderGeometry args={[0.08, 0.11, 0.14, 10]} />
              <meshStandardMaterial color="#78350f" roughness={0.6} />
            </mesh>
            <mesh position={[0.42, 0.09, 0]}>
              <sphereGeometry args={[0.08, 10, 10]} />
              <meshStandardMaterial color="#f472b6" roughness={0.6} />
            </mesh>
          </group>

          {/* Espresso Machine & Coffee Cups */}
          <group position={[0.7, 1.75, 0.1]}>
            <mesh castShadow>
              <boxGeometry args={[0.45, 0.38, 0.4]} />
              <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.28, 0.2]}>
              <cylinderGeometry args={[0.05, 0.04, 0.14, 10]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
          </group>

          {/* Overhead McCafé Wall Menu Panels (4 Screens as in Image 2!) */}
          <group position={[0, 2.8, -0.8]}>
            <mesh castShadow>
              <planeGeometry args={[2.8, 1.1]} />
              <meshBasicMaterial
                map={mccafeMenuTex}
                transparent
                opacity={0.98}
              />
            </mesh>
          </group>
        </group>
      </group>

      {/* 6. Da Nang Golden Dragon Bridge ("Cầu Rồng") Night Panorama Mural with Fireworks (Image 2!) */}
      <group position={[-1.0, 6.8, -10.45]}>
        {/* Backing Wall */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[25.2, 4.2, 0.15]} />
          <meshStandardMaterial color="#020617" roughness={0.5} />
        </mesh>
        {/* Panoramic Mural Face */}
        <mesh position={[0, 0, 0.09]}>
          <planeGeometry args={[25.0, 4.05]} />
          <meshStandardMaterial
            map={dragonTex}
            roughness={0.3}
            metalness={0.1}
            emissive={isNight ? '#f59e0b' : '#000000'}
            emissiveIntensity={isNight ? 0.55 : 0.08}
          />
        </mesh>
      </group>
    </group>
  );
};
