import { useMemo } from 'react';
import { getCheckInFrameTexture } from '../../textures/textureGenerators';
import { soundManager } from '../../audio/soundManager';

interface DiningAreaProps {
  onObjectClick?: (objectId: string) => void;
  isNight?: boolean;
}

export const DiningArea: React.FC<DiningAreaProps> = ({ onObjectClick, isNight = false }) => {
  const checkInTex = useMemo(() => getCheckInFrameTexture(), []);

  const handleCheckInClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    soundManager.playCameraShutter();
    onObjectClick?.('checkin-booth');
  };

  return (
    <group position={[-8.5, 0, 0]}>
      {/* 1. Dining Table 1 (Foreground Table - Matching Image 2) */}
      <group position={[0, 0, 2.2]}>
        {/* Wooden Tabletop */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.1, 1.6]} />
          <meshStandardMaterial color="#d4a373" roughness={0.55} />
        </mesh>
        {/* Table Pedestal Legs */}
        {[-0.9, 0.9].map((lx, i) => (
          <mesh key={`dining-leg-1-${i}`} position={[lx, 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
            <meshStandardMaterial color="#64748b" roughness={0.4} />
          </mesh>
        ))}

        {/* Matching Wooden Bench Chairs on both sides (Image 2) */}
        <mesh position={[0, 0.65, -1.1]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.7, 0.45]} />
          <meshStandardMaterial color="#c68a4c" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.65, 1.1]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.7, 0.45]} />
          <meshStandardMaterial color="#c68a4c" roughness={0.6} />
        </mesh>

        {/* Miniature McDonald's Meal Set on Table */}
        <group position={[0, 1.28, 0]}>
          {/* Big Mac Burger */}
          <mesh position={[-0.45, 0.06, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.16, 0.1, 12]} />
            <meshStandardMaterial color="#b45309" roughness={0.7} />
          </mesh>
          <mesh position={[-0.45, 0.12, 0]}>
            <sphereGeometry args={[0.15, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#d97706" roughness={0.6} />
          </mesh>
          {/* French Fry Carton with Golden Fries */}
          <group position={[0.15, 0.1, -0.15]}>
            <mesh castShadow>
              <boxGeometry args={[0.16, 0.18, 0.1]} />
              <meshStandardMaterial color="#da291c" roughness={0.4} />
            </mesh>
            {[-0.04, 0, 0.04].map((fx, i) => (
              <mesh key={`table-fry-${i}`} position={[fx, 0.14, 0]}>
                <boxGeometry args={[0.024, 0.15, 0.024]} />
                <meshStandardMaterial color="#ffc72c" />
              </mesh>
            ))}
          </group>
          {/* Drink Cup with Straw */}
          <group position={[0.42, 0.1, 0.15]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.08, 0.055, 0.2, 10]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
            <mesh position={[0.02, 0.16, 0]} rotation={[0, 0, 0.15]}>
              <cylinderGeometry args={[0.012, 0.012, 0.12, 6]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
          </group>

          {/* Cozy Evening Table Candle Lantern (Glowing warm amber at night) */}
          <group position={[-0.75, 0.1, 0.4]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.07, 0.08, 0.16, 8]} />
              <meshPhysicalMaterial
                color="#fef08a"
                transparent
                opacity={0.4}
                roughness={0.1}
                transmission={0.8}
              />
            </mesh>
            <mesh position={[0, 0.02, 0]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshStandardMaterial
                color="#f59e0b"
                emissive={isNight ? '#f59e0b' : '#fef08a'}
                emissiveIntensity={isNight ? 3.5 : 0.5}
              />
            </mesh>
            <pointLight
              position={[0, 0.12, 0]}
              intensity={isNight ? 2.8 : 0.4}
              distance={5.0}
              color="#fbbf24"
            />
          </group>
        </group>
      </group>

      {/* 2. Dining Table 2 (Background Table - Matching Image 2) */}
      <group position={[0, 0, -2.5]}>
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.1, 1.6]} />
          <meshStandardMaterial color="#d4a373" roughness={0.55} />
        </mesh>
        {[-0.9, 0.9].map((lx, i) => (
          <mesh key={`dining-leg-2-${i}`} position={[lx, 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
            <meshStandardMaterial color="#64748b" roughness={0.4} />
          </mesh>
        ))}
        <mesh position={[0, 0.65, -1.1]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.7, 0.45]} />
          <meshStandardMaterial color="#c68a4c" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.65, 1.1]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.7, 0.45]} />
          <meshStandardMaterial color="#c68a4c" roughness={0.6} />
        </mesh>

        {/* Table 2 Cozy Candle Lantern */}
        <group position={[0.6, 1.35, 0.2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.07, 0.08, 0.16, 8]} />
            <meshPhysicalMaterial
              color="#fef08a"
              transparent
              opacity={0.4}
              roughness={0.1}
              transmission={0.8}
            />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive={isNight ? '#f59e0b' : '#fef08a'}
              emissiveIntensity={isNight ? 3.5 : 0.5}
            />
          </mesh>
          <pointLight
            position={[0, 0.12, 0]}
            intensity={isNight ? 2.8 : 0.4}
            distance={5.0}
            color="#fbbf24"
          />
        </group>
      </group>

      {/* 3. Wall-Mounted Floating Planter Boxes with Green Foliage on Left Wall (Matching Image 2!) */}
      <group position={[-4.8, 2.5, 0]}>
        {[-2.5, 2.0].map((pz, idx) => (
          <group key={`wall-planter-${idx}`} position={[0, 0, pz]}>
            {/* White Planter Box */}
            <mesh castShadow>
              <boxGeometry args={[0.3, 0.3, 1.6]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
            {/* Green Foliage / Leaves */}
            {[-0.5, 0, 0.5].map((lz, li) => (
              <mesh key={`foliage-${li}`} position={[0, 0.22, lz]} castShadow>
                <sphereGeometry args={[0.22, 10, 10]} />
                <meshStandardMaterial color="#22c55e" roughness={0.8} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* 4. Standing "CHECK-IN CÙNG McDONALD'S" Photo Booth Frame (Image 0 & 2!) */}
      <group position={[1.8, 0, 4.8]} onClick={handleCheckInClick}>
        <mesh position={[0, 2.3, 0]} castShadow>
          <boxGeometry args={[1.85, 2.7, 0.06]} />
          <meshStandardMaterial
            map={checkInTex}
            roughness={0.4}
            metalness={0.05}
            emissive={isNight ? '#ffc72c' : '#000000'}
            emissiveIntensity={isNight ? 0.25 : 0}
          />
        </mesh>

        {/* 2 Black Inverted-T Floor Stands */}
        {[-0.7, 0.7].map((sx, idx) => (
          <group key={`stand-foot-${idx}`} position={[sx, 0, 0]}>
            <mesh position={[0, 0.88, 0]} castShadow>
              <cylinderGeometry args={[0.035, 0.035, 1.75, 8]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.06, 0]} castShadow>
              <boxGeometry args={[0.3, 0.12, 0.3]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
