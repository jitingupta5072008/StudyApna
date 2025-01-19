import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const WatchVideo = () => {
    const { id } = useParams()
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch videos for the given chapterId
        axios
            .get(`https://studyapna.onrender.com/watch-video/${id}`)
            .then((response) => {
                setVideos(response.data);
                setLoading(false);
                console.log(videos);
            })
            .catch((error) => {
                console.error("Error fetching videos:", error);
                setLoading(false);
            });
    }, [id]);
    return (
        <>
            {loading ? (
                <p>Loading videos...</p>
            ) : (
                <div className=" text-gray-800 font-sans">
                    {/* <!-- Container --> */}
                    <div className="max-w-4xl mx-auto">
                        {/* <!-- Video Section --> */}
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            {/* <!-- Responsive Video --> */}
                            <div className="video-wrapper relative w-full aspect-video">
                                <iframe
                                    src={`https://www.youtube.com/embed/${videos.url}?rel=0&modestbranding=1&autohide=1&showinfo=0`}
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                                </iframe>
                            </div>
                            {/* <!-- Video Title --> */}
                            <div className="p-4">
                                <h1 className="text-2xl font-semibold text-pink-600">{videos.title}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default WatchVideo