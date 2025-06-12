import React, { ReactNode } from 'react'

interface WrapperType {
  children: ReactNode
}

const Wrapper: React.FC<WrapperType> = ({ children }) => {
  return <div className='px-5 sm:px-20'>{children}</div>
}

export default Wrapper
