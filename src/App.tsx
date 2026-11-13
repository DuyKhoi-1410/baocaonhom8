import { useState, useEffect, useCallback, useRef } from 'react';
import { Scene } from './components/3d/Scene';
import { Header } from './components/ui/Header';
import { NavigationDock } from './components/ui/NavigationDock';
import { FirstPersonHUD } from './components/ui/FirstPersonHUD';
import { PauseMenu } from './components/ui/PauseMenu';
import { InfoModal } from './components/ui/InfoModal';
import { PhotoGalleryModal } from './components/ui/PhotoGalleryModal';
import { HelpOverlay } from './components/ui/HelpOverlay';
import type { ZoneId } from './types';
import { ZONES, INTERACTIVE_OBJECTS } from './data/zones';
import { soundManager } from './audio/soundManager';
import { ZONE_PRIMARY_WAYPOINTS, findWalkPath } from './data/navigationGraph';
import type { MovementInput } from './components/3d/FirstPersonController';
import { Eye, EyeOff, Footprints } from 'lucide-react';

export function App() {
  // Gameplay & Exploration Mode: Default to 'overview' so users directly see the full diorama
  const [cameraMode, setCameraMode] = useState<'first-person' | 'overview'>('overview');
  const [isLocked, setIsLocked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mouseSensitivity, setMouseSensitivity] = useState(1.0);
  const [hideUI, setHideUI] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Interaction & Navigation State
  const [activeZone, setActiveZone] = useState<ZoneId>('overview');
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [hoveredObjectId, setHoveredObjectId] = useState<string | null>(null);
  const [activeNavZoneId, setActiveNavZoneId] = useState<ZoneId | null>(null);
  const [activePath, setActivePath] = useState<[number, number, number][] | null>(null);

  // Controls & Modals State
  const [externalMovement, setExternalMovement] = useState<MovementInput>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
  });
  const [touchLookDelta, setTouchLookDelta] = useState<{ x: number; y: number } | null>(null);

  const [isNight, setIsNight] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPins, setShowPins] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [initialGalleryPhoto, setInitialGalleryPhoto] = useState<string | null>(null);

  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Request pointer lock on canvas element
  const requestPointerLock = useCallback(() => {
    if (cameraMode !== 'first-person') return;
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.requestPointerLock().catch(() => {});
    }
  }, [cameraMode]);

  // Release pointer lock
  const exitPointerLock = useCallback(() => {
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  }, []);

  // SWITCH TO FIRST PERSON WALKTHROUGH
  const handleStartFPS = useCallback(() => {
    soundManager.playZoneTransition();
    setCameraMode('first-person');
    setIsPaused(false);
    requestPointerLock();
  }, [requestPointerLock]);

  // SWITCH TO OVERVIEW DRONE MODE
  const handleStartOverview = useCallback(() => {
    soundManager.playClick();
    setCameraMode('overview');
    setIsPaused(false);
    exitPointerLock();
  }, [exitPointerLock]);

  // PAUSE & RESUME
  const handlePause = useCallback(() => {
    exitPointerLock();
    setIsPaused(true);
  }, [exitPointerLock]);

  const handleResume = useCallback(() => {
    setIsPaused(false);
    if (cameraMode === 'first-person') {
      requestPointerLock();
    }
  }, [cameraMode, requestPointerLock]);

  // RESET TO ENTRANCE
  const handleResetToEntrance = useCallback(() => {
    setActiveZone('exterior');
    setActiveNavZoneId('exterior');
    const path = findWalkPath('wp-foyer-front', 'wp-exterior-sidewalk');
    setActivePath(path);
    setIsPaused(false);
    if (cameraMode === 'first-person') {
      requestPointerLock();
    }
  }, [cameraMode, requestPointerLock]);

  // CAMERA MODE TOGGLE
  const handleToggleCameraMode = useCallback(() => {
    if (cameraMode === 'overview') {
      handleStartFPS();
    } else {
      handleStartOverview();
    }
  }, [cameraMode, handleStartFPS, handleStartOverview]);

  // OVERVIEW ZONE SELECTION
  const handleSelectZone = useCallback((zoneId: ZoneId) => {
    setActiveZone(zoneId);
    setSelectedObjectId(null);
  }, []);

  // RESET OVERVIEW CAMERA
  const handleResetCamera = useCallback(() => {
    setActiveZone('overview');
    setSelectedObjectId(null);
  }, []);

  // ROOM NAVIGATION PATHFINDING (in FPS mode)
  const handleSelectZonePath = useCallback((zoneId: ZoneId) => {
    setActiveZone(zoneId);
    setSelectedObjectId(null);

    if (cameraMode === 'first-person') {
      setActiveNavZoneId(zoneId);
      const targetWp = ZONE_PRIMARY_WAYPOINTS[zoneId] || 'wp-foyer-front';
      const path = findWalkPath('wp-foyer-front', targetWp);
      setActivePath(path);
    }
  }, [cameraMode]);

  // OBJECT INTERACTION
  const handleInteractObject = useCallback((objectId: string) => {
    exitPointerLock();
    setSelectedObjectId(objectId);
    const obj = INTERACTIVE_OBJECTS.find((o) => o.id === objectId);
    if (obj) {
      setActiveZone(obj.zoneId);
    }
  }, [exitPointerLock]);

  // CANVAS CLICK (Re-lock pointer in FPS mode)
  const handleCanvasClick = useCallback(() => {
    if (cameraMode === 'first-person' && !isPaused && !selectedObjectId && !showPhotoGallery && !showHelp) {
      requestPointerLock();
    }
  }, [cameraMode, isPaused, selectedObjectId, showPhotoGallery, showHelp, requestPointerLock]);

  // Keyboard shortcut listener (ESC to pause or return to overview)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in text inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Escape') {
        if (selectedObjectId) {
          setSelectedObjectId(null);
          if (cameraMode === 'first-person') requestPointerLock();
          return;
        }
        if (showPhotoGallery) {
          setShowPhotoGallery(false);
          return;
        }
        if (showHelp) {
          setShowHelp(false);
          return;
        }

        if (cameraMode === 'first-person') {
          if (!isPaused) {
            handlePause();
          } else {
            handleResume();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cameraMode, isPaused, selectedObjectId, showPhotoGallery, showHelp, handlePause, handleResume, requestPointerLock]);

  const activeZoneConfig = ZONES.find((z) => z.id === activeZone) || null;
  const selectedObjectConfig = INTERACTIVE_OBJECTS.find((o) => o.id === selectedObjectId) || null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-stone-950 font-sans select-none">
      {/* Main 3D Canvas Scene */}
      <div ref={canvasContainerRef} className="absolute inset-0 z-0">
        <Scene
          activeZone={activeZone}
          selectedObjectId={selectedObjectId}
          onObjectClick={handleInteractObject}
          isNight={isNight}
          showPins={cameraMode === 'overview' && showPins}
          cameraMode={cameraMode}
          isLocked={isLocked}
          onLockChange={setIsLocked}
          mouseSensitivity={mouseSensitivity}
          externalMovementInput={externalMovement}
          activePath={activePath}
          onPathComplete={() => {
            setActivePath(null);
            setActiveNavZoneId(null);
          }}
          onHoverObject={setHoveredObjectId}
          isPaused={isPaused}
          touchLookDelta={touchLookDelta}
          onCanvasClick={handleCanvasClick}
        />
      </div>

      {/* OVERVIEW MODE USER INTERFACE (Default View) */}
      {cameraMode === 'overview' && !hideUI && (
        <>
          {/* Top Header */}
          <Header
            isNight={isNight}
            onToggleNight={() => setIsNight((prev) => !prev)}
            isMuted={isMuted}
            onToggleMute={() => {
              const next = !isMuted;
              setIsMuted(next);
              soundManager.setMuted(next);
            }}
            showPins={showPins}
            onTogglePins={() => setShowPins((prev) => !prev)}
            onResetCamera={handleResetCamera}
            onOpenPhotoGallery={() => setShowPhotoGallery(true)}
            onToggleHelp={() => setShowHelp(true)}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
            cameraMode={cameraMode}
            onToggleCameraMode={handleStartFPS}
          />

          {/* Bottom Floating Navigation Dock */}
          <NavigationDock
            activeZone={activeZone}
            onSelectZone={handleSelectZone}
          />

          {/* Center-Top Floating Callout: Direct invitation to enter First-Person POV */}
          {activeZone === 'overview' && !selectedObjectId && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 pointer-events-auto flex items-center gap-2">
              <div className="px-4 py-2 rounded-full bg-stone-900/85 backdrop-blur-md border border-white/10 text-xs font-medium text-stone-200 shadow-xl flex items-center gap-3">
                <span className="text-stone-400 hidden md:inline">
                  🖱️ Kéo để xoay 360° • Cuộn để phóng to •
                </span>
                <button
                  onClick={handleStartFPS}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold text-xs shadow-md shadow-red-600/30 transition-all cursor-pointer animate-pulse"
                >
                  <Footprints className="w-3.5 h-3.5" />
                  <span>Đi Dạo Góc Nhìn Thật (FPS Walk)</span>
                </button>
              </div>
            </div>
          )}

          {/* UI Visibility Toggle Button (Bottom Right) */}
          <button
            onClick={() => {
              soundManager.playClick();
              setHideUI((prev) => !prev);
            }}
            className="absolute bottom-4 right-4 z-30 p-2.5 rounded-full bg-stone-900/85 backdrop-blur-md border border-white/10 text-stone-300 hover:text-white shadow-xl transition-all cursor-pointer"
            title={hideUI ? 'Hiện giao diện' : 'Ẩn giao diện'}
          >
            {hideUI ? <Eye className="w-4 h-4 text-amber-400" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </>
      )}

      {/* FIRST-PERSON IN-GAME HUD & CONTROLS */}
      {cameraMode === 'first-person' && !isPaused && (
        <FirstPersonHUD
          isNight={isNight}
          onToggleNight={() => setIsNight((prev) => !prev)}
          isMuted={isMuted}
          onToggleMute={() => {
            const next = !isMuted;
            setIsMuted(next);
            soundManager.setMuted(next);
          }}
          mouseSensitivity={mouseSensitivity}
          onSensitivityChange={setMouseSensitivity}
          hoveredObjectId={hoveredObjectId}
          onInteract={handleInteractObject}
          onPause={handlePause}
          onSelectZonePath={handleSelectZonePath}
          activeNavZoneId={activeNavZoneId}
          onCancelNav={() => {
            setActivePath(null);
            setActiveNavZoneId(null);
          }}
          cameraMode={cameraMode}
          onToggleCameraMode={handleStartOverview}
          onMovementInputChange={setExternalMovement}
          onTouchLookDelta={setTouchLookDelta}
        />
      )}

      {/* PAUSE MENU MODAL */}
      {isPaused && (
        <PauseMenu
          onResume={handleResume}
          onResetToEntrance={handleResetToEntrance}
          cameraMode={cameraMode}
          onToggleCameraMode={handleToggleCameraMode}
          mouseSensitivity={mouseSensitivity}
          onSensitivityChange={setMouseSensitivity}
          isMuted={isMuted}
          onToggleMute={() => {
            const next = !isMuted;
            setIsMuted(next);
            soundManager.setMuted(next);
          }}
          isNight={isNight}
          onToggleNight={() => setIsNight((prev) => !prev)}
          onOpenPhotoGallery={() => setShowPhotoGallery(true)}
        />
      )}

      {/* INTERACTIVE OBJECT DETAIL MODAL */}
      {selectedObjectId && (
        <InfoModal
          zone={activeZoneConfig}
          objectInfo={selectedObjectConfig}
          onClose={() => {
            setSelectedObjectId(null);
            if (cameraMode === 'first-person') {
              requestPointerLock();
            }
          }}
          onViewPhoto={(url) => {
            setInitialGalleryPhoto(url);
            setShowPhotoGallery(true);
          }}
        />
      )}

      {/* REAL PHOTOGRAPH & CAD BLUEPRINT COMPARISON GALLERY MODAL */}
      <PhotoGalleryModal
        isOpen={showPhotoGallery}
        onClose={() => {
          setShowPhotoGallery(false);
          if (cameraMode === 'first-person' && !isPaused) {
            requestPointerLock();
          }
        }}
        initialPhotoUrl={initialGalleryPhoto}
      />

      {/* CONTROLS & HELP MODAL */}
      <HelpOverlay
        isOpen={showHelp}
        onClose={() => {
          setShowHelp(false);
          if (cameraMode === 'first-person' && !isPaused) {
            requestPointerLock();
          }
        }}
      />
    </div>
  );
}

export default App;
