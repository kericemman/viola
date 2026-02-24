import { useState, useEffect } from "react";
import api from "../../services/api";
import { Mail, X, ChevronUp, Bell } from "lucide-react";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMiniBar, setShowMiniBar] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed before
    const hasDismissed = localStorage.getItem("newsletterDismissed");
    const hasSubscribed = localStorage.getItem("newsletterSubscribed");
    
    // Show modal after 3 seconds if not dismissed or subscribed
    const timer = setTimeout(() => {
      if (!hasDismissed && !hasSubscribed) {
        setShowModal(true);
      }
    }, 3000);

    // Show mini bar after modal is dismissed
    if (hasDismissed && !hasSubscribed) {
      setShowMiniBar(true);
    }

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await api.post("/newsletter/subscribe", { email });
      setSuccess(true);
      setEmail("");
      
      // Store subscription in localStorage
      localStorage.setItem("newsletterSubscribed", "true");
      localStorage.removeItem("newsletterDismissed");
      
      // Hide both modal and mini bar
      setTimeout(() => {
        setShowModal(false);
        setShowMiniBar(false);
      }, 2000);
    } catch (error) {
      console.error("Subscription failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDismiss = () => {
    setShowModal(false);
    setDismissed(true);
    localStorage.setItem("newsletterDismissed", "true");
    
    // Show mini bar after 2 seconds
    setTimeout(() => {
      if (!localStorage.getItem("newsletterSubscribed")) {
        setShowMiniBar(true);
      }
    }, 2000);
  };

  const expandMiniBar = () => {
    setShowMiniBar(false);
    setShowModal(true);
  };

  return (
    <>
      {/* Full Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleDismiss}
          />
          
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-md rounded-2xl animate-fade-in"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute right-4 top-4 p-2 rounded-full transition-all hover:opacity-80"
              style={{
                backgroundColor: "#F5FAFD",
                color: "#3C637B"
              }}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ 
                    backgroundColor: "rgba(179, 120, 90, 0.1)",
                    color: "#B3785A"
                  }}
                >
                  <Mail className="w-8 h-8" />
                </div>
                
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{ color: "#194C63" }}
                >
                  VBR Newsletter
                </h3>
                
                <p style={{ color: "#3C637B" }}>
                  Get career insights, HR tips, and exclusive content delivered to your inbox.
                </p>
              </div>

              {/* Form or Success Message */}
              {success ? (
                <div 
                  className="p-4 rounded-xl text-center"
                  style={{
                    backgroundColor: "rgba(34, 197, 94, 0.1)",
                    border: "1px solid rgba(34, 197, 94, 0.3)"
                  }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#16a34a" }}>
                      <span className="text-white font-bold">✓</span>
                    </div>
                  </div>
                  <p className="font-medium" style={{ color: "#16a34a" }}>
                    You're subscribed! 🎉
                  </p>
                  <p className="text-sm mt-1" style={{ color: "#3C637B" }}>
                    Look out for our first email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                      Your Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5" style={{ color: "#AAB6CB" }} />
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="w-full pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                        style={{
                          backgroundColor: "#F5FAFD",
                          border: "1px solid #AAB6CB",
                          color: "#0C0D14"
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || !email}
                    className="w-full py-3 rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: "#194C63",
                      color: "#F5FAFD"
                    }}
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe Now
                        <ChevronUp className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Privacy Note */}
              <p className="text-xs text-center mt-6" style={{ color: "#748DB0" }}>
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mini Notification Bar */}
      {showMiniBar && !showModal && (
        <div 
          className="fixed bottom-4 right-4 z-40 animate-slide-up"
          style={{
            backgroundColor: "#194C63",
            color: "#F5FAFD",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
          }}
        >
          <div className="p-3">
            {/* Collapsed State */}
            <button
              onClick={expandMiniBar}
              className="flex items-center gap-3 p-2 rounded-lg transition-all hover:opacity-90"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }}
            >
              <div className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ backgroundColor: "#B3785A" }}></div>
              </div>
              <span className="text-sm font-medium">Get Updates</span>
            </button>

            {/* Expanded State (on hover) */}
            <div className="absolute bottom-full right-0 mb-2 w-64 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
              <div 
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D0DDEE",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                }}
              >
                <p className="text-sm mb-2" style={{ color: "#194C63" }}>
                  Don't miss out on career tips and insights!
                </p>
                <button
                  onClick={expandMiniBar}
                  className="w-full py-2 text-sm rounded-lg font-medium transition-all hover:opacity-90"
                  style={{
                    backgroundColor: "#194C63",
                    color: "#F5FAFD"
                  }}
                >
                  Subscribe to Newsletter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default NewsletterForm;