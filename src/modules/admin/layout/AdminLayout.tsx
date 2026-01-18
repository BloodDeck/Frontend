import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
                <nav className="space-y-2">
                    <Link to="/admin/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">Dashboard</Link>
                    <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700 rounded">Users</Link>
                    <Link to="/admin/settings" className="block py-2 px-4 hover:bg-gray-700 rounded">Settings</Link>
                </nav>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
