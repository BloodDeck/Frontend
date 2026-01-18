import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative bg-red-600 text-white py-20 lg:py-32 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Saving Lives <br className="hidden md:block" /> Through Technology
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-red-100">
                        A comprehensive platform connecting blood donors, hospitals, and blood banks for seamless blood management.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/donor/register" className="px-8 py-3 bg-white text-red-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition">
                            Become a Donor
                        </Link>
                        <Link to="/about" className="px-8 py-3 bg-red-700 text-white font-bold rounded-lg shadow-lg hover:bg-red-800 transition border border-red-500">
                            Learn More
                        </Link>
                    </div>
                </div>
                {/* Abstract shapes */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </section>

            {/* Portals Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Portals</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Access the specific tools and dashboards tailored for your role in the blood donation ecosystem through our dedicated portals.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Donor Portal */}
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-red-500">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Donors</h3>
                            <p className="text-gray-500 mb-6">Track your donation history, schedule appointments, and see your impact.</p>
                            <Link to="/donor/login" className="text-red-600 font-semibold hover:text-red-700 flex items-center">
                                Enter Portal <span className="ml-2">&rarr;</span>
                            </Link>
                        </div>

                        {/* Hospital Portal */}
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-blue-500">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Hospitals</h3>
                            <p className="text-gray-500 mb-6">Request blood units, manage inventory, and track real-time deliveries.</p>
                            <Link to="/hospital/login" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center">
                                Enter Portal <span className="ml-2">&rarr;</span>
                            </Link>
                        </div>

                        {/* Blood Bank Portal */}
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-green-500">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Blood Banks</h3>
                            <p className="text-gray-500 mb-6">Manage stock levels, organize donation camps, and handle distribution.</p>
                            <Link to="/bloodbank/login" className="text-green-600 font-semibold hover:text-green-700 flex items-center">
                                Enter Portal <span className="ml-2">&rarr;</span>
                            </Link>
                        </div>

                        {/* Admin Portal */}
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-gray-800">
                            <div className="w-12 h-12 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Admin</h3>
                            <p className="text-gray-500 mb-6">System administration, user management, and platform analytics.</p>
                            <Link to="/admin/login" className="text-gray-800 font-semibold hover:text-gray-900 flex items-center">
                                Enter Portal <span className="ml-2">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
