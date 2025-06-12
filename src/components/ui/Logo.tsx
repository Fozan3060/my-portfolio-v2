import React from 'react';
import Image from 'next/image';

interface LogoType {
  classname: string;
}

const Logo: React.FC<LogoType> = ({classname}) => {
  return (
    <div className="logo">
      <Image
        src="/assets/logo.png"
        alt="Logo"
        width={120}
        height={60}
        className={classname}
         style={{ backgroundColor: 'transparent' }}
      />
    </div>
  );
};

export default Logo;
