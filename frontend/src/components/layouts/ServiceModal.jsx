import { useState } from "react";
import api from "../../services/api";
import { 
  X, 
  DollarSign, 
  User, 
  Mail, 
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  FileText,
  Calendar,
  Phone,
  Upload,
  Lock
} from "lucide-react";

const ServiceModal = ({ service, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.fullName || formData.fullName.trim() === "") {
      newErrors.fullName = "Full name is required";
    }

    // Validate email
    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate intake fields
    service.intakeFields?.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }

      // Email field validation within intake fields
      if (field.type === 'email' && formData[field.name] && 
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.name])) {
        newErrors[field.name] = 'Please enter a valid email address';
      }

      // Phone validation
      if (field.type === 'tel' && formData[field.name] && 
          !/^[\d\s\+\-\(\)]{10,}$/.test(formData[field.name])) {
        newErrors[field.name] = 'Please enter a valid phone number';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // 🔵 CUSTOM SERVICE → STORE REQUEST
      if (service.type === "custom") {
        await api.post("/service-requests", {
          serviceId: service._id,
          serviceTitle: service.title,
          customerName: formData.fullName,
          customerEmail: formData.email,
          responses: formData,
        });

        alert("Your request has been submitted successfully. We'll contact you within 24 hours.");
        onClose();
      }

      // 🟢 FIXED SERVICE → SEPARATE PAYSTACK FLOW
      if (service.type === "fixed") {
        const { data } = await api.post(
          "/service-payments/initialize",
          {
            serviceId: service._id,
            serviceTitle: service.title,
            amount: service.price,

            customerName: formData.fullName,
            customerEmail: formData.email,

            intakeResponses: formData,
          }
        );

        // Redirect to Paystack
        window.location.href = data.authorization_url;
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    const hasError = errors[field.name];
    
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            required={field.required}
            onChange={handleChange}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            rows={4}
            className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
              hasError ? 'ring-2 ring-red-500' : ''
            }`}
            style={{
              backgroundColor: "#F5FAFD",
              border: hasError ? "1px solid #ef4444" : "1px solid #AAB6CB",
              color: "#0C0D14"
            }}
          />
        );
        
      case 'select':
        return (
          <select
            name={field.name}
            required={field.required}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
              hasError ? 'ring-2 ring-red-500' : ''
            }`}
            style={{
              backgroundColor: "#F5FAFD",
              border: hasError ? "1px solid #ef4444" : "1px solid #AAB6CB",
              color: "#0C0D14"
            }}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
        
      case 'file':
        return (
          <div className="space-y-2">
            <div className="relative">
              <input
                type="file"
                name={field.name}
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.jpg,.png"
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium hover:file:opacity-90"
                style={{
                  color: "#0C0D14"
                }}
              />
            </div>
            <p className="text-xs" style={{ color: "#748DB0" }}>
              Accepted: PDF, DOC, JPG, PNG (Max 5MB)
            </p>
          </div>
        );
        
      case 'tel':
        return (
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5" style={{ color: "#AAB6CB" }} />
            <input
              type="tel"
              name={field.name}
              required={field.required}
              placeholder={field.placeholder || "+1234567890"}
              onChange={handleChange}
              className={`w-full pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                hasError ? 'ring-2 ring-red-500' : ''
              }`}
              style={{
                backgroundColor: "#F5FAFD",
                border: hasError ? "1px solid #ef4444" : "1px solid #AAB6CB",
                color: "#0C0D14"
              }}
            />
          </div>
        );
        
      case 'date':
        return (
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5" style={{ color: "#AAB6CB" }} />
            <input
              type="date"
              name={field.name}
              required={field.required}
              onChange={handleChange}
              className={`w-full pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                hasError ? 'ring-2 ring-red-500' : ''
              }`}
              style={{
                backgroundColor: "#F5FAFD",
                border: hasError ? "1px solid #ef4444" : "1px solid #AAB6CB",
                color: "#0C0D14"
              }}
            />
          </div>
        );
        
      default:
        return (
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5" style={{ color: "#AAB6CB" }} />
            <input
              type={field.type || "text"}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
              onChange={handleChange}
              className={`w-full pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                hasError ? 'ring-2 ring-red-500' : ''
              }`}
              style={{
                backgroundColor: "#F5FAFD",
                border: hasError ? "1px solid #ef4444" : "1px solid #AAB6CB",
                color: "#0C0D14"
              }}
            />
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl max-h-[90vh] overflow-hidden animate-slide-up"
        style={{
          border: "1px solid #D0DDEE",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
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
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ 
                  backgroundColor: "rgba(25, 76, 99, 0.1)",
                  color: "#194C63"
                }}
              >
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1" style={{ color: "#194C63" }}>
                  {service.title}
                </h2>
                {service.duration && (
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" style={{ color: "#748DB0" }} />
                      <span className="text-sm" style={{ color: "#3C637B" }}>
                        {service.duration}
                      </span>
                    </div>
                    {service.type === "fixed" && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" style={{ color: "#194C63" }} />
                        <span className="text-lg font-bold" style={{ color: "#194C63" }}>
                          ${service.price}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-all hover:opacity-80"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D0DDEE",
                color: "#3C637B"
              }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Description */}
          {service.description && (
            <div className="mb-6">
              <p style={{ color: "#3C637B" }}>{service.description}</p>
            </div>
          )}

          {/* Features */}
          {service.features && service.features.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3" style={{ color: "#194C63" }}>
                What's included
              </h3>
              <div className="space-y-2">
                {service.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#16a34a" }} />
                    <span style={{ color: "#3C637B" }}>{feature}</span>
                  </div>
                ))}
                {service.features.length > 4 && (
                  <p className="text-sm" style={{ color: "#748DB0" }}>
                    +{service.features.length - 4} more features
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-semibold" style={{ color: "#194C63" }}>
              Your Information
            </h3>

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5" style={{ color: "#AAB6CB" }} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName ? 'ring-2 ring-red-500' : ''
                  }`}
                  style={{
                    backgroundColor: "#F5FAFD",
                    border: errors.fullName ? "1px solid #ef4444" : "1px solid #AAB6CB",
                    color: "#0C0D14"
                  }}
                />
              </div>
              {errors.fullName && (
                <p className="text-sm mt-1 flex items-center gap-1" style={{ color: "#ef4444" }}>
                  <AlertCircle className="w-4 h-4" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5" style={{ color: "#AAB6CB" }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
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
                <p className="text-sm mt-1 flex items-center gap-1" style={{ color: "#ef4444" }}>
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Intake Fields */}
            {service.intakeFields && service.intakeFields.length > 0 && (
              <>
                <h3 className="font-semibold pt-4" style={{ color: "#194C63" }}>
                  Additional Information
                </h3>
                {service.intakeFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>

                    {renderField(field)}
                    
                    {errors[field.name] && (
                      <p className="text-sm mt-1 flex items-center gap-1" style={{ color: "#ef4444" }}>
                        <AlertCircle className="w-4 h-4" />
                        {errors[field.name]}
                      </p>
                    )}

                    {field.helpText && (
                      <p className="text-xs mt-1" style={{ color: "#748DB0" }}>
                        {field.helpText}
                      </p>
                    )}
                  </div>
                ))}
              </>
            )}

            {/* Payment Notice for Fixed Services */}
            {service.type === "fixed" && (
              <div 
                className="p-4 rounded-lg mt-4"
                style={{ backgroundColor: "rgba(25, 76, 99, 0.05)" }}
              >
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 mt-0.5" style={{ color: "#194C63" }} />
                  <div>
                    <p className="font-medium mb-1" style={{ color: "#194C63" }}>
                      Secure Payment via Paystack
                    </p>
                    <p className="text-sm" style={{ color: "#3C637B" }}>
                      You'll be redirected to our secure payment page to complete your booking.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <img src="https://paystack.com/assets/img/logo.svg" alt="Paystack" className="h-6" />
                      <div className="flex items-center gap-1">
                        <Lock className="w-3 h-3" style={{ color: "#16a34a" }} />
                        <span className="text-xs" style={{ color: "#16a34a" }}>256-bit SSL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              style={{
                backgroundColor: service.type === "fixed" ? "#194C63" : "#B3785A",
                color: "#F5FAFD"
              }}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  {service.type === "fixed" ? "Proceed to Payment" : "Submit Request"}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Disclaimer */}
            <p className="text-xs text-center mt-4" style={{ color: "#748DB0" }}>
              By proceeding, you agree to our{" "}
              <a href="/terms" className="underline hover:no-underline">Terms of Service</a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:no-underline">Privacy Policy</a>.
            </p>
          </form>
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

export default ServiceModal;