import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const BloodBankLayout = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            <aside className="w-64 bg-green-800 text-white p-4">
                <h2 className="text-xl font-bold mb-6">Blood Bank</h2>
                <nav className="space-y-2">
                    <Link to="/bloodbank/dashboard" className="block py-2 px-4 hover:bg-green-700 rounded">Dashboard</Link>
                    <Link to="/bloodbank/stock" className="block py-2 px-4 hover:bg-green-700 rounded">Stock Management</Link>
                    <Link to="/bloodbank/distribution" className="block py-2 px-4 hover:bg-green-700 rounded">Distribution</Link>
                </nav>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default BloodBankLayout;
