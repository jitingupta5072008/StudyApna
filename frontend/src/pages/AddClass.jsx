import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddClass = () => {
    const [emoji, setEmoji] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const AddCard = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://studyapna.vercel.app/addclass', { emoji, name })
            alert(res.data.message);
            navigate('/')
        } catch (error) {
            alert('Error submitting form', error);
        }
    }
    return (
        <>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px] bg-white">
                    <form onSubmit={AddCard}>
                        <div className="mb-5">
                            <label htmlFor="emoji" className="mb-3 block text-base font-medium text-[#07074D]">
                                Icon
                            </label>
                            <input type="text" name="emoji" id="emoji" placeholder="Icon."
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={emoji}
                                onChange={(e) => setEmoji(e.target.value)} required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                Name
                            </label>
                            <input type="text" name="name" id="name" placeholder="Enter Class name"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={name}
                                onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="hover:shadow-form w-full rounded-md bg-pink-600 hover:bg-pink-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                               Add Class
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddClass