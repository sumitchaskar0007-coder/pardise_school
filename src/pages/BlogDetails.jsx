import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogAPI, getApiAssetUrl } from "../api";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    blogAPI.getById(id)
      .then((res) => {
        if (active) setBlog(res.data);
      })
      .catch(() => {
        if (active) setError("This blog could not be loaded. Please try again later.");
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (error) return <p className="p-6 pt-28 text-red-600" role="alert">{error}</p>;
  if (!blog) return <p className="p-6 pt-28">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {blog.image && (
        <img
          src={getApiAssetUrl(blog.image)}
          alt={blog.title || "School blog"}
          className="w-full h-80 object-cover mb-4"
        />
      )}

      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        By {blog.author} • {new Date(blog.createdAt).toDateString()}
      </p>

      <p className="leading-7">{blog.content}</p>
    </div>
  );
};

export default BlogDetails;
