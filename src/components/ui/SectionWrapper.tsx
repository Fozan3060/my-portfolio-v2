import React from 'react'

type SectionWrapperType = {
  children: React.ReactNode
}

const SectionWrapper: React.FC<SectionWrapperType> = ({ children }) => {
  return <div className='py-28'>{children}</div>
}

export default SectionWrapper
