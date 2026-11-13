import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { soundManager } from '../../audio/soundManager';
import { INTERACTIVE_OBJECTS } from '../../data/zones';

export interface MovementInput {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  sprint: boolean;
}

interface FirstPersonControllerProps {
  isLocked: boolean;
  onLockChange: (locked: boolean) => void;
  mouseSensitivity: number; // e.g. 1.0 (multiplier)
  externalInput?: MovementInput;
  activePath: [number, number, number][] | null;
  onPathComplete?: () => void;
  onHoverObject?: (objectId: string | null) => void;
  onInteractObject?: (objectId: string) => void;
  isPaused: boolean;
  onTouchLookDelta?: { x: number; y: number } | null;
}

// Solid obstacle AABB bounds [minX, maxX, minZ, maxZ, minY, maxY]
interface ObstacleBox {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  minY: number;
  maxY: number;
}

const OBSTACLES: ObstacleBox[] = [
  // 1. Exterior Front Windows & Facade (Grand Open Main Entrance Doorway at X: [-0.6, 3.6], Z = 8.0)
  { minX: -13.5, maxX: -0.6, minZ: 7.6, maxZ: 8.4, minY: 0, maxY: 7.5 },
  { minX: 3.6, maxX: 13.5, minZ: 7.6, maxZ: 8.4, minY: 0, maxY: 7.5 },
  // Golden Arches Entrance Portal Outer Legs (corridor from X = -0.2 to +3.2 is 3.4m wide)
  { minX: -0.85, maxX: -0.20, minZ: 8.0, maxZ: 8.6, minY: 0, maxY: 3.5 },
  { minX: 3.20, maxX: 3.85, minZ: 8.0, maxZ: 8.6, minY: 0, maxY: 3.5 },

  // 2. Central Aquarium Tank (bệ đá + kính)
  { minX: -4.5, maxX: 2.1, minZ: -2.4, maxZ: 3.2, minY: 0, maxY: 4.5 },

  // 3. Dining Tables & Wooden Benches
  // Table 1 (Front Table)
  { minX: -9.9, maxX: -7.1, minZ: 0.9, maxZ: 3.5, minY: 0, maxY: 2.0 },
  // Table 2 (Back Table)
  { minX: -9.9, maxX: -7.1, minZ: -3.8, maxZ: -1.2, minY: 0, maxY: 2.0 },

  // 4. Back Wall Counters & Displays
  // LEGO Creative Toy Rack
  { minX: -5.8, maxX: -2.2, minZ: -10.5, maxZ: -9.2, minY: 0, maxY: 2.5 },
  // Tủ Cây Thủy Sinh & Lilac Cabinet
  { minX: -2.2, maxX: 4.0, minZ: -10.5, maxZ: -9.2, minY: 0, maxY: 2.8 },

  // 5. Kids Room Left Partition Wall (Doorway is at Z: [-6.4, -4.8])
  { minX: 5.1, maxX: 5.6, minZ: -10.5, maxZ: -6.4, minY: 0, maxY: 7.5 },

  // 6. Exterior Decorative Trees
  { minX: -11.8, maxX: -10.6, minZ: 10.4, maxZ: 11.6, minY: 0, maxY: 4.0 },
  { minX: 10.6, maxX: 11.8, minZ: 10.4, maxZ: 11.6, minY: 0, maxY: 4.0 },

  // 7. Mezzanine Railings (Only blocks when player is on Mezzanine Y >= 4.0)
  // Back Gallery Front Edge Railing (except stairs landing at X: [5.6, 7.4])
  { minX: -12.5, maxX: 5.5, minZ: -5.7, maxZ: -5.3, minY: 4.0, maxY: 6.5 },
  // Right McCafé Gallery Inner Edge Railing
  { minX: 5.3, maxX: 5.7, minZ: -5.4, maxZ: 2.2, minY: 4.0, maxY: 6.5 },
  // McCafé Service Counter
  { minX: 7.2, maxX: 10.2, minZ: -4.5, maxZ: -2.5, minY: 4.0, maxY: 6.5 },

  // 8. Surrounding Neighborhood Low-Rise Residential Houses
  // Left Neighborhood Row Houses
  { minX: -24.0, maxX: -16.5, minZ: -10.5, maxZ: 14.0, minY: 0, maxY: 8.0 },
  // Right Neighborhood Row Houses
  { minX: 16.5, maxX: 24.0, minZ: -10.5, maxZ: 14.0, minY: 0, maxY: 8.0 },
  // Front Neighborhood Row Houses (Across Street)
  { minX: -20.0, maxX: 20.0, minZ: 24.5, maxZ: 32.0, minY: 0, maxY: 8.0 },
];

