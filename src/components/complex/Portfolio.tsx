import React from 'react'
import Logo from '../ui/Logo'
import SectionHeading from '../ui/SectionHeading'
import SectionWrapper from '../ui/SectionWrapper'
import Wrapper from './Wrapper'
import PortfolioCard from './PortfolioCard'

const Portfolio = () => {
  return (
    <Wrapper>
      <SectionWrapper>
        <Logo src='/assets/logo2.png' classname='h-16 w-20 m-auto' />
        <SectionHeading heading='Portfolio' />
        <PortfolioCard />
      </SectionWrapper>
    </Wrapper>
  )
}

export default Portfolio
