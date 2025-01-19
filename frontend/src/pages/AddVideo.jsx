import React, { useState, useEffect } from "react";
import axios from "axios";

const AddVideo = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState("");

  // Fetch all classes on component load
  useEffect(() => {
    axios.get("http://localhost:5000/classes").then((response) => {
      setClasses(response.data);
    });
  }, []);

  // Fetch subjects when a class is selected
  useEffect(() => {
    if (selectedClass) {
      axios
        .get(`http://localhost:5000/subjects/${selectedClass}`)
        .then((response) => {
          setSubjects(response.data);
          setChapters([]); // Clear chapters when class changes
          setSelectedSubject("");
          setSelectedChapter("");
        });
    } else {
      setSubjects([]);
      setChapters([]);
    }
  }, [selectedClass]);

  // Fetch chapters when a subject is selected
  useEffect(() => {
    if (selectedSubject) {
      axios
        .get(`http://localhost:5000/chapters/${selectedSubject}`)
        .then((response) => {
          setChapters(response.data);
          setSelectedChapter("");
        });
    } else {
      setChapters([]);
    }
  }, [selectedSubject]);

  // Handle form submission
  const handleAddVideo = (e) => {
    e.preventDefault();

    if (!selectedClass || !selectedSubject || !selectedChapter || !videoTitle || !videoUrl || !videoThumbnail) {
      alert("Please fill all fields.");
      return;
    }

    axios
      .post("http://localhost:5000/videos", {
        title: videoTitle,
        url: videoUrl,
        thumbnail: videoThumbnail,
        chapterId: selectedChapter,
      })
      .then((response) => {
        alert("Video added successfully!");
        setVideoTitle("");
        setVideoUrl("");
        setSelectedClass("");
        setSelectedSubject("");
        setSelectedChapter("");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add video.");
      });
  };

  return (
    <>

      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form className="space-y-6 container" action="#" method="POST" onSubmit={handleAddVideo}>

            <div className="mb-5">
              <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">Select Class:</label>
              <select id='category' className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)} required >

                <option value="">-- Select Class --</option>
                {classes.map((cls) => (
                  <option className='p-2' key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}

              </select>
            </div>

            <div className="mb-5">
              <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">Select Subject:</label>
              <select id='category' className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)} disabled={!subjects.length} required >

                <option value="">-- Select Class --</option>
                {subjects.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}

              </select>
            </div>
            <div className="mb-5">
              <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">Select Chapter:</label>
              <select id='category' className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                disabled={!chapters.length} required >

                <option value="">-- Select Chapter --</option>
                {chapters.map((chap) => (
                  <option key={chap._id} value={chap._id}>
                    {chap.name}
                  </option>
                ))}

              </select>
            </div>

            <div className="mb-5">
              <label htmlFor="videotitle" className="mb-3 block text-base font-medium text-[#07074D]">
                Video Title:
              </label>
              <input type="text" name="videotitle" id="videotitle" placeholder="Video Title."
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"  value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)} required />
            </div>

            <div className="mb-5">
              <label htmlFor="url" className="mb-3 block text-base font-medium text-[#07074D]">
                Video Url:
              </label>
              <input type="text" name="url" id="url" placeholder="Video Url."
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"  value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)} required />
            </div>

            <div className="mb-5">
              <label htmlFor="url" className="mb-3 block text-base font-medium text-[#07074D]">
                Video Thumbnail:
              </label>
              <input type="url" name="url" id="url" placeholder="Video Thumbnail."
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"  value={videoThumbnail}
                onChange={(e) => setVideoThumbnail(e.target.value)} required />
            </div>

            <div>
              <button
                type="submit" disabled={!selectedClass || !selectedSubject || !selectedChapter || !videoTitle || !videoUrl}
                className="hover:shadow-form w-full rounded-md bg-pink-600 hover:bg-pink-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Add Video
              </button>
            </div>
          </form>
        </div>
      </div>

   
    </>
  );
};

export default AddVideo;
