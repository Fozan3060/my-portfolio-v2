import AboutMe from '@/components/complex/AboutMe'
import Herosection from '@/components/complex/Herosection'
import Portfolio from '@/components/complex/Portfolio'
import Resume from '@/components/complex/Resume'
import Reviews from '@/components/complex/Reviews'
import Services from '@/components/complex/Services'
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
    </main>
  )
}
