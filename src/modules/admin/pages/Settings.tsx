import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Save, User as UserIcon, Mail, Shield, Lock, Bell, Monitor, Key, ToggleLeft, ToggleRight } from 'lucide-react';
import { fetchData, updateData } from '../../../api/api';

const AdminSettings = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    
    // Profile State (Functional)
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        role: ''
    });

    // Mock States for other tabs (UI Only for now)
    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        newApplications: true,
        criticalStock: true,
        systemUpdates: false
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

    const handleProfileSubmit = async (e: React.FormEvent) => {
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

    const tabs = [
        { id: 'profile', label: 'Profile Settings', icon: UserIcon, desc: 'Manage your personal information' },
        { id: 'security', label: 'Security', icon: Lock, desc: 'Update password and authentication' },
        { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Control your alert preferences' },
        { id: 'system', label: 'System Preferences', icon: Monitor, desc: 'Dashboard and UI settings' },
    ];

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-[#2D2D2D] rounded-lg"></div>
                    <div className="h-4 w-64 bg-[#2D2D2D] rounded-lg"></div>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-64 space-y-3">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-12 bg-[#2D2D2D] rounded-lg"></div>)}
                    </div>
                    <div className="flex-1 h-[500px] bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Platform Settings</h1>
                <p className="text-gray-400 text-sm mt-1">Manage your administrative account and system preferences.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 shrink-0 space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium border ${
                                    isActive 
                                        ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' 
                                        : 'bg-[#2D2D2D] text-gray-400 border-[#3D3D3D] hover:bg-[#3D3D3D] hover:text-gray-200'
                                }`}
                            >
                                <Icon size={18} />
                                <div className="text-left">
                                    <p>{tab.label}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-[#2D2D2D] rounded-xl border border-[#3D3D3D] overflow-hidden shadow-lg min-h-[500px]">
                    
                    {/* --- PROFILE TAB --- */}
                    {activeTab === 'profile' && (
                        <div className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="mb-8 border-b border-[#3D3D3D] pb-6">
                                <h2 className="text-xl font-bold text-white mb-1">Profile Information</h2>
                                <p className="text-sm text-gray-400">Update your account details and public information.</p>
                            </div>

                            <div className="flex items-center gap-6 mb-8">
                                <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-[#2A2A2A] shadow-xl">
                                    {formData.firstName ? formData.firstName.charAt(0).toUpperCase() : <UserIcon size={40} />}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">
                                        {formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}` : 'Admin User'}
                                    </h3>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full text-xs font-bold bg-blue-900/30 text-blue-400 border border-blue-800/50 uppercase tracking-wider">
                                        <Shield size={12} />
                                        {formData.role}
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleProfileSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">First Name</label>
                                        <input
                                            name="firstName"
                                            type="text"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full bg-[#1A1A1A] border border-[#3D3D3D] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="Enter first name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Last Name</label>
                                        <input
                                            name="lastName"
                                            type="text"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full bg-[#1A1A1A] border border-[#3D3D3D] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="Enter last name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-3.5 text-gray-500" size={18} />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            disabled
                                            className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#1A1A1A]/50 border border-[#3D3D3D]/50 text-gray-500 cursor-not-allowed text-sm"
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">Contact the master administrator to change your associated email address.</p>
                                </div>

                                <div className="pt-6 border-t border-[#3D3D3D] flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50"
                                    >
                                        <Save size={18} />
                                        {saving ? 'Saving Changes...' : 'Save Profile Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* --- SECURITY TAB (UI ONLY) --- */}
                    {activeTab === 'security' && (
                        <div className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="mb-8 border-b border-[#3D3D3D] pb-6">
                                <h2 className="text-xl font-bold text-white mb-1">Security & Password</h2>
                                <p className="text-sm text-gray-400">Ensure your account uses a strong password and multi-factor authentication.</p>
                            </div>

                            <form className="space-y-6 max-w-md">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Current Password</label>
                                    <div className="relative">
                                        <Key className="absolute left-4 top-3.5 text-gray-500" size={18} />
                                        <input type="password" placeholder="••••••••" className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#3D3D3D] text-white text-sm focus:border-blue-500 focus:outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
                                        <input type="password" placeholder="••••••••" className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#3D3D3D] text-white text-sm focus:border-blue-500 focus:outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Confirm New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
                                        <input type="password" placeholder="••••••••" className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#3D3D3D] text-white text-sm focus:border-blue-500 focus:outline-none" />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button type="button" className="px-6 py-2.5 bg-[#3D3D3D] text-white font-bold text-sm rounded-lg hover:bg-gray-600 transition-colors">
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* --- NOTIFICATIONS TAB (UI ONLY) --- */}
                    {activeTab === 'notifications' && (
                        <div className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="mb-8 border-b border-[#3D3D3D] pb-6">
                                <h2 className="text-xl font-bold text-white mb-1">Notification Preferences</h2>
                                <p className="text-sm text-gray-400">Choose what updates you want to receive and how.</p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { id: 'emailAlerts', title: 'Email Alerts', desc: 'Receive daily summaries and critical alerts via email.' },
                                    { id: 'newApplications', title: 'New Applications', desc: 'Get notified when a new hospital or blood bank registers.' },
                                    { id: 'criticalStock', title: 'Critical Stock Alerts', desc: 'Immediate notification when inventory drops below 10 units.' },
                                    { id: 'systemUpdates', title: 'System Updates', desc: 'Receive news about BloodDeck platform updates.' },
                                ].map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-4 bg-[#1A1A1A] border border-[#3D3D3D] rounded-lg">
                                        <div>
                                            <p className="font-bold text-gray-200 text-sm">{item.title}</p>
                                            <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                                        </div>
                                        <button 
                                            onClick={() => setNotifications(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof notifications] }))}
                                            className={`${notifications[item.id as keyof typeof notifications] ? 'text-blue-500' : 'text-gray-600'}`}
                                        >
                                            {notifications[item.id as keyof typeof notifications] ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- SYSTEM TAB (UI ONLY) --- */}
                    {activeTab === 'system' && (
                        <div className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="mb-8 border-b border-[#3D3D3D] pb-6">
                                <h2 className="text-xl font-bold text-white mb-1">System Preferences</h2>
                                <p className="text-sm text-gray-400">Adjust the platform interface and localized settings.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Timezone</label>
                                    <select className="w-full bg-[#1A1A1A] border border-[#3D3D3D] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500">
                                        <option>West Africa Time (WAT)</option>
                                        <option>Greenwich Mean Time (GMT)</option>
                                        <option>Central European Time (CET)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Date Format</label>
                                    <select className="w-full bg-[#1A1A1A] border border-[#3D3D3D] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500">
                                        <option>DD/MM/YYYY (24/10/2023)</option>
                                        <option>MM/DD/YYYY (10/24/2023)</option>
                                        <option>YYYY-MM-DD (2023-10-24)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;