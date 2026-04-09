import { Helmet } from "react-helmet";
import { Download, FileText } from "lucide-react";

const guideBullets = [
  "5 שלבים פשוטים שאפשר ליישם כבר מהיום",
  "שפה ברורה ואנושית בלי מילים מסובכות",
  "התחלה חכמה לסדר כלכלי אמיתי בבית",
];

export default function GuideLandingPage() {
  return (
    <>
      <Helmet>
        <title>המדריך החינמי לזוגות צעירים | בר פליישקר</title>
        <meta
          name="description"
          content="מדריך חינמי, קצר ומעשי לזוגות צעירים ולהורים טריים שרוצים להתחיל לעשות סדר כלכלי ברור, בלי לחץ ובלי בלגן."
        />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="https://barflyshker.com/guide" />
      </Helmet>

      <section dir="rtl" className="relative min-h-[100svh] overflow-hidden text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0))]" />
        <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#D1F96D]/18 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-16 h-80 w-80 rounded-full bg-cyan-400/16 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 opacity-30" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 opacity-30" />

        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col px-5 pb-10 pt-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-end">
            <img
              src="/backgrounds/BarFLogo2.png"
              alt="Bar Flyshker"
              className="h-9 w-auto opacity-90 sm:h-10"
            />
          </div>

          <div className="flex flex-1 items-center justify-center py-10 sm:py-12">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(7,42,51,0.84),rgba(4,26,33,0.9))] p-[1px] shadow-[0_30px_120px_rgba(0,0,0,0.38)] backdrop-blur-2xl">
              <div className="relative overflow-hidden rounded-[calc(2rem-1px)] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(209,249,109,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
                <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(135deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0)_34%,rgba(209,249,109,0.08)_60%,rgba(255,255,255,0)_100%)]" />
                <div className="pointer-events-none absolute right-5 top-5 h-12 w-12 rounded-full border border-[#D1F96D]/30" />
                <div className="pointer-events-none absolute bottom-5 left-5 h-16 w-16 rounded-full border border-cyan-300/20" />

                <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D1F96D]/25 bg-white/5 px-4 py-2 text-[11px] font-medium tracking-[0.24em] text-[#DDF9A3] sm:text-xs">
                    <span className="h-2 w-2 rounded-full bg-[#D1F96D] shadow-[0_0_12px_rgba(209,249,109,0.95)]" />
                    מדריך חינמי לזוגות צעירים ולהורים טריים
                  </div>

                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1.5 text-xs font-medium text-cyan-100/90">
                    <FileText className="h-4 w-4" />
                    קובץ PDF להורדה מיידית
                  </div>

                  <h1 className="max-w-3xl text-4xl font-black leading-[1.06] text-white sm:text-5xl lg:text-6xl">
                    לא משנה כמה כסף נכנס,
                    <span className="mt-2 block text-[#D1F96D]">הוא תמיד נעלם?</span>
                  </h1>

                  <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
                    מדריך קצר, ברור ומעשי שיעזור לכם להתחיל לעשות סדר כלכלי נכון,
                    בלי לחץ, בלי בלגן ובלי מילים מסובכות.
                  </p>

                  <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
                    {guideBullets.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-white/86 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-9 flex w-full flex-col items-center gap-3">
                    <a
                      href="/articles/guide1.pdf"
                      download="bar-flyshker-guide.pdf"
                      className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-[#D1F96D]/40 bg-[#D1F96D] px-7 text-base font-extrabold text-[#063942] shadow-[0_0_30px_rgba(209,249,109,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(209,249,109,0.34)]"
                    >
                      <Download className="h-5 w-5" />
                      להורדת המדריך
                    </a>

                    <p className="text-sm text-white/52">הורדה ישירה של הקובץ למכשיר</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
