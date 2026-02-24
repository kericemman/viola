import { useState, useEffect } from "react";
import api from "../../services/api";

import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  ArrowRight
} from "lucide-react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  const [loaded, setLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post("/contact", formData);

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Email",
      value: "hello@romanbrendaviola.com",
      color: "#194C63",
      action: "mailto:hello@romanbrendaviola.com"
    },
    {
      icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Phone",
      value: "+211 (921) 650-576",
      color: "#B3785A",
      action: "tel:+211921650576"
    },
    {
      icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Remote",
      value: "Working Globally",
      color: "#3C637B"
    }
  ];

  const services = [
    "Career Coaching",
    "HR Consulting",
    "Resume Review",
    "Interview Prep",
    "Leadership Development",
    "Team Building"
  ];

  return (
    <>
      {/* Hero Section */}
      <div 
        className="min-h-[40vh] md:min-h-[30vh] flex items-center relative overflow-hidden"
        style={{ backgroundColor: "#194C63" }}
      >
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
            style={{
              backgroundImage: 'url("/assets/tel.jfif")',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
          <div className="text-center max-w-3xl mx-auto">
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 md:mb-6 transition-all duration-1000 ${
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
                style={{ fontFamily: "'Comfortaa'" }}
              >
                Get in Touch
              </span>
            </div>

            
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className={`transition-all duration-1000 ${
                loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <h2 
                  className="text-xl md:text-2xl font-bold mb-4 md:mb-6"
                  style={{ color: "#194C63" }}
                >
                  Contact Information
                </h2>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.action}
                      className={`group block p-4 md:p-5 rounded-lg md:rounded-xl transition-all duration-300 hover:shadow-lg ${
                        info.action ? 'cursor-pointer' : 'cursor-default'
                      }`}
                      style={{ 
                        backgroundColor: "#F5FAFD",
                        border: "1px solid #D0DDEE"
                      }}
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        <div 
                          className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${info.color}15` }}
                        >
                          <div style={{ color: info.color }}>
                            {info.icon}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 
                            className="font-bold mb-1 text-sm md:text-base truncate"
                            style={{ color: "#194C63" }}
                          >
                            {info.title}
                          </h3>
                          <p className="text-xs md:text-sm truncate" style={{ color: "#748DB0" }}>
                            {info.value}
                          </p>
                        </div>
                        {info.action && (
                          <ArrowRight className="w-4 h-4 ml-2 mt-1 md:mt-2 text-gray-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Consultation Info */}
              <div 
                className={`p-4 md:p-6 rounded-lg md:rounded-xl transition-all duration-1000 delay-300 ${
                  loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ 
                  backgroundColor: "rgba(25, 76, 99, 0.05)",
                  border: "1px solid #D0DDEE"
                }}
              >
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" style={{ color: "#194C63" }} />
                  <h3 
                    className="font-bold text-sm md:text-base"
                    style={{ color: "#194C63" }}
                  >
                    Consultation Details
                  </h3>
                </div>
                <ul className="space-y-1 md:space-y-2">
                  {["60-minute sessions", "Flexible scheduling", "Virtual or in-person", "Follow-up resources"].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0" style={{ color: "#16a34a" }} />
                      <span className="text-xs md:text-sm" style={{ color: "#3C637B" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div 
                className={`p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl transition-all duration-1000 delay-500 ${
                  loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D0DDEE",
                  boxShadow: "0 10px 40px rgba(25, 76, 99, 0.08)"
                }}
              >
                {isSubmitted ? (
                  <div className="text-center py-8 md:py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 md:mb-6" 
                         style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}>
                      <CheckCircle className="w-8 h-8 md:w-10 md:h-10" style={{ color: "#16a34a" }} />
                    </div>
                    <h3 
                      className="text-xl md:text-2xl font-bold mb-2 md:mb-3"
                      style={{ color: "#194C63" }}
                    >
                      Message Sent!
                    </h3>
                    <p className="text-sm md:text-lg mb-6 md:mb-8" style={{ color: "#3C637B" }}>
                      Thank you for reaching out. I'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold transition-all hover:opacity-90 text-sm md:text-base"
                      style={{
                        backgroundColor: "#194C63",
                        color: "#F5FAFD"
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 
                      className="text-xl md:text-2xl font-bold mb-2"
                      style={{ color: "#194C63" }}
                    >
                      Send a Message
                    </h2>
                    <p className="mb-4 md:mb-8 text-sm md:text-base" style={{ color: "#748DB0" }}>
                      Fill out the form below and I'll get back to you as soon as possible.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <label className="block mb-1 md:mb-2 text-xs md:text-sm font-medium" style={{ color: "#194C63" }}>
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 md:p-3 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm md:text-base"
                            style={{
                              backgroundColor: "#F5FAFD",
                              border: "1px solid #AAB6CB",
                              color: "#0C0D14"
                            }}
                            placeholder="Your name"
                          />
                        </div>

                        <div>
                          <label className="block mb-1 md:mb-2 text-xs md:text-sm font-medium" style={{ color: "#194C63" }}>
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 md:p-3 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm md:text-base"
                            style={{
                              backgroundColor: "#F5FAFD",
                              border: "1px solid #AAB6CB",
                              color: "#0C0D14"
                            }}
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <label className="block mb-1 md:mb-2 text-xs md:text-sm font-medium" style={{ color: "#194C63" }}>
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 md:p-3 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm md:text-base"
                            style={{
                              backgroundColor: "#F5FAFD",
                              border: "1px solid #AAB6CB",
                              color: "#0C0D14"
                            }}
                            placeholder="(555) 123-4567"
                          />
                        </div>

                        <div>
                          <label className="block mb-1 md:mb-2 text-xs md:text-sm font-medium" style={{ color: "#194C63" }}>
                            Service Interest
                          </label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full p-2 md:p-3 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm md:text-base"
                            style={{
                              backgroundColor: "#F5FAFD",
                              border: "1px solid #AAB6CB",
                              color: "#0C0D14"
                            }}
                          >
                            <option value="">Select a service</option>
                            {services.map((service, index) => (
                              <option key={index} value={service}>{service}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block mb-1 md:mb-2 text-xs md:text-sm font-medium" style={{ color: "#194C63" }}>
                          Your Message *
                        </label>
                        <textarea
                          name="message"
                          required
                          rows="4"
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full p-2 md:p-3 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm md:text-base"
                          style={{
                            backgroundColor: "#F5FAFD",
                            border: "1px solid #AAB6CB",
                            color: "#0C0D14"
                          }}
                          placeholder="Tell me about your goals and how I can help..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 md:py-4 rounded-lg md:rounded-xl font-bold transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base"
                        style={{
                          backgroundColor: "#194C63",
                          color: "#F5FAFD"
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 md:w-5 md:h-5" />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-xs md:text-sm text-center" style={{ color: "#AAB6CB" }}>
                        I typically respond within 24 hours on business days.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
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
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 18s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Contact;