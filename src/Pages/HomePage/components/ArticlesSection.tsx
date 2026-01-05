import React, { useRef } from "react";
import { motion } from "framer-motion";
import { GiReceiveMoney } from "react-icons/gi";
import { useParallax } from "../hooks/useParallax";
import { SectionTitle } from "../components/SectionTitle";

export default function ArticlesSection() {
    const articlesRef = useRef<HTMLElement | null>(null);
    const articlesParallax = useParallax(articlesRef as unknown as React.RefObject<HTMLElement>, 6);

    return (
        <section ref={articlesRef as unknown as React.RefObject<HTMLElement>} className="contents">
            <SectionTitle title="מאמרים ומדריכים" variant="articles" />

            <div className="flex flex-col items-center gap-8 mt-12 heebo-p1">
                <motion.div
                    style={{ y: articlesParallax.y, opacity: articlesParallax.opacity, willChange: "transform" }}
                    className="relative w-full max-w-md p-6 transition-shadow duration-300 bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.25 }}
                >
                    <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-[#D1F96D] w-16 h-16 flex items-center justify-center rounded-full shadow-md border-4 border-white">
                        <GiReceiveMoney className="text-[#063942] text-2xl" />
                    </div>

                    <div className="mt-8 text-center">
                        <h3 className="mb-3 text-xl font-bold text-[#063942]">מדריך להתנהלות כלכלית בריאה</h3>
                        <p className="mb-6 text-sm leading-relaxed text-gray-600">
                            למד איך לתכנן ולעקוב אחר התקציב שלך בצורה יעילה, כדי לבנות עתיד פיננסי חזק ויציב.
                        </p>
                        <a
                            href="/articles/guide.pdf"
                            download
                            className="inline-block px-6 py-2 text-sm font-semibold text-white transition-all duration-200 rounded-full bg-[#063942] hover:bg-[#041f23]"
                        >
                            הורד מאמר
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    style={{ y: articlesParallax.y, opacity: articlesParallax.opacity, willChange: "transform" }}
                    className="relative w-full max-w-md p-6 transition-shadow duration-300 bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.25 }}
                >
                    <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-[#D1F96D] w-16 h-16 flex items-center justify-center rounded-full shadow-md border-4 border-white">
                        <GiReceiveMoney className="text-[#063942] text-2xl" />
                    </div>

                    <div className="mt-8 text-center">
                        <h3 className="mb-3 text-xl font-bold text-[#063942]">מילון מושגים פיננסים</h3>
                        <p className="mb-6 text-sm leading-relaxed text-gray-600">
                            אוסף מושגים מרכזיים בעולם הפיננסי עם הסברים קצרים וברורים, שיעזרו לך להבין החלטות כלכליות טוב יותר.
                        </p>
                        <a
                            href="/articles/guide2.pdf"
                            download
                            className="inline-block px-6 py-2 text-sm font-semibold text-white transition-all duration-200 rounded-full bg-[#063942] hover:bg-[#041f23]"
                        >
                            הורד מאמר
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
