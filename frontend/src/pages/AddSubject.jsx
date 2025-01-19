import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSubject = () => {
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [teacherName, setTeacherName] = useState("");

  // Fetch all classes
  useEffect(() => {
    axios.get("https://studyapna.vercel.app/classes").then((response) => {
      setClasses(response.data);
    });
  }, []);

  // Handle form submission
  const handleAddSubject = (e) => {
    e.preventDefault();
    axios.post("https://studyapna.vercel.app/subjects", { name: subjectName, classId, teacher: teacherName })
      .then((response) => {
        console.log(response);
        alert("Subject added successfully!");
        setSubjectName("");
        setTeacherName("");
        setClassId("");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add subject.");
      });
  };

  return (
    <>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form className="space-y-6 container" action="#" method="POST" onSubmit={handleAddSubject}>

            <div className="mb-5">

              <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">Select Class</label>

              <select id='category' className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={classId}
                onChange={(e) => setClassId(e.target.value)} required >

                <option value="">-- Select Class --</option>
                {classes.map((cls) => (
                  <option className='p-2' key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}

              </select>
            </div>

            <div className="mb-5">
              <label htmlFor="emoji" className="mb-3 block text-base font-medium text-[#07074D]">
                Subject Name
              </label>
              <input type="text" name="emoji" id="emoji" placeholder="Subject name."
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)} required />
            </div>

            <div className="mb-5">
              <label htmlFor="emoji" className="mb-3 block text-base font-medium text-[#07074D]">
                Teacher Name
              </label>
              <input type="text" name="emoji" id="emoji" placeholder="Teacher name."
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)} required />
            </div>

            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-pink-600 hover:bg-pink-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Add Subject
              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  );
};

export default AddSubject;
