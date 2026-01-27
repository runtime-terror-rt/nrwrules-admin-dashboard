/**
 * Design tokens from Figma MCP node 3508-14207 (get_variable_defs).
 * Headings use "Main brand, buttons, headings" = #E91E63. Text/backgrounds from variables.
 */
export const theme = {
  font: {
    /** Body and UI — Figma uses Comfortaa for H3/H5/H6, DM Sans for Button */
    sans: 'Inter, ui-sans-serif, system-ui, sans-serif',
  },
  color: {
    /** Site/page background */
    pageBackground: '#FFF9FB',
    /** Sidebar panel — white */
    sidebar: '#FFFFFF',
    /** Backgrounds, highlights — Figma variable #F8BBD0 */
    activeNav: '#F8BBD0',
    /** Main brand, buttons, headings — Figma variable #E91E63 */
    primary: '#E91E63',
    /** Secondary Color/Normal — Figma variable #229ECF (blue) */
    secondary: '#229ECF',
    /** Main content, cards */
    surface: '#FFFFFF',
    /** Text Color 1 — Figma variable #333333 */
    textPrimary: '#333333',
    /** Text Color 2 — Figma variable #666666 */
    textSecondary: '#666666',
    /** Backgrounds, borders — Figma variable #F5F5F5 */
    border: '#F5F5F5',
    tableHeader: '#F8BBD0',
    success: '#22C55E',
    error: '#DC2626',
    /** Warnings, medical notices — Figma variable #FF9800 */
    warning: '#FF9800',
    accent: '#E91E63',
  },
  radius: {
    card: '0.5rem',
    pill: '9999px',
    input: '0.5rem',
  },
  shadow: {
    card: '0 1px 3px rgba(0, 0, 0, 0.08)',
  },
} as const
