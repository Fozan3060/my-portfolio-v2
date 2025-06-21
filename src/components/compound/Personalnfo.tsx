import React from 'react'
import Image from 'next/image'
import SectionWrapper from '../ui/SectionWrapper'
import PersonalInfoItem from '../ui/PersonalInfoItem'
import Wrapper from '../complex/Wrapper'

const Personalnfo = () => {
  return (
    <Wrapper>
      <SectionWrapper>
        <div className='pt-14 px-5 sm:p-14 xl:py-20 xl:px-32 bg-background2  md:2xl lg:w-full  max-w-7xl m-auto rounded-2xl'>
          <div className='grid lg:grid-cols-2 grid-cols-1 gap-5'>
            <div className='hidden lg:block'>
              <Image
                src='/assets/about.png'
                width={1000}
                height={1000}
                className='w-96 '
                alt={'About Image'}
              />
            </div>
            <div>
              <h2 className='text-4xl font-bold text-white mb-5'>
                Personal Info
              </h2>
              <p className='text-text1 mb-10'>
                I&apos;m a Full-Stack JavaScript developer with 3+ years of
                experience building fast, scalable web applications using React,
                Next.js, Node.js, and AWS. I focus on delivering smooth user
                experiences, clean code, and efficient CI/CD workflows.
              </p>
              <PersonalInfoItem label='Name' value='Fozan Javaid' />
              <PersonalInfoItem label='Nationality' value='Pakistan, Karachi' />
              <PersonalInfoItem label='Phone' value='+923322440974' />
              <PersonalInfoItem
                label='Email'
                value='Fozanjavaid111@gmail.com'
              />
              <PersonalInfoItem label='Freelance' value='Available' />
              <PersonalInfoItem label='Language' value='Urdu, English' />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </Wrapper>
  )
}

export default Personalnfo
