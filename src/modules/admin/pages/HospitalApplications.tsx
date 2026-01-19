
import StatCard from '../components/StatCard';
import StatusChip from '../components/StatusChip';
import DataTable from '../components/DataTable';
import { Search, AlertCircle, CheckCircle, FileText, XCircle, Eye, Check, X } from 'lucide-react';

const mockHospitals = [
    {
        id: '1',
        name: 'Lagos Island Gen. Hospital',
        type: 'Public Institution',
        location: 'Lagos, LA',
        license: 'LIC-99283',
        date: 'Oct 24, 2023',
        contact: 'Dr. A. Okafor',
        status: 'Pending'
    },
    {
        id: '2',
        name: 'Abuja Clinics',
        type: 'Private Clinic',
        location: 'Abuja, FCT',
        license: 'FCT-11029',
        date: 'Oct 23, 2023',
        contact: 'Nurse B. Yusuf',
        status: 'Under Review' // Mapping 'Under Review' to appropriate status color
    },
    {
        id: '3',
        name: 'Reddington Hospital',
        type: 'Private Hospital',
        location: 'Lagos, LA',
        license: 'LIC-55412',
        date: 'Oct 22, 2023',
        contact: 'Mr. T. Balogun',
        status: 'Rejected'
    },
    {
        id: '4',
        name: 'Maitama District Hosp.',
        type: 'Public Institution',
        location: 'Abuja, FCT',
        license: 'FCT-44212',
        date: 'Oct 20, 2023',
        contact: 'Dr. S. Ahmed',
        status: 'Approved'
    },
];

const HospitalApplications = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-gray-400 text-sm mb-1">Manage and review incoming hospital verification requests.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white px-4 py-2 rounded-lg text-sm font-medium border border-[#3D3D3D] flex items-center gap-2">
                        Export Report
                    </button>
                    <button className="bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white px-4 py-2 rounded-lg text-sm font-medium border border-[#3D3D3D] flex items-center gap-2">
                        + Add Manually
                    </button>
                </div>
            </div>

            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    label="New Requests"
                    value="12"
                    trend="+20%"
                    trendUp={true}
                    icon={<FileText size={20} />}
                    iconColor="text-blue-500"
                />
                <StatCard
                    label="Pending Review"
                    value="45"
                    trend="+5%"
                    trendUp={true}
                    icon={<AlertCircle size={20} />}
                    iconColor="text-yellow-500"
                />
                <StatCard
                    label="Approved"
                    value="312"
                    trend="+12%"
                    trendUp={true}
                    icon={<CheckCircle size={20} />}
                    iconColor="text-green-500"
                />
                <StatCard
                    label="Rejected"
                    value="24"
                    trend="0%"
                    trendUp={false} // Neutral
                    icon={<XCircle size={20} />}
                    iconColor="text-red-500"
                />
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 backdrop-blur-md p-2 rounded-xl border border-white/10">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search by Hospital or License ID..."
                        className="w-full bg-black/20 border border-white/5 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-gray-500 h-10 placeholder:text-gray-600"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="bg-black/20 text-gray-300 text-sm border border-white/5 rounded-lg px-4 py-2 focus:outline-none h-10">
                        <option>All Status</option>
                    </select>
                    <select className="bg-black/20 text-gray-300 text-sm border border-white/5 rounded-lg px-4 py-2 focus:outline-none h-10">
                        <option>All Location</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <DataTable
                columns={[
                    {
                        header: 'HOSPITAL',
                        accessor: (row: any) => (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                                    {row.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-white text-sm">{row.name}</p>
                                    <p className="text-[10px] text-gray-500">{row.type}</p>
                                </div>
                            </div>
                        )
                    },
                    { header: 'LOCATION', accessor: 'location' },
                    { header: 'LICENSE ID', accessor: 'license' },
                    { header: 'DATE APPLIED', accessor: 'date' },
                    { header: 'CONTACT', accessor: 'contact' },
                    {
                        header: 'STATUS',
                        accessor: (row: any) => <StatusChip status={row.status} />
                    },
                    {
                        header: 'ACTIONS',
                        accessor: (_) => (
                            <div className="flex gap-3 text-gray-400">
                                <button className="hover:text-blue-400"><Eye size={16} /></button>
                                <button className="hover:text-green-400"><Check size={16} /></button>
                                <button className="hover:text-red-400"><X size={16} /></button>
                            </div>
                        )
                    }
                ]}
                data={mockHospitals}
                actions={() => null} // Custom actions handled in column
            />
        </div>
    );
};

export default HospitalApplications;
