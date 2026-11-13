import * as THREE from 'three';

// Cache generated textures to avoid redundant canvas rendering
const textureCache: Record<string, THREE.CanvasTexture> = {};

function createCachedTexture(
  key: string,
  width: number,
  height: number,
  render: (ctx: CanvasRenderingContext2D, width: number, height: number) => void
): THREE.CanvasTexture {
  if (textureCache[key]) {
    return textureCache[key];
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    render(ctx, width, height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;

  textureCache[key] = texture;
  return texture;
}

// 1. "FRIES BEFORE GUYS" Billboard Texture (Matching Image 0 & 1)
export function getFriesBillboardTexture(): THREE.CanvasTexture {
  return createCachedTexture('fries_billboard_hd_v2', 1024, 1536, (ctx, w, h) => {
    // Dark brown/burgundy chalkboard background
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#531317');
    bgGrad.addColorStop(0.5, '#3b0a0e');
    bgGrad.addColorStop(1, '#240407');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Chalk dust & paper grain texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let i = 0; i < 5000; i++) {
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }

    // White paper border
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, 22);
    ctx.fillRect(0, h - 22, w, 22);
    ctx.fillRect(0, 0, 22, h);
    ctx.fillRect(w - 22, 0, 22, h);

    // Chalk frame
    ctx.strokeStyle = 'rgba(255, 230, 200, 0.2)';
    ctx.lineWidth = 8;
    ctx.strokeRect(34, 34, w - 68, h - 68);

    // Hand-lettered chalk typography: "FRIES BEFORE GUYS"
    ctx.save();
    ctx.translate(60, 160);

    // "FRIES" in yellow chalk
    ctx.font = '900 135px "Impact", "Arial Black", sans-serif';
    ctx.fillStyle = '#ffc72c';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowOffsetX = 6;
    ctx.shadowOffsetY = 6;
    ctx.shadowBlur = 8;
    ctx.fillText('FRIES', 40, 60);

    // Chalk streak lines
    ctx.strokeStyle = '#ffc72c';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(430, 20); ctx.lineTo(500, 5);
    ctx.moveTo(440, 48); ctx.lineTo(510, 42);
    ctx.stroke();

    // "BEFORE" in white chalk
    ctx.font = '700 72px "Comic Sans MS", "Chalkboard", "Arial", sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.fillText('BEFORE', 65, 150);

    // "GUYS" in bold white chalk
    ctx.font = '900 145px "Impact", "Arial Black", sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText('GUYS', 45, 285);

    // Cute star doodle
    ctx.font = '75px sans-serif';
    ctx.fillStyle = '#ffc72c';
    ctx.fillText('☆', 115, 375);
    ctx.restore();

    // French fries spilling out
    ctx.save();
    ctx.translate(w * 0.44, h * 0.58);

    const fryColors = ['#ffc72c', '#f1b418', '#ffd55e', '#e59d00', '#ffea88'];
    for (let i = 0; i < 54; i++) {
      const angle = -0.75 + (i / 54) * 1.5 + (Math.random() - 0.5) * 0.2;
      const len = 330 + Math.random() * 180;
      const fryW = 20 + Math.random() * 8;

      ctx.save();
      ctx.rotate(angle);
      ctx.fillStyle = fryColors[i % fryColors.length];
      ctx.shadowColor = 'rgba(0,0,0,0.35)';
      ctx.shadowBlur = 6;
      ctx.fillRect(-fryW / 2, -len, fryW, len);

      // Fry tip highlight & toasted edge
      ctx.fillStyle = '#b45309';
      ctx.fillRect(-fryW / 2, -len, fryW, 18);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(-fryW / 2 + 3, -len + 4, fryW - 6, len * 0.65);
      ctx.restore();
    }

    // Red & white checkered fry box / wrapper
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(-230, 340);
    ctx.lineTo(-270, 40);
    ctx.quadraticCurveTo(0, -20, 270, 40);
    ctx.lineTo(230, 340);
    ctx.closePath();
    ctx.clip();

    const checkSize = 36;
    for (let r = -280; r < 380; r += checkSize) {
      for (let c = -320; c < 320; c += checkSize) {
        const isRed = ((Math.floor(r / checkSize) + Math.floor(c / checkSize)) % 2) === 0;
        ctx.fillStyle = isRed ? '#da291c' : '#ffffff';
        ctx.fillRect(c, r, checkSize, checkSize);
      }
    }
    ctx.restore();

    ctx.restore();
  });
}

