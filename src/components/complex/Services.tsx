import React from 'react'
import ServiceCard from '../compound/ServiceCard'
import SectionHeading from '../ui/SectionHeading'
import Wrapper from './Wrapper'
import SectionWrapper from '../ui/SectionWrapper'
import Logo from '../ui/Logo'

const servicesData = [
  {
    ServiceName: 'Web Applications',
    ServiceDescription: 'Tailored web apps built with the latest technologies.',
    ServiceImage: {
      asset: {
        url: '/assets/application.png'
      }
    }
  },
  {
    ServiceName: 'E-commerce Websites',
    ServiceDescription:
      'Secure online stores with user-friendly shopping and payments.',
    ServiceImage: {
      asset: {
        url: '/assets/Ecommerce.png'
      }
    }
  },
  {
    ServiceName: 'API Integration',
    ServiceDescription:
      'Seamless integration for smooth data sharing and functionality.',
    ServiceImage: {
      asset: {
        url: '/assets/Api.png'
      }
    }
  },
  {
    ServiceName: 'User Interfaces',
    ServiceDescription:
      'Engaging, responsive front-end designs for better user experiences.',
    ServiceImage: {
      asset: {
        url: '/assets/UserInterface.png'
      }
    }
  },
  {
    ServiceName: 'Database Solutions',
    ServiceDescription:
      'Efficient and scalable database management for your data needs.',
    ServiceImage: {
      asset: {
        url: '/assets/Database.png'
      }
    }
  },
  {
    ServiceName: 'Real-Time Features',
    ServiceDescription:
      'Add live chat, notifications, and real-time data updates.',
    ServiceImage: {
      asset: {
        url: '/assets/ReatTime.png'
      }
    }
  },
  {
    ServiceName: 'Speed Optimization',
    ServiceDescription:
      'Boost performance with faster load times and optimization.',
    ServiceImage: {
      asset: {
        url: '/assets/Speed.png'
      }
    }
  },
  {
    ServiceName: 'Website Management',
    ServiceDescription:
      'Easy content management systems with flexible controls.',
    ServiceImage: {
      asset: {
        url: '/assets/Management.png'
      }
    }
  }
]

const Services: React.FC = () => {
  return (
    <div className='bg-background2'>
      <Wrapper sectionId='services'>
        <SectionWrapper>
          <Logo src="/assets/Logo2.png" classname="h-16 w-20 m-auto" />
          <SectionHeading heading='Services' />

          <div className='grid overflow-hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-[15px] sm:px-0   mx-auto items-center mt-20 '>
            {servicesData.map((service, index) => (
              <ServiceCard
                key={index}
                ServiceImage={service.ServiceImage}
                ServiceDescription={service.ServiceDescription}
                index={index}
                ServiceName={service.ServiceName}
              />
            ))}
          </div>
        </SectionWrapper>
      </Wrapper>
    </div>
  )
}

export default Services
