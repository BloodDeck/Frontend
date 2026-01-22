
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Heart, Clock, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const DonorLayout = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/donor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/donor/donate', label: 'Donate Now', icon: Heart },
        { path: '/donor/history', label: 'My History', icon: Clock },
        { path: '/donor/profile', label: 'Profile', icon: User },
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
                            <p className="text-sm font-bold text-gray-900">John Doe</p>
                            <p className="text-xs text-gray-500">O+ Donor</p>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
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
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:text-red-600">
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
