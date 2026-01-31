'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import useInView from '@/hooks/useInView';

const BannerImage = () => {
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
    setTransform({ x, y });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
  };

  const { ref: inViewRef, isInView } = useInView<HTMLImageElement>(0.2, true);

  const baseTranslateY = isInView ? 0 : 64;

  return (
    <div
      className='hidden md:block overflow-visible'
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        ref={inViewRef}
        src='/assets/BannerImg.png'
        alt='Banner Image'
        width={550}
        height={550}
        className='transition-transform duration-700 ease-out'
        style={{
          transform: `translate(${transform.x}px, ${transform.y + baseTranslateY}px)`
        }}
      />
    </div>
  );
};

export default BannerImage;
