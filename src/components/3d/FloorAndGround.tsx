import { useMemo } from 'react';
import * as THREE from 'three';
import { getFloorTileTexture } from '../../textures/textureGenerators';

interface FloorAndGroundProps {
  isNight?: boolean;
}

export const FloorAndGround: React.FC<FloorAndGroundProps> = ({ isNight = false }) => {
  const floorTileTex = useMemo(() => {
    const tex = getFloorTileTexture();
    const cloned = tex.clone();
    cloned.wrapS = THREE.RepeatWrapping;
    cloned.wrapT = THREE.RepeatWrapping;
    cloned.repeat.set(12, 10);
    cloned.needsUpdate = true;
    return cloned;
  }, []);

  const sidewalkTex = useMemo(() => {
    const tex = getFloorTileTexture();
    const cloned = tex.clone();
    cloned.wrapS = THREE.RepeatWrapping;
    cloned.wrapT = THREE.RepeatWrapping;
    cloned.repeat.set(12, 3);
    cloned.needsUpdate = true;
    return cloned;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Master Diorama Display Pedestal (Extended Architectural Plinth Table 58x44) */}
      <mesh position={[0, -0.7, 8.0]} receiveShadow>
        <boxGeometry args={[58.0, 1.2, 44.0]} />
        <meshStandardMaterial
          color="#d1c7b7" // Warm showcase architectural base
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* Decorative Beveled Hardwood Plinth Rim */}
      <mesh position={[0, -0.16, 8.0]} receiveShadow>
        <boxGeometry args={[58.5, 0.16, 44.5]} />
        <meshStandardMaterial
          color="#8b5a2b" // Teak hardwood edge
          roughness={0.45}
          metalness={0.1}
        />
      </mesh>

      {/* Corrugated Kraft Cardboard Flute Layer (Below ground level Y <= -0.04) */}
      <mesh position={[0, -0.07, 8.0]} receiveShadow>
        <boxGeometry args={[57.8, 0.06, 43.8]} />
        <meshStandardMaterial
          color="#c8a882" // Natural corrugated kraft cardboard
          roughness={0.85}
        />
      </mesh>

      {/* Neighborhood Surrounding Ground Plinth Mat */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.03, 8.0]}
        receiveShadow
      >
        <planeGeometry args={[57.6, 43.6]} />
        <meshStandardMaterial
          color="#94a3b8" // Architectural base ground
          roughness={0.8}
        />
      </mesh>

      {/* 2. Spacious Interior Main White Grid Tile Floor (Width 27.0, Depth 19.0) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, -1.5]}
        receiveShadow
      >
        <planeGeometry args={[27.0, 19.0]} />
        <meshStandardMaterial
          map={floorTileTex}
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>

      {/* 3. Exterior Sidewalk Pavement with Grid Lines (Width 27.0, Depth 5.5) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 10.75]}
        receiveShadow
      >
        <planeGeometry args={[27.0, 5.5]} />
        <meshStandardMaterial
          map={sidewalkTex}
          roughness={0.45}
          metalness={0.02}
        />
      </mesh>

      {/* Curb Divider between sidewalk and street with Pedestrian Ramp Opening at X = 1.5 */}
      {/* Left Curb Section */}
      <mesh position={[-6.2, 0.04, 13.5]} receiveShadow>
        <boxGeometry args={[14.4, 0.1, 0.2]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
      </mesh>
      {/* Right Curb Section */}
      <mesh position={[8.4, 0.04, 13.5]} receiveShadow>
        <boxGeometry args={[12.0, 0.1, 0.2]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
      </mesh>
      {/* Gentle Ramp Transition at Crosswalk (X = 1.5) */}
      <mesh position={[1.5, 0.02, 13.5]} receiveShadow>
        <boxGeometry args={[2.4, 0.04, 0.2]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.5} />
      </mesh>

      {/* Base divider between storefront and sidewalk */}
      <mesh position={[0, 0.04, 8.0]} receiveShadow>
        <boxGeometry args={[27.2, 0.08, 0.15]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.4} />
      </mesh>

      {/* 4. Miniature Cast-Iron Sidewalk Streetlamps (Warm Night Illumination!) */}
      {[-11.5, 11.5].map((lx, idx) => (
        <group key={`streetlamp-${idx}`} position={[lx, 0, 11.8]}>
          {/* Cast Iron Base */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.26, 0.4, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Tapered Pole */}
          <mesh position={[0, 1.8, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.075, 3.2, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Ornate Bracket Collar */}
          <mesh position={[0, 3.4, 0]}>
            <cylinderGeometry args={[0.14, 0.06, 0.1, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Glass Lantern Housing */}
          <mesh position={[0, 3.65, 0]}>
            <cylinderGeometry args={[0.22, 0.14, 0.42, 6]} />
            <meshPhysicalMaterial
              color="#fef08a"
              transparent
              opacity={0.35}
              roughness={0.1}
              transmission={0.9}
            />
          </mesh>
          {/* Lantern Cap Roof */}
          <mesh position={[0, 3.9, 0]} castShadow>
            <coneGeometry args={[0.26, 0.16, 6]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Glowing Filament Bulb inside Lantern */}
          <mesh position={[0, 3.62, 0]}>
            <sphereGeometry args={[0.075, 8, 8]} />
            <meshStandardMaterial
              color="#fde047"
              emissive={isNight ? '#fbbf24' : '#fef08a'}
              emissiveIntensity={isNight ? 3.5 : 0.8}
            />
          </mesh>
          {/* Sidewalk Warm Point Light */}
          <pointLight
            position={[0, 3.5, 0]}
            intensity={isNight ? 3.2 : 0.6}
            distance={9.0}
            color="#fbbf24"
          />
        </group>
      ))}
    </group>
  );
};
