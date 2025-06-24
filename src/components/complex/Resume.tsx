'use client'

import React, { useEffect, useRef, useState } from 'react'
import { VerticalTimeline } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { ResumeCard } from '../compound/ResumeCard'
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa'
import Wrapper from './Wrapper'
import SectionWrapper from '../ui/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import Logo from '../ui/Logo'

const resumeItems = [
  {
    CompanyName: 'OnlyGamers Inc',
    PositionName: 'Full Stack Developer',
    date: '01/2024 - 04/2024',
    points: [
      'Developed scalable web solutions tailored for the gaming community.',
      'Implemented Google OAuth, manual sign-in, and social login for secure authentication.',
      'Built user profile customization with advanced avatar/banner cropping.',
      'Used AWS S3 for optimized image storage and retrieval.',
      'Enabled creator monetization with subscription-based content access.',
      'Integrated payment and subscription management systems.',
      'Utilized AWS MongoDB and GraphQL APIs for scalable backend integration.'
    ],
    icon: <FaBriefcase />
  },
  {
    CompanyName: 'Creative Squad Inc',
    PositionName: 'React Front-end Developer',
    date: '01/2023 - 05/2023',
    points: [
      'Translated Figma designs into responsive, interactive React interfaces.',
      'Integrated FontAwesome, Bootstrap 5, and SwiperJS for enhanced UI/UX.',
      'Resolved complex coding problems to maintain functional consistency.'
    ],
    icon: <FaBriefcase />
  }
]
const EducationItems = [
  {
    CompanyName: 'FAST National University',
    PositionName: 'Bachelors in Computer Science',
    date: '07/2023 - Present',
    points: [
      'Pursuing core subjects including data structures, algorithms, and full-stack development.',
      'Completed full-stack web development course by Colt Steele on Udemy.',
      'Completed advanced React development course on Udemy.'
    ],
    icon: <FaGraduationCap />
  }
]

const Resume: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentRef = sectionRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )

    if (currentRef) observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [])

  return (
    <Wrapper sectionId='Resume'>
      <SectionWrapper>
        <Logo src='/assets/Logo2.png' classname='h-16 w-20 m-auto' />
        <SectionHeading heading='Resume' />
        <div className='sm:px-0 xl:w-4/5 mx-auto'>
          <div
            ref={sectionRef}
            className={`transition-all duration-500 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className='text-center text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]'>
              Resume Overview
            </h2>
          </div>

          <div className='mt-20 flex lg:flex-row flex-col gap-20'>
            <VerticalTimeline className='h-fit'>
              <h2 className='text-3xl font-medium text-text1 absolute  top-0 ml-12'>
                Education
              </h2>
              {EducationItems.map((item, index) => (
                <ResumeCard
                  key={`resume-${index}`}
                  CompanyName={item.CompanyName}
                  PositionName={item.PositionName}
                  date={item.date}
                  points={item.points}
                />
              ))}
            </VerticalTimeline>
            <VerticalTimeline className='h-fit'>
              <h2 className='text-3xl font-medium text-text1 absolute  top-0 ml-12'>
                Experience
              </h2>
              {resumeItems.map((item, index) => (
                <ResumeCard
                  key={`resume-${index}`}
                  CompanyName={item.CompanyName}
                  PositionName={item.PositionName}
                  date={item.date}
                  points={item.points}
                />
              ))}
            </VerticalTimeline>
          </div>
        </div>
      </SectionWrapper>
    </Wrapper>
  )
}

export default Resume
