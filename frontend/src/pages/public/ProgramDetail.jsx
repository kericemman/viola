import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../services/product.service";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Check, 
  Star, 
  Clock, 
  Package, 
  Truck, 
  Shield, 
  Heart, 
  Share2,
  Tag,
  DollarSign,
  Calendar,
  Users,
  ChevronRight
} from "lucide-react";


const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const data = await getProductById(id);
      setProduct(data);
      
      // Set selected image to first image
      if (data.images && data.images.length > 0) {
        setSelectedImage(0);
      }
      
      // Fetch related products (simulated)
      setRelatedProducts([
        { id: 1, title: "Advanced HR Toolkit", price: 89, category: "digital", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400" },
        { id: 2, title: "Leadership Course", price: 149, category: "course", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w-400" },
        { id: 3, title: "Career Growth Workbook", price: 29, category: "physical", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w-400" }
      ]);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      navigate("/products");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    alert(`Added ${quantity} ${product.title} to cart`);
  };

  const handlePurchase = () => {
    // Purchase logic here
    alert(`Purchasing ${quantity} ${product.title}`);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#194C63" }}></div>
            <p className="mt-3" style={{ color: "#3C637B" }}>Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Package className="w-12 h-12 mx-auto mb-4" style={{ color: "#AAB6CB" }} />
            <h3 className="text-lg font-medium mb-2" style={{ color: "#194C63" }}>
              Product not found
            </h3>
            <button
              onClick={() => navigate("/products")}
              className="mt-4 px-6 py-2 rounded font-medium transition-all hover:opacity-90"
              style={{
                backgroundColor: "#194C63",
                color: "#F5FAFD"
              }}
            >
              Back to Products
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const features = Array.isArray(product.features) 
    ? product.features 
    : (product.features || '').split('\n').filter(f => f.trim());

  const isOutOfStock = product.stock !== undefined && product.stock === 0;
  const isDigital = product.category === "digital" || product.category === "course";
  const isPhysical = product.category === "physical";

  return (
    <>
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b" style={{ borderColor: "#D0DDEE" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-1 hover:opacity-80 transition-all"
              style={{ color: "#748DB0" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </button>
            <ChevronRight className="w-4 h-4" style={{ color: "#D0DDEE" }} />
            <span style={{ color: "#194C63" }}>{product.title}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div 
              className="rounded-2xl overflow-hidden mb-4"
              style={{
                backgroundColor: "#F5FAFD",
                border: "1px solid #D0DDEE"
              }}
            >
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-[400px] object-cover"
                />
              ) : (
                <div className="w-full h-[400px] flex items-center justify-center">
                  <ShoppingBag className="w-24 h-24" style={{ color: "#D0DDEE" }} />
                </div>
              )}
            </div>

            {/* Additional Images (if any) */}
            {product.images && product.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'ring-2 ring-offset-2' : ''
                    }`}
                    style={{
                      borderColor: selectedImage === index ? "#194C63" : "#D0DDEE",
                      ringColor: "#194C63"
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Product Highlights */}
            <div 
              className="mt-8 p-6 rounded-xl"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D0DDEE"
              }}
            >
              <h3 
                className="font-semibold mb-4 flex items-center gap-2"
                style={{ color: "#194C63" }}
              >
                <Shield className="w-5 h-5" />
                What's Included
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}>
                    <Check className="w-5 h-5" style={{ color: "#16a34a" }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "#0C0D14" }}>Instant Access</div>
                    <div className="text-xs" style={{ color: "#748DB0" }}>Digital products</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(179, 120, 90, 0.1)" }}>
                    <Truck className="w-5 h-5" style={{ color: "#B3785A" }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "#0C0D14" }}>Free Shipping</div>
                    <div className="text-xs" style={{ color: "#748DB0" }}>Physical products</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(116, 141, 176, 0.1)" }}>
                    <Calendar className="w-5 h-5" style={{ color: "#748DB0" }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "#0C0D14" }}>Lifetime Updates</div>
                    <div className="text-xs" style={{ color: "#748DB0" }}>For digital products</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(25, 76, 99, 0.1)" }}>
                    <Users className="w-5 h-5" style={{ color: "#194C63" }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "#0C0D14" }}>Community Access</div>
                    <div className="text-xs" style={{ color: "#748DB0" }}>With select products</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div>
            {/* Category & Status */}
            <div className="flex items-center gap-3 mb-4">
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: product.category === "digital" 
                    ? "rgba(179, 120, 90, 0.1)" 
                    : product.category === "course" 
                    ? "rgba(25, 76, 99, 0.1)"
                    : "rgba(116, 141, 176, 0.1)",
                  color: product.category === "digital" 
                    ? "#B3785A" 
                    : product.category === "course"
                    ? "#194C63"
                    : "#748DB0"
                }}
              >
                {product.category || "Product"}
              </span>
              
              {isOutOfStock ? (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  Out of Stock
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  In Stock
                </span>
              )}
            </div>

            {/* Title */}
            <h1 
              className="text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: "#194C63" }}
            >
              {product.title}
            </h1>

            {/* Description */}
            <p 
              className="text-lg mb-6 leading-relaxed"
              style={{ color: "#3C637B" }}
            >
              {product.description}
            </p>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-2">
                <DollarSign className="w-6 h-6" style={{ color: "#B3785A" }} />
                <span 
                  className="text-4xl font-bold"
                  style={{ color: "#B3785A" }}
                >
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span 
                    className="text-xl line-through"
                    style={{ color: "#AAB6CB" }}
                  >
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              
              {product.originalPrice && (
                <div 
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "rgba(34, 197, 94, 0.1)",
                    color: "#16a34a"
                  }}
                >
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </div>
              )}
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="mb-8">
                <h3 
                  className="font-semibold mb-4"
                  style={{ color: "#194C63" }}
                >
                  Key Features
                </h3>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#16a34a" }} />
                      <span style={{ color: "#3C637B" }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div 
              className="p-6 rounded-xl mb-8"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D0DDEE",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
              }}
            >
              {isPhysical && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium" style={{ color: "#194C63" }}>Quantity</span>
                    {product.stock !== undefined && (
                      <span className="text-sm" style={{ color: "#748DB0" }}>
                        {product.stock} available
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-lg" style={{ borderColor: "#D0DDEE" }}>
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="px-4 py-3 text-lg disabled:opacity-50 transition-all hover:opacity-80"
                        style={{ color: "#194C63" }}
                      >
                        -
                      </button>
                      <span className="px-4 py-3 font-medium" style={{ color: "#0C0D14" }}>
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= (product.stock || 10)}
                        className="px-4 py-3 text-lg disabled:opacity-50 transition-all hover:opacity-80"
                        style={{ color: "#194C63" }}
                      >
                        +
                      </button>
                    </div>
                    <div className="text-sm" style={{ color: "#748DB0" }}>
                      Total: <span className="font-bold" style={{ color: "#B3785A" }}>${(product.price * quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="py-3 px-6 rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: isOutOfStock ? "#F5FAFD" : "#194C63",
                    border: "1px solid #D0DDEE",
                    color: isOutOfStock ? "#748DB0" : "#F5FAFD"
                  }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </button>
                
                <button
                  onClick={handlePurchase}
                  disabled={isOutOfStock}
                  className="py-3 px-6 rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: isOutOfStock ? "#F5FAFD" : "#B3785A",
                    border: "1px solid #D0DDEE",
                    color: isOutOfStock ? "#748DB0" : "#F5FAFD"
                  }}
                >
                  Buy Now
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Additional Actions */}
              <div className="flex justify-center gap-4 mt-6 pt-6 border-t" style={{ borderColor: "#F5FAFD" }}>
                <button className="flex items-center gap-2 transition-all hover:opacity-80" style={{ color: "#748DB0" }}>
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">Save</span>
                </button>
                <button className="flex items-center gap-2 transition-all hover:opacity-80" style={{ color: "#748DB0" }}>
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" style={{ color: "#748DB0" }} />
                <div>
                  <span className="text-sm" style={{ color: "#748DB0" }}>Delivery:</span>
                  <span className="ml-2 font-medium" style={{ color: "#0C0D14" }}>
                    {isDigital ? "Instant digital download" : "3-5 business days"}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5" style={{ color: "#748DB0" }} />
                <div>
                  <span className="text-sm" style={{ color: "#748DB0" }}>Category:</span>
                  <span className="ml-2 font-medium" style={{ color: "#0C0D14" }}>
                    {product.category || "General"}
                  </span>
                </div>
              </div>
              
              {product.sku && (
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5" style={{ color: "#748DB0" }} />
                  <div>
                    <span className="text-sm" style={{ color: "#748DB0" }}>SKU:</span>
                    <span className="ml-2 font-medium" style={{ color: "#0C0D14" }}>{product.sku}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 
              className="text-2xl font-bold mb-8"
              style={{ color: "#194C63" }}
            >
              You May Also Like
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((related) => (
                <div
                  key={related.id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/products/${related.id}`)}
                >
                  <div 
                    className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #D0DDEE"
                    }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <span 
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{
                          backgroundColor: "rgba(179, 120, 90, 0.1)",
                          color: "#B3785A"
                        }}
                      >
                        {related.category}
                      </span>
                      <h3 
                        className="font-semibold mt-2 mb-1"
                        style={{ color: "#194C63" }}
                      >
                        {related.title}
                      </h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs" style={{ color: "#748DB0" }}>$</span>
                        <span 
                          className="text-xl font-bold"
                          style={{ color: "#B3785A" }}
                        >
                          {related.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      
    </>
  );
};

export default ProductDetails;