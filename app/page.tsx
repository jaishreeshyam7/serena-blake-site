import Hero from "@/components/Hero"
import Services from "@/components/Services"
import About from "@/components/About"
import GetInTouch from "@/components/GetInTouch"
import Contact from "@/components/Contact"
import FAQ from "@/components/FAQ"

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <GetInTouch />
      <Services />
      <FAQ />
      <Contact />
    </main>
  )
}