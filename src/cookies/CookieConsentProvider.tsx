import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

/** ========= Types ========= */

type ConsentCategories = {
    essential: true;          
    analytics: boolean;
    marketing: boolean;
};

type ConsentRecord = {
    categories: ConsentCategories;
    consentGiven: boolean;
    updatedAt: string;
};

type CookieConsentContextValue = {
    consent: ConsentRecord | null;
    acceptAll: () => void;
    rejectAll: () => void;
    openSettings: () => void;
    saveSettings: (categories: Omit<ConsentCategories, "essential">) => void;
};

/** GTAG typings */
type GtagConsentModeKeys =
    | "ad_storage"
    | "ad_user_data"
    | "ad_personalization"
    | "analytics_storage";

type GtagConsentState = "granted" | "denied";

type GtagFunction = {
    (command: "consent", action: "default" | "update", params: Partial<Record<GtagConsentModeKeys, GtagConsentState>>): void;
    (command: "js", date: Date): void;
    (command: "config", measurementId: string, params?: Record<string, unknown>): void;
    (command: "event", eventName: string, params?: Record<string, unknown>): void
    (...args: unknown[]): void;
};


type Fbq = {
    (method: "init", pixelId: string): void;
    (method: "track", eventName: string, params?: Record<string, unknown>): void;
    (...args: unknown[]): void;
} & {
    loaded?: boolean;
    queue?: unknown[];
    callMethod?: (...args: unknown[]) => void;
    push?: (...args: unknown[]) => void;
    version?: string;
};

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: GtagFunction;
        fbq?: Fbq;
        _gaLoaded?: boolean;
        _fbLoaded?: boolean;
    }
}

/** ========= Storage ========= */

const STORAGE_KEY = "cookie-consent-v1";

function loadConsent(): ConsentRecord | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as ConsentRecord) : null;
    } catch {
        return null;
    }
}

function saveConsent(rec: ConsentRecord): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rec));
}

/** ========= ENV ========= */

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;                 
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined; 

/** ========= Google Consent Mode v2 ========= */

function ensureGtag(): GtagFunction {
    if (!window.dataLayer) window.dataLayer = [];
    if (!window.gtag) {
        const gtag: GtagFunction = (...args: unknown[]) => {
            window.dataLayer!.push(args);
        };
        window.gtag = gtag;
    }
    return window.gtag!;
}

function initGoogleConsentDefaults(): void {
    const gtag = ensureGtag();
    gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
    });
}

function updateGoogleConsent(analytics: boolean, marketing: boolean): void {
    const gtag = ensureGtag();
    gtag("consent", "update", {
        analytics_storage: analytics ? "granted" : "denied",
        ad_storage: marketing ? "granted" : "denied",
        ad_user_data: marketing ? "granted" : "denied",
        ad_personalization: marketing ? "granted" : "denied",
    });
}

function loadGAScriptOnce(): void {
    if (window._gaLoaded || !GA_ID) return;

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
    document.head.appendChild(s);

    const gtag = ensureGtag();
    gtag("js", new Date());
    gtag("config", GA_ID, { send_page_view: false });

    window._gaLoaded = true;
}

/** ========= Meta Pixel ========= */

