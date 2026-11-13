import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, Check } from 'lucide-react';
import { soundManager } from '../../audio/soundManager';

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPhotoUrl?: string | null;
}

interface GalleryItem {
  url: string;
  title: string;
  area: string;
  description: string;
  reconstructedIn3D: string[];
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    url: '/reference/cad_blueprint_master.jpg',
    title: 'Bản Vẽ Kỹ Thuật CAD Kiến Trúc & Mặt Bằng',
    area: 'Bản Vẽ Kỹ Thuật (CAD Blueprints)',
    description: 'Hồ sơ bản vẽ thiết kế kỹ thuật chuẩn xác gồm Mặt bằng tổng thể (Floor Plan), Mặt đứng chính (Front Elevation), Mặt cắt dọc A-A (Section A-A) và Mặt bên & Chi tiết (Side Elevation & Details) xác định cao độ tầng lửng, kích thước hồ cá, cầu thang và hệ thống phân khu.',
    reconstructedIn3D: [
      'Tỉ lệ chuẩn xác 100% theo bản vẽ kiến trúc 2000x2000mm',
      'Cao độ tầng lửng và mặt cắt dọc A-A chuẩn kỹ thuật',
      'Kích thước hồ cá thủy sinh đặt chính giữa trục trung tâm',
      'Bố trí cầu thang, bàn ăn và khu Kids Room theo đúng thiết kế'
    ]
  },
  {
    url: '/reference/render_exterior_golden_arch.jpg',
    title: 'Mặt Tiền & Cổng Vòm Vàng Golden Arches',
    area: 'Phối Cảnh Mặt Đứng Chính',
    description: 'Phối cảnh 3D mặt đứng chính tuyệt đẹp với Cổng vòm vàng khổng lồ Golden Arches 3D uốn cong ôm trọn sảnh ra vào, dàn xe đua thể thao Hot Wheels miniature trên vỉa hè, biển hiệu McDONALD\'S chữ nổi, logo McCafe vân gỗ và billboard Fries Before Guys.',
    reconstructedIn3D: [
      'Cổng vòm vàng Golden Arches 3D cong vút ngay cửa chính',
      '4 xe đua thể thao miniature (bạc, đỏ, cam, đỏ GT) trên vỉa hè',
      'Biển hiệu đen chữ nổi trắng 3D McDONALD\'S sắc nét',
      'Bồn hoa nấm đất sét chấm bi trắng và 2 cây xanh miniature'
    ]
  },
  {
    url: '/reference/render_interior_mezzanine_galaxy.jpg',
    title: 'Nội Thất Không Gian Mở & Trần Sao Dải Ngân Hà',
    area: 'Phối Cảnh Nội Thất Tổng Thể',
    description: 'Phối cảnh góc nhìn nội thất rộng mở, thoáng đãng với trần sao dải ngân hà Starry Night lộng lẫy, dàn đèn thả công nghiệp ánh vàng ấm áp, hồ thủy sinh bệ ốp đá xám tự nhiên, tầng lửng quầy McCafé viền vàng và bức tranh toàn cảnh Cầu Rồng Đà Nẵng phun lửa.',
    reconstructedIn3D: [
      'Không gian kiến trúc cao rộng, thoáng đãng dễ quan sát',
      'Trần dải ngân hà Starry Night cùng 8 đèn thả công nghiệp ánh sáng ấm',
      'Hồ cá bệ đá tự nhiên với san hô xanh ngọc và bạch tuộc hồng',
      'Tầng lửng quầy McCafé với hàng ghế lười beanbag nhiều màu'
    ]
  },
  {
    url: '/reference/photo_real_creative_aquarium_detail.jpg',
    title: 'Cận Cảnh Thực Tế Tủ Thủy Sinh & Mascot DUE',
    area: 'Chi Tiết Vật Thể Thủ Công Thực Tế',
    description: 'Bức ảnh chụp thực tế cận cảnh tủ gỗ cây thủy sinh 3 tầng tích hợp đèn LED grow lights, chú mèo thần tài đen Maneki-neko, hộp khoai mini, bảng hiệu mascot "Welcome to DUE - Happy, Be Bright" và mảng tường đinh tán LEGO Creative Zone.',
    reconstructedIn3D: [
      'Tủ gỗ óc chó 3 tầng chiếu đèn LED grow lights sáng rực',
      'Mèo thần tài đen bóng Maneki-neko có thể bấm lắc chuông',
      'Bảng mascot hoạt hình Welcome to DUE trên nóc tường',
      'Kệ gỗ đỏ với 4 khay trong suốt chứa đầy khối gạch LEGO'
    ]
  },
  {
    url: '/reference/photo_exterior_front.jpg',
    title: 'Mặt Tiền Mô Hình Giấy Thủ Công',
    area: 'Mô Hình Handmade Thực Tế',
    description: 'Ảnh chụp mặt tiền mô hình làm bằng bìa carton, giấy vẽ và đất sét nặn tay thể hiện sự tỉ mỉ của từng chi tiết nấm đất sét, cây xanh và chữ viết phấn bảng.',
    reconstructedIn3D: [
      'Chất liệu bìa mô hình và giấy vẽ thủ công nguyên bản',
      'Biển hiệu và chữ viết tay Mc Cafe',
      'Cột cờ pylon vươn cao ở góc phải'
    ]
  },
  {
    url: '/reference/photo_kids_room_aquarium.jpg',
    title: 'Hồ Cá Mica & Cổng Kids Room',
    area: 'Điểm Nhấn Nghệ Thuật Trung Tâm',
    description: 'Cận cảnh hồ thủy sinh bằng mica trong suốt với chú cá hề Nemo sọc cam trắng bơi đậu trên ngọn rong, chú bạch tuộc hồng và cổng vòm Kids Room patchwork pastel vẽ tay.',
    reconstructedIn3D: [
      'Kính mica trong suốt có độ khúc xạ ánh sáng thực',
      'Cá hề Nemo và bạch tuộc hồng bằng đất sét 3D',
      'Cổng Kids Room hoa văn thiếu nhi vẽ tay sinh động'
    ]
  },
  {
    url: '/reference/photo_music_room_top.jpg',
    title: 'Phòng Nhạc Thiếu Nhi & Tom & Jerry',
    area: 'Kids Room & Music Room',
    description: 'Góc chụp từ trên nhìn thẳng vào phòng nhạc: Bàn phím đàn piano 7 sắc cầu vồng vẽ tay, sàn gạch LEGO xanh lá cây đặc trưng, bức tranh poster Tom and Jerry Happy Meal.',
    reconstructedIn3D: [
      'Bàn phím piano 7 sắc cầu vồng CÓ THỂ BẤM CHƠI NHẠC THẬT!',
      'Sàn gạch LEGO xanh lá với hàng đinh tán hình trụ tròn',
      'Poster Happy Meal Tom & Jerry phiên bản sách và đồ chơi'
    ]
  }
];

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({
  isOpen,
  onClose,
  initialPhotoUrl,
}) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (initialPhotoUrl) {
      const idx = GALLERY_ITEMS.findIndex((item) => item.url === initialPhotoUrl);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  if (!isOpen) return null;

  const currentItem = GALLERY_ITEMS[currentIndex];

  const handlePrev = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : GALLERY_ITEMS.length - 1));
  };

  const handleNext = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev < GALLERY_ITEMS.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-stone-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Large Photo Viewer */}
        <div className="relative md:w-3/5 bg-black/60 flex items-center justify-center p-4 min-h-[300px] md:min-h-[500px]">
          <img
            src={currentItem.url}
            alt={currentItem.title}
            className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl"
          />

          {/* Prev / Next Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/80 text-white hover:bg-amber-500 hover:text-stone-950 transition-all cursor-pointer border border-white/15 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/80 text-white hover:bg-amber-500 hover:text-stone-950 transition-all cursor-pointer border border-white/15 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Photo Counter Pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-xs font-bold text-amber-400 border border-white/10">
            Tài liệu & ảnh thực tế {currentIndex + 1} / {GALLERY_ITEMS.length}
          </div>
        </div>

        {/* Right Side: Detailed Architectural Documentation */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto max-h-[70vh] md:max-h-[85vh] bg-stone-900/95 text-white">
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 inline-flex items-center gap-1 mb-2">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {currentItem.area}
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight">
                {currentItem.title}
              </h3>
            </div>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {currentItem.description}
            </p>

            {/* Checklist of 3D Reconstructed Elements */}
            <div className="pt-3 border-t border-white/10">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                Chi tiết đã dựng thành 3D thực tế
              </h4>
              <ul className="flex flex-col gap-1.5">
                {currentItem.reconstructedIn3D.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-stone-200">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-2 pt-4 border-t border-white/10 overflow-x-auto no-scrollbar">
            {GALLERY_ITEMS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundManager.playClick();
                  setCurrentIndex(idx);
                }}
                className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'border-amber-400 scale-105 shadow-md shadow-amber-400/40 ring-2 ring-white/20'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
