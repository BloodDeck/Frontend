
import { Outlet, Link } from 'react-router-dom';

const HospitalLayout = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            <aside className="w-64 bg-blue-800 text-white p-4">
                <h2 className="text-xl font-bold mb-6">Hospital Portal</h2>
                <nav className="space-y-2">
                    <Link to="/hospital/dashboard" className="block py-2 px-4 hover:bg-blue-700 rounded">Dashboard</Link>
                    <Link to="/hospital/requests" className="block py-2 px-4 hover:bg-blue-700 rounded">Blood Requests</Link>
                    <Link to="/hospital/inventory" className="block py-2 px-4 hover:bg-blue-700 rounded">Inventory</Link>
                </nav>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default HospitalLayout;
