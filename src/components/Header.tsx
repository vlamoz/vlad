import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: t('navigation.home') },
    { id: 'about', label: t('navigation.about') },
    { id: 'skills', label: t('navigation.skills') },
    { id: 'projects', label: t('navigation.projects') },
    { id: 'experience', label: t('navigation.experience') },
    { id: 'contact', label: t('navigation.contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div
            className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white cursor-pointer truncate flex-shrink-0"
            onClick={() => scrollToSection('home')}
          >
            {t('navigation.logo')}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
            <LanguageSwitcher />
            <ThemeToggle />
          </nav>

          {/* Tablet Navigation (md-lg) - Simplified */}
          <nav className="hidden md:flex lg:hidden items-center space-x-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('accessibility.toggleMenu')}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </nav>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('accessibility.toggleMenu')}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
