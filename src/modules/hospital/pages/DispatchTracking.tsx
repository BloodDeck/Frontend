import React, { useState, useEffect } from 'react';
import { MapPin, Search, Phone, AlertTriangle, CheckCircle, Navigation, User } from 'lucide-react';
import { fetchData } from '../../../api/api';
import { toast } from 'react-toastify';

const DispatchTracking = () => {
    const [dispatches, setDispatches] = useState<any[]>([]);
    const [selectedDispatch, setSelectedDispatch] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDispatches = async () => {
            try {
                // We use approved applications as 'Active Dispatches'
                const data = await fetchData('hospital/requests/');
                const actualData = Array.isArray(data) ? data : (data?.results || []);
                const approvedReqs = actualData.filter((r: any) => r.status === 'approved');
                
                setDispatches(approvedReqs);
                if (approvedReqs.length > 0) {
                    setSelectedDispatch(approvedReqs[0]);
                }
            } catch (error) {
                toast.error("Failed to load dispatches.");
            } finally {
                setLoading(false);
            }
        };
        loadDispatches();
    }, []);

    // Helper to extract a search query for the map based on the dispatch
    const getMapQuery = () => {
        if (!selectedDispatch) return "Ibadan, Nigeria"; // Default location
        // Try to use the applicant name as a location hint, otherwise default to a city
        return `${selectedDispatch.applicant_name}, Nigeria`; 
    };

    return (
        <div className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] -m-4 md:-m-8 bg-gray-100 overflow-hidden flex">
            
            {/* REAL Google Map Area */}
            <div className="absolute inset-0 z-0 hidden md:block bg-[#E5E5E5]">
                <iframe
                    title="Dispatch Tracking Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'contrast(1.1) opacity(0.9)' }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(getMapQuery())}&t=m&z=13&ie=UTF8&iwloc=&output=embed`}
                ></iframe>
                
                {/* Overlay gradient to make the UI pop against the map */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/20 pointer-events-none"></div>
            </div>

            {/* Left - Dispatch List */}
            <div className="w-full md:w-80 bg-white/95 backdrop-blur-md z-10 flex flex-col h-full border-r border-gray-200 shadow-lg">
                <div className="p-4 border-b border-gray-200 bg-gray-50/90">
                    <h2 className="font-bold text-gray-900">Active Dispatches ({dispatches.length})</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="p-4 text-center text-sm text-gray-500">Locating deliveries...</div>
                    ) : dispatches.length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500">No active deliveries at this time.</div>
                    ) : (
                        dispatches.map(dispatch => (
                            <div 
                                key={dispatch.id} 
                                onClick={() => setSelectedDispatch(dispatch)}
                                className={`p-4 border-b border-gray-100 cursor-pointer transition-all ${selectedDispatch?.id === dispatch.id ? 'bg-blue-50 border-l-4 border-l-blue-600 shadow-sm' : 'hover:bg-gray-50'}`}
                            >
                                <p className="font-bold text-sm text-gray-900 flex items-center gap-2">
                                    <Truck size={14} className="text-blue-600"/> ID: #{dispatch.id}
                                </p>
                                <p className="text-xs text-gray-500 mt-1.5 truncate flex items-center gap-1">
                                    <MapPin size={12}/> {dispatch.applicant_name}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Right Tracking Panel */}
            {selectedDispatch && (
                <div className="absolute bottom-0 md:top-4 md:right-4 w-full md:w-96 h-[60vh] md:h-[calc(100%-2rem)] bg-[#262626]/95 backdrop-blur-xl text-white z-20 shadow-2xl p-6 flex flex-col transition-transform duration-300 rounded-t-3xl md:rounded-2xl border border-gray-700 overflow-y-auto">
                    <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6 md:hidden"></div>

                    <div className="border-b border-gray-700 pb-6 mb-6">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <Navigation size={18} className="text-blue-400"/> Delivery #{selectedDispatch.id}
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">Status: Approved / Dispatched</p>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-500 shadow-inner">
                            <User className="text-gray-300" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">BloodDeck Logistics</h3>
                            <p className="text-xs text-gray-400">Rider Assigned Automatically</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mb-8 bg-[#3D3D3D]/80 p-4 rounded-xl border border-gray-600">
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Destination / Requester</p>
                            <p className="text-sm font-bold flex items-center gap-2">
                                <MapPin size={14} className="text-red-400"/> {selectedDispatch.applicant_name}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Payload Info</p>
                            <p className="text-sm font-bold text-red-400">{selectedDispatch.details}</p>
                        </div>
                    </div>

                    {/* Timeline (Simulated as Backend lacks timestamp tracking for this) */}
                    <div className="flex-1 min-h-[200px] md:min-h-0">
                        <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-10 before:w-0.5 before:bg-gray-700">
                            <div className="relative">
                                <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full border-2 bg-blue-500 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                <h4 className="text-sm font-medium text-white">Request Approved</h4>
                                <p className="text-xs text-gray-400 mt-1">{new Date(selectedDispatch.created_at).toLocaleString()}</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full border-2 bg-[#262626] border-blue-500 animate-pulse"></div>
                                <h4 className="text-sm font-medium text-blue-400">In Transit</h4>
                                <p className="text-xs text-gray-500 mt-1">Pending Driver Update</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full border-2 bg-transparent border-gray-600"></div>
                                <h4 className="text-sm font-medium text-gray-500">Arrived</h4>
                                <p className="text-xs text-gray-600 mt-1">Awaiting Drop-off</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 md:mt-auto space-y-3 pb-safe">
                        <button 
                            onClick={() => toast.success("Confirmation sent to log.")}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/50"
                        >
                            <CheckCircle size={16} /> Confirm Receipt
                        </button>
                        <button className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors">
                            <AlertTriangle size={14} /> Report Issue
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DispatchTracking;