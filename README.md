# 🍟 McDonald's Miniature World (3D Interactive Architecture Experience)

An interactive, high-fidelity 3D web experience transforming a handmade architectural model of a McDonald's restaurant into a spacious, navigable virtual diorama world.

Built with **React 19**, **TypeScript**, **Three.js**, **React Three Fiber (@react-three/fiber)**, **@react-three/drei**, **Tailwind CSS v4**, and procedural canvas shaders & Web Audio synthesis.

Directly reconstructed and refined from the CAD blueprint drawings, 3D architectural renders, and real physical photographs provided by the creator.

---

## 🌟 Key Upgraded Architectural Features

1. **Spacious, Open High-Ceiling Interior ("Không gian rộng mở, thoáng đãng")**:
   - Expanded footprint (~27.0 x 19.0 units with double-height mezzanine at Y = 4.8 and overall roof height Y = 9.0).
   - Generous walking corridors around the central Aquarium, dining section, and creative zone for effortless exploration.

2. **The Giant 3D Golden Arches 'M' Entrance Portal**:
   - Iconic curved 3D yellow McDonald's Golden Arches 'M' archway framing the central double glass entrance doors (`render_exterior_golden_arch.jpg` & CAD Front Elevation).
   - Visible both from the street and from inside the restaurant looking out.

3. **Miniature Toy Sports Cars on Sidewalk (Hot Wheels Diecast Racers)**:
   - Silver sports racer and Red race car parked on the left sidewalk.
   - Orange sports coupe and Red GT racer parked on the right sidewalk.

4. **Starry Night / Galaxy Cosmic Nebula Ceiling & Industrial Pendants**:
   - Breathtaking cosmic Milky Way / Galaxy ceiling mural stretching across the high roof (`render_interior_mezzanine_galaxy.jpg`).
   - 8 hanging industrial brass/black cone pendant lamps casting warm ambient light pools.

5. **Centerpiece Aquarium on Grey Stone Plinth ("Hồ Thủy Sinh Bệ Đá")**:
   - Textured slate-grey stone tile pedestal base.
   - Crystal-clear acrylic glass tank with open top.
   - Vibrant coral reef: cyan/blue branching corals, pink sea fans, tall green kelp, orange clownfish Nemo, pink clay octopus with eye dots on sea rocks, starfish, and continuous rising bubble streams.

6. **Elevated Mezzanine Gallery, Da Nang Dragon Bridge & McCafé**:
   - Bright sunny yellow platform edge with modern stainless steel wire-cable safety railings.
   - Row of soft velvet beanbag poufs: yellow, cream, white, blue, and teal.
   - Panoramic Da Nang Golden Dragon Bridge (`Cầu Rồng`) breathing fire with festive fireworks (glows with radiant golden emission in Night mode!).
   - McCafé service bar with 4-panel digital menu display, glass pastry showcase (`Tủ bánh`), and espresso machine.
   - Slanted teak wooden staircase with 13 open treads and modern handrails.

7. **Creative Zone with Mascot Standees & 4 Pull-out Toy Bins**:
   - "WELCOME TO DUE - HAPPY, BE BRIGHT" mascot standees with blue dog and pink bear (`photo_real_creative_aquarium_detail.jpg`).
   - Dark slate-grey 16x16 Lego plate with interlocking 3D bricks (pink, blue, yellow, orange, green).
   - Red wooden 2-tier rack with 4 clear pull-out plastic tubs filled with colorful toy bricks.
   - Clickable: triggers festive confetti cannon!

8. **"TỦ CÂY THỦY SINH" (3-Tier Hydroponic LED Plant Cabinet)**:
   - Rich dark walnut wood cabinet with front glass sliding doors.
   - 3 tiers of fresh green miniature salad greens illuminated by internal white LED grow lights.
   - Bold white label plaque: `TỦ CÂY THỦY SINH`.
   - Glossy black Japanese Lucky Cat (`Maneki-neko`) with golden bell and waving paw (clickable to ring lucky chime!).
   - Miniature red McDonald's french fry carton with overflowing golden fries.
   - Pastel lilac side cabinet.

9. **Kids Room & Interactive Rainbow Piano Keyboard**:
   - Patchwork graphic entrance wall with hand-drawn pastel doodles (dinosaur, rocket, rainbow, cats, car, numbers, ABC).
   - Interior green Lego stud plate floor.
   - Rainbow piano keyboard with 8 interactive keys (`C4` to `C5`) and black accidentals. **Clicking keys plays real musical notes via Web Audio synthesizer!**
   - Framed `TOM AND JERRY - FRENEMIES FOREVER` Happy Meal poster.

---

## 🎮 Interactive Controls & Shortcuts

| Action | Control |
|---|---|
| **Rotate 360°** | Left Click + Drag (or 1 Finger on Touch) |
| **Pan Camera** | Right Click + Drag (or 2 Fingers on Touch) |
| **Zoom In / Out** | Scroll Wheel (or Pinch on Touch) |
| **Quick Jump 9 Zones** | Bottom Floating Dock or Keyboard Keys `1` - `9` |
| **Day / Night Mode** | Header Sun/Moon Button or Keyboard Key `N` |
| **Sound Mute / Unmute** | Header Volume Button or Keyboard Key `M` |
| **Reset Camera** | Header Reset Button or Keyboard Key `R` |
| **Help & Guide** | Header Help Button or Keyboard Key `H` |
| **Inspect Blueprints & Real Photos** | Header `Tài Liệu & Ảnh Thật` Button |
| **Toggle Interactive Beacon Pins** | Header Eye Button |
| **Hide / Show UI** | Bottom-Right Floating Eye Button |
| **Fullscreen** | Header Maximize Button |

---

## 🚀 Development & Preview

```bash
# Start Dev Server
pnpm dev

# Build Production Bundle
pnpm run build

# Preview Production Server
pnpm run preview --port 4173
```
