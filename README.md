<!-- 3D SVG header + compact project README for CareerFlow -->

<p align="center">
    <svg width="820" height="220" viewBox="0 0 820 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="titleDesc">
        <title id="titleDesc">CareerFlow — Modern Learning & Career Growth Platform</title>
        <defs>
            <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stop-color="#7c3aed" />
                <stop offset="100%" stop-color="#06b6d4" />
            </linearGradient>
            <filter id="f1" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
                <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#0b1220" flood-opacity="0.14"/>
            </filter>
            <radialGradient id="shine" cx="0.2" cy="0.2" r="1">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
            </radialGradient>
        </defs>

        <!-- 3D title layers: shadow, base, highlight -->
        <g transform="translate(40,40)">
            <text x="0" y="92" font-family="Sora, Inter, system-ui, -apple-system, 'Segoe UI', Roboto" font-weight="900" font-size="84" fill="#071020" opacity="0.18" transform="skewX(-12)">CareerFlow</text>
            <text x="0" y="80" font-family="Sora, Inter, system-ui, -apple-system, 'Segoe UI', Roboto" font-weight="900" font-size="84" fill="url(#g1)" filter="url(#f1)" transform="skewX(-12)">CareerFlow</text>
            <text x="0" y="80" font-family="Sora, Inter, system-ui, -apple-system, 'Segoe UI', Roboto" font-weight="900" font-size="84" fill="url(#shine)" transform="skewX(-12) translate(6,-6)" opacity="0.22"/>
        </g>

        <!-- subtitle -->
        <g transform="translate(40,150)">
            <text x="0" y="0" font-family="Inter, system-ui, -apple-system, 'Segoe UI', Roboto" font-size="16" fill="#6b7280">Premium learning OS — recommendations, progress, and beautiful analytics</text>
        </g>
    </svg>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Short, 3D-styled README for the CareerFlow project — a polished MERN learning platform built for portfolio impact.

## Quick Links

- **Frontend:** `client/` — React app (port 3000)
- **Backend:** `server/` — Express API (port configured in `server/.env`)
- **Seed data:** `server/utils/seeder.js` (creates demo user + sample courses)

## Run (Quick)

```bash
# start backend
cd server
npm install
cp .env.example .env
# edit .env then
npm run dev

# seed (optional)
node utils/seeder.js

# start frontend
cd ../client
npm install
npm start
```

## License

This repository is licensed under the MIT License — see the `LICENSE` file for details.

Made with ❤ — contributions welcome.
