import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import AdminLayout from ".././../components/admin/AdminLayout";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Clock, 
  Tag, 
  Search,
  Filter,
  MoreVertical,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  FileText,
  Sparkles,
  AlertCircle,
  CheckCircle,
  XCircle,
  Send,
  FileEdit,
  EyeOff
} from "lucide-react";

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [publishConfirm, setPublishConfirm] = useState(null);
  const [unpublishConfirm, setUnpublishConfirm] = useState(null);
  const [categories, setCategories] = useState([]);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/blogs");
      setBlogs(data);
      setFilteredBlogs(data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(blog => blog.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Failed to load blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [searchTerm, categoryFilter, statusFilter, sortBy, blogs]);

  const filterBlogs = () => {
    let result = [...blogs];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(blog =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(blog => blog.category === categoryFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(blog => blog.status === statusFilter);
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    setFilteredBlogs(result);
  };

  const deleteBlog = async (id) => {
    try {
      await api.delete(`/blogs/${id}`);
      setDeleteConfirm(null);
      loadBlogs();
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  const publishBlog = async (id) => {
    try {
        await api.patch(`/blogs/${id}`, {
            published: true
          });
      setPublishConfirm(null);
      loadBlogs();
    } catch (error) {
      console.error("Failed to publish blog:", error);
    }
  };

  const unpublishBlog = async (id) => {
    try {
        await api.patch(`/blogs/${id}`, {
            published: false
          });
      setUnpublishConfirm(null);
      loadBlogs();
    } catch (error) {
      console.error("Failed to unpublish blog:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Career":
        return { bg: "rgba(25, 76, 99, 0.1)", text: "#194C63" };
      case "Leadership":
        return { bg: "rgba(179, 120, 90, 0.1)", text: "#B3785A" };
      case "HR Systems":
        return { bg: "rgba(60, 99, 123, 0.1)", text: "#3C637B" };
      case "Personal Growth":
        return { bg: "rgba(116, 141, 176, 0.1)", text: "#748DB0" };
      default:
        return { bg: "rgba(208, 221, 238, 0.2)", text: "#748DB0" };
    }
  };

  const stats = {
    total: blogs.length,
    published: blogs.filter(b => b.status === 'published').length,
    drafts: blogs.filter(b => b.status === 'draft').length,
    categories: categories.length
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 
              className="text-2xl font-bold"
              style={{ color: "#194C63" }}
            >
              Blog Articles
            </h1>
            <p className="text-sm mt-1" style={{ color: "#3C637B" }}>
              Manage your insights and articles
            </p>
          </div>

          <Link
            to="/admin/blog/create"
            className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90 flex items-center gap-2"
            style={{
              backgroundColor: "#194C63",
              color: "#F5FAFD"
            }}
          >
            <Plus className="w-4 h-4" />
            New Article
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            className="p-5 rounded-xl"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE"
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Total Articles</p>
                <p className="text-2xl font-bold mt-2" style={{ color: "#194C63" }}>{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(25, 76, 99, 0.1)" }}>
                <FileText className="w-6 h-6" style={{ color: "#194C63" }} />
              </div>
            </div>
          </div>

          <div 
            className="p-5 rounded-xl"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE"
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Published</p>
                <p className="text-2xl font-bold mt-2" style={{ color: "#194C63" }}>{stats.published}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}>
                <CheckCircle className="w-6 h-6" style={{ color: "#16a34a" }} />
              </div>
            </div>
          </div>

          <div 
            className="p-5 rounded-xl"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE"
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Drafts</p>
                <p className="text-2xl font-bold mt-2" style={{ color: "#194C63" }}>{stats.drafts}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(234, 179, 8, 0.1)" }}>
                <Clock className="w-6 h-6" style={{ color: "#ca8a04" }} />
              </div>
            </div>
          </div>

          <div 
            className="p-5 rounded-xl"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D0DDEE"
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#748DB0" }}>Categories</p>
                <p className="text-2xl font-bold mt-2" style={{ color: "#194C63" }}>{stats.categories}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(179, 120, 90, 0.1)" }}>
                <Tag className="w-6 h-6" style={{ color: "#B3785A" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div 
          className="p-5 rounded-xl"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D0DDEE"
          }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-4 h-4" style={{ color: "#AAB6CB" }} />
              <input
                type="text"
                placeholder="Search articles..."
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

            {/* Filters */}
            <div className="flex items-center gap-3">
              <select
                className="px-4 py-2 rounded focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: "#F5FAFD",
                  border: "1px solid #AAB6CB",
                  color: "#3C637B"
                }}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                className="px-4 py-2 rounded focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: "#F5FAFD",
                  border: "1px solid #AAB6CB",
                  color: "#3C637B"
                }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>

              <select
                className="px-4 py-2 rounded focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: "#F5FAFD",
                  border: "1px solid #AAB6CB",
                  color: "#3C637B"
                }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div 
          className="rounded-xl overflow-hidden"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D0DDEE"
          }}
        >
          {/* Header */}
          <div 
            className="px-6 py-4 border-b"
            style={{ 
              backgroundColor: "#F5FAFD",
              borderColor: "#D0DDEE"
            }}
          >
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-5">
                <span className="font-medium" style={{ color: "#194C63" }}>Article</span>
              </div>
              <div className="col-span-2">
                <span className="font-medium" style={{ color: "#194C63" }}>Category</span>
              </div>
              <div className="col-span-2">
                <span className="font-medium" style={{ color: "#194C63" }}>Published</span>
              </div>
              <div className="col-span-2">
                <span className="font-medium" style={{ color: "#194C63" }}>Status</span>
              </div>
              <div className="col-span-1 text-right">
                <span className="font-medium" style={{ color: "#194C63" }}>Actions</span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="px-6 py-12 text-center">
              <div className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#194C63" }}></div>
              <p className="mt-3" style={{ color: "#3C637B" }}>Loading articles...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#F5FAFD" }}>
                <FileText className="w-8 h-8" style={{ color: "#AAB6CB" }} />
              </div>
              <h3 className="text-lg font-medium mb-2" style={{ color: "#194C63" }}>
                No articles found
              </h3>
              <p className="mb-4" style={{ color: "#3C637B" }}>
                {searchTerm || categoryFilter !== "all" || statusFilter !== "all"
                  ? "Try adjusting your filters" 
                  : "Get started by creating your first article"}
              </p>
              {(searchTerm || categoryFilter !== "all" || statusFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("all");
                    setStatusFilter("all");
                  }}
                  className="px-4 py-2 rounded font-medium transition-all hover:opacity-90"
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
            <div>
              {filteredBlogs.map((blog) => {
                const categoryColor = getCategoryColor(blog.category);
                const showDeleteConfirm = deleteConfirm === blog._id;
                const showPublishConfirm = publishConfirm === blog._id;
                const showUnpublishConfirm = unpublishConfirm === blog._id;

                return (
                  <div key={blog._id}>
                    {/* Article Row */}
                    <div 
                      className="px-6 py-4 border-b hover:bg-gray-50 transition-colors group"
                      style={{ borderColor: "#F5FAFD" }}
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Article Info */}
                        <div className="col-span-5">
                          <div className="flex items-center gap-3">
                            {blog.coverImage ? (
                              <img 
                                src={blog.coverImage} 
                                alt={blog.title}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            ) : (
                              <div 
                                className="w-12 h-12 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: "rgba(208, 221, 238, 0.3)" }}
                              >
                                <ImageIcon className="w-6 h-6" style={{ color: "#AAB6CB" }} />
                              </div>
                            )}
                            <div>
                              <h3 className="font-semibold" style={{ color: "#0C0D14" }}>
                                {blog.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-3 h-3" style={{ color: "#AAB6CB" }} />
                                <span className="text-xs" style={{ color: "#748DB0" }}>
                                  {blog.readingTime || "5 min read"}
                                </span>
                                {blog.excerpt && (
                                  <>
                                    <span className="text-xs" style={{ color: "#D0DDEE" }}>•</span>
                                    <span className="text-xs truncate max-w-[200px]" style={{ color: "#748DB0" }}>
                                      {blog.excerpt.substring(0, 50)}...
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Category */}
                        <div className="col-span-2">
                          <span 
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: categoryColor.bg,
                              color: categoryColor.text
                            }}
                          >
                            {blog.category}
                          </span>
                        </div>

                        {/* Date */}
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" style={{ color: "#748DB0" }} />
                            <span className="text-sm" style={{ color: "#3C637B" }}>
                              {formatDate(blog.createdAt)}
                            </span>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ 
                                backgroundColor: blog.status === 'published' ? '#16a34a' : '#ca8a04'
                              }}
                            />
                            <span className="text-sm" style={{ color: "#3C637B" }}>
                              {blog.status === 'published' ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="col-span-1">
                          <div className="flex items-center justify-end gap-2">
                            {/* Publish/Unpublish Button */}
                            {blog.status === 'draft' ? (
                              <button
                                onClick={() => setPublishConfirm(showPublishConfirm ? null : blog._id)}
                                className="p-2 rounded transition-all hover:opacity-80"
                                style={{
                                  backgroundColor: showPublishConfirm ? "rgba(34, 197, 94, 0.1)" : "#F5FAFD",
                                  color: showPublishConfirm ? "#16a34a" : "#3C637B"
                                }}
                                title="Publish"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setUnpublishConfirm(showUnpublishConfirm ? null : blog._id)}
                                className="p-2 rounded transition-all hover:opacity-80"
                                style={{
                                  backgroundColor: showUnpublishConfirm ? "rgba(239, 68, 68, 0.1)" : "#F5FAFD",
                                  color: showUnpublishConfirm ? "#ef4444" : "#3C637B"
                                }}
                                title="Unpublish"
                              >
                                <EyeOff className="w-4 h-4" />
                              </button>
                            )}
                            
                            {/* Edit Button */}
                            <Link
                              to={`/admin/blog/edit/${blog._id}`}
                              className="p-2 rounded transition-all hover:opacity-80"
                              style={{
                                backgroundColor: "rgba(25, 76, 99, 0.1)",
                                color: "#194C63"
                              }}
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>

                            {/* Delete Button */}
                            <button
                              onClick={() => setDeleteConfirm(showDeleteConfirm ? null : blog._id)}
                              className="p-2 rounded transition-all hover:opacity-80"
                              style={{
                                backgroundColor: showDeleteConfirm ? "rgba(239, 68, 68, 0.1)" : "#F5FAFD",
                                color: showDeleteConfirm ? "#ef4444" : "#3C637B"
                              }}
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            {/* View Button */}
                            <a
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded transition-all hover:opacity-80"
                              style={{
                                backgroundColor: "#F5FAFD",
                                color: "#3C637B"
                              }}
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Publish Confirmation */}
                    {showPublishConfirm && (
                      <div 
                        className="px-6 py-4 border-b"
                        style={{ 
                          backgroundColor: "rgba(34, 197, 94, 0.05)",
                          borderColor: "#D0DDEE"
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5" style={{ color: "#16a34a" }} />
                            <div>
                              <p className="font-medium" style={{ color: "#16a34a" }}>Publish Article</p>
                              <p className="text-sm" style={{ color: "#3C637B" }}>
                                Are you sure you want to publish "{blog.title}"? It will be visible to the public.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => publishBlog(blog._id)}
                              className="px-4 py-2 rounded font-medium transition-all hover:opacity-90 flex items-center gap-2"
                              style={{
                                backgroundColor: "#16a34a",
                                color: "#FFFFFF"
                              }}
                            >
                              <Send className="w-4 h-4" />
                              Yes, Publish
                            </button>
                            <button
                              onClick={() => setPublishConfirm(null)}
                              className="px-4 py-2 rounded font-medium transition-all hover:opacity-90"
                              style={{
                                backgroundColor: "#F5FAFD",
                                border: "1px solid #AAB6CB",
                                color: "#3C637B"
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Unpublish Confirmation */}
                    {showUnpublishConfirm && (
                      <div 
                        className="px-6 py-4 border-b"
                        style={{ 
                          backgroundColor: "rgba(239, 68, 68, 0.05)",
                          borderColor: "#D0DDEE"
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <EyeOff className="w-5 h-5" style={{ color: "#ef4444" }} />
                            <div>
                              <p className="font-medium" style={{ color: "#ef4444" }}>Unpublish Article</p>
                              <p className="text-sm" style={{ color: "#3C637B" }}>
                                Are you sure you want to unpublish "{blog.title}"? It will be hidden from the public.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => unpublishBlog(blog._id)}
                              className="px-4 py-2 rounded font-medium transition-all hover:opacity-90 flex items-center gap-2"
                              style={{
                                backgroundColor: "#ef4444",
                                color: "#FFFFFF"
                              }}
                            >
                              <EyeOff className="w-4 h-4" />
                              Yes, Unpublish
                            </button>
                            <button
                              onClick={() => setUnpublishConfirm(null)}
                              className="px-4 py-2 rounded font-medium transition-all hover:opacity-90"
                              style={{
                                backgroundColor: "#F5FAFD",
                                border: "1px solid #AAB6CB",
                                color: "#3C637B"
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Delete Confirmation */}
                    {showDeleteConfirm && (
                      <div 
                        className="px-6 py-4 border-b"
                        style={{ 
                          backgroundColor: "rgba(239, 68, 68, 0.05)",
                          borderColor: "#D0DDEE"
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5" style={{ color: "#ef4444" }} />
                            <div>
                              <p className="font-medium" style={{ color: "#ef4444" }}>Delete Article</p>
                              <p className="text-sm" style={{ color: "#3C637B" }}>
                                Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => deleteBlog(blog._id)}
                              className="px-4 py-2 rounded font-medium transition-all hover:opacity-90 flex items-center gap-2"
                              style={{
                                backgroundColor: "#ef4444",
                                color: "#FFFFFF"
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                              Yes, Delete
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-4 py-2 rounded font-medium transition-all hover:opacity-90"
                              style={{
                                backgroundColor: "#F5FAFD",
                                border: "1px solid #AAB6CB",
                                color: "#3C637B"
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Summary */}
        {filteredBlogs.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm" style={{ color: "#748DB0" }}>
              Showing {filteredBlogs.length} of {blogs.length} articles
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color: "#B3785A" }} />
                <span className="text-sm" style={{ color: "#3C637B" }}>
                  {stats.published} published, {stats.drafts} drafts
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;