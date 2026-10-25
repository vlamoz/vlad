interface SectionHeaderProps {
  title: string;
  subtitle: string;
  subtitleClassName?: string;
}

// In print: a left-aligned title over a rule, without the subtitle
const SectionHeader = ({ title, subtitle, subtitleClassName = '' }: SectionHeaderProps) => (
  <div className="text-center mb-16 print:text-left print:mb-3 print:break-after-avoid">
    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 print:text-xl print:mb-0 print:pb-1 print:border-b print:border-gray-300">
      {title}
    </h2>
    <p className={`text-xl text-gray-600 dark:text-gray-400 print:hidden ${subtitleClassName}`}>
      {subtitle}
    </p>
  </div>
);

export default SectionHeader;
