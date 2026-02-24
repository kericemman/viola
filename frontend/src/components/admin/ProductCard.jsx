import { Link } from "react-router-dom";
import { ShoppingBag, Eye, Tag, Check } from "lucide-react";

const ProductCard = ({ product }) => {
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'physical':
        return { bg: "rgba(25, 76, 99, 0.1)", text: "#194C63", border: "#194C63" };
      case 'digital':
        return { bg: "rgba(179, 120, 90, 0.1)", text: "#B3785A", border: "#B3785A" };
      case 'service':
        return { bg: "rgba(60, 99, 123, 0.1)", text: "#3C637B", border: "#3C637B" };
      case 'course':
        return { bg: "rgba(116, 141, 176, 0.1)", text: "#748DB0", border: "#748DB0" };
      default:
        return { bg: "rgba(208, 221, 238, 0.2)", text: "#748DB0", border: "#D0DDEE" };
    }
  };

  const categoryColor = getCategoryColor(product.category);
  const features = Array.isArray(product.features) 
    ? product.features 
    : (product.features || '').split('\n').filter(f => f.trim());

  return (
    <div 
      className="group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #D0DDEE"
      }}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        {product.imageUrl ? (
          <div className="h-48 w-full overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div 
            className="h-48 w-full flex items-center justify-center"
            style={{ backgroundColor: "#F5FAFD" }}
          >
            <ShoppingBag className="w-12 h-12" style={{ color: "#D0DDEE" }} />
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span 
            className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
            style={{
              backgroundColor: categoryColor.bg,
              color: categoryColor.text,
              border: `1px solid ${categoryColor.border}30`
            }}
          >
            <Tag className="w-3 h-3" />
            {product.category || "Product"}
          </span>
        </div>

        {/* Stock Status */}
        <div className="absolute top-3 right-3">
          {product.stock !== undefined && product.stock > 0 ? (
            <span 
              className="px-2 py-1 rounded text-xs font-medium"
              style={{
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                color: "#16a34a"
              }}
            >
              {product.stock} in stock
            </span>
          ) : product.stock !== undefined && product.stock === 0 ? (
            <span 
              className="px-2 py-1 rounded text-xs font-medium"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444"
              }}
            >
              Out of stock
            </span>
          ) : (
            <span 
              className="px-2 py-1 rounded text-xs font-medium"
              style={{
                backgroundColor: "rgba(116, 141, 176, 0.1)",
                color: "#748DB0"
              }}
            >
              Available
            </span>
          )}
        </div>
      </div>

      {/* Product Content */}
      <div className="p-5">
        {/* Title and Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 
            className="font-bold text-lg group-hover:text-opacity-90 transition-colors"
            style={{ color: "#194C63" }}
          >
            {product.title}
          </h3>
          <div className="flex items-baseline gap-1">
            <span className="text-xs" style={{ color: "#748DB0" }}>$</span>
            <span 
              className="text-xl font-bold"
              style={{ color: "#B3785A" }}
            >
              {product.price}
            </span>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <p 
            className="text-sm mb-4 line-clamp-2"
            style={{ color: "#3C637B" }}
          >
            {product.description}
          </p>
        )}

        {/* Features */}
        {features.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium" style={{ color: "#194C63" }}>
                Key Features
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: "#D0DDEE" }}></div>
            </div>
            <div className="space-y-1">
              {features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: "#16a34a" }} />
                  <span className="text-xs" style={{ color: "#748DB0" }}>
                    {feature}
                  </span>
                </div>
              ))}
              {features.length > 3 && (
                <span className="text-xs italic" style={{ color: "#AAB6CB" }}>
                  +{features.length - 3} more features
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 border-t" style={{ borderColor: "#F5FAFD" }}>
          <Link
            to={`/products/${product._id}`}
            className="w-full py-3 rounded-lg font-medium transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 group-hover:shadow-md"
            style={{
              backgroundColor: "rgba(25, 76, 99, 0.05)",
              color: "#194C63",
              border: "1px solid rgba(25, 76, 99, 0.1)"
            }}
          >
            <Eye className="w-4 h-4" />
            View Details
          </Link>
        </div>
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

export default ProductCard;