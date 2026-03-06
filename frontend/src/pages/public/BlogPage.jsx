import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Tag, 
  ArrowRight, 
  Search,
  Sparkles,
  BookOpen,
  User,
  Filter,
  ChevronRight,
  Eye
} from "lucide-react";

const BlogPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [searchTerm, selectedCategory, blogs]);

  const loadBlogs = async () => {
    setLoading(true);
  
    try {
      const { data } = await api.get("/blogs");
  
      // only published blogs
      const publishedBlogs = data.filter(blog => blog.published);
  
      setBlogs(publishedBlogs);
      setFilteredBlogs(publishedBlogs);
  
      if (publishedBlogs.length > 0) {
        setFeaturedBlog(publishedBlogs[0]);
      }
  
      const uniqueCategories = [
        ...new Set(publishedBlogs.map(blog => blog.category))
      ];
  
      setCategories(uniqueCategories);
  
    } catch (error) {
      console.error("Failed to load blogs:", error);
    } finally {
      setLoading(false);
    }
  };
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
    if (selectedCategory !== "all") {
      result = result.filter(blog => blog.category === selectedCategory);
    }

    setFilteredBlogs(result);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Career":
        return { bg: "rgba(25, 76, 99, 0.1)", text: "#194C63", border: "#194C63" };
      case "Leadership":
        return { bg: "rgba(179, 120, 90, 0.1)", text: "#B3785A", border: "#B3785A" };
      case "HR Systems":
        return { bg: "rgba(60, 99, 123, 0.1)", text: "#3C637B", border: "#3C637B" };
      case "Personal Growth":
        return { bg: "rgba(116, 141, 176, 0.1)", text: "#748DB0", border: "#748DB0" };
      default:
        return { bg: "rgba(208, 221, 238, 0.2)", text: "#748DB0", border: "#D0DDEE" };
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FAFD]">
      {/* Hero Section */}
      <div 
        className="relative overflow-hidden py-16 lg:py-20"
        style={{ backgroundColor: "#194C63" }}
      >
        

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#F5FAFD"
            }}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Insights & Reflections</span>
          </div>

         
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Practical insights, frameworks, and reflections from my work with organizations and leaders.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Search and Filter Bar */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-4 h-4" style={{ color: "#AAB6CB" }} />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 p-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D0DDEE",
                  color: "#0C0D14"
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 w-full md:w-auto">
              <Filter className="w-4 h-4 flex-shrink-0" style={{ color: "#748DB0" }} />
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === "all" ? "text-white" : "hover:opacity-90"
                }`}
                style={{
                  backgroundColor: selectedCategory === "all" ? "#194C63" : "#FFFFFF",
                  border: selectedCategory === "all" ? "none" : "1px solid #D0DDEE",
                  color: selectedCategory === "all" ? "#F5FAFD" : "#3C637B"
                }}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category ? "text-white" : "hover:opacity-90"
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category ? "#194C63" : "#FFFFFF",
                    border: selectedCategory === category ? "none" : "1px solid #D0DDEE",
                    color: selectedCategory === category ? "#F5FAFD" : "#3C637B"
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#194C63" }}></div>
            <p className="mt-3" style={{ color: "#3C637B" }}>Loading insights...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div 
            className="text-center py-16 rounded-2xl"
            style={{
              backgroundColor: "#FFFFFF",
              border: "2px dashed #D0DDEE"
            }}
          >
            <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#F5FAFD" }}>
              <BookOpen className="w-10 h-10" style={{ color: "#AAB6CB" }} />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: "#194C63" }}>
              No articles found
            </h3>
            <p className="mb-6" style={{ color: "#3C637B" }}>
              {searchTerm || selectedCategory !== "all" 
                ? "Try adjusting your search or filter" 
                : "Check back soon for new insights"}
            </p>
            {(searchTerm || selectedCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90"
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
            {/* Featured Article */}
            {featuredBlog && filteredBlogs.length > 0 && !searchTerm && selectedCategory === "all" && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: "#194C63" }}>
                  <Sparkles className="w-5 h-5" style={{ color: "#B3785A" }} />
                  Featured Article
                </h2>
                <Link
                  to={`/articles/${featuredBlog.slug}`}
                  className="group block"
                >
                  <div 
                    className="rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #D0DDEE"
                    }}
                  >
                    {featuredBlog.coverImage && (
                      <div className="h-54 md:h-84 overflow-hidden">
                        <img 
                          src={featuredBlog.coverImage} 
                          alt={featuredBlog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: getCategoryColor(featuredBlog.category).bg,
                            color: getCategoryColor(featuredBlog.category).text
                          }}
                        >
                          {featuredBlog.category}
                        </span>
                        <div className="flex items-center gap-2 text-sm" style={{ color: "#748DB0" }}>
                          <Calendar className="w-4 h-4" />
                          {formatDate(featuredBlog.createdAt)}
                        </div>
                        <div className="flex items-center gap-2 text-sm" style={{ color: "#748DB0" }}>
                          <Clock className="w-4 h-4" />
                          {featuredBlog.readingTime || "5 min read"}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-opacity-90 transition-colors" style={{ color: "#194C63" }}>
                        {featuredBlog.title}
                      </h3>
                      <p className="text-lg mb-6" style={{ color: "#3C637B" }}>
                        {featuredBlog.excerpt}
                      </p>
                      <div className="flex items-center gap-2 font-medium" style={{ color: "#B3785A" }}>
                        Read full article
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Articles Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "#194C63" }}>
                {searchTerm || selectedCategory !== "all" ? "Search Results" : "Latest Articles"}
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(searchTerm || selectedCategory !== "all" ? filteredBlogs : filteredBlogs.slice(featuredBlog ? 1 : 0)).map((blog) => {
                  const categoryColor = getCategoryColor(blog.category);
                  
                  return (
                    <Link
                      key={blog._id}
                      to={`/articles/${blog.slug}`}
                      className="group block"
                    >
                      <div 
                        className="h-full rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1"
                        style={{
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #D0DDEE"
                        }}
                      >
                        {blog.coverImage && (
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={blog.coverImage} 
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span 
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: categoryColor.bg,
                                color: categoryColor.text
                              }}
                            >
                              {blog.category}
                            </span>
                            <div className="flex items-center gap-1 text-xs" style={{ color: "#748DB0" }}>
                              <Clock className="w-3 h-3" />
                              {blog.readingTime || "5 min"}
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-opacity-90 transition-colors" style={{ color: "#194C63" }}>
                            {blog.title}
                          </h3>
                          
                          <p className="text-sm mb-4 line-clamp-2" style={{ color: "#3C637B" }}>
                            {blog.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "#F5FAFD" }}>
                            <div className="flex items-center gap-2 text-xs" style={{ color: "#748DB0" }}>
                              <Calendar className="w-3 h-3" />
                              {formatDate(blog.createdAt).split(' ').slice(0, 2).join(' ')}
                            </div>
                            <div className="flex items-center gap-1 text-sm font-medium" style={{ color: "#194C63" }}>
                              <span>Read</span>
                              <Eye className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-8 text-center">
              <p style={{ color: "#748DB0" }}>
                Showing {filteredBlogs.length} of {blogs.length} articles
              </p>
            </div>
          </>
        )}

        {/* Newsletter CTA */}
        <div 
          className="mt-16 p-8 rounded-2xl text-center"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D0DDEE"
          }}
        >
          <h3 className="text-2xl font-bold mb-3" style={{ color: "#194C63" }}>
            Never Miss an Insight
          </h3>
          <p className="mb-6" style={{ color: "#3C637B" }}>
            Subscribe to receive new articles and reflections directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: "#F5FAFD",
                border: "1px solid #AAB6CB",
                color: "#0C0D14"
              }}
            />
            <button
              className="px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90"
              style={{
                backgroundColor: "#194C63",
                color: "#F5FAFD"
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;