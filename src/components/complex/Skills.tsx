'use client';

import React from 'react';
import Wrapper from './Wrapper';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeading from '../ui/SectionHeading';
import Logo from '../ui/Logo';
import SkillCard from '../compound/SkillCard';
import { SkillsData } from '../../../Data';
import useInView from '../../hooks/useInView';

const Skills = () => {
  return (
    <div className='bg-background2'>
      <Wrapper>
        <SectionWrapper>
          <Logo src='/assets/Logo2.png' classname='h-16 w-20 m-auto' />
          <SectionHeading heading='Skills' />
          <div className='flex justify-center'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-36 gap-y-12'>
              {SkillsData.map((item, index) => {
                const itemsPerRow = 4;
                const rowIndex = Math.floor(index / itemsPerRow);
                const colIndex = index % itemsPerRow;

                const rowDelay = rowIndex * 0.3;
                const colDelay = colIndex * 0.1;
                const totalDelay = rowDelay + colDelay;

                return (
                  <SkillCard
                    key={index}
                    src={item.src}
                    name={item.name}
                    value={item.value}
                    delay={totalDelay}
                  />
                );
              })}
            </div>
          </div>
        </SectionWrapper>
      </Wrapper>
    </div>
  );
};

export default Skills;