import type { TFunction } from 'i18next';

// Keys under common.positions / common.locations in the locale files
type PositionKey = 'engineeringManager' | 'technicalTeamLead' | 'leadDeveloperMHUB' | 'seniorDeveloperYouRoam' | 'seniorDeveloperSTAR';
type LocationKey = 'estonia' | 'fullyRemote';

// Company names, descriptions, highlights and tags live in locales/*/data.json under projects.<id>
export interface WorkItem {
  id: string;
  position: PositionKey;
  startYear: number;
  endYear?: number; // undefined = present
  locations: LocationKey[];
  projectTitle: string;
}

export const WORK_EXPERIENCE: WorkItem[] = [
  {
    id: 'interprefy',
    position: 'engineeringManager',
    startYear: 2020,
    locations: ['fullyRemote'],
    projectTitle: 'Interprefy AI Translation Platform',
  },
  {
    id: 'audatex',
    position: 'technicalTeamLead',
    startYear: 2008,
    endYear: 2020,
    locations: ['fullyRemote'],
    projectTitle: 'AudaNet Global Insurance Platform Modernization',
  },
  {
    id: 'nasdaq',
    position: 'leadDeveloperMHUB',
    startYear: 2009,
    endYear: 2012,
    locations: ['estonia'],
    projectTitle: 'NASDAQ OMX MHUB Financial Messaging Platform',
  },
  {
    id: 'elisa',
    position: 'seniorDeveloperYouRoam',
    startYear: 2007,
    locations: ['estonia', 'fullyRemote'],
    projectTitle: 'YouRoam: Roaming Partner Management System',
  },
  {
    id: 'government',
    position: 'seniorDeveloperSTAR',
    startYear: 2012,
    endYear: 2014,
    locations: ['estonia'],
    projectTitle: 'STAR: Estonian Government Welfare System',
  }
];

export const formatPeriod = (item: WorkItem, t: TFunction) =>
  `${item.startYear} - ${item.endYear ?? t('common.present')}`;

export const formatPosition = (item: WorkItem, t: TFunction) => t(`common.positions.${item.position}`);

export const formatLocations = (item: WorkItem, t: TFunction) =>
  item.locations.map(location => t(`common.${location}`)).join(' / ');
