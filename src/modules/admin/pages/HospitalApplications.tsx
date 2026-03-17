import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import StatusChip from '../components/StatusChip';
import DataTable from '../components/DataTable';
import { Search, AlertCircle, CheckCircle, FileText, XCircle, Eye } from 'lucide-react';
import { fetchData } from '../../../api/api';

const HospitalApplications = () => {
    const navigate = useNavigate();
    const [hospitals, setHospitals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadApps = async () => {
            try {
                const data = await fetchData('applications/?category=hospital');
                setHospitals(data);
            } catch (error) {
                console.error("Failed to fetch applications:", error);
            } finally {
                setLoading(false);
            }
        };
        loadApps();
    }, []);

    const pendingCount = hospitals.filter(h => h.status === 'pending').length;
    const approvedCount = hospitals.filter(h => h.status === 'approved').length;
    const rejectedCount = hospitals.filter(h => h.status === 'rejected').length;

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
                    <h1 className="text-2xl font-bold text-white">Hospital Applications</h1>
                    <p className="text-gray-400 text-sm mb-1">Manage hospital facility registration requests.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Requests" value={hospitals.length.toString()} icon={<FileText size={20} />} />
                <StatCard label="Pending Approval" value={pendingCount.toString()} icon={<AlertCircle size={20} />} iconColor="text-yellow-500" alert={pendingCount > 0} />
                <StatCard label="Approved" value={approvedCount.toString()} icon={<CheckCircle size={20} />} iconColor="text-green-500" />
                <StatCard label="Rejected" value={rejectedCount.toString()} icon={<XCircle size={20} />} iconColor="text-red-500" />
            </div>

            <DataTable
                columns={[
                    {
                        header: 'HOSPITAL',
                        accessor: (row: any) => (
                            <div>
                                <p className="font-medium text-white text-sm">{row.applicant_name}</p>
                                <p className="text-[10px] text-gray-500">{row.user_email}</p>
                            </div>
                        )
                    },
                    { 
                        header: 'DATE APPLIED', 
                        accessor: (row: any) => new Date(row.created_at).toLocaleDateString() 
                    },
                    {
                        header: 'STATUS',
                        accessor: (row: any) => <StatusChip status={row.status.charAt(0).toUpperCase() + row.status.slice(1)} />
                    },
                    {
                        header: 'ACTIONS',
                        accessor: (row) => (
                            <button 
                                className="text-blue-400 hover:text-blue-300"
                                onClick={() => navigate(`/admin/applications/${row.id}`)}
                            >
                                <Eye size={16} />
                            </button>
                        )
                    }
                ]}
                data={hospitals}
                actions={() => null}
            />
        </div>
    );
};

export default HospitalApplications;