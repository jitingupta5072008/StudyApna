import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Card = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/classes").then((response) => {
          setClasses(response.data);
        });
      }, []);

    

    return (
        <section id='classes' className='mt-8'>

            <div className='pl-8'>
                <h1 className="text-2xl md:text-3xl pl-2 mb-8 border-l-4  font-sans font-bold border-pink-600 dark:text-white text-gray-900">Batches</h1>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 pt-0 p-8">
                
                {classes.length === 0 ? (
                    <p>not a...</p>
                ) : (
                    classes.slice().reverse().map((data, index) => (
                        <div className="translate-y-0 opacity-100 transition-all duration-700 ease-out" key={index} style={{ transitionDelay: '200ms' }}>
                            <Link to={`/subjects/${data._id}`}>
                                <div className="group relative">

                                    <div className="relative rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-700">
                                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-600 to-pink-400 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
                                        <div className="flex flex-col items-center">
                                            <h1 className='text-5xl'>{data.emoji}</h1>
                                            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">{data.name}</h3>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))

                )}

            </div>


        </section>
    )
}

export default Card