import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import Footer from "./components/Layout/Footer/Footer";
import LoginPage from "./Pages/LoginPage/LoginPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import AuthLoader from "./components/Layout/AuthLoader";
import AccessibilityAndPrivacyPage from "./Pages/AccessibilityAndPrivacyPage/AccessibilityAndPrivacyPage";
import TermsPage from "./Pages/TermsPage/TermsPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import GuideLandingPage from "./Pages/GuideLandingPage/GuideLandingPage";

function App() {
  const location = useLocation();
  const isLandingRoute = location.pathname === "/landing";
  const isGuideRoute = location.pathname === "/guide";
  const isChromeLessRoute = isLandingRoute || isGuideRoute;

  return (
    <div className="relative isolate min-h-[100svh] text-white">
      {!isChromeLessRoute ? (
        <>
          <div
            className="fixed inset-0 z-0 bg-scroll bg-center bg-no-repeat bg-cover md:bg-fixed"
            style={{
              backgroundImage: "url('/backgrounds/BG1m@3x.webp')",
            }}
          />
          <div
            className="fixed inset-0 z-0 hidden bg-fixed bg-center bg-no-repeat bg-cover md:block"
            style={{
              backgroundImage: "url('/backgrounds/BG1.png')",
            }}
          />
          <div className="fixed inset-0 z-0 bg-black/35" />
        </>
      ) : isLandingRoute ? (
        <>
          <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(209,249,109,0.16),transparent_22%),linear-gradient(180deg,#051f26_0%,#07303a_28%,#0a4553_58%,#062a33_100%)]" />
          <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_18%_12%,rgba(209,249,109,0.15),transparent_18%),radial-gradient(circle_at_80%_20%,rgba(94,234,212,0.18),transparent_20%),radial-gradient(circle_at_50%_78%,rgba(14,165,233,0.14),transparent_24%)]" />
          <div className="fixed inset-0 z-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0)_28%,rgba(255,255,255,0.04)_55%,rgba(255,255,255,0)_100%)] opacity-70" />
        </>
      ) : (
        <>
          <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(211,230,165,0.16),transparent_24%),linear-gradient(180deg,#07171d_0%,#0b2730_40%,#113846_74%,#08212a_100%)]" />
          <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_16%_16%,rgba(209,249,109,0.15),transparent_18%),radial-gradient(circle_at_82%_18%,rgba(77,208,225,0.14),transparent_20%),radial-gradient(circle_at_50%_82%,rgba(120,168,90,0.12),transparent_24%)]" />
          <div className="fixed inset-0 z-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0)_30%,rgba(209,249,109,0.05)_56%,rgba(255,255,255,0)_100%)] opacity-80" />
          <div className="fixed inset-0 z-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:52px_52px]" />
        </>
      )}

      <div className="relative z-10 min-h-[100svh]">
        {!isChromeLessRoute ? <AuthLoader /> : null}
        {!isChromeLessRoute ? <Header /> : null}

        <main id="main" className={isChromeLessRoute ? "" : "pt-20"}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/guide" element={<GuideLandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/AdminPage" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/accessibility" element={<AccessibilityAndPrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </main>

        {!isChromeLessRoute ? <Footer /> : null}
      </div>
    </div>
  );
}

export default App;
