import React, { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote, Award, ThumbsUp, CheckCircle } from 'lucide-react'

const TestimonialsSection = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Author Shilaho",
      role: "Author",
      image: "/assets/shil.jfif",
      rating: 5,
      quote: "The career coaching transformed my professional life. I went from feeling stuck to landing my dream role with a 40% salary increase in just 3 months.",
      
      icon: <Target className="w-5 h-5" />,
      
    },
    {
      id: 2,
      name: "Dr. Kenneth Kaunda (Ph.D)",
      role: "Data Analyst",
      image: "/assets/ken.jfif",
      rating: 5,
      quote: "Brenda is a highly competent HR professional with deep expertise in recruitment, compliance, and HR writing. She is collaborative, ethical, results-driven, and excels at helping organizations hire right and perform better.",
    
      icon: <Users className="w-5 h-5" />,
     
    },
    {
      id: 3,
      name: "Richard Teny",
      role: "Executive Director",
      company: "Coalition for Humanity",
      image: "/assets/Ric.jfif",
      rating: 5,
      quote: "Brenda is a dependable HR and operations expert with the ability to build world-class systems from scratch. Her strengths span HR, compliance, finance, procurement, and operations, making her a highly reliable and impactful professional.",
     
      icon: <User className="w-5 h-5" />,
      
    },
    {
      id: 4,
      name: "Raphael Kioko",
      role: "Communication",
      image: "/assets/Raf.jfif",
      rating: 5,
      quote: "Brenda is an exceptional people-first leader with strong strategic and operational leadership. She navigates complex challenges with clarity, fosters collaboration, and consistently drives organizational efficiency and team success.",
      
      icon: <FileText className="w-5 h-5" />,
     
    }
  ]

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (count) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5FAFD" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" 
               style={{ backgroundColor: "#194C63", color: "white" }}>
            <Quote className="w-4 h-4" />
            <span className="text-sm font-semibold" style={{ fontFamily: "'Comfortaa', cursive" }}>
              Client Stories
            </span>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-semibold mb-4" style={{ color: "#194C63" }}>
            What My Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real results from professionals who transformed their careers with our support
          </p>
        </div>

        
        

        {/* Carousel Section */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      {/* Image */}
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex mb-4">
                          {renderStars(testimonial.rating)}
                        </div>
                        <p className="text-sm md:text-xl text-gray-800 mb-6">
                          "{testimonial.quote}"
                        </p>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-gray-600">{testimonial.role}{testimonial.company}</p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
            style={{ color: "#194C63" }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
            style={{ color: "#194C63" }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeSlide ? 'w-6 bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        
      </div>
    </div>
  )
}

// Import icons that are used in the testimonials
import { Target, Users, User, FileText } from 'lucide-react'

export default TestimonialsSection