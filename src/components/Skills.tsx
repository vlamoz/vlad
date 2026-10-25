import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';
import { SKILL_CATEGORIES } from '../data/skills';

const Skills = () => {
  const { t } = useTranslation('skills');

  return (
    <section id="skills" className="py-20 print:py-0 print:mt-5 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 print:px-0">
        <div className="max-w-6xl mx-auto print:max-w-none">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 print:grid-cols-3 print:gap-x-6 print:gap-y-3">
            {SKILL_CATEGORIES.map((category, index) => (
              <m.div
                key={category}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 print:p-0 print:break-inside-avoid"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-600 pb-2 print:text-base print:mb-1 print:pb-0.5">
                  {t(`categories.${category}.title`)}
                </h3>
                <div className="space-y-2 print:space-y-0">
                  {(t(`categories.${category}.items`, { returnObjects: true }) as string[]).map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-center p-2 print:px-0 print:py-0.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3 print:hidden"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </m.div>
            ))}
          </div>

          {/* Agentic development */}
          <div className="mt-16 bg-white dark:bg-gray-700 rounded-lg shadow-md p-8 print:mt-4 print:p-4 print:border print:border-gray-300 print:break-inside-avoid">
            <div className="text-center print:text-left">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 print:text-base print:mb-1">
                {t('agenticShift.title')}
              </h3>
              <div className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed space-y-4 print:max-w-none print:space-y-2">
                <p>
                  {t('agenticShift.paragraph1')}
                </p>
                <p>
                  {t('agenticShift.paragraph2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
