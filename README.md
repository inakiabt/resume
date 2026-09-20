<!-- Generated: edit resume.json or README.template.md, then npm run build:site. -->

# Iñaki Abete

**Senior Software Engineer — Frontend & Platform**

Tandil, Argentina · [inaki.abete@gmail.com](mailto:inaki.abete@gmail.com)

[GitHub](https://github.com/inakiabt) · [LinkedIn](https://www.linkedin.com/in/iabete/) · [X](https://x.com/inakiabt)

[Website](https://inakiabt.github.io/resume/) · [PDF](https://inakiabt.github.io/resume/resume.pdf)

## Profile

Senior Software Engineer with 20+ years of experience building web products, embedded customer-facing systems, developer tooling, and cloud platforms. Strong focus on frontend architecture, e-commerce integrations, and platform engineering across TypeScript, React, AWS, Kubernetes, and GitOps. Experienced in technical leadership and in designing systems that span customer applications, SDKs, deployment infrastructure, and internal tooling. Experienced in AI-assisted and agentic software development, including coding agents, MCP integrations, reusable agent workflows, and local and cloud model orchestration.

## Experience

### Cavaco AI
**Senior Software Engineer — Frontend & Platform** · Dec 2023 - Present

Frontend and platform ownership for an AI-powered e-commerce marketing platform.

- Own customer-dashboard, embedded storefront-widget, and deployment-platform initiatives across the product.
- Build the architecture used to render and embed interactive widgets in customer storefronts, including integrations with Shopify, BigCommerce, and WooCommerce.
- Designed internal tooling for widget development, integration, and preview workflows.
- Designed and implemented the CI/CD and GitOps platform from scratch with GitHub Actions and Argo CD, following a Rendered Manifests Pattern.
- Work on AWS EKS infrastructure using Terraform and Crossplane, and drive architecture decisions across frontend, platform, and infrastructure.

### Sitecore
**Senior Software Engineer** · Sep 2021 - Nov 2023

Continued at Sitecore following its acquisition of Reflektion.

- Technically led a four-person team responsible for the customer-site widget platform.
- Led the migration from a legacy widget renderer to an SDK-based architecture that let customers mount widgets in their own applications and customize them with composable components.
- Drove architecture and technical decisions for the SDK, component APIs, frontend integration model, and developer tooling.

### Reflektion
**Senior Software Engineer** · Jun 2017 - Sep 2021

AI-powered search, recommendations, and personalization for e-commerce.

- Built React-based customer dashboards and customer-site widgets used by merchants to configure experiences and personalize storefronts.
- Owned frontend architecture and key technical decisions across customer-facing product development and third-party storefront integrations.
- Participated in engineering hiring and technical interviews.

### Gone
**CTO & Co-founder** · Sep 2013 - Apr 2017

Consumer marketplace for selling used electronics.

- Co-founded the company and led engineering across backend, web, mobile, infrastructure, and third-party integrations.
- Designed and evolved the platform architecture, established CI/CD and DevOps practices, and operated its AWS infrastructure.
- Participated in the Techstars 2013 accelerator program.

## Earlier experience

### DevSpark
**Technical Lead / DevOps** · 2011 - 2013

Led frontend development for an internal management platform and worked on AWS-based distributed systems and deployment infrastructure.

### Panvidea
**Software Engineer / DevOps** · 2008 - 2011

Helped design and build a distributed cloud video-processing platform on AWS, then focused on deployment automation, CI/CD, and production infrastructure.

### DSNET
**Web Developer** · 2004 - 2009

Built web applications with PHP, JavaScript, MySQL, HTML, and CSS.

## Core technologies

- **Frontend:** TypeScript, JavaScript, React, HTML, CSS
- **Platform & Infrastructure:** AWS, Kubernetes, EKS, Terraform, Crossplane, Argo CD, GitHub Actions, Docker, GitOps
- **Backend:** Node.js, REST APIs, Distributed systems
- **AI & Developer Tooling:** AI coding agents, Agentic workflows, MCP, Multi-agent systems, LLM tooling, Local & cloud model integration, Codex, Claude Code, OpenCode, OpenRouter
- **E-commerce:** Shopify, BigCommerce, WooCommerce
- **Databases:** PostgreSQL, MySQL, DynamoDB, MongoDB

**Languages:** Spanish (Native) · English (Professional working proficiency)

---

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
