import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from './locales/en/common.json';
import enHero from './locales/en/hero.json';
import enAbout from './locales/en/about.json';
import enSkills from './locales/en/skills.json';
import enProjects from './locales/en/projects.json';
import enExperience from './locales/en/experience.json';
import enContact from './locales/en/contact.json';
import enData from './locales/en/data.json';

import esCommon from './locales/es/common.json';
import esHero from './locales/es/hero.json';
import esAbout from './locales/es/about.json';
import esSkills from './locales/es/skills.json';
import esProjects from './locales/es/projects.json';
import esExperience from './locales/es/experience.json';
import esContact from './locales/es/contact.json';
import esData from './locales/es/data.json';

import etCommon from './locales/et/common.json';
import etHero from './locales/et/hero.json';
import etAbout from './locales/et/about.json';
import etSkills from './locales/et/skills.json';
import etProjects from './locales/et/projects.json';
import etExperience from './locales/et/experience.json';
import etContact from './locales/et/contact.json';
import etData from './locales/et/data.json';

import ruCommon from './locales/ru/common.json';
import ruHero from './locales/ru/hero.json';
import ruAbout from './locales/ru/about.json';
import ruSkills from './locales/ru/skills.json';
import ruProjects from './locales/ru/projects.json';
import ruExperience from './locales/ru/experience.json';
import ruContact from './locales/ru/contact.json';
import ruData from './locales/ru/data.json';

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
  es: {
    common: esCommon,
    hero: esHero,
    about: esAbout,
    skills: esSkills,
    projects: esProjects,
    experience: esExperience,
    contact: esContact,
    data: esData,
  },
  et: {
    common: etCommon,
    hero: etHero,
    about: etAbout,
    skills: etSkills,
    projects: etProjects,
    experience: etExperience,
    contact: etContact,
    data: etData,
  },
  ru: {
    common: ruCommon,
    hero: ruHero,
    about: ruAbout,
    skills: ruSkills,
    projects: ruProjects,
    experience: ruExperience,
    contact: ruContact,
    data: ruData,
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

export default i18n;