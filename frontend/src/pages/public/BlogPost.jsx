import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import { 
  Calendar, 
  Clock, 
  Tag, 
  User,
  Share2,
  Bookmark,
  ChevronRight,
  Menu,
  X,
  ArrowUp,
  Linkedin,
  Twitter,
  Facebook,
  Link2,
  Check,
  Sparkles,
  Feather,
  Quote
} from "lucide-react";

const BlogPost = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState("");
  const [showMobileToc, setShowMobileToc] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [estimatedReadTime, setEstimatedReadTime] = useState("");
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/blogs/${slug}`);
        setBlog(data);
        
        // Calculate reading time based on content length
        if (data.content) {
          const wordCount = data.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
          const readTime = Math.max(1, Math.ceil(wordCount / 200));
          setEstimatedReadTime(`${readTime} min read`);
        }
      } catch (error) {
        console.error("Failed to load blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  // Extract headings from content for table of contents
  useEffect(() => {
    if (blog?.content && contentRef.current) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        const elements = contentRef.current.querySelectorAll('h1, h2, h3');
        const extractedHeadings = Array.from(elements).map((element, index) => {
          const id = `heading-${index}`;
          element.id = id;
          
          return {
            id,
            text: element.textContent,
            level: parseInt(element.tagName[1]),
            element
          };
        });
        setHeadings(extractedHeadings);
      }, 100);
    }
  }, [blog?.content]);

  // Track scroll position for active heading and progress
  useEffect(() => {
    const handleScroll = () => {
      // Calculate reading progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadingProgress(Math.min(100, progress));

      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 400);

      // Update active heading
      const scrollPosition = window.scrollY + 120;
      
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        const element = document.getElementById(heading.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveHeading(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setShowMobileToc(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Career": { bg: "rgba(25, 76, 99, 0.1)", text: "#194C63", light: "#E8F0F5" },
      "Leadership": { bg: "rgba(179, 120, 90, 0.1)", text: "#B3785A", light: "#F8EFEA" },
      "HR Systems": { bg: "rgba(60, 99, 123, 0.1)", text: "#3C637B", light: "#E9EEF2" },
      "Personal Growth": { bg: "rgba(116, 141, 176, 0.1)", text: "#748DB0", light: "#F0F3F7" },
      "Organizational Development": { bg: "rgba(25, 76, 99, 0.1)", text: "#194C63", light: "#E8F0F5" },
      "Coaching": { bg: "rgba(179, 120, 90, 0.1)", text: "#B3785A", light: "#F8EFEA" },
      "Workplace Culture": { bg: "rgba(60, 99, 123, 0.1)", text: "#3C637B", light: "#E9EEF2" }
    };
    return colors[category] || { bg: "rgba(208, 221, 238, 0.2)", text: "#748DB0", light: "#F5F8FC" };
  };

  // Helper function to safely parse tags
  const parseTags = (tags) => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'string') {
      return tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }
    return [];
  };

  const shareArticle = (platform) => {
    const url = window.location.href;
    const title = blog?.title || '';
    
    let shareUrl = '';
    switch(platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5FAFD] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#D0DDEE] border-t-[#194C63] rounded-full animate-spin"></div>
            <Sparkles className="w-6 h-6 text-[#B3785A] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="mt-6 text-[#3C637B] font-light">Loading insight...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5FAFD] to-white flex items-center justify-center p-4">
        <div 
          className="max-w-lg w-full p-10 rounded-3xl text-center backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid #D0DDEE",
            boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.1)"
          }}
        >
          <Feather className="w-16 h-16 mx-auto mb-6 text-[#B3785A]" />
          <h2 className="text-2xl font-light mb-3" style={{ color: "#194C63" }}>Article Not Found</h2>
          <p className="mb-8 text-[#3C637B]">The insight you're seeking seems to have drifted away.</p>
          <a
            href="/articles"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all hover:opacity-90"
            style={{
              backgroundColor: "#194C63",
              color: "#F5FAFD"
            }}
          >
            Return to Blog
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  const categoryColor = getCategoryColor(blog.category);
  const tags = parseTags(blog.tags);
  const readTime = blog.readingTime || estimatedReadTime;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5FAFD] to-white">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 z-50 transition-all duration-300"
        style={{ 
          width: `${readingProgress}%`,
          backgroundColor: "#B3785A",
          boxShadow: "0 0 10px rgba(179, 120, 90, 0.3)"
        }}
      />

      {/* Hero Section - Image Left, Content Right */}
      <div className="relative pt-12 pb-12 lg:pt-16 lg:pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#194C63]/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#B3785A]/5 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <a 
            href="/blog"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:gap-3 group"
            style={{ color: "#748DB0" }}
          >
            <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Back to all insights</span>
          </a>

          {/* Hero Grid - Image Left, Content Right */}
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-center">
            {/* Left Column - Image */}
            {blog.coverImage ? (
              <div className="order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-[5/3]">
                  <img 
                    src={blog.coverImage} 
                    alt={blog.title}
                    className="w-full h-[350px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            ) : (
              <div className="order-2 lg:order-1">
                <div 
                  className="rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center"
                  style={{ backgroundColor: categoryColor.light }}
                >
                  <Feather className="w-20 h-20" style={{ color: categoryColor.text, opacity: 0.5 }} />
                </div>
              </div>
            )}

            {/* Right Column - Content */}
            <div className="order-1 lg:order-2">
              {/* Category & Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span 
                  className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide"
                  style={{
                    backgroundColor: categoryColor.bg,
                    color: categoryColor.text,
                    border: `1px solid ${categoryColor.text}20`
                  }}
                >
                  {blog.category}
                </span>
                <div className="flex items-center gap-4 text-sm" style={{ color: "#748DB0" }}>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                  <div className="w-px h-4" style={{ backgroundColor: "#D0DDEE" }} />
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{readTime}</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-light leading-tight mb-4" style={{ color: "#194C63" }}>
                {blog.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg lg:text-xl font-light leading-relaxed mb-6" style={{ color: "#3C637B" }}>
                {blog.excerpt}
              </p>

              {/* Author & Actions */}
              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "#D0DDEE" }}>
                <div className="flex items-center gap-4">
                  {blog.author ? (
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: categoryColor.light }}
                      >
                        <span className="text-sm font-medium" style={{ color: categoryColor.text }}>
                          {blog.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#194C63" }}>{blog.author}</p>
                        <p className="text-xs" style={{ color: "#748DB0" }}>Author</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#F5FAFD" }}
                      >
                        <User className="w-5 h-5" style={{ color: "#748DB0" }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#194C63" }}>Brenda</p>
                        <p className="text-xs" style={{ color: "#748DB0" }}>HR Consultant & Coach</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Share Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => shareArticle('linkedin')}
                    className="p-2 rounded-lg hover:bg-[#F5FAFD] transition-colors group"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" style={{ color: "#748DB0" }} />
                  </button>
                  <button
                    onClick={() => shareArticle('twitter')}
                    className="p-2 rounded-lg hover:bg-[#F5FAFD] transition-colors"
                    title="Share on Twitter"
                  >
                    <Twitter className="w-5 h-5" style={{ color: "#748DB0" }} />
                  </button>
                  <button
                    onClick={() => shareArticle('copy')}
                    className="p-2 rounded-lg hover:bg-[#F5FAFD] transition-colors relative"
                    title="Copy link"
                  >
                    {copied ? (
                      <Check className="w-5 h-5" style={{ color: "#16a34a" }} />
                    ) : (
                      <Link2 className="w-5 h-5" style={{ color: "#748DB0" }} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with TOC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Table of Contents - 30% */}
          <div className="lg:w-[30%] order-2 lg:order-1">
            <div className="sticky top-24">
              <div 
                className="rounded-xl p-6 backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid #D0DDEE",
                  boxShadow: "0 8px 20px -8px rgba(0, 0, 0, 0.08)"
                }}
              >
                {/* Mobile Toggle */}
                <div className="lg:hidden mb-4">
                  <button
                    onClick={() => setShowMobileToc(!showMobileToc)}
                    className="w-full py-3 px-4 rounded-lg flex items-center justify-between"
                    style={{
                      backgroundColor: "#F5FAFD",
                      border: "1px solid #D0DDEE"
                    }}
                  >
                    <span className="font-medium" style={{ color: "#194C63" }}>Table of Contents</span>
                    {showMobileToc ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                  </button>
                </div>

                {/* TOC Content */}
                <div className={`${showMobileToc ? 'block' : 'hidden'} lg:block`}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#748DB0" }}>
                    In this article
                  </h4>

                  {headings.length > 0 ? (
                    <nav className="space-y-1">
                      {headings.map((heading) => (
                        <button
                          key={heading.id}
                          onClick={() => scrollToHeading(heading.id)}
                          className={`block w-full text-left py-2 px-3 rounded-lg transition-all ${
                            activeHeading === heading.id 
                              ? 'font-medium shadow-sm' 
                              : 'hover:bg-[#F5FAFD]'
                          }`}
                          style={{
                            paddingLeft: `${heading.level * 16}px`,
                            backgroundColor: activeHeading === heading.id ? categoryColor.light : 'transparent',
                            color: activeHeading === heading.id ? categoryColor.text : '#3C637B'
                          }}
                        >
                          <span className="text-sm">{heading.text}</span>
                        </button>
                      ))}
                    </nav>
                  ) : (
                    <p className="text-sm italic" style={{ color: "#748DB0" }}>Simple. Clear. Focused.</p>
                  )}

                  {/* Reading Time */}
                  <div className="mt-6 pt-6 border-t" style={{ borderColor: "#D0DDEE" }}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span style={{ color: "#748DB0" }}>Reading progress</span>
                      <span className="font-medium" style={{ color: "#194C63" }}>{Math.round(readingProgress)}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-[#F5FAFD] overflow-hidden">
                      <div 
                        className="h-full transition-all duration-300 rounded-full"
                        style={{ 
                          width: `${readingProgress}%`,
                          backgroundColor: "#B3785A"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - 70% */}
          <div className="lg:w-[70%] order-1 lg:order-2">
            <div 
              ref={contentRef}
              className="prose prose-lg max-w-none"
              style={{
                color: "#3C637B"
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-12 pt-8 border-t" style={{ borderColor: "#D0DDEE" }}>
                <h4 className="text-sm font-medium mb-4" style={{ color: "#194C63" }}>Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-lg text-sm transition-all hover:shadow-sm cursor-default"
                      style={{
                        backgroundColor: "#F5FAFD",
                        color: "#3C637B",
                        border: "1px solid #D0DDEE"
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quote (if exists) */}
            {blog.highlightQuote && (
              <div className="mt-12 p-8 rounded-2xl relative" style={{ backgroundColor: categoryColor.light }}>
                <Quote className="absolute top-4 right-4 w-8 h-8 opacity-20" style={{ color: categoryColor.text }} />
                <p className="text-xl italic font-light" style={{ color: categoryColor.text }}>
                  "{blog.highlightQuote}"
                </p>
              </div>
            )}

            {/* Footer Actions */}
            <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "#D0DDEE" }}>
              <div className="flex items-center gap-4">
                <span className="text-sm" style={{ color: "#748DB0" }}>Was this helpful?</span>
                <button className="px-4 py-2 rounded-lg text-sm transition-all hover:shadow-sm" style={{ backgroundColor: "#F5FAFD", color: "#3C637B" }}>
                  👍 Yes
                </button>
                <button className="px-4 py-2 rounded-lg text-sm transition-all hover:shadow-sm" style={{ backgroundColor: "#F5FAFD", color: "#3C637B" }}>
                  💡 Insightful
                </button>
              </div>
              <a
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3 group"
                style={{ color: "#B3785A" }}
              >
                <span>More insights</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all hover:scale-110 z-40 group"
          style={{
            backgroundColor: "#194C63",
            color: "#F5FAFD",
            boxShadow: "0 4px 15px rgba(25, 76, 99, 0.3)"
          }}
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

      {/* Global Styles for Prose */}
      <style jsx global>{`
        .prose {
          color: #3C637B;
          font-size: 1.125rem;
          line-height: 1.8;
        }
        
        .prose h1, .prose h2, .prose h3, .prose h4 {
          color: #194C63;
          font-weight: 400;
          letter-spacing: -0.02em;
          margin-top: 2.5em;
          margin-bottom: 1em;
        }
        
        .prose h1 {
          font-size: 2.5em;
          font-weight: 300;
          border-bottom: 1px solid #D0DDEE;
          padding-bottom: 0.5em;
        }
        
        .prose h2 {
          font-size: 2em;
          font-weight: 300;
        }
        
        .prose h3 {
          font-size: 1.5em;
          font-weight: 400;
        }
        
        .prose p {
          margin: 1.5em 0;
        }
        
        .prose p:first-child {
          margin-top: 0;
        }
        
        .prose a {
          color: #194C63;
          text-decoration: none;
          border-bottom: 1px solid #B3785A;
          transition: opacity 0.2s;
        }
        
        .prose a:hover {
          opacity: 0.7;
        }
        
        .prose ul, .prose ol {
          margin: 1.5em 0;
          padding-left: 1.5em;
        }
        
        .prose li {
          margin: 0.5em 0;
        }
        
        .prose blockquote {
          border-left: 3px solid #B3785A;
          padding-left: 1.5em;
          font-style: italic;
          color: #3C637B;
          margin: 2em 0;
          font-weight: 300;
        }
        
        .prose code {
          background: #F5FAFD;
          border: 1px solid #D0DDEE;
          border-radius: 4px;
          padding: 0.2em 0.4em;
          font-size: 0.9em;
          font-family: 'SF Mono', Monaco, Consolas, monospace;
        }
        
        .prose pre {
          background: #0C0D14;
          color: #F5FAFD;
          border-radius: 12px;
          padding: 1.5em;
          overflow-x: auto;
          margin: 2em 0;
        }
        
        .prose img {
          border-radius: 12px;
          margin: 2em 0;
          box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.1);
        }
        
        .prose hr {
          border: none;
          height: 1px;
          background: linear-gradient(to right, transparent, #D0DDEE, transparent);
          margin: 3em 0;
        }
        
        @media (max-width: 768px) {
          .prose {
            font-size: 1rem;
          }
          
          .prose h1 { font-size: 2em; }
          .prose h2 { font-size: 1.75em; }
          .prose h3 { font-size: 1.25em; }
          
          /* Mobile responsive for hero section */
          .order-1 {
            order: 1;
          }
          .order-2 {
            order: 2;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogPost;