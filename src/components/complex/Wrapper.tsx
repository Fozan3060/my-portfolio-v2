import React, { ReactNode } from 'react'

interface WrapperType {
  children: ReactNode
}

const Wrapper: React.FC<WrapperType> = ({ children }) => {
  return <div className='mx-5 sm:mx-14 lg:mx-20 2xl:relative'>{children}</div>
}

export default Wrapper
