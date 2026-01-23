
import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Truck, Settings, LogOut, Search, Activity, HelpCircle, Menu, X } from 'lucide-react';

const HospitalLayout = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/hospital/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/hospital/search', label: 'Search & Request', icon: Search },
        { path: '/hospital/allocation', label: 'Matching & Allocation', icon: Activity },
        { path: '/hospital/dispatch', label: 'Dispatch', icon: Truck },
    ];

    return (
        <div className="flex min-h-screen bg-[#E5E5E5] font-['Montserrat'] overflow-x-hidden">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-white z-30 shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#4B4B4B] flex items-center justify-center text-white font-bold text-xs">
                        <img src="https://cdn-icons-png.flaticon.com/512/483/483497.png" alt="Logo" className="w-4 h-4 opacity-70 invert" />
                    </div>
                    <div>
                        <h2 className="text-[#4B4B4B] font-bold text-sm">St. Nicholas</h2>
                    </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#4B4B4B] p-1">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#4B4B4B] text-gray-300 flex flex-col transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}>
                {/* Logo */}
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#4B4B4B] font-bold text-xs">
                        <img src="https://cdn-icons-png.flaticon.com/512/483/483497.png" alt="Logo" className="w-4 h-4 opacity-70" />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-sm">St. Nicholas Hospital</h2>
                        <p className="text-[10px] text-gray-400">hospital@stnicholas.com</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? 'bg-[#5B5B5B] text-white shadow-sm'
                                    : 'hover:text-white hover:bg-[#5B5B5B]/50'
                                    }`}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 space-y-1 border-t border-gray-700">
                    <Link to="/hospital/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-[#5B5B5B]/50 transition-all">
                        <Settings size={18} />
                        <span>Settings</span>
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-[#5B5B5B]/50 transition-all">
                        <LogOut size={18} />
                        <span>Log Out</span>
                    </button>

                    <div className="px-4 py-2 mt-2 flex items-center gap-2 text-xs text-gray-500">
                        <HelpCircle size={14} />
                        <span>Support</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 min-w-0 transition-all duration-300 pt-16 md:pt-0">
                <div className="p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default HospitalLayout;
