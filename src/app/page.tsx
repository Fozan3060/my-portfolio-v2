import AboutMe from "@/components/complex/AboutMe";
import Herosection from "@/components/complex/Herosection";
import Services from "@/components/complex/Services";
import LeftBanner from "@/components/compound/LeftBanner";
import MiddleBanner from "@/components/compound/MiddleBanner";
import Personalnfo from "@/components/compound/Personalnfo";
import RightBanner from "@/components/compound/RightBanner";


export default function Home() {
  return (
  <main>
    <Herosection/>
    <AboutMe/>
    <Personalnfo/>
    <Services/>
  </main>
  );
}
