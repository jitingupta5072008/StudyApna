import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const token = localStorage.getItem('token')
  if (location.pathname === '/login') {
    return null
  }

  return (
    <>
      <header className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to={'/'}>
            <h1 className="text-2xl font-bold text-pink-600">Study Apna</h1>
          </Link>

          <div>
            {token ?
              <>
                <Link to={'/admin/dashboard'} className='ml-4'>
                  <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700">DashBoard</button>
                </Link>
              </>
              :
              <Link to={'/login'}>
                <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700">Login</button>
              </Link>
            }
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar