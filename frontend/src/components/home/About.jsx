import { useState, useEffect } from "react";
import { 
  Target, 
  Users, 
  Heart, 
  TrendingUp, 
  Award, 
  Clock,
  ChevronRight,
  Quote
} from "lucide-react";

const About = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Purpose-Driven",
      description: "Aligning work with core values and meaningful objectives",
      color: "#194C63"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "People-Centered",
      description: "Human-first approach to HR and development",
      color: "#B3785A"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Empathetic",
      description: "Understanding challenges with compassion and insight",
      color: "#3C637B"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Growth-Focused",
      description: "Sustainable strategies for long-term development",
      color: "#748DB0"
    }
  ];

 
  return (
    <>
      
      {/* Hero Section */}
      <div 
        className="min-h-[60vh] flex items-center relative overflow-hidden bg-white"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute top-20 left-10 w-64 h-64 rounded-full animate-pulse-slow"
            style={{ backgroundColor: "#194C63" }}
          />
          <div 
            className="absolute bottom-20 right-10 w-64 h-64 rounded-full animate-pulse-slow"
            style={{ 
              backgroundColor: "#B3785A",
              animationDelay: "2s"
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Headline */}
            <div className={`space-y-6 transition-all duration-1000 ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                style={{ 
                  backgroundColor: "rgba(179, 120, 90, 0.1)",
                  color: "#B3785A"
                }}
              >
                <span className="text-sm font-semibold tracking-wide"
                  style={{ fontFamily: "'Comfortaa', cursive" }}
                >
                  About Brenda
                </span>
              </div>

              <h1 
                className="text-2xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ 
                  color: "#194C63",
                  fontFamily: "'Comfortaa', cursive"
                }}
              >
                Where{" "}
                <span style={{ color: "#B3785A" }}>People</span>
                <br />
                Meet{" "}
                <span style={{ color: "#B3785A" }}>Purpose</span>
              </h1>

              <p 
                className="text-lg md:text-xl leading-relaxed"
                style={{ 
                  color: "#3C637B",
                  fontFamily: "'Comfortaa', cursive"
                }}
              >
                I work at the intersection of human potential, organizational growth,
                and meaningful progress.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <p 
                    className="text-2xl font-semibold mb-1"
                    style={{ color: "#194C63" }}
                  >
                    8+
                  </p>
                  <p className="text-sm" style={{ color: "#748DB0" }}>
                    Years
                  </p>
                </div>
                <div className="text-center">
                  <p 
                    className="text-2xl font-semibold mb-1"
                    style={{ color: "#194C63" }}
                  >
                    100+
                  </p>
                  <p className="text-sm" style={{ color: "#748DB0" }}>
                    Clients
                  </p>
                </div>
                <div className="text-center">
                  <p 
                    className="text-2xl font-semibold mb-1"
                    style={{ color: "#194C63" }}
                  >
                    95%
                  </p>
                  <p className="text-sm" style={{ color: "#748DB0" }}>
                    Satisfaction
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Image/Quote */}
            <div className={`relative transition-all duration-1000 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
              <div 
                className="p-8 rounded-2xl"
                style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #D0DDEE",
                    
                  }}
              >
                <Quote className="w-12 h-12 mb-6" style={{ color: "#D0DDEE" }} />
                
                <p 
                  className="text-lg md:text-2xl italic mb-8 leading-relaxed"
                  style={{ 
                    color: "#194C63",
                    fontFamily: "'Comfortaa', cursive"
                  }}
                >
                  "True growth happens when we align our work with our values,
                  build systems that support us, and move forward with clarity."
                </p>
                
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-full overflow-hidden"
                    style={{ border: "3px solid #FFFFFF", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  >
                    <img 
                      src="/assets/AB.jpg"
                      alt="Brenda"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 
                      className="font-bold text-lg"
                      style={{ 
                        color: "#194C63",
                        fontFamily: "'Comfortaa', cursive"
                      }}
                    >
                      Brenda
                    </h3>
                    <p style={{ color: "#748DB0" }}>HR Consultant & Career Coach</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`space-y-8 transition-all duration-1000 delay-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="text-center mb-12">
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ 
                  color: "#194C63",
                  fontFamily: "'Comfortaa', cursive"
                }}
              >
                My Story & Approach
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: "#B3785A" }}></div>
            </div>

            <div className="space-y-6">
              <p 
                className="text-lg leading-relaxed"
                style={{ 
                  color: "#3C637B",
                  fontFamily: "'Comfortaa', cursive"
                }}
              >
                With a background in Human Resources and personal development, 
                I help individuals and organizations build clarity, confidence, 
                and systems that support real, sustainable growth.
              </p>
              
              <p 
                className="text-lg leading-relaxed"
                style={{ 
                  color: "#3C637B",
                  fontFamily: "'Comfortaa', cursive"
                }}
              >
                My journey began in corporate HR, where I saw firsthand how 
                traditional approaches often missed the human element. This led 
                me to integrate coaching methodologies, creating a holistic 
                approach that balances organizational needs with individual 
                growth.
              </p>
              
              <p 
                className="text-lg leading-relaxed"
                style={{ 
                  color: "#3C637B",
                  fontFamily: "'Comfortaa', cursive"
                }}
              >
                Today, I partner with professionals at all levels, from early 
                career to executive leadership to navigate transitions, develop 
                skills, and build careers that are both successful and fulfilling.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-300 hover:shadow-lg ${
                    loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    backgroundColor: "#F5FAFD",
                    border: "1px solid #D0DDEE",
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${value.color}15` }}
                  >
                    <div style={{ color: value.color }}>
                      {value.icon}
                    </div>
                  </div>
                  <h3 
                    className="font-bold text-lg mb-2"
                    style={{ 
                      color: "#194C63",
                      fontFamily: "'Comfortaa', cursive"
                    }}
                  >
                    {value.title}
                  </h3>
                  <p style={{ color: "#748DB0" }}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="py-5" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
          <div 
            className="p-12 rounded-3xl"
            style={{
              backgroundColor: "#194C63",
              backgroundImage: "radial-gradient(circle at 20% 80%, rgba(179, 120, 90, 0.2) 0%, transparent 50%)"
            }}
          >
            <h2 
              className="text-2xl font-bold mb-6 text-white"
              style={{ fontFamily: "'Comfortaa', cursive" }}
            >
              Ready to Build Your Path?
            </h2>
            <p 
              className="text-sm md:text-xl mb-8 text-white/90 max-w-4xl mx-auto"
              style={{ fontFamily: "'Comfortaa', cursive" }}
            >
              Let's work together to create clarity, build confidence, and achieve meaningful growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="group inline-flex items-center text-sm gap-2 px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#194C63",
                  fontFamily: "'Comfortaa', cursive"
                }}
              >
                Book a Consultation
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              
              <a
                href="/product"
                className="group inline-flex items-center text-sm gap-2 px-8 py-4 rounded-xl font-bold border-2 transition-all duration-300 hover:shadow-xl"
                style={{
                  borderColor: "#FFFFFF",
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  fontFamily: "'Comfortaa', cursive"
                }}
              >
                View Products
                <Award className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.1;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default About;