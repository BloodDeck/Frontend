
import StatCard from '../components/StatCard';
import StatusChip from '../components/StatusChip';
import DataTable from '../components/DataTable';
import { Search, Filter, AlertCircle, CheckCircle, FileText, Info } from 'lucide-react';

const mockApplications = [
    {
        id: '1',
        name: 'Lagos General Hospital',
        type: 'Public Institution',
        location: 'Ikeja, Lagos',
        license: 'N-BB-2023-883',
        date: 'Oct 24, 2023',
        risk: 98,
        status: 'Pending'
    },
    {
        id: '2',
        name: 'LifeCare Specialist Clinic',
        type: 'Private Clinic',
        location: 'Maitama, Abuja',
        license: 'N-BB-2023-912',
        date: 'Oct 23, 2023',
        risk: 65,
        status: 'In Review'
    },
    {
        id: '3',
        name: 'Red Cross Kano Branch',
        type: 'NGO',
        location: 'Nassarawa, Kano',
        license: 'N-RC-2023-005',
        date: 'Oct 22, 2023',
        risk: 92,
        status: 'Approved'
    },
    {
        id: '4',
        name: 'Port Harcourt Diagnostics',
        type: 'Private Lab',
        location: 'Port Harcourt, Rivers',
        license: 'N-BB-2023-441',
        date: 'Oct 21, 2023',
        risk: 45,
        status: 'Rejected'
    },
    {
        id: '5',
        name: 'Unity Blood Center',
        type: 'NGO',
        location: 'Surulere, Lagos',
        license: 'N-BB-2023-718',
        date: 'Oct 20, 2023',
        risk: 85,
        status: 'Pending'
    },
];

const BloodBankApplications = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <span>Home</span> &gt; <span>Applications</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white">Blood Bank Applications</h1>
                    <p className="text-gray-400 text-sm">Review and manage incoming registration requests from facilities across Nigeria.</p>
                </div>
                <button className="bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white px-4 py-2 rounded-lg text-sm font-medium border border-[#3D3D3D] flex items-center gap-2">
                    + Manual Entry
                </button>
            </div>

            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Pending Reviews"
                    value="14"
                    trend="+2%"
                    trendUp={true}
                    subtext="Requires immediate attention"
                    icon={<AlertCircle size={20} />}
                    iconColor="text-yellow-500"
                    alert={true}
                />
                <StatCard
                    label="Approved This Week"
                    value="32"
                    trend="+12%"
                    trendUp={true}
                    subtext="From 4 different states"
                    icon={<CheckCircle size={20} />}
                    iconColor="text-green-500"
                />
                <StatCard
                    label="Total Registered"
                    value="1,205"
                    trend="+5%"
                    trendUp={true}
                    subtext="Active across the platform"
                    icon={<FileText size={20} />}
                    iconColor="text-blue-500"
                />
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 bg-white/5 backdrop-blur-md p-2 rounded-xl border border-white/10">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search by name, license ID, or state..."
                        className="w-full bg-black/20 border border-white/5 rounded-lg md:rounded-l-lg pl-9 pr-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-gray-500 h-10 transition-colors placeholder:text-gray-600"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="bg-black/20 text-gray-300 text-sm border border-white/5 rounded-lg px-4 py-2 hover:border-white/10 focus:outline-none h-10">
                        <option>All Statuses</option>
                        <option>Pending</option>
                        <option>Approved</option>
                    </select>
                    <select className="bg-black/20 text-gray-300 text-sm border border-white/5 rounded-lg px-4 py-2 hover:border-white/10 focus:outline-none h-10">
                        <option>All States</option>
                        <option>Lagos</option>
                        <option>Abuja</option>
                    </select>
                    <button className="h-10 w-10 bg-black/20 border border-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                        <Filter size={16} />
                    </button>
                </div>
            </div>

            {/* Table */}
            <DataTable
                columns={[
                    {
                        header: 'Blood Bank Name',
                        accessor: (row: any) => (
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${row.type.includes('Public') ? 'bg-blue-900/50 text-blue-500' :
                                    row.type.includes('Private') ? 'bg-purple-900/50 text-purple-500' :
                                        'bg-green-900/50 text-green-500'
                                    }`}>
                                    {row.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-white">{row.name}</p>
                                    <p className="text-xs text-gray-500">{row.type}</p>
                                </div>
                            </div>
                        )
                    },
                    { header: 'Location', accessor: 'location' },
                    { header: 'License No.', accessor: 'license' },
                    { header: 'Date Applied', accessor: 'date' },
                    {
                        header: 'AI Risk Score',
                        accessor: (row: any) => (
                            <div className="w-24">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className={`font-bold ${row.risk > 80 ? 'text-green-500' : row.risk > 50 ? 'text-yellow-500' : 'text-red-500'}`}>{row.risk}%</span>
                                    <Info size={12} className="text-gray-600" />
                                </div>
                                <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${row.risk > 80 ? 'bg-green-500' : row.risk > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                        style={{ width: `${row.risk}%` }}
                                    ></div>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1">{row.risk > 80 ? 'Low Risk' : row.risk > 50 ? 'Medium Risk' : 'High Risk'}</p>
                            </div>
                        )
                    },
                    {
                        header: 'Status',
                        accessor: (row: any) => <StatusChip status={row.status as any} />
                    },
                ]}
                data={mockApplications}
                actions={(row) => (
                    <button className="text-blue-500 hover:text-blue-400 font-bold text-xs" onClick={() => console.log('Action', row.id)}>
                        {row.status === 'Pending' ? 'Review' : 'Details'}
                    </button>
                )}
            />
        </div>
    );
};

export default BloodBankApplications;
