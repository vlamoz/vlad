import { type ReactNode } from 'react';
import AnimatedSection from './AnimatedSection';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}

const SectionHeader = ({ title, subtitle, className = "", children }: SectionHeaderProps) => {
  return (
    <AnimatedSection className={`text-center mb-16 ${className}`}>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      {children}
    </AnimatedSection>
  );
};

export default SectionHeader;