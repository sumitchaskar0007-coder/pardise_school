import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Reviews from "../components/Reviews";

const Home = () => {
  const [showAdmissionPopup, setShowAdmissionPopup] = useState(false);

  useEffect(() => {
    setShowAdmissionPopup(true);
  }, []);

  const closeAdmissionPopup = () => setShowAdmissionPopup(false);

  return (
    <div className="m-0 p-0">
      
      {/* ================= IMAGE-ONLY ADMISSION POPUP ================= */}
      {showAdmissionPopup && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={closeAdmissionPopup}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={closeAdmissionPopup}
              className="absolute top-3 right-3 z-10 bg-white/90 hover-bg-white text-gray-700 rounded-full p-2 shadow-md transition"
              aria-label="Close popup"
            >
              ✕
            </button>

            {/* IMAGE ONLY */}
            <img
              src="/images/hero111.png"
              alt="Paradise English Medium School Campus"
              className="
                w-full
                h-72
                sm:h-80
                md:h-96
                lg:h-[420px]
                xl:h-[480px]
                object-cover
                rounded-xl
              "
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            className="
              absolute top-1/2 left-1/2
              w-[120vw] h-[120vh]
              min-w-full min-h-full
              -translate-x-1/2 -translate-y-1/2
              pointer-events-none
            "
            src="https://www.youtube.com/embed/JJha7kVGKHg?autoplay=1&mute=1&loop=1&playlist=JJha7kVGKHg&controls=0&modestbranding=1&rel=0"
            title="Paradise School Campus Video"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>

          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-5xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Paradise English Medium School
              <span className="block text-xl sm:text-2xl mt-2 text-blue-200">
                & Junior College, Pune
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 text-white/90">
              Where Education Meets Excellence
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admissions"
                className="bg-yellow-500 hover-bg-yellow-600 text-blue-900 font-bold px-8 py-3 rounded-lg transition"
              >
                Apply for Admission
              </Link>
              <Link
                to="/about"
                className="border border-white px-8 py-3 rounded-lg hover-bg-white/20 transition"
              >
                Discover Paradise
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE PARADISE ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-blue-600">Paradise</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Holistic education with modern facilities and experienced faculty.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-2">Academic Excellence</h3>
              <p className="text-gray-600">
                Consistent SSC & HSC results with distinction.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-2">Holistic Growth</h3>
              <p className="text-gray-600">
                Sports, arts, culture & leadership development.
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-2">Modern Infrastructure</h3>
              <p className="text-gray-600">
                Spacious campus with advanced labs and facilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <Reviews />

      {/* ================= FINAL CTA ================= */}
      <section className="py-16 bg-blue-700 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Your Journey With Paradise
        </h2>
        <Link
          to="/contact"
          className="inline-block mt-4 bg-white text-blue-700 px-8 py-3 rounded-lg font-bold hover-bg-gray-100 transition"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default Home;