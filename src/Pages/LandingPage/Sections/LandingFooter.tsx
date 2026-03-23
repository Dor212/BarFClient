import { Link } from "react-router-dom";

export default function LandingFooter() {
    return (
        <footer className="px-4 pt-2 pb-6 sm:pb-8">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 rounded-[1.6rem] border border-white/10 bg-[rgba(5,29,36,0.42)] px-4 py-4 text-center backdrop-blur-xl sm:flex-row sm:px-6 sm:text-right">
                <div className="text-sm text-white/62">
                    © {new Date().getFullYear()} בר פליישקר. כל הזכויות שמורות.
                </div>

                <div className="flex flex-wrap items-center justify-center text-sm gap-x-4 gap-y-2 text-white/72">
                    <Link to="/accessibility" className="transition hover:text-[#8ef2ff]">
                        נגישות ומדיניות פרטיות
                    </Link>
                    <Link to="/terms" className="transition hover:text-[#8ef2ff]">
                        תנאי שימוש
                    </Link>
                    <Link to="/" className="transition hover:text-[#D1F96D]">
                        לאתר הראשי
                    </Link>
                </div>
            </div>
        </footer>
    );
}