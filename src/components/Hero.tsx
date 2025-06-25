import { ArrowDown, Mail, ExternalLink, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t, ready } = useTranslation('hero');
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-28 lg:pt-24">
        <div className="text-center">
          {/* Main Heading - Enhanced Typography */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              <span className="block">{ready ? t('firstName') : 'Vlad'}</span>
              <span className="block text-primary-600 dark:text-primary-400">{ready ? t('lastName') : 'Mozgovojs'}</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.h2
            className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-4 min-h-[2.5rem] sm:min-h-[3rem] lg:min-h-[3.5rem] flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {ready ? t('title') : 'Technical Team Lead'}
          </motion.h2>

          {/* Location & Experience */}
          <motion.p
            className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {ready ? t('subtitle') : 'Software Engineering Expert • Fully Remote • 18+ Years Experience'}
          </motion.p>

          {/* Tagline - LCP Element (no animation delay for performance) */}
          <motion.p
            className="text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
          >
            {ready ? t('tagline') : "I've spent 18+ years turning complex technical puzzles into elegant solutions. Here's what I've learned: the best code comes from teams that genuinely enjoy working together — where brilliant ideas can come from anyone, failures become learning moments, and we celebrate wins as a group."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              onClick={scrollToContact}
              className="flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="h-5 w-5" />
              {t('cta.getInTouch')}
            </motion.button>

            <motion.button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="h-5 w-5" />
              Download CV
            </motion.button>

            <motion.a
              href="https://www.linkedin.com/in/vlad-mozgovoi-b8452838/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 px-4 py-3 rounded-lg font-semibold transition-all duration-200 transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="h-5 w-5" />
              {t('cta.linkedIn')}
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            onClick={scrollToAbout}
            className="animate-bounce text-gray-400 hover:text-primary-600 transition-colors duration-200"
            aria-label={t('scrollToAbout')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <ArrowDown className="h-8 w-8 mx-auto" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
