import { useEffect, useState } from "react";
import { getProducts } from "../../services/product.service";
import ProductCard from "../../components/admin/ProductCard";
import { Package, Filter, Search, TrendingUp, Sparkles, Tag } from "lucide-react";

const PublicProducts = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = products;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  const categories = ["all", ...new Set(products.map(p => p.category).filter(Boolean))];

 

  return (
    <>
      
      {/* Hero Section */}
      <div 
        className="min-h-[30vh] flex items-center relative overflow-hidden"
        style={{ backgroundColor: "#194C63" }}
      >
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
            style={{
              backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlfHO7ID23m-wg7Lsu-TRgEOkx6F6kselgoQ&s")',
              
            }}
          />
         
        </div>


        <div className="max-w-7xl mx-auto">
        
        
          <div className="text-center max-w-3xl mx-auto mb-16 pt-10">
          
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ 
                backgroundColor: "rgba(179, 120, 90, 0.1)",
                color: "#fff", 
                border: "1px solid"
              }}
            >
                
              <Package className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">
                View Our Products
              </span>
            </div>

            
            
            
          </div>

          {/* Stats */}
          
        </div>
      </div>

      {/* Products Section */}
      <section className="py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div 
            className="p-6 rounded-xl mb-8"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE"
            }}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5" style={{ color: "#AAB6CB" }} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 p-3 rounded focus:outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #AAB6CB",
                      color: "#0C0D14"
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" style={{ color: "#748DB0" }} />
                  <span className="text-sm font-medium" style={{ color: "#194C63" }}>Filter by:</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === category ? '' : 'hover:opacity-90'
                      }`}
                      style={{
                        backgroundColor: selectedCategory === category ? "#194C63" : "#F5FAFD",
                        border: selectedCategory === category ? "none" : "1px solid #D0DDEE",
                        color: selectedCategory === category ? "#F5FAFD" : "#3C637B"
                      }}
                    >
                      {category === "all" ? "All Products" : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 
                className="text-2xl font-bold"
                style={{ color: "#194C63" }}
              >
                Our Products
              </h2>
              <p className="text-sm mt-1" style={{ color: "#748DB0" }}>
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            {selectedCategory !== "all" && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" style={{ color: "#B3785A" }} />
                <span className="text-sm" style={{ color: "#3C637B" }}>
                  Showing: {selectedCategory}
                </span>
              </div>
            )}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#194C63" }}></div>
              <p className="mt-3" style={{ color: "#3C637B" }}>Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div 
              className="text-center py-12 rounded-xl"
              style={{
                backgroundColor: "#FFFFFF",
                border: "2px dashed #D0DDEE"
              }}
            >
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#F5FAFD" }}>
                <Package className="w-8 h-8" style={{ color: "#AAB6CB" }} />
              </div>
              <h3 className="text-lg font-medium mb-2" style={{ color: "#194C63" }}>
                No products found
              </h3>
              <p style={{ color: "#3C637B" }}>
                {searchTerm ? `No products matching "${searchTerm}"` : "No products available yet"}
              </p>
              {(searchTerm || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="mt-4 px-4 py-2 rounded font-medium transition-all hover:opacity-90"
                  style={{
                    backgroundColor: "#194C63",
                    color: "#F5FAFD"
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              {/* Featured Products */}
              {products.filter(p => p.featured).length > 0 && (
                <div className="mt-16">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-6 h-6" style={{ color: "#B3785A" }} />
                    <h2 
                      className="text-2xl font-bold"
                      style={{ color: "#194C63" }}
                    >
                      Featured Products
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products
                      .filter(p => p.featured)
                      .map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* CTA Section */}
          <div className="mt-16">
            <div 
              className="p-8 rounded-3xl text-center"
              style={{
                backgroundColor: "#194C63",
                backgroundImage: "radial-gradient(circle at 20% 80%, rgba(179, 120, 90, 0.2) 0%, transparent 50%)"
              }}
            >
              <TrendingUp className="w-12 h-12 mx-auto mb-6" style={{ color: "#F5FAFD" }} />
              
              <h2 
                className="text-xl font-bold mb-6 text-white"
              >
                Need Something Custom?
              </h2>
              
              <p 
                className="text-sm md:text-xl mb-8 text-white/90 max-w-2xl mx-auto"
              >
                Looking for a specific resource or personalized coaching package? 
                Let's create something tailored to your needs.
              </p>
              
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#194C63"
                }}
              >
                 Get Custom Solutions
              </a>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default PublicProducts;