import { Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import Footer from "./components/Layout/Footer/Footer";
import LoginPage from "./Pages/LoginPage/LoginPage";
import AdminPage from "./Pages/AdminPage/AdminPage"
import AuthLoader from "./components/Layout/AuthLoader.tsx";
import AccessibilityAndPrivacyPage from "./Pages/AccessibilityAndPrivacyPage/AccessibilityAndPrivacyPage.tsx";



function App() {
  return (
    <div className="" >
      <AuthLoader />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/accessibility" element={<AccessibilityAndPrivacyPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;