import React, { useState, useEffect } from 'react';
import axios from 'axios';

const genres = ['technology', 'sports', 'business', 'health', 'entertainment'];

export default function App() {
  const [selectedGenre, setSelectedGenre] = useState('technology');
  const [articles, setArticles] = useState([]);
  const [headline, setHeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNews = async (genre) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:8000/news?genre=${genre}`);
      if (response.data && response.data.articles) {
        setArticles(response.data.articles);
        setHeadline(`${genre.charAt(0).toUpperCase() + genre.slice(1)} News`);
      } else {
        setError('No articles found.');
        setHeadline('');
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to fetch news. Please try again later.');
      setHeadline('');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews(selectedGenre);
  }, [selectedGenre]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 p-8">
      <h1 className="text-4xl font-extrabold text-white text-center drop-shadow-md mb-6">News Aggregator</h1>
      {headline && <h2 className="text-2xl font-semibold text-white text-center mb-6">{headline}</h2>}

      <div className="flex justify-center mb-8">
        <select
          className="p-3 bg-white rounded-lg text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={index} className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
            {/* Make the image clickable */}
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <img
                className="w-full h-48 object-cover"
                src={article.urlToImage || "https://via.placeholder.com/600x300"} // Use actual image or placeholder
                alt={article.title}
              />
            </a>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{article.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{new Date(article.pubDate).toLocaleString()}</p>
              <p className="text-gray-700 mb-4">{article.description}</p>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
