import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Quote from './Quote';

const Video = () => {
  const { id } = useParams()
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch videos for the given chapterId
    axios
      .get(`http://localhost:5000/videos/${id}`)
      .then((response) => {
        setVideos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <section className="bg-white shadow-md p-6 mt-4 max-w-7xl mx-auto rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Total Videos ({videos.length})</h1>
        <Quote/>
      </section>

      <main className="max-w-7xl mx-auto mt-6 p-4">
        {loading ? (
          <p>Loading videos...</p>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div key={video._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt="Video Thumbnail"
                  className="w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-pink-600">{video.title}</h2>
                  <p className="text-sm text-gray-600 mt-2">Published: 1 Jan 2025</p>
                  <Link to={`/watch-video/${video._id}`}>
                  <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700">
                  View Lecture
                  </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No videos available for this chapter.</p>
        )}
      </main>
    </>
  );
};

export default Video;
