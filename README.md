# NRW Rules — Web App

Admin dashboard and CMS for NRW Rules. Built with React, Vite, TypeScript, Tailwind CSS, and React Router.

---

## Tech stack

| Layer        | Technology |
|-------------|------------|
| **Runtime** | React 19, React DOM 19 |
| **Routing** | React Router DOM 7 |
| **Build**   | Vite 7 |
| **Language**| TypeScript ~5.9 |
| **Styling** | Tailwind CSS 4 (`@tailwindcss/vite`) |
| **Testing** | Vitest, Testing Library, jsdom |
| **Lint/Format** | ESLint 9, Prettier |

---

## Packages

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.2.0 | UI library |
| `react-dom` | ^19.2.0 | React DOM renderer |
| `react-router-dom` | ^7.13.0 | Client-side routing |

### Dev dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^7.2.4 | Build tool & dev server |
| `@vitejs/plugin-react` | ^5.1.1 | React fast refresh for Vite |
| `typescript` | ~5.9.3 | Type checking |
| `tailwindcss` | ^4.1.18 | Utility-first CSS |
| `@tailwindcss/vite` | ^4.1.18 | Tailwind integration for Vite |
| `vitest` | ^2.1.6 | Unit & component tests |
| `@testing-library/react` | ^16.1.0 | React testing utilities |
| `@testing-library/jest-dom` | ^6.6.3 | DOM matchers for tests |
| `jsdom` | ^25.0.1 | DOM environment for tests |
| `eslint` | ^9.39.1 | Linting |
| `@eslint/js` | ^9.39.1 | ESLint JS config |
| `eslint-config-prettier` | ^9.1.0 | Disable ESLint rules that conflict with Prettier |
| `eslint-plugin-react-hooks` | ^7.0.1 | React Hooks rules |
| `eslint-plugin-react-refresh` | ^0.4.24 | React Refresh rules |
| `typescript-eslint` | ^8.46.4 | TypeScript ESLint rules |
| `prettier` | ^3.4.2 | Code formatting |
| `globals` | ^16.5.0 | Global variables for ESLint |
| `@types/node` | ^24.10.1 | Node.js type definitions |
| `@types/react` | ^19.2.5 | React type definitions |
| `@types/react-dom` | ^19.2.3 | React DOM type definitions |

---

## Routes

All dashboard routes use **`DashboardLayout`** (sidebar + `<Outlet />`). Page components are **lazy-loaded** via `React.lazy` and wrapped in `<Suspense>` with a “Loading…” fallback.

Routes are defined in **`src/routes.tsx`**. Nav items and labels come from **`src/data/nav.ts`**.

| Path | Component | Description |
|------|-----------|-------------|
| `/` | — | Redirects to `/user-management` |
| `/user-management` | `UserManagement` | User directory & management |
| `/community` | `Community` | Community content |
| `/reported-content` | `ReportedContent` | Reported content moderation |
| `/announcements` | `Announcements` | Announcements |
| `/analytics` | `Analytics` | Analytics dashboard |
| `/ai-rules` | `AIRules` | AI rules configuration |
| `/cms/web-settings` | `WebSettings` | CMS web settings |
| `/cms/services` | `CmsServices` | CMS services |
| `/cms/support` | `CmsSupport` | CMS support |
| `/cms/team` | `CmsTeam` | CMS team |
| `/cms/testimonials` | `CmsTestimonials` | CMS testimonials |
| `/cms/articles` | `CmsArticles` | CMS articles |
| `/cms/our-mission` | `CmsOurMission` | CMS our mission |
| `/cms/our-journey` | `CmsOurJourney` | CMS our journey |
| `/cms/about-us` | `CmsAboutUs` | CMS about us |
| `/cms/hero` | `CmsHero` | CMS hero section |
| `/cms/page` | `CmsPage` | Generic CMS page |
| `/subscription` | `Subscription` | Subscription & payment |
| `*` (catch‑all) | `NotFound` | 404 page |

---

## Project structure

```
apps/web/
├── public/
│   └── assets/
│       ├── icons/          # SVG icons (bell, chart, users, etc.)
│       └── images/         # logo.svg, placeholder.svg
├── src/
│   ├── components/         # Reusable UI & layout
│   │   ├── layout/        # Sidebar, etc.
│   │   └── ui/            # Button, Card, Icon, Input, Badge, etc.
│   ├── constants/         # theme.ts, assets.ts
│   ├── data/              # nav.ts, mock data (analytics, announcements, etc.)
│   ├── hooks/             # useLocalStorage, etc.
│   ├── layouts/           # DashboardLayout
│   ├── pages/             # Route-level components
│   │   └── cms/           # CMS pages (Services, Team, Hero, etc.)
│   ├── routes.tsx         # Router + lazy routes
│   ├── types/             # Shared TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css          # Tailwind + theme variables
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── vitest.config.ts
└── eslint.config.js
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript build + Vite production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting with Prettier |
| `npm run test` | Run Vitest (watch) |
| `npm run test:run` | Run Vitest once |

---

## Getting started

```bash
cd apps/web
npm install
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:5173`). The app redirects `/` to `/user-management`.

---

## Design & assets

- **Theme:** Design tokens and CSS variables in `src/constants/theme.ts` and `src/index.css`.
- **Icons:** SVGs in `public/assets/icons/`; used via `src/components/ui/Icon.tsx` and `src/constants/assets.ts`.
- **Design system:** See repository `DESIGN_SYSTEM_REVIEW.md` and `DESIGN_SYSTEM_AND_CODE_ANALYSIS_REPORT.md` for alignment with the Figma design (nrwrules / Shopify_Manir).
