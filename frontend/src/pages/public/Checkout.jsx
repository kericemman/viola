import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../services/api";
import { 
  User, 
  Mail, 
  Phone, 
  AlertCircle, 
  CheckCircle, 
  ArrowLeft,
  CreditCard,
  Calendar,
  Shield,
  Lock,
  ChevronRight,
  Sparkles,
  HelpCircle,
  FileText,
  Target,
  XCircle,
  Clock,
  MailCheck
} from "lucide-react";

const Checkout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { cartItem, clearCart } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    challenges: "",
    goals: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [payLaterSuccess, setPayLaterSuccess] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'failure', 'pending'
  const [orderDetails, setOrderDetails] = useState(null);

  // Check for payment callback
  useEffect(() => {
    const reference = searchParams.get('reference');
    const status = searchParams.get('status');
    const trxref = searchParams.get('trxref');
    
    if (reference || trxref) {
      verifyPayment(reference || trxref, status);
    }
  }, [searchParams]);

  const verifyPayment = async (reference, status) => {
    setIsSubmitting(true);
    try {
      // Verify payment with backend
      const { data } = await api.get(`/payments/verify/${reference}`);
      
      if (data.status === 'success' || status === 'success') {
        setPaymentStatus('success');
        setOrderDetails(data.order);
        clearCart();
      } else {
        setPaymentStatus('failure');
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setPaymentStatus('failure');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cartItem && !paymentStatus) {
    return (
      <div className="min-h-screen bg-[#F5FAFD] flex items-center justify-center p-4">
        <div 
          className="max-w-md w-full p-8 rounded-2xl text-center"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D0DDEE"
          }}
        >
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#F5FAFD" }}>
            <HelpCircle className="w-8 h-8" style={{ color: "#AAB6CB" }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: "#194C63" }}>No Service Selected</h2>
          <p className="mb-6" style={{ color: "#3C637B" }}>Please select a service to continue with checkout.</p>
          <button
            onClick={() => navigate("/services")}
            className="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
            style={{
              backgroundColor: "#194C63",
              color: "#F5FAFD"
            }}
          >
            Browse Services
          </button>
        </div>
      </div>
    );
  }

  // Payment Success View
  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-[#F5FAFD] flex items-center justify-center p-4">
        <div 
          className="max-w-md w-full p-8 rounded-2xl text-center"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D0DDEE"
          }}
        >
          <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}>
            <CheckCircle className="w-10 h-10" style={{ color: "#16a34a" }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#194C63" }}>Payment Successful! 🎉</h2>
          <p className="mb-4" style={{ color: "#3C637B" }}>
            Thank you for your payment. Your booking is confirmed.
          </p>
          
          {orderDetails && (
            <div 
              className="p-4 rounded-lg mb-6 text-left"
              style={{ backgroundColor: "#F5FAFD" }}
            >
              <p className="text-sm font-medium mb-2" style={{ color: "#194C63" }}>Order Details:</p>
              <p className="text-xs mb-1" style={{ color: "#3C637B" }}>Reference: {orderDetails.transactionRef}</p>
              <p className="text-xs" style={{ color: "#3C637B" }}>A confirmation email has been sent to your inbox.</p>
            </div>
          )}
          
          <div className="space-y-3">
            <button
              onClick={() => navigate("/services")}
              className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{
                backgroundColor: "#194C63",
                color: "#F5FAFD"
              }}
            >
              Browse More Services
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{
                backgroundColor: "#FFFFFF",
                border: "2px solid #D0DDEE",
                color: "#3C637B"
              }}
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Payment Failure View
  if (paymentStatus === 'failure') {
    return (
      <div className="min-h-screen bg-[#F5FAFD] flex items-center justify-center p-4">
        <div 
          className="max-w-md w-full p-8 rounded-2xl text-center"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D0DDEE"
          }}
        >
          <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}>
            <XCircle className="w-10 h-10" style={{ color: "#ef4444" }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#194C63" }}>Payment Failed</h2>
          <p className="mb-4" style={{ color: "#3C637B" }}>
            We couldn't process your payment. Please try again or use a different payment method.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate(`/checkout?retry=${cartItem?.id}`)}
              className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{
                backgroundColor: "#194C63",
                color: "#F5FAFD"
              }}
            >
              Try Again
            </button>
            <button
              onClick={() => handlePayment(true)}
              className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{
                backgroundColor: "#FFFFFF",
                border: "2px solid #D0DDEE",
                color: "#3C637B"
              }}
            >
              Pay Later Instead
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Payment Pending View (for verification in progress)
  if (isSubmitting && paymentStatus === null && searchParams.get('reference')) {
    return (
      <div className="min-h-screen bg-[#F5FAFD] flex items-center justify-center p-4">
        <div 
          className="max-w-md w-full p-8 rounded-2xl text-center"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D0DDEE"
          }}
        >
          <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(234, 179, 8, 0.1)" }}>
            <Clock className="w-10 h-10" style={{ color: "#ca8a04" }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#194C63" }}>Verifying Payment</h2>
          <p className="mb-4" style={{ color: "#3C637B" }}>
            Please wait while we confirm your payment. This may take a few moments.
          </p>
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#194C63" }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Pay Later Success View
  if (payLaterSuccess) {
    return (
      <div className="min-h-screen bg-[#F5FAFD] flex items-center justify-center p-4">
        <div 
          className="max-w-md w-full p-8 rounded-2xl text-center"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D0DDEE"
          }}
        >
          <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}>
            <MailCheck className="w-10 h-10" style={{ color: "#16a34a" }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#194C63" }}>Booking Confirmed!</h2>
          <p className="mb-4" style={{ color: "#3C637B" }}>
            Your service request has been received. Payment instructions will be sent to your email shortly.
          </p>
          <p className="text-sm mb-6" style={{ color: "#748DB0" }}>
            Redirecting to services page...
          </p>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!form.challenges.trim()) {
      newErrors.challenges = "Please describe your current challenges";
    }
    
    if (!form.goals.trim()) {
      newErrors.goals = "Please share your goals and expectations";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handlePayment = async (payLater = false) => {
    if (!payLater && !validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // 1️⃣ Create order
      const { data: order } = await api.post("/individual-orders", {
        ...form,
        serviceId: cartItem.id,
        serviceTitle: cartItem.title,
        price: cartItem.price,
        paymentStatus: payLater ? "pay_later" : "pending"
      });

      if (payLater) {
        clearCart();
        setPayLaterSuccess(true);
        setIsSubmitting(false);
        
        // Auto redirect after 3 seconds
        setTimeout(() => {
          navigate("/services");
        }, 3000);
        return;
      }

      // 2️⃣ Initialize Paystack with callback URLs
      const { data } = await api.post("/payments/initialize", {
        email: form.email,
        amount: cartItem.price,
        reference: order.transactionRef,
        callback_url: `${window.location.origin}/checkout?reference=${order.transactionRef}`,
        metadata: {
          orderId: order._id,
          customerName: form.name,
          serviceTitle: cartItem.title
        }
      });

      // Redirect to Paystack
      window.location.href = data.authorization_url;
    } catch (error) {
      console.error("Checkout error:", error);
      setErrors({ 
        submit: "Something went wrong. Please try again or contact support." 
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FAFD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm mb-8 transition-all hover:opacity-80"
          style={{ color: "#3C637B" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Checkout Form */}
          <div className="lg:col-span-2">
            <div 
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D0DDEE"
              }}
            >
              {/* Header */}
              <div 
                className="p-6 border-b"
                style={{ 
                  backgroundColor: "#F5FAFD",
                  borderColor: "#D0DDEE"
                }}
              >
                <h1 className="text-2xl font-bold" style={{ color: "#194C63" }}>
                  Complete Your Booking
                </h1>
                <p className="mt-1" style={{ color: "#3C637B" }}>
                  Please provide your information to proceed
                </p>
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="m-6 p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}>
                  <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#ef4444" }} />
                  <p className="text-sm" style={{ color: "#ef4444" }}>{errors.submit}</p>
                </div>
              )}

              {/* Form */}
              <form className="p-6 space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: "#194C63" }}>
                    <User className="w-5 h-5" />
                    Personal Information
                  </h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4" style={{ color: "#AAB6CB" }} />
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={`w-full pl-10 p-3 rounded focus:outline-none focus:ring-2 transition-all ${
                            errors.name ? 'ring-2 ring-red-500' : ''
                          }`}
                          style={{
                            backgroundColor: "#F5FAFD",
                            border: errors.name ? "1px solid #ef4444" : "1px solid #AAB6CB",
                            color: "#0C0D14"
                          }}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4" style={{ color: "#AAB6CB" }} />
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={`w-full pl-10 p-3 rounded focus:outline-none focus:ring-2 transition-all ${
                            errors.email ? 'ring-2 ring-red-500' : ''
                          }`}
                          style={{
                            backgroundColor: "#F5FAFD",
                            border: errors.email ? "1px solid #ef4444" : "1px solid #AAB6CB",
                            color: "#0C0D14"
                          }}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.email}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                        Phone (Optional)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4" style={{ color: "#AAB6CB" }} />
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+1 (234) 567-8900"
                          className="w-full pl-10 p-3 rounded focus:outline-none focus:ring-2 transition-all"
                          style={{
                            backgroundColor: "#F5FAFD",
                            border: "1px solid #AAB6CB",
                            color: "#0C0D14"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="pt-4 border-t" style={{ borderColor: "#D0DDEE" }}>
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: "#194C63" }}>
                    <FileText className="w-5 h-5" />
                    Service Information
                  </h2>

                  <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: "#F5FAFD" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="w-5 h-5" style={{ color: "#B3785A" }} />
                      <div>
                        <p className="font-medium" style={{ color: "#194C63" }}>{cartItem.title}</p>
                        <p className="text-sm" style={{ color: "#3C637B" }}>Selected Service</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Intake Questions */}
                <div className="pt-4 border-t" style={{ borderColor: "#D0DDEE" }}>
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: "#194C63" }}>
                    <Target className="w-5 h-5" />
                    Your Goals & Challenges
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                        Current Challenges <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="challenges"
                        value={form.challenges}
                        onChange={handleChange}
                        placeholder="What challenges are you currently facing?"
                        rows="3"
                        className={`w-full p-3 rounded focus:outline-none focus:ring-2 transition-all ${
                          errors.challenges ? 'ring-2 ring-red-500' : ''
                        }`}
                        style={{
                          backgroundColor: "#F5FAFD",
                          border: errors.challenges ? "1px solid #ef4444" : "1px solid #AAB6CB",
                          color: "#0C0D14"
                        }}
                      />
                      {errors.challenges && (
                        <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.challenges}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                        Goals & Expectations <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="goals"
                        value={form.goals}
                        onChange={handleChange}
                        placeholder="What do you hope to achieve?"
                        rows="3"
                        className={`w-full p-3 rounded focus:outline-none focus:ring-2 transition-all ${
                          errors.goals ? 'ring-2 ring-red-500' : ''
                        }`}
                        style={{
                          backgroundColor: "#F5FAFD",
                          border: errors.goals ? "1px solid #ef4444" : "1px solid #AAB6CB",
                          color: "#0C0D14"
                        }}
                      />
                      {errors.goals && (
                        <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.goals}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Security Note */}
                <div className="pt-4 border-t" style={{ borderColor: "#D0DDEE" }}>
                  <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: "#F5FAFD" }}>
                    <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#16a34a" }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#194C63" }}>Secure Checkout</p>
                      <p className="text-xs mt-1" style={{ color: "#748DB0" }}>
                        Your information is encrypted and secure. We use Paystack for safe payment processing.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div 
              className="rounded-2xl overflow-hidden sticky top-6"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D0DDEE"
              }}
            >
              {/* Summary Header */}
              <div 
                className="p-6 border-b"
                style={{ 
                  backgroundColor: "#F5FAFD",
                  borderColor: "#D0DDEE"
                }}
              >
                <h2 className="text-lg font-semibold" style={{ color: "#194C63" }}>
                  Order Summary
                </h2>
              </div>

              {/* Service Details */}
              <div className="p-6 border-b" style={{ borderColor: "#D0DDEE" }}>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span style={{ color: "#3C637B" }}>Service</span>
                    <span className="font-medium" style={{ color: "#194C63" }}>{cartItem.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#3C637B" }}>Price</span>
                    <span className="font-bold text-lg" style={{ color: "#B3785A" }}>KES {cartItem.price}</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="p-6 border-b" style={{ borderColor: "#D0DDEE" }}>
                <div className="flex justify-between items-center">
                  <span className="font-semibold" style={{ color: "#194C63" }}>Total</span>
                  <span className="text-2xl font-bold" style={{ color: "#194C63" }}>KES {cartItem.price}</span>
                </div>
              </div>

              {/* Payment Options */}
              <div className="p-6 space-y-4">
                <button
                  onClick={() => handlePayment(false)}
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-semibold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#194C63",
                    color: "#F5FAFD"
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay Now (KES {cartItem.price})
                    </>
                  )}
                </button>

                <button
                  onClick={() => handlePayment(true)}
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-semibold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "2px solid #D0DDEE",
                    color: "#3C637B"
                  }}
                >
                  <Calendar className="w-5 h-5" />
                  Pay Later
                </button>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <Lock className="w-4 h-4" style={{ color: "#748DB0" }} />
                  <span className="text-xs" style={{ color: "#748DB0" }}>Secure payment via Paystack</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="px-6 pb-6">
                <div className="flex items-center justify-center gap-2">
                  <img src="/assets/paystack.png" alt="Paystack" className="h-6" />
                  <span className="text-xs" style={{ color: "#AAB6CB" }}>|</span>
                  <span className="text-xs" style={{ color: "#AAB6CB" }}>Visa, Mastercard, Verve</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Checkout;