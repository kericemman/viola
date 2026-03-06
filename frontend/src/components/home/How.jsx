import { 
  Target, 
  Users, 
  Briefcase, 
  CheckCircle, 
  ArrowRight, 
  Compass,
  TrendingUp,
  Layers,
  Zap,
  Clock,
  MessageSquare,
  FileText,
  BarChart3,
  Heart,
  Anchor,
  Feather
} from "lucide-react";

const HowIWork = () => {
  

  const steps = [
    {
      number: "01",
      icon: <Compass className="w-6 h-6" />,
      title: "Discovery & Assessment",
      description: "We begin by understanding your unique context, challenges, and goals through deep listening and diagnostic conversations.",
      color: "#194C63",
      bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop",
      bgPosition: "center 30%"
    },
    {
      number: "02",
      icon: <Layers className="w-6 h-6" />,
      title: "Framework Design",
      description: "Together, we design practical, workable systems tailored to your operational reality — not generic templates.",
      color: "#B3785A",
      bgImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop",
      bgPosition: "center"
    },
    {
      number: "03",
      icon: <Zap className="w-6 h-6" />,
      title: "Implementation Support",
      description: "I work alongside you to implement, adjust, and embed new structures with ongoing guidance and feedback.",
      color: "#3C637B",
      bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop",
      bgPosition: "center 20%"
    },
    {
      number: "04",
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Review & Sustain",
      description: "We measure impact, refine approaches, and build your internal capability for lasting, sustainable performance.",
      color: "#748DB0",
      bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop",
      bgPosition: "center"
    }
  ];

  const principles = [
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Create clarity",
      color: "#194C63"
    },
    {
      icon: <CheckCircle  className="w-5 h-5" />,
      text: "Strengthen structure",
      color: "#194C63"
    },
    {
      icon: <CheckCircle  className="w-5 h-5" />,
      text: "Support sustainable performance",
      color: "#194C63"
    }
  ];

  const beliefs = [
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Strong missions require strong systems.",
      color: "#fff"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Ethical leadership must be supported by structure.",
      color: "#fff"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Clarity reduces burnout.",
      color: "#fff"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Governance is not control, it is alignment.",
      color: "#fff"
    }
  ];

  const deliverables = [
    {
      icon: <CheckCircle className="w-4 h-4" />,
      text: "Workable systems, not theory"
    },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      text: "Practical timelines"
    },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      text: "Ongoing support"
    },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      text: "Measurable outcomes"
    }
  ];

  return (
    <section className="py-5 lg:py-15 bg-gradient-to-b from-white to-[#F5FAFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        

        

        {/* Process Steps with Background Images */}
        <div className="mb-5">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "#194C63" }}>
              My Process
            </h3>
            <p className="text-lg text-[#3C637B] max-w-2xl mx-auto">
              A structured, collaborative approach designed for real-world impact
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connector line (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#D0DDEE] to-transparent -translate-y-1/2 z-0" />
                )}
                
                <div 
                  className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl"
                  style={{
                    border: "1px solid #D0DDEE"
                  }}
                >
                  {/* Background Image with Overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ 
                      backgroundImage: `url(${step.bgImage})`,
                      backgroundPosition: step.bgPosition
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-[#0C0D14] via-[#0C0D14]/80 to-[#0C0D14]/40"
                    style={{ opacity: 0.85 }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col min-h-[320px]">
                    {/* Step Number and Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-5xl font-bold text-white/20">
                        {step.number}
                      </span>
                      
                    </div>

                    <h4 className="text-xl font-semibold mb-3 text-white">
                      {step.title}
                    </h4>

                    <p className="text-sm leading-relaxed text-white/90 flex-grow">
                      {step.description}
                    </p>

                    <div className="mt-6 pt-4 border-t border-white/20">
                      <div className="flex items-center justify-between text-white/80">
                        <span className="text-xs">Step {step.number}</span>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Philosophy */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Focus Points */}
          <div 
            className="bg-white rounded-2xl p-8 lg:p-10"
            style={{
              border: "1px solid #D0DDEE",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.03)"
            }}
          >
            <h3 className="text-2xl font-semibold mb-8" style={{ color: "#194C63" }}>
              My focus, always:
            </h3>

            <div className="space-y-6">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${principle.color}15` }}
                  >
                    <div style={{ color: principle.color }}>{principle.icon}</div>
                  </div>
                  <span className="text-lg font-medium" style={{ color: "#0C0D14" }}>
                    {principle.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-[#D0DDEE]">
              <p className="text-lg italic mb-3" style={{ color: "#748DB0" }}>
                Not through theory alone.
              </p>
              <p className="text-xl font-semibold" style={{ color: "#194C63" }}>
                Through workable systems aligned with real operational demands.
              </p>
            </div>
          </div>

          {/* What I Believe */}
          <div 
            className="bg-[#194C63] rounded-2xl p-8 lg:p-10 text-white relative overflow-hidden"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 80%, rgba(179, 120, 90, 0.2) 0%, transparent 50%)"
            }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-20 -translate-x-20" />
            
            <h3 className="text-2xl font-bold mb-8 relative z-10">
              What I Believe
            </h3>

            <div className="space-y-6 relative z-10">
              {beliefs.map((belief, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div 
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                  >
                    <div style={{ color: belief.color }}>{belief.icon}</div>
                  </div>
                  <p className="text-white/90 leading-relaxed">
                    {belief.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-white/80 text-sm italic">
                And when institutions are designed intentionally, people perform better without carrying invisible weight.
              </p>
            </div>
          </div>
        </div>

        {/* What Makes It Work */}
        <div className="grid md:grid-cols-2 gap-6">
          <div 
            className="bg-white rounded-2xl p-8"
            style={{
              border: "1px solid #D0DDEE"
            }}
          >
            <h3 className="text-xl font-bold mb-6" style={{ color: "#194C63" }}>
              What makes it work:
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {deliverables.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(179, 120, 90, 0.1)" }}
                  >
                    <div style={{ color: "#B3785A" }}>{item.icon}</div>
                  </div>
                  <span className="text-sm" style={{ color: "#3C637B" }}>{item.text}</span>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full py-4 rounded-xl bg-[#194C63] hover:bg-[#194C63]/90 transition-all duration-300 text-white flex items-center justify-center gap-2 group">
              <span>Let's work together</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Testimonial Preview */}
          <div 
            className="bg-white rounded-2xl p-8"
            style={{
              border: "1px solid #D0DDEE"
            }}
          >
            <p className="text-lg italic mb-6" style={{ color: "#3C637B" }}>
              "The structured approach brought clarity to our entire organization. We finally have systems that work for us, not against us. Working with Brenda has been a game-changer for our leadership team and the impact we can achieve."
            </p>
            <div className="flex items-center gap-3">
              
              <div>
                <p className="text-sm font-semibold" style={{ color: "#194C63" }}>Richard T</p>
                <p className="text-xs" style={{ color: "#748DB0" }}>CEO, CH</p>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .group:hover .group-hover\:scale-110 {
          transform: scale(1.1);
        }
        
        .group:hover .group-hover\:rotate-3 {
          transform: rotate(3deg);
        }
      `}</style>
    </section>
  );
};

export default HowIWork;