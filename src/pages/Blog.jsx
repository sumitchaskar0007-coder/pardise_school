import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogAPI, getApiAssetUrl } from "../api";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    blogAPI.getAll()
      .then((res) => {
        if (active) setBlogs(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => {
        if (active) setError("Blogs are temporarily unavailable. Please try again later.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold mb-6">Our Blog</h1>

      {loading && <p className="text-gray-600">Loading blogs...</p>}
      {error && <p className="text-red-600" role="alert">{error}</p>}

      {blogs.map((b) => (
        <div key={b._id} className="border rounded mb-6 overflow-hidden">
          {b.image && (
            <img
              src={getApiAssetUrl(b.image)}
              alt={b.title || "School blog"}
              className="w-full h-64 object-cover"
            />
          )}

          <div className="p-4">
            <h2 className="text-xl font-bold">{b.title}</h2>
            <p className="text-sm text-gray-500">
              {new Date(b.createdAt).toDateString()}
            </p>

            <p className="mt-2">
              {(b.content || "").substring(0, 150)}...
            </p>

            <Link
              to={`/blog/${b._id}`}
              className="inline-block mt-3 text-blue-600 font-semibold"
            >
              Read More →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
