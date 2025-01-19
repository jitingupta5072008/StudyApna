import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Quote from './Quote';


const Subject = () => {
    const [subjects, setSubjects] = useState([]);
    const id = useParams().id;

    useEffect(() => {
        axios.get(`https://studyapna.vercel.app/subjects/${id}`).then((response) => {
            setSubjects(response.data);
        });
    }, [id]);

    return (
        <>
            <section className="bg-white shadow-md p-4 mt-4 max-w-7xl mx-auto rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Total Subject ({subjects.length})</h1>
                 <Quote/>
            </section>

            <main className='max-w-7xl mx-auto mt-6'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {subjects.length === 0 ? (
                        <p>Admin not Add Subject of this Subject..</p>
                    ) : (
                        subjects.slice().reverse().map((data, index) => (
                            <div className="bg-white shadow-md rounded-lg" key={index}>
                                <Link to={`/chapter/${data._id}`}>
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold text-pink-600">{data.name}</h2>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            By <span className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded">{data.teacher}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))

                    )}


                </div>
            </main>


        </>
    )
}

export default Subject