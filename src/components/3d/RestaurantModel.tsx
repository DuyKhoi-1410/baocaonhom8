
import { FloorAndGround } from './FloorAndGround';
import { ExteriorFacade } from './ExteriorFacade';
import { Aquarium } from './Aquarium';
import { KidsRoom } from './KidsRoom';
import { CreativeZone } from './CreativeZone';
import { FoodCounter } from './FoodCounter';
import { Mezzanine } from './Mezzanine';
import { DiningArea } from './DiningArea';
import { SurroundingNeighborhood } from './SurroundingNeighborhood';
import { AnimatedTraffic } from './AnimatedTraffic';
import { AnimatedPedestrians } from './AnimatedPedestrians';
import { InteractivePin } from './InteractiveObject';
import { INTERACTIVE_OBJECTS } from '../../data/zones';

interface RestaurantModelProps {
  onObjectClick?: (objectId: string) => void;
  isNight?: boolean;
  showPins?: boolean;
}

export const RestaurantModel: React.FC<RestaurantModelProps> = ({
  onObjectClick,
  isNight = false,
  showPins = true,
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Base Flooring & Diorama Pedestal */}
      <FloorAndGround isNight={isNight} />

      {/* 2. Surrounding Low-Rise Residential Neighborhood (1-2 Stories Evenly Distributed) */}
      <SurroundingNeighborhood isNight={isNight} />

      {/* 3. Animated Roadway & Two-Way Street Traffic (Cars, Taxi, Van, Scooter) */}
      <AnimatedTraffic isNight={isNight} />

      {/* 4. Animated Pedestrians on Sidewalks & Crosswalk */}
      <AnimatedPedestrians isNight={isNight} />

      {/* 5. Exterior Storefront & Facade */}
      <ExteriorFacade onObjectClick={onObjectClick} isNight={isNight} />

      {/* 6. Center Aquarium Tank */}
      <Aquarium onObjectClick={onObjectClick} isNight={isNight} />

      {/* 7. Kids Room & Music Room */}
      <KidsRoom onObjectClick={onObjectClick} isNight={isNight} />

      {/* 8. Creative Zone (LEGO Wall & Toy Rack) */}
      <CreativeZone onObjectClick={onObjectClick} isNight={isNight} />

      {/* 9. Food Counter & Aquatic Plant Display */}
      <FoodCounter onObjectClick={onObjectClick} isNight={isNight} />

      {/* 10. Mezzanine, Stairs, McCafé & Dragon Bridge Banner */}
      <Mezzanine onObjectClick={onObjectClick} isNight={isNight} />

      {/* 11. Dining Seating Area & Check-in Stand */}
      <DiningArea onObjectClick={onObjectClick} isNight={isNight} />

      {/* 12. Interactive Object Floating Beacon Pins */}
      {INTERACTIVE_OBJECTS.map((obj) => (
        <InteractivePin
          key={obj.id}
          info={obj}
          onClick={(id) => onObjectClick?.(id)}
          visible={showPins}
        />
      ))}
    </group>
  );
};
