## Maintaining this resume

`resume.json` is the only source of CV content. Edit `styles.css` for layout and
`README.template.md` for these instructions. Do not edit generated `README.md` or `dist/` manually.

### Local generation

```sh
nvm use
npm ci
npx playwright install chromium
npm run build
```

On Linux, use `npx playwright install --with-deps chromium` if browser dependencies are missing.
`npm run build:site` generates HTML, JSON, Markdown and README without a browser.
`npm run build` additionally generates `dist/resume.pdf` and `dist/resume.png`.
Open `dist/index.html` to preview. All assets are embedded; no CDN or remote fonts are required.

### Automation and publishing

- Pull requests run the full build and upload generated files as an Actions artifact, without publishing.
- Pushes to `master` and manual runs on `master` rebuild everything, commit README changes when needed,
  and publish `dist/` to GitHub Pages using the official Pages deployment actions.
- In repository **Settings → Pages → Build and deployment**, select **GitHub Actions** once.
- The workflow uses `GITHUB_TOKEN`; no personal token or Travis secrets are needed.
- README-only bot commits do not trigger a build loop. If branch protection disallows bot commits,
  run the build locally and commit the README in your PR, or explicitly configure the repository policy.
- Existing URLs remain `/resume/` and `/resume/resume.pdf`; legacy `resume.html` remains an alias.
  PNG and JSON exports remain available; YAML export is retired.

The JSON uses a small resume-oriented structure with `basics`, `work`, `earlierExperience`,
`skills` and `languages`; it is not claimed to validate against the JSON Resume schema.
