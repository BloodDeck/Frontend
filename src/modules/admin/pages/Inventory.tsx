import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import { Filter, Search, Package, AlertTriangle, Sparkles } from 'lucide-react';
import { fetchData } from '../../../api/api';

const Inventory = () => {
    const navigate = useNavigate();
    const [inventory, setInventory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInventory = async () => {
            try {
                const data = await fetchData('admin/inventory/');
                const actualData = Array.isArray(data) ? data : (data?.results || []);
                setInventory(actualData);
            } catch (error) {
                console.error("Failed to fetch inventory:", error);
            } finally {
                setLoading(false);
            }
        };
        loadInventory();
    }, []);

    const getStockStatus = (units: number) => {
        if (units <= 10) return { label: 'Critical', color: 'text-red-500 bg-red-900/20' };
        if (units <= 50) return { label: 'Low Stock', color: 'text-yellow-500 bg-yellow-900/20' };
        return { label: 'Optimal', color: 'text-green-500 bg-green-900/20' };
    };

    const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0);
    const criticalBanks = inventory.filter(item => item.units <= 10).length;

    // --- SKELETON LOADER ---
    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="flex justify-between items-end">
                    <div className="space-y-3">
                        <div className="h-8 w-64 bg-[#2D2D2D] rounded-lg"></div>
                        <div className="h-4 w-48 bg-[#2D2D2D] rounded-lg"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>)}
                </div>
                <div className="h-[400px] bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-white">National Blood Inventory</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Units Available"
                    value={totalUnits.toString()}
                    icon={<Package size={20} />}
                    iconColor="text-blue-500"
                />
                <StatCard
                    label="Critical Alerts"
                    value={`${criticalBanks} Facilities`}
                    subtext="Stock <= 10 units"
                    icon={<AlertTriangle size={20} />}
                    iconColor="text-red-500"
                    alert={criticalBanks > 0}
                />
            </div>

            <DataTable
                columns={[
                    {
                        header: 'Facility Name',
                        accessor: (row: any) => (
                            <div>
                                <p className="font-medium text-white">{row.owner_name}</p>
                                <p className="text-[10px] text-gray-500 uppercase">Group: {row.blood_group}</p>
                            </div>
                        )
                    },
                    { 
                        header: 'Units Available', 
                        accessor: (row: any) => <span className="font-bold">{row.units}</span> 
                    },
                    { 
                        header: 'Last Updated', 
                        accessor: (row: any) => new Date(row.last_updated).toLocaleString() 
                    },
                    {
                        header: 'Status',
                        accessor: (row: any) => {
                            const status = getStockStatus(row.units);
                            return (
                                <span className={`text-xs font-bold px-2 py-1 rounded ${status.color}`}>
                                    {status.label}
                                </span>
                            );
                        }
                    },
                ]}
                data={inventory}
                actions={(row) => (
                    <button 
                        onClick={() => navigate(`/admin/inventory/${row.id}`)} 
                        className="text-blue-400 hover:text-blue-300 font-bold text-xs px-3 py-1 rounded border border-blue-900/50 hover:bg-blue-900/20 transition-colors"
                    >
                        View Details
                    </button>
                )}
            />
        </div>
    );
};

export default Inventory;