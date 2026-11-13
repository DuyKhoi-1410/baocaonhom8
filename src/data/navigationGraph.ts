import type { ZoneId } from '../types';

export interface Waypoint {
  id: string;
  name: string;
  position: [number, number, number];
  neighbors: string[];
  zoneId?: ZoneId;
}

export const WAYPOINTS: Record<string, Waypoint> = {
  // Exterior Sidewalk
  'wp-exterior-sidewalk': {
    id: 'wp-exterior-sidewalk',
    name: 'Vỉa Hè Mặt Tiền',
    position: [1.5, 0, 11.5],
    neighbors: ['wp-exterior-left', 'wp-exterior-right', 'wp-entrance-door'],
    zoneId: 'exterior'
  },
  'wp-exterior-left': {
    id: 'wp-exterior-left',
    name: 'Biển Fries Before Guys & Xe Thể Thao',
    position: [-6.5, 0, 11.2],
    neighbors: ['wp-exterior-sidewalk'],
    zoneId: 'exterior'
  },
  'wp-exterior-right': {
    id: 'wp-exterior-right',
    name: 'Cột Pylon & Xe Thể Thao Phải',
    position: [7.5, 0, 11.2],
    neighbors: ['wp-exterior-sidewalk'],
    zoneId: 'exterior'
  },

  // Main Entrance Threshold
  'wp-entrance-door': {
    id: 'wp-entrance-door',
    name: 'Cửa Chính Cổng Vòm Vàng',
    position: [1.5, 0, 8.0],
    neighbors: ['wp-exterior-sidewalk', 'wp-foyer-front']
  },

  // Foyer in Front of Aquarium
  'wp-foyer-front': {
    id: 'wp-foyer-front',
    name: 'Sảnh Chính Mặt Trước Bể Cá',
    position: [1.5, 0, 4.8],
    neighbors: ['wp-entrance-door', 'wp-hall-right', 'wp-hall-left', 'wp-aquarium-front'],
    zoneId: 'overview'
  },
  'wp-aquarium-front': {
    id: 'wp-aquarium-front',
    name: 'Trước Bể Cá Thủy Sinh',
    position: [-1.2, 0, 3.8],
    neighbors: ['wp-foyer-front', 'wp-hall-left'],
    zoneId: 'aquarium'
  },

  // Left Corridor & Dining Area
  'wp-hall-left': {
    id: 'wp-hall-left',
    name: 'Hành Lang Khu Bàn Ăn',
    position: [-5.5, 0, 3.5],
    neighbors: ['wp-foyer-front', 'wp-aquarium-front', 'wp-dining-front', 'wp-dining-back', 'wp-back-left']
  },
  'wp-dining-front': {
    id: 'wp-dining-front',
    name: 'Bàn Ăn 1 & Khung Check-in',
    position: [-8.5, 0, 2.2],
    neighbors: ['wp-hall-left', 'wp-dining-back'],
    zoneId: 'dining-area'
  },
  'wp-dining-back': {
    id: 'wp-dining-back',
    name: 'Bàn Ăn 2 Dưới Tranh Cây',
    position: [-8.5, 0, -2.5],
    neighbors: ['wp-dining-front', 'wp-hall-left', 'wp-back-left'],
    zoneId: 'dining-area'
  },

  // Hallway Behind Aquarium (Back Wall)
  'wp-back-left': {
    id: 'wp-back-left',
    name: 'Hành Lang Sau Bể Cá',
    position: [-3.5, 0, -5.2],
    neighbors: ['wp-dining-back', 'wp-hall-left', 'wp-creative-zone', 'wp-hydroponic-front']
  },
  'wp-creative-zone': {
    id: 'wp-creative-zone',
    name: 'Khu Sáng Tạo Tường LEGO',
    position: [-4.0, 0, -8.0],
    neighbors: ['wp-back-left', 'wp-hydroponic-front'],
    zoneId: 'creative-zone'
  },
  'wp-hydroponic-front': {
    id: 'wp-hydroponic-front',
    name: 'Tủ Cây Thủy Sinh & Mèo Thần Tài',
    position: [1.1, 0, -6.8],
    neighbors: ['wp-back-left', 'wp-creative-zone', 'wp-hall-right', 'wp-kids-entrance'],
    zoneId: 'food-counter'
  },

  // Right Corridor & Kids Room
  'wp-hall-right': {
    id: 'wp-hall-right',
    name: 'Hành Lang Bên Phải',
    position: [3.2, 0, 0.8],
    neighbors: ['wp-foyer-front', 'wp-hydroponic-front', 'wp-stairs-bottom', 'wp-kids-entrance']
  },
  'wp-kids-entrance': {
    id: 'wp-kids-entrance',
    name: 'Cửa Vào Kids Room',
    position: [5.5, 0, -5.5],
    neighbors: ['wp-hydroponic-front', 'wp-hall-right', 'wp-kids-room'],
    zoneId: 'kids-room'
  },
  'wp-kids-room': {
    id: 'wp-kids-room',
    name: 'Phòng Nhạc & Đàn Piano Cầu Vồng',
    position: [8.5, 0, -8.0],
    neighbors: ['wp-kids-entrance'],
    zoneId: 'music-room'
  },

  // Wooden Staircase Navmesh
  'wp-stairs-bottom': {
    id: 'wp-stairs-bottom',
    name: 'Chân Cầu Thang Lên Tầng Lửng',
    position: [6.5, 0, -0.6],
    neighbors: ['wp-hall-right', 'wp-stairs-mid']
  },
  'wp-stairs-mid': {
    id: 'wp-stairs-mid',
    name: 'Giữa Cầu Thang Gỗ',
    position: [6.5, 2.4, -3.2],
    neighbors: ['wp-stairs-bottom', 'wp-stairs-top']
  },
  'wp-stairs-top': {
    id: 'wp-stairs-top',
    name: 'Đỉnh Cầu Thang Tầng Lửng',
    position: [6.5, 4.8, -5.8],
    neighbors: ['wp-stairs-mid', 'wp-mezzanine-mccafe', 'wp-mezzanine-gallery'],
    zoneId: 'mccafe'
  },

  // Elevated Mezzanine Platform (Y = 4.8)
  'wp-mezzanine-mccafe': {
    id: 'wp-mezzanine-mccafe',
    name: 'Quầy Pha Chế McCafé',
    position: [8.5, 4.8, -3.5],
    neighbors: ['wp-stairs-top'],
    zoneId: 'mccafe'
  },
  'wp-mezzanine-gallery': {
    id: 'wp-mezzanine-gallery',
    name: 'Hành Lang Ngắm Cầu Rồng Tầng Lửng',
    position: [1.5, 4.8, -7.5],
    neighbors: ['wp-stairs-top', 'wp-mezzanine-beanbags']
  },
  'wp-mezzanine-beanbags': {
    id: 'wp-mezzanine-beanbags',
    name: 'Dãy Ghế Lười Beanbag Ngắm Toàn Cảnh',
    position: [-4.0, 4.8, -7.5],
    neighbors: ['wp-mezzanine-gallery']
  }
};

// Map each ZoneId to its primary destination waypoint
export const ZONE_PRIMARY_WAYPOINTS: Record<ZoneId, string> = {
  'overview': 'wp-foyer-front',
  'exterior': 'wp-exterior-sidewalk',
  'mccafe': 'wp-mezzanine-mccafe',
  'creative-zone': 'wp-creative-zone',
  'aquarium': 'wp-aquarium-front',
  'kids-room': 'wp-kids-entrance',
  'music-room': 'wp-kids-room',
  'food-counter': 'wp-hydroponic-front',
  'dining-area': 'wp-dining-front'
};

// Find the closest waypoint to an arbitrary (x, y, z) position
export function findNearestWaypoint(x: number, y: number, z: number): string {
  let closestId = 'wp-exterior-sidewalk';
  let minDistanceSq = Infinity;

  for (const wp of Object.values(WAYPOINTS)) {
    // Only match waypoints on similar elevation tier (ground vs mezzanine)
    const isGround = y < 2.4;
    const wpIsGround = wp.position[1] < 2.4;
    if (isGround !== wpIsGround && wp.id !== 'wp-stairs-mid') continue;

    const dx = wp.position[0] - x;
    const dy = wp.position[1] - y;
    const dz = wp.position[2] - z;
    const distSq = dx * dx + dy * dy * 2.0 + dz * dz;

    if (distSq < minDistanceSq) {
      minDistanceSq = distSq;
      closestId = wp.id;
    }
  }

  return closestId;
}

// Breadth-First-Search shortest path algorithm through the safe waypoint graph
export function findWalkPath(startWpId: string, targetWpId: string): [number, number, number][] {
  if (startWpId === targetWpId) {
    const wp = WAYPOINTS[targetWpId];
    return wp ? [wp.position] : [];
  }

  const queue: string[] = [startWpId];
  const cameFrom: Record<string, string | null> = { [startWpId]: null };
  const visited = new Set<string>([startWpId]);

  let found = false;
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current === targetWpId) {
      found = true;
      break;
    }

    const currentWp = WAYPOINTS[current];
    if (!currentWp) continue;

    for (const neighborId of currentWp.neighbors) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        cameFrom[neighborId] = current;
        queue.push(neighborId);
      }
    }
  }

  if (!found) {
    const targetWp = WAYPOINTS[targetWpId];
    return targetWp ? [targetWp.position] : [];
  }

  // Reconstruct path
  const pathIds: string[] = [];
  let curr: string | null = targetWpId;
  while (curr !== null) {
    pathIds.unshift(curr);
    curr = cameFrom[curr];
  }

  return pathIds.map((id) => WAYPOINTS[id].position);
}
