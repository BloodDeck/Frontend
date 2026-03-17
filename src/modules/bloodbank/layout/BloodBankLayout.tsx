import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Droplet, Truck, Settings, LogOut, Menu, X, Activity, HelpCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { fetchData, logout } from '../../../api/api';

const BloodBankLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [user, setUser] = useState({
        name: 'Loading Blood Bank...',
        email: ''
    });

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await fetchData('auth/user/');
                setUser({
                    name: data.first_name || 'Blood Bank Facility',
                    email: data.email
                });
            } catch (error) {
                console.error("Failed to load profile", error);
            }
        };
        loadUser();
    }, []);

    const handleLogout = () => {
        logout();
        toast.info("Logged out successfully.");
        navigate('/bloodbank/login');
    };

    const navItems = [
        { path: '/bloodbank/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/bloodbank/stock', label: 'Stock Management', icon: Droplet },
        { path: '/bloodbank/distribution', label: 'Distribution & Requests', icon: Truck },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 font-['Montserrat'] overflow-x-hidden">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-white z-30 shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#8B0000] flex items-center justify-center text-white font-bold text-xs shadow-inner">
                        <Activity size={16} />
                    </div>
                    <div>
                        <h2 className="text-gray-900 font-bold text-sm truncate max-w-[150px]">{user.name}</h2>
                    </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-900 p-1">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Backdrop */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1A1A1A] text-gray-300 flex flex-col transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-2xl`}>
                
                {/* Brand / User Profile Area */}
                <div className="p-6 flex items-center gap-3 border-b border-[#2D2D2D] bg-[#111111]">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-lg border border-red-500/30">
                        <Activity size={20} />
                    </div>
                    <div className="overflow-hidden">
                        <h2 className="text-white font-bold text-sm truncate">{user.name}</h2>
                        <p className="text-[10px] text-gray-400 truncate uppercase tracking-wider">Blood Bank Portal</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    isActive 
                                    ? 'bg-red-900/30 text-red-500 border border-red-900/50 shadow-inner' 
                                    : 'hover:text-white hover:bg-[#2D2D2D] border border-transparent'
                                }`}
                            >
                                <Icon size={18} className={isActive ? "text-red-500" : "text-gray-400"} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 space-y-2 border-t border-[#2D2D2D] bg-[#111111]">
                    <Link to="/bloodbank/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-[#2D2D2D] transition-all">
                        <Settings size={18} />
                        <span>Facility Settings</span>
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all">
                        <LogOut size={18} />
                        <span>Secure Logout</span>
                    </button>

                    <div className="px-4 pt-4 pb-2 flex items-center justify-between text-[10px] text-gray-600 font-bold uppercase tracking-wider">
                        <span>BloodDeck System</span>
                        <span>v1.0.0</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 min-w-0 transition-all duration-300 pt-16 md:pt-0 bg-gray-50 relative">
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default BloodBankLayout;