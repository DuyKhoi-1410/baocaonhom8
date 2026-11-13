import React from 'react';

interface SurroundingNeighborhoodProps {
  isNight?: boolean;
}

// -------------------------------------------------------------
// REUSABLE 1-STORY COTTAGE / HOUSE COMPONENT
// -------------------------------------------------------------
interface Cottage1StoryProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  width: number;
  depth: number;
  height: number;
  wallColor: string;
  roofColor: string;
  isNight?: boolean;
  hasChimney?: boolean;
  hasFlowerBox?: boolean;
}

const Cottage1Story: React.FC<Cottage1StoryProps> = ({
  position,
  rotation = [0, 0, 0],
  width,
  depth,
  height,
  wallColor,
  roofColor,
  isNight = false,
  hasChimney = true,
  hasFlowerBox = true,
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Concrete Foundation Plinth */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.2, 0.2, depth + 0.2]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.7} />
      </mesh>

      {/* Main Ground Floor Walls */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={wallColor} roughness={0.65} />
      </mesh>

      {/* Front Entrance Door */}
      <group position={[0, 1.1, depth / 2 + 0.02]}>
        <mesh castShadow>
          <boxGeometry args={[1.1, 2.0, 0.06]} />
          <meshStandardMaterial color="#78350f" roughness={0.4} />
        </mesh>
        {/* Door Knob */}
        <mesh position={[0.4, 0, 0.04]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial color="#fef08a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Porch Lamp */}
        <mesh position={[0, 1.25, 0.08]}>
          <boxGeometry args={[0.2, 0.25, 0.15]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive={isNight ? '#fbbf24' : '#000000'}
            emissiveIntensity={isNight ? 2.5 : 0}
          />
        </mesh>
      </group>

      {/* Left & Right Ground Floor Windows */}
      {[-width * 0.28, width * 0.28].map((wx, i) => (
        <group key={`cot-win-${i}`} position={[wx, 1.5, depth / 2 + 0.02]}>
          {/* Window Glass Pane */}
          <mesh>
            <planeGeometry args={[1.1, 1.3]} />
            <meshStandardMaterial
              color={isNight ? '#fde047' : '#bae6fd'}
              emissive={isNight ? '#f59e0b' : '#000000'}
              emissiveIntensity={isNight ? 1.8 : 0}
              roughness={0.2}
            />
          </mesh>
          {/* Window Wooden Frame & Mullions */}
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[1.18, 1.38, 0.05]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} wireframe />
          </mesh>
          {/* Cute Wooden Flower Box with Clay Flowers */}
          {hasFlowerBox && (
            <group position={[0, -0.75, 0.12]}>
              <mesh castShadow>
                <boxGeometry args={[1.2, 0.25, 0.25]} />
                <meshStandardMaterial color="#854d0e" roughness={0.7} />
              </mesh>
              {/* Green Clay Leaves & Red/Pink Blossoms */}
              {[-0.4, -0.15, 0.15, 0.4].map((fx, fi) => (
                <mesh key={`flw-${fi}`} position={[fx, 0.15, 0]}>
                  <sphereGeometry args={[0.09, 8, 8]} />
                  <meshStandardMaterial
                    color={fi % 2 === 0 ? '#ef4444' : '#ec4899'}
                    roughness={0.8}
                  />
                </mesh>
              ))}
            </group>
          )}
        </group>
      ))}

      {/* Gabled Pitched Roof with Overhang */}
      <group position={[0, height + 0.9, 0]}>
        {/* Main Gable Roof Prisms */}
        <mesh rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
          <coneGeometry args={[(width + 0.8) * 0.72, 1.8, 4]} />
          <meshStandardMaterial color={roofColor} roughness={0.5} />
        </mesh>
        {/* Roof Fascia Edge Trim */}
        <mesh position={[0, -0.85, 0]}>
          <boxGeometry args={[width + 0.6, 0.12, depth + 0.6]} />
          <meshStandardMaterial color="#475569" roughness={0.6} />
        </mesh>
      </group>

      {/* Miniature Clay Chimney with Smoke Rim */}
      {hasChimney && (
        <group position={[width * 0.25, height + 1.6, -depth * 0.15]}>
          <mesh castShadow>
            <boxGeometry args={[0.5, 1.2, 0.5]} />
            <meshStandardMaterial color="#b91c1c" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.62, 0]}>
            <boxGeometry args={[0.6, 0.08, 0.6]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
          </mesh>
        </group>
      )}
    </group>
  );
};

