/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type Language = 'en' | 'es' | 'et' | 'ru';

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    (i18n.language as Language) || 'en'
  );

  const changeLanguage = async (language: Language) => {
    if (language === currentLanguage) return;
    
    setIsLoading(true);
    try {
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);
      localStorage.setItem('preferredLanguage', language);
      
      // Update document language attribute for SEO
      document.documentElement.lang = language;
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Sync state with i18next language changes
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng as Language);
      document.documentElement.lang = lng;
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    // Set initial language attribute
    document.documentElement.lang = i18n.language;

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const value = {
    currentLanguage,
    changeLanguage,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export { useLanguage, LanguageProvider };
export default LanguageContext;