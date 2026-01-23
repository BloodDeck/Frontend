
import { MapPin, Truck, AlertCircle, Zap, ClipboardList, CheckCircle2, Wallet, HeartPulse } from 'lucide-react';

const Dashboard = () => {
    // Mock Data
    const metrics = [
        { label: 'Active Requests', value: '12', unit: 'Units', icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-50', trend: 'CURRENT' },
        { label: 'Units Received', value: '156', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', trend: 'THIS MONTH' },
        { label: 'Blood Spend', value: '₦4.2M', icon: Wallet, color: 'text-orange-600', bg: 'bg-orange-50', trend: 'BUDGET' },
        { label: 'Lives Impacted', value: '342', icon: HeartPulse, color: 'text-red-600', bg: 'bg-red-50', trend: 'SOCIAL IMPACT' },
    ];

    const activeRequests = [
        { id: '#REQ-4921', type: 'O+', quantity: '4 Units', urgency: 'CRITICAL', status: 'MATCHING', eta: 'Searching...', statusColor: 'bg-blue-100 text-blue-600', typeColor: 'bg-red-50 text-red-600' },
        { id: '#REQ-4810', type: 'B-', quantity: '2 Units', urgency: 'URGENT', status: 'IN TRANSIT', eta: '8 mins', statusColor: 'bg-orange-100 text-orange-600', typeColor: 'bg-blue-50 text-blue-600' },
        { id: '#REQ-4755', type: 'A+', quantity: '6 Units', urgency: 'ROUTINE', status: 'ARRIVED', eta: 'Delivered', statusColor: 'bg-green-100 text-green-600', typeColor: 'bg-gray-100 text-gray-600' },
    ];

    const nearbyInventory = [
        { name: 'City Central Bank', dist: '0.8 KM AWAY', stock: { 'O+': 12, 'B-': 4 } },
        { name: 'Red Cross Ikeja', dist: '2.4 KM AWAY', stock: { 'A+': 22, 'O-': 2 } },
        { name: 'St. Mary\'s Clinic', dist: '4.1 KM AWAY', stock: { 'O+': 5 } },
    ];

    const activities = [
        { title: 'Delivery Confirmed', desc: '4 units of A+ received by Nurse Funke for #REQ-4755', time: '2 MINUTES AGO', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-100' },
        { title: 'Rider Dispatched', desc: 'Rider #TX-44 (John) is heading to City Central Bank for #REQ-4810', time: '15 MINUTES AGO', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-100' },
        { title: 'Low Stock Alert', desc: 'Internal bank O- inventory below threshold (2 units left)', time: '1 HOUR AGO', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-100' },
    ];

    return (
        <div className="space-y-6 font-['Montserrat'] bg-gray-50/50 min-h-screen md:p-0 overflow-x-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-transparent py-2 gap-4 md:gap-0 px-3 md:px-0">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500 text-xs md:text-sm">Welcome back, Dr. Adeyemi</p>
                </div>
                <div className="flex flex-row w-full md:w-auto gap-2 md:gap-4 md:items-center">
                    <button className="flex-1 md:flex-none justify-center bg-[#E63946] hover:bg-red-700 text-white px-3 md:px-5 py-2.5 rounded-lg text-[10px] md:text-xs font-bold flex items-center gap-1.5 md:gap-2 transition-colors uppercase tracking-wide shadow-sm min-w-0">
                        <AlertCircle size={14} className="md:w-4 md:h-4 shrink-0" />
                        <span className="truncate">Emergency Alert</span>
                    </button>
                    <button className="flex-1 md:flex-none justify-center bg-black hover:bg-gray-800 text-white px-3 md:px-5 py-2.5 rounded-lg text-[10px] md:text-xs font-bold flex items-center gap-1.5 md:gap-2 transition-colors uppercase tracking-wide shadow-sm min-w-0">
                        <Zap size={14} className="md:w-4 md:h-4 shrink-0" />
                        <span className="truncate">Request Blood</span>
                    </button>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {metrics.map((m, i) => (
                    <div key={i} className="bg-white p-5 md:p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-32 md:h-36 relative overflow-hidden transition-all hover:shadow-md">
                        <div className="absolute top-5 right-5 md:top-6 md:right-6 text-[9px] md:text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-sm">
                            {m.trend}
                        </div>
                        <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg ${m.bg} ${m.color} flex items-center justify-center mb-3 md:mb-4`}>
                            <m.icon size={18} className="md:w-5 md:h-5" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-[10px] md:text-xs font-bold mb-1">{m.label}</p>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                {m.value} <span className="text-[10px] md:text-xs text-gray-400 font-normal ml-1">{m.unit ? m.unit : ''}</span>
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Requests Table */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 md:p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                        <h3 className="font-bold text-gray-900 text-sm">Active Blood Requests</h3>
                        <button className="text-blue-600 text-xs font-bold hover:underline">View all</button>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-white text-gray-900 font-bold uppercase border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 tracking-wider">Request ID</th>
                                    <th className="px-6 py-4 tracking-wider">Blood Type</th>
                                    <th className="px-6 py-4 tracking-wider">Quantity</th>
                                    <th className="px-6 py-4 tracking-wider">Urgency</th>
                                    <th className="px-6 py-4 tracking-wider">Status</th>
                                    <th className="px-6 py-4 tracking-wider text-right">ETA</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {activeRequests.map((req, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-gray-500 group-hover:text-gray-900 transition-colors">{req.id}</td>
                                        <td className="px-6 py-4">
                                            <span className={`w-8 h-6 flex items-center justify-center rounded font-bold ${req.typeColor}`}>{req.type}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">{req.quantity}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {req.urgency === 'CRITICAL' && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                                                {req.urgency === 'URGENT' && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
                                                <span className={`font-bold ${req.urgency === 'CRITICAL' ? 'text-red-500' : req.urgency === 'URGENT' ? 'text-orange-500' : 'text-gray-500'}`}>{req.urgency}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded bg-opacity-50 text-[10px] font-bold uppercase tracking-wide ${req.statusColor}`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-gray-900">{req.eta}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden flex flex-col divide-y divide-gray-100">
                        {activeRequests.map((req, i) => (
                            <div key={i} className="p-4 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-10 h-8 flex items-center justify-center rounded font-bold text-sm ${req.typeColor}`}>{req.type}</span>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{req.id}</p>
                                            <p className="text-xs text-gray-500">{req.quantity}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded bg-opacity-50 text-[10px] font-bold uppercase tracking-wide ${req.statusColor}`}>
                                        {req.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-xs border-t border-gray-50 pt-3 mt-1">
                                    <div className="flex items-center gap-2">
                                        {req.urgency === 'CRITICAL' && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                                        {req.urgency === 'URGENT' && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
                                        <span className={`font-bold ${req.urgency === 'CRITICAL' ? 'text-red-500' : req.urgency === 'URGENT' ? 'text-orange-500' : 'text-gray-500'}`}>{req.urgency}</span>
                                    </div>
                                    <div className="font-medium text-gray-900">
                                        ETA: {req.eta}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nearby Inventory */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
                    <div className="p-5 md:p-6 border-b border-gray-100">
                        <h3 className="font-bold text-gray-900 text-sm">Nearby Inventory</h3>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">Live stock in partner banks (5km radius)</p>
                    </div>
                    <div className="p-0 flex-1">
                        {nearbyInventory.map((bank, i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 group gap-3 sm:gap-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:shadow-sm">
                                        <MapPin size={14} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900">{bank.name}</p>
                                        <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">{bank.dist}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 pl-12 sm:pl-0 flex-wrap">
                                    {Object.entries(bank.stock).map(([type, count]) => (
                                        <div key={type} className={`px-2 py-1 rounded text-[10px] font-bold ${count < 5 ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                            {type}: <span className={count < 5 ? 'text-red-800' : 'text-blue-800'}>{count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-gray-100 rounded-b-xl border-t border-gray-100 text-center">
                        <button className="text-[10px] font-bold text-gray-500 hover:text-black uppercase tracking-widest w-full sm:w-auto">View Map View</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5 md:p-6">
                    <h3 className="font-bold text-gray-900 text-sm mb-6">Recent Activity Log</h3>
                    <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-100">
                        {activities.map((act, i) => (
                            <div key={i} className="flex gap-4 relative">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${act.bg} ${act.color} ring-4 ring-white`}>
                                    <act.icon size={14} />
                                </div>
                                <div className="flex-1 pt-1">
                                    <h4 className="text-sm font-bold text-gray-900">{act.title}</h4>
                                    <div className="flex items-center gap-2 mt-1 mb-2">
                                        <p className="text-xs text-gray-500">{act.desc}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{act.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Tip */}
                <div className="bg-[#1A73E8] rounded-xl shadow-lg p-6 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div>
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                            <Zap size={20} className="text-white fill-current" />
                        </div>
                        <h3 className="text-lg font-bold mb-3">AI Optimization Tip</h3>
                        <p className="text-blue-100 text-xs leading-relaxed font-medium opacity-90">
                            Based on your upcoming scheduled surgeries for Tuesday, we recommend pre-ordering 4 units of AB+ to avoid emergency surcharges.
                        </p>
                    </div>
                    <button className="w-full bg-white text-[#1A73E8] font-bold py-3 rounded-lg text-xs hover:bg-blue-50 transition-colors mt-8 shadow-sm">
                        Auto-Replenish Now
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
