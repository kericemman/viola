import React, { useEffect } from 'react'
import ServiceHero from '../../components/home/services/ServiceHero'
import ServiceOverview from '../../components/home/services/OverviewServices';


const Service = () => {
  useEffect (() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div>
      <ServiceHero/>
      <ServiceOverview/>
      
    </div>
  )
}

export default Service
