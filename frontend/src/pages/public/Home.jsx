import React, { useEffect } from 'react'
import Hero from '../../components/home/Hero'
import About from '../../components/home/About'


const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div>
      <Hero/>
      <About/>
      {/* <TestimonialsSection/> */}
    </div>
  )
}

export default Home
