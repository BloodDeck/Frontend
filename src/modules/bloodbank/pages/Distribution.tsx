import React, { useState, useEffect } from 'react';
import { Truck, CheckCircle, XCircle, Activity } from 'lucide-react';
import { fetchData, updateData } from '../../../api/api';
import { toast } from 'react-toastify';

const Distribution = () => {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<number | null>(null);

    const loadRequests = async () => {
        try {
            const data = await fetchData('applications/'); 
            const actualData = Array.isArray(data) ? data : (data?.results || []);
            setRequests(actualData);
        } catch (error) {
            console.error("Failed to load requests", error);
            toast.error("Failed to load incoming hospital requests.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRequests();
    }, []);

    const handleUpdateStatus = async (id: number, newStatus: 'approved' | 'rejected') => {
        setProcessingId(id);
        try {
            await updateData(`applications/${id}/`, { status: newStatus });
            toast.success(`Request ${newStatus} successfully!`);
            loadRequests(); 
        } catch (error: any) {
            toast.error(error.message || `Failed to ${newStatus} request.`);
        } finally {
            setProcessingId(null);
        }
    };

    // --- DARK THEME SKELETON LOADER ---
    if (loading) {
        return (
            <div className="space-y-6 font-['Montserrat'] animate-pulse">
                <div className="space-y-2 mb-6">
                    <div className="h-8 w-64 bg-[#2D2D2D] rounded-lg"></div>
                    <div className="h-4 w-48 bg-[#2D2D2D] rounded-lg"></div>
                </div>
                <div className="h-[500px] bg-[#2D2D2D] rounded-xl border border-[#3D3D3D] shadow-lg"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 font-['Montserrat']">
            <div>
                <h1 className="text-2xl font-bold text-white">Distribution & Requests</h1>
                <p className="text-gray-400 text-sm mt-1">Review and fulfill incoming blood requests from partner hospitals.</p>
            </div>

            <div className="bg-[#2D2D2D] rounded-xl shadow-lg border border-[#3D3D3D] overflow-hidden flex flex-col">
                <div className="p-5 border-b border-[#3D3D3D] flex justify-between items-center bg-[#2A2A2A]">
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                        <Truck size={18} className="text-blue-500" /> Dispatch Queue
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#1A1A1A] text-gray-400 font-bold uppercase tracking-wider border-b border-[#3D3D3D]">
                            <tr>
                                <th className="px-6 py-4">Date Requested</th>
                                <th className="px-6 py-4">Requesting Hospital</th>
                                <th className="px-6 py-4">Request Details</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#3D3D3D] bg-[#2D2D2D]">
                            {requests.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center">
                                        <Activity size={32} className="mx-auto text-gray-600 mb-3" />
                                        <p className="text-gray-500 font-medium">No incoming requests found.</p>
                                    </td>
                                </tr>
                            ) : (
                                requests.map((req) => (
                                    <tr key={req.id} className="hover:bg-[#1A1A1A] transition-colors">
                                        <td className="px-6 py-4 text-gray-400 font-medium">
                                            {new Date(req.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-white">{req.applicant_name}</p>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Category: {req.category}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-red-400 bg-red-900/20 border border-red-900/50 inline-block px-2 py-0.5 rounded">{req.details || "Standard Request"}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${
                                                req.status === 'approved' ? 'bg-green-900/20 text-green-500 border-green-900/50' :
                                                req.status === 'rejected' ? 'bg-red-900/20 text-red-500 border-red-900/50' :
                                                'bg-yellow-900/20 text-yellow-500 border-yellow-900/50'
                                            }`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {req.status === 'pending' ? (
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        onClick={() => handleUpdateStatus(req.id, 'approved')}
                                                        disabled={processingId === req.id}
                                                        className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded shadow-sm transition-all disabled:opacity-50 flex items-center gap-1"
                                                    >
                                                        <CheckCircle size={14} /> Approve
                                                    </button>
                                                    <button 
                                                        onClick={() => handleUpdateStatus(req.id, 'rejected')}
                                                        disabled={processingId === req.id}
                                                        className="px-3 py-1.5 border border-red-500 text-red-500 hover:bg-red-900/20 text-xs font-bold rounded transition-all disabled:opacity-50 flex items-center gap-1"
                                                    >
                                                        <XCircle size={14} /> Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-500 italic">Resolved</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Distribution;