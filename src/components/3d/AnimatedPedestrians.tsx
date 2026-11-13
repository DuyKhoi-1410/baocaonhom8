import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface AnimatedPedestriansProps {
  isNight?: boolean;
}

interface PedestrianSimData {
  ref: THREE.Group | null;
  leftLeg: THREE.Group | null;
  rightLeg: THREE.Group | null;
  leftArm: THREE.Group | null;
  rightArm: THREE.Group | null;
  torso: THREE.Group | null;
  // Position & movement
  x: number;
  z: number;
  minX: number;
  maxX: number;
  minZ?: number;
  maxZ?: number;
  speed: number;
  direction: number; // 1 or -1
  isZAxis?: boolean;
  walkFreq: number;
  targetYaw: number;
  currentYaw: number;
}

export const AnimatedPedestrians: React.FC<AnimatedPedestriansProps> = () => {
  // Group Refs
  const p1Ref = useRef<THREE.Group>(null);
  const p1LeftLeg = useRef<THREE.Group>(null);
  const p1RightLeg = useRef<THREE.Group>(null);
  const p1LeftArm = useRef<THREE.Group>(null);
  const p1RightArm = useRef<THREE.Group>(null);
  const p1Torso = useRef<THREE.Group>(null);

  const p2Ref = useRef<THREE.Group>(null);
  const p2LeftLeg = useRef<THREE.Group>(null);
  const p2RightLeg = useRef<THREE.Group>(null);
  const p2LeftArm = useRef<THREE.Group>(null);
  const p2RightArm = useRef<THREE.Group>(null);
  const p2Torso = useRef<THREE.Group>(null);

  const p3Ref = useRef<THREE.Group>(null);
  const p3LeftLeg = useRef<THREE.Group>(null);
  const p3RightLeg = useRef<THREE.Group>(null);
  const p3LeftArm = useRef<THREE.Group>(null);
  const p3RightArm = useRef<THREE.Group>(null);
  const p3Torso = useRef<THREE.Group>(null);

  const p4Ref = useRef<THREE.Group>(null);
  const p4LeftLeg = useRef<THREE.Group>(null);
  const p4RightLeg = useRef<THREE.Group>(null);
  const p4LeftArm = useRef<THREE.Group>(null);
  const p4RightArm = useRef<THREE.Group>(null);
  const p4Torso = useRef<THREE.Group>(null);
  const dogTailRef = useRef<THREE.Mesh>(null);

  const p5Ref = useRef<THREE.Group>(null);
  const p5LeftLeg = useRef<THREE.Group>(null);
  const p5RightLeg = useRef<THREE.Group>(null);
  const p5LeftArm = useRef<THREE.Group>(null);
  const p5RightArm = useRef<THREE.Group>(null);
  const p5Torso = useRef<THREE.Group>(null);

  const p6Ref = useRef<THREE.Group>(null);
  const p6LeftLeg = useRef<THREE.Group>(null);
  const p6RightLeg = useRef<THREE.Group>(null);
  const p6LeftArm = useRef<THREE.Group>(null);
  const p6RightArm = useRef<THREE.Group>(null);
  const p6Torso = useRef<THREE.Group>(null);

  const p7Ref = useRef<THREE.Group>(null);
  const p7LeftLeg = useRef<THREE.Group>(null);
  const p7RightLeg = useRef<THREE.Group>(null);
  const p7LeftArm = useRef<THREE.Group>(null);
  const p7RightArm = useRef<THREE.Group>(null);
  const p7Torso = useRef<THREE.Group>(null);

  // Time accumulator for strides
  const strideTime = useRef(0);

  // Pedestrian configuration
  const peds = useRef<PedestrianSimData[]>([
    // P1: Minh on McDonald's Sidewalk (Z = 11.2, walking along X)
    {
      ref: null,
      leftLeg: null,
      rightLeg: null,
      leftArm: null,
      rightArm: null,
      torso: null,
      x: -4.0,
      z: 11.2,
      minX: -8.5,
      maxX: 7.5,
      speed: 1.35,
      direction: 1,
      walkFreq: 5.8,
      targetYaw: Math.PI / 2,
      currentYaw: Math.PI / 2,
    },
    // P2: Lan on McDonald's Sidewalk (Z = 12.3, walking along X opposite)
    {
      ref: null,
      leftLeg: null,
      rightLeg: null,
      leftArm: null,
      rightArm: null,
      torso: null,
      x: 5.5,
      z: 12.3,
      minX: -7.5,
      maxX: 8.0,
      speed: 1.2,
      direction: -1,
      walkFreq: 5.4,
      targetYaw: -Math.PI / 2,
      currentYaw: -Math.PI / 2,
    },
    // P3: Nam on Opposite Sidewalk (Z = 22.8, brisk walker)
    {
      ref: null,
      leftLeg: null,
      rightLeg: null,
      leftArm: null,
      rightArm: null,
      torso: null,
      x: -8.0,
      z: 22.8,
      minX: -16.0,
      maxX: 16.0,
      speed: 1.5,
      direction: 1,
      walkFreq: 6.2,
      targetYaw: Math.PI / 2,
      currentYaw: Math.PI / 2,
    },
    // P4: Mai with puppy on Opposite Sidewalk (Z = 23.6)
    {
      ref: null,
      leftLeg: null,
      rightLeg: null,
      leftArm: null,
      rightArm: null,
      torso: null,
      x: 9.0,
      z: 23.6,
      minX: -14.0,
      maxX: 14.0,
      speed: 1.15,
      direction: -1,
      walkFreq: 5.0,
      targetYaw: -Math.PI / 2,
      currentYaw: -Math.PI / 2,
    },
    // P5: Huy crossing zebra crosswalk (X = 1.5, walking along Z)
    {
      ref: null,
      leftLeg: null,
      rightLeg: null,
      leftArm: null,
      rightArm: null,
      torso: null,
      x: 1.5,
      z: 13.5,
      minX: 1.5,
      maxX: 1.5,
      minZ: 13.2,
      maxZ: 22.2,
      speed: 1.1,
      direction: 1,
      isZAxis: true,
      walkFreq: 5.2,
      targetYaw: 0,
      currentYaw: 0,
    },
    // P6: Thu in Autumn Coat & Scarf on Sidewalk (Z = 10.5, walking along X)
    {
      ref: null,
      leftLeg: null,
      rightLeg: null,
      leftArm: null,
      rightArm: null,
      torso: null,
      x: -11.0,
      z: 10.5,
      minX: -13.0,
      maxX: 4.0,
      speed: 1.25,
      direction: 1,
      walkFreq: 5.5,
      targetYaw: Math.PI / 2,
      currentYaw: Math.PI / 2,
    },
    // P7: Quang Jogger on Opposite Sidewalk (Z = 24.2, jogging along X)
    {
      ref: null,
      leftLeg: null,
      rightLeg: null,
      leftArm: null,
      rightArm: null,
      torso: null,
      x: 14.0,
      z: 24.2,
      minX: -16.0,
      maxX: 16.0,
      speed: 2.3,
      direction: -1,
      walkFreq: 8.5,
      targetYaw: -Math.PI / 2,
      currentYaw: -Math.PI / 2,
    },
  ]);

  // Sync refs
  peds.current[0].ref = p1Ref.current;
  peds.current[0].leftLeg = p1LeftLeg.current;
  peds.current[0].rightLeg = p1RightLeg.current;
  peds.current[0].leftArm = p1LeftArm.current;
  peds.current[0].rightArm = p1RightArm.current;
  peds.current[0].torso = p1Torso.current;

  peds.current[1].ref = p2Ref.current;
  peds.current[1].leftLeg = p2LeftLeg.current;
  peds.current[1].rightLeg = p2RightLeg.current;
  peds.current[1].leftArm = p2LeftArm.current;
  peds.current[1].rightArm = p2RightArm.current;
  peds.current[1].torso = p2Torso.current;

  peds.current[2].ref = p3Ref.current;
  peds.current[2].leftLeg = p3LeftLeg.current;
  peds.current[2].rightLeg = p3RightLeg.current;
  peds.current[2].leftArm = p3LeftArm.current;
  peds.current[2].rightArm = p3RightArm.current;
  peds.current[2].torso = p3Torso.current;

  peds.current[3].ref = p4Ref.current;
  peds.current[3].leftLeg = p4LeftLeg.current;
  peds.current[3].rightLeg = p4RightLeg.current;
  peds.current[3].leftArm = p4LeftArm.current;
  peds.current[3].rightArm = p4RightArm.current;
  peds.current[3].torso = p4Torso.current;

  peds.current[4].ref = p5Ref.current;
  peds.current[4].leftLeg = p5LeftLeg.current;
  peds.current[4].rightLeg = p5RightLeg.current;
  peds.current[4].leftArm = p5LeftArm.current;
  peds.current[4].rightArm = p5RightArm.current;
  peds.current[4].torso = p5Torso.current;

  peds.current[5].ref = p6Ref.current;
  peds.current[5].leftLeg = p6LeftLeg.current;
  peds.current[5].rightLeg = p6RightLeg.current;
  peds.current[5].leftArm = p6LeftArm.current;
  peds.current[5].rightArm = p6RightArm.current;
  peds.current[5].torso = p6Torso.current;

  peds.current[6].ref = p7Ref.current;
  peds.current[6].leftLeg = p7LeftLeg.current;
  peds.current[6].rightLeg = p7RightLeg.current;
  peds.current[6].leftArm = p7LeftArm.current;
  peds.current[6].rightArm = p7RightArm.current;
  peds.current[6].torso = p7Torso.current;

  // Frame animation loop
  useFrame((_, delta) => {
    const clampedDelta = Math.min(delta, 0.08);
    strideTime.current += clampedDelta;

    // Puppy tail wag
    if (dogTailRef.current) {
      dogTailRef.current.rotation.y = Math.sin(strideTime.current * 14) * 0.45;
    }

    for (let i = 0; i < peds.current.length; i++) {
      const p = peds.current[i];
      if (!p.ref) continue;

      if (p.isZAxis) {
        // Walking along Z (Crosswalk)
        p.z += p.speed * p.direction * clampedDelta;
        if (p.direction > 0 && p.z > (p.maxZ ?? 22.2)) {
          p.direction = -1;
          p.targetYaw = Math.PI;
        } else if (p.direction < 0 && p.z < (p.minZ ?? 13.2)) {
          p.direction = 1;
          p.targetYaw = 0;
        }
        p.ref.position.set(p.x, 0, p.z);
      } else {
        // Walking along X (Sidewalk)
        p.x += p.speed * p.direction * clampedDelta;
        if (p.direction > 0 && p.x > p.maxX) {
          p.direction = -1;
          p.targetYaw = -Math.PI / 2;
        } else if (p.direction < 0 && p.x < p.minX) {
          p.direction = 1;
          p.targetYaw = Math.PI / 2;
        }
        p.ref.position.set(p.x, 0, p.z);
      }

      // Smooth turning interpolation
      let angleDiff = p.targetYaw - p.currentYaw;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      p.currentYaw += angleDiff * Math.min(clampedDelta * 10, 1.0);
      p.ref.rotation.y = p.currentYaw;

      // Limb swing oscillation
      const swingAngle = Math.sin(strideTime.current * p.walkFreq) * 0.45;
      if (p.leftLeg) p.leftLeg.rotation.x = swingAngle;
      if (p.rightLeg) p.rightLeg.rotation.x = -swingAngle;
      if (p.leftArm) p.leftArm.rotation.x = -swingAngle * 0.75;
      if (p.rightArm) p.rightArm.rotation.x = swingAngle * 0.75;

      // Subtle vertical body bob
      if (p.torso) {
        p.torso.position.y = 0.58 + Math.abs(Math.sin(strideTime.current * p.walkFreq * 2)) * 0.035;
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* ========================================================= */}
      {/* PEDESTRIAN 1: MINH (Yellow Hoodie, Jeans & McDonald's Bag) */}
      {/* ========================================================= */}
      <group ref={p1Ref} position={[-4.0, 0, 11.2]}>
        {/* Hip & Upper Body Root */}
        <group ref={p1Torso} position={[0, 0.58, 0]}>
          {/* Torso in Yellow Hoodie */}
          <mesh castShadow>
            <boxGeometry args={[0.34, 0.42, 0.22]} />
            <meshStandardMaterial color="#eab308" roughness={0.7} />
          </mesh>
          {/* Head & Skin */}
          <mesh position={[0, 0.32, 0]} castShadow>
            <sphereGeometry args={[0.13, 10, 10]} />
            <meshStandardMaterial color="#fed7aa" roughness={0.5} />
          </mesh>
          {/* Black Baseball Cap */}
          <mesh position={[0, 0.41, 0.03]} castShadow>
            <sphereGeometry args={[0.14, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#18181b" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.38, 0.16]}>
            <boxGeometry args={[0.18, 0.03, 0.12]} />
            <meshStandardMaterial color="#18181b" roughness={0.4} />
          </mesh>

          {/* Left Arm */}
          <group ref={p1LeftArm} position={[-0.21, 0.14, 0]}>
            <mesh position={[0, -0.16, 0]} castShadow>
              <boxGeometry args={[0.08, 0.32, 0.08]} />
              <meshStandardMaterial color="#eab308" roughness={0.7} />
            </mesh>
          </group>

          {/* Right Arm (Holding McDonald's Takeout Bag) */}
          <group ref={p1RightArm} position={[0.21, 0.14, 0]}>
            <mesh position={[0, -0.16, 0]} castShadow>
              <boxGeometry args={[0.08, 0.32, 0.08]} />
              <meshStandardMaterial color="#eab308" roughness={0.7} />
            </mesh>
            {/* Miniature Kraft Paper McDonald's Bag */}
            <group position={[0.04, -0.32, 0.08]}>
              <mesh castShadow>
                <boxGeometry args={[0.16, 0.22, 0.1]} />
                <meshStandardMaterial color="#d97706" roughness={0.8} />
              </mesh>
              {/* Golden 'M' Decal */}
              <mesh position={[0, 0, 0.052]}>
                <circleGeometry args={[0.035, 8]} />
                <meshBasicMaterial color="#ffc72c" />
              </mesh>
            </group>
          </group>
        </group>

        {/* Left Leg (Jeans) */}
        <group ref={p1LeftLeg} position={[-0.09, 0.58, 0]}>
          <mesh position={[0, -0.28, 0]} castShadow>
            <boxGeometry args={[0.11, 0.56, 0.11]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
          </mesh>
          {/* White Sneaker */}
          <mesh position={[0, -0.56, 0.03]}>
            <boxGeometry args={[0.12, 0.08, 0.18]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.4} />
          </mesh>
        </group>

        {/* Right Leg (Jeans) */}
        <group ref={p1RightLeg} position={[0.09, 0.58, 0]}>
          <mesh position={[0, -0.28, 0]} castShadow>
            <boxGeometry args={[0.11, 0.56, 0.11]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
          </mesh>
          {/* White Sneaker */}
          <mesh position={[0, -0.56, 0.03]}>
            <boxGeometry args={[0.12, 0.08, 0.18]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.4} />
          </mesh>
        </group>
      </group>

      {/* ========================================================= */}
      {/* PEDESTRIAN 2: LAN (Cute Pastel Outfit & Crossbody Bag) */}
      {/* ========================================================= */}
      <group ref={p2Ref} position={[5.5, 0, 12.3]}>
        <group ref={p2Torso} position={[0, 0.56, 0]}>
          {/* Torso in Soft Mint Blouse */}
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.38, 0.2]} />
            <meshStandardMaterial color="#6ee7b7" roughness={0.6} />
          </mesh>
          {/* Head & Brown Hair Bun */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <sphereGeometry args={[0.12, 10, 10]} />
            <meshStandardMaterial color="#fed7aa" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.38, -0.04]} castShadow>
            <sphereGeometry args={[0.09, 8, 8]} />
            <meshStandardMaterial color="#78350f" roughness={0.7} />
          </mesh>
          {/* Crossbody Bag Strap */}
          <mesh position={[0, 0, 0.11]} rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.35, 0.04, 0.02]} />
            <meshStandardMaterial color="#991b1b" roughness={0.6} />
          </mesh>

          {/* Left Arm */}
          <group ref={p2LeftArm} position={[-0.18, 0.12, 0]}>
            <mesh position={[0, -0.15, 0]} castShadow>
              <boxGeometry args={[0.07, 0.3, 0.07]} />
              <meshStandardMaterial color="#6ee7b7" roughness={0.6} />
            </mesh>
          </group>

          {/* Right Arm */}
          <group ref={p2RightArm} position={[0.18, 0.12, 0]}>
            <mesh position={[0, -0.15, 0]} castShadow>
              <boxGeometry args={[0.07, 0.3, 0.07]} />
              <meshStandardMaterial color="#6ee7b7" roughness={0.6} />
            </mesh>
          </group>
        </group>

        {/* Left Leg (White Skirt / Trousers) */}
        <group ref={p2LeftLeg} position={[-0.08, 0.56, 0]}>
          <mesh position={[0, -0.27, 0]} castShadow>
            <boxGeometry args={[0.1, 0.54, 0.1]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.5} />
          </mesh>
        </group>

        {/* Right Leg */}
        <group ref={p2RightLeg} position={[0.08, 0.56, 0]}>
          <mesh position={[0, -0.27, 0]} castShadow>
            <boxGeometry args={[0.1, 0.54, 0.1]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* ========================================================= */}
      {/* PEDESTRIAN 3: NAM (Red Windbreaker & Headphones on Opposite Sidewalk) */}
      {/* ========================================================= */}
      <group ref={p3Ref} position={[-8.0, 0, 22.8]}>
        <group ref={p3Torso} position={[0, 0.6, 0]}>
          {/* Red Windbreaker */}
          <mesh castShadow>
            <boxGeometry args={[0.36, 0.44, 0.22]} />
            <meshStandardMaterial color="#ef4444" roughness={0.6} />
          </mesh>
          {/* Head & Black Hair */}
          <mesh position={[0, 0.34, 0]} castShadow>
            <sphereGeometry args={[0.13, 10, 10]} />
            <meshStandardMaterial color="#fbcfe8" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.41, 0]}>
            <sphereGeometry args={[0.14, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>
          {/* White Headphones */}
          <mesh position={[0, 0.38, 0]}>
            <torusGeometry args={[0.14, 0.03, 8, 12, Math.PI]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>

          {/* Left Arm */}
          <group ref={p3LeftArm} position={[-0.22, 0.14, 0]}>
            <mesh position={[0, -0.16, 0]} castShadow>
              <boxGeometry args={[0.08, 0.32, 0.08]} />
              <meshStandardMaterial color="#ef4444" roughness={0.6} />
            </mesh>
          </group>
          {/* Right Arm */}
          <group ref={p3RightArm} position={[0.22, 0.14, 0]}>
            <mesh position={[0, -0.16, 0]} castShadow>
              <boxGeometry args={[0.08, 0.32, 0.08]} />
              <meshStandardMaterial color="#ef4444" roughness={0.6} />
            </mesh>
          </group>
        </group>

        {/* Left Leg (Black Joggers) */}
        <group ref={p3LeftLeg} position={[-0.1, 0.6, 0]}>
          <mesh position={[0, -0.29, 0]} castShadow>
            <boxGeometry args={[0.11, 0.58, 0.11]} />
            <meshStandardMaterial color="#18181b" roughness={0.7} />
          </mesh>
        </group>
        {/* Right Leg */}
        <group ref={p3RightLeg} position={[0.1, 0.6, 0]}>
          <mesh position={[0, -0.29, 0]} castShadow>
            <boxGeometry args={[0.11, 0.58, 0.11]} />
            <meshStandardMaterial color="#18181b" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* ========================================================= */}
      {/* PEDESTRIAN 4: MAI & CUTE GOLDEN PUPPY */}
      {/* ========================================================= */}
      <group ref={p4Ref} position={[9.0, 0, 23.6]}>
        <group ref={p4Torso} position={[0, 0.55, 0]}>
          {/* Pink Cardigan */}
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.38, 0.2]} />
            <meshStandardMaterial color="#f472b6" roughness={0.6} />
          </mesh>
          {/* Head & Ponytail */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <sphereGeometry args={[0.12, 10, 10]} />
            <meshStandardMaterial color="#fed7aa" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.35, -0.12]} castShadow>
            <cylinderGeometry args={[0.04, 0.06, 0.18, 8]} />
            <meshStandardMaterial color="#451a03" roughness={0.8} />
          </mesh>

          {/* Left Arm */}
          <group ref={p4LeftArm} position={[-0.18, 0.12, 0]}>
            <mesh position={[0, -0.15, 0]} castShadow>
              <boxGeometry args={[0.07, 0.3, 0.07]} />
              <meshStandardMaterial color="#f472b6" roughness={0.6} />
            </mesh>
          </group>
          {/* Right Arm (Holding Dog Leash) */}
          <group ref={p4RightArm} position={[0.18, 0.12, 0]}>
            <mesh position={[0, -0.15, 0]} castShadow>
              <boxGeometry args={[0.07, 0.3, 0.07]} />
              <meshStandardMaterial color="#f472b6" roughness={0.6} />
            </mesh>
          </group>
        </group>

        {/* Legs */}
        <group ref={p4LeftLeg} position={[-0.08, 0.55, 0]}>
          <mesh position={[0, -0.27, 0]} castShadow>
            <boxGeometry args={[0.1, 0.54, 0.1]} />
            <meshStandardMaterial color="#334155" roughness={0.8} />
          </mesh>
        </group>
        <group ref={p4RightLeg} position={[0.08, 0.55, 0]}>
          <mesh position={[0, -0.27, 0]} castShadow>
            <boxGeometry args={[0.1, 0.54, 0.1]} />
            <meshStandardMaterial color="#334155" roughness={0.8} />
          </mesh>
        </group>

        {/* Cute Golden Puppy Trotting Beside Her */}
        <group position={[0.65, 0, 0.35]}>
          {/* Dog Body */}
          <mesh position={[0, 0.18, 0]} castShadow>
            <boxGeometry args={[0.18, 0.16, 0.35]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.8} />
          </mesh>
          {/* Dog Head & Ears */}
          <mesh position={[0, 0.28, 0.18]} castShadow>
            <boxGeometry args={[0.15, 0.14, 0.15]} />
            <meshStandardMaterial color="#d97706" roughness={0.8} />
          </mesh>
          {/* Little Black Nose */}
          <mesh position={[0, 0.26, 0.26]}>
            <sphereGeometry args={[0.03, 6, 6]} />
            <meshStandardMaterial color="#0f172a" roughness={0.4} />
          </mesh>
          {/* Wagging Tail */}
          <mesh ref={dogTailRef} position={[0, 0.24, -0.2]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.03, 0.16, 6]} />
            <meshStandardMaterial color="#d97706" roughness={0.8} />
          </mesh>
          {/* 4 Little Running Paws */}
          {[
            [-0.08, 0.1],
            [0.08, 0.1],
            [-0.08, -0.1],
            [0.08, -0.1],
          ].map(([dx, dz], di) => (
            <mesh key={`paw-${di}`} position={[dx, 0.06, dz]}>
              <cylinderGeometry args={[0.03, 0.03, 0.12, 6]} />
              <meshStandardMaterial color="#b45309" roughness={0.8} />
            </mesh>
          ))}
          {/* Red Leash Lead */}
          <mesh position={[-0.25, 0.32, -0.05]} rotation={[0, 0, -0.7]}>
            <cylinderGeometry args={[0.008, 0.008, 0.65, 4]} />
            <meshStandardMaterial color="#ef4444" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* ========================================================= */}
      {/* PEDESTRIAN 5: HUY (Crossing Zebra Crosswalk safely) */}
      {/* ========================================================= */}
      <group ref={p5Ref} position={[1.5, 0, 13.5]}>
        <group ref={p5Torso} position={[0, 0.58, 0]}>
          {/* Blue Striped Tee */}
          <mesh castShadow>
            <boxGeometry args={[0.34, 0.42, 0.22]} />
            <meshStandardMaterial color="#3b82f6" roughness={0.6} />
          </mesh>
          {/* Head */}
          <mesh position={[0, 0.32, 0]} castShadow>
            <sphereGeometry args={[0.13, 10, 10]} />
            <meshStandardMaterial color="#fed7aa" roughness={0.5} />
          </mesh>
          {/* Backpack */}
          <mesh position={[0, 0.02, -0.14]} castShadow>
            <boxGeometry args={[0.26, 0.32, 0.14]} />
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </mesh>

          {/* Left Arm */}
          <group ref={p5LeftArm} position={[-0.21, 0.14, 0]}>
            <mesh position={[0, -0.16, 0]} castShadow>
              <boxGeometry args={[0.08, 0.32, 0.08]} />
              <meshStandardMaterial color="#3b82f6" roughness={0.6} />
            </mesh>
          </group>
          {/* Right Arm */}
          <group ref={p5RightArm} position={[0.21, 0.14, 0]}>
            <mesh position={[0, -0.16, 0]} castShadow>
              <boxGeometry args={[0.08, 0.32, 0.08]} />
              <meshStandardMaterial color="#3b82f6" roughness={0.6} />
            </mesh>
          </group>
        </group>

        {/* Legs (Khaki Shorts & Sneakers) */}
        <group ref={p5LeftLeg} position={[-0.09, 0.58, 0]}>
          <mesh position={[0, -0.28, 0]} castShadow>
            <boxGeometry args={[0.11, 0.56, 0.11]} />
            <meshStandardMaterial color="#d97706" roughness={0.8} />
          </mesh>
        </group>
        <group ref={p5RightLeg} position={[0.09, 0.58, 0]}>
          <mesh position={[0, -0.28, 0]} castShadow>
            <boxGeometry args={[0.11, 0.56, 0.11]} />
            <meshStandardMaterial color="#d97706" roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* ========================================================= */}
      {/* PEDESTRIAN 6: THU (Beige Trenchcoat & Orange Autumn Scarf) */}
      {/* ========================================================= */}
      <group ref={p6Ref} position={[-11.0, 0, 10.5]}>
        <group ref={p6Torso} position={[0, 0.56, 0]}>
          {/* Trenchcoat */}
          <mesh castShadow>
            <boxGeometry args={[0.32, 0.46, 0.22]} />
            <meshStandardMaterial color="#d4b996" roughness={0.7} />
          </mesh>
          {/* Autumn Scarf */}
          <mesh position={[0, 0.22, 0.05]} castShadow>
            <torusGeometry args={[0.12, 0.04, 8, 12]} />
            <meshStandardMaterial color="#ea580c" roughness={0.6} />
          </mesh>
          {/* Head & Hair */}
          <mesh position={[0, 0.34, 0]} castShadow>
            <sphereGeometry args={[0.12, 10, 10]} />
            <meshStandardMaterial color="#fed7aa" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.42, 0]}>
            <sphereGeometry args={[0.13, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#3b1d11" roughness={0.8} />
          </mesh>

          {/* Left Arm */}
          <group ref={p6LeftArm} position={[-0.2, 0.14, 0]}>
            <mesh position={[0, -0.16, 0]} castShadow>
              <boxGeometry args={[0.08, 0.32, 0.08]} />
              <meshStandardMaterial color="#d4b996" roughness={0.7} />
            </mesh>
          </group>
          {/* Right Arm */}
          <group ref={p6RightArm} position={[0.2, 0.14, 0]}>
            <mesh position={[0, -0.16, 0]} castShadow>
              <boxGeometry args={[0.08, 0.32, 0.08]} />
              <meshStandardMaterial color="#d4b996" roughness={0.7} />
            </mesh>
          </group>
        </group>

        {/* Legs */}
        <group ref={p6LeftLeg} position={[-0.08, 0.56, 0]}>
          <mesh position={[0, -0.28, 0]} castShadow>
            <boxGeometry args={[0.1, 0.56, 0.1]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>
        </group>
        <group ref={p6RightLeg} position={[0.08, 0.56, 0]}>
          <mesh position={[0, -0.28, 0]} castShadow>
            <boxGeometry args={[0.1, 0.56, 0.1]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* ========================================================= */}
      {/* PEDESTRIAN 7: QUANG (Athletic Jogger on Opposite Sidewalk) */}
      {/* ========================================================= */}
      <group ref={p7Ref} position={[14.0, 0, 24.2]}>
        <group ref={p7Torso} position={[0, 0.6, 0]}>
          {/* Sport Tank in Bright Orange */}
          <mesh castShadow>
            <boxGeometry args={[0.34, 0.42, 0.2]} />
            <meshStandardMaterial color="#ea580c" roughness={0.6} />
          </mesh>
          {/* Head & Sport Visor */}
          <mesh position={[0, 0.32, 0]} castShadow>
            <sphereGeometry args={[0.13, 10, 10]} />
            <meshStandardMaterial color="#fed7aa" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.38, 0.08]}>
            <boxGeometry args={[0.2, 0.04, 0.14]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>

          {/* Left Arm */}
          <group ref={p7LeftArm} position={[-0.2, 0.14, 0]}>
            <mesh position={[0, -0.15, 0]} castShadow>
              <boxGeometry args={[0.08, 0.3, 0.08]} />
              <meshStandardMaterial color="#fed7aa" roughness={0.5} />
            </mesh>
          </group>
          {/* Right Arm */}
          <group ref={p7RightArm} position={[0.2, 0.14, 0]}>
            <mesh position={[0, -0.15, 0]} castShadow>
              <boxGeometry args={[0.08, 0.3, 0.08]} />
              <meshStandardMaterial color="#fed7aa" roughness={0.5} />
            </mesh>
          </group>
        </group>

        {/* Running Shorts & Legs */}
        <group ref={p7LeftLeg} position={[-0.09, 0.6, 0]}>
          <mesh position={[0, -0.14, 0]} castShadow>
            <boxGeometry args={[0.12, 0.24, 0.12]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.38, 0]} castShadow>
            <boxGeometry args={[0.09, 0.28, 0.09]} />
            <meshStandardMaterial color="#fed7aa" roughness={0.5} />
          </mesh>
          {/* Neon Running Shoes */}
          <mesh position={[0, -0.54, 0.03]}>
            <boxGeometry args={[0.11, 0.08, 0.18]} />
            <meshStandardMaterial color="#84cc16" roughness={0.4} />
          </mesh>
        </group>
        <group ref={p7RightLeg} position={[0.09, 0.6, 0]}>
          <mesh position={[0, -0.14, 0]} castShadow>
            <boxGeometry args={[0.12, 0.24, 0.12]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.38, 0]} castShadow>
            <boxGeometry args={[0.09, 0.28, 0.09]} />
            <meshStandardMaterial color="#fed7aa" roughness={0.5} />
          </mesh>
          {/* Neon Running Shoes */}
          <mesh position={[0, -0.54, 0.03]}>
            <boxGeometry args={[0.11, 0.08, 0.18]} />
            <meshStandardMaterial color="#84cc16" roughness={0.4} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
