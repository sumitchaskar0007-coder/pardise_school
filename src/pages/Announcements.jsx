import React, { useState, useEffect } from 'react';
import { announcementsAPI } from '../api';
import { Helmet } from "react-helmet-async";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    filterAnnouncements();
  }, [announcements, filter, searchTerm]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await announcementsAPI.getAll();
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAnnouncements = () => {
    let filtered = [...announcements];

    if (filter === 'active') filtered = filtered.filter(a => a.isActive);
    if (filter === 'archived') filtered = filtered.filter(a => !a.isActive);

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(term) ||
        a.content.toLowerCase().includes(term)
      );
    }

    setFilteredAnnouncements(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) return 'Today';
    if (diffInHours < 48) return 'Yesterday';
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`;
    return formatDate(dateString);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-12">

      {/* SEO */}
      <Helmet>
        <title>Announcements | Paradise English Medium School </title>
        <meta
          name="description"
          content="Latest announcements, notices and important updates from Paradise English Medium School & Junior College."
        />
      </Helmet>

      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            📢
          </div>

          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            School Announcements
          </h1>

          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Stay updated with the latest notices and important information from
            Paradise English Medium School & Junior College.
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow border">

          <div className="flex flex-col md:flex-row justify-between gap-4">

            <div className="flex flex-wrap gap-3">
              <button onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                All ({announcements.length})
              </button>

              <button onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg font-medium ${filter === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>
                Active
              </button>

              <button onClick={() => setFilter('archived')}
                className={`px-4 py-2 rounded-lg font-medium ${filter === 'archived' ? 'bg-gray-600 text-white' : 'bg-gray-100'}`}>
                Archived
              </button>
            </div>

            <input
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full md:w-64"
            />

          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center py-20">Loading announcements...</div>
        ) : (

          filteredAnnouncements.length ? (

            filteredAnnouncements.map(a => (

              <div key={a._id} className="bg-white p-6 mb-6 rounded-xl shadow border-l-4 border-blue-500">

                <div className="flex justify-between mb-2">
                  <h2 className="text-xl font-bold text-blue-900">{a.title}</h2>

                  <span className={`px-3 py-1 text-xs rounded-full ${a.isActive ? "bg-green-100 text-green-800" : "bg-gray-100"}`}>
                    {a.isActive ? "Active" : "Archived"}
                  </span>
                </div>

                <p className="text-sm text-blue-700 mb-2">
                  {formatDate(a.date)} • {getTimeAgo(a.date)}
                </p>

                <p className="whitespace-pre-line text-blue-800">
                  {a.content}
                </p>

              </div>

            ))

          ) : (

            <div className="text-center py-16 bg-white rounded-xl shadow">
              No announcements available
            </div>

          )

        )}

      </div>
    </div>
  );
};

export default Announcements;
