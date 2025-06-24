import React from 'react'
import { FaCheck } from 'react-icons/fa'

type CustomChekmark = {
  description: string
}

const CustomChekmark: React.FC<CustomChekmark> = ({ description }) => {
  return (
    <div className='flex gap-4 items-center'>
      <div className='bg-custom-orange p-2 rounded-full text-white'>
        <FaCheck size={18} />
      </div>
      <span className='font-semibold text-xl text-text3'>{description}</span>
    </div>
  )
}

export default CustomChekmark
