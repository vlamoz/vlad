// Runs after the client and SSR builds (npm run build). Writes each language's page with its content
// and <head> already rendered (dist/index.html for English, dist/<lng>/index.html for the others),
// so crawlers that don't run JavaScript see the content. Also writes dist/sitemap.xml.
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const { render, LANGUAGES, languagePath, pageUrl } = await import('../dist-ssr/entry-server.js');

const template = await readFile('dist/index.html', 'utf8');
const codes = LANGUAGES.map(language => language.code);

// Before the first paint: if the visitor's language (same order as i18n.ts: ?lang=, this page's path,
// saved choice, browser) isn't this page's, hide the page until the app has rendered it in the right language
const languageCheck = (code) => `<script>
      (function () {
        var supported = ${JSON.stringify(codes)};
        var candidates = [new URLSearchParams(location.search).get('lang'), location.pathname.split('/')[1]];
        try { candidates.push(localStorage.getItem('preferredLanguage')); } catch (e) {}
        candidates = candidates.concat(navigator.languages || [navigator.language]);
        for (var i = 0; i < candidates.length; i++) {
          var base = candidates[i] && candidates[i].split('-')[0];
          if (supported.indexOf(base) >= 0) {
            if (base !== '${code}') document.documentElement.classList.add('lang-pending');
            return;
          }
        }
      })();
    </script>
    <style>.lang-pending #root { visibility: hidden; }</style>`;

for (const code of codes) {
  const { head, html } = await render(code);
  const page = template
    .replace('<html lang="en">', `<html lang="${code}">`)
    .replace('<!--app-head-->', `${head}\n    ${languageCheck(code)}`)
    .replace('<!--app-html-->', html);
  const directory = `dist${languagePath(code)}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}index.html`, page);
}

const today = new Date().toISOString().slice(0, 10);
const alternates = [...codes.map(code => [code, pageUrl(code)]), ['x-default', pageUrl('en')]]
  .map(([hreflang, href]) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`)
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${codes.map(code => `  <url>
    <loc>${pageUrl(code)}</loc>
    <lastmod>${today}</lastmod>
${alternates}
  </url>`).join('\n')}
</urlset>
`;
await writeFile('dist/sitemap.xml', sitemap);

console.log(`Pre-rendered ${codes.map(code => languagePath(code)).join(', ')} and sitemap.xml`);
