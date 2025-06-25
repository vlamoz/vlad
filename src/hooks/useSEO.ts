import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useSEO = () => {
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    // Update document title
    const title = t('seo.title');
    document.title = title;

    // Update meta description
    const description = t('seo.description');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      // Create meta description if it doesn't exist
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Update html lang attribute (already handled by LanguageContext, but ensuring consistency)
    document.documentElement.lang = i18n.language;

    // Update Open Graph meta tags if they exist
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    // Update Twitter meta tags if they exist
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }
  }, [t, i18n.language]);
};

export default useSEO;