import React from 'react'
import Button from '../ui/Button'
import { AiOutlineMenu } from 'react-icons/ai'

interface MobileNavbarBtnProps {
  setOpenMobileNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNavbarBtn: React.FC<MobileNavbarBtnProps> = ({ setOpenMobileNavbar }) => {
  return (
    <Button
      icon={<AiOutlineMenu fontSize={30} />}
      className='py-3 px-3 rounded-lg bg-white transition-colors duration-500 hover:bg-custom-orange  hover:text-background cursor-pointer'
      onClick={() => setOpenMobileNavbar(true)}
    />
  )
}

export default MobileNavbarBtn