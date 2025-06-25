import { memo } from 'react';
import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = memo(() => {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="flex items-center justify-center gap-2 text-sm">
            {t('footer.copyright', { year: currentYear })}
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            {t('footer.builtWith')}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-600 mt-2">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
