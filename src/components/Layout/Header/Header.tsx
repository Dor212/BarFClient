import { Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { useEffect, useState } from "react";
import { userActions } from "../../../Store/UserSlice";
import { api } from "../../../api/axios";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const nav = useNavigate();


  useEffect(() => {
    const cls = "menu-open";
    if (isOpen) document.body.classList.add(cls);
    else document.body.classList.remove(cls);
    return () => document.body.classList.remove(cls);
  }, [isOpen]);


  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const logout = async () => {
    await api.post("/users/logout");
    dispatch(userActions.logout());
    nav("/");
  };

  const toggleNavbar = () => setIsOpen(prev => !prev);

  return (
    <Navbar
      fluid
      rounded
      className="fixed top-0 left-0 z-50 w-full bg-[#063942]/90 backdrop-blur-md shadow-md"
    >
      <Navbar.Brand
        as="button"
        onClick={() => {
          if ("scrollRestoration" in history) history.scrollRestoration = "manual";
          window.scrollTo({ top: 0, behavior: "smooth" });
          nav("/");
        }}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img
          src="/backgrounds/BarFLogo2.png"
          alt="Bar Logo"
          className="w-auto h-10 transition-transform duration-300 hover:scale-105"
        />
      </Navbar.Brand>

      <Navbar.Toggle onClick={toggleNavbar} />

      <Navbar.Collapse
        className={`${isOpen ? "block" : "hidden"} md:flex md:items-center md:space-x-6 text-lg`}
      >
        {!user && (
          <>
            <Navbar.Link
              as={Link}
              to="/register"
              onClick={() => setIsOpen(false)} // ← נסגור תפריט
              className={`hover:underline hover:text-[#97BE5A] !text-white !text-2xl ${location === "/register" ? "font-bold" : ""}`}
            >
              הרשמה
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              to="/login"
              onClick={() => setIsOpen(false)} // ← נסגור תפריט
              className={`hover:underline hover:text-[#97BE5A] !text-white !text-2xl ${location === "/login" ? "font-bold" : ""}`}
            >
              התחבר
            </Navbar.Link>
          </>
        )}

        {user?.isAdmin && (
          <Navbar.Link
            as={Link}
            to="/AdminPage"
            onClick={() => setIsOpen(false)} // ← נסגור תפריט
            className={`hover:underline hover:text-[#97BE5A] !text-white !text-2xl ${location === "/AdminPage" ? "font-bold" : ""}`}
          >
            Admin
          </Navbar.Link>
        )}

        {user && (
          <Navbar.Link
            as={Link}
            to="#"
            onClick={() => { setIsOpen(false); logout(); }} // ← נסגור תפריט לפני יציאה
            className="text-2xl text-white hover:underline hover:text-red-500"
          >
            התנתק
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
