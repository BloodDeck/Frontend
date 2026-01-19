
import { Outlet, Link } from 'react-router-dom';

const DonorLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-red-600 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">BloodDeck Donor</h1>
                    <nav className="space-x-4">
                        <Link to="/donor/dashboard" className="hover:text-red-200">Dashboard</Link>
                        <Link to="/donor/donate" className="hover:text-red-200">Donate</Link>
                        <Link to="/donor/history" className="hover:text-red-200">History</Link>
                    </nav>
                </div>
            </header>
            <main className="flex-1 container mx-auto p-4">
                <Outlet />
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center">
                <p>&copy; 2026 BloodDeck</p>
            </footer>
        </div>
    );
};

export default DonorLayout;
