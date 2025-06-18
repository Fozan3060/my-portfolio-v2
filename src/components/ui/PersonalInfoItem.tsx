import React from 'react'

type PersonalInfoItemType = {
  label: string
  value: string
}

const PersonalInfoItem: React.FC<PersonalInfoItemType> = ({ label, value }) => {
  return (
    <div className='flex gap-3 mb-5 '>
      <div className='w-32 sm:w-36 md:w-36 2xl:w-44 xl:w-40 flex justify-between'>
        <span className='text-text1 '>{label}</span>
        <span className='text-text1 mr-4 sm:mr-8  sm:text-lg'>:</span>
      </div>
      <div>
        <span className='text-white sm:text-lg '>{value}</span>
      </div>
    </div>
  )
}

export default PersonalInfoItem
