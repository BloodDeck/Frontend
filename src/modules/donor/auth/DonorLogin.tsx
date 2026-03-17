import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Adjust this import path if your api.ts is located elsewhere
import { postData } from '../../../api/api'; 

const DonorLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        setLoading(true);
        try {
            // Call your Django login endpoint
            // If you have a dedicated login() function in api.ts, you can use that instead!
            const response = await postData('auth/login/', { email, password });
            
            // Store the JWT tokens
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            
            toast.success("Login successful!");
            
            // Redirect based on role, or use your backend dashboard-redirect endpoint
            // If the user isn't a donor, you might want to handle that logic here or in the redirector
            if (response.role === 'donor') {
                navigate('/donor/dashboard');
            } else {
                // Let the backend redirector figure out where they belong
                navigate('/dashboard-redirect'); 
            }
            
        } catch (error: any) {
            console.error("Login Error:", error);
            toast.error(error.message || "Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 border-t-4 border-red-500">
                <h1 className="text-2xl font-bold mb-6 text-center text-red-600">Donor Login</h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="donor@example.com"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 border p-2 text-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 border p-2 text-gray-900"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                
                <div className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <a href="/donor/register" className="text-red-600 hover:underline font-medium">Register here</a>
                </div>
            </div>
        </div>
    );
};

export default DonorLogin;