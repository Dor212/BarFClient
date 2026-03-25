import AboutMe from "../../../Imges/AboutMe.png";
import { landingContent } from "../landingContent";
import SectionReveal from "../components/SectionReveal";

export default function AboutBarSection() {
  return (
    <SectionReveal>
      <section dir="rtl" className="relative px-4 py-8 overflow-hidden sm:py-10">
        <div className="pointer-events-none absolute right-[10%] top-8 h-32 w-32 rounded-full bg-[rgba(209,249,109,0.10)] blur-3xl" />
        <div className="pointer-events-none absolute left-[8%] bottom-0 h-36 w-36 rounded-full bg-[rgba(142,242,255,0.10)] blur-3xl" />
        <div className="max-w-6xl mx-auto">
          <div className="max-w-5xl mx-auto text-center">
            <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px]">
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[conic-gradient(from_0deg,rgba(217,255,115,0.32),rgba(142,242,255,0.26),rgba(255,255,255,0.12),rgba(217,255,115,0.32))] blur-[1px]" />
              <div className="absolute inset-[3px] rounded-[1.9rem] bg-[#072029]/92 backdrop-blur-xl" />
              <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
                <div className="overflow-hidden rounded-[1.35rem]">
                  <img
                    src={AboutMe}
                    alt="בר פליישקר"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            <h2 className="mx-auto mt-6 max-w-4xl text-[1.95rem] font-black leading-[1.04] sm:mt-7 sm:text-4xl lg:text-[3.15rem]">
              <span className="block bg-[linear-gradient(90deg,#d9ff73_0%,#8ef2ff_52%,#ffffff_100%)] bg-clip-text text-transparent">
                נעים מאוד,
              </span>
              <span className="block bg-[linear-gradient(90deg,#d9ff73_0%,#8ef2ff_52%,#ffffff_100%)] bg-clip-text text-transparent">
                אני בר פליישקר
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-3xl text-[0.98rem] leading-6 text-white/82 sm:text-[1.04rem] sm:leading-7">
              {landingContent.about.description}
            </p>

            <a
              href="#landing-contact"
              className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#d9ff73_0%,#b8f35e_100%)] px-7 text-sm font-extrabold text-[#06212a] shadow-[0_14px_35px_rgba(217,255,115,0.18)] transition hover:opacity-95 sm:mt-7 sm:px-8 sm:text-base"
            >
             בידקו אם זה מתאים לכם
            </a>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}