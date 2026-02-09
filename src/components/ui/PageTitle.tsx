import { memo, type HTMLAttributes } from 'react'

export interface PageTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level (1 = h1, 2 = h2) */
  as?: 1 | 2
  children: string
}

/** Figma node 3508-14207: headers use Secondary Color/Normal blue #229ECF */
const style = 'font-bold font-[Comfortaa]'
const colorStyle = { 
  color: 'var(--Secondary-Color-Normal, #229ECF)',
  fontSize: '32px',
  fontWeight: '600',
  lineHeight: '125%',
  letterSpacing: '-1px'
}

/**
 * Page or section title — Figma secondary blue for headings.
 */
function PageTitleComponent({ as = 1, children, className = '', ...props }: PageTitleProps) {
  const Tag = as === 1 ? 'h1' : 'h2'
  const sizeClass = as === 1 ? 'text-2xl mb-3' : 'text-xl mb-4'
  return (
    <Tag className={` ${style} ${sizeClass} ${className}`} style={colorStyle} {...props}>
      {children}
    </Tag>
  )
}

export const PageTitle = memo(PageTitleComponent)
