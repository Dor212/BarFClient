import { FormEvent, useState } from "react";
import { api } from "../../../api/axios";
import { landingContent } from "../landingContent";
import SectionReveal from "../components/SectionReveal";

type IncomeRange = "עד 10,000" | "10,000-20,000" | "מעל 20,000";
type FinancialState = "מינוס קבוע" | "מאוזן" | "מצליחים לחסוך";
type BooleanAnswer = "כן" | "לא";
type BestTime = "בוקר" | "צהריים" | "ערב";

type LandingFormValues = {
  fullName: string;
  phone: string;
  email: string;
  incomeRange: IncomeRange | "";
  financialState: FinancialState | "";
  hasLiabilities: BooleanAnswer | "";
  hadBankIssues: BooleanAnswer | "";
  bestTime: BestTime | "";
};

type ScreeningFieldKey =
  | "incomeRange"
  | "financialState"
  | "hasLiabilities"
  | "hadBankIssues"
  | "bestTime";

type QuestionConfig = {
  key: ScreeningFieldKey;
  label: string;
  options: string[];
};

const initialValues: LandingFormValues = {
  fullName: "",
  phone: "",
  email: "",
  incomeRange: "",
  financialState: "",
  hasLiabilities: "",
  hadBankIssues: "",
  bestTime: "",
};

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" strokeWidth="1.8" />
      <path d="M4 20a8 8 0 0 1 16 0" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" aria-hidden="true">
      <path
        d="M6.8 3.5h2.4a1.2 1.2 0 0 1 1.2 1l.4 2.7a1.2 1.2 0 0 1-.7 1.3l-1.5.6a13.3 13.3 0 0 0 6.3 6.3l.6-1.5a1.2 1.2 0 0 1 1.3-.7l2.7.4a1.2 1.2 0 0 1 1 1.2v2.4A1.8 1.8 0 0 1 18.7 20C10.8 20 4 13.2 4 5.3a1.8 1.8 0 0 1 1.8-1.8Z"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" aria-hidden="true">
      <path d="M4 6h16v12H4z" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m5 7 7 6 7-6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" aria-hidden="true">
      <path d="m5 12 4.2 4.2L19 6.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type FieldProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
};

function FieldShell({ icon, children }: FieldProps) {
  return (
    <div className="group flex h-14 items-center gap-3 rounded-[1.15rem] border border-white/10 bg-[rgba(5,29,36,0.64)] px-4 text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition focus-within:border-[#8ef2ff]/35 focus-within:bg-[rgba(5,29,36,0.78)]">
      <span className="shrink-0 text-[#8ef2ff]">{icon}</span>
      {children}
    </div>
  );
}

