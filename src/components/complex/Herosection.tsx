import React from 'react'
import Image from 'next/image'
import Wrapper from './Wrapper'
import { BiDialpad } from 'react-icons/bi'
import MiddleBanner from '../compound/MiddleBanner'
import LeftBanner from '../compound/LeftBanner'
import RightBanner from '../compound/RightBanner'

type Props = {}

const Herosection = (props: Props) => {
  return (
    <div className='w-full pb-40 sm:h-screen pt-52 2xl:pt-60 sm:pt-48 overflow-hidden z-0 border border-amber-300 relative herosection'>
      <Wrapper>
        <LeftBanner/>
        <MiddleBanner/>
        <RightBanner/>
      </Wrapper>
    </div>
  )
}

export default Herosection
