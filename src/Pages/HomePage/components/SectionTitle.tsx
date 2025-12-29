import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Variant = "about" | "process" | "articles" | "talk" | "faq";

type Props = {
    title: string;
    variant: Variant;
    className?: string;
};

const Glow: React.FC<{ active: boolean }> = ({ active }) => {
    return (
        <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-6 mx-auto h-16 w-[min(520px,92%)] blur-[24px]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={active ? { opacity: 0.35, scale: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
                background:
                    "radial-gradient(closest-side, rgba(209,249,109,0.55), rgba(151,190,90,0.22), rgba(6,57,66,0))",
            }}
        />
    );
};

const Line: React.FC<{ active: boolean; variant: Variant }> = ({ active, variant }) => {
    const common = {
        initial: { opacity: 0, y: 10, scaleX: 0.75, filter: "blur(6px)" },
        animate: active ? { opacity: 1, y: 0, scaleX: 1, filter: "blur(0px)" } : { opacity: 0, y: -10, scaleX: 0.75, filter: "blur(6px)" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        style: { transformOrigin: "center" as const },
    };

    if (variant === "about") {
        return (
            <motion.div {...common} className="flex items-center justify-center gap-3 mt-2">
                <span className="h-[6px] w-[6px] rounded-full bg-[#D1F96D] shadow-[0_0_14px_rgba(209,249,109,0.45)]" />
                <span className="h-[3px] w-36 rounded-full bg-[#D1F96D] shadow-[0_0_18px_rgba(209,249,109,0.35)]" />
                <span className="h-[6px] w-[6px] rounded-full bg-[#D1F96D] shadow-[0_0_14px_rgba(209,249,109,0.45)]" />
            </motion.div>
        );
    }

    if (variant === "process") {
        return (
            <motion.div {...common} className="flex items-center justify-center mt-1">
                <div className="relative h-[4px] w-44 overflow-hidden rounded-full bg-[#063942]/15">
                    <motion.div
                        className="absolute inset-0 opacity-95"
                        style={{ background: "linear-gradient(90deg, #063942, #97BE5A, #D1F96D)" }}
                        animate={active ? { x: ["-22%", "22%", "-22%"] } : { x: 0 }}
                        transition={active ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
                    />
                    <div
                        className="absolute inset-0 blur-[10px] opacity-30"
                        style={{ background: "linear-gradient(90deg, #063942, #97BE5A, #D1F96D)" }}
                    />
                </div>
            </motion.div>
        );
    }

    if (variant === "articles") {
        return (
            <motion.div {...common} className="flex items-center justify-center mt-2">
                <motion.div
                    className="h-[3px] w-44 rounded-full"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(90deg, rgba(209,249,109,1) 0 14px, rgba(209,249,109,0.15) 14px 22px)",
                        boxShadow: "0 0 18px rgba(209,249,109,0.22)",
                    }}
                    animate={active ? { opacity: [0.85, 1, 0.85] } : { opacity: 0 }}
                    transition={active ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
                />
            </motion.div>
        );
    }

    if (variant === "talk") {
        return (
            <motion.div {...common} className="flex items-center justify-center gap-2 mt-2">
                <motion.span
                    className="h-[3px] w-10 rounded-full bg-[#D1F96D]/70 shadow-[0_0_14px_rgba(209,249,109,0.18)]"
                    animate={active ? { scaleX: [1, 1.25, 1] } : { scaleX: 0.9 }}
                    transition={active ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
                    style={{ transformOrigin: "center" }}
                />
                <motion.span
                    className="h-[3px] w-24 rounded-full bg-[#D1F96D] shadow-[0_0_18px_rgba(209,249,109,0.28)]"
                    animate={active ? { scaleX: [1, 1.18, 1] } : { scaleX: 0.9 }}
                    transition={active ? { duration: 2.3, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
                    style={{ transformOrigin: "center" }}
                />
                <motion.span
                    className="h-[3px] w-10 rounded-full bg-[#D1F96D]/70 shadow-[0_0_14px_rgba(209,249,109,0.18)]"
                    animate={active ? { scaleX: [1, 1.25, 1] } : { scaleX: 0.9 }}
                    transition={active ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
                    style={{ transformOrigin: "center" }}
                />
            </motion.div>
        );
    }

    return (
        <motion.div {...common} className="flex items-center justify-center mt-2">
            <div className="flex items-center gap-2">
                <motion.span
                    className="h-[10px] w-[10px] rounded-sm border-2 border-[#D1F96D] shadow-[0_0_14px_rgba(209,249,109,0.20)]"
                    animate={active ? { rotate: [0, 8, 0, -8, 0] } : { rotate: 0 }}
                    transition={active ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
                />
                <span className="h-[3px] w-32 rounded-full bg-[#063942] opacity-30" />
                <motion.span
                    className="h-[3px] w-20 rounded-full bg-[#D1F96D] shadow-[0_0_18px_rgba(209,249,109,0.22)]"
                    animate={active ? { opacity: [0.75, 1, 0.75] } : { opacity: 0 }}
                    transition={active ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
                />
                <span className="h-[3px] w-32 rounded-full bg-[#063942] opacity-30" />
                <motion.span
                    className="h-[10px] w-[10px] rounded-sm border-2 border-[#D1F96D] shadow-[0_0_14px_rgba(209,249,109,0.20)]"
                    animate={active ? { rotate: [0, -8, 0, 8, 0] } : { rotate: 0 }}
                    transition={active ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
                />
            </div>
        </motion.div>
    );
};

export const SectionTitle: React.FC<Props> = ({ title, variant, className }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const active = useInView(ref, { amount: 0.6, margin: "0px 0px -20% 0px" });

    return (
        <div ref={ref} className={`relative text-center heebo-p1 ${className ?? ""}`}>
            <Glow active={active} />
            <motion.h2
                className="text-3xl font-bold text-[#063942]"
                initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                animate={active ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0.75, y: -6, filter: "blur(3px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {title}
            </motion.h2>
            <Line active={active} variant={variant} />
        </div>
    );
};