// 2. Front Facade Fascia Header: "MC DONALD'S" (Matching Image 1)
export function getStorefrontHeaderTexture(): THREE.CanvasTexture {
  return createCachedTexture('storefront_header_hd_v2', 2048, 512, (ctx, w, h) => {
    // Matte black architectural header
    ctx.fillStyle = '#111215';
    ctx.fillRect(0, 0, w, h);

    // Subtle brushed wood/cardboard grain
    ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
    for (let i = 0; i < 3000; i++) {
      ctx.fillRect(Math.random() * w, Math.random() * h, Math.random() * 100 + 20, 1.5);
    }

    // White horizontal trim lines top and bottom
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 16, w, 16);
    ctx.fillRect(0, h - 32, w, 16);
    ctx.fillRect(w - 20, 0, 20, h);

    // "MC DONALD'S" bold modern white 3D block lettering (matching Image 1)
    ctx.font = '900 135px "Arial Black", "Montserrat", "Impact", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowOffsetX = 8;
    ctx.shadowOffsetY = 8;
    ctx.shadowBlur = 12;
    ctx.textAlign = 'center';
    ctx.fillText("McDONALD'S", w * 0.64, h * 0.58);
  });
}

// 3. "McCafe" Wood Panel with Red M (Matching Image 1)
export function getMcCafeWoodTexture(): THREE.CanvasTexture {
  return createCachedTexture('mccafe_wood_hd_v2', 512, 512, (ctx, w, h) => {
    // Warm wood grain plank background
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, '#9a5e38');
    grad.addColorStop(0.3, '#b47348');
    grad.addColorStop(0.7, '#8a4f2c');
    grad.addColorStop(1, '#a6653d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    for (let y = 0; y < h; y += 4) {
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '35, 15, 5' : '230, 175, 115'}, ${Math.random() * 0.18})`;
      ctx.fillRect(0, y, w, 2.5);
    }

    // White border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 16;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    // Iconic McDonald's Arch 'M' in vibrant RED (Matching Image 1!)
    ctx.save();
    ctx.translate(w / 2, h * 0.42);

    ctx.beginPath();
    ctx.moveTo(-105, 60);
    ctx.bezierCurveTo(-105, -115, -12, -115, -12, 60);
    ctx.moveTo(-12, 60);
    ctx.bezierCurveTo(-12, -115, 82, -115, 82, 60);

    ctx.lineWidth = 40;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#da291c'; // Vibrant McDonald's Red in Image 1
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 6;
    ctx.stroke();
    ctx.restore();

    // White cursive "McCafe"
    ctx.font = '700 85px "Brush Script MT", "Caveat", "Dancing Script", cursive, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 6;
    ctx.fillText('McCafe', w / 2, h * 0.85);
  });
}

// 4. Starry Night Galaxy / Milky Way Ceiling Texture (Matching Image 2!)
export function getGalaxyCeilingTexture(): THREE.CanvasTexture {
  return createCachedTexture('galaxy_ceiling_hd', 2048, 1024, (ctx, w, h) => {
    // Deep cosmic gradient
    const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w * 0.7);
    grad.addColorStop(0, '#1e1b4b'); // Deep indigo purple
    grad.addColorStop(0.3, '#0c1a40'); // Dark sapphire
    grad.addColorStop(0.7, '#050b1a'); // Space black
    grad.addColorStop(1, '#020610');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Cosmic clouds / Nebula dust
    for (let i = 0; i < 60; i++) {
      const cx = Math.random() * w;
      const cy = Math.random() * h;
      const rad = Math.random() * 250 + 100;
      const cloudGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      const colors = [
        'rgba(56, 189, 248, 0.12)', // Cyan
        'rgba(168, 85, 247, 0.14)', // Purple
        'rgba(244, 114, 182, 0.10)', // Pink
        'rgba(14, 165, 233, 0.15)', // Blue
      ];
      cloudGrad.addColorStop(0, colors[i % colors.length]);
      cloudGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = cloudGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // Thousands of Stars & clusters
    for (let i = 0; i < 2200; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const brightness = Math.random() * 0.9 + 0.1;
      const size = Math.random() * 2.2 + 0.5;

      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();

      // Big twinkling stars with cross glint
      if (i < 40) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${brightness * 0.8})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 8, y); ctx.lineTo(x + 8, y);
        ctx.moveTo(x, y - 8); ctx.lineTo(x, y + 8);
        ctx.stroke();
      }
    }
  });
}

// 5. Da Nang Golden Dragon Bridge ("Cầu Rồng") with Fireworks (Matching Image 2!)
export function getDragonBridgeTexture(): THREE.CanvasTexture {
  return createCachedTexture('dragon_bridge_mural_fireworks', 2048, 640, (ctx, w, h) => {
    // Night sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, '#01040f');
    skyGrad.addColorStop(0.5, '#0b1329');
    skyGrad.addColorStop(1, '#1b1b38');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // Stars
    for (let i = 0; i < 300; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
      ctx.fillRect(Math.random() * w, Math.random() * h * 0.65, Math.random() * 2 + 1, Math.random() * 2 + 1);
    }

    // Fireworks in background (as seen in Image 2!)
    const fireworkCenters = [
      { x: w * 0.55, y: h * 0.35, color: '#f472b6' },
      { x: w * 0.68, y: h * 0.28, color: '#38bdf8' },
      { x: w * 0.82, y: h * 0.38, color: '#facc15' },
    ];
    fireworkCenters.forEach((fw) => {
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 12) {
        const len = Math.random() * 70 + 40;
        ctx.strokeStyle = fw.color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(fw.x, fw.y);
        ctx.lineTo(fw.x + Math.cos(a) * len, fw.y + Math.sin(a) * len);
        ctx.stroke();
      }
    });

    // Han River water reflection
    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, h * 0.78, w, h * 0.22);

    // Glowing Golden Dragon Bridge Body
    ctx.save();
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 50;

    ctx.lineWidth = 44;
    ctx.strokeStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(w * 0.05, h * 0.76);
    ctx.bezierCurveTo(w * 0.2, h * 0.06, w * 0.45, h * 0.16, w * 0.65, h * 0.72);
    ctx.bezierCurveTo(w * 0.76, h * 0.40, w * 0.88, h * 0.36, w * 0.96, h * 0.68);
    ctx.stroke();

    // Scales highlight
    ctx.lineWidth = 16;
    ctx.strokeStyle = '#fef08a';
    ctx.stroke();

    // Golden Dragon Head breathing fire on left side (matching Image 2!)
    ctx.translate(w * 0.16, h * 0.34);
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(0, 0, 56, 0, Math.PI * 2);
    ctx.fill();

    // Horns
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(-24, -34); ctx.lineTo(-70, -80);
    ctx.moveTo(14, -34); ctx.lineTo(-8, -85);
    ctx.stroke();

    // Massive dramatic fire blast (matching Image 2!)
    const fireGrad = ctx.createRadialGradient(-60, 0, 10, -160, 0, 150);
    fireGrad.addColorStop(0, '#ffffff');
    fireGrad.addColorStop(0.2, '#fde047');
    fireGrad.addColorStop(0.6, '#ea580c');
    fireGrad.addColorStop(0.9, '#991b1b');
    fireGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = fireGrad;
    ctx.beginPath();
    ctx.arc(-140, 0, 160, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Bridge road deck and cables
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.78);
    ctx.lineTo(w, h * 0.78);
    ctx.stroke();
  });
}

// 6. Mascot Standee "WELCOME TO DUE - HAPPY, BE BRIGHT" (Matching Image 3!)
export function getMascotStandeeTexture(): THREE.CanvasTexture {
  return createCachedTexture('mascot_standee_due', 1024, 512, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);

    // Left Mascot: Blue Dog Mascot with Cap & Rainbow
    // Rainbow arch
    ctx.save();
    ctx.translate(240, 320);
    const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];
    colors.forEach((col, idx) => {
      ctx.strokeStyle = col;
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.arc(-60, 0, 140 - idx * 16, Math.PI, 0);
      ctx.stroke();
    });

    // Pill speech badge: "WELCOME TO DUE / HAPPY, BE BRIGHT"
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.roundRect(-180, -220, 360, 90, 24);
    ctx.fill();
    ctx.stroke();

    ctx.font = '900 28px "Arial Black", sans-serif';
    ctx.fillStyle = '#1d4ed8';
    ctx.textAlign = 'center';
    ctx.fillText('WELCOME TO DUE', 0, -175);
    ctx.font = '700 20px "Arial", sans-serif';
    ctx.fillStyle = '#ef4444';
    ctx.fillText('HAPPY, BE BRIGHT', 0, -145);

    // Cartoon Dog Face
    ctx.font = '110px sans-serif';
    ctx.fillText('🐶', 0, -20);
    ctx.restore();

    // Right Mascot: Pink Bear Mascot with Love Tag (Image 3)
    ctx.save();
    ctx.translate(720, 300);
    ctx.fillStyle = '#fce7f3';
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.roundRect(-90, -180, 180, 70, 18);
    ctx.fill();
    ctx.stroke();

    ctx.font = '900 22px "Arial Black", sans-serif';
    ctx.fillStyle = '#be185d';
    ctx.textAlign = 'center';
    ctx.fillText('ONE HEART', 0, -148);
    ctx.font = '700 16px "Arial", sans-serif';
    ctx.fillText('TRUE LOVE', 0, -125);

    ctx.font = '110px sans-serif';
    ctx.fillText('🐻', 0, -10);
    ctx.restore();
  });
}

// 7. Hydroponic Plants 3-Tier Shelves with Glow Lights for "TỦ CÂY THỦY SINH" (Matching Image 3!)
export function getHydroponicShelvesTexture(): THREE.CanvasTexture {
  return createCachedTexture('hydroponic_shelves_hd', 1024, 768, (ctx, w, h) => {
    // White illuminated cabinet interior with grow lights
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, w, h);

    const shelfH = h / 3;

    // Draw 3 tiers of lush green hydroponic salad greens, lettuce, and moss
    for (let tier = 0; tier < 3; tier++) {
      const y = tier * shelfH;

      // Bright white/cyan LED grow light bar at top of each shelf
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#67e8f9';
      ctx.shadowBlur = 20;
      ctx.fillRect(20, y + 10, w - 40, 18);
      ctx.shadowBlur = 0;

      // Hydroponic tray base
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(20, y + shelfH - 35, w - 40, 25);

      // Rows of vibrant green potted lettuce, basil, and moss heads
      const plantColors = ['#22c55e', '#16a34a', '#4ade80', '#15803d', '#86efac'];
      for (let x = 45; x < w - 45; x += 36) {
        const pCol = plantColors[Math.floor(Math.random() * plantColors.length)];
        ctx.fillStyle = pCol;
        const pH = Math.random() * 65 + 75;
        const pY = y + shelfH - 35 - pH;

        // Leaf cluster
        ctx.beginPath();
        ctx.ellipse(x, pY + pH / 2, 22, pH / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#86efac';
        ctx.beginPath();
        ctx.ellipse(x + 5, pY + pH / 2 - 10, 12, pH / 3, 0.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Shelf divider line
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(0, y + shelfH);
      ctx.lineTo(w, y + shelfH);
      ctx.stroke();
    }
  });
}

// 8. "KIDS ROOM" Patchwork Tile Wall Texture (Matching Image 0 & Image 3)
export function getKidsRoomPatchworkTexture(): THREE.CanvasTexture {
  return createCachedTexture('kids_room_patchwork_hd_v2', 1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    const cols = 5;
    const rows = 5;
    const cellW = w / cols;
    const cellH = h / rows;

    const pastelPalette = [
      '#fed7aa', '#fbcfe8', '#bbf7d0', '#fef08a', '#e0e7ff',
      '#fef9c3', '#e0f2fe', '#f3e8ff', '#fed7aa', '#ccfbf1',
      '#ffe4e6', '#fef3c7', '#dcfce7', '#e0f2fe', '#f3e8ff',
      '#dbeafe', '#fef08a', '#bbf7d0', '#fbcfe8', '#fed7aa',
      '#c7d2fe', '#fde047', '#99f6e4', '#fed7aa', '#e9d5ff',
    ];

    let colorIdx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cellW;
        const y = r * cellH;

        ctx.fillStyle = pastelPalette[colorIdx % pastelPalette.length];
        colorIdx++;
        ctx.fillRect(x, y, cellW, cellH);

        ctx.strokeStyle = 'rgba(0, 0, 0, 0.18)';
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, cellW, cellH);

        ctx.save();
        ctx.translate(x + cellW / 2, y + cellH / 2);

        if (r === 0 && c === 0) {
          ctx.fillStyle = '#92400e';
          ctx.beginPath(); ctx.arc(0, 0, 36, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(-26, -26, 16, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(26, -26, 16, 0, Math.PI * 2); ctx.fill();
        } else if (r === 0 && c === 1) {
          ctx.font = '900 62px "Comic Sans MS", sans-serif';
          ctx.fillStyle = '#6366f1';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('1 2', 0, 0);
        } else if (r === 0 && c === 2) {
          ctx.font = '72px sans-serif';
          ctx.fillStyle = '#eab308';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('★', 0, 0);
        } else if (r === 0 && c === 3) {
          ctx.font = '62px sans-serif';
          ctx.fillStyle = '#ef4444';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('🚀', 0, 0);
        } else if (r === 1 && c === 0) {
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath(); ctx.arc(0, 0, 32, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 6;
          for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
            ctx.beginPath();
            ctx.moveTo(Math.cos(a) * 38, Math.sin(a) * 38);
            ctx.lineTo(Math.cos(a) * 52, Math.sin(a) * 52);
            ctx.stroke();
          }
        } else if (r === 1 && c === 1) {
          ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 9;
          ctx.beginPath(); ctx.arc(0, 20, 52, Math.PI, 0); ctx.stroke();
          ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 9;
          ctx.beginPath(); ctx.arc(0, 20, 43, Math.PI, 0); ctx.stroke();
          ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 9;
          ctx.beginPath(); ctx.arc(0, 20, 34, Math.PI, 0); ctx.stroke();
        } else if (r === 2 && c === 0) {
          ctx.font = '64px sans-serif';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('🐱', 0, 0);
        } else if (r === 3 && c === 0) {
          ctx.font = '64px sans-serif';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('🦕', 0, 0);
        } else if (r === 3 && c === 4) {
          ctx.font = '900 52px "Comic Sans MS", sans-serif';
          ctx.fillStyle = '#dc2626';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('ABC', 0, 0);
        } else if (r === 4 && c === 3) {
          ctx.font = '58px sans-serif';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('✈️', 0, 0);
        } else if (r === 4 && c === 4) {
          ctx.font = '58px sans-serif';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('🚗', 0, 0);
        }
        ctx.restore();
      }
    }

    // Bold Bubble Sign: "KIDS ROOM"
    ctx.save();
    ctx.translate(w / 2, h * 0.28);

    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowOffsetX = 6;
    ctx.shadowOffsetY = 6;
    ctx.shadowBlur = 12;

    const badgeW = 700;
    const badgeH = 155;
    ctx.beginPath();
    ctx.roundRect(-badgeW / 2, -badgeH / 2, badgeW, badgeH, 32);
    ctx.fill();

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 11;
    ctx.stroke();

    ctx.font = '900 102px "Arial Black", "Impact", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 20;
    ctx.lineJoin = 'round';
    ctx.strokeText('KIDS ROOM', 0, 0);

    ctx.fillStyle = '#ffc72c';
    ctx.fillText('KIDS ROOM', 0, 0);

    ctx.strokeStyle = '#fffbeb';
    ctx.lineWidth = 4;
    ctx.strokeText('KIDS ROOM', -2, -2);
    ctx.restore();
  });
}

// 9. "TOM AND JERRY" Happy Meal Poster
export function getTomAndJerryPosterTexture(): THREE.CanvasTexture {
  return createCachedTexture('tom_and_jerry_poster_hd_v2', 1024, 768, (ctx, w, h) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#da291c';
    ctx.lineWidth = 22;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    ctx.fillStyle = '#facc15';
    ctx.fillRect(20, h * 0.46, w - 40, h * 0.54 - 20);

    const holes = [
      { x: 160, y: 470, r: 42 },
      { x: 380, y: 570, r: 58 },
      { x: 620, y: 490, r: 48 },
      { x: 860, y: 560, r: 62 },
      { x: 260, y: 660, r: 38 },
      { x: 740, y: 670, r: 42 }
    ];
    holes.forEach((hole) => {
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(hole.x, hole.y, hole.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 6;
      ctx.stroke();
    });

    ctx.fillStyle = '#da291c';
    ctx.beginPath();
    ctx.roundRect(w - 380, 28, 340, 74, 14);
    ctx.fill();
    ctx.font = '700 22px "Arial", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('TẶNG KÈM TRONG MỖI HỘP', w - 210, 58);
    ctx.font = '900 24px "Arial Black", sans-serif';
    ctx.fillStyle = '#ffc72c';
    ctx.fillText('Happy Meal - SÁCH & ĐỒ CHƠI', w - 210, 88);

    ctx.font = '900 90px "Impact", "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 14;
    ctx.strokeText('TOM AND JERRY', w * 0.42, 110);
    ctx.fillStyle = '#da291c';
    ctx.fillText('TOM AND JERRY', w * 0.42, 110);

    ctx.font = '700 30px "Arial", sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.fillText('FRENEMIES FOREVER', w * 0.42, 150);

    ctx.save();
    ctx.translate(w / 2, h * 0.48);
    ctx.fillStyle = '#da291c';
    ctx.beginPath();
    ctx.roundRect(-125, -75, 250, 230, 22);
    ctx.fill();

    ctx.lineWidth = 28;
    ctx.strokeStyle = '#ffc72c';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(-42, -75, 48, Math.PI, 0);
    ctx.arc(42, -75, 48, Math.PI, 0);
    ctx.stroke();

    ctx.lineWidth = 16;
    ctx.strokeStyle = '#ffc72c';
    ctx.beginPath();
    ctx.arc(0, 30, 72, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();
    ctx.restore();

    ctx.font = '96px sans-serif';
    ctx.fillText('🐱', w * 0.64, h * 0.72);
    ctx.font = '84px sans-serif';
    ctx.fillText('🐭', w * 0.36, h * 0.74);
  });
}

// 10. Floor Tile with Light Grid (Matching CAD & Image 2)
export function getFloorTileTexture(): THREE.CanvasTexture {
  return createCachedTexture('floor_tile_large_hd', 512, 512, (ctx, w, h) => {
    // Pure clean white / light marble paper base
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, w, h);

    // Subtle stone/paper grain
    ctx.fillStyle = 'rgba(0, 0, 0, 0.012)';
    for (let i = 0; i < 2000; i++) {
      ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
    }

    // Modern light grey grout grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, w, h);

    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h);
    ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
    ctx.stroke();
  });
}

// 11. Vietnamese McDonald's Menu Boards (Combo 59k, Burger, McCafe, Bánh - Matching Image 3!)
export function getMenuBoardsTexture(): THREE.CanvasTexture {
  return createCachedTexture('mcdonalds_menu_boards_hd_v2', 2048, 512, (ctx, w, h) => {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    const panelW = w / 4;

    // Panel 1: Combo Gà Rán & Fries 59.000đ (Image 3)
    ctx.fillStyle = '#da291c';
    ctx.fillRect(10, 10, panelW - 20, h - 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 36px "Arial Black", sans-serif';
    ctx.fillText('SIÊU ƯU ĐÃI', 30, 60);
    ctx.font = '700 24px "Arial", sans-serif';
    ctx.fillText('COMBO GÀ RÁN & FRIES', 30, 95);
    ctx.font = '900 58px "Impact", sans-serif';
    ctx.fillStyle = '#ffc72c';
    ctx.fillText('59.000đ', 30, 160);
    ctx.font = '105px sans-serif';
    ctx.fillText('🍗🍟🥤', 40, 320);

    // Panel 2: Burger 2 Lớp Bò 59.000đ (Image 3)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(panelW + 10, 10, panelW - 20, h - 20);
    ctx.fillStyle = '#ffc72c';
    ctx.font = '900 34px "Arial Black", sans-serif';
    ctx.fillText('BƠ GƠ 2 LỚP BÒ', panelW + 30, 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 24px "Arial", sans-serif';
    ctx.fillText('BÒ NƯỚNG THƠM LỪNG', panelW + 30, 95);
    ctx.font = '900 58px "Impact", sans-serif';
    ctx.fillStyle = '#ffc72c';
    ctx.fillText('59.000đ', panelW + 30, 160);
    ctx.font = '115px sans-serif';
    ctx.fillText('🍔🍟🥤', panelW + 30, 320);

    // Panel 3: McCafe Cà Phê Việt Nam & Đá Xay (Image 3)
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(panelW * 2 + 10, 10, panelW - 20, h - 20);
    ctx.fillStyle = '#ffc72c';
    ctx.font = '900 32px "Arial Black", sans-serif';
    ctx.fillText('McCafe', panelW * 2 + 30, 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 22px "Arial", sans-serif';
    ctx.fillText('CÀ PHÊ VIỆT NAM & ĐÁ XAY', panelW * 2 + 30, 95);
    ctx.font = '900 50px "Impact", sans-serif';
    ctx.fillStyle = '#ffc72c';
    ctx.fillText('TỪ 29.000đ', panelW * 2 + 30, 160);
    ctx.font = '115px sans-serif';
    ctx.fillText('☕🧋🥤', panelW * 2 + 40, 320);

    // Panel 4: Bánh & Tráng Miệng (Image 3)
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(panelW * 3 + 10, 10, panelW - 20, h - 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 32px "Arial Black", sans-serif';
    ctx.fillText('BÁNH & TRÁNG MIỆNG', panelW * 3 + 30, 60);
    ctx.font = '700 22px "Arial", sans-serif';
    ctx.fillText('BÁNH NƯỚNG NÓNG HỔI', panelW * 3 + 30, 95);
    ctx.font = '900 50px "Impact", sans-serif';
    ctx.fillStyle = '#ffc72c';
    ctx.fillText('TỪ 25.000đ', panelW * 3 + 30, 160);
    ctx.font = '115px sans-serif';
    ctx.fillText('🥐🧁🍦', panelW * 3 + 40, 320);
  });
}

// 12. "CHECK-IN CÙNG McDONALD'S" Stand
export function getCheckInFrameTexture(): THREE.CanvasTexture {
  return createCachedTexture('checkin_frame_hd_v2', 512, 768, (ctx, w, h) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#da291c';
    ctx.lineWidth = 18;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(50, 120, w - 100, 440);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 120, w - 100, 440);

    ctx.fillStyle = '#da291c';
    ctx.beginPath();
    ctx.roundRect(40, 30, w - 80, 70, 14);
    ctx.fill();

    ctx.font = '900 24px "Arial Black", sans-serif';
    ctx.fillStyle = '#ffc72c';
    ctx.textAlign = 'center';
    ctx.fillText("CHECK-IN CÙNG", w / 2, 58);
    ctx.fillStyle = '#ffffff';
    ctx.fillText("McDONALD'S!", w / 2, 88);

    ctx.fillStyle = '#ffc72c';
    ctx.beginPath();
    ctx.roundRect(40, 580, w - 80, 140, 16);
    ctx.fill();

    ctx.fillStyle = '#da291c';
    ctx.font = '900 32px "Arial Black", sans-serif';
    ctx.fillText("#i'm lovin' it", w / 2, 630);

    ctx.font = '700 20px "Arial", sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.fillText("Chụp ảnh nhận quà xinh xắn!", w / 2, 675);

    ctx.font = '60px sans-serif';
    ctx.fillText('🍔', 90, 530);
    ctx.fillText('🍟', w - 90, 530);
  });
}

// 13. "TỦ CÂY THỦY SINH" Plaque Label (Matching Photos 1 & 3!)
export function getAquaticPlantSignTexture(): THREE.CanvasTexture {
  return createCachedTexture('aquatic_plant_sign_hd_v3', 1024, 256, (ctx, w, h) => {
    // Pure clean white enamel plaque with rounded corners and double border (Matching Photo 1!)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(8, 8, w - 16, h - 16, 20);
    ctx.fill();

    // Outer dark border
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Inner subtle gold/green accent border
    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 3;
    ctx.strokeRect(22, 22, w - 44, h - 44);

    // Green sprout icon on left and right
    ctx.font = '54px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌱', 70, h / 2);
    ctx.fillText('🌱', w - 70, h / 2);

    // Bold, clean Vietnamese Typography: "TỦ CÂY THỦY SINH"
    ctx.font = '900 68px "Arial Black", "Montserrat", sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText('TỦ CÂY THỦY SINH', w / 2, h / 2 - 10);

    // Subtitle: "HỆ THỐNG THỦY CANH & SINH THÁI XANH"
    ctx.font = '700 22px "Arial", sans-serif';
    ctx.fillStyle = '#15803d';
    ctx.fillText('HỆ THỐNG THỦY CANH & SINH THÁI XANH • McDONALD\'S GREEN', w / 2, h / 2 + 50);
  });
}

// 13b. Digital Climate & Nutrient Monitor for Hydroponic Cabinet
export function getHydroponicMonitorTexture(): THREE.CanvasTexture {
  return createCachedTexture('hydroponic_monitor_hd', 512, 128, (ctx, w, h) => {
    // Black digital screen
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, w, h);

    // Neon green LED readout
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, w - 8, h - 8);

    ctx.font = '900 28px "Courier New", monospace';
    ctx.fillStyle = '#4ade80';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('TEMP: 24.5°C', 20, 40);
    ctx.fillText('HUM: 82% RH', w / 2 + 10, 40);

    ctx.fillStyle = '#38bdf8';
    ctx.fillText('pH: 6.5 OK', 20, 88);
    ctx.fillStyle = '#facc15';
    ctx.fillText('LED: 100% GROW', w / 2 + 10, 88);
  });
}

// 14. "CREATIVE ZONE" Bubble Badges (Matching Image 3)
export function getCreativeZoneSignTexture(): THREE.CanvasTexture {
  return createCachedTexture('creative_zone_sign_hd_v2', 512, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);

    // "CREATIVE"
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(30, 20, 320, 95, 48);
    ctx.fill();
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 12;
    ctx.stroke();

    ctx.font = '900 52px "Arial Black", sans-serif';
    ctx.fillStyle = '#0369a1';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CREATIVE', 190, 68);

    // "ZONE"
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(160, 135, 280, 95, 48);
    ctx.fill();
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 12;
    ctx.stroke();

    ctx.fillStyle = '#0369a1';
    ctx.fillText('ZONE', 300, 183);
  });
}

// 15. McCafe Counter Menu Sign
export function getMcCafeMenuTexture(): THREE.CanvasTexture {
  return createCachedTexture('mccafe_menu_hd_v2', 512, 256, (ctx, w, h) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(10, 10, w - 20, 80);

    ctx.font = '900 36px "Arial Black", sans-serif';
    ctx.fillStyle = '#ffc72c';
    ctx.textAlign = 'center';
    ctx.fillText('THỰC ĐƠN McCafé', w / 2, 58);

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(10, 100, w - 20, 140);
    ctx.font = '700 24px "Arial", sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText('Espresso • Cappuccino • Latte', w / 2, 140);
    ctx.fillText('Cà Phê Sữa Đá • Trà Đào', w / 2, 175);
    ctx.fillStyle = '#da291c';
    ctx.fillText('Tủ Bánh McCafé Tươi Ngon Mỗi Ngày', w / 2, 215);
  });
}
