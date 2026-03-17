import React, { useState, useEffect } from 'react';
import { User, Mail, Save, Shield } from 'lucide-react';
import { toast } from 'react-toastify';
import { fetchData, updateData } from '../../../api/api';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchData('auth/user/');
                setFormData({
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    email: data.email || '',
                    role: data.role || 'donor'
                });
            } catch (error) {
                console.error("Failed to load profile:", error);
                toast.error("Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateData('auth/user/', {
                first_name: formData.first_name,
                last_name: formData.last_name
            });
            toast.success("Profile updated successfully!");
        } catch (error: any) {
            console.error("Failed to update profile:", error);
            toast.error(error.message || "Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-red-500 font-medium">Loading your profile...</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                    <User size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Account Profile</h1>
                    <p className="text-gray-500 text-sm">Manage your personal information.</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-6 mb-8 border-b border-gray-100 pb-8">
                    <div className="h-24 w-24 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-3xl font-bold border-4 border-white shadow-md">
                        {formData.first_name ? formData.first_name.charAt(0).toUpperCase() : <User size={40} />}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {formData.first_name || formData.last_name ? `${formData.first_name} ${formData.last_name}` : 'Lifesaver'}
                        </h2>
                        <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 capitalize">
                            <Shield size={12} /> {formData.role}
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="Enter your first name"
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    placeholder="Enter your last name"
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                            <input
                                type="email"
                                value={formData.email}
                                disabled
                                className="w-full pl-11 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
                            />
                        </div>
                        <p className="mt-2 text-xs text-gray-500">Your email address is used for login and cannot be changed directly.</p>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 shadow-md shadow-red-600/20"
                        >
                            <Save size={18} />
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;