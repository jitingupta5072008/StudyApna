import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Quote from './Quote';

const Chapter = () => {
  const { id } = useParams();
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    axios.get(`https://studyapna.vercel.app/api/chapters/${id}`).then((response) => {
      setChapters(response.data);
    });
  }, [id]);
  return (
    <>
      <section className="bg-white shadow-md p-6 mt-4 max-w-7xl mx-auto rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Total Chapters ({chapters.length})</h1>
      <Quote/>
      </section>
      {/* <!-- Chapter List --> */}
      <main className="max-w-7xl mx-auto mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* <!-- Chapter Card --> */}

          {chapters.length === 0 ? (
            <p>Loading Chapter..</p>
          ) : (
            chapters.map((data, index) => (
              <div className="bg-white shadow-md rounded-lg p-4" key={index}>
                <Link to={`/video/${data._id}`} >
                  <h3 className="text-lg font-semibold text-pink-600"><i className='text-2xl'>📖</i>  {data.name}</h3>
                </Link>

              </div>
            ))

          )}
        </div>
      </main>
    </>
  )
}

export default Chapter