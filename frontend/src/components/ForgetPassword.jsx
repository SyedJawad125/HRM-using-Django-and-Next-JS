'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // FontAwesome icons
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgetPassword() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1); // Step 1 for email, Step 2 for OTP and reset
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleForgetPassword = async () => {
        try {
            const response = await AxiosInstance.post('/user/forget-password', { email });
            console.log("Email sent successfully:", response);
            setStep(2);
        } catch (error) {
            console.error("Error sending email:", error.response?.data || error.message);
            alert("Failed to send OTP. Please try again.");
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await AxiosInstance.post('/user/verify-otp', {
                otp,
                new_password: newPassword,
                confirm_password: confirmPassword,
            });
            console.log("OTP verified successfully:", response);

            // Show success toast
            toast.success("Password reset successful!", {
                onClose: () => {
                    // Navigate to the Login page after the toast is closed
                    router.push("/Login");
                },
            });

            // Clear the OTP, new password, and confirm password fields
            setOtp("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Error verifying OTP:", error.response?.data || error.message);
            alert("Failed to verify OTP. Please try again.");
        }
    };

    const handleback = () => {
        router.push("/Login");
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-700">
            <div className="w-full max-w-md p-8 space-y-8 bg-black rounded-lg shadow-md">
                {step === 1 && (
                    <button onClick={handleback} className="text-white">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                )}
                <h2 className="text-2xl font-bold text-center text-white">
                    {step === 1 ? "Forgot Password" : "Verify OTP"}
                </h2>

                {step === 1 ? (
                    <div>
                        <input
                            type="email"
                            className="w-full p-3 border border-gray-300 text-black rounded focus:outline-none focus:ring focus:ring-indigo-200"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            onClick={handleForgetPassword}
                            className="w-full mt-4 bg-indigo-600 text-white p-3 rounded hover:bg-indigo-500 transition"
                        >
                            Send OTP
                        </button>
                    </div>
                ) : (
                    <div>
                        <input
                            type="text"
                            className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <div className="relative w-full mt-4">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                        <div className="relative w-full mt-4">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                        <button
                            onClick={handleVerifyOtp}
                            className="w-full mt-4 bg-indigo-600 text-white p-3 rounded hover:bg-indigo-500 transition"
                        >
                            Reset Password
                        </button>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}
