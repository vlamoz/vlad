import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import only English translations for initial load (critical path optimization)
import enCommon from './locales/en/common.json';
import enHero from './locales/en/hero.json';
import enAbout from './locales/en/about.json';
import enSkills from './locales/en/skills.json';
import enProjects from './locales/en/projects.json';
import enExperience from './locales/en/experience.json';
import enContact from './locales/en/contact.json';
import enData from './locales/en/data.json';

// Lazy loading function for other languages
const loadLanguageResources = async (lng: string) => {
  const resources: any = {};
  
  try {
    const [common, hero, about, skills, projects, experience, contact, data] = await Promise.all([
      import(`./locales/${lng}/common.json`),
      import(`./locales/${lng}/hero.json`),
      import(`./locales/${lng}/about.json`),
      import(`./locales/${lng}/skills.json`),
      import(`./locales/${lng}/projects.json`),
      import(`./locales/${lng}/experience.json`),
      import(`./locales/${lng}/contact.json`),
      import(`./locales/${lng}/data.json`),
    ]);

    resources[lng] = {
      common: common.default,
      hero: hero.default,
      about: about.default,
      skills: skills.default,
      projects: projects.default,
      experience: experience.default,
      contact: contact.default,
      data: data.default,
    };
  } catch (error) {
    console.warn(`Failed to load language resources for ${lng}:`, error);
  }

  return resources;
};

// Initial resources (English only for fast startup)
const resources = {
  en: {
    common: enCommon,
    hero: enHero,
    about: enAbout,
    skills: enSkills,
    projects: enProjects,
    experience: enExperience,
    contact: enContact,
    data: enData,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'preferredLanguage',
    },
    
    ns: ['common', 'hero', 'about', 'skills', 'projects', 'experience', 'contact', 'data'],
    defaultNS: 'common',
  });

// Function to lazy load and switch language
export const changeLanguage = async (lng: string) => {
  if (lng !== 'en' && !i18n.hasResourceBundle(lng, 'common')) {
    const newResources = await loadLanguageResources(lng);
    if (newResources[lng]) {
      Object.entries(newResources[lng]).forEach(([namespace, resource]) => {
        i18n.addResourceBundle(lng, namespace, resource);
      });
    }
  }
  await i18n.changeLanguage(lng);
};

export { loadLanguageResources };
export default i18n;