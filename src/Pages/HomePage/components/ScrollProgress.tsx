import { motion, useScroll } from "framer-motion";

export const ScrollProgress: React.FC = () => {
    const { scrollYProgress } = useScroll();

    return (
        <div className="fixed top-0 left-0 right-0 z-[80] pointer-events-none">
            <div className="h-[3px] bg-transparent">
                <motion.div
                    className="h-full origin-left"
                    style={{
                        scaleX: scrollYProgress,
                        background: "linear-gradient(90deg, #063942, #97BE5A, #D1F96D)",
                        boxShadow: "0 0 18px rgba(209,249,109,0.18)",
                    }}
                />
            </div>
        </div>
    );
};
