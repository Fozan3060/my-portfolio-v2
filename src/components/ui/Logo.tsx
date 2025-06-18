import React from 'react';
import Image from 'next/image';

interface LogoType {
  classname: string;
  src: string;
}
// /assets/logo.png
const Logo: React.FC<LogoType> = ({classname,src}) => {
  return (
    <div className="logo">
      <Image
        src={src}
        alt="Logo"
        width={120}
        height={60}
        className={classname}
         
      />
    </div>
  );
};

export default Logo;
