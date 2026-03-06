import React, { useEffect } from 'react'
import Hero from '../../components/home/Hero'
import About from '../../components/home/About'
import HowIWork from '../../components/home/How'



const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div>
      <Hero/>
      <About/>
      <HowIWork/>
    </div>
  )
}

export default Home
