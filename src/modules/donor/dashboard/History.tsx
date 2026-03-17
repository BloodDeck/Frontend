import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Droplet, Clock } from 'lucide-react';
import { fetchData } from '../../../api/api';

interface DonationRecord {
    id: number;
    location_name: string;
    blood_group: string;
    units: number;
    donation_date: string;
    status: string;
}

const History = () => {
    const [history, setHistory] = useState<DonationRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const data = await fetchData('donor/history/');
                // Safely check if Django paginated the response
                const actualData = Array.isArray(data) ? data : (data?.results || []);
                setHistory(actualData);
            } catch (error) {
                console.error("Failed to load history:", error);
            } finally {
                setLoading(false);
            }
        };
        loadHistory();
    }, []);

    // Helper to colorize the status
    const getStatusStyle = (status: string) => {
        const s = status.toLowerCase();
        if (s === 'completed') return 'bg-green-100 text-green-700 border-green-200';
        if (s === 'scheduled') return 'bg-blue-100 text-blue-700 border-blue-200';
        if (s === 'cancelled' || s === 'rejected') return 'bg-red-100 text-red-700 border-red-200';
        return 'bg-gray-100 text-gray-700 border-gray-200';
    };

    if (loading) return <div className="p-8 text-center text-red-500 font-medium">Loading your donation history...</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                    <Clock size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Donation History</h1>
                    <p className="text-gray-500 text-sm">Track your past donations and upcoming appointments.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {history.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <Droplet size={48} className="mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium text-gray-900 mb-1">No donations yet</p>
                        <p className="text-sm">When you schedule or complete a donation, it will appear here.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Blood Group</th>
                                    <th className="px-6 py-4">Units</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {history.map((record) => (
                                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 flex items-center gap-2 text-gray-900">
                                            <Calendar size={16} className="text-gray-400" />
                                            {new Date(record.donation_date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-900">
                                                <MapPin size={16} className="text-gray-400" />
                                                {record.location_name || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                                                {record.blood_group}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 font-medium">
                                            {record.units}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${getStatusStyle(record.status)}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;