
import { useState } from 'react';
import { Search, MapPin, Check, ChevronDown, X } from 'lucide-react';

const SearchAndRequest = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedBank, setSelectedBank] = useState<any>(null);

    const searchResults = [
        { id: 1, name: 'LifeBank Diagnostics', location: 'Lagos, Nigeria', dist: '5 km away', units: { 'A+': 12, 'O+': 8, 'B-': 5, 'AB+': 3 }, screened: true },
        { id: 2, name: 'RedCross Blood Services', location: 'Abuja, Nigeria', dist: '12 km away', units: { 'O-': 22, 'A-': 9, 'AB+': 4 }, screened: true },
        { id: 3, name: 'Lagos Island General', location: 'Lagos, Nigeria', dist: '8 km away', units: { 'O+': 15, 'B+': 10 }, screened: true },
    ];

    const handleRequest = (bank: any) => {
        setSelectedBank(bank);
        setShowModal(true);
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Search & Request Blood</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or location"
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-bold text-gray-900">Sort by:</span> Distance
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className="w-full lg:w-64 space-y-8">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4 text-sm">Filter by</h3>

                        <div className="mb-6">
                            <label className="block text-xs font-bold text-gray-700 mb-2">Blood Type</label>
                            <div className="relative">
                                <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-black">
                                    <option>Select Blood Type (e.g., A+)</option>
                                    <option>O+</option>
                                    <option>O-</option>
                                    <option>A+</option>
                                    <option>B+</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-bold text-gray-700">Proximity (km)</label>
                                <span className="text-xs text-gray-500">50 km</span>
                            </div>
                            <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-3">Screening Status</label>
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" defaultChecked />
                                    <span className="text-sm text-gray-600">HIV Screened</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" defaultChecked />
                                    <span className="text-sm text-gray-600">Hepatitis B Screened</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" defaultChecked />
                                    <span className="text-sm text-gray-600">Hepatitis C Screened</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results List */}
                <div className="flex-1 space-y-4">
                    <p className="text-sm font-bold text-gray-900">Showing {searchResults.length} results</p>

                    {searchResults.map((bank) => (
                        <div key={bank.id} className="bg-white border border-gray-100 rounded-xl p-6 transition-shadow hover:shadow-md">
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{bank.name}</h3>
                                    <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                                        <MapPin size={14} /> {bank.location} - {bank.dist}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRequest(bank)}
                                    className="bg-[#3D3D3D] hover:bg-black text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors"
                                >
                                    Request Blood
                                </button>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-gray-500 mb-2">Available Units:</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {Object.entries(bank.units).map(([type, count]) => (
                                        <span key={type} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-xs font-semibold">
                                            {type} ({count})
                                        </span>
                                    ))}
                                    {Object.keys(bank.units).length > 3 && (
                                        <span className="bg-gray-50 text-gray-500 px-3 py-1 rounded-md text-xs font-semibold">+ more</span>
                                    )}
                                </div>

                                {bank.screened && (
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                                            <Check size={10} className="text-gray-700" />
                                        </div>
                                        Fully Screened
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Request Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Request from {selectedBank?.name.split(' ')[0]}</h2>
                                <p className="text-xs text-gray-500">Specify quantity and urgency for your request.</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Blood Type</label>
                                <div className="relative">
                                    <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-black">
                                        <option>A+ (12 units available)</option>
                                        <option>O+ (8 units available)</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Enter Quantity</label>
                                <input
                                    type="number"
                                    defaultValue="1"
                                    min="1"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Set Urgency</label>
                                <div className="grid grid-cols-2 gap-4 p-1 bg-gray-100 rounded-lg">
                                    <button className="py-2 text-sm font-bold text-gray-600 rounded-md hover:bg-white hover:shadow-sm transition-all">Standard</button>
                                    <button className="py-2 text-sm font-bold text-red-600 bg-white shadow-sm rounded-md transition-all">Emergency</button>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-2">Emergency requests are prioritized and incur additional logistical fees.</p>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-lg text-sm transition-colors"
                            >
                                Cancel
                            </button>
                            <button className="flex-1 bg-[#3D3D3D] hover:bg-black text-white font-bold py-3 rounded-lg text-sm transition-colors">
                                Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchAndRequest;
