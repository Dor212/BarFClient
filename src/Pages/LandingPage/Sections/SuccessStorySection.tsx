import MediaCarousel from "../components/MediaCarousel";
import SectionReveal from "../components/SectionReveal";
import { landingContent } from "../landingContent";

export default function SuccessStorySection() {
  const media = landingContent.successStory.media;

  return (
    <SectionReveal>
      <section className="relative px-4 py-8 overflow-hidden sm:py-10">
        <div className="pointer-events-none absolute right-[10%] top-8 h-32 w-32 rounded-full bg-[rgba(209,249,109,0.10)] blur-3xl" />
        <div className="pointer-events-none absolute left-[8%] bottom-0 h-36 w-36 rounded-full bg-[rgba(45,212,191,0.10)] blur-3xl" />

        <div className="max-w-6xl mx-auto">
          <div dir="rtl" className="max-w-5xl mx-auto text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8ef2ff] sm:text-[0.82rem]">
              סיפור הצלחה אמיתי
            </p>

            <h2 className="mx-auto mt-3 max-w-4xl text-[1.95rem] font-black leading-[1.05] sm:text-4xl lg:text-[3.2rem]">
              <span className="bg-[linear-gradient(90deg,#d9ff73_0%,#8ef2ff_52%,#ffffff_100%)] bg-clip-text text-transparent">
                {landingContent.successStory.title}
              </span>
            </h2>

            <div className="mx-auto mt-4 max-w-3xl space-y-2 text-[0.98rem] leading-6 text-white/86 sm:text-[1.05rem] sm:leading-7">
              <p>{landingContent.successStory.description[0]}</p>
              <p className="text-lg font-extrabold leading-7 text-[#d9ff73] sm:text-[1.45rem] sm:leading-8">
                {landingContent.successStory.description[1]}
              </p>
              <p>{landingContent.successStory.description[2]}</p>
            </div>

            <div className="flex items-stretch justify-center gap-2 mt-5 sm:gap-3">
              <div className="flex min-w-0 flex-1 max-w-[170px] flex-col items-center rounded-full border border-[#f87171]/20 bg-[rgba(248,113,113,0.08)] px-3 py-3 backdrop-blur sm:max-w-[190px] sm:px-5">
                <span className="text-[0.74rem] font-semibold text-white/70 sm:text-[0.8rem]">
                  תזרים לפני
                </span>
                <span className="mt-1 text-[1.05rem] font-black text-[#f87171] sm:text-2xl">
                  ₪5,536-
                </span>
              </div>

              <div className="flex items-center justify-center h-auto text-base border rounded-full w-9 shrink-0 border-white/12 bg-white/6 text-white/80 sm:w-10 sm:text-lg">
                ←
              </div>

              <div className="flex min-w-0 flex-1 max-w-[170px] flex-col items-center rounded-full border border-[#8ef2ff]/20 bg-[rgba(142,242,255,0.08)] px-3 py-3 backdrop-blur sm:max-w-[190px] sm:px-5">
                <span className="text-[0.74rem] font-semibold text-white/70 sm:text-[0.8rem]">
                  תזרים אחרי
                </span>
                <span className="mt-1 text-[1.05rem] font-black text-[#8ef2ff] sm:text-2xl">
                  ₪6,292+
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-6">
            <MediaCarousel
              title="מהמינוס לחיסכון חכם"
              aspectClassName="aspect-[16/10] sm:aspect-[16/9]"
              className="bg-[rgba(7,28,35,0.46)]"
              slides={[
                { src: media.initialFlowImage, alt: "תזרים התחלתי" },
                { src: media.finalFlowImage, alt: "תזרים סופי" },
                { src: media.testimonialVideo, type: "video", alt: "סרטון המלצה של הזוג" },
              ]}
            />
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}