import type { TFunction } from 'i18next';
import { TECHNOLOGIES } from './technologies';

// Keys under common.positions / common.locations in the locale files
type PositionKey = 'engineeringManager' | 'technicalTeamLead' | 'leadDeveloperMHUB' | 'seniorDeveloperYouRoam' | 'seniorDeveloperSTAR';
type LocationKey = 'estonia' | 'fullyRemote';

// Descriptions and highlights live in locales/*/data.json under projects.<id>
export interface WorkItem {
  id: string;
  company: string;
  position: PositionKey;
  startYear: number;
  endYear?: number; // undefined = present
  locations: LocationKey[];
  projectTitle: string;
  technologies: string[];
}

export const WORK_EXPERIENCE: WorkItem[] = [
  {
    id: 'interprefy',
    company: 'Interprefy',
    position: 'engineeringManager',
    startYear: 2020,
    locations: ['fullyRemote'],
    projectTitle: 'Interprefy AI Translation Platform',
    technologies: [TECHNOLOGIES.JAVA, TECHNOLOGIES.SPRING_BOOT, TECHNOLOGIES.AI_ML_APIS, TECHNOLOGIES.MICROSERVICES, TECHNOLOGIES.CLOUD_ARCHITECTURE, TECHNOLOGIES.WEBRTC, TECHNOLOGIES.REDIS, TECHNOLOGIES.RABBITMQ, TECHNOLOGIES.AWS],
  },
  {
    id: 'audatex',
    company: 'Audatex (Solera)',
    position: 'technicalTeamLead',
    startYear: 2008,
    endYear: 2020,
    locations: ['fullyRemote'],
    projectTitle: 'AudaNet Global Insurance Platform Modernization',
    technologies: [TECHNOLOGIES.JAVA, TECHNOLOGIES.REACT, TECHNOLOGIES.SPRING_BOOT, TECHNOLOGIES.MICROSERVICES, TECHNOLOGIES.RABBITMQ, TECHNOLOGIES.POSTGRESQL],
  },
  {
    id: 'nasdaq',
    company: 'NASDAQ OMX',
    position: 'leadDeveloperMHUB',
    startYear: 2009,
    endYear: 2012,
    locations: ['estonia'],
    projectTitle: 'NASDAQ OMX MHUB Financial Messaging Platform',
    technologies: [TECHNOLOGIES.JAVA, TECHNOLOGIES.ENTERPRISE_INTEGRATION, TECHNOLOGIES.FINANCIAL_APIS, TECHNOLOGIES.MESSAGE_QUEUING, TECHNOLOGIES.SPRING, TECHNOLOGIES.ORACLE, TECHNOLOGIES.IBM_MQ],
  },
  {
    id: 'elisa',
    company: 'Elisa AS',
    position: 'seniorDeveloperYouRoam',
    startYear: 2007,
    locations: ['estonia', 'fullyRemote'],
    projectTitle: 'YouRoam: Roaming Partner Management System',
    technologies: [TECHNOLOGIES.JAVA, TECHNOLOGIES.SPRING_FRAMEWORK, TECHNOLOGIES.DATA_PROCESSING, TECHNOLOGIES.REST_APIS, TECHNOLOGIES.ORACLE, TECHNOLOGIES.XML_JSON],
  },
  {
    id: 'government',
    company: 'Estonian Government',
    position: 'seniorDeveloperSTAR',
    startYear: 2012,
    endYear: 2014,
    locations: ['estonia'],
    projectTitle: 'STAR: Estonian Government Welfare System',
    technologies: [TECHNOLOGIES.JAVA, TECHNOLOGIES.SPRING, TECHNOLOGIES.ORACLE, TECHNOLOGIES.SOAP_REST, TECHNOLOGIES.ENTERPRISE_SECURITY, TECHNOLOGIES.GOVERNMENT_STANDARDS],
  }
];

export const formatPeriod = (item: WorkItem, t: TFunction) =>
  `${item.startYear} - ${item.endYear ?? t('common.present')}`;

export const formatPosition = (item: WorkItem, t: TFunction) => t(`common.positions.${item.position}`);

export const formatLocations = (item: WorkItem, t: TFunction) =>
  item.locations.map(location => t(`common.${location}`)).join(' / ');
