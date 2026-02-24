import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../../services/product.service";
import { uploadImage } from "../../services/upload.service";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Image as ImageIcon, 
  DollarSign, 
  Tag,
  Upload,
  X,
  Package,
  Eye
} from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "",
    features: "",
    stock: ""
  });

  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    try {
      setUploading(true);
      const res = await uploadImage(imageFile);
      setForm({ ...form, imageUrl: res.url });
      alert("Image uploaded successfully!");
    } catch (error) {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setForm({ ...form, imageUrl: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.title || !form.price) {
      alert("Title and price are required");
      return;
    }

    try {
      await createProduct({
        ...form,
        features: form.features.split("\n").filter(f => f.trim()),
        price: parseFloat(form.price),
        stock: form.stock ? parseInt(form.stock) : 0
      });
      
      // Reset form
      setForm({
        title: "",
        price: "",
        description: "",
        imageUrl: "",
        category: "",
        features: "",
        stock: ""
      });
      setImageFile(null);
      setImagePreview("");
      setShowForm(false);
      
      await load();
    } catch (error) {
      console.error("Failed to create product:", error);
      alert("Failed to create product");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        await load();
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product");
      }
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      price: "",
      description: "",
      imageUrl: "",
      category: "",
      features: "",
      stock: ""
    });
    setImageFile(null);
    setImagePreview("");
    setShowForm(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 
              className="text-2xl font-semibold"
              style={{ color: "#194C63" }}
            >
              Products Management
            </h1>
            <p className="mt-1" style={{ color: "#3C637B" }}>
              Manage your physical and digital products
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 rounded font-medium transition-all hover:opacity-90 flex items-center gap-2"
            style={{
              backgroundColor: "#194C63",
              color: "#F5FAFD"
            }}
          >
            <Plus className="w-4 h-4" />
            {showForm ? "Hide Form" : "Add Product"}
          </button>
        </div>

        {/* Create Product Form */}
        {showForm && (
          <div 
            className="p-6 rounded-xl mb-6"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 
                className="text-lg font-semibold"
                style={{ color: "#194C63" }}
              >
                Add New Product
              </h2>
              <button
                onClick={resetForm}
                className="p-2 rounded transition-all hover:opacity-80"
                style={{
                  backgroundColor: "#F5FAFD",
                  color: "#3C637B"
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all"
                    placeholder="Enter product name"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #AAB6CB",
                      color: "#0C0D14"
                    }}
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                    Price *
                  </label>
                  <div className="relative">
                    <span 
                      className="absolute left-3 top-3"
                      style={{ color: "#748DB0" }}
                    >
                      $
                    </span>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      className="w-full p-3 pl-8 rounded focus:outline-none focus:ring-2 transition-all"
                      placeholder="0.00"
                      style={{
                        backgroundColor: "#F5FAFD",
                        border: "1px solid #AAB6CB",
                        color: "#0C0D14"
                      }}
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                    Category
                  </label>
                  <select
                    className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #AAB6CB",
                      color: "#0C0D14"
                    }}
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="">Select category</option>
                    <option value="physical">Physical Product</option>
                    <option value="digital">Digital Product</option>
                    <option value="service">Service Package</option>
                    <option value="course">Online Course</option>
                    <option value="resource">Resource Material</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all"
                    placeholder="Leave empty for unlimited"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #AAB6CB",
                      color: "#0C0D14"
                    }}
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                  Description
                </label>
                <textarea
                  className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all"
                  placeholder="Describe your product..."
                  rows="3"
                  style={{
                    backgroundColor: "#F5FAFD",
                    border: "1px solid #AAB6CB",
                    color: "#0C0D14"
                  }}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              {/* Features */}
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                  Features (one per line)
                </label>
                <textarea
                  className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all"
                  placeholder="Enter key features, one per line..."
                  rows="3"
                  style={{
                    backgroundColor: "#F5FAFD",
                    border: "1px solid #AAB6CB",
                    color: "#0C0D14"
                  }}
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                  Product Image
                </label>
                
                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                        style={{ border: "1px solid #D0DDEE" }}
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-2 rounded-full transition-all hover:opacity-90"
                        style={{
                          backgroundColor: "rgba(239, 68, 68, 0.9)",
                          color: "#FFFFFF"
                        }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {!form.imageUrl ? (
                      <button
                        type="button"
                        onClick={handleImageUpload}
                        disabled={uploading}
                        className="px-4 py-2 rounded font-medium transition-all hover:opacity-90 flex items-center gap-2 disabled:opacity-50"
                        style={{
                          backgroundColor: "#194C63",
                          color: "#F5FAFD"
                        }}
                      >
                        <Upload className="w-4 h-4" />
                        {uploading ? "Uploading..." : "Upload Image"}
                      </button>
                    ) : (
                      <div className="p-3 rounded" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
                        <p className="text-sm font-medium" style={{ color: "#16a34a" }}>
                          ✓ Image uploaded successfully
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all hover:border-solid hover:opacity-90"
                    style={{ 
                      borderColor: "#D0DDEE",
                      backgroundColor: "#F5FAFD"
                    }}
                    onClick={() => document.getElementById('product-image-upload').click()}
                  >
                    <input
                      id="product-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageSelect}
                    />
                    <ImageIcon className="w-12 h-12 mx-auto mb-3" style={{ color: "#AAB6CB" }} />
                    <p className="mb-2" style={{ color: "#194C63" }}>
                      Click to upload product image
                    </p>
                    <p className="text-sm" style={{ color: "#748DB0" }}>
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-6 border-t" style={{ borderColor: "#D0DDEE" }}>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded font-medium transition-all hover:opacity-90"
                  style={{
                    backgroundColor: "#F5FAFD",
                    border: "1px solid #AAB6CB",
                    color: "#3C637B"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!form.title || !form.price || uploading}
                  className="px-4 py-2 rounded font-medium transition-all hover:opacity-90 flex items-center gap-2 disabled:opacity-50"
                  style={{
                    backgroundColor: "#194C63",
                    color: "#F5FAFD"
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Create Product
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        <div 
          className="rounded-xl overflow-hidden"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D0DDEE"
          }}
        >
          {/* Table Header */}
          <div 
            className="px-6 py-4 border-b"
            style={{ 
              backgroundColor: "#F5FAFD",
              borderColor: "#D0DDEE"
            }}
          >
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <span className="font-medium flex items-center gap-2" style={{ color: "#194C63" }}>
                  <Package className="w-4 h-4" />
                  Product Details
                </span>
              </div>
              <div className="col-span-2">
                <span className="font-medium" style={{ color: "#194C63" }}>
                  Category
                </span>
              </div>
              <div className="col-span-2">
                <span className="font-medium" style={{ color: "#194C63" }}>
                  Price & Stock
                </span>
              </div>
              <div className="col-span-3">
                <span className="font-medium" style={{ color: "#194C63" }}>
                  Status
                </span>
              </div>
              <div className="col-span-1 text-right">
                <span className="font-medium" style={{ color: "#194C63" }}>
                  Actions
                </span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="px-6 py-12 text-center">
              <div className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#194C63" }}></div>
              <p className="mt-3" style={{ color: "#3C637B" }}>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#F5FAFD" }}>
                <Package className="w-8 h-8" style={{ color: "#AAB6CB" }} />
              </div>
              <h3 className="text-lg font-medium mb-2" style={{ color: "#194C63" }}>
                No products yet
              </h3>
              <p className="mb-4" style={{ color: "#3C637B" }}>
                Add your first product to get started
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 rounded font-medium transition-all hover:opacity-90 inline-flex items-center gap-2"
                style={{
                  backgroundColor: "#194C63",
                  color: "#F5FAFD"
                }}
              >
                <Plus className="w-4 h-4" />
                Add First Product
              </button>
            </div>
          ) : (
            /* Products List */
            <div>
              {products.map((product) => (
                <div
                  key={product._id}
                  className="px-6 py-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors group"
                  style={{ borderColor: "#F5FAFD" }}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Product Details */}
                    <div className="col-span-4">
                      <div className="flex items-start gap-3">
                        {product.imageUrl ? (
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={product.imageUrl}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: "rgba(25, 76, 99, 0.1)" }}
                          >
                            <Package className="w-6 h-6" style={{ color: "#194C63" }} />
                          </div>
                        )}
                        <div>
                          <h3 
                            className="font-semibold mb-1"
                            style={{ color: "#0C0D14" }}
                          >
                            {product.title}
                          </h3>
                          <p 
                            className="text-sm line-clamp-1"
                            style={{ color: "#3C637B" }}
                          >
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="col-span-2">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: product.category ? "rgba(179, 120, 90, 0.1)" : "rgba(116, 141, 176, 0.1)",
                          color: product.category ? "#B3785A" : "#748DB0"
                        }}
                      >
                        {product.category || "Uncategorized"}
                      </span>
                    </div>

                    {/* Price & Stock */}
                    <div className="col-span-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" style={{ color: "#194C63" }} />
                          <span 
                            className="font-semibold"
                            style={{ color: "#194C63" }}
                          >
                            ${product.price}
                          </span>
                        </div>
                        <div className="text-xs flex items-center gap-1">
                          <Tag className="w-3 h-3" style={{ color: "#748DB0" }} />
                          <span style={{ color: "#748DB0" }}>
                            {product.stock !== undefined ? `${product.stock} in stock` : "Unlimited"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-3">
                      <div className="space-y-2">
                        <div>
                          <span 
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              product.stock > 0 || product.stock === undefined 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.stock > 0 || product.stock === undefined ? "Available" : "Out of Stock"}
                          </span>
                        </div>
                        {product.features && product.features.length > 0 && (
                          <div className="text-xs" style={{ color: "#748DB0" }}>
                            {product.features.length} feature{product.features.length !== 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="p-1.5 rounded transition-all hover:opacity-80"
                          style={{
                            backgroundColor: "rgba(60, 99, 123, 0.1)",
                            color: "#3C637B"
                          }}
                          title="View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="p-1.5 rounded transition-all hover:opacity-80"
                          style={{
                            backgroundColor: "rgba(25, 76, 99, 0.1)",
                            color: "#194C63"
                          }}
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-1.5 rounded transition-all hover:opacity-80"
                          style={{
                            backgroundColor: "rgba(239, 68, 68, 0.1)",
                            color: "#ef4444"
                          }}
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {products.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm" style={{ color: "#748DB0" }}>
              Showing {products.length} product{products.length !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 rounded text-sm transition-all hover:opacity-90"
                style={{
                  backgroundColor: "#F5FAFD",
                  border: "1px solid #AAB6CB",
                  color: "#3C637B"
                }}
              >
                Export Products
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Products;