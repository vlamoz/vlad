import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Single source for supported languages: switcher labels, hreflang links and Open Graph locales derive from it
export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', ogLocale: 'en_US' },
  { code: 'es', name: 'Español', flag: '🇪🇸', ogLocale: 'es_ES' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪', ogLocale: 'et_EE' },
] as const;

export type Language = typeof LANGUAGES[number]['code'];

// Namespaces are the file names in locales/<lng>/. English is bundled for the first render,
// other languages load on demand (vite.config.ts groups each language into one chunk)
const englishFiles = import.meta.glob<Record<string, unknown>>('./locales/en/*.json', { eager: true, import: 'default' });
const lazyFiles = import.meta.glob<Record<string, unknown>>(['./locales/*/*.json', '!./locales/en/*.json'], { import: 'default' });

const namespaceOf = (path: string) => path.split('/').pop()!.replace('.json', '');

const en = Object.fromEntries(Object.entries(englishFiles).map(([path, resource]) => [namespaceOf(path), resource]));

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en },
    // Init synchronously so the detected language is known when i18nReady starts below
    initAsync: false,
    fallbackLng: 'en',
    // Maps regional codes (en-US, es-ES) to the base language and ignores unsupported ones
    supportedLngs: LANGUAGES.map(language => language.code),

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      // Strip regions before matching, otherwise an exact "es" outranks a preferred "en-GB"
      convertDetectedLanguage: (lng: string) => lng.split('-')[0],
      caches: ['localStorage'],
      lookupLocalStorage: 'preferredLanguage',
    },

    ns: Object.keys(en),
    defaultNS: 'common',
  });

i18n.on('languageChanged', () => {
  document.documentElement.lang = i18n.resolvedLanguage || 'en';
});

// Loads the language's resources if needed, then switches to it
export const changeLanguage = async (lng: string) => {
  if (!i18n.hasResourceBundle(lng, 'common')) {
    const files = Object.entries(lazyFiles).filter(([path]) => path.startsWith(`./locales/${lng}/`));
    try {
      const resources = await Promise.all(files.map(([, load]) => load()));
      files.forEach(([path], index) => i18n.addResourceBundle(lng, namespaceOf(path), resources[index]));
    } catch (error) {
      console.warn(`Failed to load language resources for ${lng}:`, error);
    }
  }
  await i18n.changeLanguage(lng);
};

// Resolves once the detected language's resources are loaded, so non-English
// visitors don't get English text with the switcher showing their language
// (i18n.language, not resolvedLanguage: the latter only counts languages whose resources are already loaded)
export const i18nReady = changeLanguage(i18n.language || 'en');

export default i18n;
