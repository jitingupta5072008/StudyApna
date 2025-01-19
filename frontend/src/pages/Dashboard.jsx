import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear();
    navigate('/')
  }
  return (
    <div className='flex items-center flex-col mt-4 justify-center'>
      <div className='m-4'>
        <button onClick={() => navigate('/admin/add-class')}
          type="submit"
          className="hover:shadow-form w-full rounded-md bg-pink-600 hover:bg-pink-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
          Add Class
        </button>
      </div>
      <div className='m-4'>
        <button onClick={() => navigate('/admin/add-subject')}
          type="submit"
          className="hover:shadow-form w-full rounded-md bg-pink-600 hover:bg-pink-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
          Add Subject
        </button>
      </div>
      <div className='m-4'>
        <button onClick={() => navigate('/admin/add-chapter')}
          type="submit"
          className="hover:shadow-form w-full rounded-md bg-pink-600 hover:bg-pink-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
          Add Chapter
        </button>
      </div>
      <div className='m-4'>
        <button onClick={() => navigate('/admin/add-video')}
          type="submit"
          className="hover:shadow-form w-full rounded-md bg-pink-600 hover:bg-pink-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
          Add Video
        </button>
      </div>
      <div className='m-4'>
        
        <button onClick={logout}
          type="submit"
          className="hover:shadow-form w-full rounded-md bg-pink-600 hover:bg-pink-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
          Logout
        </button>
      </div>


    </div>
  )
}

export default Dashboard