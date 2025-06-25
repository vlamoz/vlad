import { Calendar, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Project } from '../types';
import TechTag from './TechTag';
import { getProjects } from '../data/workExperience';
import ProjectPlaceholder from './ProjectPlaceholder';
import { translateWorkExperience } from '../utils/translationHelpers';

const Projects = () => {
  const { t } = useTranslation('projects');
  const { t: tData } = useTranslation('data');
  const { t: tCommon } = useTranslation('common');
  const projects: Project[] = getProjects();

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
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

          {/* Projects List */}
          <div className="space-y-12">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Project Image/Placeholder */}
                <div className="w-full lg:w-1/2">
                  <ProjectPlaceholder title={project.title} index={index} />
                </div>

                {/* Project Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{translateWorkExperience(tCommon, 'position', project.role)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{translateWorkExperience(tCommon, 'period', project.period)}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      {tData(`projects.${project.id}.description`, { defaultValue: project.description })}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{t('labels.technologiesUsed')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <TechTag key={techIndex} technology={tech} />
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  {project.highlights && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{t('labels.keyAchievements')}</h4>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, highlightIndex) => {
                          const translatedHighlights = tData(`projects.${project.id}.highlights`, { defaultValue: project.highlights, returnObjects: true }) as string[];
                          const translatedHighlight = Array.isArray(translatedHighlights) ? translatedHighlights[highlightIndex] : highlight;
                          
                          return (
                            <li key={highlightIndex} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 dark:text-gray-300">{translatedHighlight}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>

          {/* Additional Projects Note */}
          <div className="mt-16 text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('moreProjects.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {t('moreProjects.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
