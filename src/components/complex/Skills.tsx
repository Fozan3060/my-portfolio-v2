'use client'

import React from 'react'
import { IconType } from 'react-icons'
import {
  LuArrowLeftRight,
  LuArrowRight,
  LuAudioLines,
  LuBraces,
  LuBrainCircuit,
  LuCloud,
  LuCpu,
  LuCreditCard,
  LuDatabase,
  LuDrama,
  LuFlaskConical,
  LuLandmark,
  LuPanelsTopLeft,
  LuRadioTower,
  LuSearch,
  LuServer,
  LuShoppingCart,
  LuSmartphone,
  LuTreePine,
  LuWorkflow
} from 'react-icons/lu'
import {
  SiAmazondynamodb,
  SiAmazonwebservices,
  SiClaude,
  SiDeepgram,
  SiDocker,
  SiExpo,
  SiFastapi,
  SiGithubactions,
  SiGooglegemini,
  SiGraphql,
  SiJest,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOllama,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiRailway,
  SiReact,
  SiShadcnui,
  SiStripe,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel
} from 'react-icons/si'
import Logo from '../ui/Logo'
import ToolChip, { Tool } from '../ui/ToolChip'
import SectionHeading from '../ui/SectionHeading'
import SectionWrapper from '../ui/SectionWrapper'
import Wrapper from './Wrapper'
import useInView from '@/hooks/useInView'

type Category = {
  title: string
  description: string
  icon: IconType
  tools: Tool[]
}

const aiTools: Tool[] = [
  { name: 'Claude', icon: SiClaude, color: '#D97757' },
  { name: 'OpenAI', icon: SiOpenai },
  { name: 'Gemini', icon: SiGooglegemini, color: '#8E75B2' },
  { name: 'RAG systems', icon: LuSearch },
  { name: 'Multi-agent systems', icon: LuWorkflow },
  { name: 'QLoRA fine-tuning (Unsloth)', icon: LuCpu },
  { name: 'Ollama', icon: SiOllama }
]

const voicePipeline = [
  { name: 'LiveKit', role: 'Real-time audio', icon: LuRadioTower },
  { name: 'Deepgram', role: 'Speech to text', icon: SiDeepgram },
  { name: 'Claude', role: 'LLM', icon: SiClaude },
  { name: 'Cartesia', role: 'Text to speech', icon: LuAudioLines }
]

const categories: Category[] = [
  {
    title: 'Frontend',
    description: 'Interfaces built with modern React and Next.js.',
    icon: LuPanelsTopLeft,
    tools: [
      { name: 'Next.js', icon: SiNextdotjs, core: true },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', core: true },
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
      { name: 'shadcn/ui', icon: SiShadcnui },
      { name: 'Three.js', icon: SiThreedotjs }
    ]
  },
  {
    title: 'Backend',
    description: 'APIs and services in Python and TypeScript.',
    icon: LuServer,
    tools: [
      { name: 'FastAPI', icon: SiFastapi, color: '#009688', core: true },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
      { name: 'Inngest', icon: LuWorkflow },
      { name: 'REST APIs', icon: LuBraces }
    ]
  },
  {
    title: 'Databases',
    description: 'Relational, document and vector stores.',
    icon: LuDatabase,
    tools: [
      { name: 'PostgreSQL (Neon)', icon: SiPostgresql, color: '#4169E1', core: true },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'DynamoDB', icon: SiAmazondynamodb, color: '#4053D6' },
      { name: 'Pinecone', icon: LuTreePine }
    ]
  },
  {
    title: 'Cloud & DevOps',
    description: 'Deploys, containers and CI/CD pipelines.',
    icon: LuCloud,
    tools: [
      { name: 'Vercel', icon: SiVercel, core: true },
      { name: 'Railway', icon: SiRailway, core: true },
      { name: 'AWS (EC2, S3)', icon: SiAmazonwebservices, color: '#FF9900' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' }
    ]
  },
  {
    title: 'Mobile',
    description: 'Cross-platform and offline-first apps.',
    icon: LuSmartphone,
    tools: [
      { name: 'React Native', icon: SiReact, color: '#61DAFB' },
      { name: 'Expo', icon: SiExpo }
    ]
  },
  {
    title: 'Payments',
    description: 'Marketplace checkout and bank account onboarding.',
    icon: LuCreditCard,
    tools: [
      { name: 'Fortis', icon: LuCreditCard },
      { name: 'Commerce.js', icon: LuShoppingCart },
      { name: 'Moov.io', icon: LuArrowLeftRight },
      { name: 'Plaid', icon: LuLandmark },
      { name: 'Stripe', icon: SiStripe, color: '#635BFF' }
    ]
  },
  {
    title: 'Testing',
    description: 'End-to-end and unit tests wired into CI.',
    icon: LuFlaskConical,
    tools: [
      { name: 'Playwright', icon: LuDrama, color: '#2EAD33' },
      { name: 'Jest', icon: SiJest, color: '#C21325' }
    ]
  }
]

