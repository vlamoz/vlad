import { memo } from 'react';

interface TagProps {
  label: string;
}

const Tag = memo(({ label }: TagProps) => {
  return (
    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-200 rounded-full text-sm font-medium print:px-2 print:py-0 print:text-xs print:border print:border-gray-300">
      {label}
    </span>
  );
});

Tag.displayName = 'Tag';

export default Tag;