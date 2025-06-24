import React, { ReactNode } from 'react'

interface WrapperType {
  children: ReactNode;
  sectionId?:string
}

const Wrapper: React.FC<WrapperType> = ({ children ,sectionId}) => {
  return <div id={sectionId} className='mx-5 sm:mx-14 lg:mx-20 2xl:relative'>{children}</div>
}

export default Wrapper
