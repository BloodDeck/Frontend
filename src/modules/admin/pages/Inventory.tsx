import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import { Filter, Search, Package, AlertTriangle, MapPin, TrendingUp, Sparkles } from 'lucide-react';

const mockInventory = [
    {
        id: '1',
        name: 'Lagos Univ. Teaching Hospital',
        id_code: 'ID: LUTH-001',
        location: 'Lagos, Idi-Araba',
        health: { level: 30, color: 'bg-orange-500' },
        status: 'Low Stock'
    },
    {
        id: '2',
        name: 'National Hospital Abuja',
        id_code: 'ID: NHA-204',
        location: 'Abuja, FCT',
        health: { level: 85, color: 'bg-green-500' },
        status: 'Optimal'
    },
    {
        id: '3',
        name: 'Murtala Muhammed Specialist',
        id_code: 'ID: MMSH-089',
        location: 'Kano, Kano State',
        health: { level: 15, color: 'bg-red-500' },
        status: 'Critical'
    },
    {
        id: '4',
        name: 'University College Hospital',
        id_code: 'ID: UCH-112',
        location: 'Ibadan, Oyo State',
        health: { level: 45, color: 'bg-yellow-500' },
        status: 'Low Stock'
    },
    {
        id: '5',
        name: 'Rivers State University',
        id_code: 'ID: RSUTH-022',
        location: 'Port Harcourt',
        health: { level: 90, color: 'bg-green-500' },
        status: 'Optimal'
    },
];

const Inventory = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <span>Home</span> &gt; <span>Inventory</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white">National Blood Inventory</h1>
                </div>
                <div className="flex gap-3">
                    <button className="bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white px-4 py-2 rounded-lg text-sm font-medium border border-[#3D3D3D]">
                        Export Report
                    </button>
                    <button className="bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white px-4 py-2 rounded-lg text-sm font-medium border border-[#3D3D3D]">
                        + Request Transfer
                    </button>
                </div>
            </div>

            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Units Available"
                    value="12,450"
                    trend="+5%"
                    trendUp={true}
                    subtext="Updated 15 mins ago"
                    icon={<Package size={20} />}
                    iconColor="text-blue-500"
                />
                <StatCard
                    label="Critical Alerts"
                    value="3 Regions"
                    trend="-12%"
                    trendUp={false}
                    subtext="Requires immediate attention"
                    icon={<AlertTriangle size={20} />}
                    iconColor="text-red-500"
                    alert={true}
                />
                <StatCard
                    label="Top Requesting Region"
                    value="Lagos"
                    subtext="Driven by O+ demand"
                    icon={<MapPin size={20} />}
                    iconColor="text-yellow-500"
                />
                <StatCard
                    label="Daily Outflow"
                    value="450 Units"
                    trend="-2%"
                    trendUp={false}
                    subtext="Vs. previous 30 days"
                    icon={<TrendingUp size={20} />}
                    iconColor="text-purple-500"
                />
            </div>

            {/* AI Recommendation */}
            <div className="bg-[linear-gradient(111.97deg,#E5E7EB_-78.91%,rgba(42,42,42,0.4)_86.62%)] backdrop-blur-lg p-6 rounded-xl border border-white/10 flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                <div className="flex-1 relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                            <Sparkles size={18} />
                        </div>
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">AI RECOMMENDATION</span>
                    </div>
                    <p className="text-gray-300 text-lg">
                        Surge predicted in <span className="text-white font-bold">Kano North</span>. Recommend moving <span className="text-white font-bold">50 units of O+</span> from Abuja Central Bank immediately.
                    </p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 bg-white/5 backdrop-blur-md p-2 rounded-xl border border-white/10">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search banks, cities..."
                        className="w-full bg-black/20 border border-white/5 rounded-lg md:rounded-l-lg pl-9 pr-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-gray-500 h-10 transition-colors placeholder:text-gray-600"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="bg-black/20 text-gray-300 text-sm border border-white/5 rounded-lg px-4 py-2 hover:border-white/10 focus:outline-none h-10">
                        <option>All Blood Groups</option>
                        <option>O+</option>
                        <option>A+</option>
                    </select>
                    <select className="bg-black/20 text-gray-300 text-sm border border-white/5 rounded-lg px-4 py-2 hover:border-white/10 focus:outline-none h-10">
                        <option>All Regions</option>
                        <option>Lagos</option>
                        <option>Kano</option>
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
                        header: 'Bank Name',
                        accessor: (row: any) => (
                            <div>
                                <p className="font-medium text-white">{row.name}</p>
                                <p className="text-xs text-gray-500">{row.id_code}</p>
                            </div>
                        )
                    },
                    { header: 'Location', accessor: 'location' },
                    {
                        header: 'Inventory Health',
                        accessor: (row: any) => (
                            <div className="flex items-end gap-1 h-8">
                                {[1, 2, 3, 4, 5].map((bar) => (
                                    <div
                                        key={bar}
                                        className={`w-2 rounded-t ${(row.health.level / 20) >= bar
                                            ? row.health.color
                                            : 'bg-gray-700'
                                            }`}
                                        style={{ height: `${20 + (Math.random() * 80)}%` }}
                                    ></div>
                                ))}
                            </div>
                        )
                    },
                    {
                        header: 'Status',
                        accessor: (row: any) => (
                            <span className={`text-xs font-bold ${row.status === 'Critical' ? 'text-red-500 bg-red-900/20 px-2 py-1 rounded' :
                                row.status === 'Low Stock' ? 'text-yellow-500 bg-yellow-900/20 px-2 py-1 rounded' :
                                    'text-green-500 bg-green-900/20 px-2 py-1 rounded'
                                }`}>
                                {row.status}
                            </span>
                        )
                    },
                ]}
                data={mockInventory}
                actions={(_) => (
                    <button className="text-blue-400 hover:text-blue-300 font-bold text-xs">
                        Manage
                    </button>
                )}
            />
        </div>
    );
};

export default Inventory;
