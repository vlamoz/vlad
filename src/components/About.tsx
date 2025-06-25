import { Code, Globe, Target, Users } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
// Optimized profile images
import profileImage320 from '../assets/profile-320.jpg';
import profileImage640 from '../assets/profile-640.jpg';
import profileImageWebP320 from '../assets/profile-320.webp';
import profileImageWebP640 from '../assets/profile-640.webp';

const About = () => {
  const { t } = useTranslation('about');
  
  const highlights = [
    {
      icon: <Code className="h-8 w-8 text-primary-600" />,
      title: t('highlights.experience.title'),
      description: t('highlights.experience.description')
    },
    {
      icon: <Globe className="h-8 w-8 text-primary-600" />,
      title: t('highlights.international.title'),
      description: t('highlights.international.description')
    },
    {
      icon: <Target className="h-8 w-8 text-primary-600" />,
      title: t('highlights.goalFocused.title'),
      description: t('highlights.goalFocused.description')
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: t('highlights.multilingual.title'),
      description: t('highlights.multilingual.description')
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('subtitle')}
            </p>
          </AnimatedSection>

          {/* Hero Photo Section */}
          <AnimatedSection className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl">
                <picture>
                  {/* WebP format for modern browsers */}
                  <source 
                    srcSet={`${profileImageWebP320} 320w, ${profileImageWebP640} 640w`}
                    sizes="(max-width: 640px) 256px, 320px"
                    type="image/webp" 
                  />
                  {/* JPEG fallback for older browsers */}
                  <source 
                    srcSet={`${profileImage320} 320w, ${profileImage640} 640w`}
                    sizes="(max-width: 640px) 256px, 320px"
                    type="image/jpeg" 
                  />
                  {/* Fallback img tag */}
                  <img
                    src={profileImage320}
                    alt={t('imageAlt')}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="240"
                    height="320"
                  />
                </picture>
              </div>
            </div>
          </AnimatedSection>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto mb-16">
            <AnimatedSection delay={0.1}>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('content.paragraph1')}
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('content.paragraph2')}
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('content.paragraph3')}
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('education.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 font-medium">{t('education.university')}</p>
              <p className="text-gray-600 dark:text-gray-400">{t('education.years')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
