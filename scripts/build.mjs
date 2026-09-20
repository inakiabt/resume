import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const resume = JSON.parse(await readFile(resolve(root, 'resume.json'), 'utf8'));
const { basics, work, earlierExperience, skills, languages } = resume;
assert.ok(basics.name && basics.email && basics.summary);
for (const entry of [...work, ...earlierExperience]) {
  assert.ok(entry.company && entry.position && /^\d{4}(-\d{2})?$/.test(entry.startDate));
}
for (const profile of basics.profiles) assert.equal(new URL(profile.url).protocol, 'https:');
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);
const date = (value) => {
  if (!value) return 'Present';
  if (value.length === 4) return value;
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${value}-01T00:00:00Z`));
};
const period = (entry) => `${date(entry.startDate)} - ${date(entry.endDate)}`;
const country = new Intl.DisplayNames(['en'], { type: 'region' }).of(basics.location.countryCode);
const location = `${basics.location.city}, ${country}`;
const xIcon = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.2-8.3L.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z"/></svg>';
const profiles = basics.profiles.map((profile) => `<a href="${escape(profile.url)}" aria-label="${escape(basics.name)} on ${escape(profile.network)}">${profile.network === 'X' ? xIcon : escape(profile.network)}<span class="print-url">${escape(profile.url.replace('https://', ''))}</span></a>`).join('');
const entryHtml = (entry, compact = false) => `<article class="job${compact ? ' compact' : ''}">
  <div class="job-heading"><h3>${escape(entry.company)}</h3><span>${escape(period(entry))}</span></div>
  <p class="role">${escape(entry.position)}</p><p class="description">${escape(entry.summary)}</p>
  ${entry.highlights ? `<ul>${entry.highlights.map((text) => `<li>${escape(text)}</li>`).join('')}</ul>` : ''}
</article>`;
const styles = await readFile(resolve(root, 'styles.css'), 'utf8');
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(basics.name)} | ${escape(basics.label)}</title>
<meta name="description" content="${escape(basics.summary)}"><style>${styles}</style></head>
<body><main><header><p class="eyebrow">ENGINEERING · PRODUCT · PLATFORM</p><h1>${escape(basics.name)}</h1>
<p class="headline">${escape(basics.label)}</p><div class="contact"><span>${escape(location)}</span><a href="mailto:${escape(basics.email)}">${escape(basics.email)}</a></div>
<nav aria-label="Profiles">${profiles}<a class="download" href="resume.pdf" download>Download PDF ↓</a></nav></header>
<section><h2>Profile</h2><p>${escape(basics.summary)}</p></section>
<section><h2>Experience</h2>${work.slice(0, 2).map((entry) => entryHtml(entry)).join('')}</section>
<section class="continued" aria-label="Experience continued"><h2 class="print-only">Experience · continued</h2>${work.slice(2).map((entry) => entryHtml(entry)).join('')}</section>
<section><h2>Earlier experience</h2>${earlierExperience.map((entry) => entryHtml(entry, true)).join('')}</section>
<section><h2>Core technologies</h2><dl>${skills.map((skill) => `<div><dt>${escape(skill.name)}</dt><dd>${escape(skill.keywords.join(', '))}</dd></div>`).join('')}</dl></section>
<footer><strong>Languages</strong> ${languages.map((language) => `${escape(language.language)} (${escape(language.fluency)})`).join(' · ')}</footer>
</main></body></html>`;
const markdownEntry = (entry) => `### ${entry.company}\n**${entry.position}** · ${period(entry)}\n\n${entry.summary}\n${entry.highlights ? '\n' + entry.highlights.map((text) => `- ${text}`).join('\n') + '\n' : ''}`;
const markdown = `# ${basics.name}\n\n**${basics.label}**\n\n${location} · [${basics.email}](mailto:${basics.email})\n\n${basics.profiles.map((profile) => `[${profile.network}](${profile.url})`).join(' · ')}\n\n[Website](${basics.website}) · [PDF](${new URL('resume.pdf', basics.website)})\n\n## Profile\n\n${basics.summary}\n\n## Experience\n\n${work.map(markdownEntry).join('\n')}\n## Earlier experience\n\n${earlierExperience.map(markdownEntry).join('\n')}\n## Core technologies\n\n${skills.map((skill) => `- **${skill.name}:** ${skill.keywords.join(', ')}`).join('\n')}\n\n**Languages:** ${languages.map((language) => `${language.language} (${language.fluency})`).join(' · ')}\n`;
const instructions = await readFile(resolve(root, 'README.template.md'), 'utf8');
await mkdir(resolve(root, 'dist'), { recursive: true });
await Promise.all([
  writeFile(resolve(root, 'dist/index.html'), html),
  writeFile(resolve(root, 'dist/resume.html'), html),
  writeFile(resolve(root, 'dist/resume.json'), JSON.stringify(resume, null, 2) + '\n'),
  writeFile(resolve(root, 'dist/resume.md'), markdown),
  writeFile(resolve(root, 'README.md'), '<!-- Generated: edit resume.json or README.template.md, then npm run build:site. -->\n\n' + markdown + '\n---\n\n' + instructions),
]);
if (!process.argv.includes('--html-only')) {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ executablePath: process.env.RESUME_CHROMIUM_PATH || undefined });
  try {
    const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
    await page.goto(pathToFileURL(resolve(root, 'dist/index.html')).href);
    await page.pdf({ path: resolve(root, 'dist/resume.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
    await page.screenshot({ path: resolve(root, 'dist/resume.png'), fullPage: true });
    await page.setViewportSize({ width: 375, height: 812 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'Mobile overflow');
    assert.equal(await page.locator('a[href*="stackoverflow.com"]').count(), 0);
    assert.equal(await page.locator('a[href="https://x.com/inakiabt"] svg').count(), 1);
  } finally {
    await browser.close();
  }
}
console.log('Generated README.md and dist/ from resume.json.');
