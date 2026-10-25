import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { buildHead, type HeadTag } from '../seo';

// Updates the tag the pre-render wrote, or creates it (dev server, which has no pre-render)
const upsertHeadTag = ({ tag, selector, attributes }: HeadTag) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement(tag);
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
};

// Keeps <head> in sync with the current language after a switch
export const useSEO = () => {
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    const { title, tags, jsonLd } = buildHead(i18n.resolvedLanguage, t);
    document.title = title;
    tags.forEach(upsertHeadTag);

    let jsonLdScript = document.head.querySelector('script[type="application/ld+json"]');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(jsonLd);
  }, [t, i18n.resolvedLanguage]);
};
