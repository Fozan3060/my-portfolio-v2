import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../ui/Button'
import Logo from '../ui/Logo'
import NavigationLinks from '../compound/NavigationLinks'

interface MobileNavBarProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const overlayVariants = {
  hidden: { opacity: 0, x: '-100%' },
  visible: { opacity: 0.5, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: '-100%', transition: { duration: 0.2 } }
} as const

const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 130,
      damping: 20,
      mass: 0.9,
      velocity: 1.5
    }
  },
  exit: {
    x: '-100%',
    transition: {
      type: 'spring' as const,
      stiffness: 130,
      damping: 20,
      mass: 0.9
    }
  }
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ open, setOpen }) => {
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    if (!open) setShowSidebar(false)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key='overlay'
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={overlayVariants}
            className='fixed inset-0 z-30 pointer-events-auto bg-black bg-opacity-20'
            onClick={() => setOpen(false)}
            onAnimationComplete={() => setShowSidebar(true)}
          />
          {showSidebar && (
            <motion.div
              key='sidebar'
              initial='hidden'
              animate='visible'
              exit='exit'
              variants={sidebarVariants}
              className='fixed top-0 left-0 h-full w-80 bg-background3 z-50 shadow-lg'
            >
              <div className='flex justify-between items-center px-4 pt-6'>
                <Logo classname='h-16 w-20' src='/assets/logo.png' />
                <Button
                  className='cursor-pointer text-3xl  text-white'
                  onClick={() => setOpen(false)}
                >
                  &times;
                </Button>
              </div>
              <div className='p-8'>
                <NavigationLinks
                  className='flex flex-col capitalize'
                  LinksClassName='border-b-1 border-border pb-2'
                  onNavigate={() => setOpen(false)}
                />
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileNavBar
