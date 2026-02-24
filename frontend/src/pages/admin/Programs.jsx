import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getPrograms, createProgram } from "../../services/program.service";
import { uploadImage } from "../../services/upload.service";
import { Plus, Upload, X, Calendar, DollarSign, Clock, Image as ImageIcon, Edit, Trash2 } from "lucide-react";

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const loadPrograms = async () => {
    setLoading(true);
    try {
      const data = await getPrograms();
      setPrograms(data);
    } catch (error) {
      console.error("Failed to load programs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  // IMAGE HANDLING
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
      setUploadLoading(true);
      const result = await uploadImage(imageFile);
      setImageUrl(result.url);
      alert("Image uploaded successfully!");
    } catch (err) {
      alert("Image upload failed");
    } finally {
      setUploadLoading(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setImageUrl("");
  };

  // CREATE PROGRAM
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("Title is required");
      return;
    }

    try {
      await createProgram({
        title,
        description,
        price,
        duration,
        imageUrl,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setDuration("");
      setImageUrl("");
      setImageFile(null);
      setImagePreview("");
      setShowForm(false);

      loadPrograms();
    } catch (error) {
      console.error("Failed to create program:", error);
      alert("Failed to create program");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setDuration("");
    setImageUrl("");
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
              Programs Management
            </h1>
            <p className="mt-1" style={{ color: "#3C637B" }}>
              Create and manage your training programs
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
            {showForm ? "Hide Form" : "New Program"}
          </button>
        </div>

        {/* CREATE FORM */}
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
                Create New Program
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
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                    Program Title *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all"
                    placeholder="Enter program title"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #AAB6CB",
                      color: "#0C0D14"
                    }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                    Price
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
                      className="w-full p-3 pl-8 rounded focus:outline-none focus:ring-2 transition-all"
                      placeholder="0.00"
                      style={{
                        backgroundColor: "#F5FAFD",
                        border: "1px solid #AAB6CB",
                        color: "#0C0D14"
                      }}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                    Duration
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full p-3 pl-10 rounded focus:outline-none focus:ring-2 transition-all"
                      placeholder="e.g., 8 weeks or 60 mins"
                      style={{
                        backgroundColor: "#F5FAFD",
                        border: "1px solid #AAB6CB",
                        color: "#0C0D14"
                      }}
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                    <Clock 
                      className="absolute left-3 top-3 w-4 h-4"
                      style={{ color: "#748DB0" }}
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
                  >
                    <option value="">Select category</option>
                    <option value="fitness">Fitness</option>
                    <option value="wellness">Wellness</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="rehabilitation">Rehabilitation</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                  Description
                </label>
                <textarea
                  className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all"
                  placeholder="Describe your program in detail..."
                  rows="4"
                  style={{
                    backgroundColor: "#F5FAFD",
                    border: "1px solid #AAB6CB",
                    color: "#0C0D14"
                  }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: "#194C63" }}>
                  Program Image
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
                    
                    {!imageUrl ? (
                      <button
                        type="button"
                        onClick={handleImageUpload}
                        disabled={uploadLoading}
                        className="px-4 py-2 rounded font-medium transition-all hover:opacity-90 flex items-center gap-2 disabled:opacity-50"
                        style={{
                          backgroundColor: "#194C63",
                          color: "#F5FAFD"
                        }}
                      >
                        <Upload className="w-4 h-4" />
                        {uploadLoading ? "Uploading..." : "Upload Image"}
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
                    onClick={() => document.getElementById('image-upload').click()}
                  >
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageSelect}
                    />
                    <ImageIcon className="w-12 h-12 mx-auto mb-3" style={{ color: "#AAB6CB" }} />
                    <p className="mb-2" style={{ color: "#194C63" }}>
                      Click to upload program image
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
                  disabled={!title || uploadLoading}
                  className="px-4 py-2 rounded font-medium transition-all hover:opacity-90 flex items-center gap-2 disabled:opacity-50"
                  style={{
                    backgroundColor: "#194C63",
                    color: "#F5FAFD"
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Create Program
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PROGRAM LIST */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 
              className="text-lg font-semibold"
              style={{ color: "#194C63" }}
            >
              All Programs ({programs.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#194C63" }}></div>
              <p className="mt-3" style={{ color: "#3C637B" }}>Loading programs...</p>
            </div>
          ) : programs.length === 0 ? (
            <div 
              className="text-center py-12 rounded-xl"
              style={{
                backgroundColor: "#FFFFFF",
                border: "2px dashed #D0DDEE"
              }}
            >
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#F5FAFD" }}>
                <Calendar className="w-8 h-8" style={{ color: "#AAB6CB" }} />
              </div>
              <h3 className="text-lg font-medium mb-2" style={{ color: "#194C63" }}>
                No programs yet
              </h3>
              <p className="mb-4" style={{ color: "#3C637B" }}>
                Create your first training program to get started
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
                Create First Program
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <div
                  key={program._id}
                  className="rounded-xl overflow-hidden transition-all hover:shadow-md group"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #D0DDEE"
                  }}
                >
                  {/* Program Image */}
                  {program.imageUrl ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={program.imageUrl}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div 
                      className="h-48 flex items-center justify-center"
                      style={{ backgroundColor: "#F5FAFD" }}
                    >
                      <ImageIcon className="w-12 h-12" style={{ color: "#D0DDEE" }} />
                    </div>
                  )}

                  {/* Program Content */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 
                          className="font-semibold text-lg mb-1"
                          style={{ color: "#194C63" }}
                        >
                          {program.title}
                        </h3>
                        {program.category && (
                          <span 
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: "rgba(60, 99, 123, 0.1)",
                              color: "#3C637B"
                            }}
                          >
                            {program.category}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-2 rounded transition-all hover:opacity-80"
                          style={{
                            backgroundColor: "rgba(60, 99, 123, 0.1)",
                            color: "#3C637B"
                          }}
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 rounded transition-all hover:opacity-80"
                          style={{
                            backgroundColor: "rgba(179, 120, 90, 0.1)",
                            color: "#B3785A"
                          }}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {program.description && (
                      <p 
                        className="text-sm mb-4 line-clamp-2"
                        style={{ color: "#3C637B" }}
                      >
                        {program.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "#F5FAFD" }}>
                      <div className="flex items-center gap-4">
                        {program.duration && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" style={{ color: "#748DB0" }} />
                            <span className="text-sm" style={{ color: "#0C0D14" }}>
                              {program.duration}
                            </span>
                          </div>
                        )}
                        
                        {program.price && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" style={{ color: "#748DB0" }} />
                            <span className="text-sm font-medium" style={{ color: "#0C0D14" }}>
                              ${program.price}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Programs;