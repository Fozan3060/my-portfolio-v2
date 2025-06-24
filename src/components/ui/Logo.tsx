'use client';

import React from 'react';
import Image from 'next/image';
import useInView from '@/hooks/useInView';

interface LogoType {
  classname: string;
  src: string;
}

const Logo: React.FC<LogoType> = ({ classname, src }) => {
  const { ref, isInView } = useInView<HTMLDivElement>(0.2, true);

  return (
    <div
      ref={ref}
      className={`
        logo transition-all duration-700 ease-out
        ${isInView ? 'opacity-100 translate-y-0 scale-y-100' : 'opacity-0 translate-y-12 scale-y-125'}
      `}
    >
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
