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
            className="container flex justify-center px-6 py-20 mx-auto hebrew-content heebo-p1"
            dir="rtl"
            aria-labelledby="faq-title"
        >
            <div className="relative w-full max-w-3xl p-6 transition-shadow duration-300 bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl">
                {/* אייקון עגול למעלה */}
                <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-[#D1F96D] w-16 h-16 flex items-center justify-center rounded-full shadow-md border-4 border-white">
                    <span className="text-[#063942] text-2xl font-bold">?</span>
                </div>

                <div className="mt-8 text-center">
                    <h2
                        id="faq-title"
                        className="mb-2 text-2xl font-bold md:text-3xl"
                        style={{ color: "#063942" }}
                    >
                        שאלות נפוצות
                    </h2>
                    <p className="mb-6 text-sm leading-relaxed text-gray-600">
                        כל מה שרציתם לדעת על התהליך – בצורה ברורה וקצרה.
                    </p>
                </div>

                {/* אקורדיון */}
                <div className="overflow-hidden border border-gray-200 divide-y divide-gray-200 rounded-xl">
                    {faqs.map((item, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={item.q} className="group">
                                <button
                                    type="button"
                                    className="w-full text-right px-4 py-4 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D1F96D]"
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-panel-${i}`}
                                    onClick={() => setOpen(isOpen ? null : i)}
                                >
                                    <span className="font-semibold text-[#063942]">{item.q}</span>
                                    <span
                                        className="shrink-0 w-8 h-8 rounded-full bg-[#D1F96D] text-[#063942] flex items-center justify-center transition group-hover:scale-105"
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
            </div>
        </motion.section>
    );
}
