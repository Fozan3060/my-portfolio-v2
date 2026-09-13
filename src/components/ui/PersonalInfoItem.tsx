'use client';

import React from 'react';
import useInView from '@/hooks/useInView';

// Lets a long email wrap after the "@" on narrow phones instead of mid-word.
export const withEmailBreak = (text: string) => {
  const at = text.indexOf('@');
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at + 1)}
      <wbr />
      {text.slice(at + 1)}
    </>
  );
};

type PersonalInfoItemType = {
  label: string;
  value: string;
  delay?: number;
};

const PersonalInfoItem: React.FC<PersonalInfoItemType> = ({ label, value, delay = 0 }) => {
  const { ref, isInView } = useInView<HTMLDivElement>(0.2, true);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${delay ? `delay-[${delay}ms]` : ''} ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className='flex gap-3 mb-5 text-sm min-[360px]:text-base'>
        <div className='w-24 shrink-0 min-[360px]:w-32 sm:w-36 md:w-36 2xl:w-44 xl:w-40 flex justify-between'>
          <span className='text-text1'>{label}</span>
          <span className='text-text1 mr-2 min-[360px]:mr-4 sm:mr-8 sm:text-lg'>:</span>
        </div>
        <div className='min-w-0'>
          <span className='text-white sm:text-lg break-words'>{withEmailBreak(value)}</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoItem;
