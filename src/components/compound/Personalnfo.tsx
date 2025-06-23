'use client';

import React from 'react';
import Image from 'next/image';
import SectionWrapper from '../ui/SectionWrapper';
import PersonalInfoItem from '../ui/PersonalInfoItem';
import Wrapper from '../complex/Wrapper';
import useInView from '@/hooks/useInView';

const Personalnfo = () => {
  const { ref: imageRef, isInView: imageInView } = useInView<HTMLDivElement>(0.2, true);
  const { ref: textRef, isInView: textInView } = useInView<HTMLDivElement>(0.2, true);

  const personalInfo = [
    { label: 'Name', value: 'Fozan Javaid' },
    { label: 'Nationality', value: 'Pakistan, Karachi' },
    { label: 'Phone', value: '+923322440974' },
    { label: 'Email', value: 'Fozanjavaid111@gmail.com' },
    { label: 'Freelance', value: 'Available' },
    { label: 'Language', value: 'Urdu, English' }
  ];

  return (
    <Wrapper>
      <SectionWrapper>
        <div className='pt-14 px-5 sm:p-14 xl:py-20 xl:px-32 bg-background2 max-w-7xl m-auto rounded-2xl'>
          <div className='grid lg:grid-cols-2 grid-cols-1 gap-5'>
            <div
              ref={imageRef}
              className={`hidden lg:block transition-all duration-700 ease-out ${
                imageInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <Image
                src='/assets/about.png'
                width={1000}
                height={1000}
                className='w-96'
                alt='About Image'
              />
            </div>

            <div
              ref={textRef}
              className={`transition-all duration-700 ease-out ${
                textInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <h2 className='text-4xl font-bold text-white mb-5'>Personal Info</h2>
              <p className='text-text1 mb-10'>
                I&apos;m a Full-Stack JavaScript developer with 3+ years of experience building fast,
                scalable web applications using React, Next.js, Node.js, and AWS. I focus on delivering
                smooth user experiences, clean code, and efficient CI/CD workflows.
              </p>

              {personalInfo.map((item, index) => (
                <PersonalInfoItem
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </Wrapper>
  );
};

export default Personalnfo;
