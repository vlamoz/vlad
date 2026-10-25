import type { TFunction } from 'i18next';
import { LANGUAGES, languagePath } from './i18n';
import { PROFILE } from './data/profile';

export const SITE_URL = 'https://vlamoz.me';

// Canonical, hreflang and the sitemap all use these
export const pageUrl = (code: string) => SITE_URL + languagePath(code);

export interface HeadTag {
  tag: 'meta' | 'link';
  selector: string; // lets useSEO find and update the tag the pre-render wrote
  attributes: Record<string, string>;
}

const meta = (key: 'name' | 'property', value: string, content: string): HeadTag =>
  ({ tag: 'meta', selector: `meta[${key}="${value}"]`, attributes: { [key]: value, content } });

const link = (selector: string, attributes: Record<string, string>): HeadTag => ({ tag: 'link', selector, attributes });

// Everything in <head> that depends on the language. Used by the build-time pre-render and by useSEO after a language switch
export const buildHead = (code: string | undefined, t: TFunction) => {
  const language = LANGUAGES.find(lang => lang.code === code) ?? LANGUAGES[0];
  const title = t('seo.title');
  const description = t('seo.description');
  const url = pageUrl(language.code);
  const image = `${SITE_URL}/og-image.jpg`;

  const tags: HeadTag[] = [
    meta('name', 'description', description),
    meta('name', 'author', PROFILE.name),
    meta('name', 'robots', 'index, follow'),
    link('link[rel="canonical"]', { rel: 'canonical', href: url }),
    ...[...LANGUAGES.map(lang => [lang.code, pageUrl(lang.code)]), ['x-default', `${SITE_URL}/`]]
      .map(([hreflang, href]) => link(`link[hreflang="${hreflang}"]`, { rel: 'alternate', hreflang, href })),

    meta('property', 'og:type', 'website'),
    meta('property', 'og:url', url),
    meta('property', 'og:site_name', 'vlamoz.me'),
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('property', 'og:image', image),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', title),
    meta('property', 'og:locale', language.ogLocale),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', description),
    meta('name', 'twitter:image', image),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.name,
    // Other spellings people search for: full first name, and the spelling LinkedIn used until 2026
    alternateName: PROFILE.alternateNames,
    jobTitle: 'Engineering Manager',
    description,
    url: `${SITE_URL}/`,
    image,
    email: `mailto:${PROFILE.email}`,
    sameAs: [PROFILE.linkedIn],
    worksFor: { '@type': 'Organization', name: 'Interprefy' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Tallinn University of Technology' },
    knowsAbout: [
      'Engineering Management',
      'Agentic Software Development',
      'AI Coding Agents',
      'Software Delivery',
      'Software Architecture',
      'Java',
      'Microservices',
    ],
  };

  return { title, tags, jsonLd };
};
