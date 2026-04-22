import { useState } from "react";
import { motion } from "framer-motion";

const Admissions = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    grade: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        grade: "",
        message: ""
      });
    }, 3000);
  };

  return (
    <div className="pt-16 md:pt-20">
      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
          >
            Admissions at Paradise English Medium School & Junior College
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto opacity-90 px-2"
          >
            Give your child a strong academic foundation with quality education,
            discipline, and holistic development.
          </motion.p>
        </div>
      </section>

      {/* ================= ADMISSION FORM DOWNLOAD ================= */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-3 md:mb-4">
              Download Admission Form
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
              Download the official admission form to begin the application process
            </p>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <a
                href="/public/pdf/admission_form.pdf"
                download
                className="bg-blue-700 text-white px-5 py-3 sm:px-6 sm:py-3.5 lg:px-8 lg:py-4 rounded-lg text-sm sm:text-base lg:text-lg font-semibold hover:bg-blue-800 transition duration-300 inline-flex items-center gap-2 sm:gap-3"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Download Admission Form (PDF)
              </a>
            </motion.div>
            
            <p className="text-gray-500 mt-3 sm:mt-4 text-xs sm:text-sm md:text-base">
              Please print and fill out the form, then submit it to the admissions office
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= ELIGIBILITY CRITERIA ================= */}
      <section className="py-12 md:py-16 lg:py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-3 md:mb-4">
              Eligibility Criteria & Admission Process
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2">
              As per Maharashtra State Board & Dy. Director of Education, Pune guidelines
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            {/* Left Column - Eligibility Criteria */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-xl lg:rounded-2xl shadow-lg"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 md:mb-6">Eligibility Criteria</h3>
              
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">I. Qualifying Examination:</h4>
                  <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base">
                    <li>S.S.C. Examination of Maharashtra State Board of Secondary and Higher Secondary Education</li>
                    <li>I.C.S.E. / C.B.S.E / An Equivalent Examination of any other Board</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">II. Admission Categories:</h4>
                  <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base">
                    <li>In-house quota admissions are managed by the College Principal under 11th Centralized admission process guidelines</li>
                    <li>For Sports, Cultural Categories and other reservations: Attested true copy of relevant documents required</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">III. Required Documents:</h4>
                  <p className="text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Submit in original + 2 attested true copies:</p>
                  <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base">
                    <li>Duly filled admission form with student's & parent's/guardian's signature with recent photograph</li>
                    <li>Attested true copy of the Mark Sheet of qualifying examination</li>
                    <li>Original School Leaving Certificate</li>
                    <li>Proof of local address for correspondence</li>
                    <li>1 recent stamp size photograph</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Important Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-xl lg:rounded-2xl shadow-lg"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 md:mb-6">Important Information</h3>
              
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">IV. General Instructions:</h4>
                  <ul className="list-decimal pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base">
                    <li>Submission and acceptance of the form does not mean any assurance of admission</li>
                    <li>Only one person allowed in college premises for form submission</li>
                    <li>Forms must be completely filled with all required documents attached</li>
                    <li>Full name (in capital letters), Birth date, Birth place, Nationality and Caste should match School Leaving Certificate</li>
                    <li>Deed of Undertaking on Rs. 20/- stamp paper required (specimen in prospectus)</li>
                    <li>All admissions are provisional until document verification</li>
                    <li>The Principal reserves the right to make necessary changes in admission procedure</li>
                    <li>Failure to pay fees on specified date/time will result in loss of admission claim</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">For In-House Quota Admissions:</h4>
                  <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base">
                    <li>Attested true copy of mark sheet of qualifying examination</li>
                    <li>Attested copy of School Leaving Certificate</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">For Other Boards (Provisional Eligibility Certificate):</h4>
                  <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-gray-700 text-sm sm:text-base">
                    <li>Application in prescribed form from Maharashtra State Board</li>
                    <li>Statement of Marks + 3 attested copies</li>
                    <li>Leaving Certificate (counter-signed) + 3 copies</li>
                    <li>Migration Certificate</li>
                    <li>Deed of Undertaking on stamp paper</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FEE CHART ================= */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-3 md:mb-4">
              Fee Structure 2021-2022
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
              Annual fees payable for Junior College (First & Second Term)
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 sm:p-4 mb-6 md:mb-8 max-w-3xl mx-auto text-left">
              <p className="text-gray-800 text-sm sm:text-base">
                <span className="font-semibold">Note:</span> Fees can be paid by Cheque or Demand Draft in favor of 
                <span className="font-semibold"> "Principal, Paradise English Medium School & Junior College"</span> Payable at Pune.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* 11th Class Fee Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="bg-white p-4 sm:p-6 rounded-xl lg:rounded-2xl shadow-lg"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 md:mb-6 text-center">Class 11th (2021-2022)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-blue-700 text-white">
                      <th className="py-2 px-2 sm:py-3 sm:px-4 border text-xs sm:text-sm">Class</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4 border text-xs sm:text-sm">Stream</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4 border text-xs sm:text-sm">1st</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4 border text-xs sm:text-sm">2nd</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4 border text-xs sm:text-sm">3rd</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4 border text-xs sm:text-sm">4th</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4 border text-xs sm:text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr className="hover:bg-gray-50">
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-semibold">11 Science</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">Plane</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">5000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-bold">23000</td>
                    </tr>
                    <tr className="hover:bg-gray-50 bg-gray-50">
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-semibold">11 Science</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">IT</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6500</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6500</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-bold">25000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-semibold">11 Science</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">Bifocal</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">7000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">7000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-bold">26000</td>
                    </tr>
                    <tr className="hover:bg-gray-50 bg-gray-50">
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-semibold">11 Commerce</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">Plane</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">3500</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">3000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">3000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">3000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-bold">13000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-semibold">11 Commerce</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">IT</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">4500</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">3000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">3000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">3000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-bold">14000</td>
                    </tr>
                    <tr className="hover:bg-gray-50 bg-gray-50">
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-semibold">11 Arts</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">Plane</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">4000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">2000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">2000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">0</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-bold">8000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* 12th Class Fee Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-4 sm:p-6 rounded-xl lg:rounded-2xl shadow-lg"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 md:mb-6 text-center">Class 12th (2021-2022)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-blue-700 text-white">
                      <th className="py-2 px-2 sm:py-3 sm:px-4 border text-xs sm:text-sm">Class</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4 border text-xs sm:text-sm">Stream</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4 border text-xs sm:text-sm">1st</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4 border text-xs sm:text-sm">2nd</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4 border text-xs sm:text-sm">3rd</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4 border text-xs sm:text-sm">4th</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4 border text-xs sm:text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr className="hover:bg-gray-50">
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-semibold">12 Science</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">Plane</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">5000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">5500</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-bold">22500</td>
                    </tr>
                    <tr className="hover:bg-gray-50 bg-gray-50">
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-semibold">12 Science</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">IT</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-bold">24000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-semibold">12 Science</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">Bifocal</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">6000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">7000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-bold">25000</td>
                    </tr>
                    <tr className="hover:bg-gray-50 bg-gray-50">
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-semibold">12 Commerce</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">Plane</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">3500</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">3000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">3000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">3000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-bold">12500</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-semibold">12 Commerce</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">IT</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">4500</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">3000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">3000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">3000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-bold">13500</td>
                    </tr>
                    <tr className="hover:bg-gray-50 bg-gray-50">
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-semibold">12 Arts</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">Plane</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">2000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">2000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">2000</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border">0</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 border font-bold">6000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM SECTION ================= */}
      <section className="py-12 md:py-16 lg:py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-3 md:mb-4">
              Admission Inquiry Form
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Our admissions team will contact you shortly
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* ================= FORM ================= */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className="bg-white p-4 sm:p-6 md:p-8 rounded-xl lg:rounded-2xl shadow-lg border border-gray-200"
                >
                  {submitted ? (
                    <div className="text-center py-6 md:py-8">
                      <div className="text-4xl sm:text-5xl md:text-6xl mb-3 md:mb-4">✓</div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-2 md:mb-3">
                        Thank You!
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                        Your admission inquiry has been received. We will contact
                        you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                          Parent / Guardian Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                          Student Grade *
                        </label>
                        <select
                          name="grade"
                          required
                          value={formData.grade}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                        >
                          <option value="">Select Grade</option>
                          <option>Nursery</option>
                          <option>KG</option>
                          <option>Class I</option>
                          <option>Class II</option>
                          <option>Class III</option>
                          <option>Class IV</option>
                          <option>Class V</option>
                          <option>Class VI</option>
                          <option>Class VII</option>
                          <option>Class VIII</option>
                          <option>Class IX</option>
                          <option>Class X</option>
                          <option>Class XI</option>
                          <option>Class XII</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          rows="3"
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                          placeholder="Any questions or additional information"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-700 text-white text-sm sm:text-base md:text-lg font-semibold py-3 sm:py-3.5 md:py-4 rounded-lg hover:bg-blue-800 transition duration-300"
                      >
                        Submit Admission Inquiry
                      </button>
                    </form>
                  )}
                </motion.div>
              </div>

              {/* ================= INFO BOX ================= */}
              <div className="lg:col-span-1 order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className="bg-blue-700 text-white p-4 sm:p-6 md:p-8 rounded-xl lg:rounded-2xl shadow-lg h-full"
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6">
                    Admissions Office
                  </h3>

                  <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
                    <div>
                      <p className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Office Hours</p>
                      <p className="opacity-90 text-sm sm:text-base">
                        Monday – Saturday: 8:30 AM – 2:30 PM
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Contact Details</p>
                      <p className="opacity-90 text-sm sm:text-base">
                        Phone: +91 84597 81648 / 84597 77988
                      </p>
                      <p className="opacity-90 text-sm sm:text-base">
                        Email: paradiseschool2014@gmail.com
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Important Note</p>
                      <p className="opacity-90 text-xs sm:text-sm">
                        Please bring all required documents in original + 2 attested copies when visiting the admissions office.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-20 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm">
                      Visit our campus to experience the learning environment at
                      Paradise English Medium School & Junior College.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MOBILE OPTIMIZATION STYLES ================= */}
      <style jsx>{`
        /* Responsive table optimizations */
        @media (max-width: 640px) {
          table {
            font-size: 11px;
          }
          
          th, td {
            padding: 4px 6px;
          }
        }

        /* Smooth transitions for all interactive elements */
        button, input, select, textarea, a {
          transition: all 0.2s ease-in-out;
        }

        /* Better touch targets on mobile */
        @media (max-width: 768px) {
          button, 
          .btn-primary,
          input[type="submit"],
          a[download] {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Optimize for very small screens */
        @media (max-width: 480px) {
          h1 {
            line-height: 1.2;
          }
          
          .grid > div {
            margin-bottom: 1rem;
          }
        }

        /* Scroll performance optimization */
        * {
          -webkit-tap-highlight-color: transparent;
        }

        /* Improve form input appearance on iOS */
        input, select, textarea {
          -webkit-appearance: none;
          appearance: none;
        }
      `}</style>
    </div>
  );
};

export default Admissions;