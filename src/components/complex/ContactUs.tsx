import React from 'react'
import Wrapper from './Wrapper'
import SectionWrapper from '../ui/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import Logo from '../ui/Logo'
import FormEmail from '../compound/FormEmail'
import FormBanner from '../compound/FormBanner'

const ContactUs = () => {
  return (
    <Wrapper sectionId='contact'>
      <SectionWrapper>
        <Logo src='/assets/Logo2.png' classname='h-16 w-20 m-auto' />
        <SectionHeading heading='Contact Us' />
        <div className='flex lg:flex-row flex-col justify-center gap-14 xl:gap-28 overflow-hidden'>
          <FormBanner />
          <FormEmail />
        </div>
      </SectionWrapper>
    </Wrapper>
  )
}

export default ContactUs
