import React, { useState, useEffect } from "react";
import axios from "axios";

const AddChapter = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [chapterName, setChapterName] = useState("");

  // Fetch all classes on component load
  useEffect(() => {
    axios.get("https://studyapna.onrender.com/classes").then((response) => {
      setClasses(response.data);
    });
  }, []);

  // Fetch subjects when a class is selected
  useEffect(() => {
    if (selectedClass) {
      axios
        .get(`https://studyapna.onrender.com/subjects/${selectedClass}`)
        .then((response) => {
          setSubjects(response.data);
        });
    } else {
      setSubjects([]);
    }
  }, [selectedClass]);

  // Handle form submission
  const handleAddChapter = (e) => {
    e.preventDefault();

    if (!selectedClass || !selectedSubject || !chapterName) {
      alert("Please fill all fields.");
      return;
    }

    axios
      .post("https://studyapna.onrender.com/chapters", {
        name: chapterName,
        subjectId: selectedSubject,
      })
      .then((response) => {
        alert("Chapter added successfully!");
        setChapterName("");
        setSelectedClass("");
        setSelectedSubject("");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add chapter.");
      });
  };

  return (
    <>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form className="space-y-6 container" action="#" method="POST" onSubmit={handleAddChapter}>

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
              <label htmlFor="emoji" className="mb-3 block text-base font-medium text-[#07074D]">
              Chapter Name:
              </label>
              <input type="text" name="emoji" id="emoji" placeholder="Chapter name."
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={chapterName}
                onChange={(e) => setChapterName(e.target.value)} required />
            </div>

            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-pink-600 hover:bg-pink-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Add Chapter
              </button>
            </div>
          </form>
        </div>
      </div>
   
    </>
  );
};

export default AddChapter;
