'use client';
import React, { useState } from 'react'
import Logo from '../ui/Logo'
import NavigationLinks from '../compound/NavigationLinks'
import ActionPanel from '../compound/ActionPanel'
import Wrapper from './Wrapper'
import MobileNavBar from './MobileNavBar'
const Header = () => {
  const [openMobileNavbar, setOpenMobileNavbar] = useState<boolean>(false)
  return (
    <header className=' fixed w-full z-50'>
      <Wrapper>
        <div className='flex justify-between items-center uppercase py-5'>
          <Logo classname='h-16 w-20' src='/assets/logo.png' />
          <NavigationLinks className='xl:flex hidden'/>
          <ActionPanel setOpenMobileNavbar={setOpenMobileNavbar} />
        </div>
      </Wrapper>
      <MobileNavBar open={openMobileNavbar} setOpen={setOpenMobileNavbar} />
    </header>
  )
}

export default Header
