import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postData } from '../../../api/api';

const HospitalLogin = () => {
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
            const response = await postData('auth/login/', { email, password });
            
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            
            if (response.role === 'hospital' || response.role === 'bloodbank') {
                toast.success("Login successful! Welcome back.");
                navigate('/hospital/dashboard');
            } else {
                toast.error("Access denied. Invalid facility account.");
                localStorage.clear();
            }
        } catch (error: any) {
            console.error("Login Error:", error);
            toast.error(error.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 font-['Montserrat']">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 border-t-4 border-blue-500">
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Facility Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hospital Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            placeholder="admin@hospital.org"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 font-bold"
                    >
                        {loading ? 'Authenticating...' : 'Login'}
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <Link to="/hospital/register" className="text-blue-600 hover:underline font-medium">Register here</Link>
                </div>
            </div>
        </div>
    );
};

export default HospitalLogin;