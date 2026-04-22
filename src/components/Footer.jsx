import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/paradiseenglishmediumschoolpune/?rdid=alSUBGpLn8aqh8GN",
      icon: "/icons/fb.png",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/jadhavar_paradise_school",
      icon: "/icons/insta.png",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@jadhavargroupofinstitutespune",
      icon: "/icons/youtube.png",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">

          {/* ================= SCHOOL INFO ================= */}
          <div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-4">
              <div className="w-24 h-16 bg-white overflow-hidden rounded">
                <img
                  src="/images/logo1.png"
                  alt="Paradise English Medium School Logo"
                  className="w-full h-full object-contain p-1"
                />
              </div>

              <div>
                <h6 className="text-lg font-semibold">
                  Paradise English Medium
                </h6>
                <p className="text-sm text-gray-400">
                  School 
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto sm:mx-0">
              Paradise English Medium School & Junior College is committed to
              academic excellence, discipline, strong values, and holistic
              student development.
            </p>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/curriculum" className="text-gray-400 hover:text-white">
                  Curriculum
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="text-gray-400 hover:text-white">
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-white">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= PROGRAMS ================= */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/why-paradise"
                  className="text-gray-400 hover:text-white"
                >
                  Why Paradise
                </Link>
              </li>
              <li>
                <Link
                  to="/life-at-paradise"
                  className="text-gray-400 hover:text-white"
                >
                  Life at Paradise
                </Link>
              </li>
              <li>
                <Link
                  to="/announcements"
                  className="text-gray-400 hover:text-white"
                >
                  Announcements
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= CONTACT + SOCIAL ================= */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>

            <ul className="space-y-2 text-gray-400 text-sm mb-5">
              <li>
                Paradise English Medium School ,<br />
                Pune, Maharashtra
              </li>
              <li>📞 +91 84597 81648 / 84597 77988</li>
              <li>✉️ paradiseschool2014@gmail.com</li>
            </ul>

            {/* SOCIAL ICONS */}
            <div className="flex justify-center sm:justify-start items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group"
                >
                  <div
                    className="
                      w-10 h-10
                      bg-gray-800
                      rounded-full
                      flex items-center justify-center
                      transition
                      group-hover:bg-white
                    "
                  >
                    <img
                      src={social.icon}
                      alt={`${social.name} icon`}
                      className="
                        w-5 h-5
                        object-contain
                        transition
                        group-hover:scale-110
                      "
                      loading="lazy"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ================= COPYRIGHT ================= */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400 text-sm">
          © {currentYear} Trijja Media Works-All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
