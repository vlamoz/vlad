import type { Project, Experience } from '../types';
import { TECHNOLOGIES } from './technologies';

interface WorkItem {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  projectTitle: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

const WORK_EXPERIENCE: WorkItem[] = [
  {
    id: 'interprefy',
    company: 'Interprefy',
    position: 'Technical Team Lead',
    period: '2020 - Present',
    location: 'Fully Remote',
    projectTitle: 'Interprefy AI Translation Platform',
    description: 'Leading the technical transformation of a global language platform, integrating cutting-edge AI technologies for real-time translation, transcription, and text-to-speech capabilities. Managing the transition from traditional interpretation to AI/hybrid solutions.',
    technologies: [TECHNOLOGIES.JAVA, TECHNOLOGIES.SPRING_BOOT, TECHNOLOGIES.AI_ML_APIS, TECHNOLOGIES.MICROSERVICES, TECHNOLOGIES.CLOUD_ARCHITECTURE, TECHNOLOGIES.WEBRTC, TECHNOLOGIES.REDIS, TECHNOLOGIES.RABBITMQ, TECHNOLOGIES.AWS],
    highlights: [
      'Transitioned the platform to horizontal scaling, handling thousands of concurrent users with zero downtime',
      'Led team transition from interpreter-focused to AI-powered platform',
      'Integrated multiple AI services for real-time language processing',
      'Implemented proprietary algorithms for real-time AI translation and audio processing',
    ]
  },
  {
    id: 'audatex',
    company: 'Audatex GmbH',
    position: 'Lead Developer - B2B Department',
    period: '2008 - 2020',
    location: 'Fully Remote',
    projectTitle: 'AudaNet Global Insurance Platform Modernization',
    description: 'Spearheaded the architectural transformation of AudaNet from monolithic to microservices architecture, serving insurance companies across 15+ countries. Led B2B integrations and React frontend transition.',
    technologies: [TECHNOLOGIES.JAVA, TECHNOLOGIES.REACT, TECHNOLOGIES.SPRING_BOOT, TECHNOLOGIES.MICROSERVICES, TECHNOLOGIES.RABBITMQ, TECHNOLOGIES.POSTGRESQL],
    highlights: [
      'Led migration from monolith to microservices architecture',
      'Managed B2B integrations with 50+ insurance backoffice systems',
      'Modernized the user frontend experience with React',
    ]
  },
  {
    id: 'nasdaq',
    company: 'NASDAQ OMX',
    position: 'Lead Developer - MHUB Platform',
    period: '2009 - 2012',
    location: 'Estonia',
    projectTitle: 'NASDAQ OMX MHUB Financial Messaging Platform',
    description: 'Lead Developer of MHUB, the central messaging infrastructure for fund and depository communications across the Baltic financial ecosystem. Designed secure, high-performance message flows handling millions in daily transactions.',
    technologies: [TECHNOLOGIES.JAVA, TECHNOLOGIES.ENTERPRISE_INTEGRATION, TECHNOLOGIES.FINANCIAL_APIS, TECHNOLOGIES.MESSAGE_QUEUING, TECHNOLOGIES.SPRING, TECHNOLOGIES.ORACLE, TECHNOLOGIES.IBM_MQ],
    highlights: [
      'Designed message routing system processing 1M+ transactions daily',
      'Integrated with 20+ banks and depository systems across 3 countries',
      'Implemented zero-downtime deployment strategies',
    ]
  },
  {
    id: 'elisa',
    company: 'Elisa AS',
    position: 'Senior Developer - YouRoam',
    period: '2007 - Present',
    location: 'Estonia / Fully Remote',
    projectTitle: 'YouRoam - Roaming Partner Management System',
    description: 'Key contributor to YouRoam, a sophisticated telecommunications platform managing roaming partnerships for Baltic telecom operators. Implemented complex data import/export functionality supporting multiple international formats and modernized the UI for enhanced user experience.',
    technologies: [TECHNOLOGIES.JAVA, TECHNOLOGIES.SPRING_FRAMEWORK, TECHNOLOGIES.DATA_PROCESSING, TECHNOLOGIES.REST_APIS, TECHNOLOGIES.ORACLE, TECHNOLOGIES.XML_JSON],
    highlights: [
      'Designed robust import/export system handling 10+ different telecom data formats',
      'Optimized database handling for increased scalability',
      'Implemented complex pricing algorithms for various roaming scenarios',
    ]
  },
  {
    id: 'government',
    company: 'Estonian Government',
    position: 'Senior Developer - STAR System',
    period: '2007 - 2020',
    location: 'Estonia',
    projectTitle: 'STAR - Estonian Government Welfare System',
    description: 'Developed critical government infrastructure managing welfare benefits and social security for Estonian citizens.',
    technologies: [TECHNOLOGIES.JAVA, TECHNOLOGIES.SPRING, TECHNOLOGIES.ORACLE, TECHNOLOGIES.SOAP_REST, TECHNOLOGIES.ENTERPRISE_SECURITY, TECHNOLOGIES.GOVERNMENT_STANDARDS],
    highlights: [
      'Processed welfare applications for 500K+ Estonian citizens',
      'Integrated with government departments and legacy systems',
    ]
  }
];

// Transform to Projects format
export const getProjects = (): Project[] => {
  return WORK_EXPERIENCE.map(item => ({
    id: item.id,
    title: item.projectTitle,
    description: item.description,
    technologies: item.technologies,
    role: item.position,
    period: item.period,
    highlights: item.highlights,
  }));
};

// Transform to Experience format
export const getExperiences = (): Experience[] => {
  return WORK_EXPERIENCE.map(item => ({
    id: item.id,
    company: item.company,
    position: item.position,
    period: item.period,
    location: item.location,
    description: item.description,
    technologies: item.technologies,
  }));
};

// Export for backward compatibility
export const PROJECTS = getProjects();
export const EXPERIENCES = getExperiences();