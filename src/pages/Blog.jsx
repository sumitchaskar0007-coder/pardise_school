import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI, getApiAssetUrl } from '../api';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Blog | Paradise EMS';
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await blogAPI.getAll();
      const published = (res.data?.data || []).filter((b) => b.published);
      setBlogs(published);
    } catch (err) {
      setError('Unable to load blog posts right now. Please try again later.');
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

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-5 py-14 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold text-[#222]"
            style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
          >
            Our Blog
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Insights, stories and updates from Paradise EMS
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-12">
        {loading && (
          <div className="text-center text-gray-400 py-20">Loading articles…</div>
        )}

        {!loading && error && (
          <div className="text-center text-red-500 py-20">{error}</div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            No articles published yet. Check back soon!
          </div>
        )}

        <div className="flex flex-col divide-y divide-gray-100">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog.slug}`}
              className="group flex flex-col md:flex-row gap-6 py-8 first:pt-0"
            >
              {blog.coverImage && (
                <div className="md:w-56 w-full flex-shrink-0">
                  <img
                    src={getApiAssetUrl(blog.coverImage)}
                    alt={blog.title}
                    className="w-full h-40 md:h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="flex-1">
                <h2
                  className="text-2xl font-bold text-[#222] group-hover:underline"
                  style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
                >
                  {blog.title}
                </h2>
                {blog.excerpt && (
                  <p className="mt-2 text-gray-600 text-[17px] leading-relaxed line-clamp-2">
                    {blog.excerpt}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                  <span>{blog.author}</span>
                  <span>·</span>
                  <span>{formatDate(blog.createdAt)}</span>
                  <span>·</span>
                  <span>{blog.readingTime} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;