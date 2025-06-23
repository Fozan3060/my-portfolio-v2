'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About Me', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
  { label: 'Services', href: '#services' },
  { label: 'Review', href: '#review' }
];

interface NavigationLinksTypes {
  className?: string;
  LinksClassName?: string;
}

const NavigationLinks: React.FC<NavigationLinksTypes> = ({
  className,
  LinksClassName
}) => {
  const [activeSection, setActiveSection] = useState<string | null>('home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const sectionElements: HTMLElement[] = [];
    links.forEach(link => {
      const section = document.getElementById(link.href.slice(1));
      if (section) {
        sectionElements.push(section);
      }
    });

    const observer = new IntersectionObserver((entries) => {
      let foundActive: string | null = null;

      for (const entry of entries) {
        if (entry.isIntersecting) {
          foundActive = entry.target.id;
          break;
        }
      }

      if (foundActive) {
        setActiveSection(foundActive);
      } else {
        setActiveSection(null);
      }
    }, observerOptions);

    sectionElements.forEach(section => observer.observe(section));

    const handleScroll = () => {
      if (window.scrollY < 50) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      sectionElements.forEach(section => observer.unobserve(section));
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.slice(1);

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(targetId);
      }
    }
  };

  return (
    <nav className={`gap-6 ${className}`}>
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          scroll={false}
          onClick={e => handleLinkClick(e, link.href)}
          className={`text-lg font-medium duration-300 transition-colors ${LinksClassName} ${
            activeSection === link.href.slice(1) ? 'text-custom-orange' : 'text-white'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavigationLinks;