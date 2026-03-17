// c:\Users\user\Desktop\blooddeck\Frontend\src\modules\admin\settings\AdminSettings.tsx

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Save, User as UserIcon, Mail, Shield } from 'lucide-react';
import { fetchData, updateData } from '../../../api/api';
import { AuthInput } from '../auth/components/AuthInput';
import { AuthButton } from '../auth/components/AuthButton';

const AdminSettings = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        role: ''
    });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchData('auth/user/');
                setFormData({
                    email: data.email,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    role: data.role
                });
            } catch (error) {
                console.error('Error loading profile:', error);
                toast.error('Failed to load profile settings.');
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
                first_name: formData.firstName,
                last_name: formData.lastName
            });
            toast.success('Profile updated successfully!');
        } catch (error: any) {
            console.error('Error updating profile:', error);
            toast.error(error.message || 'Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading settings...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
                    <p className="text-sm text-gray-500">Manage your profile information</p>
                </div>
                
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-2xl font-bold border-4 border-white shadow-sm">
                            {formData.firstName ? formData.firstName.charAt(0).toUpperCase() : <UserIcon size={32} />}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">
                                {formData.firstName} {formData.lastName}
                            </h3>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                                <Shield size={12} />
                                {formData.role}
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AuthInput
                                label="First Name"
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <AuthInput
                                label="Last Name"
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-400">Email address cannot be changed.</p>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70"
                            >
                                <Save size={20} />
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
