import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { soundManager } from '../../audio/soundManager';

interface AquariumProps {
  onObjectClick?: (objectId: string) => void;
  isNight?: boolean;
}

export const Aquarium: React.FC<AquariumProps> = ({ onObjectClick, isNight = false }) => {
  const bubblesRef = useRef<THREE.Points>(null);
  const fishRef1 = useRef<THREE.Group>(null);
  const fishRef2 = useRef<THREE.Group>(null);
  const seaweedRef1 = useRef<THREE.Group>(null);
  const seaweedRef2 = useRef<THREE.Group>(null);

  // Bubble particles
  const [bubblePositions, bubbleSpeeds] = useMemo(() => {
    const count = 75;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 5.8;
      positions[i * 3 + 1] = Math.random() * 3.4 + 0.3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.8;
      speeds[i] = Math.random() * 0.9 + 0.4;
    }
    return [positions, speeds];
  }, []);

  useFrame((state, delta) => {
    // 1. Bubbles rising
    if (bubblesRef.current) {
      const pos = bubblesRef.current.geometry.attributes.position;
      for (let i = 0; i < bubbleSpeeds.length; i++) {
        let y = pos.getY(i) + bubbleSpeeds[i] * delta;
        if (y > 3.6) {
          y = 0.3;
        }
        pos.setY(i, y);
      }
      pos.needsUpdate = true;
    }

    // 2. Animated swimming fish (Clownfish & Blue Tang)
    if (fishRef1.current) {
      const t = state.clock.getElapsedTime() * 0.85;
      fishRef1.current.position.x = Math.sin(t) * 2.0;
      fishRef1.current.position.z = Math.cos(t) * 1.6;
      fishRef1.current.position.y = 2.0 + Math.sin(t * 2) * 0.25;
      fishRef1.current.rotation.y = -t - Math.PI / 2;
    }

    if (fishRef2.current) {
      const t = state.clock.getElapsedTime() * 0.7 + 2.5;
      fishRef2.current.position.x = Math.cos(t) * 1.8;
      fishRef2.current.position.z = Math.sin(t) * 1.5;
      fishRef2.current.position.y = 1.6 + Math.sin(t * 2.2) * 0.2;
      fishRef2.current.rotation.y = t;
    }

    // 3. Seaweed swaying
    const sway = Math.sin(state.clock.getElapsedTime() * 1.8) * 0.08;
    if (seaweedRef1.current) seaweedRef1.current.rotation.z = sway;
    if (seaweedRef2.current) seaweedRef2.current.rotation.x = sway * 0.7;
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    soundManager.playBubble();
    onObjectClick?.('aquarium-tank');
  };

  return (
    <group position={[-1.2, 0, 0.4]} onClick={handleClick}>
      {/* 1. Sleek Textured Grey Stone Tile Plinth Base (Matching Image 2!) */}
      <mesh position={[0, 0.35, 0]} receiveShadow castShadow>
        <boxGeometry args={[6.5, 0.7, 5.5]} />
        <meshStandardMaterial
          color="#475569" // Slate grey stone tiles matching 3D render Image 2
          roughness={0.65}
          metalness={0.1}
        />
      </mesh>
      {/* Stone Tile Seam Lines */}
      {[-1.6, 0, 1.6].map((sx, idx) => (
        <mesh key={`stone-seam-${idx}`} position={[sx, 0.35, 2.76]}>
          <boxGeometry args={[0.04, 0.7, 0.02]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      ))}

      {/* Light Blue / Aquamarine Sand Bed inside Tank */}
      <mesh position={[0, 0.72, 0]} receiveShadow>
        <boxGeometry args={[6.35, 0.08, 5.35]} />
        <meshStandardMaterial
          color="#bae6fd" // Aquamarine sand bed
          roughness={0.6}
        />
      </mesh>

      {/* 2. Transparent Acrylic Glass Aquarium Tank (Width 6.4, Height 3.8, Depth 5.4) */}
      <group position={[0, 2.45, 0]}>
        {/* Front Glass */}
        <mesh position={[0, 0, 2.7]}>
          <planeGeometry args={[6.4, 3.5]} />
          <meshPhysicalMaterial
            color="#e0f2fe"
            transparent
            opacity={0.22}
            roughness={0.03}
            transmission={0.96}
            ior={1.48}
            thickness={0.2}
          />
        </mesh>
        {/* Back Glass */}
        <mesh position={[0, 0, -2.7]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[6.4, 3.5]} />
          <meshPhysicalMaterial
            color="#e0f2fe"
            transparent
            opacity={0.22}
            roughness={0.03}
            transmission={0.96}
            ior={1.48}
            thickness={0.2}
          />
        </mesh>
        {/* Left Glass */}
        <mesh position={[-3.2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[5.4, 3.5]} />
          <meshPhysicalMaterial
            color="#e0f2fe"
            transparent
            opacity={0.22}
            roughness={0.03}
            transmission={0.96}
            ior={1.48}
            thickness={0.2}
          />
        </mesh>
        {/* Right Glass */}
        <mesh position={[3.2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[5.4, 3.5]} />
          <meshPhysicalMaterial
            color="#e0f2fe"
            transparent
            opacity={0.22}
            roughness={0.03}
            transmission={0.96}
            ior={1.48}
            thickness={0.2}
          />
        </mesh>

        {/* Acrylic Corner Edge Seams */}
        {[-3.2, 3.2].map((cx, i) =>
          [-2.7, 2.7].map((cz, j) => (
            <mesh key={`acrylic-seam-${i}-${j}`} position={[cx, 0, cz]}>
              <cylinderGeometry args={[0.02, 0.02, 3.5, 6]} />
              <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.4}
                roughness={0.2}
              />
            </mesh>
          ))
        )}
      </group>

      {/* 3. Water Volume & Water Surface Plane */}
      <mesh position={[0, 4.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.35, 5.35]} />
        <meshPhysicalMaterial
          color={isNight ? '#0284c7' : '#38bdf8'}
          transparent
          opacity={isNight ? 0.6 : 0.45}
          roughness={0.08}
          transmission={0.82}
          emissive={isNight ? '#0284c7' : '#000000'}
          emissiveIntensity={isNight ? 0.35 : 0}
        />
      </mesh>

      {/* 4. Rising Bubble Particles */}
      <points ref={bubblesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[bubblePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#ffffff"
          transparent
          opacity={0.85}
        />
      </points>

      {/* 5. Swimming Animated Fish 1: Orange Clownfish (Nemo) */}
      <group ref={fishRef1} position={[0, 2.2, 0]}>
        <mesh scale={[0.32, 0.18, 0.1]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#ea580c" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0]} scale={[0.1, 0.19, 0.11]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        <mesh position={[-0.16, 0, 0]} scale={[0.08, 0.16, 0.09]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        <mesh position={[-0.32, 0, 0]} rotation={[0, 0, 0.2]}>
          <coneGeometry args={[0.12, 0.2, 3]} />
          <meshStandardMaterial color="#ea580c" roughness={0.4} />
        </mesh>
      </group>

      {/* Swimming Animated Fish 2: Blue Tang (Dory - Image 3) */}
      <group ref={fishRef2} position={[0, 1.8, 0]}>
        <mesh scale={[0.3, 0.2, 0.08]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#2563eb" roughness={0.4} />
        </mesh>
        <mesh position={[-0.24, 0, 0]} rotation={[0, 0, 0.2]}>
          <coneGeometry args={[0.12, 0.2, 3]} />
          <meshStandardMaterial color="#facc15" roughness={0.4} />
        </mesh>
      </group>

      {/* 6. Sculpted Clay Sea Creatures & Coral Formations (Matching Image 2 & 3!) */}
      {/* Vibrant Cyan & Blue Branching Corals in the Center (Featured in Image 2!) */}
      <group position={[0, 0.75, 0]}>
        {/* Center Blue Coral Bush */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <coneGeometry args={[0.65, 1.2, 8]} />
          <meshStandardMaterial color="#0284c7" roughness={0.7} />
        </mesh>
        <mesh position={[-0.35, 0.45, 0.25]} castShadow>
          <sphereGeometry args={[0.38, 12, 12]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.7} />
        </mesh>
        <mesh position={[0.4, 0.4, -0.2]} castShadow>
          <sphereGeometry args={[0.35, 12, 12]} />
          <meshStandardMaterial color="#06b6d4" roughness={0.7} />
        </mesh>
      </group>

      {/* Tall Green Kelp/Seaweed Cluster on Back-Right with Perched Nemo (Image 2 & 3) */}
      <group ref={seaweedRef1} position={[1.8, 0.75, -1.3]}>
        {[-0.3, 0, 0.35].map((offX, i) => (
          <group key={`kelp-stem-spacious-${i}`} position={[offX, 0, 0]}>
            <mesh position={[0, 0.9 + i * 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.09, 1.8 + i * 0.5, 8]} />
              <meshStandardMaterial color="#22c55e" roughness={0.8} />
            </mesh>
            <mesh position={[0.08, 1.8 + i * 0.4, 0]} rotation={[0, 0, 0.35]}>
              <coneGeometry args={[0.13, 0.55, 5]} />
              <meshStandardMaterial color="#16a34a" roughness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Pink Clay Octopus on Grey Rocks in Lower-Left Corner (Image 2) */}
      <group position={[-1.8, 0.8, 1.4]} castShadow>
        {/* Grey Rock Base */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <dodecahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial color="#64748b" roughness={0.85} />
        </mesh>
        {/* Octopus Round Head */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <sphereGeometry args={[0.34, 16, 16]} />
          <meshStandardMaterial color="#f472b6" roughness={0.6} />
        </mesh>
        {/* White Eyes & Pupils */}
        <mesh position={[0.13, 0.6, 0.28]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.13, 0.6, 0.32]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        <mesh position={[-0.13, 0.6, 0.28]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.13, 0.6, 0.32]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        {/* 8 Curled Tentacles Spreading Over Rocks */}
        {[0, 0.78, 1.57, 2.35, 3.14, 3.92, 4.71, 5.49].map((angle, idx) => (
          <mesh
            key={`octopus-tentacle-spacious-${idx}`}
            position={[Math.cos(angle) * 0.36, 0.3, Math.sin(angle) * 0.36]}
            rotation={[0.35, angle, 0.45]}
          >
            <cylinderGeometry args={[0.045, 0.085, 0.48, 8]} />
            <meshStandardMaterial color="#f472b6" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* Colorful Starfish on the Sand (Seen in Image 3!) */}
      <group position={[1.4, 0.77, 1.6]} rotation={[-Math.PI / 2, 0, 0.3]}>
        {/* 5-arm Starfish */}
        {[0, 1.25, 2.51, 3.77, 5.02].map((angle, i) => (
          <mesh key={`star-arm-${i}`} position={[Math.cos(angle) * 0.15, Math.sin(angle) * 0.15, 0]} rotation={[0, 0, angle]}>
            <coneGeometry args={[0.08, 0.3, 4]} />
            <meshStandardMaterial color="#e11d48" roughness={0.7} />
          </mesh>
        ))}
        <mesh position={[0, 0, 0.03]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#f43f5e" roughness={0.7} />
        </mesh>
      </group>

      {/* Bright Green Sea Anemone & Lavender Tube Corals (Image 2 & 3) */}
      <group position={[1.6, 0.8, 0.8]}>
        <mesh castShadow>
          <dodecahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#86efac" roughness={0.85} />
        </mesh>
      </group>

      <group ref={seaweedRef2} position={[-0.3, 0.75, -1.2]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <coneGeometry args={[0.38, 1.0, 8]} />
          <meshStandardMaterial color="#c084fc" roughness={0.8} />
        </mesh>
        <mesh position={[0.32, 0.32, 0.2]} castShadow>
          <sphereGeometry args={[0.25, 10, 10]} />
          <meshStandardMaterial color="#818cf8" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
};
