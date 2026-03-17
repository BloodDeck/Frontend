import React, { useState, useEffect } from 'react';
import { Search, MapPin, Check, ChevronDown, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { fetchData, postData } from '../../../api/api';

const SearchAndRequest = () => {
    const [facilities, setFacilities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [selectedBank, setSelectedBank] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [bloodType, setBloodType] = useState('O+');
    const [quantity, setQuantity] = useState(1);
    const [urgency, setUrgency] = useState('Standard');

    useEffect(() => {
        const loadFacilities = async () => {
            try {
                // Fetch real facilities from the backend
                const data = await fetchData('facilities/');
                // Filter out the current user if possible, or just show all
                setFacilities(Array.isArray(data) ? data : (data?.results || []));
            } catch (error) {
                console.error("Failed to load facilities", error);
                toast.error("Failed to load nearby facilities.");
            } finally {
                setLoading(false);
            }
        };
        loadFacilities();
    }, []);

    const handleRequestClick = (bank: any) => {
        setSelectedBank(bank);
        setShowModal(true);
    };

    const handleSubmitRequest = async () => {
        setSubmitting(true);
        try {
            // We use the Application model to log the request
            await postData('applications/', {
                applicant_name: `Blood Request to ${selectedBank.first_name || selectedBank.email}`,
                category: 'hospital',
                details: `Blood Type: ${bloodType}, Units: ${quantity}, Urgency: ${urgency}`
            });
            
            toast.success(`Request sent to ${selectedBank.first_name || 'facility'} successfully!`);
            setShowModal(false);
        } catch (error: any) {
            console.error("Failed to submit request", error);
            toast.error(error.message || "Failed to submit request.");
        } finally {
            setSubmitting(false);
        }
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
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Results List */}
                <div className="flex-1 space-y-4">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500 animate-pulse">Scanning network for facilities...</div>
                    ) : (
                        <>
                            <p className="text-sm font-bold text-gray-900">Showing {facilities.length} partner facilities</p>
                            
                            {facilities.map((bank) => (
                                <div key={bank.id} className="bg-white border border-gray-100 rounded-xl p-6 transition-shadow hover:shadow-md">
                                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 capitalize">{bank.first_name || bank.email}</h3>
                                            <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                                                <MapPin size={14} /> {bank.city || 'Unknown Location'} - {bank.role}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRequestClick(bank)}
                                            className="bg-[#3D3D3D] hover:bg-black text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors"
                                        >
                                            Request Blood
                                        </button>
                                    </div>
                                    
                                    {/* Mocking Available units visually since the Facility view doesn't expose it yet */}
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 mb-2">Facility Status:</p>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center bg-green-50">
                                                <Check size={10} className="text-green-700" />
                                            </div>
                                            Active Partner
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>

            {/* Request Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Request from {(selectedBank?.first_name || 'Facility').split(' ')[0]}</h2>
                                <p className="text-xs text-gray-500">Specify quantity and urgency for your request.</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Blood Type</label>
                                <select 
                                    value={bloodType}
                                    onChange={(e) => setBloodType(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                >
                                    <option value="O+">O Positive (O+)</option>
                                    <option value="O-">O Negative (O-)</option>
                                    <option value="A+">A Positive (A+)</option>
                                    <option value="B+">B Positive (B+)</option>
                                    <option value="AB+">AB Positive (AB+)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Enter Quantity (Units)</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    min="1"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Set Urgency</label>
                                <div className="grid grid-cols-2 gap-4 p-1 bg-gray-100 rounded-lg">
                                    <button 
                                        onClick={() => setUrgency('Standard')}
                                        className={`py-2 text-sm font-bold rounded-md transition-all ${urgency === 'Standard' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:bg-white/50'}`}
                                    >
                                        Standard
                                    </button>
                                    <button 
                                        onClick={() => setUrgency('Emergency')}
                                        className={`py-2 text-sm font-bold rounded-md transition-all ${urgency === 'Emergency' ? 'bg-red-600 shadow-sm text-white' : 'text-red-500 hover:bg-red-50'}`}
                                    >
                                        Emergency
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-lg text-sm transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSubmitRequest}
                                disabled={submitting}
                                className="flex-1 bg-[#3D3D3D] hover:bg-black text-white font-bold py-3 rounded-lg text-sm transition-colors disabled:opacity-50"
                            >
                                {submitting ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchAndRequest;