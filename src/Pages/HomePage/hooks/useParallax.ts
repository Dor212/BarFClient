import { RefObject } from "react";
import { useScroll, useTransform } from "framer-motion";

export function useParallax(ref: RefObject<HTMLElement>, px = 8) {
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [px, -px]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.92, 1, 1, 0.92]);

    return { y, opacity };
}
