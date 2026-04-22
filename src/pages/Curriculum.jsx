import { motion } from "framer-motion";
import React from "react";

const Curriculum = () => {
  const programs = [
    {
      name: "Pre-Primary Section",
      grade: "Nursery – 10th",
      description:
        "Paradise English Medium School provides a joyful and nurturing pre-primary environment where children learn through play, stories, activities, and exploration. The focus is on building confidence, communication skills, and curiosity.",
      focus: [
        "Play-based learning",
        "Language development",
        "Social & emotional growth",
        "Creative activities"
      ],
      img: "/curiculum/kids27.jpg"
    },
    {
      name: "Primary School",
      grade: "Std I – V",
      description:
        "Our primary curriculum builds a strong academic foundation with equal emphasis on values, discipline, and creativity. Students are encouraged to ask questions, think independently, and develop strong reading and writing skills.",
      focus: [
        "Strong academic foundation",
        "English, Maths & EVS",
        "Critical thinking",
        "Moral values & discipline"
      ],
      img: "/curiculum/2327605.jpg"
    },
    {
      name: "Secondary & Junior College",
      grade: "8th – 10th",
      description:
        "Paradise English Medium School & Junior College prepares students for board examinations while shaping responsible and career-ready individuals. Academic excellence, practical learning, and career guidance are key priorities.",
      focus: [
        "Board exam preparation",
        "Science & Commerce streams",
        "Career guidance",
        "Personality development"
      ],
      img: "/curiculum/appdeveloper_3.jpg"
    }
  ];

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
            Paradise English Medium School & Junior College
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto opacity-90"
          >
            A complete academic journey from early childhood to junior college,
            focused on excellence, discipline, and holistic development.
          </motion.p>
        </div>
      </section>

      {/* ================= PROGRAMS SECTION ================= */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-12">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center`}
              >
                {/* TEXT CONTENT */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-primary mb-2">
                    {program.name}
                  </h2>
                  <p className="text-xl text-gray-600 mb-4">
                    {program.grade}
                  </p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  <div>
                    <h3 className="font-semibold text-primary mb-3">
                      Key Focus Areas:
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {program.focus.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-gray-700"
                        >
                          <span className="text-primary mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* IMAGE */}
                <div className="flex-1 bg-gray-50 p-8 rounded-xl">
                  <div className="aspect-video bg-white rounded-lg flex items-center justify-center shadow-md">
                    <img
                      src={program.img}
                      alt={program.name}
                      className="w-3/4 h-auto object-contain drop-shadow-xl"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS SECTION ================= */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Why Choose Paradise?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Quality Education",
                description: "Experienced teachers and structured curriculum"
              },
              {
                title: "Discipline & Values",
                description: "Strong moral and ethical foundation"
              },
              {
                title: "Modern Learning",
                description: "Smart classrooms and activity-based teaching"
              },
              {
                title: "Overall Development",
                description: "Academics, sports, arts, and leadership skills"
              }
            ].map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Curriculum;