// -------------------------------------------------------------
// REUSABLE 2-STORY TOWNHOUSE COMPONENT
// -------------------------------------------------------------
interface Townhouse2StoryProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  width: number;
  depth: number;
  height: number;
  wallColor: string;
  roofColor: string;
  isNight?: boolean;
  hasBalcony?: boolean;
  hasTerrace?: boolean;
}

const Townhouse2Story: React.FC<Townhouse2StoryProps> = ({
  position,
  rotation = [0, 0, 0],
  width,
  depth,
  height,
  wallColor,
  roofColor,
  isNight = false,
  hasBalcony = true,
  hasTerrace = false,
}) => {
  const storyHeight = height / 2;

  return (
    <group position={position} rotation={rotation}>
      {/* Plinth */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.2, 0.2, depth + 0.2]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.6} />
      </mesh>

      {/* Floor 1 (Ground Floor) */}
      <mesh position={[0, storyHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, storyHeight, depth]} />
        <meshStandardMaterial color={wallColor} roughness={0.6} />
      </mesh>

      {/* Mid-Floor Cornice Band */}
      <mesh position={[0, storyHeight, 0]} castShadow>
        <boxGeometry args={[width + 0.25, 0.2, depth + 0.25]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      {/* Floor 2 (Upper Floor) */}
      <mesh position={[0, storyHeight + storyHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, storyHeight, depth]} />
        <meshStandardMaterial color={wallColor} roughness={0.6} />
      </mesh>

      {/* Ground Floor Entrance & Rolling Gate or Wooden Double Doors */}
      <group position={[-width * 0.18, 1.25, depth / 2 + 0.02]}>
        <mesh castShadow>
          <boxGeometry args={[1.8, 2.3, 0.08]} />
          <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Small Entrance Awning Canopy */}
        <mesh position={[0, 1.3, 0.35]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[2.0, 0.08, 0.7]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.5} />
        </mesh>
      </group>

      {/* Ground Floor Side Window */}
      <group position={[width * 0.26, 1.4, depth / 2 + 0.02]}>
        <mesh>
          <planeGeometry args={[1.2, 1.4]} />
          <meshStandardMaterial
            color={isNight ? '#fde047' : '#bae6fd'}
            emissive={isNight ? '#f59e0b' : '#000000'}
            emissiveIntensity={isNight ? 1.6 : 0}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[1.28, 1.48, 0.05]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} wireframe />
        </mesh>
      </group>

      {/* Floor 2 Windows & Cantilevered Balcony */}
      <group position={[0, storyHeight + 1.4, depth / 2 + 0.02]}>
        {/* Upper Double French Doors / Windows */}
        {[-width * 0.22, width * 0.22].map((wx, i) => (
          <group key={`f2-win-${i}`} position={[wx, 0, 0]}>
            <mesh>
              <planeGeometry args={[1.1, 1.6]} />
              <meshStandardMaterial
                color={isNight ? '#fef08a' : '#bae6fd'}
                emissive={isNight ? '#fbbf24' : '#000000'}
                emissiveIntensity={isNight ? 1.7 : 0}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, 0, 0.02]}>
              <boxGeometry args={[1.18, 1.68, 0.05]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} wireframe />
            </mesh>
          </group>
        ))}

        {/* 2nd Floor Balcony with Wrought Iron / Metal Railing */}
        {hasBalcony && (
          <group position={[0, -0.75, 0.45]}>
            {/* Balcony Slab */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[width * 0.8, 0.15, 0.9]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.4} />
            </mesh>
            {/* Front Balcony Railing */}
            <mesh position={[0, 0.5, 0.42]}>
              <boxGeometry args={[width * 0.8, 0.85, 0.04]} />
              <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} wireframe />
            </mesh>
            {/* Left & Right Railing Return */}
            {[-width * 0.4, width * 0.4].map((bx, bi) => (
              <mesh key={`balc-side-${bi}`} position={[bx, 0.5, 0]}>
                <boxGeometry args={[0.04, 0.85, 0.86]} />
                <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} wireframe />
              </mesh>
            ))}
            {/* Clay Flower Pots on Balcony */}
            {[-0.9, 0, 0.9].map((px, pi) => (
              <group key={`pot-${pi}`} position={[px, 0.2, 0.2]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.1, 0.07, 0.2, 8]} />
                  <meshStandardMaterial color="#ea580c" roughness={0.8} />
                </mesh>
                <mesh position={[0, 0.12, 0]}>
                  <sphereGeometry args={[0.12, 8, 8]} />
                  <meshStandardMaterial color="#22c55e" roughness={0.9} />
                </mesh>
              </group>
            ))}
          </group>
        )}
      </group>

      {/* Roof Type: Either Pitched Tile Roof OR Flat Rooftop Terrace */}
      {hasTerrace ? (
        // Flat Rooftop Terrace with Parapet Railing & Water Tank (Very popular in Vietnam!)
        <group position={[0, height + 0.1, 0]}>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[width + 0.3, 0.18, depth + 0.3]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
          </mesh>
          {/* Parapet Wall / Railing around roof */}
          <mesh position={[0, 0.45, depth / 2 + 0.1]}>
            <boxGeometry args={[width + 0.2, 0.75, 0.12]} />
            <meshStandardMaterial color={wallColor} roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.45, -depth / 2 - 0.1]}>
            <boxGeometry args={[width + 0.2, 0.75, 0.12]} />
            <meshStandardMaterial color={wallColor} roughness={0.6} />
          </mesh>
          {[-width / 2 - 0.1, width / 2 + 0.1].map((rx, ri) => (
            <mesh key={`terrace-side-${ri}`} position={[rx, 0.45, 0]}>
              <boxGeometry args={[0.12, 0.75, depth + 0.2]} />
              <meshStandardMaterial color={wallColor} roughness={0.6} />
            </mesh>
          ))}
          {/* Stainless Steel Cylindrical Water Tank on Stand */}
          <group position={[width * 0.25, 0.8, -depth * 0.25]}>
            <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.35, 0.35, 1.1, 12]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Stand Legs */}
            <mesh position={[0, -0.4, 0]}>
              <boxGeometry args={[1.0, 0.4, 0.6]} />
              <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} wireframe />
            </mesh>
          </group>
        </group>
      ) : (
        // Pitched Hip/Gable Roof
        <group position={[0, height + 0.9, 0]}>
          <mesh rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
            <coneGeometry args={[(width + 0.7) * 0.72, 1.8, 4]} />
            <meshStandardMaterial color={roofColor} roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.85, 0]}>
            <boxGeometry args={[width + 0.5, 0.14, depth + 0.5]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
        </group>
      )}
    </group>
  );
};

