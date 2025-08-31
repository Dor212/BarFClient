import { useState } from "react";
import { motion } from "framer-motion";

type FAQ = { q: string; a: string };

const faqs: FAQ[] = [
    {
        q: "מה זה בכלל ליווי פיננסי?",
        a: "ליווי פיננסי הוא תהליך אישי שבו אנחנו בונים יחד תוכנית כלכלית מותאמת למשפחה או אדם פרטי או בעל עסק. התהליך כולל מיפוי הכנסות והוצאות, יצירת תקציב חודשי מותאם, בניית אסטרטגיה לצמצום חובות, תכנון חיסכון לטווח קצר וארוך והכוונה למימוש מטרות כלכליות כמו קניית דירה, השקעות או חיסכון לילדים.",
    },
    {
        q: "למי התהליך מתאים?",
        a: "הליווי מתאים לזוגות צעירים, משפחות, יחידים וגם בעלי עסקים. במיוחד לאנשים שרוצים שליטה טובה יותר בכסף, לצאת מהמינוס, להתחיל לחסוך או להבין איך להתנהל נכון כדי להגיע למטרות שלהם.",
    },
    {
        q: "כמה זמן נמשך תהליך ליווי פיננסי?",
        a: "לרוב הליווי נמשך בין 3 ל־6 חודשים, תלוי במטרות ובצרכים של הלקוח. יש לקוחות שבוחרים בתהליך קצר וממוקד, ויש כאלה שמעדיפים ליווי ארוך יותר לצורך מעקב ושינויים לאורך הדרך.",
    },
    {
        q: "האם הליווי כולל גם טיפול בהשקעות ובפנסיה?",
        a: "הליווי מתמקד קודם כול בניהול התקציב וה cash flow של הבית, אך כחלק ממנו נבדוק גם את המוצרים הפיננסיים שלכם – ביטוחים, פנסיות, קרנות השתלמות ועוד על מנת לגעת בכל נקודות הכסף. במידת הצורך תקבלו הכוונה מקצועית לסוכנים או אנשי מקצוע משלימים.",
    },
    {
        q: "מה ההבדל בין ליווי פיננסי לבין ייעוץ השקעות/משכנתאות?",
        a: "ייעוץ השקעות או ייעוץ משכנתאות מתמקד בתחום ספציפי, בעוד ליווי פיננסי נותן תמונה כוללת של ההתנהלות הכלכלית. המטרה היא להבין את כל הכסף, לאן הוא נכנס ולאן הוא יוצא ולבנות תוכנית שתאפשר לכם להגיע ליציבות, לחיסכון ולהגשמת יעדים.",
    },
    {
        q: "האם התהליך מתאים גם אם אנחנו כבר במינוס או בחובות?",
        a: "בהחלט. דווקא במצבים של מינוס או הלוואות חשוב לעשות סדר. בתהליך נבנה תוכנית פרקטית שתעזור לכם לצאת מהבור הכלכלי בצורה הדרגתית, מבלי לוותר על איכות החיים.",
    },
    {
        q: "איך מתבצע הליווי בפועל?",
        a: "בתחילת הדרך מתקיימת פגישת מיפוי, שבה אוספים נתונים על הכנסות, הוצאות והתחייבויות. לאחר מכן נבנית תוכנית כלכלית מותאמת ונפגשים אחת לשבועיים/חודש כדי לעקוב אחר ההתקדמות, להתאים את התוכנית ולתת מענה לאתגרים שעולים בדרך.",
    },
    {
        q: "כמה עולה ליווי פיננסי?",
        a: "העלות משתנה בהתאם לאורך התהליך והיקף הליווי. לאחר שיחה ראשונית וקבלת פרטים ניתן לקבוע את עלות הליווי. חשוב להבין זו השקעה כלכלית שמחזירה את עצמה כבר בחודשיים הראשונים של התהליך, בזכות חיסכון בהוצאות וניהול נכון יותר של הכסף.",
    },
];


export default function FAQSection() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <motion.section
            id="faq"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="container flex justify-center px-6 py-20 mx-auto hebrew-content"
            dir="rtl"
            aria-labelledby="faq-title"
        >
            <div className="w-full max-w-3xl px-6 py-12 bg-[#F1F3C2] rounded-[32px] shadow-md">
                <h2 id="faq-title" className="mb-2 text-2xl md:text-3xl font-bold text-center text-[#3B3024]">
                    שאלות נפוצות
                </h2>
                <p className="mb-6 text-center text-[#5A4B36] text-sm">
                    כל מה שרציתם לדעת על התהליך – בצורה ברורה וקצרה.
                </p>

                <div className="divide-y divide-[#e2d9c3] rounded-xl overflow-hidden bg-white border border-[#e2d9c3]">
                    {faqs.map((item, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={item.q} className="group">
                                <button
                                    type="button"
                                    className="w-full text-right px-4 py-4 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#97BE5A]"
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-panel-${i}`}
                                    onClick={() => setOpen(isOpen ? null : i)}
                                >
                                    <span className="font-semibold text-[#3B3024]">{item.q}</span>
                                    <span
                                        className="shrink-0 w-8 h-8 rounded-full bg-[#CBB279] text-[#3B3024] flex items-center justify-center transition group-hover:scale-105"
                                        aria-hidden
                                    >
                                        {isOpen ? "−" : "+"}
                                    </span>
                                </button>
                                {isOpen && (
                                    <div
                                        id={`faq-panel-${i}`}
                                        role="region"
                                        aria-labelledby={`faq-button-${i}`}
                                        className="px-4 pb-5 text-[#3B3024] bg-white"
                                    >
                                        <p className="text-sm leading-relaxed">{item.a}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* CTA עדין בסוף ה-FAQ (אופציונלי) */}
                <div className="flex flex-col items-center justify-center gap-3 mt-8 sm:flex-row">
                    <a
                        href="https://wa.me/9725XXXXXXXX?text=שלום, אשמח לשיחת היכרות"
                        className="px-5 py-3 rounded-xl bg-[#97BE5A] text-white hover:bg-[#7ea649] transition shadow w-full sm:w-auto text-center"
                    >
                        קבעו שיחת היכרות בוואטסאפ
                    </a>
                    <a
                        href="#contact"
                        className="px-5 py-3 rounded-xl bg-[#CBB279] text-[#3B3024] hover:bg-[#b39a5f] transition shadow w-full sm:w-auto text-center"
                    >
                        רוצים לשאול משהו נוסף?
                    </a>
                </div>
            </div>
        </motion.section>
    );
}
