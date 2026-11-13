export type ZoneId =
  | 'overview'
  | 'exterior'
  | 'mccafe'
  | 'creative-zone'
  | 'aquarium'
  | 'kids-room'
  | 'music-room'
  | 'food-counter'
  | 'dining-area';

export interface ZoneConfig {
  id: ZoneId;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  cameraPosition: [number, number, number];
  targetPosition: [number, number, number];
  photoUrl: string;
  photoCaption: string;
  highlights: string[];
  features: string[];
}

export interface InteractiveObjectInfo {
  id: string;
  name: string;
  zoneId: ZoneId;
  position: [number, number, number];
  title: string;
  subtitle: string;
  description: string;
  handmadeDetails: string;
  photoUrl?: string;
  actionText?: string;
  actionType?: 'piano' | 'coffee' | 'cat' | 'confetti' | 'bubbles' | 'flash' | 'fries';
}