export default function ContactSection() {
  const [formValues, setFormValues] = useState<LandingFormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  const questions: QuestionConfig[] = [
    {
      key: "incomeRange",
      label: "טווח הכנסה חודשי",
      options: ["עד 10,000", "10,000-20,000", "מעל 20,000"],
    },
    {
      key: "financialState",
      label: "המצב הכלכלי היום",
      options: ["מינוס קבוע", "מאוזן", "מצליחים לחסוך"],
    },
    {
      key: "hasLiabilities",
      label: "הלוואות / התחייבויות משמעותיות",
      options: ["כן", "לא"],
    },
    {
      key: "hadBankIssues",
      label: "בעיות מול בנקים / גופים פיננסיים",
      options: ["כן", "לא"],
    },
    {
      key: "bestTime",
      label: "מתי הכי נוח לשיחה",
      options: ["בוקר", "צהריים", "ערב"],
    },
  ];

  const handleOptionChange = <K extends ScreeningFieldKey>(key: K, value: LandingFormValues[K]) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      await api.post("/users/landing-contact", formValues);
      setStatus({ type: "success", message: landingContent.contact.successMessage });
      setFormValues(initialValues);
    } catch {
      setStatus({
        type: "error",
        message: "משהו השתבש בשליחה. בדקו שהשרת רץ ונסו שוב.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionReveal>
      <section id="landing-contact" dir="rtl" className="relative px-4 py-8 overflow-hidden sm:py-10">
        <div className="pointer-events-none absolute right-[10%] top-8 h-32 w-32 rounded-full bg-[rgba(209,249,109,0.10)] blur-3xl" />
        <div className="pointer-events-none absolute left-[8%] top-24 h-36 w-36 rounded-full bg-[rgba(142,242,255,0.10)] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[rgba(255,255,255,0.05)] blur-3xl" />

        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.15rem] border border-white/12 bg-[linear-gradient(180deg,rgba(7,28,35,0.62),rgba(7,39,47,0.4))] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-6 lg:p-7">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,255,115,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(142,242,255,0.08),transparent_26%)]" />

          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-[1.95rem] font-black leading-[1.04] sm:text-4xl lg:text-[3.1rem]">
              <span className="bg-[linear-gradient(90deg,#d9ff73_0%,#8ef2ff_52%,#ffffff_100%)] bg-clip-text text-transparent">
                {landingContent.contact.title}
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-3xl text-[0.98rem] leading-6 text-white/82 sm:text-[1.04rem] sm:leading-7">
              כמה תשובות קצרות, ואפשר להבין מהר יותר איך הליווי יכול לעזור לכם בפועל.
            </p>
          </div>

          <form className="relative mt-6" onSubmit={handleSubmit}>
            <div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
              <div className="space-y-3">
                <FieldShell icon={<UserIcon />}>
                  <input
                    type="text"
                    required
                    placeholder="שם מלא"
                    value={formValues.fullName}
                    onChange={(event) =>
                      setFormValues((prev) => ({ ...prev, fullName: event.target.value }))
                    }
                    className="h-full w-full bg-transparent text-right text-sm text-white outline-none placeholder:text-white/42 sm:text-[0.95rem]"
                  />
                </FieldShell>

                <FieldShell icon={<PhoneIcon />}>
                  <input
                    type="tel"
                    required
                    placeholder="טלפון"
                    value={formValues.phone}
                    onChange={(event) =>
                      setFormValues((prev) => ({ ...prev, phone: event.target.value }))
                    }
                    className="h-full w-full bg-transparent text-right text-sm text-white outline-none placeholder:text-white/42 sm:text-[0.95rem]"
                  />
                </FieldShell>

                <FieldShell icon={<MailIcon />}>
                  <input
                    type="email"
                    required
                    placeholder="אימייל"
                    value={formValues.email}
                    onChange={(event) =>
                      setFormValues((prev) => ({ ...prev, email: event.target.value }))
                    }
                    className="h-full w-full bg-transparent text-right text-sm text-white outline-none placeholder:text-white/42 sm:text-[0.95rem]"
                  />
                </FieldShell>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {questions.map((question) => (
                  <div
                    key={question.key}
                    className="rounded-[1.2rem] border border-white/10 bg-[rgba(5,29,36,0.56)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    <label className="mb-2 block text-right text-[0.82rem] font-semibold leading-5 text-white/78 sm:text-[0.86rem]">
                      {question.label}
                    </label>

                    <select
                      value={formValues[question.key]}
                      onChange={(event) =>
                        handleOptionChange(
                          question.key,
                          event.target.value as LandingFormValues[typeof question.key]
                        )
                      }
                      required
                      className="h-11 w-full rounded-[0.95rem] border border-white/10 bg-[rgba(3,20,25,0.88)] px-3 text-right text-sm text-white outline-none transition focus:border-[#d9ff73]/35"
                    >
                      <option value="" disabled>
                        בחרו תשובה
                      </option>
                      {question.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 mt-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#d9ff73_0%,#b8f35e_100%)] px-8 text-sm font-extrabold text-[#06212a] shadow-[0_16px_36px_rgba(217,255,115,0.22)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
              >
                <CheckIcon />
                <span>{isSubmitting ? "שולח..." : landingContent.contact.submitText}</span>
              </button>

              <p className="max-w-2xl text-center text-[0.9rem] leading-6 text-white/70 sm:text-[0.95rem] sm:leading-7">
                {landingContent.contact.note}
              </p>
              
              <p className="max-w-2xl text-center text-[0.82rem] leading-5 text-white/55 sm:text-[0.88rem]">
                השארת הפרטים מהווה הסכמה ליצירת קשר ולמדיניות הפרטיות של האתר.
              </p>

              {status.type !== "idle" ? (
                <div
                  className={`w-full max-w-2xl rounded-[1rem] px-4 py-3 text-center text-sm font-medium ${status.type === "success"
                      ? "border border-[#d9ff73]/20 bg-[#d9ff73]/10 text-[#d9ff73]"
                      : "border border-red-400/20 bg-red-500/10 text-red-200"
                    }`}
                >
                  {status.message}
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </section>
    </SectionReveal>
  );
}