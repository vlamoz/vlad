import { Sun, Moon } from 'lucide-react';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation('common');

  return (
    <m.button
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-lg transition-all duration-200
        ${theme === 'dark' 
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={t('accessibility.toggleTheme')}
    >
      <m.div
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 180 : 0,
          scale: theme === 'dark' ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </m.div>
    </m.button>
  );
};

export default ThemeToggle;