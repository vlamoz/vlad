import type { TFunction } from 'i18next';

/**
 * Translation helper to handle dynamic values that need to be translated
 */

// Map of position keys to translation keys
const POSITION_KEY_MAP: Record<string, string> = {
  'Technical Team Lead': 'common.positions.technicalTeamLead',
  'Lead Developer - B2B Department': 'common.positions.leadDeveloperB2B',
  'Lead Developer - MHUB Platform': 'common.positions.leadDeveloperMHUB',
  'Senior Developer - YouRoam': 'common.positions.seniorDeveloperYouRoam',
  'Senior Developer - STAR System': 'common.positions.seniorDeveloperSTAR',
  'Lead Developer': 'common.positions.leadDeveloper',
  'Senior Developer': 'common.positions.seniorDeveloper',
};

// Map of location keys to translation keys
const LOCATION_KEY_MAP: Record<string, string> = {
  'Fully Remote': 'common.fullyRemote',
  'Estonia': 'common.estonia',
  'Estonia / Fully Remote': 'common.estonia', // We'll handle this special case
  'Remote': 'common.remote',
};

/**
 * Translates a position title
 */
export const translatePosition = (t: TFunction, position: string): string => {
  const translationKey = POSITION_KEY_MAP[position];
  if (translationKey) {
    return t(translationKey);
  }
  return position; // Fallback to original if no translation found
};

/**
 * Translates a location
 */
export const translateLocation = (t: TFunction, location: string): string => {
  // Handle special case for "Estonia / Fully Remote"
  if (location === 'Estonia / Fully Remote') {
    return `${t('common.estonia')} / ${t('common.fullyRemote')}`;
  }
  
  const translationKey = LOCATION_KEY_MAP[location];
  if (translationKey) {
    return t(translationKey);
  }
  return location; // Fallback to original if no translation found
};

/**
 * Translates a period (handles "Present" word)
 */
export const translatePeriod = (t: TFunction, period: string): string => {
  // Replace "Present" with translated version
  return period.replace(/Present/g, t('common.present'));
};

/**
 * Translates dynamic work experience values
 */
export const translateWorkExperience = (
  t: TFunction,
  field: 'position' | 'location' | 'period',
  value: string
): string => {
  switch (field) {
    case 'position':
      return translatePosition(t, value);
    case 'location':
      return translateLocation(t, value);
    case 'period':
      return translatePeriod(t, value);
    default:
      return value;
  }
};