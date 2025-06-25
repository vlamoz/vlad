import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage, type Language } from '../contexts/LanguageContext';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
] as const;

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage, isLoading } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLangData = LANGUAGES.find(lang => lang.code === currentLanguage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = async (languageCode: Language) => {
    setIsOpen(false);
    await changeLanguage(languageCode);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className={`
          flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg border
          bg-white dark:bg-gray-800 
          border-gray-200 dark:border-gray-700
          text-gray-700 dark:text-gray-300
          hover:bg-gray-50 dark:hover:bg-gray-700
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          transition-all duration-200
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        aria-label={`Current language: ${currentLangData?.name || 'Unknown'}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden md:inline text-sm font-medium">
          {currentLangData?.flag} {currentLangData?.name}
        </span>
        <span className="md:hidden text-base">
          {currentLangData?.flag}
        </span>
        <ChevronDown 
          className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div 
          className={`
            absolute top-full right-0 mt-2 py-2 w-48
            bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700
            rounded-lg shadow-lg z-50
            animate-in fade-in duration-200
          `}
          role="listbox"
          aria-label="Language selection"
        >
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code as Language)}
              className={`
                w-full flex items-center gap-3 px-4 py-2 text-left
                text-gray-700 dark:text-gray-300
                hover:bg-gray-50 dark:hover:bg-gray-700
                transition-colors duration-150
                ${currentLanguage === language.code 
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' 
                  : ''
                }
              `}
              role="option"
              aria-selected={currentLanguage === language.code}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-medium">{language.name}</span>
              {currentLanguage === language.code && (
                <span className="ml-auto text-primary-500">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;