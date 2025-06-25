import type { Skill } from '../types';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SKILL_CATEGORIES } from '../data/skills';

const Skills = () => {
  const { t } = useTranslation('skills');
  
  // Map category names to translation keys
  const categoryKeyMap: { [key: string]: string } = {
    "Core Java Technologies": "coreJava",
    "Enterprise & Architecture": "enterprise",
    "Databases": "databases",
    "DevOps & Tools": "devops",
    "Web Technologies": "webTech",
    "Domain Expertise": "domain"
  };
  
  const skillCategories: Skill[] = SKILL_CATEGORIES;

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('subtitle')}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-600 pb-2">
                  {t(`categories.${categoryKeyMap[category.category]}`)}
                </h3>
                <div className="space-y-2">
                  {category.items.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-white dark:bg-gray-700 rounded-lg shadow-md p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('alwaysLearning.title')}
              </h3>
              <div className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed space-y-4">
                <p>
                  {t('alwaysLearning.content.paragraph1')}
                </p>
                <p>
                  {t('alwaysLearning.content.paragraph2')}
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
