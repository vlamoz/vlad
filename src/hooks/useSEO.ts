import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../i18n';
import { PROFILE } from '../data/profile';

// Creates the head tag matching the selector if it doesn't exist yet, then sets its attributes
const upsertHeadTag = (tag: 'meta' | 'link', selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement(tag);
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
};

const upsertMeta = (key: 'name' | 'property', value: string, content: string) =>
  upsertHeadTag('meta', `meta[${key}="${value}"]`, { [key]: value, content });

export const useSEO = () => {
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    const language = LANGUAGES.find(lang => lang.code === i18n.resolvedLanguage) ?? LANGUAGES[0];
    const title = t('seo.title');
    const description = t('seo.description');
    const origin = window.location.origin;
    const ogImage = `${origin}/og-image.jpg`;
    // Keep ?lang= in the canonical URL, otherwise every language version canonicalizes to / and hreflang is ignored
    const langParam = new URLSearchParams(window.location.search).get('lang');
    const canonicalUrl = origin + window.location.pathname + (langParam ? `?lang=${language.code}` : '');

    document.title = title;

    // Basic meta tags
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'author', PROFILE.name);
    upsertMeta('name', 'robots', 'index, follow');
    upsertMeta('name', 'keywords', 'Engineering Manager, Head of Engineering, Agentic Software Development, AI Coding Agents, Engineering Leadership, Java, Microservices, Remote');

    upsertHeadTag('link', 'link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    // Open Graph meta tags
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', window.location.href);
    upsertMeta('property', 'og:site_name', `${PROFILE.name} Portfolio`);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:image:alt', title);
    upsertMeta('property', 'og:locale', language.ogLocale);

    // Twitter Card meta tags
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);

    // Hreflang tags for multilingual SEO
    [...LANGUAGES.map(lang => ({ hreflang: lang.code, href: `${origin}/?lang=${lang.code}` })), { hreflang: 'x-default', href: `${origin}/` }]
      .forEach(({ hreflang, href }) => upsertHeadTag('link', `link[hreflang="${hreflang}"]`, { rel: 'alternate', hreflang, href }));

    // JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": PROFILE.name,
      "jobTitle": "Engineering Manager",
      "description": description,
      "url": origin,
      "sameAs": [PROFILE.linkedIn],
      "knowsAbout": [
        "Engineering Management",
        "Agentic Software Development",
        "AI Coding Agents",
        "Software Delivery",
        "Software Architecture",
        "Java",
        "Microservices"
      ],
      "alumniOf": {
        "@type": "Organization",
        "name": "Technical Education"
      },
      "workLocation": {
        "@type": "Place",
        "name": "Remote"
      },
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Engineering Manager",
        "occupationLocation": {
          "@type": "Place",
          "name": "Remote"
        },
        "skills": "Engineering leadership, agentic software development, delivery process, Java, microservices"
      }
    };

    let jsonLdScript = document.head.querySelector('script[type="application/ld+json"]');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(structuredData);
  }, [t, i18n.resolvedLanguage]);
};
