import React, { useState, useEffect } from 'react';
import { Activity, Droplet, Calendar, Award } from 'lucide-react';
import { fetchData } from '../../../api/api';

const DonorDashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                // Fetching from your DashboardStatsView
                const data = await fetchData('donor/dashboard/');
                setStats(data);
            } catch (error) {
                console.error("Failed to load donor stats:", error);
            } finally {
                setLoading(false);
            }
        };
        loadDashboard();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-red-500 font-medium">Loading your dashboard...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Welcome Banner */}
            <div className="bg-red-600 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Welcome back, Lifesaver!</h1>
                    <p className="text-red-100">
                        {stats?.user || 'Donor'} • Account Status: <span className="font-bold capitalize">{stats?.status || 'Active'}</span>
                    </p>
                </div>
                <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm border border-white/30 text-center min-w-[150px]">
                    <Droplet className="mx-auto mb-2 text-red-100" size={32} />
                    <p className="text-sm font-medium text-red-100">Blood Type</p>
                    <p className="text-2xl font-bold">O+</p> {/* You can make this dynamic later! */}
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm flex items-start gap-4">
                    <div className="p-3 bg-red-50 text-red-500 rounded-lg">
                        <Droplet size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Donations</p>
                        <p className="text-2xl font-bold text-gray-900">3</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm flex items-start gap-4">
                    <div className="p-3 bg-blue-50 text-blue-500 rounded-lg">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Last Donation</p>
                        <p className="text-xl font-bold text-gray-900">Oct 12, 2023</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm flex items-start gap-4">
                    <div className="p-3 bg-yellow-50 text-yellow-500 rounded-lg">
                        <Award size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Lives Impacted</p>
                        <p className="text-2xl font-bold text-gray-900">Up to 9</p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Activity className="text-red-500" size={20} /> Ready to donate again?
                    </h2>
                </div>
                <div className="p-6">
                    <p className="text-gray-600 mb-4">
                        You are currently eligible to donate blood. Your contribution can help save lives in your community.
                    </p>
                    <button className="bg-red-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-red-700 transition-colors shadow-md shadow-red-500/30">
                        Schedule a Donation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DonorDashboard;