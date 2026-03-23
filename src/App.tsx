import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import Footer from "./components/Layout/Footer/Footer";
import LoginPage from "./Pages/LoginPage/LoginPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import AuthLoader from "./components/Layout/AuthLoader.tsx";
import AccessibilityAndPrivacyPage from "./Pages/AccessibilityAndPrivacyPage/AccessibilityAndPrivacyPage.tsx";
import TermsPage from "./Pages/TermsPage/TermsPage.tsx";
import LandingPage from "./Pages/LandingPage/LandingPage";

function App() {
  const location = useLocation();
  const isLandingRoute = location.pathname === "/landing";

  return (
    <div className="relative isolate min-h-[100svh] text-white">
      {!isLandingRoute ? (
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
      ) : (
        <>
          <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(209,249,109,0.16),transparent_22%),linear-gradient(180deg,#051f26_0%,#07303a_28%,#0a4553_58%,#062a33_100%)]" />
          <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_18%_12%,rgba(209,249,109,0.15),transparent_18%),radial-gradient(circle_at_80%_20%,rgba(94,234,212,0.18),transparent_20%),radial-gradient(circle_at_50%_78%,rgba(14,165,233,0.14),transparent_24%)]" />
          <div className="fixed inset-0 z-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0)_28%,rgba(255,255,255,0.04)_55%,rgba(255,255,255,0)_100%)] opacity-70" />
        </>
      )}

      <div className="relative z-10 min-h-[100svh]">
        {!isLandingRoute ? <AuthLoader /> : null}
        {!isLandingRoute ? <Header /> : null}

        <main id="main" className={isLandingRoute ? "" : "pt-20"}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/AdminPage" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/accessibility" element={<AccessibilityAndPrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </main>

        {!isLandingRoute ? <Footer /> : null}
      </div>
    </div>
  );
}

export default App;