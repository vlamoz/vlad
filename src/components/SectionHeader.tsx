interface SectionHeaderProps {
  title: string;
  subtitle: string;
  subtitleClassName?: string;
}

const SectionHeader = ({ title, subtitle, subtitleClassName = '' }: SectionHeaderProps) => (
  <div className="text-center mb-16">
    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
      {title}
    </h2>
    <p className={`text-xl text-gray-600 dark:text-gray-400 ${subtitleClassName}`}>
      {subtitle}
    </p>
  </div>
);

export default SectionHeader;
