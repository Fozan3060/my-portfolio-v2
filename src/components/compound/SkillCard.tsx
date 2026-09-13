'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import useInView from '../../hooks/useInView';

type SkillCardType = {
  src: string;
  name: string;
  value: number;
  delay: number;
};

const SkillCard: React.FC<SkillCardType> = ({ src, name, value, delay }) => {
  const { ref: cardRef, isInView: cardInView } = useInView<HTMLDivElement>(0.2, true);

  const { ref: valueRef, isInView: valueInView } = useInView<HTMLSpanElement>(0.2, false);

  const springValue = useSpring(0, { stiffness: 100, damping: 20 });
  const displayedValue = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (valueInView) {
      springValue.set(value);
    } else {
      springValue.set(0);
    }
  }, [valueInView, value, springValue]);

  return (
    <motion.div
      ref={cardRef}
      className='w-full max-w-60 sm:w-60'
      initial={{ y: 50, opacity: 0 }}
      animate={cardInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: delay, ease: 'easeOut' }}
    >
      <div className='py-8 px-4 sm:py-14 sm:px-12 text-white text-center border border-solid border-[rgba(255,255,255,0.05)] rounded-tr-[45px] rounded-bl-[45px] '>
        <div>
          <div className='h-20 w-20 sm:h-28 sm:w-28 rounded-full flex items-center bg-white m-auto'>
            <Image src={src} width={80} className='m-auto w-14 sm:w-20 h-auto' height={80} alt='SkillImg' />
          </div>
          <h3 className='text-3xl sm:text-4xl mt-5 font-bold'>
            <motion.span ref={valueRef}>{displayedValue}</motion.span>%
          </h3>
        </div>
      </div>
      <h3 className='text-center font-medium text-white text-lg sm:text-xl mt-4 sm:mt-6'>{name}</h3>
    </motion.div>
  );
};

export default SkillCard;