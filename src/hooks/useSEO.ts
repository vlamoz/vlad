import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Helper function to create or update meta tag
const createOrUpdateMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  
  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value);
  });
};

// Helper function to create or update link tag
const createOrUpdateLink = (selector: string, attributes: Record<string, string>) => {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }
  
  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value);
  });
};

export const useSEO = () => {
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    const title = t('seo.title');
    const description = t('seo.description');
    const currentUrl = window.location.href;
    const canonicalUrl = window.location.origin + window.location.pathname;
    
    // Update document title
    document.title = title;
    
    // Update html lang attribute
    document.documentElement.lang = i18n.language;

    // Basic meta tags
    createOrUpdateMeta('meta[name="description"]', { name: 'description', content: description });
    createOrUpdateMeta('meta[name="author"]', { name: 'author', content: 'Vlad Mozgovojs' });
    createOrUpdateMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow' });
    createOrUpdateMeta('meta[name="keywords"]', { 
      name: 'keywords', 
      content: 'Technical Team Lead, Java Developer, Software Engineer, Full Stack Developer, B2B Integration, Microservices, React, TypeScript, Enterprise Development'
    });

    // Canonical URL
    createOrUpdateLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    // Open Graph meta tags
    createOrUpdateMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    createOrUpdateMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    createOrUpdateMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    createOrUpdateMeta('meta[property="og:url"]', { property: 'og:url', content: currentUrl });
    createOrUpdateMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'Vlad Mozgovojs Portfolio' });
    createOrUpdateMeta('meta[property="og:locale"]', { property: 'og:locale', content: getOpenGraphLocale(i18n.language) });

    // Twitter Card meta tags
    createOrUpdateMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    createOrUpdateMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    createOrUpdateMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    createOrUpdateMeta('meta[name="twitter:creator"]', { name: 'twitter:creator', content: '@vladmozgovojs' });

    // Hreflang tags for multilingual SEO
    const languages = [
      { code: 'en', url: `${window.location.origin}/` },
      { code: 'es', url: `${window.location.origin}/?lang=es` },
      { code: 'et', url: `${window.location.origin}/?lang=et` },
      { code: 'ru', url: `${window.location.origin}/?lang=ru` }
    ];

    // Remove existing hreflang tags
    document.querySelectorAll('link[hreflang]').forEach(el => el.remove());

    // Add hreflang tags
    languages.forEach(lang => {
      createOrUpdateLink(`link[hreflang="${lang.code}"]`, {
        rel: 'alternate',
        hreflang: lang.code,
        href: lang.url
      });
    });

    // Add x-default hreflang
    createOrUpdateLink('link[hreflang="x-default"]', {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${window.location.origin}/`
    });

    // JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Vlad Mozgovojs",
      "jobTitle": "Technical Team Lead",
      "description": description,
      "url": window.location.origin,
      "sameAs": [
        "https://www.linkedin.com/in/vlad-mozgovoi-b8452838/",
        "https://github.com/vladmozgovojs"
      ],
      "knowsAbout": [
        "Java",
        "Spring Boot",
        "React",
        "TypeScript",
        "Microservices",
        "B2B Integration",
        "Enterprise Development",
        "Technical Leadership",
        "Software Architecture"
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
        "name": "Technical Team Lead",
        "occupationLocation": {
          "@type": "Place",
          "name": "Remote"
        },
        "skills": "Java, Spring Boot, React, TypeScript, Microservices, B2B Integration"
      }
    };

    // Remove existing JSON-LD
    const existingJsonLd = document.querySelector('script[type="application/ld+json"]');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    // Add new JSON-LD
    const jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.textContent = JSON.stringify(structuredData);
    document.head.appendChild(jsonLdScript);

  }, [t, i18n.language]);
};

// Helper function to map i18n language codes to Open Graph locale codes
const getOpenGraphLocale = (language: string): string => {
  const localeMap: Record<string, string> = {
    'en': 'en_US',
    'es': 'es_ES',
    'et': 'et_EE',
    'ru': 'ru_RU'
  };
  return localeMap[language] || 'en_US';
};

