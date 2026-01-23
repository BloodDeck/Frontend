import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Activity, Building2, Package, Settings, LogOut, Bell, Search, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import logoWhite from '../../../assets/images/logo_white.png';

const AdminLayout = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/applications', label: 'BloodBank Application', icon: Activity },
        { path: '/admin/hospitals', label: 'Hospital Application', icon: Building2 },
        { path: '/admin/inventory', label: 'Inventory', icon: Package },
        { path: '/admin/settings', label: 'Settings', icon: Settings },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <div className="flex min-h-screen bg-[#2A2A2A] font-['Montserrat'] text-gray-100 overflow-x-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleSidebar}></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:sticky top-0 left-0 h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col z-50 transform transition-all duration-300
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                ${isCollapsed ? 'md:w-20' : 'w-64'}
                `}
            >
                {/* Logo */}
                <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : ''} relative`}>
                    {!isCollapsed ? (
                        <div>
                            <img src={logoWhite} alt="BloodDeck" className="h-8 w-auto" />
                            <p className="text-[10px] text-gray-500 mt-1 tracking-widest uppercase">Super Admin</p>
                        </div>
                    ) : (
                        <img src={logoWhite} alt="BloodDeck" className="h-8 w-auto" />
                    )}

                    {/* Collapse Toggle (Desktop only) */}
                    <button
                        onClick={toggleCollapse}
                        className="hidden md:flex absolute -right-3 top-8 bg-[#2D2D2D] border border-gray-600 rounded-full p-1 text-gray-400 hover:text-white"
                    >
                        {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all group relative ${isActive
                                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    } ${isCollapsed ? 'justify-center' : ''}`}
                            >
                                <Icon size={20} className={isActive ? 'text-blue-400' : ''} />
                                {!isCollapsed && <span>{item.label}</span>}

                                {/* Tooltip for collapsed state */}
                                {isCollapsed && (
                                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile (Bottom) */}
                <div className="p-4 border-t border-white/10">
                    <div className={`flex items-center gap-3 mb-4 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold ring-2 ring-black">
                            SA
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">Admin User</p>
                                <p className="text-xs text-gray-500 truncate">super@lifeblood.ng</p>
                            </div>
                        )}
                        {!isCollapsed && <LogOut size={16} className="text-gray-500 cursor-pointer hover:text-white" />}
                    </div>
                    {!isCollapsed && (
                        <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-white px-2">
                            <LogOut size={14} /> Logout
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                {/* Header */}
                <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-400" onClick={toggleSidebar}>
                            <Menu size={24} />
                        </button>
                        <h2 className="text-lg font-semibold text-white">
                            {navItems.find(item => location.pathname.startsWith(item.path))?.label || 'Dashboard'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="bg-[#0A0A0A] border border-[#2D2D2D] rounded-full pl-9 pr-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-gray-500 w-64"
                            />
                        </div>
                        <button className="text-gray-400 hover:text-white relative">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" alt="User" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-4 md:p-6 overflow-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
