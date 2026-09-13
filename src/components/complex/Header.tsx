'use client';

import React, { useState, useEffect } from 'react';
import Logo from '../ui/Logo';
import NavigationLinks from '../compound/NavigationLinks';
import ActionPanel from '../compound/ActionPanel';
import Wrapper from './Wrapper';
import MobileNavBar from './MobileNavBar';

const Header = () => {
  const [openMobileNavbar, setOpenMobileNavbar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // The menu renders outside <header>: the header's backdrop blur would otherwise become the
  // containing block for the menu's fixed positioning and squeeze it into the header bar.
  return (
    <>
      <header
        className={`fixed w-full z-50 border-b transition-colors duration-300 ${
          isScrolled ? 'border-white/5 bg-background/80 backdrop-blur-md' : 'border-transparent'
        }`}
      >
        <Wrapper>
          <div className='flex justify-between items-center py-5'>
            <Logo classname='h-16 w-20' src='/assets/logo.png' />
            <NavigationLinks className='xl:flex hidden gap-7' />
            <ActionPanel setOpenMobileNavbar={setOpenMobileNavbar} />
          </div>
        </Wrapper>
      </header>
      <MobileNavBar open={openMobileNavbar} setOpen={setOpenMobileNavbar} />
    </>
  );
};

export default Header;
