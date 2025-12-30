import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import AboutMe from "../../../Imges/AboutMe.png";
import { useParallax } from "../hooks/useParallax";

const TYPE_TEXT = "יועץ פיננסי מוסמך";

export default function AboutSection() {
    const aboutRef = useRef<HTMLElement | null>(null);
    const titleWrapRef = useRef<HTMLDivElement | null>(null);

    const aboutParallax = useParallax(aboutRef as unknown as React.RefObject<HTMLElement>, 8);

    const inView = useInView(titleWrapRef, { amount: 0.6, once: false });

    const [typed, setTyped] = useState("");
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (!inView) {
            if (timerRef.current) window.clearInterval(timerRef.current);
            timerRef.current = null;
            setTyped("");
            return;
        }

        if (timerRef.current) window.clearInterval(timerRef.current);
        timerRef.current = null;
        setTyped("");

        let i = 0;
        timerRef.current = window.setInterval(() => {
            i += 1;
            setTyped(TYPE_TEXT.slice(0, i));
            if (i >= TYPE_TEXT.length && timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }, 60);

        return () => {
            if (timerRef.current) window.clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, [inView]);

    return (
        <section ref={aboutRef as unknown as React.RefObject<HTMLElement>} className="contents">
            <div className="w-full text-center text-[#063942] md:w-1/2 heebo-p1">
                <div className="leading-tight" ref={titleWrapRef}>
                    <h2 className="text-2xl font-semibold text-[#063942]">היי אני בר פליישקר</h2>

                    <h3 className="mt-2 text-3xl font-bold text-[#063942]">
                        <span className="inline-block min-h-[1.2em]">{typed}</span>
                        {inView && (
                            <motion.span
                                className="inline-block w-[2px] h-[1em] bg-[#063942] align-[-2px] ml-1"
                                initial={{ opacity: 1 }}
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                            />
                        )}
                    </h3>

                    <div className="flex items-center justify-center gap-3 mt-5">
                        <span className="h-2 w-2 rounded-full bg-[#97BE5A]" />
                        <span className="h-[3px] w-28 md:w-44 rounded-full bg-[#97BE5A] shadow-[0_0_18px_rgba(151,190,90,0.35)]" />
                        <span className="h-2 w-2 rounded-full bg-[#97BE5A]" />
                    </div>
                </div>

                <p className="max-w-lg mx-auto mt-10 mb-8 text-sm leading-relaxed hebrew-content">
                    החיבור שלי לעולם הפיננסים היה שם תמיד,
                    <br />
                    אבל מה שבאמת הניע אותי <br />
                    הייתה ההבנה הפשוטה והעוצמתית:
                    <br />
                    ניהול נכון של כסף יכול לשנות חיים,
                    <br />
                    לתת שקט, להביא ביטחון, ליצור חופש.
                    <br />
                    <br />
                    לאורך השנים צברתי ניסיון מעשי בעולמות הפיננסיים התחלתי את הדרך שלי לאחר שירות צבאי
                    <br />
                    מאתגר ומשמעותי,
                    ומאז הספקתי לעבוד
                    <br /> בבית ההשקעות פסגות בתחום הפנסיוני,
                    <br />בחברת אופקים פיננסיים בתחום המט”ח,
                    <br /> ובחברת חכם לייעוץ משכנתאות והלוואות.
                    <br />
                    <br />
                    במקביל, ניהלתי את הכספים שלי בצורה יסודית
                    <br />עם תקציב אישי מדויק, מעקב שוטף
                    <br />
                    ותיק השקעות עצמאי שבניתי צעד אחר צעד.
                    <br />
                    <br />
                    עשיתי את זה קודם כל עבור עצמי,
                    <br />
                    מתוך הבנה שאי אפשר לייעץ לאחרים באמת <br />
                    בלי ליישם את אותם העקרונות בחיים האישיים.
                    <br />
                    אבל דווקא מכל המספרים, האקסלים והטבלאות
                    <br />
                    הבנתי שהשליחות האמיתית שלי היא הקשר האישי.
                    <br />
                    היכולת לדבר בגובה העיניים עם אנשים
                    <br />
                    ולעזור להם להבין,
                    לנהל ולכוון את הכסף שלהם
                    <br />
                    בצורה שמתאימה להם.
                    <br />
                    <br />
                    <br />
                    <span className="text-2xl text-[#063942] font-semibold">
                        אני מלווה היום משפחות צעירות, רווקים ורווקות,
                        <br /> בעלי ובעלות עסקים.
                        <br />
                        כל אחד ואחת שמרגישים שהגיע הזמן לקחת שליטה על החיים הפיננסיים שלהם.
                        <br />
                    </span>
                </p>

                <span className="text-1xl text-[#063942]">
                    בלי שיפוטיות,
                    בלי מורכבות מיותרת
                    <br />
                    פשוט תהליך ברור,
                    מותאם אישית,
                    <br /> שמביא תוצאות.
                </span>
            </div>

            <div className="w-full md:w-1/2">
                <motion.div style={{ y: aboutParallax.y, opacity: aboutParallax.opacity, willChange: "transform" }} className="mx-auto w-fit">
                    <div className="mx-auto w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full animated-gradient-border shadow-[0_18px_60px_rgba(6,57,66,0.10)]">
                        <div className="w-full h-full overflow-hidden rounded-full animated-gradient-border-inner">
                            <img src={AboutMe} alt="main" className="object-cover w-full h-full rounded-full" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
