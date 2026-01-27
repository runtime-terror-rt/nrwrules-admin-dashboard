# Public assets — single source for icons and images

All pages use icons and images from here so the UI stays consistent.

## Structure

- **`icons/`** — SVG icons used across the app (nav, buttons, tables, etc.).
  - Icons use stroke `#6B7280` by default. Use the `Icon` component with `primary` for theme primary color.
  - Names match `ASSETS.icons` in `src/constants/assets.ts`.

- **`images/`** — Shared images (placeholder, logo, etc.).
  - Referenced via `ASSETS.images` in `src/constants/assets.ts`.

## Usage

- **Icons:** `<Icon name="search" size={20} primary />` (see `src/components/ui/Icon.tsx`).
- **Images:** `<img src={ASSETS.images.logo} alt="" />` or `ASSETS.images.placeholder`.
- **Colors:** Use `theme` from `src/constants/theme.ts` (design system from DESIGN_SYSTEM_REVIEW.md).
