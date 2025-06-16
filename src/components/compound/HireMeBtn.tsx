'use client';

import React from 'react'
import Button from '../ui/Button'
import { FaGreaterThan } from "react-icons/fa6";

type Props = {}

const HireMeBtn = (props: Props) => {
  const [hover, setHover] = React.useState<Boolean>(false)
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={()=>setHover(false)} className='cursor-pointer h-14'>
      <div
        className={`absolute  h-14 border hover:w-44 duration-300 rounded-xl bg-white  ${
          hover ? 'w-44' : 'w-10'
        }`}
      ></div>
      <Button className=' w-44 justify-center h-14 capitalize font-semibold flex gap-2 items-center'>
        <span className={` duration-300 ${hover ? '-translate-x-2' : '-translate-x-4'}`}>
          <FaGreaterThan size={22} />
        </span>
        <span className={`mr-5  ${hover? "text-black" : "text-white"} text-lg z-10 duration-500`}>Hire Me</span>
      </Button>
    </div>
  )
}

export default HireMeBtn
