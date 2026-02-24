import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Calendar, ChevronRight } from "lucide-react";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeWord, setActiveWord] = useState(0);
  
  const words = ["clarity", "confidence", "structure","growth", "success"];

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#F5FAFD" }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div 
          className="absolute top-1/4 -left-24 w-96 h-96 rounded-full animate-float-slow"
          style={{ backgroundColor: "#194C63" }}
        />
        <div 
          className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full animate-float-reverse"
          style={{ backgroundColor: "#B3785A" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-15">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className={`space-y-8 transition-all duration-1000 ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 animate-pulse-slow" 
                style={{ 
                  backgroundColor: "rgba(179, 120, 90, 0.1)",
                  transform: 'skewX(-12deg)'
                }}
              />
              <Sparkles className="w-4 h-4 relative z-10" style={{ color: "#B3785A" }} />
              <span 
                className="text-sm font-semibold relative z-10 tracking-wide"
                style={{ color: "#B3785A", fontFamily: "'Comfortaa', cursive" }}
              >
                HR Consultant & Career Coach
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-6">
              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
                style={{ 
                  color: "#194C63",
                  fontFamily: "'Comfortaa', cursive"
                }}
              >
                From confusion to, 
               
                {" "}
                <span className="relative inline-block min-w-[180px] h-[72px] lg:h-[84px]">
                  {words.map((word, index) => (
                    <span
                      key={word}
                      className={`absolute left-0 transition-all duration-500 ease-out ${
                        index === activeWord 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-4'
                      }`}
                      style={{ 
                        color: "#B3785A",
                        fontFamily: "'Comfortaa', cursive",
                        fontWeight: 700
                      }}
                    >
                      {word}
                      <span 
                        className="absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300"
                        style={{ 
                          backgroundColor: "#B3785A",
                          transform: index === activeWord ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: 'left'
                        }}
                      />
                    </span>
                  ))}
                </span>
              </h1>
              
              
            </div>

            {/* Description */}
            <p 
              className={`text-lg md:text-xl leading-relaxed transition-all duration-700 delay-300 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                color: "#3C637B",
                fontFamily: "'Comfortaa', cursive",
                fontWeight: 400
              }}
            >
              I support individuals and organizations through human-centered HR
              practices, personal development, and career coaching to achieve
              sustainable growth and lasting success.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-700 delay-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Link
                to="/product"
                className="group relative px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-xl overflow-hidden"
                style={{
                  backgroundColor: "#194C63",
                  color: "#F5FAFD",
                  fontFamily: "'Comfortaa', cursive"
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Explore Products
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                </span>
                <div 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"
                  style={{ 
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
                  }}
                />
              </Link>
              
              <a
                href="https://calendly.com/hello-romanbrendaviola/30min"
                className="group px-8 py-4 rounded-xl font-bold border-2 transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-3"
                style={{
                  borderColor: "#D0DDEE",
                  backgroundColor: "#FFFFFF",
                  color: "#3C637B",
                  fontFamily: "'Comfortaa', cursive"
                }}
              >
                <Calendar className="w-5 h-5" />
                Book Consultation
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            {/* Main Image Container */}
            <div className="relative">
              {/* Outer Glow */}
              <div 
                className="absolute -inset-4 rounded-3xl opacity-20 blur-xl"
                style={{ 
                  backgroundColor: "#194C63",
                  transform: 'rotate(2deg)'
                }}
              />
              
              {/* Image Frame */}
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl"
               
              >
                {/* Image with overlay */}
                <div className="relative w-full md:h-[500px] h-[300px] overflow-hidden">
                  <img 
                    src="/assets/AB.jpg"
                    alt="Brenda - HR Consultant & Career Coach"
                    className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(25, 76, 99, 0.2) 0%, transparent 50%)"
                    }}
                  />
                  
                  
                  </div>
                </div>
            

              

             
            
            </div>
          </div>
        </div>

        
      </div>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap');
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(90deg);
          }
          66% {
            transform: translateY(15px) rotate(180deg);
          }
        }
        
        @keyframes float-reverse {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(15px) rotate(-90deg);
          }
          66% {
            transform: translateY(-15px) rotate(-180deg);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 18s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;