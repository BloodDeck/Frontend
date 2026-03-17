import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../../api/api';
import { AuthInput } from './components/AuthInput';
import { AuthButton } from './components/AuthButton';
import { SocialButton } from './components/SocialButton';

const AdminRegister = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        role: 'donor',
        agreeTerms: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (!formData.agreeTerms) {
            toast.error('You must agree to the terms and conditions');
            return;
        }

        setLoading(true);
        try {
            await register({
                email: formData.email,
                first_name: formData.firstName,
                last_name: formData.lastName,
                password: formData.password,
                username: formData.email,
                role: formData.role
            });
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (error: any) {
            console.error('Registration failed:', error);
            toast.error(error.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-2 text-center">Sign Up to get started</h1>
            <p className="text-gray-500 text-center mb-8 text-sm">Enter your details to proceed further</p>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">I am a</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:outline-none transition-colors text-sm"
                    >
                        <option value="donor">Donor</option>
                        <option value="hospital">Hospital</option>
                        <option value="bloodbank">Blood Bank</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <AuthInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="helloblooddeck@gmail.com"
                />

                <div className="grid grid-cols-2 gap-4">
                    <AuthInput
                        label="First name"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <AuthInput
                        label="Last name"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>

                <AuthInput
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <AuthInput
                    label="Confirm password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-gray-900 border-gray-300 rounded"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                    />
                    <span className="ml-2 text-sm text-gray-500 font-bold">I agree with terms & conditions</span>
                </div>

                <AuthButton type="submit" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
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
                Already have an account? <Link to="/login" className="font-bold text-black hover:underline">Sign In</Link>
            </p>
        </div>
    );
};

export default AdminRegister;
