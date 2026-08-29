# Tejas Vermani — Portfolio

A personal portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Subpath deployment

The live site is published at `https://tejasvermani.com/portfolio`. Configure the
build with:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio
NEXT_PUBLIC_SITE_URL=https://tejasvermani.com/portfolio
```

Public assets and metadata URLs are resolved through the configured base path.

`vercel.json` redirects `/` to `/portfolio` so `https://tejasvermani.com` reaches
the site without removing the existing `/portfolio` URL.
