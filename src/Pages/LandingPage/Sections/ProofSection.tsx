import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { landingContent } from "../landingContent";
import SectionReveal from "../components/SectionReveal";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  );
}

function ExpandImageModal({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[rgba(2,10,14,0.88)] p-3 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute z-20 inline-flex items-center justify-center text-xl transition border rounded-full left-3 top-3 h-11 w-11 border-white/12 bg-black/35 text-white/80 hover:bg-black/55 hover:text-white sm:left-6 sm:top-6"
        aria-label="סגירת תמונה"
      >
        ×
      </button>

      <img
        src={src}
        alt="צילום שיחת וואטסאפ מוגדל"
        className="max-h-[92vh] max-w-[94vw] object-contain"
        onClick={(event) => event.stopPropagation()}
      />
    </div>,
    document.body
  );
}

function VideoCard({ src, index }: { src: string; index: number }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#041c22] shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
      <div className="relative">
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          className="aspect-[4/5] h-full w-full object-cover sm:aspect-[16/10]"
        >
          <source src={src} type="video/mp4" />
          הדפדפן לא תומך בניגון הסרטון הזה.
        </video>

        {!isPlaying ? (
          <button
            type="button"
            onClick={handlePlayClick}
            className="absolute inset-0 z-10 flex items-center justify-center bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.18))] transition hover:bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.14))]"
            aria-label={`נגן סרטון לקוח ${index + 1}`}
          >
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-[linear-gradient(135deg,rgba(209,249,109,0.92),rgba(142,242,255,0.92))] text-[#06212a] shadow-[0_18px_40px_rgba(142,242,255,0.18)] transition hover:scale-[1.04]">
              <PlayIcon />
            </span>
          </button>
        ) : null}
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-semibold text-white/88">
          סרטון לקוח {index + 1}
        </span>
        <span className="text-xs font-medium text-white/50">
          המלצה מצולמת
        </span>
      </div>
    </div>
  );
}

export default function ProofSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <SectionReveal>
      <section dir="rtl" className="relative px-4 py-8 overflow-hidden sm:py-10">
        <div className="pointer-events-none absolute right-[12%] top-10 h-32 w-32 rounded-full bg-[rgba(209,249,109,0.10)] blur-3xl" />
        <div className="pointer-events-none absolute left-[8%] top-24 h-36 w-36 rounded-full bg-[rgba(142,242,255,0.10)] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[rgba(255,255,255,0.05)] blur-3xl" />

        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8ef2ff] sm:text-[0.82rem]">
              הוכחות מהשטח
            </p>

            <h2 className="mt-3 text-[1.95rem] font-black leading-[1.04] sm:text-4xl lg:text-[3.15rem]">
              <span className="bg-[linear-gradient(90deg,#d9ff73_0%,#8ef2ff_52%,#ffffff_100%)] bg-clip-text text-transparent">
                {landingContent.proof.title}
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-3xl text-[0.98rem] leading-6 text-white/82 sm:text-[1.04rem] sm:leading-7">
              שיחות, תגובות וסרטונים של אנשים שעברו תהליך אמיתי וקיבלו יותר שליטה, יותר סדר ויותר אוויר לנשימה.
            </p>
          </div>

          <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,28,35,0.56),rgba(7,39,47,0.36))] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-md sm:p-5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(142,242,255,0.08),transparent_58%)]" />

              <div className="relative flex items-center justify-between mb-4">
                <h3 className="text-base font-black text-white sm:text-lg">
                  שיחות וואטסאפ
                </h3>
                <span className="rounded-full border border-[#8ef2ff]/20 bg-[rgba(142,242,255,0.08)] px-3 py-1 text-[11px] font-semibold text-[#8ef2ff]">
                  לחצו להגדלה
                </span>
              </div>

              <div className="relative -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-2">
                {landingContent.proof.whatsappImages.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setSelectedImage(src)}
                    className="group relative block w-[78vw] max-w-[18rem] shrink-0 snap-center overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#041c22] shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-[#8ef2ff]/25 md:w-full md:max-w-none"
                    aria-label={`פתיחת צילום שיחת וואטסאפ ${index + 1}`}
                  >
                    <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.08))]" />
                    <img
                      src={src}
                      alt={`צילום שיחת וואטסאפ ${index + 1}`}
                      className="aspect-[10/16] h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,28,35,0.56),rgba(7,39,47,0.36))] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-md sm:p-5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(209,249,109,0.08),transparent_58%)]" />

              <div className="relative flex items-center justify-between mb-4">
                <h3 className="text-base font-black text-white sm:text-lg">
                  סרטוני לקוחות
                </h3>
                <span className="rounded-full border border-[#d9ff73]/20 bg-[rgba(217,255,115,0.08)] px-3 py-1 text-[11px] font-semibold text-[#d9ff73]">
                  הוכחות אמיתיות
                </span>
              </div>

              <div className="relative grid gap-4">
                {landingContent.proof.videos.map((src, index) => (
                  <VideoCard key={src} src={src} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {selectedImage ? (
          <ExpandImageModal
            src={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        ) : null}
      </section>
    </SectionReveal>
  );
}