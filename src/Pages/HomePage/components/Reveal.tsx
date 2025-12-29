import React, { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
    children: React.ReactNode;
    className?: string;
    id?: string;
    dir?: "rtl" | "ltr";
    amount?: number;
};

export const Reveal: React.FC<Props> = ({ children, className, id, dir, amount = 0.18 }) => {
    const ref = useRef<HTMLElement | null>(null);
    const inView = useInView(ref, { amount, margin: "0px 0px -10% 0px" });

    const variants = useMemo(() => {
        return {
            hidden: { opacity: 0, y: 28 },
            visible: { opacity: 1, y: 0 },
        };
    }, []);

    return (
        <motion.section
            ref={ref as unknown as React.RefObject<HTMLElement>}
            id={id}
            dir={dir}
            className={className}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
        >
            {children}
        </motion.section>
    );
};
