import { useState } from "react";

const fallbackImage = "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80";

export default function VehicleCarousel({ images = [], alt }) {
  const carouselImages = images.length > 0 ? images : [fallbackImage];
  const [activeIndex, setActiveIndex] = useState(0);

  function showPrevious() {
    setActiveIndex((currentIndex) => (currentIndex - 1 + carouselImages.length) % carouselImages.length);
  }

  function showNext() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % carouselImages.length);
  }

  return (
    <div className="grid gap-3">
      <div className="relative overflow-hidden rounded-xl">
        <img className="h-80 w-full object-cover" src={carouselImages[activeIndex]} alt={`${alt} ${activeIndex + 1}`} />
        {carouselImages.length > 1 && (
          <>
            <button aria-label="Image précédente" className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-xl font-bold text-gray-900 shadow transition-colors hover:bg-white" onClick={showPrevious} type="button">‹</button>
            <button aria-label="Image suivante" className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-xl font-bold text-gray-900 shadow transition-colors hover:bg-white" onClick={showNext} type="button">›</button>
          </>
        )}
      </div>
      {carouselImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {carouselImages.map((image, index) => (
            <button className={`shrink-0 overflow-hidden rounded-md border-2 ${index === activeIndex ? "border-[#5534e7]" : "border-transparent"}`} key={image} onClick={() => setActiveIndex(index)} type="button">
              <img className="h-16 w-20 object-cover" src={image} alt={`${alt} miniature ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
