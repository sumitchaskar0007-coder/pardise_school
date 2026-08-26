import { useEffect, useRef, useState } from 'react';
import { blogAPI, getApiAssetUrl } from '../../api';

const emptyForm = {
  title: '',
  author: 'Paradise EMS',
  excerpt: '',
  tags: '',
  metaTitle: '',
  metaDescription: '',
  published: true,
};

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');

  const editorRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await blogAPI.getAll();
      setBlogs(res.data?.data || []);
    } catch (err) {
      setError('Failed to load blog posts.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setCoverFile(null);
    setCoverPreview('');
    setEditingId(null);
    if (editorRef.current) editorRef.current.innerHTML = '';
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = async (blog) => {
    setError('');
    setForm({
      title: blog.title || '',
      author: blog.author || 'Paradise EMS',
      excerpt: blog.excerpt || '',
      tags: (blog.tags || []).join(', '),
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      published: !!blog.published,
    });
    setEditingId(blog._id);
    setCoverFile(null);
    setCoverPreview(blog.coverImage ? getApiAssetUrl(blog.coverImage) : '');
    setShowForm(true);
    // set editor content after the editor node has mounted
    setTimeout(() => {
      if (editorRef.current) editorRef.current.innerHTML = blog.content || '';
    }, 0);
  };

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  /* ---------- Rich text editor toolbar actions ---------- */
  const exec = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  };

  const wrapSelection = (tagHtml, className) => {
    editorRef.current?.focus();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const selectedText = range.toString() || 'Text';
    const wrapper = document.createElement(tagHtml);
    if (className) wrapper.className = className;
    wrapper.innerText = selectedText;
    range.deleteContents();
    range.insertNode(wrapper);
  };

  const insertQuote = () => wrapSelection('blockquote');
  const insertHighlight = () => wrapSelection('div', 'highlight-box');

  const insertImage = () => {
    const url = window.prompt('Paste image URL:');
    if (url) exec('insertImage', url);
  };

  const insertLink = () => {
    const url = window.prompt('Paste link URL:');
    if (url) exec('createLink', url);
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const content = editorRef.current?.innerHTML?.trim();
    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!content || content === '<br>') {
      setError('Content cannot be empty.');
      return;
    }

    try {
      setSaving(true);
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('author', form.author);
      fd.append('excerpt', form.excerpt);
      fd.append('content', content);
      fd.append('tags', form.tags);
      fd.append('metaTitle', form.metaTitle);
      fd.append('metaDescription', form.metaDescription);
      fd.append('published', form.published);
      if (coverFile) fd.append('coverImage', coverFile);

      if (editingId) {
        await blogAPI.update(editingId, fd);
        setSuccess('Blog post updated successfully.');
      } else {
        await blogAPI.create(fd);
        setSuccess('Blog post created successfully.');
      }

      resetForm();
      setShowForm(false);
      fetchBlogs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save blog post.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post? This cannot be undone.')) return;
    try {
      await blogAPI.delete(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      setError('Failed to delete blog post.');
    }
  };

  const togglePublish = async (blog) => {
    try {
      const fd = new FormData();
      fd.append('published', !blog.published);
      await blogAPI.update(blog._id, fd);
      fetchBlogs();
    } catch (err) {
      setError('Failed to update publish status.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-4 md:px-8 pt-24 sm:pt-28 pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Blog Management</h1>
          {!showForm && (
            <button
              onClick={openCreateForm}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#1a1a1a] text-white rounded-lg font-medium hover:bg-black transition"
            >
              + New Post
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
                {editingId ? 'Edit Post' : 'Create New Post'}
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
                placeholder="IB vs CBSE – A Comprehensive Comparison"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleFieldChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#c99b3f]"
                />
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
                  placeholder="education, ib, cbse"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#c99b3f]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Excerpt (short summary shown on the blog list)
              </label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleFieldChange}
                rows={2}
                maxLength={300}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#c99b3f]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Cover Image
              </label>
              <input type="file" accept="image/*" onChange={handleCoverChange} />
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="mt-3 w-full max-h-56 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Rich text editor */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Content *
              </label>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex flex-wrap gap-1 bg-gray-50 border-b border-gray-200 px-2 py-2">
                  <ToolbarBtn onClick={() => exec('bold')} label="B" title="Bold" bold />
                  <ToolbarBtn onClick={() => exec('italic')} label="I" title="Italic" italic />
                  <ToolbarBtn onClick={() => exec('formatBlock', 'H2')} label="H2" title="Heading 2" />
                  <ToolbarBtn onClick={() => exec('formatBlock', 'H3')} label="H3" title="Heading 3" />
                  <ToolbarBtn onClick={() => exec('formatBlock', 'P')} label="¶" title="Paragraph" />
                  <ToolbarBtn onClick={() => exec('insertUnorderedList')} label="• List" title="Bullet list" />
                  <ToolbarBtn onClick={() => exec('insertOrderedList')} label="1. List" title="Numbered list" />
                  <ToolbarBtn onClick={insertQuote} label="❝ Quote" title="Quote block" />
                  <ToolbarBtn onClick={insertHighlight} label="▧ Highlight" title="Highlight box" />
                  <ToolbarBtn onClick={insertLink} label="🔗" title="Insert link" />
                  <ToolbarBtn onClick={insertImage} label="🖼️" title="Insert image (URL)" />
                  <ToolbarBtn onClick={() => exec('removeFormat')} label="Clear" title="Clear formatting" />
                </div>
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  className="min-h-[300px] px-4 py-4 focus:outline-none text-[16px] leading-relaxed"
                  style={{ fontFamily: 'Inter, Helvetica, Arial, sans-serif' }}
                  data-placeholder="Start writing your article…"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Select text, then click Quote or Highlight to wrap it. Use H2/H3 for section headings.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Meta Title (SEO)
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={form.metaTitle}
                  onChange={handleFieldChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#c99b3f]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Meta Description (SEO)
                </label>
                <input
                  type="text"
                  name="metaDescription"
                  value={form.metaDescription}
                  onChange={handleFieldChange}
                  maxLength={300}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#c99b3f]"
                />
              </div>
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
                Published (visible on the public blog page)
              </label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full md:w-auto px-6 py-3 bg-[#c99b3f] text-white rounded-lg font-medium hover:bg-[#b3872f] transition disabled:opacity-60"
            >
              {saving ? 'Saving…' : editingId ? 'Update Post' : 'Publish Post'}
            </button>
          </form>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-10 text-center text-gray-400">Loading posts…</div>
            ) : blogs.length === 0 ? (
              <div className="p-10 text-center text-gray-400">
                No blog posts yet. Click "New Post" to create your first article.
              </div>
            ) : (
              <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-left">
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Author</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Date</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-gray-800 font-medium max-w-xs truncate">
                        {blog.title}
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                        {blog.author}
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                        {new Date(blog.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => togglePublish(blog)}
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            blog.published
                              ? 'bg-green-50 text-green-600'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {blog.published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => openEditForm(blog)}
                          className="text-[#c99b3f] hover:underline mr-4 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
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

      <style>{`
        [contenteditable][data-placeholder]:empty::before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }
        [contenteditable] blockquote {
          border-left: 4px solid #c99b3f;
          padding-left: 16px;
          font-style: italic;
          color: #444;
          margin: 16px 0;
        }
        [contenteditable] .highlight-box {
          background: #fdf6e3;
          border-radius: 8px;
          padding: 12px 16px;
          margin: 16px 0;
        }
        [contenteditable] h2 { font-size: 22px; font-weight: 700; margin: 16px 0 8px; }
        [contenteditable] h3 { font-size: 18px; font-weight: 700; margin: 14px 0 6px; }
        [contenteditable] img { max-width: 100%; border-radius: 8px; margin: 12px 0; }
        [contenteditable] ul, [contenteditable] ol { margin-left: 22px; }
      `}</style>
    </div>
  );
};

const ToolbarBtn = ({ onClick, label, title, bold, italic }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className="px-3 py-1.5 text-sm rounded-md border border-gray-200 bg-white hover:bg-gray-100 transition"
    style={{
      fontWeight: bold ? 700 : 400,
      fontStyle: italic ? 'italic' : 'normal',
    }}
  >
    {label}
  </button>
);

export default BlogAdmin;