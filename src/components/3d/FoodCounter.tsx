import { useMemo } from 'react';
import {
  getAquaticPlantSignTexture,
  getMenuBoardsTexture,
  getHydroponicMonitorTexture
} from '../../textures/textureGenerators';
import { soundManager } from '../../audio/soundManager';

interface FoodCounterProps {
  onObjectClick?: (objectId: string) => void;
  isNight?: boolean;
}

export const FoodCounter: React.FC<FoodCounterProps> = ({ onObjectClick, isNight = false }) => {
  const signTex = useMemo(() => getAquaticPlantSignTexture(), []);
  const menuTex = useMemo(() => getMenuBoardsTexture(), []);
  const monitorTex = useMemo(() => getHydroponicMonitorTexture(), []);

  const handleCatClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    soundManager.playLuckyBell();
    onObjectClick?.('maneki-neko');
  };

  const handleCabinetClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    soundManager.playBubble();
    onObjectClick?.('hydroponic-cabinet');
  };

  return (
    <group position={[1.5, 0, -10.4]}>
      {/* 1. Black Framed McDonald's Digital Menu Display on Wall (Matching Photos 1 & 3!) */}
      <group position={[0, 4.4, 0.12]}>
        {/* Black Bezel Frame */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[4.8, 1.55, 0.08]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        {/* Menu Screen Surface */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[4.65, 1.42]} />
          <meshStandardMaterial
            map={menuTex}
            roughness={0.25}
            metalness={0.05}
            emissive={isNight ? '#ffc72c' : '#ffffff'}
            emissiveIntensity={isNight ? 0.45 : 0.08}
          />
        </mesh>
      </group>

      {/* 2. "TỦ CÂY THỦY SINH" - AUTHENTIC 3D HYDROPONIC & AQUATIC PLANT CABINET (Matching Photos 1 & 3!) */}
      <group position={[-0.4, 1.3, 0.48]} onClick={handleCabinetClick}>
        {/* === OUTER WALNUT WOODEN CABINET CASING === */}
        {/* Top Roof Panel */}
        <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.45, 0.08, 0.95]} />
          <meshStandardMaterial color="#3e2723" roughness={0.45} />
        </mesh>
        {/* Bottom Base Panel */}
        <mesh position={[0, -1.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.45, 0.08, 0.95]} />
          <meshStandardMaterial color="#3e2723" roughness={0.45} />
        </mesh>
        {/* Left Side Wooden Panel */}
        <mesh position={[-1.68, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.09, 2.42, 0.95]} />
          <meshStandardMaterial color="#3e2723" roughness={0.45} />
        </mesh>
        {/* Right Side Wooden Panel */}
        <mesh position={[1.68, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.09, 2.42, 0.95]} />
          <meshStandardMaterial color="#3e2723" roughness={0.45} />
        </mesh>
        {/* Rear Wall with Glossy White / Reflective Mirror Lining */}
        <mesh position={[0, 0, -0.44]} receiveShadow>
          <boxGeometry args={[3.3, 2.42, 0.04]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.1} />
        </mesh>

        {/* Lower Front Wooden Apron */}
        <mesh position={[0, -1.02, 0.44]} castShadow receiveShadow>
          <boxGeometry args={[3.3, 0.38, 0.08]} />
          <meshStandardMaterial color="#3e2723" roughness={0.45} />
        </mesh>

        {/* Crisp Plaque: "TỦ CÂY THỦY SINH" (Matching Photo 1 & 3!) */}
        <mesh position={[0, -1.02, 0.49]}>
          <planeGeometry args={[2.5, 0.32]} />
          <meshStandardMaterial
            map={signTex}
            roughness={0.2}
            emissive={isNight ? '#86efac' : '#ffffff'}
            emissiveIntensity={isNight ? 0.35 : 0.05}
          />
        </mesh>

        {/* Digital Climate & Nutrient Monitor on Upper Right Corner */}
        <mesh position={[1.15, 1.05, 0.46]}>
          <planeGeometry args={[0.7, 0.18]} />
          <meshStandardMaterial
            map={monitorTex}
            roughness={0.2}
            emissive="#10b981"
            emissiveIntensity={isNight ? 0.9 : 0.4}
          />
        </mesh>

        {/* === TIER 1: BOTTOM SHELF (AQUATIC MOSS, ANUBIAS & RIVER STONES) === */}
        <group position={[0, -0.65, 0]}>
          {/* White Culture Trough */}
          <mesh position={[0, 0, 0]} receiveShadow>
            <boxGeometry args={[3.2, 0.08, 0.82]} />
            <meshStandardMaterial color="#ffffff" roughness={0.25} />
          </mesh>
          {/* Clear Nutrient Water Layer */}
          <mesh position={[0, 0.045, 0]}>
            <boxGeometry args={[3.15, 0.02, 0.78]} />
            <meshStandardMaterial
              color="#38bdf8"
              transparent
              opacity={0.35}
              roughness={0.05}
            />
          </mesh>

          {/* Marimo Moss Balls & Green Moss Carpets */}
          {[-1.2, -0.6, 0.1, 0.8, 1.25].map((mx, idx) => (
            <mesh
              key={`moss-ball-${idx}`}
              position={[mx, 0.12, (idx % 2 === 0 ? 0.12 : -0.15)]}
              castShadow
            >
              <sphereGeometry args={[0.13 + (idx % 3) * 0.02, 10, 10]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#15803d' : '#16a34a'}
                roughness={0.9}
              />
            </mesh>
          ))}

          {/* Miniature Potted Anubias Aquatic Plants */}
          {[-0.9, -0.25, 0.45].map((px, pIdx) => (
            <group key={`potted-anubias-${pIdx}`} position={[px, 0.05, 0]}>
              {/* White Ceramic Pot */}
              <mesh position={[0, 0.07, 0]} castShadow>
                <cylinderGeometry args={[0.12, 0.09, 0.14, 12]} />
                <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
              </mesh>
              {/* Aquatic Leaves fanning out */}
              {[-0.6, 0, 0.6, 1.2, -1.2].map((ang, lIdx) => (
                <mesh
                  key={`leaf-${lIdx}`}
                  position={[Math.sin(ang) * 0.1, 0.18, Math.cos(ang) * 0.1]}
                  rotation={[0.3, ang, 0.2]}
                  castShadow
                >
                  <boxGeometry args={[0.07, 0.18, 0.015]} />
                  <meshStandardMaterial
                    color={lIdx % 2 === 0 ? '#22c55e' : '#15803d'}
                    roughness={0.5}
                  />
                </mesh>
              ))}
            </group>
          ))}

          {/* River Stones */}
          {[-1.35, -0.4, 0.6, 1.1].map((sx, sIdx) => (
            <mesh
              key={`stone-${sIdx}`}
              position={[sx, 0.07, (sIdx % 2 === 0 ? -0.2 : 0.2)]}
              rotation={[0.2, sIdx, 0]}
              castShadow
            >
              <dodecahedronGeometry args={[0.075, 0]} />
              <meshStandardMaterial color="#64748b" roughness={0.7} />
            </mesh>
          ))}
        </group>

        {/* LED Grow Light Bar for Tier 1 (Mounted under Tier 2) */}
        <group position={[0, -0.15, 0]}>
          <mesh castShadow>
            <boxGeometry args={[3.15, 0.035, 0.16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.015, 0]}>
            <boxGeometry args={[3.1, 0.01, 0.12]} />
            <meshStandardMaterial
              color="#dcfce7"
              emissive="#86efac"
              emissiveIntensity={isNight ? 2.8 : 1.2}
            />
          </mesh>
          <pointLight
            position={[0, -0.08, 0]}
            intensity={isNight ? 2.2 : 0.9}
            distance={2.4}
            color="#a7f3d0"
          />
        </group>

        {/* === TIER 2: MIDDLE SHELF (HYDROPONIC SALAD GREENS & LETTUCE RAFTS) === */}
        <group position={[0, 0.02, 0]}>
          {/* White Cultivation Raft */}
          <mesh position={[0, 0, 0]} receiveShadow>
            <boxGeometry args={[3.2, 0.08, 0.82]} />
            <meshStandardMaterial color="#ffffff" roughness={0.25} />
          </mesh>

          {/* 6 Fresh Crisp Hydroponic Lettuce Heads in Net Pots */}
          {[-1.25, -0.75, -0.25, 0.25, 0.75, 1.25].map((lx, idx) => (
            <group key={`lettuce-${idx}`} position={[lx, 0.04, (idx % 2 === 0 ? 0.08 : -0.08)]}>
              {/* Black Net Pot Rim */}
              <mesh position={[0, 0.02, 0]}>
                <cylinderGeometry args={[0.11, 0.1, 0.03, 12]} />
                <meshStandardMaterial color="#0f172a" roughness={0.6} />
              </mesh>
              {/* Layered Ruffled Lettuce Leaves */}
              <mesh position={[0, 0.14, 0]} castShadow>
                <sphereGeometry args={[0.16, 12, 10]} />
                <meshStandardMaterial
                  color={idx % 2 === 0 ? '#4ade80' : '#22c55e'}
                  roughness={0.65}
                />
              </mesh>
              <mesh position={[-0.05, 0.18, 0.05]} castShadow>
                <sphereGeometry args={[0.11, 8, 8]} />
                <meshStandardMaterial color="#86efac" roughness={0.6} />
              </mesh>
              <mesh position={[0.05, 0.19, -0.04]} castShadow>
                <sphereGeometry args={[0.09, 8, 8]} />
                <meshStandardMaterial color="#bbf7d0" roughness={0.55} />
              </mesh>
            </group>
          ))}

          {/* Stem Plants reaching upwards (Bacopa / Rotala) */}
          {[-1.0, 0.0, 1.0].map((stX, sIdx) => (
            <group key={`stem-plant-${sIdx}`} position={[stX, 0.04, 0.24]}>
              <mesh position={[0, 0.18, 0]} castShadow>
                <cylinderGeometry args={[0.015, 0.018, 0.36, 6]} />
                <meshStandardMaterial color="#16a34a" />
              </mesh>
              {[-0.08, 0.02, 0.12, 0.22].map((ly, lIdx) => (
                <mesh
                  key={`sprout-leaf-${lIdx}`}
                  position={[lIdx % 2 === 0 ? 0.04 : -0.04, ly + 0.1, 0]}
                  rotation={[0, 0, lIdx % 2 === 0 ? 0.5 : -0.5]}
                >
                  <boxGeometry args={[0.06, 0.02, 0.01]} />
                  <meshStandardMaterial color="#86efac" />
                </mesh>
              ))}
            </group>
          ))}
        </group>

        {/* LED Grow Light Bar for Tier 2 (Mounted under Tier 3) */}
        <group position={[0, 0.55, 0]}>
          <mesh castShadow>
            <boxGeometry args={[3.15, 0.035, 0.16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.015, 0]}>
            <boxGeometry args={[3.1, 0.01, 0.12]} />
            <meshStandardMaterial
              color="#dcfce7"
              emissive="#86efac"
              emissiveIntensity={isNight ? 2.8 : 1.2}
            />
          </mesh>
          <pointLight
            position={[0, -0.08, 0]}
            intensity={isNight ? 2.2 : 0.9}
            distance={2.4}
            color="#86efac"
          />
        </group>

        {/* === TIER 3: TOP SHELF (MICROGREENS, SPROUTS & HYDROPONIC JARS) === */}
        <group position={[0, 0.68, 0]}>
          {/* White Culture Shelf */}
          <mesh position={[0, 0, 0]} receiveShadow>
            <boxGeometry args={[3.2, 0.08, 0.82]} />
            <meshStandardMaterial color="#ffffff" roughness={0.25} />
          </mesh>

          {/* Microgreen Propagation Trays */}
          {[-1.0, 0, 1.0].map((tx, tIdx) => (
            <group key={`micro-tray-${tIdx}`} position={[tx, 0.05, 0]}>
              {/* Tray Border */}
              <mesh position={[0, 0.03, 0]} receiveShadow castShadow>
                <boxGeometry args={[0.85, 0.06, 0.65]} />
                <meshStandardMaterial color="#334155" roughness={0.5} />
              </mesh>
              {/* Dense Sprout Mat */}
              <mesh position={[0, 0.065, 0]}>
                <boxGeometry args={[0.8, 0.02, 0.6]} />
                <meshStandardMaterial
                  color={tIdx === 0 ? '#22c55e' : tIdx === 1 ? '#4ade80' : '#86efac'}
                  roughness={0.8}
                />
              </mesh>
              {/* Tiny Sprout Highlights */}
              {[-0.25, 0, 0.25].map((sx, i) =>
                [-0.18, 0, 0.18].map((sz, j) => (
                  <mesh key={`sprout-tuft-${i}-${j}`} position={[sx, 0.1, sz]} castShadow>
                    <coneGeometry args={[0.045, 0.09, 6]} />
                    <meshStandardMaterial color="#bbf7d0" roughness={0.6} />
                  </mesh>
                ))
              )}
            </group>
          ))}
        </group>

        {/* Top Ceiling LED Grow Light Bar for Tier 3 */}
        <group position={[0, 1.18, 0]}>
          <mesh castShadow>
            <boxGeometry args={[3.15, 0.035, 0.16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.015, 0]}>
            <boxGeometry args={[3.1, 0.01, 0.12]} />
            <meshStandardMaterial
              color="#dcfce7"
              emissive="#86efac"
              emissiveIntensity={isNight ? 3.0 : 1.3}
            />
          </mesh>
          <pointLight
            position={[0, -0.08, 0]}
            intensity={isNight ? 2.5 : 1.0}
            distance={2.6}
            color="#86efac"
          />
        </group>

        {/* Vertical Silicone Nutrient Water Tube running along inside right corner */}
        <mesh position={[1.52, 0, 0.32]}>
          <cylinderGeometry args={[0.022, 0.022, 2.3, 8]} />
          <meshPhysicalMaterial
            color="#e0f2fe"
            transparent
            opacity={0.65}
            roughness={0.1}
            transmission={0.8}
          />
        </mesh>

        {/* === ULTRA-CLEAR SLIDING GLASS DOORS === */}
        {/* Left Sliding Glass Pane */}
        <mesh position={[-0.78, 0.06, 0.44]}>
          <boxGeometry args={[1.62, 1.95, 0.02]} />
          <meshPhysicalMaterial
            color="#f0fdf4"
            transparent
            opacity={0.22}
            roughness={0.03}
            transmission={0.96}
            ior={1.5}
            thickness={0.05}
          />
        </mesh>
        {/* Left Stainless Steel Pull Handle */}
        <mesh position={[-0.08, 0.06, 0.46]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.45, 8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Right Sliding Glass Pane (Slightly offset in front for realistic overlapping slide track) */}
        <mesh position={[0.78, 0.06, 0.46]}>
          <boxGeometry args={[1.62, 1.95, 0.02]} />
          <meshPhysicalMaterial
            color="#f0fdf4"
            transparent
            opacity={0.22}
            roughness={0.03}
            transmission={0.96}
            ior={1.5}
            thickness={0.05}
          />
        </mesh>
        {/* Right Stainless Steel Pull Handle */}
        <mesh position={[0.08, 0.06, 0.48]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.45, 8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* 3. ITEMS ON ADJACENT LILAC SIDE CABINET: LUCKY CAT & FRIES (Photos 1 & 3!) */}
      <group position={[1.8, 0, 0.45]}>
        {/* Pastel Lilac / Lavender Small Side Cabinet Box (Matching Photos 1 & 3!) */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.1, 1.5, 0.7]} />
          <meshStandardMaterial color="#c4b5fd" roughness={0.4} />
        </mesh>
        {/* Cabinet Door Seam */}
        <mesh position={[0, 0.75, 0.36]}>
          <boxGeometry args={[0.02, 1.35, 0.02]} />
          <meshStandardMaterial color="#8b5cf6" />
        </mesh>
        {/* Silver Door Knob */}
        <mesh position={[0.3, 0.85, 0.37]} castShadow>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Japanese Lucky Cat (Maneki-Neko) on Top of Side Cabinet (Photos 1 & 3) */}
        <group onClick={handleCatClick} position={[-0.2, 1.55, 0]}>
          {/* Black Porcelain Body */}
          <mesh position={[0, 0.22, 0]} castShadow>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial
              color="#0f172a"
              roughness={0.15}
              metalness={0.1}
            />
          </mesh>
          {/* Cat Head */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial
              color="#0f172a"
              roughness={0.15}
              metalness={0.1}
            />
          </mesh>
          {/* Ears */}
          <mesh position={[-0.09, 0.58, 0]} rotation={[0, 0, 0.32]}>
            <coneGeometry args={[0.055, 0.12, 4]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} />
          </mesh>
          <mesh position={[0.09, 0.58, 0]} rotation={[0, 0, -0.32]}>
            <coneGeometry args={[0.055, 0.12, 4]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} />
          </mesh>
          {/* Red Collar & Golden Bell */}
          <mesh position={[0, 0.36, 0]}>
            <torusGeometry args={[0.14, 0.024, 8, 16]} />
            <meshStandardMaterial color="#dc2626" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.34, 0.14]} castShadow>
            <sphereGeometry args={[0.038, 8, 8]} />
            <meshStandardMaterial color="#facc15" metalness={0.85} roughness={0.15} />
          </mesh>
          {/* Waving Paw */}
          <mesh position={[0.16, 0.5, 0.09]} rotation={[0.42, 0, -0.42]} castShadow>
            <cylinderGeometry args={[0.035, 0.045, 0.16, 8]} />
            <meshStandardMaterial color="#facc15" metalness={0.7} roughness={0.25} />
          </mesh>
        </group>

        {/* Miniature Red McDonald's French Fry Carton with Golden Fries (Photos 1 & 3) */}
        <group position={[0.3, 1.55, 0]}>
          <mesh position={[0, 0.09, 0]} castShadow>
            <boxGeometry args={[0.18, 0.2, 0.11]} />
            <meshStandardMaterial color="#da291c" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.09, 0.058]}>
            <circleGeometry args={[0.045, 8]} />
            <meshBasicMaterial color="#ffc72c" />
          </mesh>
          {/* Golden Fries sticking out */}
          {[-0.05, 0, 0.05].map((fx, i) => (
            <mesh key={`mini-cat-fry-${i}`} position={[fx, 0.22, 0]} castShadow>
              <boxGeometry args={[0.03, 0.12, 0.03]} />
              <meshStandardMaterial color="#ffc72c" roughness={0.3} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
};
