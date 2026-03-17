import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../../api/api';  // Correct relative path from src/modules/admin/auth/
import { AuthInput } from './components/AuthInput';
import { AuthButton } from './components/AuthButton';
import { SocialButton } from './components/SocialButton';

interface LoginResponse {
  role: string;
  access?: string;
  refresh?: string;
  key?: string;
}

const AdminLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login({ email, password }) as LoginResponse;
            const role = response.role || 'admin';
            toast.success('Login successful!');
            if (role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate(`/${role.toLowerCase()}/dashboard`);
            }
        } catch (error: any) {
            console.error('Login failed:', error);
            toast.error(error.message || 'Login failed. Check credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back!</h1>
            <p className="text-gray-500 text-center mb-8 text-sm">Enter your details to proceed further</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <AuthInput
                    label="Email"
                    type="email"
                    placeholder="helloblooddeck@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <AuthInput
                    label="Your password"
                    type="password"
                    placeholder="Vitalink_NG"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-gray-900 border-gray-300 rounded" />
                        <span className="ml-2 text-sm font-bold text-gray-700">Remember me</span>
                    </label>
                    <Link to="/admin/forgot-password" className="text-sm font-bold text-blue-900 hover:text-blue-700">
                        Recover password
                    </Link>
                </div>

                <AuthButton type="submit" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                </AuthButton>
            </form>

            <div className="mt-8 mb-6 relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-400">Or</span>
                </div>
            </div>

            <div className="space-y-3">
                <SocialButton provider="google" />
                <SocialButton provider="apple" />
            </div>

            <p className="mt-8 text-center text-sm font-medium">
                Don't have an account? <Link to="/register" className="font-bold text-black hover:underline">Sign Up</Link>
            </p>
        </div>
    );
};

export default AdminLogin;
