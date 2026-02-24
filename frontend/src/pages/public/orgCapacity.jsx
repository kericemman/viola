import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  ArrowLeft, 
  Users, 
  Target, 
  Building2, 
  FileText, 
  TrendingUp,
  Shield,
  Clock,
  Calendar,
  Mail,
  Phone,
  MessageSquare,
  ChevronRight,
  Sparkles,
  BookOpen,
  Briefcase,
  Award,
  HelpCircle,
  X,
  AlertCircle,
  BarChart3,
  Layers,
  Compass
} from "lucide-react";
import api from "../../services/api";

const OrganizationalCapacityAssessment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    size: "",
    challenges: "",
    goals: "",
    timeline: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const inquiryData = {
        serviceId: "capacity-assessment",
        organizationName: formData.organizationName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone || null,
        size: formData.size || null,
        challenges: formData.challenges,
        goals: formData.goals,
        timeline: formData.timeline || null
      };

      const response = await api.post("/organization-inquiries", inquiryData);

      if (response.status === 200 || response.status === 201) {
        setSubmitStatus('success');
        
        setTimeout(() => {
          setShowContactForm(false);
          setSubmitStatus(null);
          setFormData({
            organizationName: "",
            contactPerson: "",
            email: "",
            phone: "",
            size: "",
            challenges: "",
            goals: "",
            timeline: ""
          });
        }, 2000);
      } else {
        throw new Error("Failed to submit inquiry");
      }
      
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const service = {
    id: "capacity-assessment",
    title: "Organizational Capacity Assessment",
    overview:
      "A structured institutional review that helps organizations understand their strengths, address gaps, and build a practical roadmap for sustainable growth. This assessment provides clarity on operational, structural, and strategic capacity needs.",
    scope: [
      "Governance and leadership structure review",
      "Operational systems and processes assessment",
      "Financial management and sustainability analysis",
      "Human resources capacity evaluation",
      "Program design and delivery effectiveness",
      "Monitoring and evaluation frameworks",
      "Strategic planning alignment"
    ],
    deliverables: [
      "Comprehensive capacity assessment report",
      "Strengths and gaps analysis",
      "Prioritized recommendations",
      "Customized capacity strengthening roadmap",
      "Implementation timeline with milestones",
      "Resource and budget considerations"
    ],
    outcome:
      "A clear understanding of organizational strengths and areas for growth, with a practical, phased roadmap to build sustainable capacity and achieve strategic objectives.",
    idealFor: [
      "Nonprofits seeking to strengthen operations",
      "Social enterprises scaling impact",
      "Community-based organizations",
      "Foundations assessing grantee capacity",
      "Organizations preparing for growth or transition"
    ],
    duration: "6-12 weeks (depending on organization size and scope)",
    approach: "Participatory, strengths-based, and tailored to your organization's context and goals"
  };

  const benefits = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Holistic Assessment",
      description: "Comprehensive review across all key organizational functions and systems"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Practical Roadmap",
      description: "Actionable, phased plan that respects your organization's capacity and resources"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Strengths-Based Approach",
      description: "Build on what's working while addressing critical gaps"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Sustainable Growth",
      description: "Lay the foundation for long-term organizational resilience and impact"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Discovery & Documentation Review",
      description: "Review of existing organizational documents, policies, and systems to establish baseline understanding.",
      icon: <FileText className="w-6 h-6" />
    },
    {
      step: 2,
      title: "Stakeholder Interviews & Surveys",
      description: "Engage leadership, staff, board, and key partners to gather diverse perspectives on organizational capacity.",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: 3,
      title: "Capacity Analysis & Gap Assessment",
      description: "Systematic analysis of findings to identify strengths, gaps, and priority areas for development.",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      step: 4,
      title: "Roadmap Development",
      description: "Co-create a practical, phased capacity strengthening plan with clear milestones and resource considerations.",
      icon: <Compass className="w-6 h-6" />
    }
  ];

  const assessmentAreas = [
    {
      area: "Governance & Leadership",
      items: ["Board structure and functionality", "Leadership succession planning", "Decision-making processes", "Strategic direction"]
    },
    {
      area: "Operations & Systems",
      items: ["Policies and procedures", "Administrative systems", "Technology infrastructure", "Risk management"]
    },
    {
      area: "Financial Management",
      items: ["Budgeting and planning", "Financial controls", "Sustainability planning", "Donor compliance"]
    },
    {
      area: "Human Resources",
      items: ["Staff structure and roles", "Performance management", "Professional development", "Culture and retention"]
    },
    {
      area: "Program Delivery",
      items: ["Program design and quality", "M&E systems", "Impact measurement", "Learning and adaptation"]
    },
    {
      area: "External Relations",
      items: ["Partnerships and networks", "Communications", "Fundraising capacity", "Stakeholder engagement"]
    }
  ];

  return (
    <>

      {/* Hero Section */}
      <div 
        className="relative overflow-hidden"
        style={{ backgroundColor: "#F5FAFD" }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute top-20 left-20 w-64 h-64 rounded-full"
            style={{ backgroundColor: "#194C63" }}
          />
          <div 
            className="absolute bottom-20 right-20 w-64 h-64 rounded-full"
            style={{ backgroundColor: "#B3785A" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-10">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm mb-8 transition-all hover:opacity-80"
            style={{ color: "#3C637B" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ 
                  backgroundColor: "rgba(179, 120, 90, 0.1)",
                  color: "#B3785A"
                }}
              >
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-semibold">Organization Services</span>
              </div>

              <h1 
                className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-6"
                style={{ color: "#194C63" }}
              >
                {service.title}
              </h1>

              <p 
                className="text-lg lg:text-xl mb-8 leading-relaxed"
                style={{ color: "#3C637B" }}
              >
                {service.overview}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div 
                  className="p-4 rounded-xl"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #D0DDEE"
                  }}
                >
                  <Clock className="w-5 h-5 mb-2" style={{ color: "#194C63" }} />
                  <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Duration</p>
                  <p className="text-sm font-semibold" style={{ color: "#194C63" }}>{service.duration}</p>
                </div>
                <div 
                  className="p-4 rounded-xl"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #D0DDEE"
                  }}
                >
                  <Users className="w-5 h-5 mb-2" style={{ color: "#B3785A" }} />
                  <p className="text-sm font-medium" style={{ color: "#748DB0" }}>For</p>
                  <p className="text-sm font-semibold" style={{ color: "#194C63" }}>Organizations</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="px-8 py-4 rounded-xl font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#194C63",
                    color: "#FFF"
                  }}
                >
                  <MessageSquare className="w-5 h-5" />
                  Request Assessment
                </button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  border: "2px solid #FFFFFF"
                }}
              >
                <img 
                  src="/assets/2.jpg"
                  alt="Organizational Capacity Assessment"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Floating Card */}
              <div 
                className="absolute -bottom-6 -left-6 p-4 rounded-xl shadow-lg backdrop-blur-sm max-w-[200px]"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #D0DDEE"
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4" style={{ color: "#16a34a" }} />
                  <span className="text-xs font-medium" style={{ color: "#194C63" }}>Organizations</span>
                </div>
                <p className="text-2xl font-bold" style={{ color: "#194C63" }}>5+</p>
                <p className="text-xs" style={{ color: "#748DB0" }}>Assessments completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-5 lg:py-10" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-2xl lg:text-3xl font-bold mb-4"
              style={{ color: "#194C63" }}
            >
              Why Conduct a Capacity Assessment?
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "#3C637B" }}
            >
              Understand where you are, where you want to go, and how to get there
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-xl transition-all hover:shadow-lg"
                style={{
                  backgroundColor: "#F5FAFD",
                  border: "1px solid #D0DDEE"
                }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(25, 76, 99, 0.1)" }}
                >
                  <div style={{ color: "#194C63" }}>{benefit.icon}</div>
                </div>
                <h3 className="font-bold mb-2" style={{ color: "#194C63" }}>{benefit.title}</h3>
                <p className="text-sm" style={{ color: "#3C637B" }}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Areas Grid */}
      <section className="py-5 lg:py-10" style={{ backgroundColor: "#F5FAFD" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-2xl lg:text-3xl font-bold mb-4"
              style={{ color: "#194C63" }}
            >
              What We Assess
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "#3C637B" }}
            >
              A comprehensive review across all key organizational functions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessmentAreas.map((area, index) => (
              <div
                key={index}
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D0DDEE"
                }}
              >
                <h3 className="font-bold text-lg mb-4" style={{ color: "#194C63" }}>{area.area}</h3>
                <ul className="space-y-2">
                  {area.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#16a34a" }} />
                      <span className="text-sm" style={{ color: "#3C637B" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope Section */}
      <section className="py-5 lg:py-10" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - What We Cover */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <h2 
                  className="text-2xl lg:text-3xl font-bold"
                  style={{ color: "#194C63" }}
                >
                  Assessment Scope
                </h2>
              </div>

              <div className="space-y-4">
                {service.scope.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#16a34a" }} />
                    <span style={{ color: "#3C637B" }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Ideal For */}
              <div className="mt-8">
                <h3 className="font-bold mb-4" style={{ color: "#194C63" }}>Ideal For:</h3>
                <div className="flex flex-wrap gap-2">
                  {service.idealFor.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: "rgba(179, 120, 90, 0.1)",
                        color: "#B3785A"
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              <img 
                src="/assets/10.jpg"
                alt="Organizational Assessment Session"
                className="rounded-2xl shadow-xl w-full md:h-[400px] h-auto"
              />
              <div 
                className="absolute -top-4 -right-4 p-4 rounded-xl"
                style={{
                  backgroundColor: "#194C63",
                  color: "#F5FAFD"
                }}
              >
                <Layers className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables & Process */}
      <section className="py-5 lg:py-10" style={{ backgroundColor: "#F5FAFD" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Deliverables Card */}
            <div 
              className="lg:col-span-1 p-8 rounded-2xl"
              style={{
                backgroundColor: "#194C63",
                backgroundImage: "radial-gradient(circle at 20% 80%, rgba(179, 120, 90, 0.2) 0%, transparent 50%)"
              }}
            >
              <h3 className="text-xl font-bold mb-6 text-white">Deliverables</h3>
              <div className="space-y-4">
                {service.deliverables.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-white/80" />
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Timeline */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl lg:text-3xl font-bold mb-8" style={{ color: "#194C63" }}>
                Our Assessment Process
              </h2>
              <div className="space-y-4">
                {process.map((step) => (
                  <div
                    key={step.step}
                    className="flex gap-4 p-4 rounded-xl"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #D0DDEE"
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(25, 76, 99, 0.1)" }}
                    >
                      <span className="font-bold" style={{ color: "#194C63" }}>{step.step}</span>
                    </div>
                    <div>
                      <h3 className="font-bold mb-1" style={{ color: "#194C63" }}>{step.title}</h3>
                      <p className="text-sm" style={{ color: "#3C637B" }}>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcome Section */}
      <section 
        className="py-5 lg:py-10 relative overflow-hidden"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-6" style={{ color: "#B3785A" }} />
          <h2 
            className="text-2xl lg:text-3xl font-bold mb-6"
            style={{ color: "#194C63" }}
          >
            The Outcome
          </h2>
          <p 
            className="text-xl lg:text-2xl leading-relaxed"
            style={{ color: "#3C637B" }}
          >
            "{service.outcome}"
          </p>
        </div>
      </section>

      {/* Inquiry Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              if (!isSubmitting) {
                setShowContactForm(false);
                setSubmitStatus(null);
              }
            }}
          />
          
          {/* Modal */}
          <div 
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl animate-slide-up"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
          >
            {/* Sticky Header */}
            <div 
              className="sticky top-0 z-10 p-6 border-b bg-white"
              style={{ borderColor: "#D0DDEE" }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold" style={{ color: "#194C63" }}>
                    Request Capacity Assessment
                  </h2>
                  <p className="text-sm mt-1" style={{ color: "#3C637B" }}>
                    For: Organizational Capacity Assessment
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (!isSubmitting) {
                      setShowContactForm(false);
                      setSubmitStatus(null);
                    }
                  }}
                  disabled={isSubmitting}
                  className="p-2 rounded-lg transition-all hover:opacity-80 disabled:opacity-50"
                  style={{
                    backgroundColor: "#F5FAFD",
                    color: "#3C637B"
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div 
                className="m-6 p-4 rounded-lg flex items-center gap-3 animate-fade-in"
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid rgba(34, 197, 94, 0.3)"
                }}
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#16a34a" }} />
                <div>
                  <p className="font-medium" style={{ color: "#16a34a" }}>
                    Request Submitted Successfully!
                  </p>
                  <p className="text-sm mt-1" style={{ color: "#3C637B" }}>
                    We'll contact you within 2 business days.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div 
                className="m-6 p-4 rounded-lg flex items-center gap-3 animate-fade-in"
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)"
                }}
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#ef4444" }} />
                <div>
                  <p className="font-medium" style={{ color: "#ef4444" }}>
                    Something Went Wrong
                  </p>
                  <p className="text-sm mt-1" style={{ color: "#3C637B" }}>
                    Please try again or contact us directly.
                  </p>
                </div>
              </div>
            )}

            {/* Scrollable Form */}
            <div className="p-6 pt-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Organization Name */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                    Organization Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="Your organization name"
                    required
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #AAB6CB",
                      color: "#0C0D14"
                    }}
                  />
                </div>

                {/* Contact Person */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                    Contact Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #AAB6CB",
                      color: "#0C0D14"
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #AAB6CB",
                      color: "#0C0D14"
                    }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (234) 567-8900"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #AAB6CB",
                      color: "#0C0D14"
                    }}
                  />
                </div>

                {/* Organization Size */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                    Organization Size
                  </label>
                  <input
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="e.g., 10-50 employees"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #AAB6CB",
                      color: "#0C0D14"
                    }}
                  />
                </div>

                {/* Current Challenges */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                    Current Challenges <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="challenges"
                    value={formData.challenges}
                    onChange={handleChange}
                    placeholder="What challenges is your organization facing?"
                    required
                    rows="3"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #AAB6CB",
                      color: "#0C0D14"
                    }}
                  />
                </div>

                {/* Goals & Expectations */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                    Goals & Expectations <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    placeholder="What do you hope to achieve through this assessment?"
                    required
                    rows="3"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #AAB6CB",
                      color: "#0C0D14"
                    }}
                  />
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                    Proposed Timeline
                  </label>
                  <input
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    placeholder="e.g., Next quarter, within 3 months"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #AAB6CB",
                      color: "#0C0D14"
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: "#194C63",
                      color: "#F5FAFD"
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Submitted Successfully
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-5 h-5" />
                        Request Assessment
                      </>
                    )}
                  </button>
                </div>

                {/* Required Fields Note */}
                <p className="text-xs text-center" style={{ color: "#748DB0" }}>
                  <span className="text-red-500">*</span> Required fields
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

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
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default OrganizationalCapacityAssessment;