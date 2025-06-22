import React from 'react'
import Wrapper from './Wrapper'
import MiddleBanner from '../compound/MiddleBanner'
import LeftBanner from '../compound/LeftBanner'
import RightBanner from '../compound/RightBanner'


const Herosection = () => {
  return (
    <div className='w-full pb-40 2xl:h-screen pt-52 2xl:pt-60 sm:pt-48 overflow-hidden z-0 border relative herosection'>
      <Wrapper sectionId='home'>
        <LeftBanner/>
        <MiddleBanner/>
        <RightBanner/>
      </Wrapper>
    </div>
  )
}

export default Herosection
