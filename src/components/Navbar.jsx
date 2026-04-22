import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ================= NEWS TICKER ================= */
const NewsTicker = () => {
  const news = [
    "Admissions Open for Academic Year 2025–26 | Paradise English Medium School",
    "Best English Medium School & Junior College – Enroll Now",
  ];

  return (
    <div className="bg-navy-800 text-white py-2 overflow-hidden">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {news.concat(news).map((item, index) => (
            <span key={index} className="mx-8">
              ★ {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ================= NAVBAR ================= */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Why Paradise", path: "/why-paradise" },
    { label: "Curriculum", path: "/curriculum" },
    { label: "Admissions", path: "/admissions" },
    { label: "Life at Paradise", path: "/life-at-paradise" },
    { label: "Gallery", path: "/gallery" },
    { label: "Blogs", path: "/blog" },
    { label: "Announcements", path: "/announcements" },
    { label: "Careers", path: "/career" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-xl" : "bg-white"
      }`}
    >
      <NewsTicker />

      {/* ================= TOP SECTION ================= */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
        {/* LEFT - LOGO */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <img
            src="/images/logo1.png"
            alt="Paradise School Logo"
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
          />
        </Link>

        {/* CENTER - SCHOOL NAME */}
        <div className="flex-1 text-center px-1 sm:px-2 min-w-0">
          <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-extrabold text-navy-900 leading-tight truncate">
            PARADISE ENGLISH MEDIUM SCHOOL
          </h1>

          <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-navy-700 mt-0.5 sm:mt-1 truncate">
            "Education for Strength, Intellect & Wisdom"
          </p>

          <p className="text-[7px] sm:text-[9px] md:text-xs text-gray-600 truncate">
            – Prin. Dr. Sudhakarrao Jadhavar
          </p>

          <p className="text-[7px] sm:text-[9px] md:text-xs text-gray-500 truncate">
            Aditya Educational Foundation's
          </p>
        </div>

        {/* RIGHT - UDISE & INDEX (Desktop XL and up) */}
        <div className="hidden xl:flex flex-col text-right text-sm font-semibold text-navy-800 min-w-[240px] flex-shrink-0">
          <span>Primary UDISE No: 27250509914</span>
          <span>Highschool UDISE No: 27250509922</span>
          <span>Index No: 11.15.175</span>
        </div>

        {/* RIGHT - UDISE & INDEX (Tablet LG to XL) */}
        <div className="hidden lg:flex xl:hidden flex-col text-right text-[11px] font-semibold text-navy-800 min-w-[180px] flex-shrink-0">
          <span>Primary: 27250509914</span>
          <span>Highschool: 27250509922</span>
          <span>Index: 11.15.175</span>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden text-2xl sm:text-3xl text-navy-800 hover:text-navy-600 transition-colors flex-shrink-0"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* ================= DESKTOP MENU ================= */}
      <div className="hidden lg:flex justify-center bg-navy-700 flex-wrap">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-3 xl:px-5 py-3 text-xs xl:text-sm lg:text-sm font-semibold transition-all whitespace-nowrap ${
              location.pathname === link.path
                ? "bg-navy-900 text-white"
                : "text-white hover:bg-navy-800"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-xl fixed left-0 right-0 top-[calc(100%-0px)] max-h-[calc(100vh-120px)] overflow-y-auto z-50 border-t"
            style={{ top: scrolled ? "80px" : "100px" }}
          >
            {/* Mobile UDISE Info */}
            <div className="bg-navy-50 p-3 border-b border-navy-200">
              <p className="text-xs font-semibold text-navy-800">
                Primary UDISE: 27250509914
              </p>
              <p className="text-xs font-semibold text-navy-800">
                Highschool UDISE: 27250509922
              </p>
              <p className="text-xs font-semibold text-navy-800">
                Index No: 11.15.175
              </p>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-5 py-3 border-b text-sm font-semibold ${
                  location.pathname === link.path
                    ? "bg-navy-700 text-white"
                    : "text-navy-800 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= STYLES ================= */}
      <style jsx>{`
        .ticker-wrapper {
          width: 100%;
          overflow: hidden;
        }
        .ticker-content {
          display: inline-block;
          white-space: nowrap;
          animation: scroll 25s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .bg-navy-700 { background: #1e3a5f; }
        .bg-navy-800 { background: #0f2b4a; }
        .bg-navy-900 { background: #0a1c30; }
        .bg-navy-50 { background: #e8f0f8; }
        .text-navy-700 { color: #1e3a5f; }
        .text-navy-800 { color: #0f2b4a; }
        .text-navy-900 { color: #0a1c30; }
        
        /* Responsive fixes */
        @media (max-width: 640px) {
          .ticker-content {
            animation: scroll 20s linear infinite;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;