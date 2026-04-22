import { motion, useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

/* ---------------- COUNTER COMPONENT ---------------- */
const Counter = ({ value, startCount }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (startCount) {
      let start = 0
      const end = parseInt(value.replace(/[^0-9]/g, ''))
      const duration = 2
      const increment = end / (duration * 60)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          clearInterval(timer)
          setCount(end)
        } else {
          setCount(Math.ceil(start))
        }
      }, 16)
    }
  }, [startCount, value])

  return (
    <span>
      {count}
      {value.includes("+") && "+"}
      {value.includes("%") && "%"}
    </span>
  )
}

/* ---------------- MAIN PAGE ---------------- */
const WhyParadise = () => {
  const features = [
    {
      icon: '🎓',
      title: 'Quality English Medium Education',
      description:
        'Paradise English Medium School & Junior College provides a strong academic foundation with a focus on English proficiency, conceptual clarity, and moral values.',
      details: ['English-medium curriculum', 'Concept-based learning', 'Value-oriented education']
    },
    {
      icon: '🧠',
      title: 'Student-Centered Learning',
      description:
        'We nurture every student with personal attention, encouraging curiosity, creativity, and confidence inside and outside the classroom.',
      details: ['Individual attention', 'Encouraging environment', 'Mentorship support']
    },
    {
      icon: '📚',
      title: 'Excellent Academic Results',
      description:
        'Our consistent academic performance reflects our commitment to disciplined teaching, regular assessments, and focused preparation.',
      details: ['Strong results', 'Board exam preparation', 'Academic mentoring']
    },
    {
      icon: '🏫',
      title: 'Modern School Infrastructure',
      description:
        'Paradise School offers safe, clean, and well-equipped facilities to support effective learning and overall development.',
      details: ['Smart classrooms', 'Science laboratories', 'Library & study spaces']
    },
    {
      icon: '👩‍🏫',
      title: 'Qualified & Caring Teachers',
      description:
        'Our experienced faculty members are dedicated to guiding students academically and personally, ensuring holistic growth.',
      details: ['Experienced teachers', 'Continuous guidance', 'Student-friendly approach']
    },
    {
      icon: '🌱',
      title: 'Holistic Development',
      description:
        'We believe education goes beyond textbooks, focusing on discipline, communication skills, sports, and cultural activities.',
      details: ['Personality development', 'Sports & activities', 'Moral values']
    }
  ]

  /* --- COUNTER TRIGGER --- */
  const statRef = useRef(null)
  const statInView = useInView(statRef, { once: true })

  return (
    <div className="pt-20">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-20">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-4"
          >
            Why Choose Paradise English Medium School?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto opacity-90"
          >
            Shaping young minds with quality education, strong values, and a nurturing environment for a successful future
          </motion.p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <span className="text-primary mr-2">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section ref={statRef} className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Our Academic Journey
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '1200+', label: 'Students Enrolled' },
              { number: '60+', label: 'Dedicated Teachers' },
              { number: '98%', label: 'Pass Percentage' },
              { number: '20+', label: 'Years of Excellence' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-primary mb-2">
                  <Counter value={stat.number} startCount={statInView} />
                </div>
                <div className="text-gray-600 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Parents Speak
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by parents, loved by students
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  'Paradise School has given my child confidence, discipline, and strong academic skills. The teachers are very supportive.',
                author: 'Parent of Class X Student',
                name: 'Mrs. Kulkarni'
              },
              {
                quote:
                  'Excellent English medium education with focus on values. My son has improved tremendously in communication skills.',
                author: 'Parent of Class XII Student',
                name: 'Mr. Patil'
              },
              {
                quote:
                  'Safe environment, caring teachers, and quality education. Paradise School truly focuses on overall development.',
                author: 'Parent of Class VII Student',
                name: 'Mrs. Joshi'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <div className="text-4xl text-primary mb-4">"</div>
                <p className="text-gray-700 mb-4 italic">
                  {testimonial.quote}
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-primary">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.author}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default WhyParadise;