function loadMetaPixelOnce(): void {
    if (window._fbLoaded || !META_PIXEL_ID) return;

    // טעינת ספריית pixel
    (function (f: Window & typeof globalThis, d: Document, e: string, v: string) {
        if (f.fbq) return;
        const n: Fbq = function (...args: unknown[]) {
            if ((n as Fbq).callMethod) {
                (n as Fbq).callMethod!(...args);
            } else {
                (n as Fbq).queue!.push(args);
            }
        } as Fbq;
        (n as Fbq).queue = [];
        (n as Fbq).loaded = true;
        (n as Fbq).version = "2.0";

        const t = d.createElement(e) as HTMLScriptElement;
        t.async = true;
        t.src = v;

        const s = d.getElementsByTagName(e)[0];
        s.parentNode?.insertBefore(t, s);

        f.fbq = n;
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    window.fbq!("init", META_PIXEL_ID);
    window.fbq!("track", "PageView");

    window._fbLoaded = true;
}

/** ========= Cookie helpers ========= */

function deleteCookie(name: string): void {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
}


function cleanupTrackingCookies(allowAnalytics: boolean, allowMarketing: boolean): void {
    if (!allowAnalytics) {
        deleteCookie("_ga");
        deleteCookie("_gid");
        deleteCookie("_gat");
    }
    if (!allowMarketing) {
        deleteCookie("_fbp");
        deleteCookie("_fbc");
    }
}

/** ========= Apply consent ========= */

function applyConsent(rec: ConsentRecord): void {
    const { analytics, marketing } = rec.categories;

    updateGoogleConsent(analytics, marketing);
    if (analytics) loadGAScriptOnce();
    if (marketing) loadMetaPixelOnce();
    cleanupTrackingCookies(analytics, marketing);
}

/** ========= Context ========= */

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent(): CookieConsentContextValue {
    const ctx = useContext(CookieConsentContext);
    if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
    return ctx;
}

/** ========= Provider ========= */

export default function CookieConsentProvider({ children }: { children: ReactNode }) {
    const [consent, setConsent] = useState<ConsentRecord | null>(() => loadConsent());
    const [showBanner, setShowBanner] = useState<boolean>(() => !loadConsent());
    const [showSettings, setShowSettings] = useState<boolean>(false);

    useEffect(() => {
        initGoogleConsentDefaults();
    }, []);

    useEffect(() => {
        if (consent?.consentGiven) {
            applyConsent(consent);
            saveConsent(consent);
        }
    }, [consent]);

    const acceptAll = (): void => {
        const rec: ConsentRecord = {
            categories: { essential: true, analytics: true, marketing: true },
            consentGiven: true,
            updatedAt: new Date().toISOString(),
        };
        setConsent(rec);
        setShowBanner(false);
    };

    const rejectAll = (): void => {
        const rec: ConsentRecord = {
            categories: { essential: true, analytics: false, marketing: false },
            consentGiven: true,
            updatedAt: new Date().toISOString(),
        };
        setConsent(rec);
        setShowBanner(false);
    };

    const saveSettings = (cats: Omit<ConsentCategories, "essential">): void => {
        const rec: ConsentRecord = {
            categories: { essential: true, ...cats },
            consentGiven: true,
            updatedAt: new Date().toISOString(),
        };
        setConsent(rec);
        setShowSettings(false);
        setShowBanner(false);
    };

    const openSettings = (): void => setShowSettings(true);

    const value = useMemo<CookieConsentContextValue>(
        () => ({ consent, acceptAll, rejectAll, openSettings, saveSettings }),
        [consent]
    );

    return (
        <CookieConsentContext.Provider value={value}>
            {children}
            {showBanner && (
                <Banner
                    onAccept={acceptAll}
                    onReject={rejectAll}
                    onOpenSettings={() => setShowSettings(true)}
                />
            )}
            {showSettings && (
                <SettingsDialog
                    initial={{
                        analytics: consent?.categories.analytics ?? false,
                        marketing: consent?.categories.marketing ?? false,
                    }}
                    onClose={() => setShowSettings(false)}
                    onSave={saveSettings}
                />
            )}
        </CookieConsentContext.Provider>
    );
}

/** ========= UI: Banner ========= */

function Banner(props: { onAccept: () => void; onReject: () => void; onOpenSettings: () => void }) {
    const { onAccept, onReject, onOpenSettings } = props;
    return (
        <div className="fixed inset-x-0 bottom-0 z-50 mx-auto mb-4 w-[95%] max-w-3xl rounded-2xl bg-white/95 shadow-2xl ring-1 ring-black/10 backdrop-blur p-4 md:p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
                <div className="text-sm md:text-[15px] text-gray-800">
                    אנו משתמשים בעוגיות (Cookies) לשיפור החוויה, אנליטיקה ושיווק. ניתן לנהל העדפות בכל רגע.
                    <a href="/privacy" className="ml-2 text-gray-700 underline hover:text-gray-900">מדיניות פרטיות</a>
                    <span className="mx-1">·</span>
                    <a href="/cookies" className="text-gray-700 underline hover:text-gray-900">מדיניות קוקיז</a>
                </div>
                <div className="flex gap-2 md:ml-auto">
                    <button onClick={onReject} className="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                        דחה הכול
                    </button>
                    <button onClick={onOpenSettings} className="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                        הגדרות
                    </button>
                    <button onClick={onAccept} className="px-3 py-2 rounded-lg bg-[#063942] text-white hover:opacity-90">
                        קבל הכול
                    </button>
                </div>
            </div>
        </div>
    );
}

/** ========= UI: Settings ========= */

function SettingsDialog(props: {
    initial: { analytics: boolean; marketing: boolean };
    onClose: () => void;
    onSave: (v: { analytics: boolean; marketing: boolean }) => void;
}) {
    const { initial, onClose, onSave } = props;
    const [analytics, setAnalytics] = useState<boolean>(initial.analytics);
    const [marketing, setMarketing] = useState<boolean>(initial.marketing);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <div className="w-full max-w-lg p-6 bg-white shadow-2xl rounded-2xl">
                <h3 className="mb-1 text-xl font-semibold">הגדרות קוקיז</h3>
                <p className="mb-4 text-sm text-gray-600">
                    בחר אילו קטגוריות לאפשר. עוגיות חיוניות תמיד פעילות כדי שהאתר יעבוד תקין.
                </p>

                <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 border rounded-xl">
                        <input type="checkbox" checked disabled className="mt-1" />
                        <div>
                            <div className="font-medium">חיוני</div>
                            <div className="text-sm text-gray-600">נדרש לתפקוד האתר (לא ניתן לכיבוי).</div>
                        </div>
                    </div>

                    <label className="flex items-start gap-3 p-3 border cursor-pointer rounded-xl">
                        <input
                            type="checkbox"
                            checked={analytics}
                            onChange={(e) => setAnalytics(e.target.checked)}
                            className="mt-1"
                        />
                        <div>
                            <div className="font-medium">אנליטיקה</div>
                            <div className="text-sm text-gray-600">מדידות שימוש ושיפור חוויית משתמש (למשל Google Analytics).</div>
                        </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 border cursor-pointer rounded-xl">
                        <input
                            type="checkbox"
                            checked={marketing}
                            onChange={(e) => setMarketing(e.target.checked)}
                            className="mt-1"
                        />
                        <div>
                            <div className="font-medium">שיווק</div>
                            <div className="text-sm text-gray-600">פרסום מותאם אישית ומעקב המרות (למשל Meta Pixel).</div>
                        </div>
                    </label>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <button onClick={onClose} className="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                        בטל
                    </button>
                    <button
                        onClick={() => onSave({ analytics, marketing })}
                        className="px-3 py-2 rounded-lg bg-[#063942] text-white hover:opacity-90"
                    >
                        שמור העדפות
                    </button>
                </div>
            </div>
        </div>
    );
}

/** ========= Optional helper for custom events ========= */
// ייצוא פונקציה נקייה לאירועים: בלי any
export function gaEvent(eventName: string, params?: Record<string, unknown>): void {
    if (window.gtag) {
        window.gtag("event", eventName, params);
    }
}
