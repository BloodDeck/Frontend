import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MapPin, Truck, AlertCircle, Zap, ClipboardList, CheckCircle2, Wallet, HeartPulse } from 'lucide-react';
import { fetchData } from '../../../api/api';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [hospitalInfo, setHospitalInfo] = useState<any>(null);
    const [myInventory, setMyInventory] = useState<any[]>([]);
    const [myRequests, setMyRequests] = useState<any[]>([]);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                // Fetch stats, inventory, and requests concurrently
                const [dashData, invData, reqData] = await Promise.all([
                    fetchData('hospital/dashboard/'),
                    fetchData('hospital/inventory/'),
                    fetchData('hospital/requests/')
                ]);
                
                setHospitalInfo(dashData);
                
                // Safely handle paginated responses
                setMyInventory(Array.isArray(invData) ? invData : (invData?.results || []));
                setMyRequests(Array.isArray(reqData) ? reqData : (reqData?.results || []));

            } catch (error) {
                console.error("Failed to load hospital dashboard", error);
                toast.error("Failed to sync latest data.");
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    // Calculate total units across all blood groups in local inventory
    const totalLocalUnits = myInventory.reduce((sum, item) => sum + item.units, 0);
    const activeRequestsCount = myRequests.filter(r => r.status !== 'fulfilled' && r.status !== 'rejected').length;

    if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Syncing data with server...</div>;

    return (
        <div className="space-y-6 font-['Montserrat'] bg-gray-50/50 min-h-screen md:p-0 overflow-x-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-transparent py-2 gap-4 md:gap-0 px-3 md:px-0">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">Facility Dashboard</h1>
                    <p className="text-gray-500 text-xs md:text-sm">{hospitalInfo?.message || 'Welcome back'}</p>
                </div>
                <div className="flex flex-row w-full md:w-auto gap-2 md:gap-4 md:items-center">
                    <button className="flex-1 md:flex-none justify-center bg-[#E63946] hover:bg-red-700 text-white px-3 md:px-5 py-2.5 rounded-lg text-[10px] md:text-xs font-bold flex items-center gap-1.5 md:gap-2 transition-colors uppercase tracking-wide shadow-sm min-w-0">
                        <AlertCircle size={14} className="md:w-4 md:h-4 shrink-0" />
                        <span className="truncate">Emergency Alert</span>
                    </button>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                        <ClipboardList size={18} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-[10px] font-bold mb-1">Active Requests</p>
                        <h3 className="text-2xl font-bold text-gray-900">{activeRequestsCount}</h3>
                    </div>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
                    <div className="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center mb-3">
                        <CheckCircle2 size={18} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-[10px] font-bold mb-1">Local Stock Available</p>
                        <h3 className="text-2xl font-bold text-gray-900">{totalLocalUnits} <span className="text-xs text-gray-400">Units</span></h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Requests Table */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 md:p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                        <h3 className="font-bold text-gray-900 text-sm">Your Active Applications/Requests</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-gray-50 text-gray-600 font-bold uppercase border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 tracking-wider">Date</th>
                                    <th className="px-6 py-4 tracking-wider">Details</th>
                                    <th className="px-6 py-4 tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {myRequests.length > 0 ? myRequests.map((req, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-500">{new Date(req.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-gray-900">{req.details || "Blood Request"}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded bg-opacity-20 text-[10px] font-bold uppercase tracking-wide ${req.status === 'approved' ? 'bg-green-500 text-green-700' : req.status === 'rejected' ? 'bg-red-500 text-red-700' : 'bg-yellow-500 text-yellow-700'}`}>
                                                {req.status}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-8 text-center text-gray-500">No active requests.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Local Inventory Breakdown */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
                    <div className="p-5 md:p-6 border-b border-gray-100">
                        <h3 className="font-bold text-gray-900 text-sm">Internal Blood Stock</h3>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">Breakdown by blood group</p>
                    </div>
                    <div className="p-0 flex-1">
                        {myInventory.length > 0 ? myInventory.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${item.units < 5 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'}`}>
                                        {item.blood_group}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold ${item.units < 5 ? 'text-red-600' : 'text-gray-900'}`}>{item.units} Units</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">Updated: {new Date(item.last_updated).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )) : (
                            <div className="p-8 text-center text-gray-500 text-xs">No inventory logged yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;