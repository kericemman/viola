import { ChevronRight, Clock, DollarSign, Target } from "lucide-react";

const ServiceCard = ({ service }) => {
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'career coaching':
        return { bg: "rgba(25, 76, 99, 0.1)", text: "#194C63", border: "#194C63" };
      case 'hr consulting':
        return { bg: "rgba(179, 120, 90, 0.1)", text: "#B3785A", border: "#B3785A" };
      case 'personal development':
        return { bg: "rgba(60, 99, 123, 0.1)", text: "#3C637B", border: "#3C637B" };
      case 'leadership':
        return { bg: "rgba(116, 141, 176, 0.1)", text: "#748DB0", border: "#748DB0" };
      default:
        return { bg: "rgba(208, 221, 238, 0.2)", text: "#748DB0", border: "#D0DDEE" };
    }
  };

  const categoryColor = getCategoryColor(service.category);

  return (
    <div 
      className="group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #D0DDEE"
      }}
    >
      {/* Card Header with Gradient */}
      <div 
        className="p-6 border-b"
        style={{ 
          backgroundColor: "#F5FAFD",
          borderColor: "#D0DDEE"
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 
              className="text-xl font-bold mb-2 group-hover:text-opacity-90 transition-colors"
              style={{ color: "#194C63" }}
            >
              {service.title}
            </h3>
            
            {/* Category Badge */}
            {service.category && (
              <span 
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all group-hover:scale-105"
                style={{
                  backgroundColor: categoryColor.bg,
                  color: categoryColor.text,
                  border: `1px solid ${categoryColor.border}30`
                }}
              >
                <Target className="w-3 h-3" />
                {service.category}
              </span>
            )}
          </div>
          
          {/* Icon/Image Placeholder */}
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center ml-4 flex-shrink-0"
            style={{ backgroundColor: "rgba(25, 76, 99, 0.05)" }}
          >
            <ChevronRight className="w-5 h-5" style={{ color: "#194C63" }} />
          </div>
        </div>

        {/* Description */}
        <p 
          className="text-sm "
          style={{ color: "#3C637B" }}
        >
          {service.description}
        </p>
      </div>

      {/* Card Footer with Details */}
      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {service.duration && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded flex items-center justify-center"
                style={{ backgroundColor: "rgba(116, 141, 176, 0.1)" }}
              >
                <Clock className="w-4 h-4" style={{ color: "#748DB0" }} />
              </div>
              <div>
                <div className="text-xs" style={{ color: "#AAB6CB" }}>Duration</div>
                <div className="text-sm font-medium" style={{ color: "#0C0D14" }}>
                  {service.duration}
                </div>
              </div>
            </div>
          )}

          {service.price && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded flex items-center justify-center"
                style={{ backgroundColor: "rgba(179, 120, 90, 0.1)" }}
              >
                <DollarSign className="w-4 h-4" style={{ color: "#B3785A" }} />
              </div>
              <div>
                <div className="text-xs" style={{ color: "#AAB6CB" }}>Investment</div>
                <div className="text-sm font-medium" style={{ color: "#0C0D14" }}>
                  ${service.price}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features/Tags */}
        {service.features && service.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {service.features.slice(0, 3).map((feature, index) => (
              <span 
                key={index}
                className="px-2 py-1 rounded text-xs"
                style={{
                  backgroundColor: "#F5FAFD",
                  color: "#748DB0",
                  border: "1px solid #D0DDEE"
                }}
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <button
          className="w-full py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 hover:opacity-90 group-hover:shadow-md"
          style={{
            backgroundColor: "rgba(25, 76, 99, 0.05)",
            color: "#194C63",
            border: "1px solid rgba(25, 76, 99, 0.1)"
          }}
        >
          <div className="flex items-center justify-center gap-2">
            Learn More
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </button>
      </div>

      {/* Hover Border Effect */}
      <div 
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          border: "2px solid rgba(25, 76, 99, 0.1)",
          boxShadow: "0 0 0 1px rgba(25, 76, 99, 0.05) inset"
        }}
      />
    </div>
  );
};

export default ServiceCard;