// -------------------------------------------------------------
// SURROUNDING NEIGHBORHOOD MASTER COMPONENT
// Evenly distributed 1-2 story residential houses on Left, Right & Front
// -------------------------------------------------------------
export const SurroundingNeighborhood: React.FC<SurroundingNeighborhoodProps> = ({ isNight = false }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* ========================================================= */}
      {/* 1. LEFT NEIGHBORHOOD ROW (Along X = -19.5, Z from -9 to +11) */}
      {/* Alternating 2-Story & 1-Story houses */}
      {/* ========================================================= */}
      {/* House L1: 2-Story Townhouse (Colonial Yellow + Terracotta Roof) */}
      <Townhouse2Story
        position={[-19.5, 0, -8.0]}
        rotation={[0, Math.PI / 2, 0]} // Faces inward towards McDonald's
        width={5.6}
        depth={4.6}
        height={6.8}
        wallColor="#fef08a" // Pastel yellow
        roofColor="#c2410c" // Terracotta tile
        isNight={isNight}
        hasBalcony={true}
        hasTerrace={false}
      />

      {/* House L2: 1-Story Cozy Cottage (Mint Green + Charcoal Tile Roof) */}
      <Cottage1Story
        position={[-19.5, 0, -1.8]}
        rotation={[0, Math.PI / 2, 0]}
        width={5.0}
        depth={4.4}
        height={3.8}
        wallColor="#bbf7d0" // Mint green
        roofColor="#334155" // Slate tile
        isNight={isNight}
        hasChimney={true}
        hasFlowerBox={true}
      />

      {/* House L3: 2-Story Modern Townhouse with Rooftop Terrace (Crisp White & Sky Blue) */}
      <Townhouse2Story
        position={[-19.5, 0, 4.6]}
        rotation={[0, Math.PI / 2, 0]}
        width={5.4}
        depth={4.5}
        height={6.9}
        wallColor="#bae6fd" // Sky blue
        roofColor="#b91c1c"
        isNight={isNight}
        hasBalcony={true}
        hasTerrace={true}
      />

      {/* House L4: 1-Story Corner Home (Warm Peach + Red Tile Roof) */}
      <Cottage1Story
        position={[-19.5, 0, 11.0]}
        rotation={[0, Math.PI / 2, 0]}
        width={4.8}
        depth={4.4}
        height={3.9}
        wallColor="#fed7aa" // Peach
        roofColor="#ea580c"
        isNight={isNight}
        hasChimney={false}
        hasFlowerBox={true}
      />

      {/* ========================================================= */}
      {/* 2. RIGHT NEIGHBORHOOD ROW (Along X = +19.5, Z from -9 to +11) */}
      {/* Alternating 2-Story & 1-Story houses */}
      {/* ========================================================= */}
      {/* House R1: 2-Story Townhouse (Warm Beige + Terracotta Roof) */}
      <Townhouse2Story
        position={[19.5, 0, -8.0]}
        rotation={[0, -Math.PI / 2, 0]} // Faces inward towards McDonald's
        width={5.6}
        depth={4.6}
        height={6.8}
        wallColor="#fde68a" // Warm beige
        roofColor="#c2410c"
        isNight={isNight}
        hasBalcony={true}
        hasTerrace={false}
      />

      {/* House R2: 1-Story Cottage (Pastel Lilac + Slate Roof) */}
      <Cottage1Story
        position={[19.5, 0, -1.8]}
        rotation={[0, -Math.PI / 2, 0]}
        width={5.0}
        depth={4.4}
        height={3.8}
        wallColor="#fbcfe8" // Soft pink/lilac
        roofColor="#1e293b"
        isNight={isNight}
        hasChimney={true}
        hasFlowerBox={true}
      />

      {/* House R3: 2-Story Townhouse with Roof Terrace (Clean Ivory White) */}
      <Townhouse2Story
        position={[19.5, 0, 4.6]}
        rotation={[0, -Math.PI / 2, 0]}
        width={5.4}
        depth={4.5}
        height={7.0}
        wallColor="#f8fafc" // Clean ivory
        roofColor="#ea580c"
        isNight={isNight}
        hasBalcony={true}
        hasTerrace={true}
      />

      {/* House R4: 1-Story Corner Home (Butter Yellow + Orange Tile Roof) */}
      <Cottage1Story
        position={[19.5, 0, 11.0]}
        rotation={[0, -Math.PI / 2, 0]}
        width={4.8}
        depth={4.4}
        height={3.9}
        wallColor="#fef08a"
        roofColor="#d97706"
        isNight={isNight}
        hasChimney={false}
        hasFlowerBox={true}
      />

      {/* ========================================================= */}
      {/* 3. FRONT ROW / ACROSS THE STREET (Along Z = 26.5, facing the street) */}
      {/* Alternating 2-Story & 1-Story residential buildings */}
      {/* ========================================================= */}
      {/* House F1: 2-Story Townhouse with Balcony */}
      <Townhouse2Story
        position={[-13.5, 0, 26.5]}
        rotation={[0, Math.PI, 0]} // Faces toward street (-Z)
        width={5.8}
        depth={4.6}
        height={7.0}
        wallColor="#e0f2fe" // Powder blue
        roofColor="#c2410c"
        isNight={isNight}
        hasBalcony={true}
        hasTerrace={false}
      />

      {/* House F2: 1-Story Cozy Home with Flower Box */}
      <Cottage1Story
        position={[-6.0, 0, 26.5]}
        rotation={[0, Math.PI, 0]}
        width={5.2}
        depth={4.5}
        height={4.1}
        wallColor="#fef3c7" // Warm cream
        roofColor="#b91c1c"
        isNight={isNight}
        hasChimney={true}
        hasFlowerBox={true}
      />

      {/* House F3: 2-Story Residence with Roof Terrace */}
      <Townhouse2Story
        position={[3.0, 0, 26.5]}
        rotation={[0, Math.PI, 0]}
        width={5.8}
        depth={4.6}
        height={7.1}
        wallColor="#dcfce7" // Soft pale green
        roofColor="#ea580c"
        isNight={isNight}
        hasBalcony={true}
        hasTerrace={true}
      />

      {/* House F4: 1-Story House with Pitched Tile Roof */}
      <Cottage1Story
        position={[12.0, 0, 26.5]}
        rotation={[0, Math.PI, 0]}
        width={5.2}
        depth={4.5}
        height={4.0}
        wallColor="#ffedd5" // Pale peach
        roofColor="#334155"
        isNight={isNight}
        hasChimney={false}
        hasFlowerBox={true}
      />

      {/* ========================================================= */}
      {/* 4. STREET FURNITURE & NEIGHBORHOOD CHARM ACCENTS */}
      {/* ========================================================= */}
      {/* Small street trees along neighborhood sidewalks */}
      {[-16.0, 16.0].map((tx, ti) => (
        <group key={`nbr-tree-${ti}`} position={[tx, 0, 8.5]}>
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.15, 2.4, 8]} />
            <meshStandardMaterial color="#78350f" roughness={0.8} />
          </mesh>
          <mesh position={[0, 2.6, 0]} castShadow>
            <sphereGeometry args={[0.7, 12, 12]} />
            <meshStandardMaterial color="#16a34a" roughness={0.85} />
          </mesh>
        </group>
      ))}

      {/* Opposite Sidewalk Trees */}
      {[-10.0, 8.0].map((tx, ti) => (
        <group key={`opp-tree-${ti}`} position={[tx, 0, 23.5]}>
          <mesh position={[0, 1.1, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.14, 2.2, 8]} />
            <meshStandardMaterial color="#78350f" roughness={0.8} />
          </mesh>
          <mesh position={[0, 2.4, 0]} castShadow>
            <sphereGeometry args={[0.65, 12, 12]} />
            <meshStandardMaterial color="#22c55e" roughness={0.85} />
          </mesh>
        </group>
      ))}

      {/* Fire Hydrant on Opposite Sidewalk */}
      <group position={[-2.5, 0, 23.2]}>
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.14, 0.5, 8]} />
          <meshStandardMaterial color="#ef4444" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.52, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#ef4444" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
};
