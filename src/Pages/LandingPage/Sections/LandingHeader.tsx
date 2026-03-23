import { Link } from "react-router-dom";

export default function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[1.65rem] border border-white/12 bg-[rgba(5,29,36,0.82)] px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:px-6">
        <a
          href="#landing-contact"
          className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#D1F96D] px-5 text-sm font-bold text-[#063942] shadow-[0_0_26px_rgba(209,249,109,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(209,249,109,0.28)]"
        >
          קביעת שיחת היכרות
        </a>

        <Link to="/" className="inline-flex items-center" aria-label="חזרה לאתר הראשי של בר פליישקר">
          <img
            src="/backgrounds/BarFLogo2.png"
            alt="Bar Flyshker"
            className="h-10 w-auto transition-transform duration-300 hover:scale-[1.03] sm:h-11"
          />
        </Link>
      </div>
    </header>
  );
}