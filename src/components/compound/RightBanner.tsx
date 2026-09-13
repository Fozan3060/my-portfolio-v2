'use client';

import React from 'react';
import VerticalText from './VerticalText';
import Image from 'next/image';
import SocialLinks from '../ui/SocialLinks';
import useInView from '@/hooks/useInView';

const RightBanner = () => {
  const { ref: inViewRef, isInView } = useInView<HTMLDivElement>(0.2, true);

  return (
    <VerticalText
      ref={inViewRef}
      className={`hidden min-[1440px]:flex gap-10 items-center origin-top-right tracking-wider absolute right-0 top-24 justify-center transition-transform duration-700 ease-out ${
        isInView ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'
      }`}
    >
      <h3 className='text-text1 font-medium uppercase'>Follow Me</h3>
      <Image
        src='/assets/scrolldown.png'
        alt='Scroll Down'
        width={50}
        height={219}
        className='transform absolute rotate-270 -right-40'
      />
      <div className='flex gap-4 absolute -right-96'>
        <SocialLinks />
      </div>
    </VerticalText>
  );
};

export default RightBanner;
