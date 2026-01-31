import React from 'react'
import ServiceCard from '../compound/ServiceCard'
import SectionHeading from '../ui/SectionHeading'
import Wrapper from './Wrapper'
import SectionWrapper from '../ui/SectionWrapper'
import Logo from '../ui/Logo'

const servicesData = [
  {
    ServiceName: 'AI/LLM Integration',
    ServiceDescription: 'Integrate large language models like GPT, Gemini, and Claude into web applications for intelligent features.',
    ServiceImage: {
      asset: {
        url: '/assets/AiIntegration.png'
      }
    }
  },
  {
    ServiceName: 'RAG Systems',
    ServiceDescription: 'Build retrieval-augmented generation systems with vector databases for context-aware AI responses.',
    ServiceImage: {
      asset: {
        url: '/assets/RagDatabase.png'
      }
    }
  },
  {
    ServiceName: 'AI Chatbots & Assistants',
    ServiceDescription: 'Custom conversational AI agents with memory, persona, and domain-specific knowledge.',
    ServiceImage: {
      asset: {
        url: '/assets/AiChatbot.png'
      }
    }
  },
  {
    ServiceName: 'Payment Integration',
    ServiceDescription: 'Stripe, payment gateways, and secure checkout systems for seamless transactions.',
    ServiceImage: {
      asset: {
        url: '/assets/PaymentIntegration.png'
      }
    }
  },
  {
    ServiceName: 'Authentication & Security',
    ServiceDescription: 'Secure login systems with OAuth, JWT, and role-based access control for protected applications.',
    ServiceImage: {
      asset: {
        url: '/assets/AuthSecurity.png'
      }
    }
  },
  {
    ServiceName: 'SEO Optimization',
    ServiceDescription: 'Improve search engine rankings with technical SEO, performance optimization, and best practices.',
    ServiceImage: {
      asset: {
        url: '/assets/SeoOptimization.png'
      }
    }
  },
  {
    ServiceName: 'Cloud & Deployment',
    ServiceDescription: 'AWS, Vercel, Docker containers, CI/CD pipelines, and serverless deployment solutions.',
    ServiceImage: {
      asset: {
        url: '/assets/CloudDeployment.png'
      }
    }
  },
  {
    ServiceName: 'Testing & Automation',
    ServiceDescription: 'Automated testing with Playwright, Jest, and CI/CD integration for reliable, bug-free applications.',
    ServiceImage: {
      asset: {
        url: '/assets/TestingAutomation.png'
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

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-[15px] sm:px-4 mx-auto items-stretch mt-20 py-4'>
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
