import React from 'react'
import Link from 'next/link'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About Me', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
  { label: 'Services', href: '#services' },
  { label: 'Review', href: '#review' }
]

interface NavigationLinksTypes {
  className?: string
  LinksClassName?: string
}

const NavigationLinks: React.FC<NavigationLinksTypes> = ({
  className,
  LinksClassName
}) => {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.slice(1)

      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      const targetEl = document.getElementById(targetId)
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <nav className={`gap-6 ${className}`}>
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          scroll={false}
          onClick={e => handleLinkClick(e, link.href)}
          className={`text-lg font-medium text-white hover:text-custom-orange duration-300 transition-colors ${LinksClassName}`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export default NavigationLinks
