import { ArrowDown, Mail, ExternalLink, Download } from 'lucide-react';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { scrollToSection } from '../utils/scrollToSection';
import { PROFILE } from '../data/profile';

const Hero = () => {
  const { t } = useTranslation('hero');

  return (
    <section id="home" className="min-h-screen print:min-h-0 flex items-center justify-center bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-28 lg:pt-24 print:p-0">
        <div className="text-center print:text-left">
          {/* Main Heading - Enhanced Typography */}
          <m.div
            className="mb-8 print:mb-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight print:text-4xl print:mb-0">
              <span className="block print:inline">{t('firstName')}</span>{' '}
              <span className="block print:inline text-primary-600 dark:text-primary-400">{t('lastName')}</span>
            </h1>
          </m.div>

          {/* Subtitle */}
          <m.h2
            className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-4 min-h-10 sm:min-h-12 lg:min-h-14 flex items-center justify-center print:min-h-0 print:justify-start print:text-xl print:mb-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('title')}
          </m.h2>

          {/* Location & Experience */}
          <m.p
            className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-3xl mx-auto print:max-w-none print:text-base print:mb-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('subtitle')}
          </m.p>

          {/* Contact line: the CV has no contact section, so it goes under the title */}
          <p className="hidden print:block text-base text-gray-700 mb-3">
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            {' • '}
            <a href={PROFILE.linkedIn}>{PROFILE.linkedIn.replace(/^https:\/\/www\./, '').replace(/\/$/, '')}</a>
            {' • '}
            {PROFILE.location}
          </p>

          {/* Tagline - LCP element: slide only, no fade, so it counts as painted on the first frame */}
          <m.p
            className="text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed print:max-w-none print:text-base print:mb-0"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
          >
            {t('tagline')}
          </m.p>

          {/* CTA Buttons */}
          <m.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 print:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <m.button
              onClick={() => scrollToSection('contact')}
              className="flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="h-5 w-5" />
              {t('cta.getInTouch')}
            </m.button>

            <m.button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="h-5 w-5" />
              {t('cta.downloadCV')}
            </m.button>

            <m.a
              href={PROFILE.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-4 py-3 rounded-lg font-semibold transition-all duration-200 transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="h-5 w-5" />
              {t('cta.linkedIn')}
            </m.a>
          </m.div>

          {/* Scroll Indicator */}
          <m.button
            onClick={() => scrollToSection('about')}
            className="print:hidden animate-bounce text-gray-400 hover:text-primary-600 transition-colors duration-200"
            aria-label={t('scrollToAbout')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <ArrowDown className="h-8 w-8 mx-auto" />
          </m.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
