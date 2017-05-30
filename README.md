# Resume
This is a template for source controlling your resume using Travis-CI and json-resume based on matthewjberger's repo: https://github.com/matthewjberger/resume_template

On every resume.json change, it'll trigger a Travis-CI build and deploy the generated index.html and several other files like a [PDF version](https://inakiabt.github.io/resume/resume.pdf) to
https://inakiabt.github.io/resume/

# Install
```bash
npm install
```

# Generate PDF
```bash
# using theme: eddywashere
npm run generate-pdf
```

# Generate Site
```bash
# using theme: elegant
npm run generate-site
```

# PDF generation alternative
```bash
node to-pdf.js
```

## Note
Page brakes:
```html
<div style="page-break-inside: avoid">
  .....
</div>
```
