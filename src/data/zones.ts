import type { ZoneConfig, InteractiveObjectInfo } from '../types';

export const ZONES: ZoneConfig[] = [
  {
    id: 'overview',
    name: 'Toàn Cảnh Mô Hình Kiến Trúc',
    shortName: 'Toàn Cảnh',
    icon: 'Layers',
    description: 'Chiêm ngưỡng toàn bộ không gian kiến trúc McDonald\'s thu nhỏ thoáng đãng, rộng rãi với trần dải ngân hà Starry Night, hồ thủy sinh trung tâm, quầy McCafé tầng lửng và cổng vòm vàng khổng lồ.',
    cameraPosition: [24, 22, 28],
    targetPosition: [0, 2.5, 0],
    photoUrl: '/reference/render_interior_mezzanine_galaxy.jpg',
    photoCaption: 'Phối cảnh 3D không gian mở với trần dải ngân hà và tầng lửng quầy McCafé',
    highlights: [
      'Không gian kiến trúc mở rộng thoáng đãng chuẩn bản vẽ kỹ thuật CAD',
      'Trần dải ngân hà Starry Night lộng lẫy cùng hệ đèn thả công nghiệp',
      'Đầy đủ 9 phân khu chức năng kết nối liên hoàn',
      'Hệ thống chiếu sáng ngày / đêm đa sắc thái rực rỡ'
    ],
    features: ['Cổng vòm vàng Golden Arches', 'Trần sao dải ngân hà', 'Hồ thủy sinh bệ đá', 'Tầng lửng quầy McCafé', 'Bức tường LEGO sáng tạo']
  },
  {
    id: 'exterior',
    name: 'Mặt Tiền & Cổng Vòm Vàng',
    shortName: 'Mặt Tiền',
    icon: 'Store',
    description: 'Mặt tiền màu đen sang trọng nổi bật với CỔNG VÒM VÀNG GOLDEN ARCHES 3D khổng lồ trước sảnh chính, dàn xe đua thể thao Hot Wheels trên vỉa hè, biển Fries Before Guys và cột cờ pylon vươn cao.',
    cameraPosition: [1.5, 4.5, 17.5],
    targetPosition: [1.5, 3.5, 8.0],
    photoUrl: '/reference/render_exterior_golden_arch.jpg',
    photoCaption: 'Phối cảnh mặt đứng chính với cổng vòm vàng Golden Arches và dàn xe thể thao',
    highlights: [
      'Cổng vòm vàng khổng lồ Golden Arches 3D uốn cong ôm trọn sảnh ra vào',
      'Dàn xe đua thể thao miniature (Hot Wheels) đậu trên vỉa hè',
      'Biển hiệu đen chữ nổi 3D "McDONALD\'S" và logo McCafé chữ đỏ trên gỗ',
      'Billboard "FRIES BEFORE GUYS" vẽ tay phấn bảng sắc nét'
    ],
    features: ['Cửa kính lớn 4 cánh', 'Bồn hoa nấm đất sét chấm bi', '2 cây xanh miniature', 'Cột cờ Pylon cao vút']
  },
  {
    id: 'mccafe',
    name: 'McCafé & Tầng Lửng',
    shortName: 'McCafé',
    icon: 'Coffee',
    description: 'Không gian cà phê thư giãn trên tầng lửng với quầy bar vàng tươi, tủ kính trưng bày bánh ngọt tươi ngon, hàng ghế lười beanbag nhiều màu và bức tranh toàn cảnh Cầu Rồng Đà Nẵng lung linh về đêm.',
    cameraPosition: [6.5, 7.5, 2.5],
    targetPosition: [8.5, 5.0, -3.5],
    photoUrl: '/reference/render_interior_mezzanine_galaxy.jpg',
    photoCaption: 'Tầng lửng với quầy pha chế McCafé, hàng ghế lười và tranh Cầu Rồng Đà Nẵng',
    highlights: [
      'Quầy phục vụ McCafé chữ L màu vàng ấm áp',
      'Tủ trưng bày bánh tươi: Croissant, Donut, Muffin',
      'Hàng ghế lười beanbag soft velvet nhiều màu sắc',
      'Backdrop panorama Cầu Rồng Đà Nẵng phun lửa kèm pháo hoa rực rỡ'
    ],
    features: ['Thực đơn 4 màn hình McCafé', 'Lan can inox hiện đại', 'Cầu thang gỗ teak 13 bậc']
  },
  {
    id: 'creative-zone',
    name: 'Khu Sáng Tạo (Creative Zone)',
    shortName: 'Sáng Tạo',
    icon: 'Sparkles',
    description: 'Góc vui chơi sáng tạo với mảng tường LEGO 16x16 đinh tán gắn các khối gạch 3D đa sắc màu, biển hiệu Mascot "Welcome to DUE - Happy, Be Bright" và kệ đồ chơi màu đỏ có 4 khay chứa trong suốt.',
    cameraPosition: [-4.0, 4.2, -5.5],
    targetPosition: [-4.0, 2.8, -10.4],
    photoUrl: '/reference/photo_real_creative_aquarium_detail.jpg',
    photoCaption: 'Chi tiết thực tế mảng tường LEGO và mascot Welcome to DUE',
    highlights: [
      'Bảng mascot hoạt hình Welcome to DUE - Happy, be bright trên đỉnh tường',
      'Tấm đế LEGO đinh tròn màu xám gắn các khối ghép 3D màu hồng, xanh, vàng, cam',
      'Kệ gỗ đỏ 2 tầng với 4 khay nhựa trong suốt chứa đầy khối gạch xếp hình',
      'Bảng hiệu bong bóng viền xanh dương "CREATIVE ZONE"'
    ],
    features: ['Bấm vào tường LEGO để bắn pháo hoa giấy', 'Kích thích trí tưởng tượng trẻ nhỏ']
  },
  {
    id: 'aquarium',
    name: 'Hồ Thủy Sinh Bệ Đá Trung Tâm',
    shortName: 'Bể Cá',
    icon: 'Fish',
    description: 'Điểm nhấn nghệ thuật ấn tượng nhất của nhà hàng: Bể kính thủy sinh trong suốt đặt trên bệ ốp đá xám tự nhiên, bên trong có rặng san hô đa sắc, chú cá hề Nemo, bạch tuộc hồng, sao biển và bọt nước sủi tăm.',
    cameraPosition: [-1.2, 4.5, 6.2],
    targetPosition: [-1.2, 2.2, 0.4],
    photoUrl: '/reference/render_interior_mezzanine_galaxy.jpg',
    photoCaption: 'Hồ thủy sinh bệ ốp đá xám với rặng san hô xanh và đàn cá bơi lội',
    highlights: [
      'Bệ hồ ốp đá xám tự nhiên vân đá sang trọng (stone tile plinth)',
      'Kính trong suốt có độ khúc xạ nước và caustics lung linh',
      'Chú cá hề Nemo sọc cam trắng bơi đậu trên ngọn rong xanh',
      'Chú bạch tuộc hồng mắt đen, sao biển đỏ, san hô xanh và tím',
      'Hệ thống bọt nước sủi tăm liên tục từ đáy hồ'
    ],
    features: ['Bọt nước sủi tăm liên tục', 'Đàn cá bơi lội tuần hoàn', 'Bấm vào bể để khuấy động đàn cá']
  },
  {
    id: 'kids-room',
    name: 'Khu Vui Chơi Trẻ Em',
    shortName: 'Kids Room',
    icon: 'Smile',
    description: 'Cổng vào khu vui chơi rực rỡ với các ô gạch patchwork pastel vẽ tay ngộ nghĩnh (gấu teddy, khủng long, tên lửa, cầu vồng, mèo con) và biển hiệu Kids Room nổi bật.',
    cameraPosition: [8.5, 4.5, 0.5],
    targetPosition: [8.5, 2.8, -6.8],
    photoUrl: '/reference/cad_blueprint_master.jpg',
    photoCaption: 'Bản vẽ kỹ thuật mặt bên và chi tiết phòng Kids Room',
    highlights: [
      'Mảng tường hoa văn ghép mảnh pastel (patchwork tiles)',
      'Họa tiết vẽ tay: Cầu vồng, ông mặt trời, tàu vũ trụ, chữ số 12, xe hơi',
      'Biển chữ nổi 3D "KIDS ROOM" viền đen chữ vàng',
      'Ô cửa sổ lớn nhìn thông giữa phòng Kids Room và Creative Zone'
    ],
    features: ['Kết nối liên thông với cầu thang gỗ', 'Cửa sổ nhìn ra sảnh chính']
  },
  {
    id: 'music-room',
    name: 'Phòng Nhạc & Tom & Jerry',
    shortName: 'Phòng Nhạc',
    icon: 'Music',
    description: 'Bên trong phòng thiếu nhi là sàn phím đàn piano 7 sắc cầu vồng có thể phát ra âm thanh nốt nhạc thực sự, sàn gạch LEGO xanh lá và poster Tom & Jerry Happy Meal.',
    cameraPosition: [8.5, 8.8, -6.8],
    targetPosition: [8.5, 1.5, -6.8],
    photoUrl: '/reference/photo_music_room_top.jpg',
    photoCaption: 'Góc chụp từ trên nhìn thẳng vào bàn phím piano cầu vồng và poster Tom & Jerry',
    highlights: [
      'Bàn phím đàn piano cầu vồng có thể CLICK để chơi nhạc thật!',
      'Sàn đế LEGO xanh lá cây đặc trưng với hàng đinh tán tròn',
      'Poster Tom & Jerry Happy Meal phiên bản tiếng Việt',
      'Cầu thang gỗ thông tự nhiên đặt sát vách tường'
    ],
    features: ['Bấm từng phím đàn để nghe nốt nhạc Đồ Rê Mi Pha Sol La Si', 'Âm thanh synthesizer không gián đoạn']
  },
  {
    id: 'food-counter',
    name: 'Tủ Thủy Sinh LED & Quầy Menu',
    shortName: 'Tủ Menu',
    icon: 'Utensils',
    description: 'Tủ gỗ trưng bày rau củ thủy sinh 3 tầng tích hợp đèn LED grow lights, bên cạnh có mèo thần tài Maneki-neko, hộp khoai tây chiên mini, tủ phụ màu tím nhạt và bảng menu 4 màn hình.',
    cameraPosition: [1.5, 4.2, -5.5],
    targetPosition: [1.5, 2.6, -10.4],
    photoUrl: '/reference/photo_real_creative_aquarium_detail.jpg',
    photoCaption: 'Cận cảnh thực tế tủ cây thủy sinh 3 tầng có đèn chiếu và mèo thần tài',
    highlights: [
      'Tủ gỗ óc chó 3 tầng có dán nhãn "TỦ CÂY THỦY SINH"',
      'Hệ đèn LED grow lights chiếu sáng từng tầng cây xanh mơn mởn',
      'Tủ phụ màu tím nhạt (lilac cabinet) đặt cạnh tủ cây',
      'Mèo vẫy tay may mắn Maneki-neko đen bóng có thể bấm để nghe chuông',
      'Hệ thống bảng menu 4 màn hình kỹ thuật số độ nét cao'
    ],
    features: ['Bấm mèo may mắn để rung chuông', 'Xem chi tiết các món ăn trên bảng thực đơn']
  },
  {
    id: 'dining-area',
    name: 'Khu Bàn Ăn & Check-in',
    shortName: 'Bàn Ăn',
    icon: 'Camera',
    description: 'Khu vực bàn ăn gỗ rộng rãi, ghế ngồi êm ái, bồn cây cảnh gắn tường thanh lịch cùng khung chụp hình selfie "Check-in cùng McDonald\'s" cực hot.',
    cameraPosition: [-8.5, 4.5, 6.5],
    targetPosition: [-8.5, 2.0, 0.0],
    photoUrl: '/reference/render_interior_mezzanine_galaxy.jpg',
    photoCaption: 'Dãy bàn ăn gỗ dưới trần cao và khung check-in chụp ảnh chân đứng',
    highlights: [
      'Bàn ăn bằng gỗ thông ấm cúng với ghế gỗ đồng bộ',
      'Bồn hoa cây cảnh xanh treo trên mảng tường nhấn xám',
      'Khung check-in "Check-in cùng McDonald\'s #ImLovinIt" có chân đế',
      'Bánh Big Mac, khoai chiên và ly nước ngọt mini đặt trên bàn'
    ],
    features: ['Bấm vào khung ảnh để chụp hình flash', 'Góc nhìn thoáng đãng ngắm hồ cá']
  }
];

