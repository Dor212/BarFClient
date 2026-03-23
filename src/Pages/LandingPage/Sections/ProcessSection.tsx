import { useEffect, useMemo, useState } from "react";
import { landingContent } from "../landingContent";
import SectionReveal from "../components/SectionReveal";

type Step = {
  title: string;
  text: string;
};

function splitStepTitle(title: string, index: number) {
  const cleaned = title.replace(/^פגישה\s*\d+\s*:\s*/u, "").trim();

  return {
    eyebrow: `פגישה ${index + 1}`,
    title: cleaned,
  };
}

export default function ProcessSection() {
  const steps = landingContent.process.steps as unknown as Step[];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedStep = useMemo(
    () => (selectedIndex !== null ? steps[selectedIndex] : null),
    [selectedIndex, steps]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SectionReveal>
      <section dir="rtl" className="relative px-4 py-8 overflow-hidden sm:py-10">
        <div className="pointer-events-none absolute right-[10%] top-10 h-32 w-32 rounded-full bg-[rgba(209,249,109,0.10)] blur-3xl" />
        <div className="pointer-events-none absolute left-[8%] bottom-0 h-36 w-36 rounded-full bg-[rgba(45,212,191,0.10)] blur-3xl" />

        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8ef2ff] sm:text-[0.82rem]">
              התהליך
            </p>

            <h2 className="mt-3 text-[1.95rem] font-black leading-[1.04] sm:text-4xl lg:text-[3.15rem]">
              <span className="bg-[linear-gradient(90deg,#d9ff73_0%,#8ef2ff_52%,#ffffff_100%)] bg-clip-text text-transparent">
                {landingContent.process.title}
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[0.98rem] leading-6 text-white/82 sm:text-[1.04rem] sm:leading-7">
              {landingContent.process.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center max-w-5xl gap-4 mx-auto mt-8 sm:mt-10 sm:gap-5">
            {steps.map((step, index) => {
              const { eyebrow, title } = splitStepTitle(step.title, index);
              const isActive = selectedIndex === index;

              return (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className="group relative h-[152px] w-[152px] shrink-0 rounded-full text-center outline-none sm:h-[172px] sm:w-[172px]"
                >
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span
                      className={`absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(217,255,115,0.95),rgba(142,242,255,0.95),rgba(255,255,255,0.45),rgba(217,255,115,0.95))] ${isActive ? "animate-spin-active" : "animate-spin-slow"
                        }`}
                    />
                  </span>

                  <span className="absolute inset-[3px] rounded-full bg-[#072029]/95 backdrop-blur-xl" />
                  <span className="absolute inset-[12px] rounded-full border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),rgba(255,255,255,0.03)_52%,rgba(255,255,255,0.02))]" />

                  <span
                    className={`absolute inset-0 rounded-full transition duration-300 ${isActive
                        ? "shadow-[0_0_38px_rgba(142,242,255,0.18)]"
                        : "shadow-[0_0_20px_rgba(217,255,115,0.08)] group-hover:shadow-[0_0_30px_rgba(142,242,255,0.14)]"
                      }`}
                  />

                  <span className="relative z-10 flex flex-col items-center justify-center h-full px-4">
                    <span className="text-[0.72rem] font-bold tracking-[0.18em] text-[#8ef2ff] sm:text-[0.76rem]">
                      {eyebrow}
                    </span>

                    <span className="mt-2 text-[0.98rem] font-extrabold leading-5 text-white sm:text-[1.05rem] sm:leading-6">
                      {title}
                    </span>

                    <span className="mt-2 text-[0.72rem] font-medium text-white/55 sm:text-[0.75rem]">
                      לחצו לפתיחה
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {selectedStep ? (
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(2,10,14,0.72)] p-4 backdrop-blur-md"
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="relative w-full max-w-3xl overflow-hidden rounded-[2.2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(7,32,41,0.98),rgba(8,44,54,0.96))] shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8ef2ff]/55 to-transparent" />
              <div className="pointer-events-none absolute -right-8 top-[-1rem] h-32 w-32 rounded-full bg-[rgba(209,249,109,0.14)] blur-3xl" />
              <div className="pointer-events-none absolute -left-8 bottom-[-1rem] h-32 w-32 rounded-full bg-[rgba(45,212,191,0.14)] blur-3xl" />

              <div className="relative grid gap-0 md:grid-cols-[220px_1fr]">
                <div className="relative flex min-h-[180px] flex-col items-center justify-center border-b border-white/10 bg-[linear-gradient(180deg,rgba(217,255,115,0.08),rgba(142,242,255,0.03))] px-6 py-8 md:min-h-full md:border-b-0 md:border-l md:border-l-white/10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_58%)]" />
                  <div className="relative flex h-[110px] w-[110px] items-center justify-center rounded-full border border-white/12 bg-[rgba(255,255,255,0.04)] shadow-[0_0_34px_rgba(142,242,255,0.10)]">
                    <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(217,255,115,0.95),rgba(142,242,255,0.95),rgba(255,255,255,0.4),rgba(217,255,115,0.95))] animate-spin-slow opacity-90 [mask:radial-gradient(farthest-side,transparent_calc(100%-8px),#000_0)]" />
                    <span className="relative z-10 text-center">
                      <span className="block text-[0.78rem] font-bold tracking-[0.18em] text-[#8ef2ff]">
                        פגישה
                      </span>
                      <span className="block mt-1 text-3xl font-black text-white">
                        {(selectedIndex ?? 0) + 1}
                      </span>
                    </span>
                  </div>

                  <p className="relative mt-4 text-sm font-semibold text-white/72">
                    שלב מתוך {steps.length}
                  </p>
                </div>

                <div className="px-5 pt-5 pb-6 sm:px-7 sm:pb-7 sm:pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-right">
                      <p className="text-[0.78rem] font-bold tracking-[0.18em] text-[#8ef2ff]">
                        {splitStepTitle(selectedStep.title, selectedIndex ?? 0).eyebrow}
                      </p>

                      <h3 className="mt-2 text-[1.28rem] font-black leading-7 text-white sm:text-[1.7rem] sm:leading-9">
                        {splitStepTitle(selectedStep.title, selectedIndex ?? 0).title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedIndex(null)}
                      className="inline-flex items-center justify-center w-10 h-10 text-lg transition border rounded-full shrink-0 border-white/12 bg-white/6 text-white/70 hover:bg-white/10 hover:text-white"
                      aria-label="סגירת חלון"
                    >
                      ×
                    </button>
                  </div>

                  <p className="mt-4 text-[0.98rem] leading-7 text-white/82 sm:text-[1.04rem] sm:leading-8">
                    {selectedStep.text}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 mt-6 sm:justify-start">
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(null)}
                      className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#d9ff73_0%,#b8f35e_100%)] px-6 py-3 text-sm font-extrabold text-[#06212a] shadow-[0_14px_35px_rgba(217,255,115,0.18)] transition hover:opacity-95"
                    >
                      סגור
                    </button>

                    {selectedIndex !== null && selectedIndex < steps.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setSelectedIndex((selectedIndex ?? 0) + 1)}
                        className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold transition border rounded-full border-white/12 bg-white/6 text-white/88 hover:bg-white/10"
                      >
                        לשלב הבא
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </SectionReveal>
  );
}