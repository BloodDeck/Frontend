import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Package, ArrowLeft, Building2, Droplet, Clock, Activity, History, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Save } from 'lucide-react';
import { fetchData, updateData } from '../../../api/api';

interface InventoryItem {
    id: number;
    owner_name: string;
    blood_group: string;
    units: number;
    last_updated: string;
}

const InventoryDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const [item, setItem] = useState<InventoryItem | null>(null);
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [updateUnits, setUpdateUnits] = useState<number | ''>('');
    const [updating, setUpdating] = useState(false);

    const loadData = async () => {
        try {
            const [itemData, logsData] = await Promise.all([
                fetchData(`admin/inventory/${id}/`),
                fetchData(`admin/inventory/${id}/logs/`)
            ]);
            
            setItem(itemData);
            setUpdateUnits(itemData.units);
            setLogs(Array.isArray(logsData) ? logsData : (logsData?.results || []));
        } catch (error) {
            console.error("Failed to load inventory details:", error);
            toast.error("Failed to load inventory details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) loadData();
    }, [id]);

    const handleUpdateStock = async (e: React.FormEvent) => {
        e.preventDefault();
        if (updateUnits === '' || updateUnits < 0) {
            toast.error("Please enter a valid unit amount.");
            return;
        }

        setUpdating(true);
        try {
            await updateData(`admin/inventory/${id}/`, { units: updateUnits });
            toast.success("Stock levels updated successfully!");
            await loadData();
        } catch (error: any) {
            console.error("Failed to update stock:", error);
            toast.error(error.message || "Failed to update stock.");
        } finally {
            setUpdating(false);
        }
    };

    const getStockHealth = (units: number) => {
        const maxCapacity = 200; 
        const percentage = Math.min((units / maxCapacity) * 100, 100);
        
        if (units <= 10) return { label: 'Critical Alert', color: 'bg-red-500', text: 'text-red-500', percent: percentage, icon: <AlertTriangle size={18} className="text-red-500"/> };
        if (units <= 50) return { label: 'Low Stock', color: 'bg-yellow-500', text: 'text-yellow-500', percent: percentage, icon: <Activity size={18} className="text-yellow-500"/> };
        return { label: 'Optimal Stock', color: 'bg-green-500', text: 'text-green-500', percent: percentage, icon: <CheckCircle size={18} className="text-green-500"/> };
    };

    // --- SKELETON LOADER ---
    if (loading) {
        return (
            <div className="space-y-6 max-w-6xl mx-auto animate-pulse">
                <div className="flex items-center justify-between">
                    <div className="space-y-3">
                        <div className="h-4 w-48 bg-[#2D2D2D] rounded-lg"></div>
                        <div className="h-8 w-72 bg-[#2D2D2D] rounded-lg"></div>
                    </div>
                    <div className="h-10 w-32 bg-[#2D2D2D] rounded-lg"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 h-[400px] bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>
                    <div className="h-[400px] bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>
                </div>
                <div className="h-64 bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>
            </div>
        );
    }

    if (!item) return <div className="p-8 text-center text-red-500">Inventory item not found.</div>;

    const health = getStockHealth(item.units);

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span className="cursor-pointer hover:text-white" onClick={() => navigate('/admin/dashboard')}>Dashboard</span> &gt; 
                        <span className="cursor-pointer hover:text-white" onClick={() => navigate('/admin/inventory')}>Inventory</span> &gt; 
                        <span className="text-gray-300">Details</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Package className="text-blue-500" /> {item.owner_name} Inventory
                    </h1>
                </div>
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors bg-[#2D2D2D] px-4 py-2 rounded-lg border border-[#3D3D3D]">
                    <ArrowLeft size={16} /> Back to List
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-[#2D2D2D] rounded-xl border border-[#3D3D3D] p-6 shadow-lg lg:col-span-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Droplet size={120} className={health.text} />
                    </div>
                    
                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Target Blood Group</p>
                            <span className="inline-block px-4 py-1.5 bg-[#1A1A1A] border border-[#3D3D3D] text-white font-bold rounded-lg text-2xl shadow-inner">
                                {item.blood_group}
                            </span>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Facility Name</p>
                            <p className="text-lg font-bold text-white flex items-center justify-end gap-2">
                                <Building2 size={16} className="text-gray-500"/> {item.owner_name}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6 relative z-10">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Current Available Stock</p>
                        <div className="flex items-baseline gap-3">
                            <span className="text-6xl font-black text-white tracking-tight">{item.units}</span>
                            <span className="text-lg text-gray-500 font-medium mb-2">Pints / Units</span>
                        </div>
                    </div>

                    <div className="space-y-2 relative z-10 bg-[#1A1A1A] p-4 rounded-xl border border-[#3D3D3D]">
                        <div className="flex justify-between items-center text-sm">
                            <span className={`font-bold flex items-center gap-1.5 ${health.text}`}>
                                {health.icon} {health.label}
                            </span>
                            <span className="text-gray-500 font-medium">{item.units} / 200 Max Capacity</span>
                        </div>
                        <div className="w-full bg-[#2A2A2A] rounded-full h-3 overflow-hidden border border-[#3D3D3D]">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ${health.color}`} 
                                style={{ width: `${health.percent}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#2D2D2D] rounded-xl border border-[#3D3D3D] p-6 shadow-lg flex flex-col">
                    <div className="flex items-center gap-2 mb-6 border-b border-[#3D3D3D] pb-4">
                        <Activity className="text-blue-500" size={20} />
                        <h2 className="text-lg font-bold text-white">Manage Stock</h2>
                    </div>

                    <p className="text-sm text-gray-400 mb-6">
                        Manually override the inventory count. This should only be done to correct discrepancies.
                    </p>

                    <form onSubmit={handleUpdateStock} className="mt-auto space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Override Unit Count</label>
                            <input
                                type="number"
                                min="0"
                                value={updateUnits}
                                onChange={(e) => setUpdateUnits(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full bg-[#1A1A1A] border border-[#3D3D3D] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-2xl font-bold text-center"
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={updating || updateUnits === item.units}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
                        >
                            <Save size={18} />
                            {updating ? 'Saving...' : 'Save New Count'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="bg-[#2D2D2D] rounded-xl border border-[#3D3D3D] shadow-lg overflow-hidden">
                <div className="p-6 border-b border-[#3D3D3D] flex justify-between items-center bg-[#2A2A2A]">
                    <div className="flex items-center gap-2">
                        <History className="text-gray-400" size={20} />
                        <h2 className="text-lg font-bold text-white">Recent Stock Activity (Ledger)</h2>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-[#1A1A1A] px-3 py-1.5 rounded-lg border border-[#3D3D3D]">
                        <Clock size={14} /> Last Synced: {new Date(item.last_updated).toLocaleTimeString()}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {logs.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">
                            No recent transactions found for this inventory. Update the stock above to see the ledger in action!
                        </div>
                    ) : (
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-[#1A1A1A] text-gray-400 text-xs uppercase tracking-wider border-b border-[#3D3D3D]">
                                    <th className="px-6 py-4 font-medium">Date & Time</th>
                                    <th className="px-6 py-4 font-medium">Transaction Type</th>
                                    <th className="px-6 py-4 font-medium">Amount</th>
                                    <th className="px-6 py-4 font-medium">Source / Destination</th>
                                    <th className="px-6 py-4 font-medium">Authorized By</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#3D3D3D]">
                                {logs.map((log: any) => (
                                    <tr key={log.id} className="hover:bg-[#1A1A1A] transition-colors">
                                        <td className="px-6 py-4 text-gray-300">
                                            {new Date(log.date).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`flex items-center gap-1.5 text-xs font-bold ${log.action_type === 'Addition' ? 'text-green-500' : 'text-red-500'}`}>
                                                {log.action_type === 'Addition' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                                {log.action_type}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 font-bold text-lg ${log.action_type === 'Addition' ? 'text-green-500' : 'text-red-500'}`}>
                                            {log.action_type === 'Addition' ? '+' : '-'}{log.amount}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {log.source}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-xs">
                                            {log.user_name || 'System Admin'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InventoryDetails;