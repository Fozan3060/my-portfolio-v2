import React from 'react'
import Link from 'next/link'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About Me', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
  { label: 'Services', href: '/services' },
  { label: 'Review', href: '/Review' }
]
interface NavigationLinksTypes {
  className?: string
  LinksClassName?: string
}
const NavigationLinks: React.FC<NavigationLinksTypes> = ({
  className,
  LinksClassName
}) => {
  return (
    <nav className={`gap-6 ${className}`}>
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-lg font-medium text-white hover:text-custom-orange duration-300 transition-colors ${LinksClassName}`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export default NavigationLinks
