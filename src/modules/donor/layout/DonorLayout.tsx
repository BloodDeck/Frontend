import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Heart, Clock, User as UserIcon, LogOut, Menu, X } from 'lucide-react';
import { fetchData, logout } from '../../../api/api';

const DonorLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // State to hold the dynamic user data
    const [user, setUser] = useState({
        firstName: 'Generous',
        lastName: 'Donor',
        role: 'Donor',
        email: ''
    });

    // Fetch user profile on mount
    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await fetchData('auth/user/');
                setUser({
                    firstName: data.first_name || 'Generous',
                    lastName: data.last_name || 'Donor',
                    role: data.role || 'donor',
                    email: data.email
                });
            } catch (error) {
                console.error("Failed to load donor profile:", error);
                // Fallback: decode JWT if API fails
                const token = localStorage.getItem('access_token');
                if (token) {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    setUser(prev => ({
                        ...prev,
                        firstName: payload.name?.split(' ')[0] || 'Generous',
                        lastName: payload.name?.split(' ')[1] || 'Donor',
                        email: payload.email || ''
                    }));
                }
            }
        };

        loadUser();
    }, []);

    const handleLogout = () => {
        logout(); // Clears tokens from localStorage
        navigate('/donor/login'); // Redirects to donor login
    };

    const navItems = [
        { path: '/donor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/donor/donate', label: 'Donate Now', icon: Heart },
        { path: '/donor/history', label: 'My History', icon: Clock },
        { path: '/donor/profile', label: 'Profile', icon: UserIcon },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-['Montserrat'] flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                            <Heart className="text-red-500 fill-current" size={16} />
                        </div>
                        <span className="font-bold text-gray-900 tracking-tight">BloodDeck</span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname.startsWith(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-red-600' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    <Icon size={16} className={isActive ? 'fill-current' : ''} />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <div className="text-right hidden lg:block">
                            <p className="text-sm font-bold text-gray-900">
                                {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Log out"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-gray-600"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg p-4 flex flex-col gap-2">
                        {/* Mobile User Profile Summary */}
                        <div className="px-4 py-3 bg-red-50 rounded-lg mb-2 flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                                {user.firstName.charAt(0)}
                             </div>
                             <div>
                                 <p className="text-sm font-bold text-gray-900">{user.firstName} {user.lastName}</p>
                                 <p className="text-xs text-gray-600">{user.email}</p>
                             </div>
                        </div>

                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname.startsWith(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <Icon size={18} />
                                    {item.label}
                                </Link>
                            )
                        })}
                        <div className="border-t border-gray-100 my-2 pt-2">
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:text-red-600"
                            >
                                <LogOut size={18} /> Log Out
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default DonorLayout;