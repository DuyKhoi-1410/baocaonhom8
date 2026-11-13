import { useMemo } from 'react';
import * as THREE from 'three';
import {
  getFriesBillboardTexture,
  getStorefrontHeaderTexture,
  getMcCafeWoodTexture
} from '../../textures/textureGenerators';

interface ExteriorFacadeProps {
  onObjectClick?: (objectId: string) => void;
  isNight?: boolean;
}

// Generate the iconic, unified continuous 3D McDonald's Golden Arches 'M' Shape
// Matching exact architectural elevation in CAD blueprint & 3D render:
// - Height: 4.70m
// - Width: 4.50m (span x = -2.25 to +2.25)
// - Walk-through inner clearance: 3.50m wide, 2.20m high center notch
// - Uniform ribbon thickness: ~0.50m
const createGoldenArchesShape = (): THREE.Shape => {
  const shape = new THREE.Shape();

  // 1. Outer contour:
  // Base of outer left leg
  shape.moveTo(-2.25, 0);
  // Outer left leg rises vertically and curves into outer left arch peak
  shape.bezierCurveTo(-2.25, 2.6, -1.85, 4.70, -1.15, 4.70);
  // Outer left arch curves down to center notch
  shape.bezierCurveTo(-0.50, 4.70, -0.12, 3.20, 0, 2.70);
  // Outer right arch curves up from center notch to right peak
  shape.bezierCurveTo(0.12, 3.20, 0.50, 4.70, 1.15, 4.70);
  // Outer right arch curves down into outer right leg to ground
  shape.bezierCurveTo(1.85, 4.70, 2.25, 2.6, 2.25, 0);

  // 2. Footing of right leg:
  shape.lineTo(1.75, 0);

  // 3. Inner contour:
  // Inner right leg rises and curves into inner right arch peak
  shape.bezierCurveTo(1.75, 2.2, 1.55, 4.20, 1.15, 4.20);
  // Inner right arch curves down to inner center notch
  shape.bezierCurveTo(0.50, 4.20, 0.12, 2.72, 0, 2.20);
  // Inner left arch curves up to inner left peak
  shape.bezierCurveTo(-0.12, 2.72, -0.50, 4.20, -1.15, 4.20);
  // Inner left arch curves down to inner left leg to ground
  shape.bezierCurveTo(-1.55, 4.20, -1.75, 2.2, -1.75, 0);

  // 4. Footing of left leg back to start:
  shape.lineTo(-2.25, 0);

  return shape;
};

