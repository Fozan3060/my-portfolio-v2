import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LuX } from 'react-icons/lu'
import Button from '../ui/Button'
import Logo from '../ui/Logo'
import NavigationLinks from '../compound/NavigationLinks'
import DirectionalButton from '../compound/DirectionalButton'
import SocialLinks from '../ui/SocialLinks'
import { scrollToContact } from '../compound/ActionPanel'

interface MobileNavBarProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ open, setOpen }) => {
  const close = () => setOpen(false)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key='overlay'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className='fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm'
            onClick={close}
          />
          <motion.aside
            key='sidebar'
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className='fixed left-0 top-0 z-[70] flex h-full w-[85%] max-w-xs flex-col border-r border-white/5 bg-background2'
          >
            <div className='flex items-center justify-between px-6 pt-6'>
              <Logo classname='h-14 w-16' src='/assets/logo.png' />
              <Button
                ariaLabel='Close menu'
                icon={<LuX size={22} />}
                className='flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-white/10 text-white transition-colors duration-300 hover:border-custom-orange/40 hover:text-custom-orange'
                onClick={close}
              />
            </div>

            <div className='flex-1 overflow-y-auto px-6 py-8'>
              <NavigationLinks
                className='flex flex-col gap-0'
                LinksClassName='border-b border-white/5 py-3.5 text-lg'
                onNavigate={close}
              />
            </div>

            <div className='space-y-5 border-t border-white/5 px-6 py-6'>
              <DirectionalButton
                label="Let's Talk"
                className='w-full'
                onClick={() => {
                  close()
                  scrollToContact()
                }}
              />
              <div className='flex gap-3'>
                <SocialLinks />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileNavBar
