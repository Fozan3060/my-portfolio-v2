'use client';

import React from 'react';
import useInView from '@/hooks/useInView';

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
      <div className='flex gap-3 mb-5'>
        <div className='w-32 sm:w-36 md:w-36 2xl:w-44 xl:w-40 flex justify-between'>
          <span className='text-text1'>{label}</span>
          <span className='text-text1 mr-4 sm:mr-8 sm:text-lg'>:</span>
        </div>
        <div>
          <span className='text-white sm:text-lg'>{value}</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoItem;
