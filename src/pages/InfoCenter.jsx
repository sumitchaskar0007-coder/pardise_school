import { useState } from "react";
import { motion } from "framer-motion";

const InfoCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is the admission process at Paradise English Medium School?",
      answer:
        "The admission process at Paradise English Medium School & Junior College is simple and transparent. It includes: 1) Inquiry – Fill out the admission inquiry form or visit the school campus, 2) Application – Submit the admission form along with required documents, 3) Interaction – Student and parent interaction if required, 4) Confirmation – Admission confirmation after document verification."
    },
    {
      question: "What classes are offered at Paradise English Medium School & Junior College?",
      answer:
        "Paradise English Medium School & Junior College offers education from Pre-Primary (Nursery & KG) to Secondary School (Std I to X) and Junior College (Std XI & XII) in Science and Commerce streams."
    },
    {
      question: "Does the school provide extracurricular activities?",
      answer:
        "Yes, we strongly encourage extracurricular activities along with academics. Students participate in sports, cultural programs, drawing, music, dance, competitions, and various skill-based activities to support overall personality development."
    },
    {
      question: "What curriculum does the school follow?",
      answer:
        "Paradise English Medium School follows a structured academic curriculum aligned with state board guidelines, focusing on academic excellence, discipline, moral values, and concept-based learning."
    },
    {
      question: "What is the student-teacher ratio?",
      answer:
        "We maintain an appropriate student-teacher ratio to ensure individual attention, effective classroom interaction, and better academic performance for every student."
    },
    {
      question: "What are the school timings?",
      answer:
        "Regular school timings are from 8:30 AM to 2:30 PM. Junior College timings may vary based on streams and schedules. Parents are advised to contact the school office for exact timings."
    },
    {
      question: "Does the school prepare students for board examinations?",
      answer:
        "Yes, we provide strong academic preparation for board examinations through regular tests, revision sessions, doubt-clearing classes, and experienced teaching staff."
    },
    {
      question: "Are transport facilities available?",
      answer:
        "School transportation facilities are available on selected routes. All buses follow safety norms and are supervised by responsible staff. Please contact the school office for route details."
    },
    {
      question: "What facilities are available on campus?",
      answer:
        "Our campus includes well-ventilated classrooms, science laboratories, computer lab, library, sports facilities, activity rooms, and a safe learning environment."
    },
    {
      question: "How can parents contact the school?",
      answer:
        "Parents can contact Paradise English Medium School & Junior College through the admissions office, phone, email, or by visiting the campus during office hours."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-20">
      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-blue-800 text-white py-20">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-4"
          >
            Information Center
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto opacity-90"
          >
            Find answers to commonly asked questions about Paradise English Medium
            School & Junior College.
          </motion.p>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Important information for parents and students
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-lg text-gray-800 pr-4">
                    {faq.question}
                  </span>
                  <motion.svg
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 text-primary flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-gray-50 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoCenter;
