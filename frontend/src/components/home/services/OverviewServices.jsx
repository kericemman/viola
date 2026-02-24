import { useState, useRef, useEffect } from "react";
import { services } from "../../../data/services";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Users, Building2, ChevronRight, Sparkles, Info, ArrowUp } from "lucide-react";

const Services = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("individual");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const individualRef = useRef(null);
  const organizationRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const individualTop = individualRef.current?.offsetTop || 0;
      const organizationTop = organizationRef.current?.offsetTop || 0;
      const scrollPosition = window.scrollY + 80;

      if (scrollPosition >= organizationTop - 100) {
        setActiveSection("organization");
      } else if (scrollPosition >= individualTop - 100) {
        setActiveSection("individual");
      }

      setShowMobileNav(scrollPosition > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section) => {
    const ref = section === "individual" ? individualRef : organizationRef;
    const offset = 80;
    const elementPosition = ref.current?.getBoundingClientRect().top || 0;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    
    setActiveSection(section);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCardClick = (service, type) => {
    if (type === "individual") {
      addToCart(service);
      navigate("/checkout");
    } else {
      navigate(`/services/org/${service.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FAFD]">
      {/* Sticky Navigation - Responsive */}
      <div 
        className="sticky top-0 z-40 w-full backdrop-blur-md transition-all duration-300"
        style={{ 
          backgroundColor: "rgba(245, 250, 253, 0.98)",
          borderBottom: "1px solid #D0DDEE",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center justify-between py-3">
            <span className="text-sm font-medium" style={{ color: "#194C63" }}>
              Services
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollToSection("individual")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeSection === "individual" ? "shadow-sm" : "hover:opacity-90"
                }`}
                style={{
                  backgroundColor: activeSection === "individual" ? "#194C63" : "#FFFFFF",
                  border: activeSection === "individual" ? "none" : "1px solid #D0DDEE",
                  color: activeSection === "individual" ? "#F5FAFD" : "#3C637B"
                }}
              >
                <Users className="w-4 h-4" />
                For Individuals
              </button>

              <button
                onClick={() => scrollToSection("organization")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeSection === "organization" ? "shadow-sm" : "hover:opacity-90"
                }`}
                style={{
                  backgroundColor: activeSection === "organization" ? "#194C63" : "#FFFFFF",
                  border: activeSection === "organization" ? "none" : "1px solid #D0DDEE",
                  color: activeSection === "organization" ? "#F5FAFD" : "#3C637B"
                }}
              >
                <Building2 className="w-4 h-4" />
                For Organizations
              </button>
            </div>

            <div className="w-16"></div>
          </div>

          {/* Mobile Navigation - Horizontal Scroll */}
          <div className="sm:hidden py-2">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <button
                onClick={() => scrollToSection("individual")}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  activeSection === "individual" ? "shadow-sm" : "hover:opacity-90"
                }`}
                style={{
                  backgroundColor: activeSection === "individual" ? "#194C63" : "#FFFFFF",
                  border: activeSection === "individual" ? "none" : "1px solid #D0DDEE",
                  color: activeSection === "individual" ? "#F5FAFD" : "#3C637B"
                }}
              >
                <Users className="w-3.5 h-3.5" />
                Individuals
              </button>

              <button
                onClick={() => scrollToSection("organization")}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  activeSection === "organization" ? "shadow-sm" : "hover:opacity-90"
                }`}
                style={{
                  backgroundColor: activeSection === "organization" ? "#194C63" : "#FFFFFF",
                  border: activeSection === "organization" ? "none" : "1px solid #D0DDEE",
                  color: activeSection === "organization" ? "#F5FAFD" : "#3C637B"
                }}
              >
                <Building2 className="w-3.5 h-3.5" />
                Organizations
              </button>

              <span className="flex-shrink-0 text-xs px-2" style={{ color: "#AAB6CB" }}>
                Scroll for more →
              </span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D0DDEE]">
            <div 
              className="h-full transition-all duration-300"
              style={{ 
                width: "50%",
                backgroundColor: "#B3785A",
                transform: activeSection === "individual" ? "translateX(0)" : "translateX(100%)"
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-5 lg:py-10">
        {/* Header */}
        <div className="mb-10 sm:mb-12 lg:mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 sm:mb-6"
            style={{ 
              backgroundColor: "rgba(179, 120, 90, 0.1)",
              color: "#B3785A"
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs sm:text-sm font-medium">
            Strategic Advisory & Development Services
            </span>
          </div>

          
          <p className="text-sm sm:text-base text-[#3C637B] max-w-2xl mx-auto px-4">
            Practical, systems-driven support for individuals and organizations
            navigating growth, transition, and structural strain.
          </p>
        </div>

        {/* INDIVIDUAL SERVICES */}
        <section ref={individualRef} className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-20">
          <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6 lg:mb-8">
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(25, 76, 99, 0.1)" }}
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#194C63" }} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#194C63]">
              For Individuals
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {services.individuals.map((service) => (
              <div
                key={service.id}
                onClick={() => handleCardClick(service, "individual")}
                className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer relative"
                style={{
                  border: "1px solid #D0DDEE"
                }}
              >
                {/* Click Hint */}
                <div 
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: "rgba(25, 76, 99, 0.1)",
                    color: "#194C63"
                  }}
                >
                  <Info className="w-3 h-3" />
                  <span>Click to book</span>
                </div>

                <div 
                  className="p-4 sm:p-5 border-b"
                  style={{ 
                    backgroundColor: "#F5FAFD",
                    borderColor: "#D0DDEE"
                  }}
                >
                  <h3 className="text-base sm:text-lg font-bold text-[#194C63] mb-1.5 group-hover:text-opacity-90">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3C637B]">
                    {service.description}
                  </p>
                </div>

                <div className="p-4 sm:p-5">
                  <ul className="text-xs sm:text-sm text-[#3C637B] mb-4 sm:mb-5 space-y-1.5">
                    {service.features.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" style={{ backgroundColor: "#B3785A" }}></span>
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-xs" style={{ color: "#AAB6CB" }}>
                        +{service.features.length - 3} more features
                      </li>
                    )}
                  </ul>

                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t" style={{ borderColor: "#F5FAFD" }}>
                    <div>
                      <span className="text-xs" style={{ color: "#748DB0" }}>From</span>
                      <p className="text-lg sm:text-xl font-bold text-[#194C63]">
                        KES {service.price}
                      </p>
                    </div>

                    <div 
                      className="flex items-center gap-1 text-sm font-medium transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: "#194C63" }}
                    >
                      <span>Book now</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ORGANIZATION SERVICES */}
        <section ref={organizationRef} className="scroll-mt-20">
          <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6 lg:mb-8">
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(179, 120, 90, 0.1)" }}
            >
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#B3785A" }} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#194C63]">
              For Organizations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {services.organizations.map((service) => (
              <div
                key={service.id}
                onClick={() => handleCardClick(service, "organization")}
                className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer relative"
                style={{
                  border: "1px solid #D0DDEE"
                }}
              >
                {/* Click Hint */}
                <div 
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 px-2 py-1 rounded-full text-xs z-10"
                  style={{
                    backgroundColor: "rgba(25, 76, 99, 0.1)",
                    color: "#194C63"
                  }}
                >
                  <Info className="w-3 h-3" />
                  <span>Learn more</span>
                </div>

                {/* Image Section */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img 
                    src={service.image || "/api/placeholder/400/300"} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)"
                    }}
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        color: "#194C63"
                      }}
                    >
                      Organization
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold text-[#194C63] mb-1.5 group-hover:text-opacity-90">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#3C637B] mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Key Benefits Preview */}
                  {service.benefits && service.benefits.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium mb-2" style={{ color: "#748DB0" }}>
                        Key benefits:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.benefits.slice(0, 2).map((benefit, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: "rgba(179, 120, 90, 0.1)",
                              color: "#B3785A"
                            }}
                          >
                            {benefit}
                          </span>
                        ))}
                        {service.benefits.length > 2 && (
                          <span className="text-xs" style={{ color: "#AAB6CB" }}>
                            +{service.benefits.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "#F5FAFD" }}>
                    <span className="text-xs" style={{ color: "#748DB0" }}>
                      Custom solutions
                    </span>
                    
                    <div 
                      className="flex items-center gap-1 text-sm font-medium transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: "#194C63" }}
                    >
                      <span>Learn more</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Back to Top Button */}
        {showMobileNav && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 z-40 p-2.5 sm:p-3 rounded-full shadow-lg transition-all hover:scale-110"
            style={{
              backgroundColor: "#194C63",
              color: "#F5FAFD",
              boxShadow: "0 4px 12px rgba(25, 76, 99, 0.3)"
            }}
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-4 left-4 right-4 z-50 sm:hidden">
          <div 
            className="flex gap-2 p-1.5 rounded-full shadow-lg backdrop-blur-md mx-auto max-w-[280px]"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              border: "1px solid #D0DDEE"
            }}
          >
            <button
              onClick={() => scrollToSection("individual")}
              className={`flex-1 px-3 py-2 rounded-full text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                activeSection === "individual" ? "text-white" : ""
              }`}
              style={{
                backgroundColor: activeSection === "individual" ? "#194C63" : "transparent",
                color: activeSection === "individual" ? "#F5FAFD" : "#3C637B"
              }}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Individual</span>
            </button>
            <button
              onClick={() => scrollToSection("organization")}
              className={`flex-1 px-3 py-2 rounded-full text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                activeSection === "organization" ? "text-white" : ""
              }`}
              style={{
                backgroundColor: activeSection === "organization" ? "#194C63" : "transparent",
                color: activeSection === "organization" ? "#F5FAFD" : "#3C637B"
              }}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Organization</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;