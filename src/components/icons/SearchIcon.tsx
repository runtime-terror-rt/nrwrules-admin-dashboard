import { memo } from 'react'

interface SearchIconProps {
  size?: number
  className?: string
}

function SearchIconComponent({ size = 18, className = '' }: SearchIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

export const SearchIcon = memo(SearchIconComponent)
