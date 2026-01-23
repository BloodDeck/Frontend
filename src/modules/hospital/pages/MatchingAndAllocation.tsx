
import { useState } from 'react';
import { MapPin, Search, AlertCircle, CheckCircle, Package, ArrowUpRight, X } from 'lucide-react';

const MatchingAndAllocation = () => {
    const [selectedRequest, setSelectedRequest] = useState(1);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('pay_now');

    const requests = [
        { id: 1, patId: 'NG-PAT-001', type: 'O+', units: 2, status: 'Pending Match', urgent: true },
        { id: 2, patId: 'NG-PAT-002', type: 'A-', units: 1, status: 'Pending Match', urgent: false },
        { id: 3, patId: 'NG-PAT-003', type: 'B+', units: 4, status: 'Pending Match', urgent: false },
        { id: 4, patId: 'NG-PAT-004', type: 'AB+', units: 1, status: 'Fulfilled', urgent: false },
    ];

    return (

        <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-6rem)] -m-4 md:-m-8">
            {/* Left Sidebar - Request Queue */}
            <div className="w-full lg:w-80 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col h-auto max-h-96 lg:h-auto lg:max-h-full overflow-y-auto order-2 lg:order-1">
                <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h3 className="font-bold text-gray-900 mb-3">Request Queue (4)</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by ID, Blood Type..."
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {requests.map((req) => (
                        <div
                            key={req.id}
                            onClick={() => setSelectedRequest(req.id)}
                            className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${selectedRequest === req.id ? 'bg-gray-50 border-l-4 border-l-black' : 'hover:bg-gray-50'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-sm font-bold text-gray-900">{req.patId}</span>
                                {req.urgent ? (
                                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded">Urgent</span>
                                ) : (
                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded">Normal</span>
                                )}
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Blood Type: <b className="text-gray-900">{req.type}</b></span>
                                <span>Units: <b className="text-gray-900">{req.units}</b></span>
                            </div>
                            <div className="text-[10px] text-gray-400">
                                Status: {req.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Center - Main Content */}
            <div className="flex-1 bg-gray-50 p-4 md:p-6 overflow-y-auto order-1 lg:order-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-6 md:gap-0">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-xs font-bold text-gray-500 uppercase">Patient ID</span>
                                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded flex items-center gap-1">
                                    <AlertCircle size={12} /> URGENT
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">NG-PAT-001</h1>
                            <p className="text-gray-500 text-sm">Lagos University Teaching Hospital (LUTH)</p>
                        </div>
                        <div className="flex flex-wrap gap-6 md:gap-8 text-sm">
                            <div className="w-1/2 md:w-auto">
                                <p className="text-gray-500 text-xs mb-1">Blood Component</p>
                                <p className="font-bold text-gray-900">Whole Blood (O+)</p>
                            </div>
                            <div className="w-1/2 md:w-auto">
                                <p className="text-gray-500 text-xs mb-1">Units Requested</p>
                                <p className="font-bold text-gray-900">2 Units</p>
                            </div>
                            <div className="w-full md:w-auto">
                                <p className="text-gray-500 text-xs mb-1">Request Time</p>
                                <p className="font-bold text-gray-900">Today, 09:41 AM</p>
                            </div>
                        </div>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-4">AI Matching Results</h3>
                    <p className="text-xs text-gray-500 mb-4">Showing best available matches nearby.</p>

                    {/* Placeholder Map */}
                    <div className="w-full h-48 md:h-64 bg-green-100 rounded-xl mb-6 relative overflow-hidden border border-green-200">
                        {/* Abstract Map Elements */}
                        <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Lagos&zoom=13&size=600x300&key=YOUR_API_KEY')] bg-cover bg-center opacity-50 mix-blend-multiply"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                            <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute"></div>
                            <div className="w-3 h-3 bg-red-600 rounded-full border-2 border-white z-10"></div>
                        </div>
                        <div className="absolute top-1/3 left-1/3">
                            <MapPin className="text-red-500 drop-shadow-md" size={24} fill="currentColor" />
                        </div>
                        <div className="absolute bottom-1/3 right-1/3">
                            <MapPin className="text-red-500 drop-shadow-md" size={24} fill="currentColor" />
                        </div>
                    </div>

                    {/* Tabs / Availability List */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden divide-y divide-gray-100">
                        <div className="flex items-center justify-between p-4 bg-gray-50 text-xs font-bold text-gray-600 border-b border-gray-200 overflow-x-auto">
                            <div className="flex gap-6 min-w-max">
                                <span className="text-black border-b-2 border-black pb-4 -mb-4.5">Internal Stock (2)</span>
                                <span className="text-gray-400">Nearby Banks (1)</span>
                                <span className="text-gray-400">Available Donors (5)</span>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                                    <Package size={20} className="text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Central Blood Bank (Internal)</p>
                                    <p className="text-xs text-gray-500">O+ Available: <b className="text-gray-700">8 Units</b></p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-gray-400 pl-14 sm:pl-0">0 km</span>
                        </div>
                        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                                    <span className="font-bold text-gray-600 text-xs">+</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Donor ID #4582</p>
                                    <p className="text-xs text-gray-500">Verified O+ Donor</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-gray-400 pl-14 sm:pl-0">2.1 km</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Allocate */}
            <div className="w-full lg:w-96 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col p-6 order-3">
                <h3 className="font-bold text-gray-900 mb-6">Allocate & Reserve</h3>

                <div className="mb-6 p-4 border border-gray-200 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-xs font-bold text-gray-700">Source: Central Blood Bank</label>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                        <span className="text-xs text-gray-500">Units to Allocate:</span>
                        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded px-2 py-1">
                            <button className="text-gray-400 hover:text-black">-</button>
                            <span className="text-sm font-bold text-gray-900">2</span>
                            <button className="text-gray-400 hover:text-black">+</button>
                        </div>
                    </div>
                </div>

                <div className="w-full border border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center text-xs font-bold text-gray-500 hover:border-gray-400 hover:text-gray-700 cursor-pointer transition-all mb-auto">
                    + Add Another Source
                </div>

                <div className="mt-8">
                    <h4 className="font-bold text-gray-900 mb-4">Summary</h4>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Total Requested:</span>
                        <span className="font-bold text-gray-900">2 Units</span>
                    </div>
                    <div className="flex justify-between text-sm mb-6">
                        <span className="text-gray-500">Total Allocated:</span>
                        <span className="font-bold text-gray-900">2 Units</span>
                    </div>

                    <button
                        onClick={() => setShowPaymentModal(true)}
                        className="w-full bg-[#3D3D3D] hover:bg-black text-white font-bold py-4 rounded-xl mb-3 flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                        <CheckCircle size={18} /> Reserve & Confirm Allocation
                    </button>
                    <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-4 rounded-xl text-sm transition-colors">
                        SOS Notify Urgent Donors
                    </button>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Left - Summary */}
                        <div className="w-1/2 p-8 bg-gray-50 border-r border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Request Summary</h2>
                            <p className="text-xs text-gray-500 mb-8">Review the details of blood request #12345.</p>

                            <div className="space-y-4 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Status</span>
                                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bold">Awaiting Payment</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Blood Type</span>
                                    <span className="font-bold text-gray-900">O+</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Units Required</span>
                                    <span className="font-bold text-gray-900">4 Units</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Patient ID</span>
                                    <span className="font-bold text-gray-900">PID-789012</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Destination Hospital</span>
                                    <span className="font-bold text-gray-900">St. Mary's General Hospital</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Priority Level</span>
                                    <span className="text-red-600 font-bold flex items-center gap-1"><AlertCircle size={10} /> Urgent</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="mt-8 flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black transition-colors"
                            >
                                <X size={14} className="bg-gray-400 rounded-full text-white p-0.5" /> Cancel Request
                            </button>
                        </div>

                        {/* Right - Payment */}
                        <div className="w-1/2 p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Fee & Payment</h2>
                            <p className="text-xs text-gray-500 mb-8">Choose a payment option to finalize the request.</p>

                            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Logistics Fee</span>
                                    <span className="font-medium text-gray-900">₦15,000</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Service Fee</span>
                                    <span className="font-medium text-gray-900">₦5,000</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Premium Access Fee</span>
                                    <span className="font-medium text-gray-900">₦2,500</span>
                                </div>
                                <div className="pt-3 border-t border-gray-200 flex justify-between text-sm font-bold text-gray-900">
                                    <span>Total Amount</span>
                                    <span>₦22,500</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <label className={`block border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'pay_now' ? 'border-black ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="pay_now"
                                            checked={paymentMethod === 'pay_now'}
                                            onChange={() => setPaymentMethod('pay_now')}
                                            className="mt-1 text-black focus:ring-black"
                                        />
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Pay Now</p>
                                            <p className="text-xs text-gray-500 mt-1">Proceed with standard payment to confirm.</p>
                                        </div>
                                    </div>
                                </label>

                                <label className={`block border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'waive' ? 'border-black ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="waive"
                                            checked={paymentMethod === 'waive'}
                                            onChange={() => setPaymentMethod('waive')}
                                            className="mt-1 text-black focus:ring-black"
                                        />
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Waive Fees</p>
                                            <p className="text-xs text-gray-500 mt-1">Available for registered partners only.</p>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            <button className="w-full bg-[#3D3D3D] hover:bg-black text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                Proceed to Payment <ArrowUpRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper Icon for button


export default MatchingAndAllocation;
