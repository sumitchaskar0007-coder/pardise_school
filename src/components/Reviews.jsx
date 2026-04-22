import React from "react";
import { motion } from "framer-motion";

export default function ReviewsPage() {

  /* ================= VIDEO TESTIMONIALS ================= */
  const parentVideos = [
    {
      id: 1,
      title: "Alka Parekh",
      videoUrl: "https://www.youtube.com/embed/p_SJMiszOys",
    },
    {
      id: 2,
      title: "Vivek Mandal",
      videoUrl: "https://www.youtube.com/embed/AcqV3pUe9LE",
    },
  ];

  /* ================= TEXT REVIEWS ================= */
  const reviews = [
    {
      id: 1,
      name: "Riya Gaikwad",
      role: "Student",
      message:
        "I love the way teachers explain everything. The activities and events make learning fun!",
      rating: 5,
    },
    {
      id: 2,
      name: "Sameer Patil",
      role: "Parent",
      message:
        "The school focuses on overall development. I’ve seen great improvement in my child!",
      rating: 5,
    },
    {
      id: 3,
      name: "Aarav Deshpande",
      role: "Student",
      message:
        "Our science labs and practical activities make learning very interesting. I enjoy coming to school!",
      rating: 5,
    },
    {
      id: 4,
      name: "Pooja Patil",
      role: "Parent",
      message:
        "The teachers are very supportive and communicate regularly. My child has become more confident.",
      rating: 5,
    },
    {
      id: 5,
      name: "Nidhi Shinde",
      role: "Student",
      message:
        "I love participating in cultural events and competitions. The school environment is amazing!",
      rating: 4,
    },
    {
      id: 6,
      name: "Mahe Gund",
      role: "Parent",
      message:
        "A very safe and disciplined school. The transport and management facilities are excellent.",
      rating: 5,
    },
  ];

  return (
    <div className="w-full py-16 bg-gradient-to-b from-blue-50 to-white">

      <div className="max-w-6xl mx-auto px-4">

        {/* ================= HEADING ================= */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-blue-900"
        >
          Student & Parent Reviews
        </motion.h2>

        {/* ================= REVIEWS ================= */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">

          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-xl transition"
            >

              <h3 className="text-xl font-semibold text-blue-900">
                {review.name}
              </h3>

              <p className="text-sm text-blue-600 font-medium mb-2">
                {review.role}
              </p>

              {/* Stars */}
              <div className="flex mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed">
                {review.message}
              </p>

            </motion.div>
          ))}

        </div>

        {/* ================= VIDEO TESTIMONIALS ================= */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-10 text-blue-900"
        >
          School Life at Jadhavar Campus | Paradise English Medium School
        </motion.h3>

        <div className="grid md:grid-cols-2 gap-10">

          {parentVideos.map((vid) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-xl transition"
            >

              {/* Responsive Video */}
              <div className="relative w-full aspect-video">
                <iframe
                  src={vid.videoUrl}
                  title={vid.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              <div className="p-4 text-center font-semibold text-blue-800">
                {vid.title}
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </div>
  );
}
