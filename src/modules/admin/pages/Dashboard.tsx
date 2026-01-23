
import StatCard from '../components/StatCard';
import StatusChip from '../components/StatusChip';
import { Users, Building2, AlertCircle, FileText, ChevronRight, MapPin, Sparkles } from 'lucide-react';

const Dashboard = () => {
    const recentAlerts = [
        { time: 'Today, 10:42 AM', entity: 'Lagos University Teaching Hospital', event: 'Urgent O- Request (5 Units)', status: 'Critical' as const, action: 'Review', actionColor: 'text-blue-400 hover:text-blue-300' },
        { time: 'Today, 09:15 AM', entity: 'LifeBlood Bank, Kano', event: 'Inventory Update (+120 Units)', status: 'Completed' as const, action: 'Details', actionColor: 'text-gray-500 hover:text-white' },
        { time: 'Yesterday, 04:30 PM', entity: 'New Horizon Clinic', event: 'New Blood Bank Application', status: 'In Review' as const, action: 'Verify', actionColor: 'text-blue-400 hover:text-blue-300' },
        { time: 'Yesterday, 02:15 PM', entity: 'System AI', event: 'Weekly Supply Forecast Generated', status: 'Automated', action: 'View', actionColor: 'text-gray-500 hover:text-white' },
    ];

    return (
        <div className="space-y-6">
            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Donors"
                    value="14,203"
                    trend="+5% this week"
                    trendUp={true}
                    icon={<Users size={20} />}
                />
                <StatCard
                    label="Active Blood Banks"
                    value="45"
                    subtext="Across 12 states"
                    icon={<Building2 size={20} />}
                    iconColor="text-blue-500"
                />
                <StatCard
                    label="Pending Requests"
                    value="12"
                    subtext="Action Required Immediately"
                    icon={<AlertCircle size={20} />}
                    iconColor="text-red-500"
                    alert={true}
                />
                <StatCard
                    label="National Inventory"
                    value="8,540"
                    subtext="Units available"
                    icon={<FileText size={20} />}
                    iconColor="text-purple-500"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Map Section (Placeholder) */}
                <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 flex flex-col min-h-[400px] shadow-lg">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center">
                        <h3 className="font-semibold text-white">Geospatial Inventory Distribution</h3>
                        <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                            View Full Map <ChevronRight size={14} />
                        </button>
                    </div>
                    {/* Map Placeholder */}
                    <div className="flex-1 bg-black/20 m-4 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Nigeria_location_map.svg/1707px-Nigeria_location_map.svg.png"
                            alt="Map Placeholder"
                            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                        />
                        <div className="absolute z-10 flex flex-col items-center">
                            <MapPin className="text-red-500 mb-2 drop-shadow-lg" size={32} />
                            <span className="bg-black/80 backdrop-blur px-3 py-1 rounded text-xs border border-white/10">Yashi Mission</span>
                        </div>
                        {/* Floating Filter */}
                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur border border-white/10 p-3 rounded-lg shadow-xl text-xs w-48">
                            <p className="font-bold mb-2">FILTER VIEW</p>
                            <div className="bg-white/5 p-2 rounded text-gray-400 flex justify-between border border-white/5">
                                All Blood Types <ChevronDown size={14} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: AI Prediction & Actions */}
                <div className="space-y-6">
                    {/* AI Prediction */}
                    <div className="bg-[linear-gradient(111.97deg,#E5E7EB_-78.91%,rgba(42,42,42,0.4)_86.62%)] backdrop-blur-lg p-5 rounded-xl border border-white/10 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="flex items-center gap-2 mb-3 relative z-10">
                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                <Sparkles size={18} />
                            </div>
                            <h3 className="font-bold text-white text-lg">AI Prediction</h3>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed mb-4 relative z-10">
                            Projected shortage of <span className="text-red-400 font-bold">O- blood units</span> in the <span className="font-bold text-white">Abuja region</span> within the next 48 hours based on historical accident data.
                        </p>
                        <button className="text-xs text-indigo-300 font-bold hover:text-white uppercase tracking-wide flex items-center gap-1 relative z-10">
                            View Analytics Details <ChevronRight size={12} />
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold text-gray-400 px-1">Quick Actions</h3>
                        <button className="w-full bg-white/5 hover:bg-white/10 backdrop-blur-sm text-left p-4 rounded-xl border border-white/10 flex justify-between items-center group transition-all hover:border-white/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">✅</div>
                                <span className="font-medium text-sm text-gray-200 group-hover:text-white">Verify New Bank</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
                        </button>
                        <button className="w-full bg-white/5 hover:bg-white/10 backdrop-blur-sm text-left p-4 rounded-xl border border-white/10 flex justify-between items-center group transition-all hover:border-white/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-500/10 text-red-400 rounded-lg">📢</div>
                                <span className="font-medium text-sm text-gray-200 group-hover:text-white">Broadcast Donor Appeal</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
                        </button>
                        <button className="w-full bg-white/5 hover:bg-white/10 backdrop-blur-sm text-left p-4 rounded-xl border border-white/10 flex justify-between items-center group transition-all hover:border-white/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/10 text-green-400 rounded-lg">📊</div>
                                <span className="font-medium text-sm text-gray-200 group-hover:text-white">Generate Supply Report</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Alerts Table */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden shadow-lg">
                <div className="p-5 border-b border-white/5 flex justify-between items-center">
                    <h3 className="font-bold text-white">Recent Administrative Alerts</h3>
                    <button className="px-3 py-1.5 bg-white/5 text-xs font-medium rounded-lg border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2">
                        Filter
                    </button>
                </div>
                <div className="overflow-x-auto">
                    {/* Desktop Table */}
                    <table className="hidden md:table w-full text-left text-sm">
                        <thead>
                            <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                                <th className="px-6 py-4 font-medium">Timestamp</th>
                                <th className="px-6 py-4 font-medium">Entity</th>
                                <th className="px-6 py-4 font-medium">Event Type</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {recentAlerts.map((alert, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-gray-400">{alert.time}</td>
                                    <td className="px-6 py-4 font-medium text-gray-200">{alert.entity}</td>
                                    <td className="px-6 py-4 text-gray-300">{alert.event}</td>
                                    <td className="px-6 py-4">
                                        {alert.status === 'Automated' ? (
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-900/30 text-purple-400 border border-purple-500/30">• Automated</span>
                                        ) : (
                                            <StatusChip status={alert.status as any} />
                                        )}
                                    </td>
                                    <td className={`px-6 py-4 text-right cursor-pointer text-xs font-bold ${alert.actionColor}`}>{alert.action}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Mobile Card View */}
                    <div className="md:hidden flex flex-col divide-y divide-white/5">
                        {recentAlerts.map((alert, i) => (
                            <div key={i} className="p-4 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-gray-400 text-xs mb-1">{alert.time}</p>
                                        <p className="font-bold text-gray-200 text-sm mb-1">{alert.entity}</p>
                                        <p className="text-gray-400 text-xs">{alert.event}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        {alert.status === 'Automated' ? (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-900/30 text-purple-400 border border-purple-500/30">Automated</span>
                                        ) : (
                                            <StatusChip status={alert.status as any} />
                                        )}
                                        <button className={`text-xs font-bold ${alert.actionColor}`}>{alert.action}</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-white/10 text-center">
                        <button className="text-xs text-gray-500 hover:text-white transition-colors">View All Activity</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Simple ChevronDown helper since it might be missing
const ChevronDown = ({ size }: { size: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
);

export default Dashboard;
