import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useParallax } from "../hooks/useParallax";

export default function HeroSection() {
    const heroRef = useRef<HTMLElement | null>(null);
    const heroParallax = useParallax(heroRef as unknown as React.RefObject<HTMLElement>, 10);

    return (
        <section ref={heroRef as unknown as React.RefObject<HTMLElement>} className="relative flex items-center justify-center w-full h-full">
            <motion.img
                src="/backgrounds/BarFLogo.png"
                alt="Bar Flyshker Logo"
                className="max-w-[80%] max-h-[80%]"
                style={{ y: heroParallax.y, opacity: heroParallax.opacity, willChange: "transform" }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
        </section>
    );
}
