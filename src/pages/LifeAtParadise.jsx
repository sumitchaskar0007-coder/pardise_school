import { useState } from 'react'
import { motion } from 'framer-motion'

const LifeAtParadise = () => {
  const [activeTab, setActiveTab] = useState('cultural')

  const activities = {
    cultural: {
      title: 'Cultural Activities',
      description:
        'Encouraging creativity, confidence, and cultural awareness through vibrant school programs.',
      items: [
        { name: 'Annual Day Celebration', description: 'Showcasing student talents and achievements' },
        { name: 'Music & Dance', description: 'Classical and modern performances' },
        { name: 'Drama & Theatre', description: 'Stage performances and acting workshops' },
        { name: 'Art & Craft', description: 'Creative learning through visual arts' },
        { name: 'Debate & Elocution', description: 'Enhancing communication and public speaking skills' },
        { name: 'Festival Celebrations', description: 'Celebrating national and cultural festivals together' },
      ]
    },
    sports: {
      title: 'Sports & Fitness',
      description:
        'Promoting physical fitness, teamwork, and sportsmanship among students.',
      items: [
        { name: 'Cricket', description: 'Regular practice and inter-school matches' },
        { name: 'Football', description: 'Team sports and fitness training' },
        { name: 'Basketball', description: 'Court training and competitions' },
        { name: 'Athletics', description: 'Track and field activities' },
        { name: 'Yoga & Meditation', description: 'Mental and physical wellness programs' },
        { name: 'Indoor Games', description: 'Chess, carrom, table tennis, and more' },
      ]
    },
    campus: {
      title: 'Campus Life',
      description:
        'A safe, disciplined, and joyful learning environment for every student.',
      items: [
        { name: 'Smart Classrooms', description: 'Technology-enabled learning spaces' },
        { name: 'Science Laboratories', description: 'Hands-on practical learning' },
        { name: 'Library', description: 'Quiet reading and study areas' },
        { name: 'Playground', description: 'Spacious outdoor play facilities' },
        { name: 'Health & Safety', description: 'Student well-being and safety measures' },
        { name: 'Transport Facility', description: 'Safe and reliable school transport' },
      ]
    },
    community: {
      title: 'Community & Leadership',
      description:
        'Instilling responsibility, leadership, and social awareness in students.',
      items: [
        { name: 'Student Council', description: 'Leadership opportunities for students' },
        { name: 'Social Awareness Programs', description: 'Health, hygiene, and safety awareness' },
        { name: 'Environmental Activities', description: 'Tree plantation and eco-club initiatives' },
        { name: 'Community Service', description: 'Helping society through service programs' },
        { name: 'Inter-School Events', description: 'Competitions and collaborations' },
        { name: 'Value Education', description: 'Ethics, discipline, and moral learning' },
      ]
    }
  }

  return (
    <div className="pt-20">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-blue-800 text-white py-20">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-4"
          >
            Life at Paradise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto opacity-90"
          >
            A joyful journey of learning, growth, creativity, and character building
          </motion.p>
        </div>
      </section>

      {/* TABS */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(activities).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === key
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {activities[key].title}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-4">
                {activities[activeTab].title}
              </h2>
              <p className="text-xl text-gray-600">
                {activities[activeTab].description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activities[activeTab].items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* STUDENT VOICES */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Student Voices</h2>
            <p className="text-xl text-gray-600">
              What our students say about life at Paradise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  'Paradise School gives us opportunities to learn, perform, and grow confidently every day.',
                author: 'Student, Class X'
              },
              {
                quote:
                  'The sports and activities make school life exciting and enjoyable.',
                author: 'Student, Class VIII'
              },
              {
                quote:
                  'Teachers support us not only in studies but also in building confidence and discipline.',
                author: 'Student, Class XII'
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="text-4xl text-primary mb-4">"</div>
                <p className="text-gray-700 mb-4 italic">{testimonial.quote}</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-primary">{testimonial.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DAILY SCHEDULE */}
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
              A Day at Paradise
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { time: '8:00 AM', activity: 'Morning Assembly & Prayer' },
              { time: '8:30 AM', activity: 'Academic Classes Begin' },
              { time: '11:00 AM', activity: 'Short Break' },
              { time: '11:20 AM', activity: 'Continued Learning Sessions' },
              { time: '1:30 PM', activity: 'Lunch Break' },
              { time: '2:15 PM', activity: 'Afternoon Classes' },
              { time: '3:30 PM', activity: 'Sports & Activities' },
              { time: '4:30 PM', activity: 'Dispersal' },
            ].map((schedule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-6 bg-gray-50 p-4 rounded-lg"
              >
                <div className="w-24 text-primary font-semibold">
                  {schedule.time}
                </div>
                <div className="flex-1 text-gray-700">
                  {schedule.activity}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default LifeAtParadise
