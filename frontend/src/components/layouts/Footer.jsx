import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Calendar, Instagram, Linkedin, Heart, ArrowUp, MessageCircle } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    Services: [
      { name: "Career Coaching", path: "/services/career-coaching" },
      { name: "HR Consulting", path: "/services/hr-consulting" },
      { name: "Leadership Development", path: "/services/leadership" },
      { name: "Resume Review", path: "/services/resume" }
    ],
    Products: [
      { name: "Online Courses", path: "/products/courses" },
      { name: "E-books", path: "/products/ebooks" },
      { name: "Templates", path: "/products/templates" },
      { name: "Toolkits", path: "/products/toolkits" }
    ],
    Company: [
      { name: "About", path: "/about" },
      { name: "Blog", path: "/blog" },
      { name: "Testimonials", path: "/testimonials" },
      { name: "Contact", path: "/contact" }
    ]
  };

  return (
    <footer 
      className="relative"
      style={{ 
        backgroundColor: "#194C63",
        color: "#F5FAFD"
      }}
    >
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Link to="/" className="flex items-center space-x-2">
                
                <div>
                  <span className="font-semibold text-xl">Roman Brenda</span>
                  <div 
                    className="h-0.5 w-6 mt-0.5"
                    style={{ backgroundColor: "#B3785A" }}
                  ></div>
                </div>
              </Link>
            </div>
            
           
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" style={{ color: "#B3785A" }} />
                <span>hello@romanbrendaviola.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" style={{ color: "#B3785A" }} />
                <span>+211 (921) 650-576</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" style={{ color: "#B3785A" }} />
                <span>Juba, South Sudan</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 
                className="font-bold text-lg mb-4"
                style={{ color: "#F5FAFD" }}
              >
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white hover:underline transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div 
          className="mt-12 pt-8 border-t"
          style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 
                className="font-semibold text-lg mb-2"
                style={{ color: "#F5FAFD" }}
              >
                Join Our Newsletter
              </h3>
              <p className="text-white/70 text-sm">
                Get career tips, HR insights, and exclusive offers delivered to your inbox.
              </p>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <div className="flex-1">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4" style={{ color: "#AAB6CB" }} />
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "#F5FAFD"
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90 flex items-center gap-2"
                style={{
                  backgroundColor: "#B3785A",
                  color: "#F5FAFD"
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div 
        className="py-6"
        style={{ 
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/60">
                © {new Date().getFullYear()} Brenda Viola. All rights reserved. Designed & Maintained by <a href="" className="text-white">Emmanuel Kerich</a>.
              </span>
              <Heart className="w-4 h-4" style={{ color: "#B3785A" }} />
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60">Follow us:</span>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/roman-brenda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#F5FAFD"
                  }}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#F5FAFD"
                  }}
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/254715589750"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#F5FAFD"
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm transition-all hover:opacity-90"
              style={{ color: "#F5FAFD" }}
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Booking CTA Bar */}
      <div 
        className="fixed bottom-0 left-0 right-0 transform translate-y-full transition-transform duration-300 hover:translate-y-0"
        style={{ 
          backgroundColor: "#B3785A",
          color: "#F5FAFD",
          zIndex: 40
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" />
              <div>
                <p className="font-medium">Ready to take the next step?</p>
                <p className="text-sm opacity-90">Book your consultation today</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="/contact"
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "#F5FAFD"
                }}
              >
                Contact Now
              </a>
              <a
                href="/contact"
                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  color: "#194C63"
                }}
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;