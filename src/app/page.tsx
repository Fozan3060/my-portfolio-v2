import AboutMe from '@/components/complex/AboutMe'
import ContactUs from '@/components/complex/ContactUs'
import Herosection from '@/components/complex/Herosection'
import Portfolio from '@/components/complex/Portfolio'
import Resume from '@/components/complex/Resume'
import Reviews from '@/components/complex/Reviews'
import Services from '@/components/complex/Services'
import Skills from '@/components/complex/Skills'
import Personalnfo from '@/components/compound/Personalnfo'

export default function Home () {
  return (
    <main>
      <Herosection />
      <AboutMe />
      <Personalnfo />
      <Services />
      <Portfolio />
      <Reviews />
      <Resume/>
      <Skills/>
      <ContactUs/>
    </main>
  )
}