export const FirstPersonController: React.FC<FirstPersonControllerProps> = ({
  isLocked,
  onLockChange,
  mouseSensitivity,
  externalInput,
  activePath,
  onPathComplete,
  onHoverObject,
  onInteractObject,
  isPaused,
  onTouchLookDelta,
}) => {
  const { camera, gl } = useThree();

  // Player state: Position, Yaw, Pitch
  const pos = useRef(new THREE.Vector3(1.5, 0, 12.5)); // Start on sidewalk facing entrance
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const yaw = useRef(Math.PI); // Facing -Z (toward the restaurant)
  const pitch = useRef(0); // Level head

  // Input states
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
  });

  // Stride & footsteps
  const stridePhase = useRef(0);
  const lastFootstepTime = useRef(0);

  // Auto-walk state
  const currentPathIndex = useRef(0);

  // Interaction raycasting
  const hoveredObjectId = useRef<string | null>(null);

  // Setup camera FOV for human perspective
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 76;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  // Pointer lock change listeners
  useEffect(() => {
    const handlePointerLockChange = () => {
      const locked = document.pointerLockElement === gl.domElement;
      onLockChange(locked);
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, [gl, onLockChange]);

  // Desktop Mouse Move listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isLocked || isPaused) return;

      const baseSensitivity = 0.0022 * mouseSensitivity;
      yaw.current -= e.movementX * baseSensitivity;
      pitch.current -= e.movementY * baseSensitivity;

      // Clamp vertical head pitch between -80° and +80° (-1.4 rad to +1.4 rad)
      pitch.current = Math.max(-1.38, Math.min(1.38, pitch.current));
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isLocked, isPaused, mouseSensitivity]);

  // Apply touch look delta (from mobile touch-drag swipe)
  useEffect(() => {
    if (!onTouchLookDelta || isPaused) return;
    const touchSensitivity = 0.0035 * mouseSensitivity;
    yaw.current -= onTouchLookDelta.x * touchSensitivity;
    pitch.current -= onTouchLookDelta.y * touchSensitivity;
    pitch.current = Math.max(-1.38, Math.min(1.38, pitch.current));
  }, [onTouchLookDelta, isPaused, mouseSensitivity]);

  // Desktop Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused) return;

      // Ignore if typing in text inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.sprint = true;
          break;
        case 'KeyE':
          if (hoveredObjectId.current) {
            onInteractObject?.(hoveredObjectId.current);
          }
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.sprint = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPaused, onInteractObject]);

  // Reset auto-walk path when new path is provided
  useEffect(() => {
    if (activePath && activePath.length > 0) {
      currentPathIndex.current = 0;
    }
  }, [activePath]);

  // Collision helper: test whether a candidate (x, z) at elevation y collides
  const checkCollision = (cx: number, cz: number, cy: number, radius = 0.38): boolean => {
    // Diorama outer boundaries (Expanded for sidewalks, street crosswalk & opposite sidewalk)
    if (cx < -16.5 || cx > 16.5) return true;
    if (cz < -10.0 || cz > 24.5) return true;

    for (const ob of OBSTACLES) {
      // Check if vertical range overlaps
      if (cy + 1.6 >= ob.minY && cy <= ob.maxY) {
        if (
          cx + radius > ob.minX &&
          cx - radius < ob.maxX &&
          cz + radius > ob.minZ &&
          cz - radius < ob.maxZ
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // Calculate floor surface elevation: ground (0), staircase ramp (0 -> 4.8), or mezzanine (4.8)
  const getFloorElevation = (px: number, pz: number, currentY: number): number => {
    // Staircase ramp footprint: X: [5.6, 7.4], Z: [-6.2, 0.0]
    if (px >= 5.6 && px <= 7.4 && pz <= 0.1 && pz >= -6.3) {
      // Incline parameter t: 0 at Z = 0, 1 at Z = -6.0
      const t = Math.max(0, Math.min(1, (-pz - 0.0) / 6.0));
      return t * 4.8;
    }

    // Elevated Mezzanine floor (Y = 4.8):
    // Back wing: X: [-12.5, 12.0], Z: [-10.5, -5.5]
    // Right wing: X: [5.5, 11.8], Z: [-6.5, 2.2]
    const onMezzanineBack = px >= -12.5 && px <= 12.0 && pz >= -10.5 && pz <= -5.5;
    const onMezzanineRight = px >= 5.5 && px <= 11.8 && pz >= -6.5 && pz <= 2.2;

    if ((onMezzanineBack || onMezzanineRight) && currentY >= 3.6) {
      return 4.8;
    }

    // Ground floor (indoor & outdoor)
    return 0;
  };

  // Determine current floor surface material for footsteps
  const getSurfaceType = (px: number, pz: number, py: number): 'tile' | 'wood' | 'sidewalk' | 'carpet' => {
    if (py > 0.5) return 'wood'; // Staircase and mezzanine
    if (pz > 8.0) return 'sidewalk'; // Outside sidewalk
    if (px > 5.2 && pz < -5.5) return 'carpet'; // Kids room green mat
    return 'tile'; // Main restaurant tile floor
  };

  // Frame update
  useFrame((state, delta) => {
    if (isPaused) return;

    const clampedDelta = Math.min(delta, 0.08);

    // Merge keyboard + external on-screen/mobile movement inputs
    const forward = keys.current.forward || (externalInput?.forward ?? false);
    const backward = keys.current.backward || (externalInput?.backward ?? false);
    const left = keys.current.left || (externalInput?.left ?? false);
    const right = keys.current.right || (externalInput?.right ?? false);
    const sprint = keys.current.sprint || (externalInput?.sprint ?? false);

    const isMovingManual = forward || backward || left || right;

    // AUTO-WALK WAYPOINT PATHFINDING
    if (activePath && activePath.length > 0 && !isMovingManual) {
      const targetPoint = activePath[currentPathIndex.current];
      if (targetPoint) {
        const dx = targetPoint[0] - pos.current.x;
        const dz = targetPoint[2] - pos.current.z;
        const distToPoint = Math.hypot(dx, dz);

        if (distToPoint < 0.35) {
          // Reached this waypoint, advance to next
          currentPathIndex.current++;
          if (currentPathIndex.current >= activePath.length) {
            onPathComplete?.();
          }
        } else {
          // Move toward targetPoint
          const desiredYaw = Math.atan2(-dx, -dz);
          // Smoothly rotate yaw toward target
          let angleDiff = desiredYaw - yaw.current;
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
          yaw.current += angleDiff * Math.min(clampedDelta * 8.0, 1.0);

          const autoSpeed = 4.2;
          const moveDist = Math.min(distToPoint, autoSpeed * clampedDelta);
          const moveX = (dx / distToPoint) * moveDist;
          const moveZ = (dz / distToPoint) * moveDist;

          // Apply with collision check
          if (!checkCollision(pos.current.x + moveX, pos.current.z, pos.current.y)) {
            pos.current.x += moveX;
          }
          if (!checkCollision(pos.current.x, pos.current.z + moveZ, pos.current.y)) {
            pos.current.z += moveZ;
          }

          // Step cadence
          stridePhase.current += clampedDelta * 10;
          if (state.clock.elapsedTime - lastFootstepTime.current > 0.38) {
            soundManager.playFootstep(getSurfaceType(pos.current.x, pos.current.z, pos.current.y));
            lastFootstepTime.current = state.clock.elapsedTime;
          }
        }
      }
    } else {
      // MANUAL PLAYER MOVEMENT (WASD / D-Pad / Joystick)
      let inputX = 0;
      let inputZ = 0;

      if (forward) inputZ += 1;
      if (backward) inputZ -= 1;
      if (left) inputX -= 1;
      if (right) inputX += 1;

      // Normalize diagonal vector
      const len = Math.hypot(inputX, inputZ);
      if (len > 0) {
        inputX /= len;
        inputZ /= len;
      }

      const moveSpeed = sprint ? 6.2 : 3.8;
      // Forward vector in horizontal plane
      const fwdX = -Math.sin(yaw.current);
      const fwdZ = -Math.cos(yaw.current);
      // Right vector in horizontal plane (90 degrees clockwise from forward)
      const rightX = Math.cos(yaw.current);
      const rightZ = -Math.sin(yaw.current);

      // Target velocities: inputZ (+1 = forward, -1 = back), inputX (+1 = right, -1 = left)
      const targetVelX = (fwdX * inputZ + rightX * inputX) * moveSpeed;
      const targetVelZ = (fwdZ * inputZ + rightZ * inputX) * moveSpeed;

      // Smooth acceleration & deceleration (friction)
      const accel = len > 0 ? 14.0 : 18.0;
      velocity.current.x = THREE.MathUtils.lerp(velocity.current.x, targetVelX, clampedDelta * accel);
      velocity.current.z = THREE.MathUtils.lerp(velocity.current.z, targetVelZ, clampedDelta * accel);

      // Attempt movement along X and Z independently to allow wall-sliding
      const deltaX = velocity.current.x * clampedDelta;
      const deltaZ = velocity.current.z * clampedDelta;

      const newX = pos.current.x + deltaX;
      const newZ = pos.current.z + deltaZ;

      if (!checkCollision(newX, pos.current.z, pos.current.y)) {
        pos.current.x = newX;
      } else {
        velocity.current.x = 0;
      }

      if (!checkCollision(pos.current.x, newZ, pos.current.y)) {
        pos.current.z = newZ;
      } else {
        velocity.current.z = 0;
      }

      // Footstep audio cadence & head bobbing
      const currentSpeed = Math.hypot(velocity.current.x, velocity.current.z);
      if (currentSpeed > 0.4) {
        const bobRate = sprint ? 13 : 9;
        stridePhase.current += clampedDelta * bobRate;

        const footstepInterval = sprint ? 0.3 : 0.45;
        if (state.clock.elapsedTime - lastFootstepTime.current > footstepInterval) {
          soundManager.playFootstep(getSurfaceType(pos.current.x, pos.current.z, pos.current.y));
          lastFootstepTime.current = state.clock.elapsedTime;
        }
      }
    }

    // Update vertical elevation (floor detection & stairs)
    const targetFloorY = getFloorElevation(pos.current.x, pos.current.z, pos.current.y);
    pos.current.y = THREE.MathUtils.lerp(pos.current.y, targetFloorY, clampedDelta * 12.0);

    // Subtle natural head bob
    const currentSpeed = Math.hypot(velocity.current.x, velocity.current.z);
    const bobAmount = currentSpeed > 0.3 ? (keys.current.sprint ? 0.05 : 0.035) : 0;
    const headBobY = Math.sin(stridePhase.current) * bobAmount;
    const headBobX = Math.cos(stridePhase.current * 0.5) * (bobAmount * 0.6);

    // Set camera position at human eye height (1.6 units above floor)
    const eyeHeight = 1.6;
    camera.position.set(
      pos.current.x + headBobX,
      pos.current.y + eyeHeight + headBobY,
      pos.current.z
    );

    // Apply head rotation: yaw (horizontal) and pitch (vertical)
    camera.rotation.order = 'YXZ';
    camera.rotation.y = yaw.current;
    camera.rotation.x = pitch.current;
    camera.rotation.z = headBobX * 0.02; // subtle head tilt while walking

    // INTERACTION RAYCASTING: Detect interactive object in center of crosshair
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);

    let nearestObjId: string | null = null;
    let nearestDist = 4.5; // Max interaction distance

    for (const obj of INTERACTIVE_OBJECTS) {
      const objPos = new THREE.Vector3(...obj.position);
      const distToPlayer = camera.position.distanceTo(objPos);

      if (distToPlayer <= nearestDist) {
        // Ray-sphere intersection check
        const dir = new THREE.Vector3();
        camera.getWorldDirection(dir);
        const toObj = objPos.clone().sub(camera.position);
        const projection = toObj.dot(dir);

        if (projection > 0) {
          const closestPoint = camera.position.clone().add(dir.clone().multiplyScalar(projection));
          const perpDist = closestPoint.distanceTo(objPos);
          if (perpDist < 1.2 && distToPlayer < nearestDist) {
            nearestDist = distToPlayer;
            nearestObjId = obj.id;
          }
        }
      }
    }

    if (nearestObjId !== hoveredObjectId.current) {
      hoveredObjectId.current = nearestObjId;
      onHoverObject?.(nearestObjId);
    }
  });

  return null;
};
