import { useEffect, useState } from "react";

export type ScrollDir = "up" | "down";

export function useScrollDirection(): ScrollDir {
    const [dir, setDir] = useState<ScrollDir>("down");

    useEffect(() => {
        let lastY = window.scrollY;

        const onScroll = () => {
            const y = window.scrollY;
            if (Math.abs(y - lastY) < 2) return;
            setDir(y > lastY ? "down" : "up");
            lastY = y;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return dir;
}
