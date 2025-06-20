import React from 'react'
import Wrapper from './Wrapper'
import SectionWrapper from '../ui/SectionWrapper'
import Logo from '../ui/Logo'
import SectionHeading from '../ui/SectionHeading'
import ReviewsSlider from '../compound/ReviewsSlider'

const Reviews = () => {
  return (
    <div className='bg-background2'>
      <Wrapper>
        <SectionWrapper>
          <Logo src='/assets/logo2.png' classname='h-16 w-20 m-auto' />
          <SectionHeading heading='Reviews' />
          <div>
            <h2 className='text-center text-6xl text-white font-bold mb-5'>Clients Feedback</h2>
          </div>
          <ReviewsSlider />
        </SectionWrapper>
      </Wrapper>
    </div>
  )
}

export default Reviews
