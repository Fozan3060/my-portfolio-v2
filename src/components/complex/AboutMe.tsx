import React from 'react'
import Logo from '../ui/Logo'
import SectionHeading from '../ui/SectionHeading'
import SectionWrapper from '../ui/SectionWrapper'
import Wrapper from './Wrapper'
import CustomCheckmark from '../ui/CustomChekmark'
import StatItem from '../compound/StatItem'



const AboutMe = () => {
  return (
    <Wrapper>
      <SectionWrapper>
        <Logo src="/assets/Logo2.png" classname="h-16 w-20 m-auto" />
        <SectionHeading heading="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div>
            <h2 className="bg-gradient-to-r from-[var(--color-custom-orange)] to-white bg-clip-text text-transparent text-[26px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
              Crafting Web Applications with Passion and Precision
            </h2>
            <p className="mt-6 text-lg text-text2">
              With 3+ years in Full-Stack JavaScript development, I build scalable, high-performance web apps for clients. Skilled in React,
              Next.js, Node.js, AWS, GraphQL, and REST API. I focus on seamless user experiences, performance optimization, SEO, and CI/CD automation.
            </p>
            <div className="mt-10 flex flex-col gap-5">
              {['Front-end Development', 'Back-end Development', 'Full Stack Development'].map((desc) => (
                <CustomCheckmark key={desc} description={desc} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2  mt-12 md:mt-0 gap-16 items-center lg:mx-auto transition-all duration-700 ease-in-out">
            <StatItem src="/assets/customer.webp" value="50+" label="Satisfied Customers" />
            <StatItem src="/assets/experience.webp" value="4+" label="Years Experience" />
            <StatItem src="/assets/rocket.webp" value="20+" label="Websites Launched" />
            <StatItem src="/assets/completed.webp" value="20+" label="Completed Projects" />
          </div>
        </div>
      </SectionWrapper>
    </Wrapper>
  )
}

export default AboutMe
