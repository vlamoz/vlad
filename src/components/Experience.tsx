import { Calendar, MapPin, Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';
import TechTag from './TechTag';
import { WORK_EXPERIENCE, formatLocations, formatPeriod, formatPosition } from '../data/workExperience';

const Experience = () => {
  const { t } = useTranslation('experience');
  const { t: tData } = useTranslation('data');
  const { t: tCommon } = useTranslation('common');

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary-500 to-primary-300 hidden md:block"></div>

            {/* Experience Items */}
            <div className="space-y-12">
              {WORK_EXPERIENCE.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-8 -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full hidden md:block">
                    <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-25"></div>
                  </div>

                  {/* Content Card */}
                  <div className={`md:ml-20 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 ${
                    index % 2 === 0 ? 'md:mr-0' : 'md:mr-8'
                  }`}>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {formatPosition(exp, tCommon)}
                        </h3>
                        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium mt-1">
                          <Building2 className="h-4 w-4" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>{formatPeriod(exp, tCommon)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{formatLocations(exp, tCommon)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {tData(`projects.${exp.id}.description`)}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <TechTag key={techIndex} technology={tech} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why roles overlap */}
          <div className="mt-16 text-center">
            <div className="bg-linear-to-r from-primary-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('overlap.title')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t('overlap.text')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
