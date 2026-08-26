import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogAPI, getApiAssetUrl } from '../api';

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [progress, setProgress] = useState(0);
  const articleRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!blog) return;
    // SEO: title + meta description
    document.title = blog.metaTitle || blog.title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = blog.metaDescription || blog.excerpt || '';
  }, [blog]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const res = await blogAPI.getBySlug(slug);
      setBlog(res.data?.data || null);
    } catch (err) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        (blog?.title || '') + ' ' + shareUrl
      )}`,
      '_blank'
    );
  };

  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      '_blank'
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading article…
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-5">
        <h1 className="text-3xl font-bold text-[#222] mb-3">Article not found</h1>
        <p className="text-gray-500 mb-6">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate('/blog')}
          className="px-6 py-3 bg-[#1a1a1a] text-white rounded-full hover:bg-black transition"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <div
          className="h-1 bg-[#c99b3f] transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Sticky mini header */}
      <div className="sticky top-1 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between">
          <Link to="/blog" className="text-sm text-gray-500 hover:text-[#222]">
            ← All Articles
          </Link>
          <span className="text-sm font-medium text-[#222] truncate max-w-[50%] hidden sm:block">
            {blog.title}
          </span>
        </div>
      </div>

      <article className="max-w-[720px] mx-auto px-5 py-12">
        {/* Title block */}
        <h1
          className="text-[36px] md:text-[46px] leading-tight font-bold text-[#222]"
          style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
        >
          {blog.title}
        </h1>

        {blog.excerpt && (
          <p className="mt-4 text-xl text-gray-500 leading-relaxed">{blog.excerpt}</p>
        )}

        <div className="mt-6 flex items-center gap-3 text-gray-500 text-sm border-b border-gray-100 pb-6">
          <div className="w-9 h-9 rounded-full bg-[#c99b3f] text-white flex items-center justify-center font-semibold">
            {blog.author?.charAt(0) || 'P'}
          </div>
          <div>
            <div className="text-[#222] font-medium">{blog.author}</div>
            <div>
              {formatDate(blog.createdAt)} · {blog.readingTime} min read
            </div>
          </div>

          {/* Share buttons */}
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={shareWhatsApp}
              title="Share on WhatsApp"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
            >
              🟢
            </button>
            <button
              onClick={shareLinkedIn}
              title="Share on LinkedIn"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
            >
              in
            </button>
          </div>
        </div>

        {/* Cover image */}
        {blog.coverImage && (
          <img
            src={getApiAssetUrl(blog.coverImage)}
            alt={blog.title}
            className="w-full rounded-lg mt-8 object-cover max-h-[420px]"
          />
        )}

        {/* Content — drop cap on first paragraph + styling for headings/quotes/highlights
            produced by the admin rich-text editor */}
        <div
          ref={articleRef}
          className="blog-content mt-10 text-[19px] leading-[1.8] text-[#222]"
          style={{ fontFamily: 'Inter, Helvetica, Arial, sans-serif' }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <hr className="my-12 border-gray-100" />

        {/* CTA */}
        <div className="bg-[#faf6ea] rounded-2xl p-8 text-center">
          <h3
            className="text-2xl font-bold text-[#222]"
            style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
          >
            Curious to see it for yourself?
          </h3>
          <p className="mt-2 text-gray-600">
            Come explore our campus and meet our teachers in person.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="px-6 py-3 bg-[#1a1a1a] text-white rounded-full font-medium hover:bg-black transition"
            >
              Book a School Visit
            </Link>
            <Link
              to="/admissions"
              className="px-6 py-3 border border-[#1a1a1a] text-[#1a1a1a] rounded-full font-medium hover:bg-gray-100 transition"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </article>

      {/* Styling for the rich-text content injected via dangerouslySetInnerHTML.
          Scoped with the .blog-content class so it doesn't leak globally. */}
      <style>{`
        .blog-content > p:first-of-type::first-letter {
          font-family: Georgia, "Playfair Display", serif;
          font-size: 64px;
          font-weight: 700;
          float: left;
          line-height: 0.85;
          margin-right: 10px;
          margin-top: 6px;
          color: #c99b3f;
        }
        .blog-content h2 {
          font-family: Georgia, "Playfair Display", serif;
          font-size: 28px;
          font-weight: 700;
          color: #222;
          margin-top: 40px;
          margin-bottom: 16px;
        }
        .blog-content h3 {
          font-family: Georgia, "Playfair Display", serif;
          font-size: 22px;
          font-weight: 700;
          color: #222;
          margin-top: 32px;
          margin-bottom: 12px;
        }
        .blog-content p {
          margin-bottom: 22px;
        }
        .blog-content ul, .blog-content ol {
          margin: 0 0 22px 24px;
        }
        .blog-content li {
          margin-bottom: 8px;
        }
        .blog-content img {
          width: 100%;
          border-radius: 8px;
          margin: 28px 0;
        }
        .blog-content blockquote {
          border-left: 4px solid #c99b3f;
          padding: 4px 0 4px 20px;
          margin: 32px 0;
          font-family: Georgia, "Playfair Display", serif;
          font-style: italic;
          font-size: 24px;
          color: #333;
        }
        .blog-content .highlight-box {
          background: #fdf6e3;
          border-radius: 8px;
          padding: 20px 24px;
          margin: 28px 0;
          font-size: 18px;
        }
        .blog-content a {
          color: #c99b3f;
          text-decoration: underline;
        }
        .blog-content strong {
          font-weight: 700;
        }
        @media (max-width: 640px) {
          .blog-content { font-size: 17px; }
          .blog-content > p:first-of-type::first-letter { font-size: 52px; }
        }
      `}</style>
    </div>
  );
};

export default BlogDetails;