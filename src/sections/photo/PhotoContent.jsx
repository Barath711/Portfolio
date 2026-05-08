import Hero from './Hero'
import Gallery from './Gallery'
import About from './About'
import Contact from './Contact'

export default function PhotoContent() {
  return (
    <div className="relative" style={{ background: 'rgba(10,8,5,0)' }}>
      <Hero />
      <Gallery />
      <About />
      <Contact />
    </div>
  )
}
