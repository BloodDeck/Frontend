import React, { useState, useEffect } from 'react';
import { Droplet, Plus, Search, Save, X } from 'lucide-react';
import { fetchData, postData } from '../../../api/api';
import { toast } from 'react-toastify';

const Stock = () => {
    const [inventory, setInventory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [bloodGroup, setBloodGroup] = useState('O+');
    const [units, setUnits] = useState(1);
    const [saving, setSaving] = useState(false);

    const loadStock = async () => {
        try {
            const data = await fetchData('bloodbank/stock/');
            const actualData = Array.isArray(data) ? data : (data?.results || []);
            setInventory(actualData);
        } catch (error) {
            console.error("Failed to fetch stock:", error);
            toast.error("Failed to load inventory.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStock();
    }, []);

    const handleSaveStock = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await postData('bloodbank/stock/', { blood_group: bloodGroup, units: units });
            toast.success(`${bloodGroup} inventory updated successfully!`);
            setShowModal(false);
            setBloodGroup('O+');
            setUnits(1);
            loadStock();
        } catch (error: any) {
            toast.error(error.message || "Failed to update stock.");
        } finally {
            setSaving(false);
        }
    };

    const filteredInventory = inventory.filter(item => item.blood_group.toLowerCase().includes(searchTerm.toLowerCase()));

    if (loading) {
        return (
            <div className="space-y-6 font-['Montserrat'] animate-pulse">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
                    <div className="space-y-2">
                        <div className="h-8 w-64 bg-[#2D2D2D] rounded-lg"></div>
                        <div className="h-4 w-48 bg-[#2D2D2D] rounded-lg"></div>
                    </div>
                    <div className="h-10 w-40 bg-[#2D2D2D] rounded-lg"></div>
                </div>
                <div className="bg-[#2D2D2D] p-3 rounded-xl border border-[#3D3D3D] shadow-lg flex items-center gap-4">
                    <div className="h-10 w-full bg-[#1A1A1A] rounded-lg"></div>
                </div>
                <div className="h-[400px] bg-[#2D2D2D] rounded-xl border border-[#3D3D3D] shadow-lg"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 font-['Montserrat']">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Stock Management</h1>
                    <p className="text-sm text-gray-400 mt-1">Manage and update your blood bank's local inventory.</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-red-900/20 transition-colors flex items-center gap-2"
                >
                    <Plus size={18} /> Update Stock Level
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-[#2D2D2D] p-3 rounded-xl border border-[#3D3D3D] shadow-lg flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search by blood group..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm text-white bg-[#1A1A1A] border border-[#3D3D3D] rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                    />
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-[#2D2D2D] rounded-xl shadow-lg border border-[#3D3D3D] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#1A1A1A] text-gray-400 font-bold uppercase tracking-wider border-b border-[#3D3D3D]">
                            <tr>
                                <th className="px-6 py-4">Blood Group</th>
                                <th className="px-6 py-4">Total Units (Pints)</th>
                                <th className="px-6 py-4">Last Updated</th>
                                <th className="px-6 py-4 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#3D3D3D]">
                            {filteredInventory.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">No stock found matching your search.</td>
                                </tr>
                            ) : (
                                filteredInventory.map(item => (
                                    <tr key={item.id} className="hover:bg-[#1A1A1A] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-red-900/20 text-red-500 font-bold flex items-center justify-center border border-red-900/50 shadow-sm">
                                                    {item.blood_group}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-white text-lg">{item.units}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">
                                            {new Date(item.last_updated).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {item.units <= 10 ? (
                                                <span className="px-3 py-1 rounded bg-red-900/20 border border-red-900/50 text-red-500 text-[10px] font-bold uppercase tracking-wider">Critical</span>
                                            ) : item.units <= 50 ? (
                                                <span className="px-3 py-1 rounded bg-yellow-900/20 border border-yellow-900/50 text-yellow-500 text-[10px] font-bold uppercase tracking-wider">Low Stock</span>
                                            ) : (
                                                <span className="px-3 py-1 rounded bg-green-900/20 border border-green-900/50 text-green-500 text-[10px] font-bold uppercase tracking-wider">Optimal</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Update Stock Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#2D2D2D] rounded-2xl border border-[#3D3D3D] w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-[#3D3D3D] flex justify-between items-center bg-[#2A2A2A] rounded-t-2xl">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <Droplet className="text-red-500" size={18} /> Add/Update Stock
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSaveStock} className="p-6 space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Blood Group</label>
                                <select required value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="w-full bg-[#1A1A1A] border border-[#3D3D3D] rounded-lg px-3 py-3 text-sm text-white focus:outline-none focus:border-red-500 appearance-none font-bold">
                                    {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                                        <option key={bg} value={bg}>{bg}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Set New Total Unit Count</label>
                                <input required type="number" min="0" value={units} onChange={(e) => setUnits(Number(e.target.value))} className="w-full border border-[#3D3D3D] bg-[#1A1A1A] rounded-lg px-4 py-4 text-2xl font-bold text-center text-white focus:outline-none focus:border-red-500 transition-colors" />
                                <p className="text-[10px] text-gray-500 mt-2 text-center">Enter the total number of physical units currently stored.</p>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 text-sm font-bold text-gray-400 hover:text-white hover:bg-[#3D3D3D] rounded-lg transition-colors border border-[#3D3D3D]">
                                    Cancel
                                </button>
                                <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 shadow-md">
                                    <Save size={16} /> {saving ? 'Saving...' : 'Save Stock'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stock;