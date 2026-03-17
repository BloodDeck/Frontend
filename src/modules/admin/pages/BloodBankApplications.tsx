import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import StatusChip from '../components/StatusChip';
import DataTable from '../components/DataTable';
import { Search, Filter, AlertCircle, CheckCircle, FileText, Info } from 'lucide-react';
import { fetchData } from '../../../api/api';

const BloodBankApplications = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadApps = async () => {
            try {
                const data = await fetchData('applications/?category=bloodbank');
                setApplications(data);
            } catch (error) {
                console.error("Failed to fetch applications:", error);
            } finally {
                setLoading(false);
            }
        };
        loadApps();
    }, []);

    const pendingCount = applications.filter(a => a.status === 'pending').length;
    const approvedCount = applications.filter(a => a.status === 'approved').length;

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
                    <h1 className="text-2xl font-bold text-white">Blood Bank Applications</h1>
                    <p className="text-gray-400 text-sm">Review incoming blood bank registrations.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Requests" value={applications.length.toString()} icon={<FileText size={20} />} />
                <StatCard label="Pending Approval" value={pendingCount.toString()} icon={<AlertCircle size={20} />} iconColor="text-yellow-500" alert={pendingCount > 0} />
                <StatCard label="Approved" value={approvedCount.toString()} icon={<CheckCircle size={20} />} iconColor="text-green-500" />
                <StatCard label="Rejected" value={(applications.length - pendingCount - approvedCount).toString()} icon={<Info size={20} />} iconColor="text-blue-500" />
            </div>

            <DataTable
                columns={[
                    {
                        header: 'Facility Name',
                        accessor: (row: any) => (
                            <div>
                                <p className="font-medium text-white">{row.applicant_name}</p>
                                <p className="text-xs text-gray-500">{row.user_email}</p>
                            </div>
                        )
                    },
                    { 
                        header: 'Date Applied', 
                        accessor: (row: any) => new Date(row.created_at).toLocaleDateString() 
                    },
                    {
                        header: 'Status',
                        accessor: (row: any) => <StatusChip status={row.status.charAt(0).toUpperCase() + row.status.slice(1)} />
                    },
                ]}
                data={applications}
                actions={(row) => (
                    <button 
                        className="text-blue-500 hover:text-blue-400 font-bold text-xs" 
                        onClick={() => navigate(`/admin/applications/${row.id}`)}
                    >
                        Review Details
                    </button>
                )}
            />
        </div>
    );
};

export default BloodBankApplications;