// Tailwind can't see class names built at runtime, so stagger with an inline delay instead.
const reveal = (inView: boolean, delayMs: number, extraClasses = '') => ({
  className: `transition-all duration-700 ease-out ${
    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  } ${extraClasses}`,
  style: { transitionDelay: inView ? `${delayMs}ms` : '0ms' }
})

const CategoryHeader = ({ icon: Icon, title, description }: Omit<Category, 'tools'>) => (
  <div className='flex items-start gap-4'>
    <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-custom-orange/10 text-custom-orange ring-1 ring-custom-orange/20'>
      <Icon size={22} />
    </span>
    <div>
      <h3 className='text-lg font-semibold text-white'>{title}</h3>
      <p className='mt-0.5 text-sm leading-relaxed text-text2'>{description}</p>
    </div>
  </div>
)

const Skills = () => {
  const { ref: introRef, isInView: introInView } = useInView<HTMLDivElement>(0.3, true)
  const { ref: gridRef, isInView: gridInView } = useInView<HTMLDivElement>(0.1, true)

  return (
    <div className='bg-background2'>
      <Wrapper sectionId='Skills'>
        <SectionWrapper>
          <Logo src='/assets/Logo2.png' classname='h-16 w-20 m-auto' />
          <SectionHeading heading='Skills' />

          <div ref={introRef} className='mx-auto max-w-3xl text-center'>
            <h2
              {...reveal(
                introInView,
                0,
                'text-balance text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl xl:text-5xl'
              )}
            >
              The stack I use to <span className='whitespace-nowrap text-custom-orange'>ship real products</span>
            </h2>
            <p {...reveal(introInView, 120, 'mt-5 text-base leading-relaxed text-text2 sm:text-lg')}>
              Full-stack TypeScript at the core, with Python for AI services.
            </p>
            <p {...reveal(introInView, 200, 'mt-4 inline-flex items-center gap-2 text-sm text-text3')}>
              <span aria-hidden className='h-2 w-2 rounded-full bg-custom-orange' />
              Production stack
            </p>
          </div>

          <div ref={gridRef} className='mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
            <div {...reveal(gridInView, 0, 'md:col-span-2')}>
              <div className='relative h-full overflow-hidden rounded-3xl border border-white/5 bg-background p-5 sm:p-8'>
                <div
                  aria-hidden
                  className='grid-pattern absolute inset-0 [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_top_left,#000_10%,transparent_65%)]'
                />
                <div aria-hidden className='absolute -left-20 -top-20 h-64 w-64 rounded-full bg-custom-orange/15 blur-3xl' />

                <div className='relative'>
                  <CategoryHeader
                    icon={LuBrainCircuit}
                    title='AI & LLM Engineering'
                    description='LLM features, retrieval, agents and real-time voice, built into real products.'
                  />
                  <ul className='mt-6 flex flex-wrap gap-2'>
                    {aiTools.map((tool) => (
                      <ToolChip key={tool.name} tool={tool} />
                    ))}
                  </ul>

                  <div className='mt-8 rounded-2xl border border-white/5 bg-white/[0.02] p-3 sm:p-5'>
                    <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-text2'>
                      Real-time voice pipeline behind First Light at Ralico
                    </p>
                    <ol className='mt-4 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 xl:flex xl:items-stretch xl:gap-2'>
                      {voicePipeline.map(({ name, role, icon: Icon }, idx) => (
                        <React.Fragment key={name}>
                          {idx > 0 && (
                            <LuArrowRight aria-hidden size={16} className='hidden shrink-0 self-center text-custom-orange/60 xl:block' />
                          )}
                          <li className='flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-white/5 bg-background2 px-2.5 py-2.5 sm:px-3'>
                            <Icon aria-hidden size={18} className='shrink-0 text-custom-orange' />
                            <span className='min-w-0 leading-tight'>
                              <span className='block text-sm font-semibold text-white'>{name}</span>
                              <span className='mt-0.5 block text-xs text-text2'>{role}</span>
                            </span>
                          </li>
                        </React.Fragment>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {categories.map((category, idx) => (
              <div
                key={category.title}
                {...reveal(gridInView, 120 + idx * 80, idx === categories.length - 1 ? 'md:col-span-2 xl:col-span-1' : '')}
              >
                <div className='h-full rounded-3xl border border-white/5 bg-gradient-to-br from-[#1A1A1A] to-[#212121] p-5 transition-colors duration-300 hover:border-white/10 sm:p-6'>
                  <CategoryHeader icon={category.icon} title={category.title} description={category.description} />
                  <ul className='mt-5 flex flex-wrap gap-2'>
                    {category.tools.map((tool) => (
                      <ToolChip key={tool.name} tool={tool} />
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </Wrapper>
    </div>
  )
}

export default Skills