export const ExteriorFacade: React.FC<ExteriorFacadeProps> = ({ onObjectClick, isNight = false }) => {
  const friesTex = useMemo(() => getFriesBillboardTexture(), []);
  const headerTex = useMemo(() => getStorefrontHeaderTexture(), []);
  const mccafeTex = useMemo(() => getMcCafeWoodTexture(), []);

  // Continuous 3D Extruded Golden Arches Geometry with smooth beveled edges
  const goldenArchesGeo = useMemo(() => {
    const shape = createGoldenArchesShape();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.36,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 4,
      curveSegments: 32,
    });
  }, []);

  return (
    <group position={[0, 0, 8.0]}>
      {/* 1. Outer Architectural Frame & Fascia (Spacious Width 27.0, Height 7.2) */}
      {/* Top Roof Edge / Fascia Cap */}
      <mesh position={[0, 7.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[27.2, 0.3, 0.9]} />
        <meshStandardMaterial color="#ffffff" roughness={0.45} />
      </mesh>
      {/* Far Left Wall Outer Shell */}
      <mesh position={[-13.5, 3.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 7.4, 0.9]} />
        <meshStandardMaterial color="#141416" roughness={0.5} />
      </mesh>
      {/* Far Right Wall Outer Shell */}
      <mesh position={[13.5, 3.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 7.4, 0.9]} />
        <meshStandardMaterial color="#141416" roughness={0.5} />
      </mesh>

      {/* 2. Large "FRIES BEFORE GUYS" Billboard on Far Left (Image 0 & 1) */}
      <group
        position={[-11.2, 3.6, 0.16]}
        onClick={(e) => {
          e.stopPropagation();
          onObjectClick?.('fries-billboard');
        }}
      >
        {/* White Foam Board Backing */}
        <mesh position={[0, 0, -0.06]} castShadow>
          <boxGeometry args={[4.0, 7.0, 0.2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>
        {/* Poster Surface */}
        <mesh position={[0, 0, 0.06]} castShadow>
          <planeGeometry args={[3.8, 6.75]} />
          <meshStandardMaterial
            map={friesTex}
            roughness={0.65}
            metalness={0.02}
            emissive={isNight ? '#ea580c' : '#000000'}
            emissiveIntensity={isNight ? 0.35 : 0}
          />
        </mesh>
      </group>

      {/* 3. Main Black Storefront Header Fascia (Image 1) */}
      <group position={[1.5, 5.8, 0]}>
        {/* Main Header Box */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[21.0, 2.6, 0.4]} />
          <meshStandardMaterial
            map={headerTex}
            roughness={0.45}
            metalness={0.05}
          />
        </mesh>

        {/* McCafé Wood Panel Inset on Left with Red Arch 'M' (Matching Image 1!) */}
        <group position={[-7.5, 0, 0.24]}>
          <mesh position={[0, 0, -0.02]} castShadow>
            <boxGeometry args={[3.2, 2.2, 0.1]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.05]} castShadow>
            <planeGeometry args={[3.05, 2.05]} />
            <meshStandardMaterial
              map={mccafeTex}
              roughness={0.4}
              metalness={0.1}
              emissive={isNight ? '#ffc72c' : '#000000'}
              emissiveIntensity={isNight ? 0.4 : 0}
            />
          </mesh>
        </group>

        {/* 3D "MC DONALD'S" Modern White Lettering Highlight (Matching Image 1!) */}
        <group position={[3.2, 0, 0.25]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[11.5, 1.8, 0.05]} />
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.3}
              transparent
              opacity={0.01}
            />
          </mesh>
        </group>
      </group>

      {/* 4. White Horizontal Structural Mullion Bar between Header & Windows */}
      <mesh position={[1.5, 4.4, 0.12]} castShadow>
        <boxGeometry args={[21.0, 0.2, 0.25]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      {/* 5. Clear Glass Windows & Double Doors (Spacious Height 4.2) */}
      <group position={[1.5, 2.2, 0]}>
        {/* Left Display Window */}
        <group position={[-6.2, 0, 0]}>
          <mesh>
            <planeGeometry args={[7.2, 4.2]} />
            <meshPhysicalMaterial
              color="#e0f2fe"
              transparent
              opacity={0.28}
              roughness={0.04}
              transmission={0.92}
              ior={1.48}
              thickness={0.18}
            />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[7.26, 4.26, 0.08]} />
            <meshStandardMaterial color="#18181b" wireframe />
          </mesh>
        </group>

        {/* Right Display Window */}
        <group position={[6.2, 0, 0]}>
          <mesh>
            <planeGeometry args={[7.2, 4.2]} />
            <meshPhysicalMaterial
              color="#e0f2fe"
              transparent
              opacity={0.28}
              roughness={0.04}
              transmission={0.92}
              ior={1.48}
              thickness={0.18}
            />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[7.26, 4.26, 0.08]} />
            <meshStandardMaterial color="#18181b" wireframe />
          </mesh>
        </group>

        {/* Center Double Glass Entrance Doors - SLID OPEN FOR EASY WALK-IN ACCESS */}
        <group position={[0, 0, 0]}>
          {/* White Layered Paper Doorstep Threshold (Matching Physical Model Image 0) */}
          <group position={[0, -2.16, 0.12]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[3.4, 0.08, 0.35]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.45} />
            </mesh>
            <mesh position={[0, -0.02, 0.05]} receiveShadow>
              <boxGeometry args={[3.5, 0.04, 0.40]} />
              <meshStandardMaterial color="#e2e8f0" roughness={0.55} />
            </mesh>
          </group>

          {/* Left Glass Door Panel (Slid open to the left side) */}
          <group position={[-2.0, 0, 0.06]}>
            <mesh>
              <planeGeometry args={[1.7, 4.2]} />
              <meshPhysicalMaterial
                color="#f8fafc"
                transparent
                opacity={0.3}
                roughness={0.04}
                transmission={0.94}
                ior={1.48}
              />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.75, 4.25, 0.06]} />
              <meshStandardMaterial color="#18181b" roughness={0.4} wireframe />
            </mesh>
            {/* Door Pull Handle */}
            <mesh position={[0.7, -0.15, 0.05]} castShadow>
              <cylinderGeometry args={[0.024, 0.024, 1.2, 8]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
            </mesh>
          </group>

          {/* Right Glass Door Panel (Slid open to the right side) */}
          <group position={[2.0, 0, 0.06]}>
            <mesh>
              <planeGeometry args={[1.7, 4.2]} />
              <meshPhysicalMaterial
                color="#f8fafc"
                transparent
                opacity={0.3}
                roughness={0.04}
                transmission={0.94}
                ior={1.48}
              />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.75, 4.25, 0.06]} />
              <meshStandardMaterial color="#18181b" roughness={0.4} wireframe />
            </mesh>
            {/* Door Pull Handle */}
            <mesh position={[-0.7, -0.15, 0.05]} castShadow>
              <cylinderGeometry args={[0.024, 0.024, 1.2, 8]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
            </mesh>
          </group>

          {/* Overhead Automatic Door Header Bar & Motion Sensor */}
          <mesh position={[0, 2.15, 0.08]} castShadow>
            <boxGeometry args={[4.8, 0.2, 0.18]} />
            <meshStandardMaterial color="#27272a" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Motion Sensor Indicator LED */}
          <mesh position={[0, 2.05, 0.18]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={1.5} />
          </mesh>
        </group>
      </group>

      {/* 6. THE GRAND WALK-THROUGH GOLDEN ARCHES 'M' PORTAL (ACCURATE CAD & 3D RENDER RECONSTRUCTION) */}
      <group position={[1.5, 0, 0.2]}>
        {/* Single continuous extruded McDonald's Golden Arches 'M' with smooth curves and beveling */}
        <mesh geometry={goldenArchesGeo} castShadow receiveShadow>
          <meshStandardMaterial
            color="#ffc72c"
            roughness={0.22}
            metalness={0.08}
            emissive={isNight ? '#f59e0b' : '#000000'}
            emissiveIntensity={isNight ? 1.4 : 0}
          />
        </mesh>

        {/* Golden Arches Warm Radiance Downlight */}
        <pointLight
          position={[0, 3.6, 0.45]}
          intensity={isNight ? 5.5 : 1.2}
          distance={15}
          color="#fbbf24"
        />
      </group>

      {/* 7. Window Base Flower Planter Beds with Grass & Polka-Dot Mushrooms (Image 1) */}
      <group position={[1.5, 0.22, 0.35]}>
        {/* Left Planter Box with Lush Green Lawn */}
        <mesh position={[-6.2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.0, 0.35, 0.45]} />
          <meshStandardMaterial color="#ffffff" roughness={0.6} />
        </mesh>
        <mesh position={[-6.2, 0.18, 0]} receiveShadow>
          <boxGeometry args={[6.8, 0.05, 0.4]} />
          <meshStandardMaterial color="#22c55e" roughness={0.9} />
        </mesh>
        {/* Left Clay Mushrooms with White Polka Dots */}
        {[-9.0, -8.2, -7.4, -6.6, -5.8, -5.0, -4.2, -3.4].map((x, i) => (
          <group key={`flower-left-spacious-${i}`} position={[x, 0.22, (i % 2) * 0.1 - 0.05]}>
            <mesh position={[0, 0.09, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.06, 0.2, 8]} />
              <meshStandardMaterial color="#fef3c7" roughness={0.7} />
            </mesh>
            <group position={[0, 0.22, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.15, 14, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial
                  color={i % 2 === 0 ? '#f43f5e' : '#fb7185'}
                  roughness={0.6}
                />
              </mesh>
              {/* White Polka Dots */}
              {[-0.07, 0.06, 0].map((dx, dotIdx) => (
                <mesh key={`dot-l-${dotIdx}`} position={[dx, 0.09, 0.07]}>
                  <sphereGeometry args={[0.03, 6, 6]} />
                  <meshStandardMaterial color="#ffffff" roughness={0.5} />
                </mesh>
              ))}
            </group>
          </group>
        ))}

        {/* Right Planter Box with Lush Green Lawn */}
        <mesh position={[6.2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.0, 0.35, 0.45]} />
          <meshStandardMaterial color="#ffffff" roughness={0.6} />
        </mesh>
        <mesh position={[6.2, 0.18, 0]} receiveShadow>
          <boxGeometry args={[6.8, 0.05, 0.4]} />
          <meshStandardMaterial color="#22c55e" roughness={0.9} />
        </mesh>
        {[3.4, 4.2, 5.0, 5.8, 6.6, 7.4, 8.2, 9.0].map((x, i) => (
          <group key={`flower-right-spacious-${i}`} position={[x, 0.22, (i % 2) * 0.1 - 0.05]}>
            <mesh position={[0, 0.09, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.06, 0.2, 8]} />
              <meshStandardMaterial color="#fef3c7" roughness={0.7} />
            </mesh>
            <group position={[0, 0.22, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.15, 14, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial
                  color={i % 2 === 0 ? '#fb7185' : '#f43f5e'}
                  roughness={0.6}
                />
              </mesh>
              {[-0.06, 0.07, 0].map((dx, dotIdx) => (
                <mesh key={`dot-r-${dotIdx}`} position={[dx, 0.09, 0.07]}>
                  <sphereGeometry args={[0.03, 6, 6]} />
                  <meshStandardMaterial color="#ffffff" roughness={0.5} />
                </mesh>
              ))}
            </group>
          </group>
        ))}
      </group>

      {/* 8. MINIATURE TOY SPORTS CARS (HOT WHEELS) ON THE SIDEWALK (Directly from Image 1!) */}
      {/* Left Pair of Cars: Silver Racer & Red Sports Car */}
      <group position={[-6.2, 0.12, 1.8]}>
        {/* Silver Sports Coupe */}
        <group position={[-0.9, 0, 0]} rotation={[0, 0.15, 0]}>
          {/* Chassis */}
          <mesh position={[0, 0.08, 0]} castShadow>
            <boxGeometry args={[0.7, 0.16, 1.2]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Cabin Roof */}
          <mesh position={[0, 0.22, -0.05]} castShadow>
            <boxGeometry args={[0.55, 0.14, 0.65]} />
            <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.3} />
          </mesh>
          {/* Wheels */}
          {[-0.38, 0.38].map((wx, i) =>
            [-0.38, 0.38].map((wz, j) => (
              <mesh key={`silver-wheel-${i}-${j}`} position={[wx, 0.06, wz]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.08, 0.08, 0.08, 12]} />
                <meshStandardMaterial color="#0f172a" roughness={0.8} />
              </mesh>
            ))
          )}
          {/* Glowing Headlights at Night */}
          {[-0.22, 0.22].map((hx, hIdx) => (
            <mesh key={`silver-hl-${hIdx}`} position={[hx, 0.08, 0.58]}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshStandardMaterial
                color="#fef08a"
                emissive={isNight ? '#fde047' : '#ffffff'}
                emissiveIntensity={isNight ? 3.5 : 0.4}
              />
            </mesh>
          ))}
        </group>

        {/* Red Race Car with White Racing Circle */}
        <group position={[0.7, 0, 0.1]} rotation={[0, -0.1, 0]}>
          <mesh position={[0, 0.08, 0]} castShadow>
            <boxGeometry args={[0.7, 0.16, 1.25]} />
            <meshStandardMaterial color="#dc2626" metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.22, -0.05]} castShadow>
            <boxGeometry args={[0.55, 0.14, 0.68]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} />
          </mesh>
          {/* Racing number spot */}
          <mesh position={[0, 0.17, 0.3]}>
            <circleGeometry args={[0.1, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Wheels */}
          {[-0.38, 0.38].map((wx, i) =>
            [-0.38, 0.38].map((wz, j) => (
              <mesh key={`red-wheel-${i}-${j}`} position={[wx, 0.06, wz]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.08, 0.08, 0.08, 12]} />
                <meshStandardMaterial color="#0f172a" roughness={0.8} />
              </mesh>
            ))
          )}
          {/* Glowing Headlights at Night */}
          {[-0.22, 0.22].map((hx, hIdx) => (
            <mesh key={`red-hl-${hIdx}`} position={[hx, 0.08, 0.6]}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshStandardMaterial
                color="#fef08a"
                emissive={isNight ? '#fde047' : '#ffffff'}
                emissiveIntensity={isNight ? 3.5 : 0.4}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* Right Pair of Cars: Orange Sports Coupe & Red GT Racer */}
      <group position={[7.8, 0.12, 1.8]}>
        {/* Orange Sports Car */}
        <group position={[-0.8, 0, 0.05]} rotation={[0, 0.12, 0]}>
          <mesh position={[0, 0.08, 0]} castShadow>
            <boxGeometry args={[0.7, 0.16, 1.25]} />
            <meshStandardMaterial color="#ea580c" metalness={0.5} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.22, -0.05]} castShadow>
            <boxGeometry args={[0.55, 0.14, 0.65]} />
            <meshStandardMaterial color="#18181b" roughness={0.3} />
          </mesh>
          {/* Wheels */}
          {[-0.38, 0.38].map((wx, i) =>
            [-0.38, 0.38].map((wz, j) => (
              <mesh key={`orange-wheel-${i}-${j}`} position={[wx, 0.06, wz]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.08, 0.08, 0.08, 12]} />
                <meshStandardMaterial color="#0f172a" roughness={0.8} />
              </mesh>
            ))
          )}
          {/* Glowing Headlights at Night */}
          {[-0.22, 0.22].map((hx, hIdx) => (
            <mesh key={`orange-hl-${hIdx}`} position={[hx, 0.08, 0.6]}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshStandardMaterial
                color="#fef08a"
                emissive={isNight ? '#fde047' : '#ffffff'}
                emissiveIntensity={isNight ? 3.5 : 0.4}
              />
            </mesh>
          ))}
        </group>

        {/* Red GT Car */}
        <group position={[0.8, 0, -0.05]} rotation={[0, -0.15, 0]}>
          <mesh position={[0, 0.08, 0]} castShadow>
            <boxGeometry args={[0.7, 0.16, 1.25]} />
            <meshStandardMaterial color="#b91c1c" metalness={0.5} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.22, -0.05]} castShadow>
            <boxGeometry args={[0.55, 0.14, 0.65]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} />
          </mesh>
          {/* Wheels */}
          {[-0.38, 0.38].map((wx, i) =>
            [-0.38, 0.38].map((wz, j) => (
              <mesh key={`redgt-wheel-${i}-${j}`} position={[wx, 0.06, wz]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.08, 0.08, 0.08, 12]} />
                <meshStandardMaterial color="#0f172a" roughness={0.8} />
              </mesh>
            ))
          )}
          {/* Glowing Headlights at Night */}
          {[-0.22, 0.22].map((hx, hIdx) => (
            <mesh key={`redgt-hl-${hIdx}`} position={[hx, 0.08, 0.6]}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshStandardMaterial
                color="#fef08a"
                emissive={isNight ? '#fde047' : '#ffffff'}
                emissiveIntensity={isNight ? 3.5 : 0.4}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* 9. Miniature Trees on Sidewalk (Matching Image 1!) */}
      {/* Left Tree: Sculpted Clay Trunk + Lush Foliage */}
      <group position={[-9.8, 0, 2.8]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.75, 0.6, 12]} />
          <meshStandardMaterial color="#92400e" roughness={0.85} />
        </mesh>
        <mesh position={[0, 1.6, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.35, 2.2, 10]} />
          <meshStandardMaterial color="#b45309" roughness={0.8} />
        </mesh>
        {/* Clustered Foliage Puffs */}
        <group position={[0, 2.9, 0]}>
          <mesh position={[0, 0.5, 0.05]} castShadow>
            <sphereGeometry args={[0.75, 16, 16]} />
            <meshStandardMaterial color="#22c55e" roughness={0.9} />
          </mesh>
          <mesh position={[-0.45, 0.06, 0]} castShadow>
            <sphereGeometry args={[0.65, 16, 16]} />
            <meshStandardMaterial color="#16a34a" roughness={0.9} />
          </mesh>
          <mesh position={[0.45, 0.1, 0]} castShadow>
            <sphereGeometry args={[0.68, 16, 16]} />
            <meshStandardMaterial color="#22c55e" roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.25, 0.42]} castShadow>
            <sphereGeometry args={[0.58, 16, 16]} />
            <meshStandardMaterial color="#4ade80" roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* Right Tree: Grey Clay Trunk + Lush Foliage */}
      <group position={[11.5, 0, 2.8]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.75, 0.6, 12]} />
          <meshStandardMaterial color="#475569" roughness={0.85} />
        </mesh>
        <mesh position={[0, 1.6, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.35, 2.2, 10]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} />
        </mesh>
        <group position={[0, 2.9, 0]}>
          <mesh position={[0, 0.5, -0.05]} castShadow>
            <sphereGeometry args={[0.75, 16, 16]} />
            <meshStandardMaterial color="#22c55e" roughness={0.9} />
          </mesh>
          <mesh position={[-0.42, 0.06, 0]} castShadow>
            <sphereGeometry args={[0.66, 16, 16]} />
            <meshStandardMaterial color="#16a34a" roughness={0.9} />
          </mesh>
          <mesh position={[0.42, -0.06, 0]} castShadow>
            <sphereGeometry args={[0.65, 16, 16]} />
            <meshStandardMaterial color="#22c55e" roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.22, 0.4]} castShadow>
            <sphereGeometry args={[0.55, 16, 16]} />
            <meshStandardMaterial color="#4ade80" roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* 10. Tall McDonald's Pylon / Tower Blade Sign on Right Corner (Image 1) */}
      <group position={[12.8, 5.2, 0.25]}>
        {/* Slender White Shaft */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.8, 10.4, 0.8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        {/* Red Box on Top */}
        <mesh position={[0, 5.3, 0]} castShadow>
          <boxGeometry args={[1.05, 1.4, 1.05]} />
          <meshStandardMaterial
            color="#da291c"
            roughness={0.3}
            emissive={isNight ? '#da291c' : '#000000'}
            emissiveIntensity={isNight ? 0.35 : 0}
          />
        </mesh>
        {/* Golden Arches 'M' on Pylon */}
        <group position={[0, 5.3, 0.55]}>
          <mesh>
            <torusGeometry args={[0.26, 0.065, 16, 16, Math.PI]} />
            <meshStandardMaterial
              color="#ffc72c"
              roughness={0.2}
              emissive={isNight ? '#ffc72c' : '#000000'}
              emissiveIntensity={isNight ? 0.9 : 0}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
};
