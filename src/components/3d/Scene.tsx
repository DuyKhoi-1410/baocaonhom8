import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { RestaurantModel } from './RestaurantModel';
import { FirstPersonController, type MovementInput } from './FirstPersonController';
import { CelestialSky } from './CelestialSky';
import type { ZoneId } from '../../types';
import { ZONES, INTERACTIVE_OBJECTS } from '../../data/zones';

interface CameraAnimatorProps {
  activeZone: ZoneId;
  selectedObjectId: string | null;
}

const CameraAnimator: React.FC<CameraAnimatorProps> = ({ activeZone, selectedObjectId }) => {
  const { camera } = useThree();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);
  const targetPos = useRef(new THREE.Vector3(22, 20, 26));
  const targetLookAt = useRef(new THREE.Vector3(0, 2.5, 0));
  const isTransitioning = useRef(true);

  // Update target when activeZone or selectedObjectId changes
  useEffect(() => {
    if (selectedObjectId) {
      const obj = INTERACTIVE_OBJECTS.find((o) => o.id === selectedObjectId);
      if (obj) {
        targetLookAt.current.set(obj.position[0], obj.position[1], obj.position[2]);
        targetPos.current.set(
          obj.position[0] + 4.2,
          obj.position[1] + 3.2,
          obj.position[2] + 5.2
        );
        isTransitioning.current = true;
        return;
      }
    }

    const zone = ZONES.find((z) => z.id === activeZone);
    if (zone) {
      targetPos.current.set(...zone.cameraPosition);
      targetLookAt.current.set(...zone.targetPosition);
      isTransitioning.current = true;
    }
  }, [activeZone, selectedObjectId]);

  useFrame((_, delta) => {
    if (controlsRef.current && isTransitioning.current) {
      const lerpSpeed = Math.min(delta * 3.5, 0.15);

      camera.position.lerp(targetPos.current, lerpSpeed);
      controlsRef.current.target.lerp(targetLookAt.current, lerpSpeed);
      controlsRef.current.update();

      if (
        camera.position.distanceTo(targetPos.current) < 0.1 &&
        controlsRef.current.target.distanceTo(targetLookAt.current) < 0.1
      ) {
        isTransitioning.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2 + 0.05} // Do not go under floor
      minDistance={4}
      maxDistance={85} // Expanded to allow viewing full neighborhood town
      onStart={() => {
        isTransitioning.current = false;
      }}
    />
  );
};

interface SceneProps {
  activeZone: ZoneId;
  selectedObjectId: string | null;
  onObjectClick: (id: string) => void;
  isNight: boolean;
  showPins: boolean;
  cameraMode: 'first-person' | 'overview';
  isLocked: boolean;
  onLockChange: (locked: boolean) => void;
  mouseSensitivity: number;
  externalMovementInput?: MovementInput;
  activePath: [number, number, number][] | null;
  onPathComplete?: () => void;
  onHoverObject?: (objectId: string | null) => void;
  isPaused: boolean;
  touchLookDelta?: { x: number; y: number } | null;
  onCanvasClick?: () => void;
}

export const Scene: React.FC<SceneProps> = ({
  activeZone,
  selectedObjectId,
  onObjectClick,
  isNight,
  showPins,
  cameraMode,
  isLocked,
  onLockChange,
  mouseSensitivity,
  externalMovementInput,
  activePath,
  onPathComplete,
  onHoverObject,
  isPaused,
  touchLookDelta,
  onCanvasClick,
}) => {
  return (
    <Canvas
      shadows
      camera={{ position: [1.5, 1.6, 12.5], fov: 76 }}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: isNight ? 1.25 : 1.15,
      }}
      onClick={onCanvasClick}
      className={`w-full h-full ${
        cameraMode === 'first-person'
          ? isLocked
            ? 'cursor-none'
            : 'cursor-crosshair'
          : 'cursor-grab active:cursor-grabbing'
      }`}
    >
      {/* Dynamic Lighting System */}
      {isNight ? (
        // MAGICAL COZY NIGHT MODE LIGHTING (Warm golden glow with glowing neon accents)
        <>
          <color attach="background" args={['#040714']} />
          {/* Warm Golden Interior Ambient Bounce */}
          <ambientLight intensity={0.42} color="#fed7aa" />
          {/* Dual Hemisphere Light: Warm Amber Sky + Deep Indigo Ground */}
          <hemisphereLight args={['#fef3c7', '#0f172a', 0.55]} />

          {/* Soft Silvery-Blue Moonlight Casting Delicate Shadows */}
          <directionalLight
            position={[14, 28, 16]}
            intensity={0.35}
            color="#93c5fd"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-near={0.5}
            shadow-camera-far={80}
            shadow-camera-left={-32}
            shadow-camera-right={32}
            shadow-camera-top={32}
            shadow-camera-bottom={-32}
            shadow-bias={-0.0001}
          />

          {/* Central Main Restaurant Warm Golden Flood */}
          <pointLight position={[0, 5.2, -1.0]} intensity={5.5} distance={25} color="#f59e0b" />

          {/* Golden Arches Storefront Entrance Portal Glow */}
          <pointLight position={[1.5, 6.2, 8.8]} intensity={6.0} distance={18} color="#fbbf24" />

          {/* Street & Neighborhood Warm Ambient Illumination */}
          <pointLight position={[0, 4.5, 17.5]} intensity={3.5} distance={30} color="#fed7aa" />

          {/* McCafé Golden Warm Spot */}
          <pointLight position={[8.5, 7.2, -3.5]} intensity={5.0} distance={15} color="#f59e0b" />

          {/* Aquarium Bioluminescent Cyan Ocean Glow (Magical Jewel Contrast!) */}
          <pointLight position={[-1.2, 3.0, 0.4]} intensity={5.0} distance={12} color="#06b6d4" />

          {/* Hydroponic Cabinet Lush Botanical Grow Glow */}
          <pointLight position={[0.6, 2.4, -9.8]} intensity={4.5} distance={9} color="#86efac" />

          {/* Kids Room Playful Warm Light */}
          <pointLight position={[8.5, 4.8, -6.8]} intensity={4.2} distance={12} color="#fef08a" />

          {/* Da Nang Dragon Bridge Fiery Backlight & Fireworks */}
          <pointLight position={[-1.0, 7.5, -9.5]} intensity={5.5} distance={18} color="#ea580c" />
        </>
      ) : (
        // DAY MODE LIGHTING (Warm Natural Sunlight in Azure Sky)
        <>
          <color attach="background" args={['#bae6fd']} />
          <ambientLight intensity={0.78} color="#fffbeb" />
          <directionalLight
            position={[18, 28, 22]}
            intensity={1.7}
            color="#fffdf0"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-near={0.5}
            shadow-camera-far={80}
            shadow-camera-left={-32}
            shadow-camera-right={32}
            shadow-camera-top={32}
            shadow-camera-bottom={-32}
            shadow-bias={-0.0002}
          />
          {/* Fill Skylight */}
          <directionalLight position={[-16, 20, -14]} intensity={0.45} color="#bae6fd" />
          {/* Interior Bounce Light */}
          <pointLight position={[0, 5, 0]} intensity={0.9} distance={22} color="#fef3c7" />
        </>
      )}

      {/* Celestial Sky: Sun/Moon, Drifting Clouds & Starry Night */}
      <CelestialSky isNight={isNight} />

      {/* Controller: First-Person Human Walk vs Drone Orbit Overview */}
      {cameraMode === 'first-person' ? (
        <FirstPersonController
          isLocked={isLocked}
          onLockChange={onLockChange}
          mouseSensitivity={mouseSensitivity}
          externalInput={externalMovementInput}
          activePath={activePath}
          onPathComplete={onPathComplete}
          onHoverObject={onHoverObject}
          onInteractObject={onObjectClick}
          isPaused={isPaused}
          onTouchLookDelta={touchLookDelta}
        />
      ) : (
        <CameraAnimator activeZone={activeZone} selectedObjectId={selectedObjectId} />
      )}

      {/* The 3D Miniature Restaurant Model */}
      <RestaurantModel
        onObjectClick={onObjectClick}
        isNight={isNight}
        showPins={cameraMode === 'overview' ? showPins : false}
      />

      {/* Realistic Soft Contact Shadows on Ground */}
      <ContactShadows
        position={[0, -0.12, 8.0]}
        opacity={0.65}
        scale={62}
        blur={1.8}
        far={8}
        color={isNight ? '#020617' : '#475569'}
      />
    </Canvas>
  );
};
