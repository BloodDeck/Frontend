
import { MapPin, Search, Phone, AlertTriangle, CheckCircle, Navigation, User } from 'lucide-react';

const DispatchTracking = () => {
    const delivery = {
        id: '#BBN-4521',
        rider: 'John Doe',
        plate: 'LND-554-AX',
        eta: '12 mins',
        dist: '3.2 km',
        blood: 'O+ (2 Units)',
        source: 'Lagos General',
        timeline: [
            { status: 'Dispatched', time: '10:02 AM', completed: true },
            { status: 'In Transit', time: '10:05 AM', completed: true, current: true },
            { status: 'Arrived', time: '--:--', completed: false },
            { status: 'Received', time: '--:--', completed: false },
        ]
    };

    return (
        <div className="flex h-[calc(100vh-6rem)] -m-8 relative overflow-hidden bg-gray-100">
            {/* Map Area */}
            <div className="absolute inset-0 z-0">
                {/* Mock Map Background */}
                <div className="w-full h-full bg-[#E5E5E5] relative opacity-90">
                    {/* Grid lines simulating map */}
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ccc 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                    {/* Streets (Abstract) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 200 Q 400 250 800 200 T 1200 300" stroke="white" strokeWidth="8" fill="none" />
                        <path d="M400 0 V 800" stroke="white" strokeWidth="4" fill="none" />

                        {/* Route Path */}
                        <path d="M400 250 L 500 350 L 700 350 L 800 450" stroke="#8B0000" strokeWidth="4" fill="none" strokeDasharray="10 5" className="animate-pulse" />
                    </svg>

                    {/* Pins */}
                    <div className="absolute top-[250px] left-[400px] -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                    <div className="absolute top-[450px] left-[800px] -translate-x-1/2 -translate-y-1/2">
                        <MapPin className="text-red-600 drop-shadow-xl" size={40} fill="currentColor" />
                    </div>
                    <div className="absolute top-[350px] left-[500px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg animate-bounce">
                        <Navigation className="text-black transform rotate-45" size={20} fill="currentColor" />
                    </div>
                </div>

                <div className="absolute top-6 left-6 z-10 w-96">
                    <div className="bg-[#2D2D2D] rounded-lg p-2 flex items-center gap-3 shadow-lg">
                        <Search className="text-gray-400 ml-2" size={18} />
                        <input
                            type="text"
                            placeholder="Search location"
                            className="bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Right Tracking Panel */}
            <div className={`absolute right-0 top-0 h-full w-96 bg-[#262626] text-white z-20 shadow-2xl p-6 flex flex-col transition-transform duration-300 transform translate-x-0`}>
                <div className="border-b border-gray-700 pb-6 mb-6">
                    <h2 className="text-lg font-bold">Delivery Details - {delivery.id}</h2>
                </div>

                {/* Rider Info */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center border-2 border-gray-500">
                        <User className="text-gray-300" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">{delivery.rider}</h3>
                        <p className="text-xs text-gray-400">Delivery Rider • {delivery.plate}</p>
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                        <p className="text-xs text-gray-400 mb-1">ETA</p>
                        <p className="text-xl font-bold">{delivery.eta}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 mb-1">Distance</p>
                        <p className="text-xl font-bold">{delivery.dist}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 mb-1">Blood Type</p>
                        <p className="text-sm font-bold">{delivery.blood}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 mb-1">Hospital</p>
                        <p className="text-sm font-bold">{delivery.source}</p>
                    </div>
                </div>

                {/* Timeline */}
                <div className="flex-1">
                    <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-10 before:w-0.5 before:bg-gray-700">
                        {delivery.timeline.map((item, i) => (
                            <div key={i} className="relative">
                                <div className={`absolute -left-[23px] top-1 w-3 h-3 rounded-full border-2 ${item.completed ? 'bg-blue-500 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-transparent border-gray-600'}`}>
                                    {item.completed && <CheckCircle size={8} className="text-white absolute -top-0.5 -left-0.5 opacity-0" />}
                                </div>
                                <h4 className={`text-sm font-medium ${item.completed || item.current ? 'text-white' : 'text-gray-500'}`}>{item.status}</h4>
                                <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-auto space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <button className="bg-[#3D3D3D] hover:bg-gray-600 text-white font-bold py-3 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors">
                            Confirm Receipt
                        </button>
                        <button className="bg-[#3D3D3D] hover:bg-gray-600 text-white font-bold py-3 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors">
                            <Phone size={14} /> Call
                        </button>
                    </div>
                    <button className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white font-bold py-3 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors">
                        <AlertTriangle size={14} /> Report Issue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DispatchTracking;
