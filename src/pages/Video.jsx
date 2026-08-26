import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { videoAPI, getApiAssetUrl } from '../api';

const getYouTubeThumbnail = (url) => {
  const match = url?.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : '';
};

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    document.title = 'Videos | Paradise EMS';
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await videoAPI.getAll();
      const published = (res.data?.data || []).filter((v) => v.published);
      setVideos(published);
    } catch (err) {
      setError('Unable to load videos right now. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(videos.map((v) => v.category || 'General'))];
  const filtered =
    activeCategory === 'All'
      ? videos
      : videos.filter((v) => (v.category || 'General') === activeCategory);

  const thumbFor = (video) => {
    if (video.thumbnail) return getApiAssetUrl(video.thumbnail);
    if (video.sourceType === 'youtube') return getYouTubeThumbnail(video.videoUrl);
    return '';
  };

  return (
    <div className="bg-white min-h-screen pt-8 md:pt-12 lg:pt-16">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 py-10 sm:py-14 text-center">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#222]"
            style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
          >
            Video Gallery
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-500">
            Watch moments and stories from Paradise EMS
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-5 py-8 sm:py-12">
        {/* Category filters */}
        {categories.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-1 px-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition ${
                  activeCategory === cat
                    ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="text-center text-gray-400 py-20">Loading videos…</div>
        )}

        {!loading && error && (
          <div className="text-center text-red-500 py-20">{error}</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            No videos published yet. Check back soon!
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((video) => (
            <Link
              key={video._id}
              to={`/videos/${video.slug}`}
              className="group block rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                {thumbFor(video) ? (
                  <img
                    src={thumbFor(video)}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
                    ▶
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 flex items-center justify-center text-[#1a1a1a] text-lg shadow">
                    ▶
                  </div>
                </div>
                {video.duration && (
                  <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded">
                    {video.duration}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-[#222] text-base sm:text-lg line-clamp-2 group-hover:underline">
                  {video.title}
                </h2>
                {video.description && (
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {video.description}
                  </p>
                )}
                <div className="mt-3 text-xs text-gray-400">
                  {video.category || 'General'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;