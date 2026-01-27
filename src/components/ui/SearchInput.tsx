import { memo, type InputHTMLAttributes } from 'react'
import { Icon } from './Icon'
import { Input } from './Input'

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Optional error state */
  error?: boolean
}

/**
 * Search field with leading magnifier icon from /assets/icons.
 */
function SearchInputComponent({ className = '', ...props }: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <span
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        aria-hidden
      >
        <Icon name="search" size={18} />
      </span>
      <Input type="search" className="pl-10" {...props} />
    </div>
  )
}

export const SearchInput = memo(SearchInputComponent)
