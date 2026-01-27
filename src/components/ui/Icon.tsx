import { memo } from 'react'
import { ASSETS, type IconName } from '../../constants'

export interface IconProps {
  /** Icon name from /public/assets/icons */
  name: IconName
  size?: number
  className?: string
  /** Use primary color tint (adds filter when used as img) */
  primary?: boolean
}

/**
 * Renders an icon from /public/assets/icons. All pages use this for consistent icons.
 * Use primary=true for nav/primary-colored icons (applies theme tint via .icon-primary).
 */
function IconComponent({ name, size = 24, className = '', primary }: IconProps) {
  const src = ASSETS.icons[name]
  if (!src) return null
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 ${primary ? 'icon-primary' : ''} ${className}`}
      loading="lazy"
    />
  )
}

export const Icon = memo(IconComponent)
