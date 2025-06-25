import { Code, Globe, Target, Users } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';
import profileImage from '../assets/IMG_1228.jpg';

const About = () => {
  const highlights = [
    {
      icon: <Code className="h-8 w-8 text-primary-600" />,
      title: "18+ Years Experience",
      description: "Deep expertise in Java ecosystem and enterprise development"
    },
    {
      icon: <Globe className="h-8 w-8 text-primary-600" />,
      title: "International Projects",
      description: "Cross-border system implementations and B2B integrations"
    },
    {
      icon: <Target className="h-8 w-8 text-primary-600" />,
      title: "Goal-Focused",
      description: "Proven track record of meeting deadlines and project objectives"
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: "Multilingual",
      description: "Native English/Russian, Professional Estonian, Intermediate Spanish"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Passionate about building robust, scalable solutions
            </p>
          </AnimatedSection>

          {/* Hero Photo Section */}
          <AnimatedSection className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={profileImage}
                  alt="Vladislavs Mozgovojs - Senior Java Engineer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto mb-16">
            <AnimatedSection delay={0.1}>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  My coding journey started at Tallinn University of Technology, but the real education began when I discovered that building great software is as much about people as it is about algorithms. Over 18+ years, I've had the privilege of working across multiple countries and industries — from Estonia to international markets.
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  What drives me? I believe the best solutions emerge when everyone on the team feels comfortable sharing their wildest ideas, when junior developers aren't afraid to question senior decisions, and when we maintain healthy boundaries that let everyone bring their best selves to work. My technical focus is on enterprise Java applications, B2B integrations, and scalable architectures, but my real passion is creating environments where brilliant people can do their best work.
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Every day I get to combine cutting-edge technical challenges with mentoring amazing developers. I've learned that delivering on time and maintaining high code quality isn't just about process — it's about building trust, encouraging curiosity, and making sure everyone feels heard. Lately, I'm excited about how AI tools can amplify what we're already great at, giving our team superpowers rather than replacing the human creativity and collaboration that makes software development truly rewarding.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center mb-4">
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Education */}
          <div className="mt-16 text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Education</h3>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Tallinn University of Technology</p>
              <p className="text-gray-600 dark:text-gray-400">2004 - 2007</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
