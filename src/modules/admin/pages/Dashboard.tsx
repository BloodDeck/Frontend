import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import StatusChip from '../components/StatusChip';
import { Users, Building2, AlertCircle, FileText, Activity, PlusCircle, ArrowRight, Droplet, CheckCircle } from 'lucide-react';
import { fetchData } from '../../../api/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total_users: 0,
        total_donors: 0,
        total_hospitals: 0,
        total_blood_banks: 0,
        pending_applications: 0,
    });
    const [recentApps, setRecentApps] = useState<any[]>([]);
    const [criticalStock, setCriticalStock] = useState<any[]>([]); // New state for dynamic alerts
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                // Fetch all required data concurrently for better performance
                const [statsData, appsData, inventoryData] = await Promise.all([
                    fetchData('admin/dashboard/'),
                    fetchData('applications/'),
                    fetchData('admin/inventory/')
                ]);

                setStats(statsData);

                // Safely handle paginated or flat arrays for applications
                const actualApps = Array.isArray(appsData) ? appsData : (appsData?.results || []);
                setRecentApps(actualApps.slice(0, 5)); // Grab the 5 most recent

                // Safely handle inventory data and filter for critical stock (<= 10 units)
                const actualInventory = Array.isArray(inventoryData) ? inventoryData : (inventoryData?.results || []);
                const critical = actualInventory.filter((item: any) => item.units <= 10);
                setCriticalStock(critical);

            } catch (error) {
                console.error("Failed to load dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-3">
                        <div className="h-8 w-48 bg-[#2D2D2D] rounded-lg"></div>
                        <div className="h-4 w-64 bg-[#2D2D2D] rounded-lg"></div>
                    </div>
                    <div className="flex gap-3">
                        <div className="h-10 w-36 bg-[#2D2D2D] rounded-lg"></div>
                        <div className="h-10 w-40 bg-[#2D2D2D] rounded-lg"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <div className="lg:col-span-2 h-96 bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>
                    <div className="h-96 bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>
                </div>
            </div>
        );
    }
    return (
        <div className="space-y-6">
            {/* --- HEADER & QUICK ACTIONS --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Platform Overview</h1>
                    <p className="text-sm text-gray-400">Welcome back. Here is what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => navigate('/admin/users')}
                        className="flex items-center gap-2 bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white px-4 py-2 rounded-lg border border-[#3D3D3D] transition-colors text-sm font-medium"
                    >
                        <PlusCircle size={16} /> Manage Users
                    </button>
                    <button 
                        onClick={() => navigate('/admin/inventory')}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-lg shadow-blue-900/20"
                    >
                        <Droplet size={16} /> Global Inventory
                    </button>
                </div>
            </div>

            {/* --- KPI SECTION --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Donors"
                    value={stats.total_donors.toString()}
                    icon={<Users size={20} />}
                />
                <StatCard
                    label="Active Facilities"
                    value={(stats.total_hospitals + stats.total_blood_banks).toString()}
                    subtext={`${stats.total_hospitals} Hospitals, ${stats.total_blood_banks} Blood Banks`}
                    icon={<Building2 size={20} />}
                    iconColor="text-blue-500"
                />
                <StatCard
                    label="Pending Applications"
                    value={stats.pending_applications.toString()}
                    subtext="Action Required"
                    icon={<AlertCircle size={20} />}
                    iconColor="text-red-500"
                    alert={stats.pending_applications > 0}
                />
                <StatCard
                    label="Total Registered Users"
                    value={stats.total_users.toString()}
                    icon={<FileText size={20} />}
                    iconColor="text-purple-500"
                />
            </div>

            {/* --- TWO COLUMN LAYOUT FOR TABLES --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                
                {/* Recent Applications Table (Spans 2 columns) */}
                <div className="bg-[#2D2D2D] rounded-xl border border-[#3D3D3D] overflow-hidden shadow-lg lg:col-span-2 flex flex-col">
                    <div className="p-5 border-b border-[#3D3D3D] flex justify-between items-center bg-[#2A2A2A]">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <FileText size={18} className="text-gray-400"/> Recent Applications
                        </h3>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-[#1A1A1A] text-gray-400 text-xs uppercase tracking-wider border-b border-[#3D3D3D]">
                                    <th className="px-6 py-4 font-medium">Date</th>
                                    <th className="px-6 py-4 font-medium">Facility Name</th>
                                    <th className="px-6 py-4 font-medium">Category</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#3D3D3D]">
                                {recentApps.length > 0 ? recentApps.map((app, i) => (
                                    <tr key={i} className="hover:bg-[#1A1A1A] transition-colors">
                                        <td className="px-6 py-4 text-gray-400">{new Date(app.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 font-medium text-gray-200">{app.applicant_name}</td>
                                        <td className="px-6 py-4 text-gray-300 capitalize">{app.category}</td>
                                        <td className="px-6 py-4">
                                            <StatusChip status={app.status.charAt(0).toUpperCase() + app.status.slice(1)} />
                                        </td>
                                        <td 
                                            className="px-6 py-4 text-right cursor-pointer text-xs font-bold text-blue-400 hover:text-blue-300"
                                            onClick={() => navigate(`/admin/applications/${app.id}`)}
                                        >
                                            Review
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No recent applications found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* REAL System Alerts / Critical Inventory (Spans 1 column) */}
                <div className="bg-[#2D2D2D] rounded-xl border border-[#3D3D3D] overflow-hidden shadow-lg flex flex-col">
                    <div className="p-5 border-b border-[#3D3D3D] flex justify-between items-center bg-[#2A2A2A]">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <Activity size={18} className="text-red-500"/> System Alerts
                        </h3>
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {criticalStock.length + (stats.pending_applications > 0 ? 1 : 0)}
                        </span>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col gap-4 overflow-y-auto max-h-[400px]">
                        
                        {/* Dynamic Pending Application Alert */}
                        {stats.pending_applications > 0 && (
                            <div className="bg-yellow-900/20 border border-yellow-900/50 p-4 rounded-lg flex items-start gap-3">
                                <FileText size={18} className="text-yellow-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-bold text-yellow-400">Pending Reviews</h4>
                                    <p className="text-xs text-gray-400 mt-1">You have {stats.pending_applications} facility applications waiting for approval.</p>
                                    <button onClick={() => navigate('/admin/applications')} className="text-xs font-bold text-yellow-400 mt-2 flex items-center gap-1 hover:text-yellow-300">
                                        View Applications <ArrowRight size={12} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Dynamic Critical Inventory Alerts from Backend */}
                        {criticalStock.map((item, index) => (
                            <div key={index} className="bg-red-900/20 border border-red-900/50 p-4 rounded-lg flex items-start gap-3">
                                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-bold text-red-400">Critical Stock: {item.blood_group}</h4>
                                    <p className="text-xs text-gray-400 mt-1">
                                        <span className="font-bold text-gray-300">{item.owner_name}</span> is down to {item.units} unit{item.units !== 1 ? 's' : ''} of {item.blood_group} blood.
                                    </p>
                                    <button 
                                        onClick={() => navigate(`/admin/inventory/${item.id}`)} 
                                        className="text-xs font-bold text-red-400 mt-2 flex items-center gap-1 hover:text-red-300"
                                    >
                                        View Details <ArrowRight size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Empty State (If everything is perfect) */}
                        {criticalStock.length === 0 && stats.pending_applications === 0 && (
                            <div className="flex flex-col items-center justify-center text-center p-8 text-gray-500 opacity-70">
                                <CheckCircle size={40} className="mb-3 text-green-500/50" />
                                <p className="text-sm font-medium">All systems optimal.</p>
                                <p className="text-xs mt-1">No critical alerts or pending tasks.</p>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;