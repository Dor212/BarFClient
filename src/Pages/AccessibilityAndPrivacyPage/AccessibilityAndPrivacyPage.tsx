import React, { useState } from "react";

const AccessibilityAndPrivacyPage: React.FC = () => {
    // צבעים לפי הבקשה: טקסט #063942 על רקע #FFF8F8
    const [form, setForm] = useState({
        fullName: "",
        userEmail: "",
        requestType: "access", // access | delete | correct | portability | object
        message: "",
        consent: false,
    });

    const email = "barflyshker@gmail.com"; 
    const phone = "052-5551825";            
    const lastUpdated = "אוגוסט 2025";     

    function onChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        const type = target.type;
        const checked = (target as HTMLInputElement).checked;
        setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.consent) return;

        const subject = encodeURIComponent("בקשת פרטיות מהאתר");
        const body = encodeURIComponent(
            `שם מלא: ${form.fullName}\nדוא"ל: ${form.userEmail}\nסוג בקשה: ${form.requestType}\n\nפרטים:\n${form.message}\n\nמאשר/ת את תנאי המדיניות: ${form.consent ? "כן" : "לא"}`
        );
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }

    return (
        <div
            dir="rtl"
            className="container max-w-6xl px-4 py-8 mx-auto mt-20"
            style={{ backgroundColor: "#FFF8F8", color: "#063942" }}
        >
            {/* כותרת */}
            <h1 className="mb-10 text-5xl font-bold text-center">
                הצהרת נגישות ומדיניות פרטיות
            </h1>

            {/* פס מידע עליון (בסגנון ה-AdminPage) */}
            <div className="flex flex-col items-center justify-around gap-2 p-4 mb-8 border border-gray-200 shadow-lg rounded-xl bg-gradient-to-r from-gray-50 to-white sm:flex-row">
                <div className="text-center">
                    <strong>תאריך עדכון:</strong> {lastUpdated}
                </div>
                <div className="text-center">
                    <strong>יצירת קשר:</strong>{" "}
                    <a className="underline" href={`mailto:${email}`}>{email}</a>
                </div>
                <div className="text-center">
                    <strong>טלפון:</strong>{" "}
                    <a className="underline" href={`tel:${phone.replace(/[^0-9+]/g, "")}`}>{phone}</a>
                </div>
            </div>

            {/* הצהרת נגישות */}
            <section className="p-6 mb-6 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">הצהרת נגישות</h2>
                <p className="mt-3 leading-7">
                    האתר פועל בהתאם לתקן הישראלי ת״י 5568 (מבוסס WCAG 2.0 רמה AA). אנו מחויבים להעניק חוויית שימוש שוויונית לכלל המשתמשים.
                </p>
                <ul className="pr-5 mt-4 space-y-2 leading-7 list-disc">
                    <li>ווידג׳ט נגישות (זום טקסט, ניגודיות, הדגשות).</li>
                    <li>ניווט מלא באמצעות מקלדת וסדר פוקוס הגיוני.</li>
                    <li>טקסט אלטרנטיבי (alt) לתמונות משמעותיות.</li>
                    <li>מבנה כותרות ותפקידים סמנטיים נגישים.</li>
                </ul>

                <div className="grid gap-4 mt-6 md:grid-cols-2">
                    <details className="p-4 border border-gray-200 shadow-sm group rounded-xl bg-white/70">
                        <summary className="flex items-center justify-between text-lg font-semibold cursor-pointer select-none">
                            קיצורי דרך במקלדת
                            <span className="text-sm transition-transform opacity-70 group-open:rotate-180">▼</span>
                        </summary>
                        <div className="mt-3 leading-7 text-[15px]">
                            <ul className="pr-5 space-y-1 list-disc">
                                <li><b>Tab / Shift+Tab:</b> ניווט קדימה/אחורה בין רכיבים.</li>
                                <li><b>Enter / Space:</b> הפעלת כפתורים וקישורים.</li>
                                <li><b>Esc:</b> סגירת חלונות/תפריטים (אם פתוחים).</li>
                                <li><b>חיצים:</b> ניווט בתוך תפריטים/רשימות נתמכות.</li>
                            </ul>
                        </div>
                    </details>

                    <details className="p-4 border border-gray-200 shadow-sm group rounded-xl bg-white/70">
                        <summary className="flex items-center justify-between text-lg font-semibold cursor-pointer select-none">
                            תאימות דפדפנים וטכנולוגיות מסייעות
                            <span className="text-sm transition-transform opacity-70 group-open:rotate-180">▼</span>
                        </summary>
                        <div className="mt-3 leading-7 text-[15px]">
                            האתר נבדק בדפדפנים מודרניים וברזולוציות שונות, ואנו פועלים לתאימות מיטבית עם קוראי מסך נפוצים (NVDA / VoiceOver).
                        </div>
                    </details>
                </div>
            </section>

            {/* מדיניות פרטיות */}
            <section className="p-6 mb-6 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">מדיניות פרטיות</h2>
                <p className="mt-3 leading-7">
                    אנו מכבדים את פרטיותכם ומתחייבים לשקיפות. מסמך זה מסביר אילו נתונים נאספים, כיצד נשמרים, לאלו מטרות ייעשה בהם שימוש ומהן זכויותיכם.
                </p>

                <div className="grid gap-4 mt-4">
                    <details className="p-4 border border-gray-200 shadow-sm group rounded-xl bg-white/70">
                        <summary className="flex items-center justify-between font-semibold cursor-pointer">
                            סוגי מידע שאנו אוספים
                            <span className="text-sm transition-transform opacity-70 group-open:rotate-180">▼</span>
                        </summary>
                        <div className="mt-3 leading-7 text-[15px]">
                            <ul className="pr-5 space-y-1 list-disc">
                                <li>מידע שמסרתם מרצון (פרטי קשר, טפסים, פניות).</li>
                                <li>מידע שימוש אנונימי/מצטבר (עמודים נצפים, זמני שהייה, המרות).</li>
                                <li>קובצי Cookie/פיקסלים לצורכי תפקוד, מדידה ושיווק (בכפוף להסכמה, אם נדרשת).</li>
                            </ul>
                        </div>
                    </details>

                    <details className="p-4 border border-gray-200 shadow-sm group rounded-xl bg-white/70">
                        <summary className="flex items-center justify-between font-semibold cursor-pointer">
                            מטרות העיבוד ושיתוף עם צדדים שלישיים
                            <span className="text-sm transition-transform opacity-70 group-open:rotate-180">▼</span>
                        </summary>
                        <div className="mt-3 leading-7 text-[15px]">
                            שימוש למענה לפניות, שיפור חוויית המשתמש, ניתוח ביצועים ושיווק. ייתכן שיתוף עם ספקים המסייעים בהפעלת האתר
                            (אירוח, אנליטיקס, דוא״ל) תחת מינימום מידע נדרש והתחייבויות סודיות.
                        </div>
                    </details>

                    <details className="p-4 border border-gray-200 shadow-sm group rounded-xl bg-white/70">
                        <summary className="flex items-center justify-between font-semibold cursor-pointer">
                            אבטחת מידע, שמירת נתונים וזכויותיכם
                            <span className="text-sm transition-transform opacity-70 group-open:rotate-180">▼</span>
                        </summary>
                        <div className="mt-3 leading-7 text-[15px]">
                            אנו נוקטים באמצעי אבטחה סבירים ושומרים נתונים רק ככל שנחוץ למטרות שנקבעו. תוכלו לבקש עיון, תיקון, מחיקה,
                            ניידות מידע או התנגדות לעיבוד כמפורט בטופס הבא.
                        </div>
                    </details>
                </div>

                <p className="mt-4 text-sm opacity-80">
                    <b>עדכון מדיניות:</b> {lastUpdated}
                </p>
            </section>

            {/* טופס בקשות פרטיות */}
            <section className="p-6 mb-10 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">טופס בקשות פרטיות</h2>
                <p className="mt-3 leading-7">
                    ניתן להגיש בקשה לעיון/מחיקה/תיקון/ניידות מידע או להתנגד לעיבוד. מלאו את הפרטים ונחזור אליכם בהקדם.
                </p>

                <form onSubmit={onSubmit} className="grid gap-4 mt-5">
                    <div className="grid gap-1">
                        <label htmlFor="fullName" className="text-sm font-medium">שם מלא</label>
                        <input
                            id="fullName"
                            name="fullName"
                            required
                            value={form.fullName}
                            onChange={onChange}
                            className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#063942]/30"
                            placeholder="שם ושם משפחה"
                            aria-required="true"
                        />
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="userEmail" className="text-sm font-medium">דוא״ל</label>
                        <input
                            id="userEmail"
                            name="userEmail"
                            type="email"
                            required
                            value={form.userEmail}
                            onChange={onChange}
                            className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#063942]/30"
                            placeholder="name@example.com"
                            aria-required="true"
                        />
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="requestType" className="text-sm font-medium">סוג הבקשה</label>
                        <select
                            id="requestType"
                            name="requestType"
                            value={form.requestType}
                            onChange={onChange}
                            className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#063942]/30"
                        >
                            <option value="access">בקשת עיון במידע</option>
                            <option value="delete">בקשת מחיקה</option>
                            <option value="correct">בקשת תיקון מידע</option>
                            <option value="portability">בקשת ניידות מידע</option>
                            <option value="object">התנגדות לעיבוד</option>
                        </select>
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="message" className="text-sm font-medium">פרטי הבקשה</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            required
                            value={form.message}
                            onChange={onChange}
                            className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#063942]/30"
                            placeholder="נא לפרט את הבקשה..."
                            aria-required="true"
                        />
                    </div>

                    <label className="inline-flex items-start gap-2 mt-1 text-sm">
                        <input
                            type="checkbox"
                            name="consent"
                            checked={form.consent}
                            onChange={onChange}
                            className="mt-1 h-4 w-4 rounded border-[#063942]/40"
                            required
                            aria-required="true"
                        />
                        אני מאשר/ת שקראתי את מדיניות הפרטיות ומסכים/ה לתנאים.
                    </label>

                    <div className="flex gap-3 mt-2">
                        <button
                            type="submit"
                            className="px-5 py-3 text-white transition shadow-sm rounded-xl hover:opacity-90"
                            style={{ backgroundColor: "#063942" }}
                            disabled={!form.consent}
                        >
                            שליחת בקשה
                        </button>
                        
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AccessibilityAndPrivacyPage;
