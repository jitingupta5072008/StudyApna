import React, { useState } from 'react';
import axios from 'axios';

const OTPAuth = () => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);

    const sendOtp = async () => {
        // try {
        //     const response = await axios.post('http://localhost:5000/send-otp', { phone });
        //     alert(response.data.message);
        setStep(2);
        // } catch (error) {
        //     alert(error.response.data.message);
        // }

    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/verify-otp', { phone, code: otp });
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div>
            {step === 1 && (
                <div>
                    <h2>Enter Phone Number</h2>

                    <input type="text" name="emoji" id="emoji" placeholder="Phone Number"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required />
                        
                    <button onClick={sendOtp}>Send OTP</button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <h2>Enter OTP</h2>
                    <input
                        type="text"
                        placeholder="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={verifyOtp}>Verify OTP</button>
                </div>
            )}
        </div>
    );
};

export default OTPAuth;
