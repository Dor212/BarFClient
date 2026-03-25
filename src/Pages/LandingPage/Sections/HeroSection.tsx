import SectionReveal from "../components/SectionReveal";
import { landingContent } from "../landingContent";

export default function HeroSection() {
  return (
    <SectionReveal>
      <section className="relative px-4 pt-32 pb-10 overflow-hidden sm:pb-14 sm:pt-36">
        <div className="max-w-6xl mx-auto">
          <div
            dir="rtl"
            className="relative flex flex-col items-center max-w-5xl mx-auto text-center"
          >
            <div className="pointer-events-none absolute left-1/2 top-8 h-44 w-44 -translate-x-1/2 rounded-full bg-[rgba(217,255,115,0.14)] blur-3xl" />
            <div className="pointer-events-none absolute right-[12%] top-24 h-32 w-32 rounded-full bg-[rgba(94,234,212,0.14)] blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-[10%] h-36 w-36 rounded-full bg-[rgba(59,130,246,0.14)] blur-3xl" />

            <h1 className="relative max-w-4xl text-[2rem] font-black leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[4.2rem]">
              <span className="block bg-[linear-gradient(90deg,#d9ff73_0%,#8ef2ff_48%,#ffffff_100%)] bg-clip-text text-transparent">
                {landingContent.hero.title}
              </span>
            </h1>

            <p className="relative mt-3 max-w-3xl text-[0.98rem] leading-6 text-white/90 sm:mt-4 sm:text-[1.1rem] sm:leading-7">
              {landingContent.hero.description}
            </p>

            <p className="relative mt-3 max-w-3xl text-lg font-bold leading-7 text-[#d9ff73] sm:mt-4 sm:text-2xl sm:leading-8">
              {landingContent.hero.subtitle}
            </p>

            <div className="relative mt-5 flex max-w-4xl flex-wrap justify-center gap-x-5 gap-y-2 sm:mt-6 sm:gap-x-6 sm:gap-y-2.5">
              {landingContent.hero.bullets.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 text-right text-[0.94rem] font-medium leading-5 text-white/88 sm:text-[0.99rem] sm:leading-6"
                >
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[#d9ff73]"
                    fill="none"
                  >
                    <path
                      d="M4.5 10.5l3 3 8-8"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="relative mt-6 w-full max-w-3xl rounded-[1.6rem] border border-white/12 bg-white/6 px-4 py-4 backdrop-blur-md sm:mt-7 sm:px-6 sm:py-4.5">
              <div className="flex items-center justify-center gap-3">
                <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(217,255,115,0.65),transparent)]" />
                <h2 className="whitespace-nowrap text-[0.96rem] font-bold leading-none text-[#d9ff73] sm:text-lg">
                  {landingContent.fit.title}
                </h2>
                <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(217,255,115,0.65),transparent)]" />
              </div>

              <div className="mt-3.5 flex flex-col items-center gap-2 sm:mt-4">
                {landingContent.fit.items.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-start justify-center gap-2 text-center text-[0.88rem] leading-5 text-white/88 whitespace-nowrap sm:text-[0.99rem] sm:leading-6"
                  >
                    <span className="mt-[2px] text-[#8ef2ff]">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#landing-contact"
              className="relative mt-6 inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#d9ff73_0%,#b8f35e_100%)] px-7 py-3 text-sm font-extrabold text-[#06212a] shadow-[0_14px_40px_rgba(217,255,115,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(217,255,115,0.36)] sm:mt-7 sm:px-8 sm:text-base"
            >
              {landingContent.hero.cta}
            </a>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}