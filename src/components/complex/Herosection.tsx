import React from 'react'
import Wrapper from './Wrapper'
import MiddleBanner from '../compound/MiddleBanner'
import LeftBanner from '../compound/LeftBanner'
import RightBanner from '../compound/RightBanner'


const Herosection = () => {
  return (
    <div className='herosection relative z-0 w-full overflow-hidden pt-52 pb-40 sm:pt-48 2xl:flex 2xl:min-h-screen 2xl:flex-col 2xl:justify-center 2xl:pt-32 2xl:pb-16'>
      <Wrapper sectionId='home' className='min-[1440px]:relative'>
        <LeftBanner/>
        <MiddleBanner/>
        <RightBanner/>
      </Wrapper>
    </div>
  )
}

export default Herosection
