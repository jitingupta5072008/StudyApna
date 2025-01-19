import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('https://studyapna.onrender.com/login', { email, password });
        console.log(response);
        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
        navigate('/admin/dashboard')
    } catch (error) {
        alert(error.response?.data?.message || 'Something went wrong');
    }
};
  return (
    <>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto mt-8 w-full max-w-[550px] bg-white">
          <h1 className='text-3xl font-bold text-center'>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-5 mt-4">
              <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                Email
              </label>
              <input type="text" name="email" id="email" placeholder="Enter your Email."
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-5">
              <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                Password
              </label>
              <input type="text" name="name" id="name" placeholder="Enter your Password."
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-pink-600 hover:bg-pink-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login