import { useEffect, useState } from 'react';
import { videoAPI, getApiAssetUrl } from '../../api';

const emptyForm = {
  title: '',
  description: '',
  category: 'General',
  tags: '',
  duration: '',
  sourceType: 'youtube',
  videoUrl: '',
  published: true,
};

const VideoAdmin = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoFileName, setVideoFileName] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await videoAPI.getAll();
      setVideos(res.data?.data || []);
    } catch (err) {
      setError('Failed to load videos.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setThumbnailFile(null);
    setThumbnailPreview('');
    setVideoFile(null);
    setVideoFileName('');
    setEditingId(null);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (video) => {
    setError('');
    setForm({
      title: video.title || '',
      description: video.description || '',
      category: video.category || 'General',
      tags: (video.tags || []).join(', '),
      duration: video.duration || '',
      sourceType: video.sourceType || 'youtube',
      videoUrl: video.videoUrl || '',
      published: !!video.published,
    });
    setEditingId(video._id);
    setThumbnailFile(null);
    setThumbnailPreview(video.thumbnail ? getApiAssetUrl(video.thumbnail) : '');
    setVideoFile(null);
    setVideoFileName(video.videoFile ? video.videoFile.split('/').pop() : '');
    setShowForm(true);
  };

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
    setVideoFileName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (form.sourceType === 'youtube' && !form.videoUrl.trim()) {
      setError('Please paste a YouTube/Vimeo video URL.');
      return;
    }
    if (form.sourceType === 'upload' && !videoFile && !editingId) {
      setError('Please select a video file to upload.');
      return;
    }

    try {
      setSaving(true);
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('description', form.description);
      fd.append('category', form.category);
      fd.append('tags', form.tags);
      fd.append('duration', form.duration);
      fd.append('sourceType', form.sourceType);
      fd.append('videoUrl', form.videoUrl);
      fd.append('published', form.published);
      if (thumbnailFile) fd.append('thumbnail', thumbnailFile);
      if (videoFile) fd.append('videoFile', videoFile);

      if (editingId) {
        await videoAPI.update(editingId, fd);
        setSuccess('Video updated successfully.');
      } else {
        await videoAPI.create(fd);
        setSuccess('Video added successfully.');
      }

      resetForm();
      setShowForm(false);
      fetchVideos();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save video.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this video? This cannot be undone.')) return;
    try {
      await videoAPI.delete(id);
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      setError('Failed to delete video.');
    }
  };

  const togglePublish = async (video) => {
    try {
      const fd = new FormData();
      fd.append('published', !video.published);
      await videoAPI.update(video._id, fd);
      fetchVideos();
    } catch (err) {
      setError('Failed to update publish status.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-4 md:px-8 pt-24 sm:pt-28 pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Video Management</h1>
          {!showForm && (
            <button
              onClick={openCreateForm}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#1a1a1a] text-white rounded-lg font-medium hover:bg-black transition"
            >
              + New Video
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 px-4 py-3 bg-green-50 text-green-600 rounded-lg text-sm">
            {success}
          </div>
        )}

        {showForm ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {editingId ? 'Edit Video' : 'Add New Video'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="self-start sm:self-auto text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleFieldChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#c99b3f]"
                placeholder="Annual Day Celebration 2026"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleFieldChange}
                  placeholder="Events, Campus Tour, Sports..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#c99b3f]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Duration (optional)
                </label>
                <input
                  type="text"
                  name="duration"
                  value={form.duration}
                  onChange={handleFieldChange}
                  placeholder="4:35"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#c99b3f]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleFieldChange}
                placeholder="annual-day, dance, music"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#c99b3f]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleFieldChange}
                rows={3}
                maxLength={500}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#c99b3f]"
              />
            </div>

            {/* Source type toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Video Source
              </label>
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, sourceType: 'youtube' }))}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium border transition ${
                    form.sourceType === 'youtube'
                      ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                      : 'bg-white text-gray-600 border-gray-200'
                  }`}
                >
                  YouTube / Vimeo Link
                </button>
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, sourceType: 'upload' }))}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium border transition ${
                    form.sourceType === 'upload'
                      ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                      : 'bg-white text-gray-600 border-gray-200'
                  }`}
                >
                  Upload File
                </button>
              </div>

              {form.sourceType === 'youtube' ? (
                <input
                  type="text"
                  name="videoUrl"
                  value={form.videoUrl}
                  onChange={handleFieldChange}
                  placeholder="https://www.youtube.com/watch?v=xxxxxxxxxxx"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#c99b3f]"
                />
              ) : (
                <div>
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime,video/ogg"
                    onChange={handleVideoFileChange}
                    className="block w-full text-sm"
                  />
                  {videoFileName && (
                    <p className="text-xs text-gray-500 mt-1">Selected: {videoFileName}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Accepted formats: mp4, webm, mov, ogg (max 100MB)
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Thumbnail Image
              </label>
              <input type="file" accept="image/*" onChange={handleThumbnailChange} />
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="mt-3 w-full max-w-sm max-h-48 object-cover rounded-lg"
                />
              )}
              <p className="text-xs text-gray-400 mt-1">
                Optional for YouTube links (thumbnail auto-fetched if left blank).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={form.published}
                onChange={handleFieldChange}
                className="w-4 h-4"
              />
              <label htmlFor="published" className="text-sm text-gray-600">
                Published (visible on the public videos page)
              </label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full md:w-auto px-6 py-3 bg-[#c99b3f] text-white rounded-lg font-medium hover:bg-[#b3872f] transition disabled:opacity-60"
            >
              {saving ? 'Saving…' : editingId ? 'Update Video' : 'Publish Video'}
            </button>
          </form>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-10 text-center text-gray-400">Loading videos…</div>
            ) : videos.length === 0 ? (
              <div className="p-10 text-center text-gray-400">
                No videos yet. Click "New Video" to add your first one.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-left">
                      <th className="px-4 py-3 font-medium">Title</th>
                      <th className="px-4 py-3 font-medium hidden md:table-cell">Category</th>
                      <th className="px-4 py-3 font-medium hidden md:table-cell">Source</th>
                      <th className="px-4 py-3 font-medium hidden md:table-cell">Date</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos.map((video) => (
                      <tr key={video._id} className="border-t border-gray-100">
                        <td className="px-4 py-3 text-gray-800 font-medium max-w-xs truncate">
                          {video.title}
                        </td>
                        <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                          {video.category || 'General'}
                        </td>
                        <td className="px-4 py-3 text-gray-500 hidden md:table-cell capitalize">
                          {video.sourceType}
                        </td>
                        <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                          {new Date(video.createdAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => togglePublish(video)}
                            className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                              video.published
                                ? 'bg-green-50 text-green-600'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {video.published ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <button
                            onClick={() => openEditForm(video)}
                            className="text-[#c99b3f] hover:underline mr-4 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(video._id)}
                            className="text-red-500 hover:underline text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoAdmin;