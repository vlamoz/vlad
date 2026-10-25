/* eslint-disable react-refresh/only-export-components -- build-time entry, never hot-reloaded */
// Build-time pre-render entry (scripts/prerender.mjs): renders the page and its <head> for one language
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import i18n, { LANGUAGES, changeLanguage, i18nReady, languagePath } from './i18n';
import { buildHead, pageUrl } from './seo';
import App from './App';

export { LANGUAGES, languagePath, pageUrl };

const escapeAttribute = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const render = async (code: string) => {
  await i18nReady;
  await changeLanguage(code);

  const { title, tags, jsonLd } = buildHead(code, i18n.getFixedT(code, 'common'));
  const head = [
    `<title>${escapeAttribute(title)}</title>`,
    ...tags.map(({ tag, attributes }) =>
      `<${tag} ${Object.entries(attributes).map(([key, value]) => `${key}="${escapeAttribute(value)}"`).join(' ')}>`),
    // \u003c keeps a "</script>" inside the data from closing the tag
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');

  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  return { head, html };
};
