import React, { useState, useEffect } from 'react';
import { galleryAPI } from '../api';
import { Helmet } from "react-helmet-async";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState(['all']);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await galleryAPI.getAll();
      setGalleryItems(response.data);

      const uniqueCategories = ['all', ...new Set(response.data
        .map(item => item.category)
        .filter(category => category && category.trim() !== '')
      )];

      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems =
    selectedCategory === 'all'
      ? galleryItems
      : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-12">

      {/* SEO */}
      <Helmet>
        <title>Photo Gallery | Paradise English Medium School </title>
        <meta
          name="description"
          content="Explore memorable moments, events and activities at Paradise English Medium School & Junior College through our official photo gallery."
        />
      </Helmet>

      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            School Photo Gallery
          </h1>

          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Discover memorable moments, celebrations, and activities at
            Paradise English Medium School & Junior College.
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-700 hover:bg-blue-50 border border-blue-200'
              }`}
            >
              {category === 'all' ? 'All Photos' : category}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* GALLERY GRID */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {filteredItems.map((item) => (
                  <div
                    key={item._id}
                    className="group relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:-translate-y-1 hover:shadow-xl"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="font-semibold text-lg">{item.title}</h3>

                        {item.description && (
                          <p className="text-sm opacity-90 line-clamp-2">
                            {item.description}
                          </p>
                        )}

                        {item.category && (
                          <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-500/20 rounded-full">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* INFO */}
                    <div className="p-4">
                      <h3 className="font-semibold text-blue-900 truncate">
                        {item.title}
                      </h3>

                      <div className="flex justify-between items-center mt-2">
                        {item.category && (
                          <span className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
                            {item.category}
                          </span>
                        )}

                        <span className="text-xs text-blue-400">
                          {new Date(item.createdAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>

                  </div>
                ))}

              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  No photos found
                </h3>

                <p className="text-blue-500">
                  {selectedCategory !== 'all'
                    ? `No photos in "${selectedCategory}"`
                    : 'Gallery will be updated soon.'}
                </p>
              </div>
            )}

            {/* STATS */}
            <div className="mt-12 pt-8 border-t text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div>
                  <div className="text-3xl font-bold text-blue-600">{galleryItems.length}</div>
                  <div className="text-blue-700 font-medium">Total Photos</div>
                </div>

                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    {new Set(galleryItems.map(item => item.category)).size}
                  </div>
                  <div className="text-blue-700 font-medium">Categories</div>
                </div>

                <div>
                  <div className="text-3xl font-bold text-blue-600">{filteredItems.length}</div>
                  <div className="text-blue-700 font-medium">
                    Currently Showing
                  </div>
                </div>

              </div>
            </div>

          </>
        )}

      </div>
    </div>
  );
};

export default Gallery;
