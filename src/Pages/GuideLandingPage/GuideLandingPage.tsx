const statChips = ["5 צעדים פשוטים", "שפה ברורה", "סדר כלכלי"];

const infoRows = [
  "מדריך קצר ומדויק",
  "בלי לחץ ובלי בלגן",
  "להורדה מיידית",
];

export default function GuideLandingPage() {
  return (
    <section
      dir="rtl"
      className="relative isolate h-[100svh] overflow-hidden bg-[#041e25] px-3 py-3 text-white"
    >
      <style>{`
        @keyframes guidePulse {
          0%, 100% { opacity: .45; transform: scale(1); }
          50% { opacity: .82; transform: scale(1.04); }
        }
        @keyframes guideGlow {
          0%, 100% { opacity: .55; }
          50% { opacity: .95; }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(209,249,109,0.13),transparent_24%),radial-gradient(circle_at_16%_24%,rgba(151,190,90,0.08),transparent_18%),linear-gradient(180deg,#041e25_0%,#063942_52%,#042731_100%)]" />
        <div
          className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(209,249,109,0.14)_0%,rgba(209,249,109,0.05)_34%,rgba(255,255,255,0)_68%)] blur-2xl"
          style={{ animation: "guidePulse 7s ease-in-out infinite" }}
        />
        <div className="absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
        <div className="absolute left-1/2 top-1/2 h-[15.5rem] w-[15.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D1F96D]/12" />
        <div className="absolute inset-x-0 top-[14%] h-px bg-gradient-to-r from-transparent via-[#97BE5A]/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-[14%] h-px bg-gradient-to-r from-transparent via-[#D1F96D]/20 to-transparent" />
        <div className="absolute right-6 top-7 h-16 w-16 rounded-full border border-[#D1F96D]/18 bg-[#D1F96D]/6 blur-[1px]" />
        <div className="absolute left-4 bottom-8 h-12 w-12 rounded-full border border-white/8 bg-white/[0.02]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[23rem] items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(7,34,41,0.92)_0%,rgba(8,41,50,0.86)_54%,rgba(5,27,33,0.96)_100%)] px-4 py-4 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:px-5 sm:py-5">
          <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] border border-white/6" />
          <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_24%,rgba(209,249,109,0.05)_55%,rgba(255,255,255,0)_82%,rgba(151,190,90,0.05)_100%)]" />

          <div className="relative flex flex-col items-center text-center">
            <div className="relative mb-3 flex h-[4.2rem] w-[4.2rem] items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#D1F96D]/28" />
              <div className="absolute inset-[8px] rounded-full border border-[#97BE5A]/24" />
              <div
                className="absolute inset-[14px] rounded-full bg-[radial-gradient(circle,rgba(209,249,109,0.96)_0%,rgba(151,190,90,0.76)_52%,rgba(255,255,255,0)_74%)] blur-[1px]"
                style={{ animation: "guideGlow 4.8s ease-in-out infinite" }}
              />
              <div className="relative h-3 w-3 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.95)]" />
            </div>

            <h1 className="text-[1.95rem] font-black leading-[0.9] tracking-[-0.05em] sm:text-[2.3rem]">
              <span className="block bg-[linear-gradient(90deg,#ffffff_0%,#edf7da_54%,#ffffff_100%)] bg-clip-text text-transparent">
                לא משנה כמה
              </span>
              <span className="block bg-[linear-gradient(90deg,#D1F96D_0%,#97BE5A_58%,#efffb6_100%)] bg-clip-text text-transparent">
                כסף נכנס,
              </span>
              <span className="block text-white">הוא תמיד נעלם?</span>
            </h1>

            <p className="mt-2 max-w-[18.1rem] text-[0.84rem] leading-4 text-white/74 sm:max-w-[19rem] sm:text-[0.92rem] sm:leading-5">
              מדריך קצר, ברור ומעשי שיעזור לכם להתחיל לעשות סדר כלכלי אמיתי, בלי מילים מסובכות ובלי בלגן.
            </p>

            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {statChips.map((chip, index) => (
                <div
                  key={chip}
                  className={`rounded-full border px-3 py-1.5 text-[0.73rem] font-bold backdrop-blur-md ${
                    index === 0
                      ? "border-[#D1F96D]/28 bg-[#D1F96D]/10 text-[#eefcb8]"
                      : index === 1
                        ? "border-[#97BE5A]/28 bg-[#97BE5A]/10 text-[#edf7da]"
                        : "border-white/12 bg-white/[0.05] text-white/82"
                  }`}
                >
                  {chip}
                </div>
              ))}
            </div>

            <div className="relative mt-3 w-full max-w-[16.8rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.045] px-3 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
              <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#D1F96D]/35 to-transparent" />
              <div className="space-y-1.5">
                {infoRows.map((row, index) => (
                  <div
                    key={row}
                    className={`rounded-full border px-3 py-1.5 text-center text-[0.72rem] font-semibold ${
                      index === 0
                        ? "border-[#D1F96D]/20 bg-[#D1F96D]/8 text-[#eefcb8]"
                        : index === 1
                          ? "border-[#97BE5A]/20 bg-[#97BE5A]/8 text-[#edf7da]"
                          : "border-white/8 bg-black/10 text-white/72"
                    }`}
                  >
                    {row}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full mt-3 space-y-2">
              <a
                href="/articles/guide1.pdf"
                download="guide1.pdf"
                className="group relative flex min-h-[3.15rem] w-full items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/14 bg-[linear-gradient(90deg,#D1F96D_0%,#97BE5A_55%,#e4f7a7_100%)] px-4 text-[0.96rem] font-black text-[#06212a] shadow-[0_16px_36px_rgba(209,249,109,0.16)] transition duration-300 hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.28),rgba(255,255,255,0)_28%,rgba(255,255,255,0.12),rgba(255,255,255,0)_72%)] opacity-80 transition duration-300 group-hover:opacity-100" />
                <span className="relative">להורדת המדריך</span>
              </a>

              <div className="flex items-center justify-center gap-2 text-[10px] text-white/45 sm:text-[11px]">
                <span className="w-8 h-px bg-gradient-to-r from-transparent to-white/18" />
                PDF להורדה ישירה
                <span className="w-8 h-px bg-gradient-to-l from-transparent to-white/18" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
