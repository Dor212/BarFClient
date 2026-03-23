import { useEffect, useMemo, useState } from "react";

type Slide = {
  src: string;
  type?: "image" | "video";
  alt?: string;
};

type MediaCarouselProps = {
  slides: Slide[];
  title?: string;
  className?: string;
  aspectClassName?: string;
};

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MediaCarousel({
  slides,
  title,
  className = "",
  aspectClassName = "aspect-[4/5]",
}: MediaCarouselProps) {
  const validSlides = useMemo(() => slides.filter((slide) => Boolean(slide.src)), [slides]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex > validSlides.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, validSlides.length]);

  if (!validSlides.length) return null;

  const goTo = (index: number) => {
    const normalized = (index + validSlides.length) % validSlides.length;
    setActiveIndex(normalized);
  };

  const hasMultiple = validSlides.length > 1;

  return (
    <div
      className={`rounded-[1.9rem] border border-white/12 bg-[rgba(5,29,36,0.58)] p-3 shadow-[0_30px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl ${className}`}
    >
      {title ? (
        <div className="flex items-center justify-between gap-3 px-2 mb-3" dir="rtl">
          <span className="text-sm font-semibold text-white/90">{title}</span>
          <span className="rounded-full border border-[#D1F96D]/25 bg-[#D1F96D]/8 px-3 py-1 text-[11px] font-semibold text-[#D1F96D]">
            {activeIndex + 1}/{validSlides.length}
          </span>
        </div>
      ) : null}

      <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#041c22]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {validSlides.map((slide, index) => (
            <div key={`${slide.src}-${index}`} className={`w-full shrink-0 ${aspectClassName}`}>
              {slide.type === "video" ? (
                <video
                  key={`${slide.src}-${index}-${activeIndex}`}
                  controls
                  playsInline
                  preload="metadata"
                  className="object-cover w-full h-full"
                >
                  <source src={slide.src} type="video/mp4" />
                  הדפדפן לא תומך בניגון הסרטון הזה.
                </video>
              ) : (
                <img
                  src={slide.src}
                  alt={slide.alt ?? title ?? "מדיה"}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>

        {hasMultiple ? (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute inline-flex items-center justify-center w-10 h-10 text-white transition -translate-y-1/2 border rounded-full right-3 top-1/2 border-white/15 bg-black/45 backdrop-blur hover:bg-black/60"
              aria-label="הבא"
            >
              <ChevronRightIcon />
            </button>

            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="absolute inline-flex items-center justify-center w-10 h-10 text-white transition -translate-y-1/2 border rounded-full left-3 top-1/2 border-white/15 bg-black/45 backdrop-blur hover:bg-black/60"
              aria-label="הקודם"
            >
              <ChevronLeftIcon />
            </button>
          </>
        ) : null}
      </div>

      {hasMultiple ? (
        <div className="flex items-center justify-center gap-2 mt-4">
          {validSlides.map((slide, index) => (
            <button
              key={`${slide.src}-dot-${index}`}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full transition-all ${index === activeIndex ? "w-8 bg-[#D1F96D]" : "w-2.5 bg-white/35"
                }`}
              aria-label={`מעבר לפריט ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}



