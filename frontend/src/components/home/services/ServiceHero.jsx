import React, { useState, useEffect } from 'react'
import { MessageSquare } from 'lucide-react'

const ServiceHero = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div 
      className="min-h-[30vh] flex items-center relative overflow-hidden"
      style={{ backgroundColor: "#194C63" }}
    >
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: 'url("/assets/s1.jfif")',
          }}
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center max-w-3xl mx-auto">
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-all duration-1000 ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ 
              backgroundColor: "#194C63",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <MessageSquare className="w-4 h-4" />
            <span 
              className="text-sm font-semibold tracking-wide"
        
            >
              Our Services
            </span>
          </div>

          
          <p className="text-lg text-gray-200 opacity-90">
          I work with individuals and organizations at critical points of growth, transition, and structural strain.
My approach is practical, systems-driven, and grounded in real operational experience.

          </p>
        </div>
      </div>
    </div>
  )
}

export default ServiceHero