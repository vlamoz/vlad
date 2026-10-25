import { Calendar, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';
import Tag from './Tag';
import { WORK_EXPERIENCE, formatPeriod, formatPosition } from '../data/workExperience';
import ProjectPlaceholder from './ProjectPlaceholder';

const Projects = () => {
  const { t } = useTranslation('projects');
  const { t: tData } = useTranslation('data');
  const { t: tCommon } = useTranslation('common');

  return (
    <section id="projects" className="print:hidden py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 print:px-0">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />

          {/* Projects List */}
          <div className="space-y-12">
            {WORK_EXPERIENCE.map((project, index) => (
              <div
                key={project.id}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Project Image/Placeholder */}
                <div className="w-full lg:w-1/2">
                  <ProjectPlaceholder id={project.id} title={project.projectTitle} index={index} />
                </div>

                {/* Project Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.projectTitle}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{formatPosition(project, tCommon)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatPeriod(project, tCommon)}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      {tData(`projects.${project.id}.description`)}
                    </p>
                  </div>

                  {/* Tags: hands-on on older roles, leadership on recent ones */}
                  <div className="flex flex-wrap gap-2">
                    {(tData(`projects.${project.id}.tags`, { returnObjects: true }) as string[]).map((tag, tagIndex) => (
                      <Tag key={tagIndex} label={tag} />
                    ))}
                  </div>

                  {/* Highlights */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{t('labels.keyAchievements')}</h4>
                    <ul className="space-y-2">
                      {(tData(`projects.${project.id}.highlights`, { returnObjects: true }) as string[]).map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
