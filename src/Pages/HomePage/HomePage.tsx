import React from "react";
import { Helmet } from "react-helmet";
import { ScrollProgress } from "./components/ScrollProgress";
import { Reveal } from "./components/Reveal";
import { SectionTitle } from "./components/SectionTitle";


import FAQSection from "../../components/Sections/FAQSection";
import AboutSection from "./components/AboutSection";
import ArticlesSection from "./components/ArticlesSection";
import DocumentsUploadSection from "./components/DocumentsUploadSection";
import FixedSocialButtons from "./components/FixedSocialButtons";
import HeroSection from "./components/HeroSection";
import HomePageStyles from "./components/HomePageStyles";
import ProcessSection from "./components/ProcessSection";

const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>בר פליישקר – יועץ פיננסי מוסמך | BAR FLYSHKER</title>
                <meta
                    name="description"
                    content="שירותי ייעוץ פיננסי מותאמים אישית לרווקים, זוגות ובעלי עסקים: ניהול תקציב, ליווי כלכלי, תכנון פיננסי והגשת מסמכים בצורה קלה ומהירה."
                />
                <meta
                    name="keywords"
                    content="ייעוץ פיננסי, כלכלה משפחתית, ניהול תקציב, בר פליישקר, תכנון פיננסי, ליווי כלכלי, מסמכים"
                />
                <meta name="robots" content="index,follow" />
                <link rel="canonical" href="https://barflyshker.com/" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="BAR FLYSHKER" />
                <meta property="og:title" content="בר פליישקר – יועץ פיננסי מוסמך" />
                <meta
                    property="og:description"
                    content="ליווי ותכנון פיננסי ממוקד תוצאות, עם תהליך ברור ופשוט שמתאים לרווקים, זוגות ובעלי עסקים."
                />
                <meta property="og:image" content="https://barflyshker.com/backgrounds/BarFLogo.png" />
                <meta property="og:url" content="https://barflyshker.com/" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="בר פליישקר – יועץ פיננסי מוסמך" />
                <meta
                    name="twitter:description"
                    content="שירותי ייעוץ פיננסי מותאמים אישית – ניהול תקציב, ליווי כלכלי ותכנון פיננסי. קבעו שיחה ללא התחייבות."
                />
                <meta name="twitter:image" content="https://barflyshker.com/backgrounds/BarFLogo.png" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        name: "BAR FLYSHKER",
                        url: "https://barflyshker.com/",
                        logo: "https://barflyshker.com/backgrounds/BarFLogo.png",
                        sameAs: [
                            "https://www.facebook.com/bar.flyshker?locale=he_IL",
                            "https://www.instagram.com/barflyshker/",
                        ],
                    })}
                </script>

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        name: "BAR FLYSHKER",
                        url: "https://barflyshker.com/",
                        potentialAction: {
                            "@type": "SearchAction",
                            target: "https://barflyshker.com/?q={search_term_string}",
                            "query-input": "required name=search_term_string",
                        },
                    })}
                </script>
            </Helmet>

            <HomePageStyles />

            <ScrollProgress />
            <h1 className="sr-only">בר פליישקר – יועץ פיננסי מוסמך</h1>

            <div className="page-bg w-full min-h-screen overflow-x-hidden pt-20 text-[#3B3024] font-serif">
                <FixedSocialButtons />

                <Reveal id="logo" className="h-[100vh] flex items-center justify-center py-2 md:py-0">
                    <HeroSection />
                </Reveal>

                <Reveal
                    id="AbouMe"
                    className="container flex flex-col-reverse items-center justify-center gap-10 px-5 py-20 mx-auto md:flex-row"
                    dir="rtl"
                >
                    <AboutSection />
                </Reveal>

                <Reveal id="process" className="container py-20 mx-auto" dir="rtl">
                    <SectionTitle title="איך זה עובד" variant="process" className="mb-10" />
                    <ProcessSection />
                </Reveal>

                <Reveal id="articles" className="container px-5 py-20 mx-auto text-center" dir="rtl">
                    <ArticlesSection />
                </Reveal>

                <Reveal id="documents-upload" className="container px-5 py-20 mx-auto text-center heebo-p1" dir="rtl">
                    <DocumentsUploadSection />
                </Reveal>

                <Reveal className="container px-5 py-16 mx-auto" dir="rtl">
                    <SectionTitle title="שאלות נפוצות" variant="faq" className="mb-10" />
                    <FAQSection />
                </Reveal>
            </div>
        </>
    );
};

export default HomePage;
