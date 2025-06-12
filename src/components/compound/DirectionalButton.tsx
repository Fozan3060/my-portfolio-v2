'use client';

import React, { useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import { div } from 'framer-motion/client';

const DirectionalButton = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!wrapperRef.current) return;

    const { left, top, width, height } = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const horizontal = x < width / 2 ? -1 : 1;
    const vertical = y < height / 2 ? -1 : 1;

    const offsetX = 9;
    const offsetY = 3;

    const translateX = horizontal * offsetX;
    const translateY = vertical * offsetY;

    setTransform(`translate(${translateX}px, ${translateY}px)`);
  };

  const handleMouseLeave = () => {
    setTransform('translate(0px, 0px)');
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="  transition-transform duration-500 relative z-0 directional-overlay bg-custom-orange cursor-pointer text-lg px-7 sm:px-14 rounded-xl"
      style={{ transform }}
    >
      <Button
  label="Let's Talk"
  className=" relative top-0 font-semibold text-background hover:text-background py-3 z-10 bg-transparent cursor-pointer"
/>

    </div>
  );
};

export default DirectionalButton;
