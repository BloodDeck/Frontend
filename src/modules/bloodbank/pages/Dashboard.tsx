import React, { useState, useEffect } from 'react';
import { Droplet, Truck, AlertCircle, CheckCircle2, Activity, Clock } from 'lucide-react';
import { fetchData } from '../../../api/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);
    const [inventory, setInventory] = useState<any[]>([]);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [statsData, stockData] = await Promise.all([
                    fetchData('bloodbank/dashboard/').catch(() => ({ total_donors: 0, pending_applications: 0 })),
                    fetchData('bloodbank/stock/').catch(() => ([]))
                ]);
                
                setStats(statsData);
                const actualStock = Array.isArray(stockData) ? stockData : (stockData?.results || []);
                setInventory(actualStock);
            } catch (error) {
                console.error("Failed to load dashboard:", error);
                toast.error("Failed to sync dashboard data.");
            } finally {
                setLoading(false);
            }
        };
        loadDashboard();
    }, []);

    const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0);
    const criticalStock = inventory.filter(item => item.units <= 10);

    // --- DARK THEME SKELETON LOADER ---
    if (loading) {
        return (
            <div className="space-y-6 font-['Montserrat'] animate-pulse">
                <div className="space-y-2 mb-6">
                    <div className="h-8 w-64 bg-[#2D2D2D] rounded-lg"></div>
                    <div className="h-4 w-48 bg-[#2D2D2D] rounded-lg"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <div className="h-96 bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>
                    <div className="h-96 bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 font-['Montserrat']">
            <div>
                <h1 className="text-2xl font-bold text-white">Blood Bank Overview</h1>
                <p className="text-gray-400 text-sm mt-1">Monitor your inventory levels and pending distributions.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#2D2D2D] p-5 rounded-xl border border-[#3D3D3D] shadow-lg flex flex-col justify-between h-32 border-l-4 border-l-red-600">
                    <div className="w-10 h-10 rounded-lg bg-red-900/20 text-red-500 flex items-center justify-center mb-2 border border-red-900/50">
                        <Droplet size={20} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Total Blood Units</p>
                        <h3 className="text-2xl font-bold text-white">{totalUnits}</h3>
                    </div>
                </div>
                
                <div className="bg-[#2D2D2D] p-5 rounded-xl border border-[#3D3D3D] shadow-lg flex flex-col justify-between h-32 border-l-4 border-l-orange-500">
                    <div className="w-10 h-10 rounded-lg bg-orange-900/20 text-orange-500 flex items-center justify-center mb-2 border border-orange-900/50">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Critical Blood Groups</p>
                        <h3 className="text-2xl font-bold text-white">{criticalStock.length}</h3>
                    </div>
                </div>

                <div className="bg-[#2D2D2D] p-5 rounded-xl border border-[#3D3D3D] shadow-lg flex flex-col justify-between h-32 border-l-4 border-l-blue-500">
                    <div className="w-10 h-10 rounded-lg bg-blue-900/20 text-blue-500 flex items-center justify-center mb-2 border border-blue-900/50">
                        <Truck size={20} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Pending Distributions</p>
                        <h3 className="text-2xl font-bold text-white">{stats?.pending_applications || 0}</h3>
                    </div>
                </div>

                <div className="bg-[#2D2D2D] p-5 rounded-xl border border-[#3D3D3D] shadow-lg flex flex-col justify-between h-32 border-l-4 border-l-green-500">
                    <div className="w-10 h-10 rounded-lg bg-green-900/20 text-green-500 flex items-center justify-center mb-2 border border-green-900/50">
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Donor Network</p>
                        <h3 className="text-2xl font-bold text-white">{stats?.total_donors || 0} Donors</h3>
                    </div>
                </div>
            </div>

            {/* Split Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Inventory Snapshot */}
                <div className="bg-[#2D2D2D] rounded-xl border border-[#3D3D3D] shadow-lg flex flex-col">
                    <div className="p-5 border-b border-[#3D3D3D] flex justify-between items-center bg-[#2A2A2A]">
                        <h3 className="font-bold text-white text-sm flex items-center gap-2">
                            <Activity size={18} className="text-red-500" /> Current Stock
                        </h3>
                    </div>
                    <div className="p-0 flex-1 overflow-y-auto max-h-[400px]">
                        {inventory.length > 0 ? inventory.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 hover:bg-[#1A1A1A] transition-colors border-b border-[#3D3D3D] last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner ${item.units <= 10 ? 'bg-red-600 text-white' : 'bg-[#1A1A1A] text-white border border-[#3D3D3D]'}`}>
                                        {item.blood_group}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold ${item.units <= 10 ? 'text-red-500' : 'text-white'}`}>{item.units} Pints</p>
                                    <p className="text-[10px] text-gray-500 mt-0.5">Updated {new Date(item.last_updated).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )) : (
                            <div className="p-8 text-center text-gray-500 text-sm">Your blood inventory is empty.</div>
                        )}
                    </div>
                </div>

                {/* Notifications Panel */}
                <div className="bg-[#2D2D2D] rounded-xl border border-[#3D3D3D] shadow-lg flex flex-col">
                    <div className="p-5 border-b border-[#3D3D3D] flex justify-between items-center bg-[#2A2A2A]">
                        <h3 className="font-bold text-white text-sm flex items-center gap-2">
                            <Clock size={18} className="text-blue-500" /> System Notifications
                        </h3>
                    </div>
                    <div className="p-6 flex-1 flex flex-col items-center justify-center text-center opacity-70">
                        <CheckCircle2 size={48} className="mb-4 text-green-500/50" />
                        <p className="text-sm font-medium text-white">All Systems Operational.</p>
                        <p className="text-xs text-gray-400 mt-1">Review incoming hospital requests via the Distribution tab.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;