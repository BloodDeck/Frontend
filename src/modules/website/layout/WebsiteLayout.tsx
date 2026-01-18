import { Outlet, Link } from 'react-router-dom';

const WebsiteLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-red-600">BloodDeck</Link>
                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-red-600 font-medium">Home</Link>
                        <Link to="/about" className="text-gray-600 hover:text-red-600 font-medium">About Us</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-red-600 font-medium">Contact</Link>
                    </nav>
                    <div className="flex space-x-4">
                        <Link to="/donor/login" className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50">Login</Link>
                        <Link to="/donor/register" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Donate Now</Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>

            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">BloodDeck</h3>
                        <p className="text-gray-400">Connecting donors with those in need. Saving lives, one drop at a time.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/" className="hover:text-white">Home</Link></li>
                            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Portals</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/donor/login" className="hover:text-white">Donor Login</Link></li>
                            <li><Link to="/hospital/login" className="hover:text-white">Hospital Login</Link></li>
                            <li><Link to="/bloodbank/login" className="hover:text-white">Blood Bank Login</Link></li>
                            <li><Link to="/admin/login" className="hover:text-white">Admin Login</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Contact</h4>
                        <p className="text-gray-400">support@blooddeck.com</p>
                        <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                </div>
                <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
                    <p>&copy; 2026 BloodDeck. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default WebsiteLayout;
