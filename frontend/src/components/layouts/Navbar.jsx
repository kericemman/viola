import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Calendar, Phone } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/product", label: "Products" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav 
        className="sticky top-0 z-50 w-full"
        style={{
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #D0DDEE",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
          }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2"
            >
              
              <div>
                <span 
                  className="font-semibold text-xl tracking-tight"
                  style={{ color: "#194C63" }}
                >
                  Roman Brenda
                </span>
                <div 
                  className="h-0.5 w-8 mt-0.5"
                  style={{ backgroundColor: "#B3785A" }}
                ></div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative font-medium transition-all duration-200 ${
                    isActive(item.path) ? "font-semibold" : "hover:opacity-80"
                  }`}
                  style={{ 
                    color: isActive(item.path) ? "#194C63" : "#3C637B"
                  }}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <div 
                      className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                      style={{ backgroundColor: "#B3785A" }}
                    ></div>
                  )}
                </Link>
              ))}
              
              {/* CTA Button */}
              <a
                href="https://calendly.com/hello-romanbrendaviola/30min"
                className="px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 flex items-center gap-2"
                style={{
                  backgroundColor: "#194C63",
                  color: "#F5FAFD"
                }}
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-all hover:opacity-80"
              style={{
                backgroundColor: "#F5FAFD",
                color: "#194C63"
              }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            className="md:hidden absolute top-16 left-0 right-0"
            style={{
              backgroundColor: "#FFFFFF",
              borderBottom: "1px solid #D0DDEE",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
            }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg transition-all ${
                    isActive(item.path) ? "font-semibold" : "hover:opacity-80"
                  }`}
                  style={{ 
                    color: isActive(item.path) ? "#194C63" : "#3C637B",
                    backgroundColor: isActive(item.path) ? "#F5FAFD" : "transparent"
                  }}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t" style={{ borderColor: "#D0DDEE" }}>
                <a href="https://calendly.com/hello-romanbrendaviola/30min"
                 
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full py-3 px-4 rounded-lg font-semibold text-center transition-all hover:opacity-90"
                  style={{
                    backgroundColor: "#194C63",
                    color: "#F5FAFD"
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </div>
                </a>
                
                <div className="flex items-center justify-center gap-2 mt-4 pt-2 border-t" style={{ borderColor: "#D0DDEE" }}>
                  <Phone className="w-4 h-4" style={{ color: "#B3785A" }} />
                  <span style={{ color: "#3C637B" }}>Call us: +211 (921) 650-576</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Decorative element */}
      <div 
        className="h-1 w-full"
        style={{ 
          background: "linear-gradient(90deg, #194C63 0%, #B3785A 50%, #194C63 100%)",
          opacity: 0.8
        }}
      ></div>
    </>
  );
};

export default Navbar;