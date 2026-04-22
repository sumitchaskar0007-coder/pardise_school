import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, Link } from 'react-router-dom'

// Videos data
const videos = [
  // Add video data as needed
]

const About = () => {
  const location = useLocation()
  const [openSections, setOpenSections] = useState({
    foundersMessage: false,
    missionCredo: false,
    management: false,
    chairperson: false,
    awards: false,
    achievements: false,
    testimonials: false,
    nabet: false,
    schoolTour: false,
    cbse: false,
    aboutParadise: false,
    infrastructure: false,
    academicExcellence: false,
    coCurricular: false,
    parentCommunity: false,
    admissionInfo: false
  })
  const [openVideoModal, setOpenVideoModal] = useState(null)

  // Convert kebab-case to camelCase
  const kebabToCamel = (str) => {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  }

  // Scroll to section when hash changes
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1)
      const camelCaseId = kebabToCamel(sectionId)

      // Auto-expand the section first
      setOpenSections((prev) => ({
        ...prev,
        [camelCaseId]: true,
      }))

      // Then scroll to the section
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          const offset = 100 // Account for fixed navbar
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 300) // Wait for accordion to expand
    }
  }, [location.hash])

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const AccordionSection = ({ id, title, children, isOpen, onToggle }) => {
    return (
      <div id={id} className="mb-6 border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
        >
          <h3 className="text-xl font-bold text-primary">{title}</h3>
          <div className="flex items-center space-x-2">
            {isOpen ? (
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
          </div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 py-4 bg-white">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-blue-800 text-white py-20">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-4"
          >
            Welcome to Paradise English Medium School
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl max-w-4xl mx-auto opacity-90 mb-16"
          >
            Nurturing Young Minds, Building Bright Futures Since 1995
          </motion.p>

          {/* Founder's Message Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-14 mt-12"
          >
            {/* Founder/Chairperson */}
            <div className="bg-white text-black p-8 rounded-2xl shadow-xl">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary shadow-lg mb-4">
                  <img
                    src="/images/owner.png"
                    alt="Founder - Paradise English Medium School"
                    className="w-full h-full object-cover"
                    onError={(e) => { 
                      e.target.src = 'https://via.placeholder.com/200?text=Founder'; 
                    }}
                  />
                </div>

                <h3 className="text-2xl font-bold">Prin. Dr. Sudhakarrao Jadhavar</h3>
                <p className="text-primary font-semibold">Founder & Chairman</p>

                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  M.Com, M.A., L.L.M., M.P.M., D.T.L., D.L.L.&L.W., G.D.C.&A., Ph.D.

                </p>

                <div className="mt-6 text-left text-gray-700 space-y-3">
                  <p>• 35+ Years in Educational Leadership</p>
                  <p>• Former Director - State Education Board</p>
                  <p>• Recipient of National Award for Excellence in Education</p>
                  <p>• Member - International Schools Association</p>
                </div>

                <p className="mt-6 text-gray-700 leading-relaxed text-justify">
                  "Education is not just about academic excellence; it's about nurturing complete human beings 
                  who are confident, compassionate, and capable of making a positive difference in the world. 
                  At Paradise English Medium School, we provide an environment where every child discovers their 
                  unique potential, develops strong moral values, and builds the skills needed to thrive in an 
                  ever-changing world. Our commitment to quality education, innovative teaching methods, and 
                  holistic development has made Paradise a trusted name in education for over two decades."
                </p>
              </div>
            </div>

            {/* Principal's Message */}
            <div className="bg-white text-black p-8 rounded-2xl shadow-xl">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary shadow-lg mb-4">
                  <img
                    src="/images/Shardul_jadhavar.jpeg"
                    alt="Principal - Paradise English Medium School"
                    className="w-full h-full object-cover"
                    onError={(e) => { 
                      e.target.src = 'https://via.placeholder.com/200?text=Principal'; 
                    }}
                  />
                </div>

                <h3 className="text-2xl font-bold">Adv. Shardul Sudhakarrao Jadhavar</h3>
                <p className="text-primary font-semibold">Secretary

</p>

                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  M.B.A., P.G.D.H.R.M., B.Com., D.H.R.&L., D.C.L., D.CP.L., APCL, DIPL, CMED, D.LL&L.W., L.L.M.                </p>

                <p className="mt-6 text-gray-700 leading-relaxed text-justify">
                  At Paradise English Medium School, we believe in creating a nurturing environment where 
                  students feel inspired to learn, explore, and grow. Our dedicated team of educators works 
                  tirelessly to ensure that every child receives personalized attention and guidance. We focus 
                  not only on academic excellence but also on developing critical thinking, creativity, and 
                  strong character. Through innovative teaching methods, modern facilities, and a supportive 
                  community, we prepare our students to become lifelong learners and responsible global citizens. 
                  Together, we make Paradise a place where dreams take flight and futures are shaped.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Accordion Sections */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          {/* About Paradise English Medium School */}
          <AccordionSection
            id="about-paradise"
            title="About Paradise English Medium School"
            isOpen={openSections.aboutParadise}
            onToggle={() => toggleSection('aboutParadise')}
          >
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-primary mb-3">
                Welcome to Paradise English Medium School
              </h4>
              <p className="text-gray-700 leading-relaxed text-lg">
                Established in 1995, Paradise English Medium School has grown to become one of the most 
                respected educational institutions in the region. With a rich legacy of academic excellence 
                and holistic development, we have consistently provided quality education that prepares 
                students for the challenges of the modern world.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                  <h5 className="text-xl font-semibold text-primary mb-2">Our Vision</h5>
                  <p className="text-gray-700 leading-relaxed">
                    To create a dynamic learning community that nurtures intellectual curiosity, 
                    fosters creativity, and develops responsible global citizens who contribute positively 
                    to society.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                  <h5 className="text-xl font-semibold text-primary mb-2">Our Mission</h5>
                  <p className="text-gray-700 leading-relaxed">
                    To provide comprehensive education that balances academic rigor with character development, 
                    encouraging students to achieve their full potential in a supportive and stimulating environment.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h5 className="text-xl font-semibold text-primary mb-3">Core Values</h5>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Excellence:</strong> Striving for the highest standards in all endeavors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Integrity:</strong> Building character through honesty and ethical behavior</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Respect:</strong> Fostering mutual respect and understanding among all</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Innovation:</strong> Embracing creativity and new ideas in education</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Community:</strong> Building strong partnerships with families and society</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h5 className="font-semibold text-primary mb-2">School At a Glance</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="font-semibold">Established:</span> 1995</div>
                  <div><span className="font-semibold">Students:</span> 1500+</div>
                  <div><span className="font-semibold">Teachers:</span> 75+</div>
                  <div><span className="font-semibold">Classes:</span> Nursery to XII</div>
                  <div><span className="font-semibold">Board:</span> CBSE</div>
                  <div><span className="font-semibold">Campus:</span> 5 Acres</div>
                </div>
              </div>
            </div>
          </AccordionSection>

          {/* School Management & Leadership */}
          <AccordionSection
            id="school-management"
            title="School Management & Leadership"
            isOpen={openSections.schoolManagement}
            onToggle={() => toggleSection('schoolManagement')}
          >
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-primary mb-3">Leadership That Inspires Excellence</h4>
              
              <div className="space-y-6">
             

                <h5 className="text-xl font-semibold text-primary mt-6">Key Focus Areas</h5>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start"><span className="text-primary mr-2">•</span>Academic excellence through innovative teaching methodologies</li>
                  <li className="flex items-start"><span className="text-primary mr-2">•</span>Holistic development including sports, arts, and life skills</li>
                  <li className="flex items-start"><span className="text-primary mr-2">•</span>Continuous professional development for faculty</li>
                  <li className="flex items-start"><span className="text-primary mr-2">•</span>Strong parent-teacher partnership and community engagement</li>
                  <li className="flex items-start"><span className="text-primary mr-2">•</span>State-of-the-art infrastructure and learning resources</li>
                  <li className="flex items-start"><span className="text-primary mr-2">•</span>Character building and value-based education</li>
                </ul>

                <p className="text-gray-700 leading-relaxed mt-6">
                  Under the guidance of our experienced leadership team, Paradise English Medium School 
                  continues to evolve and adapt to the changing educational landscape while maintaining 
                  our core values and commitment to excellence.
                </p>
              </div>
            </div>
          </AccordionSection>

          {/* Infrastructure & Facilities */}
          <AccordionSection
            id="infrastructure"
            title="Infrastructure & Facilities"
            isOpen={openSections.infrastructure}
            onToggle={() => toggleSection('infrastructure')}
          >
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-primary mb-3">World-Class Learning Environment</h4>
              
              <p className="text-gray-700 leading-relaxed">
                Paradise English Medium School boasts a sprawling 5-acre campus with modern infrastructure 
                designed to provide an optimal learning environment. Our facilities are constantly upgraded 
                to meet international standards and support 21st-century learning.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h5 className="font-semibold text-primary mb-3 text-lg">Academic Facilities</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 50+ Spacious, well-ventilated classrooms</li>
                    <li>• Smart boards and audio-visual equipment in all rooms</li>
                    <li>• Fully equipped Science laboratories (Physics, Chemistry, Biology)</li>
                    <li>• Modern Computer lab with 100+ systems</li>
                    <li>• Well-stocked library with 10,000+ books</li>
                    <li>• Mathematics and Language labs</li>
                    <li>• Robotics and Innovation lab</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h5 className="font-semibold text-primary mb-3 text-lg">Sports & Recreation</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Large playground for cricket, football, and athletics</li>
                    <li>• Indoor sports complex (badminton, table tennis)</li>
                    <li>• Basketball and volleyball courts</li>
                    <li>• Swimming pool with trained instructors</li>
                    <li>• Chess and carrom rooms</li>
                    <li>• Yoga and meditation center</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h5 className="font-semibold text-primary mb-3 text-lg">Arts & Culture</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Spacious auditorium with 500+ seating capacity</li>
                    <li>• Music room (vocal and instrumental)</li>
                    <li>• Dance studio</li>
                    <li>• Art and craft room</li>
                    <li>• Drama and theater facilities</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h5 className="font-semibold text-primary mb-3 text-lg">Support Facilities</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Air-conditioned school buses with GPS tracking</li>
                    <li>• Medical room with qualified nurse</li>
                    <li>• Cafeteria serving nutritious meals</li>
                    <li>• CCTV surveillance throughout campus</li>
                    <li>• Purified drinking water facilities</li>
                    <li>• Wi-Fi enabled campus</li>
                  </ul>
                </div>
              </div>

              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500 mt-4">
                <h5 className="font-semibold text-primary mb-2">Safety First</h5>
                <p className="text-gray-700 text-sm">
                  Student safety is our top priority. Our campus is secured with CCTV cameras, 
                  trained security personnel, and strict visitor management protocols. All facilities 
                  are regularly inspected and maintained to ensure a safe learning environment.
                </p>
              </div>
            </div>
          </AccordionSection>

          {/* Academic Excellence */}
          <AccordionSection
            id="academic-excellence"
            title="Academic Excellence"
            isOpen={openSections.academicExcellence}
            onToggle={() => toggleSection('academicExcellence')}
          >
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-primary mb-3">Academic Programs & Achievements</h4>
              
              <p className="text-gray-700 leading-relaxed">
                At Paradise English Medium School, academic excellence is at the core of everything we do. 
                Our comprehensive curriculum, experienced faculty, and innovative teaching methods ensure 
                that students achieve their full academic potential.
              </p>

              <div>
                <h5 className="text-xl font-semibold text-primary mb-3">Curriculum Overview</h5>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h6 className="font-semibold text-primary">Primary Years (Nursery - V)</h6>
                    <p className="text-sm text-gray-600">Activity-based learning focusing on foundational skills, creativity, and social development.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h6 className="font-semibold text-primary">Middle School (VI - VIII)</h6>
                    <p className="text-sm text-gray-600">Comprehensive subject coverage with emphasis on conceptual understanding and analytical thinking.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h6 className="font-semibold text-primary">Secondary School (IX - X)</h6>
                    <p className="text-sm text-gray-600">CBSE curriculum with focus on board examination preparation and career guidance.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h6 className="font-semibold text-primary">Senior Secondary (XI - XII)</h6>
                    <p className="text-sm text-gray-600">Science and Commerce streams with specialized coaching for competitive exams.</p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-xl font-semibold text-primary mb-3">Academic Achievements (2023-24)</h5>
                <ul className="space-y-2 text-gray-700">
                  <li>• 100% pass result in Class X and XII board examinations</li>
                  <li>• 35+ students scored above 90% in board exams</li>
                  <li>• 5 students in district top 10 rankings</li>
                  <li>• Winners at National Science Olympiad</li>
                  <li>• Recognized for excellence in Mathematics and English</li>
                  <li>• Multiple scholarships awarded to meritorious students</li>
                </ul>
              </div>

              <div>
                <h5 className="text-xl font-semibold text-primary mb-3">Special Academic Programs</h5>
                <ul className="space-y-2 text-gray-700">
                  <li>• Remedial classes for slow learners</li>
                  <li>• Advanced learning programs for gifted students</li>
                  <li>• Career counseling and guidance</li>
                  <li>• Competitive exam preparation (JEE, NEET, CET)</li>
                  <li>• Spoken English and communication skills program</li>
                  <li>• STEM education initiatives</li>
                </ul>
              </div>
            </div>
          </AccordionSection>

          {/* Co-Curricular Activities */}
          <AccordionSection
            id="co-curricular"
            title="Co-Curricular Activities"
            isOpen={openSections.coCurricular}
            onToggle={() => toggleSection('coCurricular')}
          >
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-primary mb-3">Beyond the Classroom</h4>
              
              <p className="text-gray-700 leading-relaxed">
                We believe that education extends beyond textbooks. Our vibrant co-curricular program 
                helps students discover and nurture their talents while developing essential life skills.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h5 className="font-semibold text-primary mb-3">Sports Activities</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Cricket, Football, Basketball</li>
                    <li>• Swimming, Athletics</li>
                    <li>• Badminton, Table Tennis</li>
                    <li>• Chess, Carrom</li>
                    <li>• Yoga and Martial Arts</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h5 className="font-semibold text-primary mb-3">Cultural Activities</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Music (Vocal & Instrumental)</li>
                    <li>• Dance (Classical & Western)</li>
                    <li>• Drama and Theater</li>
                    <li>• Art and Painting</li>
                    <li>• Creative Writing</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h5 className="font-semibold text-primary mb-3">Clubs & Societies</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Science Club</li>
                    <li>• Literary Society</li>
                    <li>• Debate and Quiz Club</li>
                    <li>• Environment Club</li>
                    <li>• Robotics Club</li>
                    <li>• Photography Club</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h5 className="font-semibold text-primary mb-3">Leadership Programs</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Student Council</li>
                    <li>• House System</li>
                    <li>• Peer Mentoring</li>
                    <li>• Community Service</li>
                    <li>• Leadership Workshops</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <h5 className="text-lg font-semibold text-primary mb-2">Annual Events</h5>
                <ul className="space-y-2 text-gray-700">
                  <li>• Annual Sports Day - December</li>
                  <li>• Cultural Fest "Paradise Melody" - January</li>
                  <li>• Science Exhibition - February</li>
                  <li>• Annual Day Celebration - March</li>
                  <li>• Educational Tours and Field Trips</li>
                </ul>
              </div>
            </div>
          </AccordionSection>

          {/* Awards & Recognitions */}
          <AccordionSection
            id="awards"
            title="Awards & Recognitions"
            isOpen={openSections.awards}
            onToggle={() => toggleSection('awards')}
          >
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-primary mb-3">Celebrating Excellence</h4>
              
              <p className="text-gray-700 leading-relaxed">
                Paradise English Medium School has been consistently recognized for its outstanding 
                contribution to education and holistic development of students.
              </p>

              <div className="space-y-4">
                <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-primary">
                  <h5 className="font-semibold text-primary text-lg">Best School Award 2023</h5>
                  <p className="text-sm text-gray-600">Awarded by Education Excellence Forum for outstanding academic performance and innovative teaching methods.</p>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-primary">
                  <h5 className="font-semibold text-primary text-lg">Green School Certificate 2023</h5>
                  <p className="text-sm text-gray-600">Recognition for environmental initiatives and sustainable practices on campus.</p>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-primary">
                  <h5 className="font-semibold text-primary text-lg">Sports Excellence Award 2022</h5>
                  <p className="text-sm text-gray-600">Awarded by District Sports Authority for outstanding achievements in inter-school competitions.</p>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-primary">
                  <h5 className="font-semibold text-primary text-lg">Innovation in Education Award 2021</h5>
                  <p className="text-sm text-gray-600">Recognized for implementing technology-enabled learning solutions.</p>
                </div>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-primary mb-3">Faculty Recognition</h5>
                <ul className="space-y-2 text-gray-700">
                  <li>• 5 teachers awarded "Best Teacher" by state government</li>
                  <li>• 12 teachers recognized for innovative teaching practices</li>
                  <li>• Faculty members regularly invited as resource persons for workshops</li>
                  <li>• Multiple research papers published by our teachers</li>
                </ul>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-primary mb-3">Student Achievements</h5>
                <ul className="space-y-2 text-gray-700">
                  <li>• National level medals in skating and swimming</li>
                  <li>• State level winners in debate and quiz competitions</li>
                  <li>• District champions in multiple sports</li>
                  <li>• Recognition in National Science and Math Olympiads</li>
                  <li>• Published young authors and poets</li>
                </ul>
              </div>
            </div>
          </AccordionSection>

          {/* Parent & Community Engagement */}
          <AccordionSection
            id="parent-community"
            title="Parent & Community Engagement"
            isOpen={openSections.parentCommunity}
            onToggle={() => toggleSection('parentCommunity')}
          >
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-primary mb-3">Building Strong Partnerships</h4>
              
              <p className="text-gray-700 leading-relaxed">
                We believe that education is a shared responsibility between school and home. 
                Our strong parent-teacher partnership ensures the best possible development for every child.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h5 className="font-semibold text-primary mb-3">Parent Involvement</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Regular Parent-Teacher Meetings</li>
                    <li>• Parent Orientation Programs</li>
                    <li>• Volunteer opportunities in school events</li>
                    <li>• Parent Skill-Sharing Workshops</li>
                    <li>• Parent Representation in School Committees</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h5 className="font-semibold text-primary mb-3">Communication</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Dedicated parent portal for updates</li>
                    <li>• Monthly progress reports</li>
                    <li>• Mobile app for instant communication</li>
                    <li>• Regular newsletters</li>
                    <li>• Open door policy for parent concerns</li>
                  </ul>
                </div>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-primary mb-3">Community Outreach</h5>
                <ul className="space-y-2 text-gray-700">
                  <li>• Free medical camps for underprivileged communities</li>
                  <li>• Tree plantation drives in neighborhood</li>
                  <li>• Adult literacy programs by student volunteers</li>
                  <li>• Donation drives for local charities</li>
                  <li>• Awareness campaigns on social issues</li>
                </ul>
              </div>

              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h5 className="font-semibold text-primary mb-2">Parent Testimonials</h5>
                <div className="space-y-3">
                  <p className="text-gray-700 italic text-sm">
                    "Paradise English Medium School has been a second home for my children. The teachers are 
                    dedicated and the environment is nurturing." - Mrs. Priya Singh, Parent
                  </p>
                  <p className="text-gray-700 italic text-sm">
                    "The holistic development approach of the school has helped my daughter excel both 
                    academically and in extracurricular activities." - Mr. Ramesh Gupta, Parent
                  </p>
                </div>
              </div>
            </div>
          </AccordionSection>

          {/* Admission Information */}
          <AccordionSection
            id="admission-info"
            title="Admission Information"
            isOpen={openSections.admissionInfo}
            onToggle={() => toggleSection('admissionInfo')}
          >
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-primary mb-3">Join the Paradise Family</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-lg font-semibold text-primary mb-3">Admission Process</h5>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Fill the online registration form</li>
                    <li>Submit required documents</li>
                    <li>Interaction with principal (for pre-primary)</li>
                    <li>Entrance test (for classes I and above)</li>
                    <li>Final admission confirmation</li>
                  </ol>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-primary mb-3">Documents Required</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Birth certificate</li>
                    <li>• Previous school report card</li>
                    <li>• Transfer certificate (if applicable)</li>
                    <li>• Passport size photographs</li>
                    <li>• Address proof</li>
                    <li>• Aadhar card copy</li>
                  </ul>
                </div>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-primary mb-3">Age Criteria (as of June 1)</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 border">Class</th>
                        <th className="py-2 px-4 border">Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="py-2 px-4 border">Nursery</td><td className="py-2 px-4 border">3+ years</td></tr>
                      <tr><td className="py-2 px-4 border">LKG</td><td className="py-2 px-4 border">4+ years</td></tr>
                      <tr><td className="py-2 px-4 border">UKG</td><td className="py-2 px-4 border">5+ years</td></tr>
                      <tr><td className="py-2 px-4 border">Class I</td><td className="py-2 px-4 border">6+ years</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-primary mb-3">Fee Structure</h5>
                <p className="text-gray-700">
                  For detailed fee structure and scholarship information, please contact the school office 
                  or visit our admission office during working hours (9:00 AM to 3:00 PM, Monday to Friday).
                </p>
              </div>

              <div className="p-5 bg-blue-50 rounded-lg">
                <h5 className="font-semibold text-primary mb-2">Contact Admission Office</h5>
                <p className="text-gray-700">Phone: +91 1234567890, +91 9876543210</p>
                <p className="text-gray-700">Email: admissions@paradiseenglishschool.edu</p>
                <p className="text-gray-700">Timing: Monday to Friday, 9:00 AM - 3:00 PM</p>
              </div>
            </div>
          </AccordionSection>
        </div>
      </section>

      {/* Photo Gallery Section */}
      

      {/* Contact CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Paradise Difference</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Visit our campus and discover why Paradise English Medium School is the right choice for your child's future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Schedule a Visit
              </Link>
              <Link
                to="/admissions"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                Apply for Admission
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About