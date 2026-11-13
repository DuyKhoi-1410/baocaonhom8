import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface AnimatedTrafficProps {
  isNight?: boolean;
}

interface VehicleData {
  ref: THREE.Group | null;
  wheels: THREE.Mesh[];
  x: number;
  z: number;
  speed: number;
  length: number;
}

interface FallingLeafData {
  x: number;
  y: number;
  z: number;
  speedY: number;
  swaySpeed: number;
  swayAmp: number;
  rotSpeedX: number;
  rotSpeedZ: number;
  phase: number;
  scale: number;
}

export const AnimatedTraffic: React.FC<AnimatedTrafficProps> = ({ isNight = false }) => {
  // -------------------------------------------------------------
  // 1. REFS & INITIAL STATE FOR 8 MOVING VEHICLES (CONTINUOUS FLOW)
  // -------------------------------------------------------------
  // Lane 1 (Eastbound: +X direction, Z = 15.6)
  const taxiRef = useRef<THREE.Group>(null);
  const redCarRef = useRef<THREE.Group>(null);
  const vanRef = useRef<THREE.Group>(null);
  const pickupRef = useRef<THREE.Group>(null);

  // Lane 2 (Westbound: -X direction, Z = 19.6)
  const blueCarRef = useRef<THREE.Group>(null);
  const scooterRef = useRef<THREE.Group>(null);
  const mintCarRef = useRef<THREE.Group>(null);
  const suvRef = useRef<THREE.Group>(null);

  // Wheel refs for spinning animation
  const taxiWheels = useRef<THREE.Mesh[]>([]);
  const redWheels = useRef<THREE.Mesh[]>([]);
  const vanWheels = useRef<THREE.Mesh[]>([]);
  const pickupWheels = useRef<THREE.Mesh[]>([]);
  const blueWheels = useRef<THREE.Mesh[]>([]);
  const scooterWheels = useRef<THREE.Mesh[]>([]);
  const mintWheels = useRef<THREE.Mesh[]>([]);
  const suvWheels = useRef<THREE.Mesh[]>([]);

  // Simulation physics state: 8 vehicles evenly staggered for continuous traffic
  const vehicles = useRef<VehicleData[]>([
    // Eastbound Lane (Z = 15.6)
    { ref: null, wheels: [], x: -28, z: 15.6, speed: 7.2, length: 3.2 },
    { ref: null, wheels: [], x: -11, z: 15.6, speed: 8.5, length: 2.8 },
    { ref: null, wheels: [], x: 6, z: 15.6, speed: 6.2, length: 4.2 },
    { ref: null, wheels: [], x: 23, z: 15.6, speed: 7.0, length: 3.4 },

    // Westbound Lane (Z = 19.6)
    { ref: null, wheels: [], x: 28, z: 19.6, speed: -7.5, length: 3.2 },
    { ref: null, wheels: [], x: 12, z: 19.6, speed: -6.4, length: 1.6 }, // Scooter
    { ref: null, wheels: [], x: -4, z: 19.6, speed: -7.2, length: 2.7 },
    { ref: null, wheels: [], x: -21, z: 19.6, speed: -8.0, length: 3.5 },
  ]);

  // Synchronize component refs into simulation state
  vehicles.current[0].ref = taxiRef.current;
  vehicles.current[0].wheels = taxiWheels.current;
  vehicles.current[1].ref = redCarRef.current;
  vehicles.current[1].wheels = redWheels.current;
  vehicles.current[2].ref = vanRef.current;
  vehicles.current[2].wheels = vanWheels.current;
  vehicles.current[3].ref = pickupRef.current;
  vehicles.current[3].wheels = pickupWheels.current;

  vehicles.current[4].ref = blueCarRef.current;
  vehicles.current[4].wheels = blueWheels.current;
  vehicles.current[5].ref = scooterRef.current;
  vehicles.current[5].wheels = scooterWheels.current;
  vehicles.current[6].ref = mintCarRef.current;
  vehicles.current[6].wheels = mintWheels.current;
  vehicles.current[7].ref = suvRef.current;
  vehicles.current[7].wheels = suvWheels.current;

  // -------------------------------------------------------------
  // 2. STATIC FALLEN AUTUMN LEAVES ON ROAD & SHOULDERS (MATCHING PHOTO!)
  // -------------------------------------------------------------
  const staticLeavesMeshRef = useRef<THREE.InstancedMesh>(null);
  const STATIC_LEAF_COUNT = 180;

  const staticLeavesData = useMemo(() => {
    const data = [];
    const colors = [
      '#f59e0b', // Amber gold
      '#d97706', // Rich golden brown
      '#ea580c', // Bright autumn orange
      '#facc15', // Vibrant golden yellow
      '#b45309', // Russet
      '#ef4444', // Crimson red maple
      '#c2410c', // Terracotta
    ];

    for (let i = 0; i < STATIC_LEAF_COUNT; i++) {
      // Distribute across road length X: -35 to +35
      const x = (Math.random() - 0.5) * 70;
      // High concentration along the road shoulders and curb edges like in the photo!
      const randZone = Math.random();
      let z: number;
      if (randZone < 0.45) {
        // Near roadside shoulder (Z: 13.7 to 15.0)
        z = 13.7 + Math.random() * 1.3;
      } else if (randZone < 0.8) {
        // Far roadside shoulder (Z: 20.2 to 21.6)
        z = 20.2 + Math.random() * 1.4;
      } else {
        // Scattered across the travel lanes
        z = 14.8 + Math.random() * 5.6;
      }

      const rotY = Math.random() * Math.PI * 2;
      const rotX = (Math.random() - 0.5) * 0.25;
      const rotZ = (Math.random() - 0.5) * 0.25;
      const scale = 0.8 + Math.random() * 0.7;
      const color = colors[Math.floor(Math.random() * colors.length)];

      data.push({ x, z, rotX, rotY, rotZ, scale, color });
    }
    return data;
  }, []);

  // Initialize static fallen leaves transform matrices and colors
  useEffect(() => {
    if (!staticLeavesMeshRef.current) return;
    const inst = staticLeavesMeshRef.current;
    const dummy = new THREE.Object3D();

    staticLeavesData.forEach((leaf, i) => {
      dummy.position.set(leaf.x, 0.016, leaf.z);
      dummy.rotation.set(leaf.rotX - Math.PI / 2, leaf.rotY, leaf.rotZ);
      dummy.scale.set(leaf.scale, leaf.scale, leaf.scale);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
      inst.setColorAt(i, new THREE.Color(leaf.color));
    });

    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  }, [staticLeavesData]);

  // -------------------------------------------------------------
  // 3. ANIMATED FALLING AUTUMN LEAVES PARTICLE SYSTEM
  // -------------------------------------------------------------
  const fallingLeavesMeshRef = useRef<THREE.InstancedMesh>(null);
  const FALLING_LEAF_COUNT = 90;
  const leafDummy = useMemo(() => new THREE.Object3D(), []);

  const fallingLeaves = useRef<FallingLeafData[]>(
    Array.from({ length: FALLING_LEAF_COUNT }, () => ({
      x: (Math.random() - 0.5) * 64,
      y: 0.8 + Math.random() * 6.5,
      z: 11.5 + Math.random() * 12.5,
      speedY: 0.75 + Math.random() * 0.7,
      swaySpeed: 1.8 + Math.random() * 2.2,
      swayAmp: 0.35 + Math.random() * 0.45,
      rotSpeedX: 1.5 + Math.random() * 2.0,
      rotSpeedZ: 1.2 + Math.random() * 2.5,
      phase: Math.random() * Math.PI * 2,
      scale: 0.85 + Math.random() * 0.5,
    }))
  );

  // Initialize falling leaves colors
  useEffect(() => {
    if (!fallingLeavesMeshRef.current) return;
    const inst = fallingLeavesMeshRef.current;
    const colors = ['#f59e0b', '#d97706', '#ea580c', '#facc15', '#ef4444', '#b45309'];
    for (let i = 0; i < FALLING_LEAF_COUNT; i++) {
      inst.setColorAt(i, new THREE.Color(colors[i % colors.length]));
    }
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  }, []);

  // Time accumulator for breeze & falling leaves
  const animTime = useRef(0);

  // -------------------------------------------------------------
  // 4. FRAME UPDATE: CONTINUOUS VEHICLES & DRIFTING FALLING LEAVES
  // -------------------------------------------------------------
  useFrame((_, delta) => {
    const clampedDelta = Math.min(delta, 0.08);
    animTime.current += clampedDelta;

    // A. Update continuous vehicle movements
    for (const v of vehicles.current) {
      if (!v.ref) continue;

      v.x += v.speed * clampedDelta;

      // Wrap around seamlessly
      if (v.speed > 0 && v.x > 36) {
        v.x = -36;
      } else if (v.speed < 0 && v.x < -36) {
        v.x = 36;
      }

      v.ref.position.x = v.x;

      // Spin wheels
      const wheelRotSpeed = (v.speed / 0.25) * clampedDelta;
      for (const w of v.wheels) {
        if (w) w.rotation.x += wheelRotSpeed;
      }
    }

    // B. Update falling leaves drifting in breeze
    if (fallingLeavesMeshRef.current) {
      const inst = fallingLeavesMeshRef.current;
      const t = animTime.current;

      fallingLeaves.current.forEach((leaf, i) => {
        leaf.y -= leaf.speedY * clampedDelta;

        // Reset to tree canopy height when reaching ground
        if (leaf.y < 0.04) {
          leaf.y = 5.8 + Math.random() * 2.2;
          leaf.x = (Math.random() - 0.5) * 64;
          leaf.z = 11.5 + Math.random() * 12.5;
        }

        // Horizontal sway oscillation in wind
        const currentX = leaf.x + Math.sin(t * leaf.swaySpeed + leaf.phase) * leaf.swayAmp;
        const currentRotX = t * leaf.rotSpeedX + leaf.phase;
        const currentRotY = Math.cos(t * 1.5 + leaf.phase) * 0.8;
        const currentRotZ = t * leaf.rotSpeedZ + leaf.phase;

        leafDummy.position.set(currentX, leaf.y, leaf.z);
        leafDummy.rotation.set(currentRotX, currentRotY, currentRotZ);
        leafDummy.scale.set(leaf.scale, leaf.scale, leaf.scale);
        leafDummy.updateMatrix();

        inst.setMatrixAt(i, leafDummy.matrix);
      });

      inst.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* ========================================================= */}
      {/* 1. FRESH GRAY ASPHALT ROADWAY WITH DOUBLE YELLOW CENTERLINES */}
      {/* ========================================================= */}
      {/* Solid Gray Asphalt Pavement (X: -36 to +36, Z: 13.6 to 21.6) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 17.6]} receiveShadow>
        <planeGeometry args={[72, 8.0]} />
        <meshStandardMaterial
          color="#334155" // Modern clean slate-gray asphalt road
          roughness={0.7}
          metalness={0.08}
        />
      </mesh>

      {/* DOUBLE SOLID YELLOW CENTERLINES (VẠCH ĐÔI VÀNG SONG SONG CHUẨN ẢNH) */}
      {/* Yellow Centerline 1 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 17.46]} receiveShadow>
        <planeGeometry args={[72, 0.14]} />
        <meshStandardMaterial color="#facc15" roughness={0.4} />
      </mesh>
      {/* Yellow Centerline 2 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 17.74]} receiveShadow>
        <planeGeometry args={[72, 0.14]} />
        <meshStandardMaterial color="#facc15" roughness={0.4} />
      </mesh>

      {/* SOLID WHITE SHOULDER / EDGE LINES (VẠCH SƠN TRẮNG MÉP ĐƯỜNG) */}
      {/* Near Edge (McDonald's side) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 13.8]} receiveShadow>
        <planeGeometry args={[72, 0.14]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
      {/* Far Edge (Opposite side) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 21.4]} receiveShadow>
        <planeGeometry args={[72, 0.14]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      {/* Zebra Crosswalk at X = 1.5 in front of McDonald's */}
      <group position={[1.5, 0.013, 17.6]}>
        {[-3.0, -2.2, -1.4, -0.6, 0.2, 1.0, 1.8, 2.6].map((sz, si) => (
          <mesh key={`zebra-${si}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, sz]}>
            <planeGeometry args={[3.2, 0.42]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Roadside Foliage & Autumn Fallen Leaf Shoulder Beds */}
      {/* Near Shoulder Leaf Bed (Z: 13.5 to 13.8) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.011, 13.65]} receiveShadow>
        <planeGeometry args={[72, 0.35]} />
        <meshStandardMaterial color="#b45309" roughness={0.9} />
      </mesh>
      {/* Far Shoulder Leaf Bed (Z: 21.4 to 21.7) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.011, 21.55]} receiveShadow>
        <planeGeometry args={[72, 0.35]} />
        <meshStandardMaterial color="#b45309" roughness={0.9} />
      </mesh>

      {/* 2. STATIC SCATTERED FALLEN LEAVES ON ASPHALT (180 Leaves, 1 Draw Call) */}
      <instancedMesh
        ref={staticLeavesMeshRef}
        args={[undefined, undefined, STATIC_LEAF_COUNT]}
        receiveShadow
      >
        <planeGeometry args={[0.14, 0.18]} />
        <meshStandardMaterial side={THREE.DoubleSide} roughness={0.8} />
      </instancedMesh>

      {/* 3. DRIFTING FALLING LEAVES IN BREEZE (90 Animated Leaves) */}
      <instancedMesh
        ref={fallingLeavesMeshRef}
        args={[undefined, undefined, FALLING_LEAF_COUNT]}
        castShadow
      >
        <planeGeometry args={[0.15, 0.2]} />
        <meshStandardMaterial side={THREE.DoubleSide} roughness={0.7} />
      </instancedMesh>

      {/* 4. ROADSIDE WHITE GUIDE POSTS / DELINEATORS WITH RED REFLECTORS (From Reference Photo!) */}
      {[-28, -20, -12, -4, 4, 12, 20, 28].map((px, pi) => (
        <group key={`delineator-${pi}`} position={[px, 0, 21.55]}>
          {/* White Slender Post */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.045, 0.9, 8]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.4} />
          </mesh>
          {/* Red Reflective Band Top */}
          <mesh position={[0, 0.76, 0]}>
            <cylinderGeometry args={[0.048, 0.048, 0.16, 8]} />
            <meshStandardMaterial color="#ef4444" roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* 5. VIBRANT AUTUMN TREES ALONG THE ROADSIDE & SIDEWALKS */}
      {[
        [-24.0, 12.0, '#f59e0b'],
        [-14.0, 12.2, '#ea580c'],
        [14.0, 12.2, '#d97706'],
        [24.0, 12.0, '#f59e0b'],
        [-20.0, 23.2, '#ea580c'],
        [-4.0, 23.4, '#facc15'],
        [16.0, 23.4, '#ea580c'],
        [26.0, 23.2, '#f59e0b'],
      ].map(([tx, tz, col], ti) => (
        <group key={`autumn-tree-${ti}`} position={[tx as number, 0, tz as number]}>
          {/* Tree Trunk */}
          <mesh position={[0, 1.4, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.24, 2.8, 8]} />
            <meshStandardMaterial color="#78350f" roughness={0.85} />
          </mesh>
          {/* Golden Autumn Foliage Crowns */}
          <group position={[0, 3.2, 0]}>
            <mesh position={[0, 0.6, 0]} castShadow>
              <sphereGeometry args={[1.0, 14, 14]} />
              <meshStandardMaterial color={col as string} roughness={0.85} />
            </mesh>
            <mesh position={[-0.5, 0.2, 0.2]} castShadow>
              <sphereGeometry args={[0.78, 12, 12]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.85} />
            </mesh>
            <mesh position={[0.5, 0.2, -0.2]} castShadow>
              <sphereGeometry args={[0.82, 12, 12]} />
              <meshStandardMaterial color="#ea580c" roughness={0.85} />
            </mesh>
          </group>
          {/* Piles of Fallen Leaves under Tree Base */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
            <circleGeometry args={[1.4, 12]} />
            <meshStandardMaterial color="#b45309" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Opposite Sidewalk (Z: 21.6 to 25.0) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 23.3]} receiveShadow>
        <planeGeometry args={[72, 3.4]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.05, 21.6]} receiveShadow>
        <boxGeometry args={[72, 0.1, 0.18]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.5} />
      </mesh>

      {/* ========================================================= */}
      {/* 6. EASTBOUND LANE VEHICLES (+X direction, Z = 15.6) */}
      {/* ========================================================= */}

      {/* VEHICLE 1: YELLOW TAXI CAB */}
      <group ref={taxiRef} position={[-28, 0.14, 15.6]}>
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[2.8, 0.36, 1.4]} />
          <meshStandardMaterial color="#eab308" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[-0.1, 0.54, 0]} castShadow>
          <boxGeometry args={[1.6, 0.34, 1.25]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </mesh>
        <mesh position={[-0.1, 0.78, 0]} castShadow>
          <boxGeometry args={[0.5, 0.16, 0.3]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive={isNight ? '#fde047' : '#000000'}
            emissiveIntensity={isNight ? 2.5 : 0}
          />
        </mesh>
        {/* Headlights */}
        {[-0.45, 0.45].map((hz, hi) => (
          <mesh key={`taxi-hl-${hi}`} position={[1.42, 0.24, hz]}>
            <boxGeometry args={[0.05, 0.12, 0.22]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive={isNight ? '#fde047' : '#ffffff'}
              emissiveIntensity={isNight ? 3.5 : 0.6}
            />
          </mesh>
        ))}
        {/* Taillights */}
        {[-0.48, 0.48].map((tz, ti) => (
          <mesh key={`taxi-tl-${ti}`} position={[-1.42, 0.24, tz]}>
            <boxGeometry args={[0.05, 0.1, 0.2]} />
            <meshStandardMaterial
              color="#ef4444"
              emissive={isNight ? '#ef4444' : '#000000'}
              emissiveIntensity={isNight ? 2.5 : 0}
            />
          </mesh>
        ))}
        {/* Wheels */}
        {[
          [-0.85, 0.68],
          [0.85, 0.68],
          [-0.85, -0.68],
          [0.85, -0.68],
        ].map(([wx, wz], wi) => (
          <mesh
            key={`taxi-w-${wi}`}
            ref={(el) => {
              if (el) taxiWheels.current[wi] = el;
            }}
            position={[wx, 0.12, wz]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.22, 0.22, 0.18, 12]} />
            <meshStandardMaterial color="#18181b" roughness={0.8} />
          </mesh>
        ))}
        {isNight && (
          <pointLight position={[2.0, 0.35, 0]} intensity={4.5} distance={10} color="#fde047" />
        )}
      </group>

      {/* VEHICLE 2: RED SPORT HATCHBACK */}
      <group ref={redCarRef} position={[-11, 0.14, 15.6]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[2.5, 0.32, 1.35]} />
          <meshStandardMaterial color="#dc2626" roughness={0.25} metalness={0.3} />
        </mesh>
        <mesh position={[-0.15, 0.48, 0]} castShadow>
          <boxGeometry args={[1.5, 0.3, 1.18]} />
          <meshStandardMaterial color="#111827" roughness={0.2} />
        </mesh>
        <mesh position={[-1.15, 0.58, 0]} castShadow>
          <boxGeometry args={[0.25, 0.05, 1.1]} />
          <meshStandardMaterial color="#18181b" roughness={0.3} />
        </mesh>
        {/* Headlights */}
        {[-0.42, 0.42].map((hz, hi) => (
          <mesh key={`red-hl-${hi}`} position={[1.27, 0.22, hz]}>
            <boxGeometry args={[0.04, 0.1, 0.2]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive={isNight ? '#fde047' : '#ffffff'}
              emissiveIntensity={isNight ? 3.5 : 0.6}
            />
          </mesh>
        ))}
        {/* Wheels */}
        {[
          [-0.75, 0.65],
          [0.75, 0.65],
          [-0.75, -0.65],
          [0.75, -0.65],
        ].map(([wx, wz], wi) => (
          <mesh
            key={`red-w-${wi}`}
            ref={(el) => {
              if (el) redWheels.current[wi] = el;
            }}
            position={[wx, 0.11, wz]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.2, 0.2, 0.16, 12]} />
            <meshStandardMaterial color="#18181b" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* VEHICLE 3: WHITE DELIVERY VAN */}
      <group ref={vanRef} position={[6, 0.14, 15.6]}>
        <mesh position={[1.1, 0.45, 0]} castShadow>
          <boxGeometry args={[1.2, 0.75, 1.45]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
        <mesh position={[-0.45, 0.68, 0]} castShadow>
          <boxGeometry args={[2.2, 1.2, 1.5]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
        </mesh>
        {/* Blue Delivery Stripe */}
        {[-0.76, 0.76].map((sz, si) => (
          <mesh key={`van-stripe-${si}`} position={[-0.45, 0.75, sz]}>
            <boxGeometry args={[2.0, 0.25, 0.02]} />
            <meshStandardMaterial color="#2563eb" roughness={0.4} />
          </mesh>
        ))}
        {/* Headlights */}
        {[-0.48, 0.48].map((hz, hi) => (
          <mesh key={`van-hl-${hi}`} position={[1.72, 0.28, hz]}>
            <boxGeometry args={[0.05, 0.14, 0.22]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive={isNight ? '#fde047' : '#ffffff'}
              emissiveIntensity={isNight ? 3.5 : 0.6}
            />
          </mesh>
        ))}
        {/* Wheels */}
        {[
          [1.1, 0.72],
          [1.1, -0.72],
          [-0.3, 0.72],
          [-0.3, -0.72],
          [-1.1, 0.72],
          [-1.1, -0.72],
        ].map(([wx, wz], wi) => (
          <mesh
            key={`van-w-${wi}`}
            ref={(el) => {
              if (el) vanWheels.current[wi] = el;
            }}
            position={[wx, 0.13, wz]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.22, 0.22, 0.18, 12]} />
            <meshStandardMaterial color="#18181b" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* VEHICLE 4: ORANGE PICKUP TRUCK */}
      <group ref={pickupRef} position={[23, 0.14, 15.6]}>
        <mesh position={[0.7, 0.4, 0]} castShadow>
          <boxGeometry args={[1.3, 0.7, 1.4]} />
          <meshStandardMaterial color="#ea580c" roughness={0.35} />
        </mesh>
        <mesh position={[-0.6, 0.3, 0]} castShadow>
          <boxGeometry args={[1.6, 0.48, 1.4]} />
          <meshStandardMaterial color="#ea580c" roughness={0.35} />
        </mesh>
        {/* Wooden crates in bed */}
        <mesh position={[-0.6, 0.58, 0]} castShadow>
          <boxGeometry args={[1.1, 0.35, 1.0]} />
          <meshStandardMaterial color="#b45309" roughness={0.8} />
        </mesh>
        {/* Headlights */}
        {[-0.45, 0.45].map((hz, hi) => (
          <mesh key={`pick-hl-${hi}`} position={[1.36, 0.24, hz]}>
            <boxGeometry args={[0.04, 0.12, 0.2]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive={isNight ? '#fde047' : '#ffffff'}
              emissiveIntensity={isNight ? 3.5 : 0.6}
            />
          </mesh>
        ))}
        {/* Wheels */}
        {[
          [0.8, 0.68],
          [0.8, -0.68],
          [-0.7, 0.68],
          [-0.7, -0.68],
        ].map(([wx, wz], wi) => (
          <mesh
            key={`pickup-w-${wi}`}
            ref={(el) => {
              if (el) pickupWheels.current[wi] = el;
            }}
            position={[wx, 0.12, wz]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.22, 0.22, 0.18, 12]} />
            <meshStandardMaterial color="#18181b" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* ========================================================= */}
      {/* 7. WESTBOUND LANE VEHICLES (-X direction, Z = 19.6) */}
      {/* ========================================================= */}

      {/* VEHICLE 5: BLUE FAMILY SEDAN */}
      <group ref={blueCarRef} position={[28, 0.14, 19.6]}>
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[2.8, 0.36, 1.4]} />
          <meshStandardMaterial color="#2563eb" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0.1, 0.54, 0]} castShadow>
          <boxGeometry args={[1.6, 0.34, 1.25]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </mesh>
        {/* Headlights (-X) */}
        {[-0.45, 0.45].map((hz, hi) => (
          <mesh key={`blue-hl-${hi}`} position={[-1.42, 0.24, hz]}>
            <boxGeometry args={[0.05, 0.12, 0.22]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive={isNight ? '#fde047' : '#ffffff'}
              emissiveIntensity={isNight ? 3.5 : 0.6}
            />
          </mesh>
        ))}
        {/* Wheels */}
        {[
          [-0.85, 0.68],
          [0.85, 0.68],
          [-0.85, -0.68],
          [0.85, -0.68],
        ].map(([wx, wz], wi) => (
          <mesh
            key={`blue-w-${wi}`}
            ref={(el) => {
              if (el) blueWheels.current[wi] = el;
            }}
            position={[wx, 0.12, wz]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.22, 0.22, 0.18, 12]} />
            <meshStandardMaterial color="#18181b" roughness={0.8} />
          </mesh>
        ))}
        {isNight && (
          <pointLight position={[-2.0, 0.35, 0]} intensity={4.5} distance={10} color="#fde047" />
        )}
      </group>

      {/* VEHICLE 6: VIETNAMESE MOTOR SCOOTER WITH RIDER */}
      <group ref={scooterRef} position={[12, 0.14, 19.6]}>
        <mesh position={[0, 0.18, 0]} castShadow>
          <boxGeometry args={[1.2, 0.16, 0.35]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} />
        </mesh>
        <mesh position={[-0.45, 0.42, 0]} castShadow>
          <boxGeometry args={[0.25, 0.45, 0.3]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} />
        </mesh>
        <mesh position={[-0.45, 0.68, 0]}>
          <boxGeometry args={[0.06, 0.06, 0.55]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.58, 0.52, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive={isNight ? '#fde047' : '#ffffff'}
            emissiveIntensity={isNight ? 3.5 : 0.6}
          />
        </mesh>
        {/* Rider */}
        <group position={[0.05, 0.38, 0]}>
          <mesh position={[0, 0.24, 0]} castShadow>
            <cylinderGeometry args={[0.14, 0.16, 0.4, 8]} />
            <meshStandardMaterial color="#16a34a" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.52, 0]} castShadow>
            <sphereGeometry args={[0.15, 10, 10]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.4} />
          </mesh>
          <mesh position={[-0.1, 0.52, 0]}>
            <boxGeometry args={[0.08, 0.1, 0.18]} />
            <meshStandardMaterial color="#0f172a" roughness={0.1} />
          </mesh>
        </group>
        {/* Wheels */}
        {[-0.45, 0.45].map((wx, wi) => (
          <mesh
            key={`scoot-w-${wi}`}
            ref={(el) => {
              if (el) scooterWheels.current[wi] = el;
            }}
            position={[wx, 0.1, 0]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.14, 0.14, 0.1, 10]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* VEHICLE 7: MINT GREEN RETRO COMPACT */}
      <group ref={mintCarRef} position={[-4, 0.14, 19.6]}>
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[2.4, 0.32, 1.3]} />
          <meshStandardMaterial color="#6ee7b7" roughness={0.3} />
        </mesh>
        <mesh position={[0.1, 0.52, 0]} castShadow>
          <boxGeometry args={[1.4, 0.32, 1.15]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        {/* Headlights (-X) */}
        {[-0.42, 0.42].map((hz, hi) => (
          <mesh key={`mint-hl-${hi}`} position={[-1.22, 0.24, hz]}>
            <sphereGeometry args={[0.09, 8, 8]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive={isNight ? '#fde047' : '#ffffff'}
              emissiveIntensity={isNight ? 3.5 : 0.6}
            />
          </mesh>
        ))}
        {/* Wheels */}
        {[
          [-0.7, 0.62],
          [0.7, 0.62],
          [-0.7, -0.62],
          [0.7, -0.62],
        ].map(([wx, wz], wi) => (
          <mesh
            key={`mint-w-${wi}`}
            ref={(el) => {
              if (el) mintWheels.current[wi] = el;
            }}
            position={[wx, 0.11, wz]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.2, 0.2, 0.16, 12]} />
            <meshStandardMaterial color="#18181b" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* VEHICLE 8: SILVER MODERN SUV */}
      <group ref={suvRef} position={[-21, 0.14, 19.6]}>
        <mesh position={[0, 0.26, 0]} castShadow>
          <boxGeometry args={[3.0, 0.42, 1.45]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.35} />
        </mesh>
        <mesh position={[0.1, 0.62, 0]} castShadow>
          <boxGeometry args={[1.8, 0.38, 1.35]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} />
        </mesh>
        {/* Headlights (-X) */}
        {[-0.46, 0.46].map((hz, hi) => (
          <mesh key={`suv-hl-${hi}`} position={[-1.52, 0.28, hz]}>
            <boxGeometry args={[0.05, 0.12, 0.24]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive={isNight ? '#fde047' : '#ffffff'}
              emissiveIntensity={isNight ? 3.5 : 0.6}
            />
          </mesh>
        ))}
        {/* Wheels */}
        {[
          [-0.9, 0.72],
          [0.9, 0.72],
          [-0.9, -0.72],
          [0.9, -0.72],
        ].map(([wx, wz], wi) => (
          <mesh
            key={`suv-w-${wi}`}
            ref={(el) => {
              if (el) suvWheels.current[wi] = el;
            }}
            position={[wx, 0.14, wz]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.24, 0.24, 0.2, 12]} />
            <meshStandardMaterial color="#18181b" roughness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
