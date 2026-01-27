/**
 * Asset paths for /public/assets — single source for icons and images.
 * All pages use these so icons and images stay consistent.
 */
const BASE = '/assets'

export const ASSETS = {
  icons: {
    search: `${BASE}/icons/search.svg`,
    users: `${BASE}/icons/users.svg`,
    chat: `${BASE}/icons/chat.svg`,
    warning: `${BASE}/icons/warning.svg`,
    megaphone: `${BASE}/icons/megaphone.svg`,
    bell: `${BASE}/icons/bell.svg`,
    chart: `${BASE}/icons/chart.svg`,
    brain: `${BASE}/icons/brain.svg`,
    folder: `${BASE}/icons/folder.svg`,
    credit: `${BASE}/icons/credit.svg`,
    'chevron-down': `${BASE}/icons/chevron-down.svg`,
    'chevron-right': `${BASE}/icons/chevron-right.svg`,
    plus: `${BASE}/icons/plus.svg`,
    'external-link': `${BASE}/icons/external-link.svg`,
    trash: `${BASE}/icons/trash.svg`,
    edit: `${BASE}/icons/edit.svg`,
    check: `${BASE}/icons/check.svg`,
    x: `${BASE}/icons/x.svg`,
    heart: `${BASE}/icons/heart.svg`,
    message: `${BASE}/icons/message.svg`,
    clock: `${BASE}/icons/clock.svg`,
    filter: `${BASE}/icons/filter.svg`,
    upload: `${BASE}/icons/upload.svg`,
    'subscription-box': `${BASE}/icons/subscription-box.svg`,
    shield: `${BASE}/icons/shield.svg`,
    gear: `${BASE}/icons/gear.svg`,
    'speech-bubble': `${BASE}/icons/speech-bubble.svg`,
  },
  images: {
    placeholder: `${BASE}/images/placeholder.svg`,
    logo: `${BASE}/images/logo.svg`,
  },
} as const

export type IconName = keyof typeof ASSETS.icons