export const INTERACTIVE_OBJECTS: InteractiveObjectInfo[] = [
  {
    id: 'aquarium-tank',
    name: 'Hồ Cá Bệ Đá Thủy Sinh',
    zoneId: 'aquarium',
    position: [-1.2, 2.2, 0.4],
    title: 'Hồ Kính Thủy Sinh Bệ Đá Trung Tâm',
    subtitle: 'Nghệ thuật sinh thái biển thu nhỏ với bệ đá tự nhiên',
    description: 'Hồ cá được chế tác từ các tấm kính mica trong suốt đặt trên bệ ốp đá xám tự nhiên cao cấp. Bên trong là rặng san hô xanh ngọc, chú cá hề Nemo sọc cam trắng, chú bạch tuộc hồng ngộ nghĩnh, sao biển và đàn cá bơi lội tuần hoàn.',
    handmadeDetails: 'Vật liệu: Nhựa mica trong suốt, bệ đá tự nhiên, đất sét tạo hình tự khô, màu nước acrylic, cát thủy sinh xanh nhạt.',
    photoUrl: '/reference/render_interior_mezzanine_galaxy.jpg',
    actionText: 'Cho cá ăn & sủi bọt',
    actionType: 'bubbles'
  },
  {
    id: 'piano-keyboard',
    name: 'Đàn Piano Cầu Vồng',
    zoneId: 'music-room',
    position: [8.5, 0.35, -8.9],
    title: 'Bàn Phím Piano Sắc Màu',
    subtitle: 'Nhạc cụ tí hon trong Kids Room',
    description: 'Một bàn phím piano đầy đủ nốt nhạc được vẽ tay bằng bút dạ 7 sắc cầu vồng. Từng phím trắng và đen đều có thể tương tác phát ra cao độ chuẩn xác từ nốt Đô đến Đố.',
    handmadeDetails: 'Vật liệu: Bìa giấy Bristol trắng, màu lông dạ đa sắc, bút mực đen nét mảnh.',
    photoUrl: '/reference/photo_music_room_top.jpg',
    actionText: 'Chơi nốt nhạc',
    actionType: 'piano'
  },
  {
    id: 'hydroponic-cabinet',
    name: 'Tủ Cây Thủy Sinh',
    zoneId: 'food-counter',
    position: [1.1, 1.8, -9.8],
    title: 'Tủ Cây Thủy Sinh & Rau Sạch 3 Tầng',
    subtitle: 'Hệ thống thủy canh tuần hoàn công nghệ cao trong nhà hàng',
    description: 'Tủ gỗ sang trọng với 3 tầng kính thủy sinh kết hợp hệ thống đèn LED quang hợp chuyên dụng (grow lights). Bên trong nuôi trồng các loại cây thủy sinh, rêu tươi, rau xà lách sạch và rau mầm tươi non phục vụ trực tiếp cho thực khách.',
    handmadeDetails: 'Vật liệu: Khung gỗ tự nhiên, 3 đợt kính trong suốt, đất sét polymer tạo hình các cụm cây thủy sinh màu xanh ngọc & xanh lá, thanh đèn LED quang sinh học.',
    photoUrl: '/reference/photo_real_creative_aquarium_detail.jpg',
    actionText: 'Tưới cây & bật đèn quang hợp',
    actionType: 'bubbles'
  },
  {
    id: 'maneki-neko',
    name: 'Mèo Thần Tài Maneki-Neko',
    zoneId: 'food-counter',
    position: [3.1, 2.8, -10.0],
    title: 'Mèo May Mắn Nhật Bản',
    subtitle: 'Tượng phong thủy đặt trên tủ cạnh tủ cây thủy sinh',
    description: 'Chú mèo may mắn màu đen bóng bẩy với chiếc chuông vàng và bàn tay vẫy chào đón khách hàng đến với nhà hàng McDonald\'s. Bên cạnh là một hộp khoai tây chiên McDonald\'s vàng giòn tí hon.',
    handmadeDetails: 'Vật liệu: Đất sét polymer nặn tay, sơn phủ bóng men gốm, chuông vàng mini.',
    photoUrl: '/reference/photo_real_creative_aquarium_detail.jpg',
    actionText: 'Lắc chuông may mắn',
    actionType: 'cat'
  },
  {
    id: 'lego-creative-wall',
    name: 'Bức Tường LEGO Sáng Tạo',
    zoneId: 'creative-zone',
    position: [-4.0, 3.2, -10.3],
    title: 'Bảng Đồ Chơi LEGO 16x16 Studs',
    subtitle: 'Khu phát triển tư duy sáng tạo cùng Mascot Welcome to DUE',
    description: 'Mảng tường đặc biệt được ốp tấm đế LEGO đinh tán màu xám chì. Khách nhí có thể tự do đính các khối gạch màu hồng, vàng, xanh, cam. Phía dưới là kệ gỗ đỏ với 4 khay chứa đầy đồ chơi xếp hình.',
    handmadeDetails: 'Vật liệu: Tấm đế nhựa LEGO thật cắt gọt, các khối gạch nhựa ABS miniature, khay trong suốt.',
    photoUrl: '/reference/photo_real_creative_aquarium_detail.jpg',
    actionText: 'Bắn pháo hoa sáng tạo',
    actionType: 'confetti'
  },
  {
    id: 'mccafe-counter',
    name: 'Quầy Pha Chế McCafé',
    zoneId: 'mccafe',
    position: [8.5, 5.5, -3.5],
    title: 'Quầy Bar McCafé Tầng Lửng',
    subtitle: 'Thưởng thức cà phê & ngắm Cầu Rồng và Trần sao',
    description: 'Quầy phục vụ hình chữ L được sơn màu vàng rực rỡ và ốp gỗ sang trọng. Tủ kính bên trên chứa đầy bánh sừng bò, bánh muffin và các thức uống đá xay mát lạnh dưới trần sao dải ngân hà.',
    handmadeDetails: 'Vật liệu: Gỗ tự nhiên, bìa carton nẹp góc, sơn acrylic vàng nắng, mica mô phỏng kính tủ bánh.',
    photoUrl: '/reference/render_interior_mezzanine_galaxy.jpg',
    actionText: 'Pha một ly cà phê',
    actionType: 'coffee'
  },
  {
    id: 'fries-billboard',
    name: 'Biển Fries Before Guys',
    zoneId: 'exterior',
    position: [-11.2, 4.0, 8.2],
    title: 'Biển Hiệu Quảng Cáo Fries Before Guys',
    subtitle: 'Tác phẩm typography phấn bảng cực chất',
    description: 'Tấm biển quảng cáo cỡ lớn đứng ngoài mặt tiền với dòng chữ "FRIES BEFORE GUYS" vẽ tay phấn trắng và vàng trên nền bảng đỏ mận. Hộp khoai tây chiên họa tiết ca-rô đỏ trắng tràn đầy những cọng khoai giòn tan.',
    handmadeDetails: 'Vật liệu: Bìa xốp ép cứng, phấn màu pastel, bút sơn Posca trắng và vàng nghệ.',
    photoUrl: '/reference/render_exterior_golden_arch.jpg',
    actionText: 'Thưởng thức khoai giòn',
    actionType: 'fries'
  },
  {
    id: 'checkin-booth',
    name: 'Khung Check-in Selfie',
    zoneId: 'dining-area',
    position: [-6.7, 2.4, 4.8],
    title: 'Khung Chụp Ảnh Check-In Cùng McDonald\'s',
    subtitle: 'Góc sống ảo xinh xắn cho thực khách',
    description: 'Khung ảnh hình chữ nhật dựng đứng trên 2 chân đế đen mô phỏng giao diện Instagram / Polaroid với khẩu hiệu "#i\'m lovin\' it" và các icon bánh burger, khoai tây chiên vui nhộn.',
    handmadeDetails: 'Vật liệu: Giấy ảnh in cán bóng, thanh gỗ nẹp khung, chân đế nhựa composite.',
    photoUrl: '/reference/render_interior_mezzanine_galaxy.jpg',
    actionText: 'Bấm máy chụp ảnh',
    actionType: 'flash'
  },
  {
    id: 'tom-jerry-poster',
    name: 'Poster Tom & Jerry Happy Meal',
    zoneId: 'music-room',
    position: [8.5, 4.2, -9.4],
    title: 'Tranh Treo Tường Tom and Jerry',
    subtitle: 'Chương trình đồ chơi Happy Meal vui nhộn',
    description: 'Bức tranh Tom & Jerry Frenemies Forever đóng khung trang trí cho phòng nhạc. Mèo Tom và chuột Jerry đùa nghịch bên cạnh chiếc hộp Happy Meal màu đỏ có quai xách cánh vòm vàng nở nụ cười.',
    handmadeDetails: 'Vật liệu: Bìa cứng, tranh in màu độ nét cao, viền nẹp sơn đỏ bóng.',
    photoUrl: '/reference/photo_music_room_top.jpg',
    actionText: 'Nhận quà Happy Meal',
    actionType: 'confetti'
  }
];
