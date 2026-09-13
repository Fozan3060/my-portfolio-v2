import React from 'react'
import Button from '../ui/Button'
import { AiOutlineMenu } from 'react-icons/ai'

interface MobileNavbarBtnProps {
  setOpenMobileNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNavbarBtn: React.FC<MobileNavbarBtnProps> = ({ setOpenMobileNavbar }) => {
  return (
    <Button
      icon={<AiOutlineMenu fontSize={26} />}
      ariaLabel='Open menu'
      className='xl:hidden flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors duration-300 hover:border-custom-orange/40 hover:text-custom-orange cursor-pointer'
      onClick={() => setOpenMobileNavbar(true)}
    />
  )
}

export default MobileNavbarBtn