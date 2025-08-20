import { Footer as FbFooter } from "flowbite-react";
import { useCookieConsent } from "../../../cookies/CookieConsentProvider";

const Footer = () => {
    const { openSettings } = useCookieConsent();

    return (
        <FbFooter container className="bg-[#063942] text-white">
            <div className="flex flex-col items-center w-full gap-3 py-4">
                {/* זכויות יוצרים */}
                <FbFooter.Copyright
                    href="#"
                    by="Y.M.A"
                    year={2025}
                    className="text-slate-200"
                />

                {/* קישורים */}
                <FbFooter.LinkGroup className="flex flex-wrap justify-center gap-4 text-sm">
                    <FbFooter.Link
                        href="/accessibility"
                        className="text-slate-200 hover:underline"
                    >
                        הצהרת נגישות ומדיניות פרטיות
                    </FbFooter.Link>
                    <FbFooter.Link
                        href="/terms"
                        className="text-slate-200 hover:underline"
                    >
                        תנאי שימוש
                    </FbFooter.Link>
                    <button
                        onClick={openSettings}
                        className="text-slate-200 hover:underline"
                    >
                        הגדרות קוקיז
                    </button>
                </FbFooter.LinkGroup>
            </div>
        </FbFooter>
    );
};

export default Footer;
