import React, { ReactNode } from 'react'

interface WrapperType {
  children: ReactNode;
  sectionId?:string
  className?: string
}

const Wrapper: React.FC<WrapperType> = ({ children ,sectionId, className = ''}) => {
  return <div id={sectionId} className={`mx-5 sm:mx-14 lg:mx-20 2xl:relative ${className}`}>{children}</div>
}

export default Wrapper
