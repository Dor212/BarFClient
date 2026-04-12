import { ChangeEvent, FormEvent, useState } from "react";
import { api } from "../../api/axios";
const statChips = ["5 צעדים פשוטים", "שפה ברורה", "סדר כלכלי"];

const infoRows = [
  "מדריך קצר ומדויק",
  "בלי לחץ ובלי בלגן",
  "להורדה מיידית",
];

type ViewStep = "intro" | "form" | "download";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
};

const initialFormValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
};

export default function GuideLandingPage() {
  const [step, setStep] = useState<ViewStep>("intro");
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleDownload = async () => {
    try {
      const response = await fetch("/articles/guide1.pdf");
      if (!response.ok) throw new Error("Failed to fetch PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "guide1.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      window.open("/articles/guide1.pdf", "_blank", "noopener,noreferrer");
    }
  };

  const validateForm = (values: FormValues) => {
    const nextErrors: Partial<FormValues> = {};

    const cleanName = values.fullName.trim();
    if (cleanName.length < 2) {
      nextErrors.fullName = "יש להזין שם מלא";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email.trim())) {
      nextErrors.email = "יש להזין אימייל תקין";
    }

    const digitsOnly = values.phone.replace(/[^\d]/g, "");
    const normalizedPhone = digitsOnly.startsWith("972")
      ? `0${digitsOnly.slice(3)}`
      : digitsOnly;

    if (!/^0\d{8,9}$/.test(normalizedPhone)) {
      nextErrors.phone = "יש להזין טלפון תקין";
    }

    return nextErrors;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSubmitError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(formValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await api.post("/users/guide-contact", {
        fullName: formValues.fullName.trim(),
        email: formValues.email.trim(),
        phone: formValues.phone.trim(),
      });

      setStep("download");
    } catch (error) {
      console.error("Guide lead submit failed:", error);
      setSubmitError("משהו השתבש בשליחה. נסו שוב.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <div className="relative flex min-h-[34rem] flex-col items-center justify-center text-center">
            <div className="relative mb-3 flex h-[4.2rem] w-[4.2rem] items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#D1F96D]/28" />
              <div className="absolute inset-[8px] rounded-full border border-[#97BE5A]/24" />
              <div
                className="absolute inset-[14px] rounded-full bg-[radial-gradient(circle,rgba(209,249,109,0.96)_0%,rgba(151,190,90,0.76)_52%,rgba(255,255,255,0)_74%)] blur-[1px]"
                style={{ animation: "guideGlow 4.8s ease-in-out infinite" }}
              />
              <div className="relative h-3 w-3 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.95)]" />
            </div>

            {step === "intro" && (
              <>
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
                      className={`rounded-full border px-3 py-1.5 text-[0.73rem] font-bold backdrop-blur-md ${index === 0
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
                        className={`rounded-full border px-3 py-1.5 text-center text-[0.72rem] font-semibold ${index === 0
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

                <div className="w-full mt-4 space-y-2">
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="group relative flex min-h-[3.15rem] w-full items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/14 bg-[linear-gradient(90deg,#D1F96D_0%,#97BE5A_55%,#e4f7a7_100%)] px-4 text-[0.96rem] font-black text-[#06212a] shadow-[0_16px_36px_rgba(209,249,109,0.16)] transition duration-300 hover:-translate-y-0.5"
                  >
                    <span className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.28),rgba(255,255,255,0)_28%,rgba(255,255,255,0.12),rgba(255,255,255,0)_72%)] opacity-80 transition duration-300 group-hover:opacity-100" />
                    <span className="relative">להשארת פרטים וקבלת המדריך</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-white/45 sm:text-[11px]">
                    <span className="w-8 h-px bg-gradient-to-r from-transparent to-white/18" />
                    מילוי קצר לפני הורדה
                    <span className="w-8 h-px bg-gradient-to-l from-transparent to-white/18" />
                  </div>
                </div>
              </>
            )}

            {step === "form" && (
              <div className="w-full">
                <h2 className="text-[1.6rem] font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-[1.9rem]">
                  רגע לפני ההורדה
                </h2>

                <p className="mx-auto mt-2 max-w-[18rem] text-[0.84rem] leading-5 text-white/72 sm:max-w-[19rem] sm:text-[0.92rem]">
                  משאירים כמה פרטים קצרים והמדריך ייפתח לכם מיד להורדה.
                </p>

                <form onSubmit={handleSubmit} className="mt-5 space-y-3 text-right">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      value={formValues.fullName}
                      onChange={handleChange}
                      placeholder="שם מלא"
                      className="h-[3.2rem] w-full rounded-[1.15rem] border border-white/12 bg-white/[0.05] px-4 text-[0.92rem] font-medium text-white outline-none transition placeholder:text-white/34 focus:border-[#D1F96D]/30 focus:bg-white/[0.07]"
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 pr-1 text-[0.72rem] text-[#f4c7c7]">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      placeholder="אימייל"
                      className="h-[3.2rem] w-full rounded-[1.15rem] border border-white/12 bg-white/[0.05] px-4 text-[0.92rem] font-medium text-white outline-none transition placeholder:text-white/34 focus:border-[#D1F96D]/30 focus:bg-white/[0.07]"
                    />
                    {errors.email && (
                      <p className="mt-1.5 pr-1 text-[0.72rem] text-[#f4c7c7]">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleChange}
                      placeholder="טלפון"
                      className="h-[3.2rem] w-full rounded-[1.15rem] border border-white/12 bg-white/[0.05] px-4 text-[0.92rem] font-medium text-white outline-none transition placeholder:text-white/34 focus:border-[#D1F96D]/30 focus:bg-white/[0.07]"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 pr-1 text-[0.72rem] text-[#f4c7c7]">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <p className="text-center text-[0.78rem] font-medium text-[#f4c7c7]">
                      {submitError}
                    </p>
                  )}

                  <div className="pt-1 space-y-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative flex min-h-[3.15rem] w-full items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/14 bg-[linear-gradient(90deg,#D1F96D_0%,#97BE5A_55%,#e4f7a7_100%)] px-4 text-[0.96rem] font-black text-[#06212a] shadow-[0_16px_36px_rgba(209,249,109,0.16)] transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.28),rgba(255,255,255,0)_28%,rgba(255,255,255,0.12),rgba(255,255,255,0)_72%)] opacity-80 transition duration-300 group-hover:opacity-100" />
                      <span className="relative">
                        {isSubmitting ? "שולח..." : "להמשך להורדה"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep("intro")}
                      className="w-full rounded-[1.15rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-[0.84rem] font-semibold text-white/70 transition hover:bg-white/[0.05] hover:text-white"
                    >
                      חזרה
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === "download" && (
              <div className="w-full">
                <h2 className="text-[1.7rem] font-black leading-[0.95] tracking-[-0.04em]">
                  מעולה,
                  <span className="mt-1 block bg-[linear-gradient(90deg,#D1F96D_0%,#97BE5A_58%,#efffb6_100%)] bg-clip-text text-transparent">
                    המדריך מוכן
                  </span>
                </h2>

                <p className="mx-auto mt-3 max-w-[18rem] text-[0.86rem] leading-5 text-white/72 sm:max-w-[19rem] sm:text-[0.93rem]">
                  הפרטים נקלטו בהצלחה. אפשר להוריד עכשיו את הקובץ ישירות למכשיר.
                </p>

                <div className="relative mx-auto mt-5 w-full max-w-[16.8rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.045] px-3 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                  <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#D1F96D]/35 to-transparent" />
                  <div className="space-y-1.5">
                    <div className="rounded-full border border-[#D1F96D]/20 bg-[#D1F96D]/8 px-3 py-1.5 text-center text-[0.72rem] font-semibold text-[#eefcb8]">
                      PDF מוכן להורדה
                    </div>
                    <div className="rounded-full border border-[#97BE5A]/20 bg-[#97BE5A]/8 px-3 py-1.5 text-center text-[0.72rem] font-semibold text-[#edf7da]">
                      פתיחה מיידית
                    </div>
                    <div className="rounded-full border border-white/8 bg-black/10 px-3 py-1.5 text-center text-[0.72rem] font-semibold text-white/72">
                      שמור אצלך למתי שתרצה
                    </div>
                  </div>
                </div>

                <div className="w-full mt-5 space-y-2">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="group relative flex min-h-[3.15rem] w-full items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/14 bg-[linear-gradient(90deg,#D1F96D_0%,#97BE5A_55%,#e4f7a7_100%)] px-4 text-[0.96rem] font-black text-[#06212a] shadow-[0_16px_36px_rgba(209,249,109,0.16)] transition duration-300 hover:-translate-y-0.5"
                  >
                    <span className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.28),rgba(255,255,255,0)_28%,rgba(255,255,255,0.12),rgba(255,255,255,0)_72%)] opacity-80 transition duration-300 group-hover:opacity-100" />
                    <span className="relative">להורדת המדריך</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="w-full rounded-[1.15rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-[0.84rem] font-semibold text-white/70 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    עריכת פרטים
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-white/45 sm:text-[11px]">
                    <span className="w-8 h-px bg-gradient-to-r from-transparent to-white/18" />
                    PDF להורדה ישירה
                    <span className="w-8 h-px bg-gradient-to-l from-transparent to-white/18" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}