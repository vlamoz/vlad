import { memo } from 'react';
import { Heart } from 'lucide-react';

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="flex items-center justify-center gap-2 text-sm">
            © {currentYear} Vlad Mozgovojs. Built with
            <Heart className="h-4 w-4 text-primary-500 fill-primary-500" />
            using React & TypeScript
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-600 mt-2">
            Senior Java Engineer • Technical Team Lead
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
