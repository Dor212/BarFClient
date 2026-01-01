import { Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import Footer from "./components/Layout/Footer/Footer";
import LoginPage from "./Pages/LoginPage/LoginPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import AuthLoader from "./components/Layout/AuthLoader.tsx";
import AccessibilityAndPrivacyPage from "./Pages/AccessibilityAndPrivacyPage/AccessibilityAndPrivacyPage.tsx";
import TermsPage from "./Pages/TermsPage/TermsPage.tsx";

function App() {
  return (
    <div className="relative isolate min-h-[100svh] text-white bg-[#0b2f36]">
      <div
        className="fixed inset-0 z-0 bg-scroll bg-center bg-no-repeat bg-cover md:bg-fixed"
        style={{
          backgroundImage:
            "url('/backgrounds/BG1m@3x.webp')",
        }}
      />
      <div
        className="fixed inset-0 z-0 hidden bg-fixed bg-center bg-no-repeat bg-cover md:block"
        style={{
          backgroundImage:
            "url('/backgrounds/BG1.png')",
        }}
      />
      <div className="fixed inset-0 z-0 bg-black/35" />

      <div className="relative z-10 min-h-[100svh]">
        <AuthLoader />
        <Header />

        <main id="main" className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/AdminPage" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/accessibility" element={<AccessibilityAndPrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
