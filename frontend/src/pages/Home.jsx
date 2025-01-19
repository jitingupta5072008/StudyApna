import React from 'react'
import Card from '../components/Card'

const Home = () => {

  return (
    <>
      <div className="max-w-5xl mx-auto mt-12 px-4 text-center">
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mt-2 mb-6">
          Education for a Better Tomorrow.
            </h1>
          <p className="px-4 leading-relaxed">
          Seekho naye skills, samjho concepts ka magic, Hamari website aapko sirf gyaan hi nahi, balki practical skills bhi sikhati hai jo aapke career aur personal growth mein madad karega. Chhote se shuru karke bade sapno tak ka safar yahan se shuru hota hai. Har ek learner ke liye kuch khaas!
          </p>
          <p className="mb-8 mt-4 px-4 leading-relaxed">yeh...
            <span className="text-pink-600 font-bold"> It's free!</span></p>
          <div>
            <a className="inline-block py-4 px-8 leading-none text-white bg-slate-800 hover:bg-pink-600 rounded shadow text-sm font-bold"
              href="#classes">Start Learning Today</a>
          </div>
        </div>
      </div>

      <Card />
    </>
  )
}

export default Home