# Frontend structure & conventions

React + Vite + TypeScript app with reusable components, composition, and clear separation of concerns.

## Folder layout

```
src/
├── components/           # UI and layout
│   ├── ui/              # Primitives: Button, Input, Card, Badge, PageTitle, SearchInput
│   ├── icons/           # Reusable icons (SearchIcon, CheckIcon, XIcon)
│   ├── layout/          # Sidebar, etc.
│   ├── StatCard.tsx     # Composed from Card
│   ├── UserDirectoryTable.tsx  # Composed from Button, Badge
│   └── index.ts         # Public barrel – import from '@/components' or '../components'
├── hooks/               # useLocalStorage, etc.
│   └── index.ts
├── types/               # Shared TS types (User, NavItem, StatCardData, CurrentUser)
│   └── index.ts
├── data/                # Static / mock data per page
│   └── adminDashboard.ts
├── pages/               # AdminDashboard (only view)
├── constants/           # Theme tokens, config
│   └── theme.ts
├── test/                # Vitest setup
│   └── setup.ts
└── ...
```

## Conventions

- **Reusable components:** Small, single-purpose (Button, Input, Card, Badge). Compose them in StatCard, UserDirectoryTable, Sidebar.
- **Barrel exports:** Use `components/index.ts`, `hooks/index.ts`, `types/index.ts` so imports stay short.
- **Types:** Shared types in `types/index.ts`; use in components, hooks, and data.
- **Data vs UI:** Static/mock data lives in `data/`; pages import from there instead of inlining.
- **JSDoc:** Used on public components and non-obvious logic.
- **React.memo:** Applied to presentational components (Button, Input, Card, Badge, Sidebar, StatCard, UserDirectoryTable) to avoid unnecessary re-renders.
- **Lazy loading:** Admin Dashboard is loaded with `React.lazy` and wrapped in `Suspense` in `App.tsx`.

## Scripts

| Script        | Description                    |
|---------------|--------------------------------|
| `npm run dev` | Start dev server               |
| `npm run build` | Production build             |
| `npm run lint` | ESLint                        |
| `npm run lint:fix` | ESLint with auto-fix      |
| `npm run format` | Prettier (write) – requires `prettier` |
| `npm run format:check` | Prettier (check)        |
| `npm run test` | Vitest watch – requires `vitest`, `@testing-library/react`, `jsdom` |
| `npm run test:run` | Vitest single run          |

## Enabling Prettier & tests

After fixing any npm cache/permission issues, install dev deps:

```bash
npm install
```

Then:

- **Prettier:** Add `eslint-config-prettier` to ESLint `extends` in `eslint.config.js` to avoid style clashes.
- **Tests:** Vitest is configured in `vitest.config.ts`. Run `npm run test` or `npm run test:run`. Example: `src/components/ui/Button.test.tsx`.

## State

- **Lift state up:** Shared state lives in the smallest common parent.
- **Avoid prop drilling:** Use React Context (or a store) when many layers need the same data; for now the app uses static data from `data/`.
- **Hooks:** `useLocalStorage` in `hooks/` for simple persisted state.
