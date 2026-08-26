import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { videoAPI, getApiAssetUrl } from '../api';

const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const VideoDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (!video) return;
    document.title = `${video.title} | Paradise EMS Videos`;
  }, [video]);

  const fetchVideo = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const res = await videoAPI.getBySlug(slug);
      const data = res.data?.data || null;
      setVideo(data);
      if (data) fetchRelated(data);
    } catch (err) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async (current) => {
    try {
      const res = await videoAPI.getAll();
      const others = (res.data?.data || [])
        .filter((v) => v.published && v._id !== current._id)
        .filter((v) => (v.category || 'General') === (current.category || 'General'))
        .slice(0, 3);
      setRelated(others);
    } catch (err) {
      // silently ignore — related videos are a nice-to-have
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading video…
      </div>
    );
  }

  if (notFound || !video) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#222] mb-3">
          Video not found
        </h1>
        <p className="text-gray-500 mb-6">
          The video you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate('/videos')}
          className="px-6 py-3 bg-[#1a1a1a] text-white rounded-full hover:bg-black transition"
        >
          Back to Videos
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-5 py-6 sm:py-10">
        <Link to="/videos" className="text-sm text-gray-500 hover:text-[#222]">
          ← All Videos
        </Link>

        {/* Player */}
        <div className="mt-4 rounded-xl overflow-hidden bg-black aspect-video">
          {video.sourceType === 'youtube' ? (
            <iframe
              className="w-full h-full"
              src={getYouTubeEmbedUrl(video.videoUrl)}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              className="w-full h-full"
              src={getApiAssetUrl(video.videoFile)}
              poster={video.thumbnail ? getApiAssetUrl(video.thumbnail) : undefined}
              controls
            />
          )}
        </div>

        {/* Info */}
        <h1
          className="mt-6 text-2xl sm:text-3xl md:text-[34px] font-bold text-[#222] leading-snug"
          style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
        >
          {video.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-400">
          <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {video.category || 'General'}
          </span>
          <span>·</span>
          <span>{formatDate(video.createdAt)}</span>
        </div>

        {video.description && (
          <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed whitespace-pre-line">
            {video.description}
          </p>
        )}

        {video.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 bg-[#faf6ea] rounded-2xl p-6 sm:p-8 text-center">
          <h3
            className="text-xl sm:text-2xl font-bold text-[#222]"
            style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
          >
            Want to see more of campus life?
          </h3>
          <div className="mt-5 flex flex-wrap gap-4 justify-center">
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

        {/* Related videos */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-[#222] mb-4">More like this</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((v) => (
                <Link
                  key={v._id}
                  to={`/videos/${v.slug}`}
                  className="block rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video bg-gray-100">
                    {v.thumbnail && (
                      <img
                        src={getApiAssetUrl(v.thumbnail)}
                        alt={v.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-[#222] line-clamp-2">
                      {v.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDetails;