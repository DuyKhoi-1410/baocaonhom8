import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

interface CelestialSkyProps {
  isNight?: boolean;
}

interface CloudClusterData {
  x: number;
  y: number;
  z: number;
  speed: number;
  scale: number;
  puffs: { offset: [number, number, number]; radius: number }[];
}

export const CelestialSky: React.FC<CelestialSkyProps> = ({ isNight = false }) => {
  // -------------------------------------------------------------
  // 1. CLOUDS SIMULATION STATE & ANIMATION REFS
  // -------------------------------------------------------------
  const cloudGroupRefs = useRef<(THREE.Group | null)[]>([]);

  // 8 Stylized Puffy Cumulus Cloud Clusters with varied altitudes and speeds
  const cloudsData = useMemo<CloudClusterData[]>(() => {
    return [
      {
        x: -42,
        y: 28,
        z: -18,
        speed: 1.6,
        scale: 1.4,
        puffs: [
          { offset: [0, 0, 0], radius: 2.2 },
          { offset: [1.8, -0.3, 0.2], radius: 1.7 },
          { offset: [-1.8, -0.4, -0.2], radius: 1.6 },
          { offset: [0.9, 0.6, 0.1], radius: 1.5 },
          { offset: [-0.8, 0.5, 0.1], radius: 1.4 },
        ],
      },
      {
        x: -18,
        y: 33,
        z: 8,
        speed: 2.2,
        scale: 1.1,
        puffs: [
          { offset: [0, 0, 0], radius: 1.9 },
          { offset: [1.4, -0.2, 0.1], radius: 1.4 },
          { offset: [-1.5, -0.3, -0.1], radius: 1.3 },
          { offset: [0.5, 0.5, 0], radius: 1.2 },
        ],
      },
      {
        x: 6,
        y: 26,
        z: 28,
        speed: 1.8,
        scale: 1.3,
        puffs: [
          { offset: [0, 0, 0], radius: 2.4 },
          { offset: [2.0, -0.4, 0.3], radius: 1.8 },
          { offset: [-2.0, -0.3, -0.2], radius: 1.7 },
          { offset: [1.0, 0.7, 0], radius: 1.6 },
          { offset: [-0.9, 0.6, 0.2], radius: 1.5 },
          { offset: [0, -0.6, 0], radius: 1.3 },
        ],
      },
      {
        x: 32,
        y: 31,
        z: -25,
        speed: 1.4,
        scale: 1.5,
        puffs: [
          { offset: [0, 0, 0], radius: 2.5 },
          { offset: [2.2, -0.4, 0.2], radius: 1.9 },
          { offset: [-2.1, -0.3, -0.3], radius: 1.8 },
          { offset: [0.8, 0.8, 0.1], radius: 1.6 },
          { offset: [-1.0, 0.7, -0.1], radius: 1.5 },
        ],
      },
      {
        x: -32,
        y: 25,
        z: 16,
        speed: 2.0,
        scale: 1.2,
        puffs: [
          { offset: [0, 0, 0], radius: 2.0 },
          { offset: [1.6, -0.3, 0.2], radius: 1.5 },
          { offset: [-1.5, -0.2, -0.1], radius: 1.4 },
          { offset: [0.6, 0.6, 0], radius: 1.3 },
        ],
      },
      {
        x: 18,
        y: 35,
        z: -8,
        speed: 1.5,
        scale: 1.25,
        puffs: [
          { offset: [0, 0, 0], radius: 2.1 },
          { offset: [1.7, -0.3, 0.2], radius: 1.6 },
          { offset: [-1.6, -0.2, -0.2], radius: 1.5 },
          { offset: [0.7, 0.5, 0], radius: 1.3 },
        ],
      },
      {
        x: -8,
        y: 30,
        z: 35,
        speed: 1.9,
        scale: 1.35,
        puffs: [
          { offset: [0, 0, 0], radius: 2.3 },
          { offset: [1.9, -0.4, 0.1], radius: 1.7 },
          { offset: [-1.8, -0.3, -0.2], radius: 1.6 },
          { offset: [0.8, 0.7, 0.1], radius: 1.5 },
        ],
      },
      {
        x: 44,
        y: 27,
        z: 12,
        speed: 1.7,
        scale: 1.15,
        puffs: [
          { offset: [0, 0, 0], radius: 1.8 },
          { offset: [1.5, -0.2, 0.2], radius: 1.4 },
          { offset: [-1.4, -0.3, -0.1], radius: 1.3 },
          { offset: [0.5, 0.5, 0], radius: 1.2 },
        ],
      },
    ];
  }, []);

  const cloudsPos = useRef(cloudsData.map((c) => ({ x: c.x, y: c.y, z: c.z, speed: c.speed })));

  // Sun and Moon pulsating halo refs
  const sunHaloRef = useRef<THREE.Mesh>(null);
  const moonHaloRef = useRef<THREE.Mesh>(null);
  const timeAcc = useRef(0);

  // -------------------------------------------------------------
  // 2. FRAME ANIMATION: DRIFTING CLOUDS & CELESTIAL GLOW PULSE
  // -------------------------------------------------------------
  useFrame((_, delta) => {
    const clampedDelta = Math.min(delta, 0.08);
    timeAcc.current += clampedDelta;

    // A. Drift clouds continuously across the sky (+X direction)
    cloudsPos.current.forEach((c, idx) => {
      c.x += c.speed * clampedDelta;
      // Seamless wrap-around when passing the horizon
      if (c.x > 58) {
        c.x = -58;
      }
      const ref = cloudGroupRefs.current[idx];
      if (ref) {
        ref.position.set(c.x, c.y, c.z);
      }
    });

    // B. Celestial glow pulsation
    const pulse = 1.0 + Math.sin(timeAcc.current * 1.5) * 0.08;
    if (sunHaloRef.current) {
      sunHaloRef.current.scale.set(pulse, pulse, pulse);
    }
    if (moonHaloRef.current) {
      moonHaloRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* ========================================================= */}
      {/* A. CELESTIAL BODY: SUN (DAY) vs MOON & STARFIELD (NIGHT)  */}
      {/* ========================================================= */}
      {!isNight ? (
        // ---------------------------------------------------------
        // DAYTIME: RADIANT GLOWING SUN IN CHEERFUL BLUE SKY
        // ---------------------------------------------------------
        <group position={[28, 40, 22]}>
          {/* Core Radiant Sun Sphere */}
          <mesh castShadow={false}>
            <sphereGeometry args={[3.2, 32, 32]} />
            <meshBasicMaterial color="#fffef0" />
          </mesh>

          {/* Inner Golden Corona Glow */}
          <mesh castShadow={false}>
            <sphereGeometry args={[4.6, 24, 24]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.42} depthWrite={false} />
          </mesh>

          {/* Outer Radiant Flare Aura Ring (Pulsating) */}
          <mesh ref={sunHaloRef} rotation={[Math.PI / 4, -Math.PI / 6, 0]}>
            <ringGeometry args={[4.8, 8.2, 32]} />
            <meshBasicMaterial
              color="#fde047"
              transparent
              opacity={0.28}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>

          {/* Sunbeams Light Source */}
          <pointLight intensity={3.5} distance={90} color="#fffbeb" />
        </group>
      ) : (
        // ---------------------------------------------------------
        // NIGHTTIME: LUMINOUS MOON & DENSE TWINKLING STARRY NIGHT SKY
        // ---------------------------------------------------------
        <>
          {/* Dense Sparkling Starfield (3,500 Twinkling Cosmic Stars!) */}
          <Stars
            radius={110}
            depth={55}
            count={3500}
            factor={4.8}
            saturation={0.85}
            fade
            speed={1.4}
          />

          {/* Magical Glowing Moon in Upper Sky */}
          <group position={[22, 38, 18]}>
            {/* Luminous Silver-Gold Moon Sphere */}
            <mesh castShadow={false}>
              <sphereGeometry args={[2.8, 32, 32]} />
              <meshStandardMaterial
                color="#fef9c3"
                emissive="#fef08a"
                emissiveIntensity={1.8}
                roughness={0.4}
              />
            </mesh>

            {/* Subtle Moon Maria / Crater Patches for authentic look */}
            <mesh position={[-0.6, 0.4, 2.5]} rotation={[0, 0, 0.3]}>
              <circleGeometry args={[0.65, 12]} />
              <meshBasicMaterial color="#d4d4d8" transparent opacity={0.35} />
            </mesh>
            <mesh position={[0.7, -0.5, 2.4]} rotation={[0, 0, -0.4]}>
              <circleGeometry args={[0.5, 12]} />
              <meshBasicMaterial color="#d4d4d8" transparent opacity={0.3} />
            </mesh>

            {/* Soft Lunar Halo Ring (Vầng trăng tỏa sáng bạc) */}
            <mesh ref={moonHaloRef} rotation={[Math.PI / 4, -Math.PI / 6, 0]}>
              <ringGeometry args={[3.2, 6.2, 32]} />
              <meshBasicMaterial
                color="#93c5fd"
                transparent
                opacity={0.32}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>

            {/* Moonbeam Soft Downward Illumination */}
            <pointLight intensity={4.5} distance={80} color="#bae6fd" />
          </group>

          {/* Twinkling Diamond Constellation Stars */}
          {[
            [-35, 45, -20],
            [-15, 52, 10],
            [8, 48, -35],
            [35, 44, 5],
            [-25, 42, 30],
            [15, 50, 25],
          ].map(([sx, sy, sz], si) => (
            <mesh key={`sparkle-star-${si}`} position={[sx, sy, sz]}>
              <octahedronGeometry args={[0.25, 0]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          ))}
        </>
      )}

      {/* ========================================================= */}
      {/* B. DRIFTING FLUFFY CUMULUS CLOUDS (CONTINUOUS IN DAY & NIGHT) */}
      {/* ========================================================= */}
      {cloudsData.map((cloud, idx) => (
        <group
          key={`cloud-cluster-${idx}`}
          ref={(el) => {
            cloudGroupRefs.current[idx] = el;
          }}
          position={[cloud.x, cloud.y, cloud.z]}
          scale={[cloud.scale, cloud.scale, cloud.scale]}
        >
          {cloud.puffs.map((puff, pi) => (
            <mesh key={`puff-${pi}`} position={puff.offset} castShadow={false}>
              <sphereGeometry args={[puff.radius, 14, 14]} />
              <meshStandardMaterial
                color={isNight ? '#334155' : '#ffffff'}
                emissive={isNight ? '#1e293b' : '#fffbeb'}
                emissiveIntensity={isNight ? 0.35 : 0.15}
                roughness={0.9}
                transparent
                opacity={isNight ? 0.78 : 0.92}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};
