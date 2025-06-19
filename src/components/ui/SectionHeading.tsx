import React from 'react'

type SectionHeadingType = {
    heading: string;
}

const SectionHeading:React.FC<SectionHeadingType> = ({heading}) => {
  return (
    <h2 className='text-custom-orange sm:text-xl font-[600] text-center mb-10'>{heading}</h2>
  )
}
export default SectionHeading