import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import RichTextEditor from "../../context/RichEditor";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  Save, 
  Image as ImageIcon, 
  X, 
  Clock, 
  Tag, 
  FileText, 
  Eye, 
  Sparkles,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Upload,
  Calendar,
  User,
  BookOpen,
  Send,
  FileEdit
} from "lucide-react";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Career");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [readingTime, setReadingTime] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [publishStatus, setPublishStatus] = useState(null);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [actionType, setActionType] = useState(null); // 'publish' or 'draft'

  const categories = [
    "Career",
    "Leadership",
    "HR Systems", 
    "Personal Growth",
    "Organizational Development",
    "Coaching",
    "Workplace Culture"
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCoverImage(null);
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) newErrors.title = "Title is required";
    if (!excerpt.trim()) newErrors.excerpt = "Excerpt is required";
    if (!content.trim()) newErrors.content = "Content is required";
    if (!coverImage) newErrors.coverImage = "Cover image is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setActionType('publish');
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setPublishStatus(null);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", generateSlug(title));
    formData.append("excerpt", excerpt);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("readingTime", readingTime || "5 min read");
    formData.append("tags", tags);
    formData.append("seoTitle", seoTitle || title);
    formData.append("seoDescription", seoDescription || excerpt);
    formData.append("status", "published"); // Set status to published

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      await api.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setPublishStatus('success');
      
      setTimeout(() => {
        navigate("/admin/blog");
      }, 2000);
      
    } catch (error) {
      console.error("Failed to publish blog:", error);
      setPublishStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async (e) => {
    e.preventDefault();
    setActionType('draft');

    // For draft, we only validate title (others optional)
    if (!title.trim()) {
      setErrors({ title: "Title is required for draft" });
      return;
    }

    setIsSubmitting(true);
    setPublishStatus(null);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", generateSlug(title));
    formData.append("excerpt", excerpt || "");
    formData.append("category", category);
    formData.append("content", content || "");
    formData.append("readingTime", readingTime || "");
    formData.append("tags", tags);
    formData.append("seoTitle", seoTitle || title);
    formData.append("seoDescription", seoDescription || excerpt || "");
    formData.append("status", "draft"); // Set status to draft

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      await api.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setPublishStatus('draft_saved');
      
      setTimeout(() => {
        navigate("/admin/blog");
      }, 2000);
      
    } catch (error) {
      console.error("Failed to save draft:", error);
      setPublishStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview Modal Component
  const PreviewModal = () => {
    if (!showPreview) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div 
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white"
          style={{ border: "1px solid #D0DDEE" }}
        >
          {/* Preview Header */}
          <div className="sticky top-0 z-10 p-4 border-b bg-white flex justify-between items-center" style={{ borderColor: "#D0DDEE" }}>
            <h2 className="text-lg font-semibold" style={{ color: "#194C63" }}>Article Preview</h2>
            <button
              onClick={() => setShowPreview(false)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" style={{ color: "#3C637B" }} />
            </button>
          </div>

          {/* Preview Content */}
          <div className="p-6">
            {imagePreview && (
              <img 
                src={imagePreview} 
                alt="Cover" 
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
            )}
            
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(179, 120, 90, 0.1)", color: "#B3785A" }}>
                {category}
              </span>
              {readingTime && (
                <span className="text-sm" style={{ color: "#748DB0" }}>{readingTime}</span>
              )}
            </div>

            <h1 className="text-3xl font-bold mb-4" style={{ color: "#194C63" }}>{title || "Article Title"}</h1>
            
            <p className="text-lg mb-6" style={{ color: "#3C637B" }}>{excerpt || "Article excerpt will appear here..."}</p>
            
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content || "<p>Article content will appear here...</p>" }} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#194C63" }}>
              Create Insight Article
            </h1>
            <p className="text-sm mt-1" style={{ color: "#3C637B" }}>
              Share your expertise through thoughtful insights
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90 flex items-center gap-2"
              style={{
                backgroundColor: "#F5FAFD",
                border: "1px solid #AAB6CB",
                color: "#3C637B"
              }}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {publishStatus === 'success' && (
          <div 
            className="p-4 rounded-lg flex items-center gap-3 animate-fade-in"
            style={{
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.3)"
            }}
          >
            <CheckCircle className="w-5 h-5" style={{ color: "#16a34a" }} />
            <div>
              <p className="font-medium" style={{ color: "#16a34a" }}>
                Article published successfully!
              </p>
              <p className="text-sm" style={{ color: "#3C637B" }}>
                Redirecting to articles list...
              </p>
            </div>
          </div>
        )}

        {publishStatus === 'draft_saved' && (
          <div 
            className="p-4 rounded-lg flex items-center gap-3 animate-fade-in"
            style={{
              backgroundColor: "rgba(234, 179, 8, 0.1)",
              border: "1px solid rgba(234, 179, 8, 0.3)"
            }}
          >
            <CheckCircle className="w-5 h-5" style={{ color: "#ca8a04" }} />
            <div>
              <p className="font-medium" style={{ color: "#ca8a04" }}>
                Draft saved successfully!
              </p>
              <p className="text-sm" style={{ color: "#3C637B" }}>
                You can continue editing later.
              </p>
            </div>
          </div>
        )}

        {publishStatus === 'error' && (
          <div 
            className="p-4 rounded-lg flex items-center gap-3"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)"
            }}
          >
            <AlertCircle className="w-5 h-5" style={{ color: "#ef4444" }} />
            <div>
              <p className="font-medium" style={{ color: "#ef4444" }}>
                Failed to save article
              </p>
              <p className="text-sm" style={{ color: "#3C637B" }}>
                Please try again or contact support.
              </p>
            </div>
          </div>
        )}

        {/* Main Form */}
        <form className="space-y-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div 
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D0DDEE"
                }}
              >
                <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                  Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., The Future of Work: Building Resilient Teams"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: "#F5FAFD",
                    border: errors.title ? "1px solid #ef4444" : "1px solid #AAB6CB",
                    color: "#0C0D14"
                  }}
                />
                {errors.title && (
                  <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.title}</p>
                )}
                
                {/* Auto-generate slug preview */}
                {title && (
                  <p className="text-xs mt-2" style={{ color: "#748DB0" }}>
                    Slug: /blog/{generateSlug(title)}
                  </p>
                )}
              </div>

              {/* Excerpt */}
              <div 
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D0DDEE"
                }}
              >
                <label className="block text-sm font-medium mb-2" style={{ color: "#194C63" }}>
                  Excerpt {actionType === 'publish' && <span className="text-red-500">*</span>}
                  {actionType === 'draft' && <span className="text-xs ml-2" style={{ color: "#748DB0" }}>(optional for draft)</span>}
                </label>
                <textarea
                  placeholder="A brief summary of your article (2-3 sentences)"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows="3"
                  className="w-full p-3 rounded focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: "#F5FAFD",
                    border: errors.excerpt ? "1px solid #ef4444" : "1px solid #AAB6CB",
                    color: "#0C0D14"
                  }}
                />
                {errors.excerpt && (
                  <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.excerpt}</p>
                )}
                <p className="text-xs mt-2 text-right" style={{ color: "#748DB0" }}>
                  {excerpt.length}/200 characters
                </p>
              </div>

              {/* Rich Text Editor */}
              <div 
                className="rounded-xl overflow-hidden"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: errors.content && actionType === 'publish' ? "2px solid #ef4444" : "1px solid #D0DDEE"
                }}
              >
                <div className="p-4 border-b bg-[#F5FAFD] flex items-center gap-2" style={{ borderColor: "#D0DDEE" }}>
                  <FileText className="w-4 h-4" style={{ color: "#194C63" }} />
                  <span className="text-sm font-medium" style={{ color: "#194C63" }}>Article Content</span>
                  {actionType === 'publish' && errors.content && (
                    <span className="text-xs ml-auto" style={{ color: "#ef4444" }}>Required for publishing</span>
                  )}
                  {actionType === 'draft' && (
                    <span className="text-xs ml-auto" style={{ color: "#748DB0" }}>Optional for draft</span>
                  )}
                </div>
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                />
              </div>
            </div>

            {/* Right Column - Metadata */}
            <div className="space-y-6">
              {/* Cover Image */}
              <div 
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: errors.coverImage && actionType === 'publish' ? "2px solid #ef4444" : "1px solid #D0DDEE"
                }}
              >
                <h3 className="text-sm font-medium mb-4 flex items-center gap-2" style={{ color: "#194C63" }}>
                  <ImageIcon className="w-4 h-4" />
                  Cover Image {actionType === 'publish' && <span className="text-red-500">*</span>}
                  {actionType === 'draft' && <span className="text-xs ml-2" style={{ color: "#748DB0" }}>(optional)</span>}
                </h3>

                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white transition-all"
                    >
                      <X className="w-4 h-4" style={{ color: "#ef4444" }} />
                    </button>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-all"
                    style={{ borderColor: "#D0DDEE" }}
                    onClick={() => document.getElementById('cover-image').click()}
                  >
                    <input
                      id="cover-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: "#AAB6CB" }} />
                    <p className="text-sm font-medium" style={{ color: "#194C63" }}>Click to upload</p>
                    <p className="text-xs mt-1" style={{ color: "#748DB0" }}>PNG, JPG, WEBP (max 5MB)</p>
                  </div>
                )}
                {errors.coverImage && actionType === 'publish' && (
                  <p className="text-xs mt-2" style={{ color: "#ef4444" }}>{errors.coverImage}</p>
                )}
              </div>

              {/* Categories & Metadata */}
              <div 
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D0DDEE"
                }}
              >
                <h3 className="text-sm font-medium mb-4 flex items-center gap-2" style={{ color: "#194C63" }}>
                  <Tag className="w-4 h-4" />
                  Article Metadata
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs mb-1" style={{ color: "#748DB0" }}>Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2 rounded focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: "#F5FAFD",
                        border: "1px solid #AAB6CB",
                        color: "#0C0D14"
                      }}
                    >
                      {categories.map(cat => (
                        <option key={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs mb-1" style={{ color: "#748DB0" }}>Reading Time</label>
                    <div className="relative">
                      <Clock className="absolute left-2 top-2 w-4 h-4" style={{ color: "#AAB6CB" }} />
                      <input
                        type="text"
                        placeholder="e.g., 5 min read"
                        value={readingTime}
                        onChange={(e) => setReadingTime(e.target.value)}
                        className="w-full pl-8 p-2 rounded focus:outline-none focus:ring-2 transition-all"
                        style={{
                          backgroundColor: "#F5FAFD",
                          border: "1px solid #AAB6CB",
                          color: "#0C0D14"
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs mb-1" style={{ color: "#748DB0" }}>Tags (comma separated)</label>
                    <input
                      type="text"
                      placeholder="HR, Leadership, Growth"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full p-2 rounded focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: "#F5FAFD",
                        border: "1px solid #AAB6CB",
                        color: "#0C0D14"
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* SEO Preview */}
              <div 
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: "#F5FAFD",
                  border: "1px solid #D0DDEE"
                }}
              >
                <h3 className="text-sm font-medium mb-4 flex items-center gap-2" style={{ color: "#194C63" }}>
                  <Sparkles className="w-4 h-4" />
                  SEO Preview
                </h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium" style={{ color: "#194C63" }}>Meta Title</p>
                    <input
                      type="text"
                      placeholder="SEO title (optional)"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      className="w-full p-2 text-sm rounded focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #AAB6CB",
                        color: "#0C0D14"
                      }}
                    />
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium" style={{ color: "#194C63" }}>Meta Description</p>
                    <textarea
                      placeholder="SEO description (optional)"
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      rows="2"
                      className="w-full p-2 text-sm rounded focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #AAB6CB",
                        color: "#0C0D14"
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Publish Button */}
                <button
                  onClick={handlePublish}
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-semibold transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#194C63",
                    color: "#F5FAFD"
                  }}
                >
                  {isSubmitting && actionType === 'publish' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Publish Article
                    </>
                  )}
                </button>

                {/* Draft Button */}
                <button
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-semibold transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "2px solid #D0DDEE",
                    color: "#3C637B"
                  }}
                >
                  {isSubmitting && actionType === 'draft' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-t-transparent border-[#3C637B] rounded-full animate-spin"></div>
                      Saving Draft...
                    </>
                  ) : (
                    <>
                      <FileEdit className="w-5 h-5" />
                      Save as Draft
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      <PreviewModal />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </AdminLayout>
  );
};

export default CreateBlog;