import React from 'react'

type VerticalTextTypes = {
    children: React.ReactNode;
    className?: string;
}

const VerticalText:React.FC<VerticalTextTypes> = ({children,className}) => {
  return (
    
     <div className={`transform  h-fit rotate-90 w-fit  ${className}`}>
        {children}
      </div>
  )
}

export default VerticalText