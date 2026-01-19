import { useState } from 'react';

import { MapPin, Building, FileText, Download, Eye, ExternalLink, CheckCircle } from 'lucide-react';

const ApplicationDetails = () => {
    const [reviewNote, setReviewNote] = useState('');

    return (
        <div className="space-y-6">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Dashboard</span> &gt; <span>Applications</span> &gt; <span className="text-white">Lagos City Blood Bank</span>
            </div>

            {/* Header / Overview Card */}
            <div className="bg-[#2D2D2D] rounded-lg border border-[#3D3D3D] p-6 relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* ID Badge / Logo Placeholder */}
                    <div className="w-24 h-24 bg-[#B91C1C] rounded-lg flex flex-col items-center justify-center text-white shrink-0">
                        <Building size={32} className="mb-1" />
                        <span className="text-[10px] font-bold">BLOODBANK</span>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl font-bold text-white">Lagos City Blood Bank</h1>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-900/30 text-yellow-500 border border-yellow-700/50">
                                PENDING REVIEW
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                            Application ID: #APP-2023-8492 • Submitted on Oct 24, 2023
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center gap-2 text-xs text-green-500 bg-green-900/20 px-3 py-1.5 rounded border border-green-900/50">
                                <CheckCircle size={14} /> Verified Email
                            </div>
                            <div className="flex items-center gap-2 text-xs text-green-500 bg-green-900/20 px-3 py-1.5 rounded border border-green-900/50">
                                <CheckCircle size={14} /> Verified Phone
                            </div>
                        </div>
                    </div>
                    <button className="bg-[#1F1F1F] hover:bg-[#333333] text-gray-300 px-4 py-2 rounded text-sm font-medium border border-[#3D3D3D] flex items-center gap-2">
                        <Download size={16} /> Download PDF Summary
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Contact & Location */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Contact Info */}
                    <div className="bg-[#2D2D2D] rounded-lg border border-[#3D3D3D] p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-white">Contact & Legal Information</h3>
                            <button className="text-xs text-gray-500 hover:text-white font-medium">Edit Details</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Official Email</p>
                                <p className="text-sm text-white font-medium flex items-center gap-2">
                                    contact@lagoscityblood.com
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Phone Number</p>
                                <p className="text-sm text-white font-medium">+234 801 234 5678</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Head Office Address</p>
                                <p className="text-sm text-white font-medium">12 Marina Road, Lagos Island</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase tracking-wider">LGA / State</p>
                                <p className="text-sm text-white font-medium">Lagos Island, Lagos</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Director Name</p>
                                <p className="text-sm text-white font-medium">Dr. Tunde Bakare</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Tax ID</p>
                                <p className="text-sm text-white font-medium">TIN-99887766</p>
                            </div>
                        </div>
                    </div>

                    {/* Operational Capacity (Placeholder) */}
                    <div className="bg-[#2D2D2D] rounded-lg border border-[#3D3D3D] p-6 h-32 flex items-center justify-center">
                        <span className="text-gray-500 font-medium">Operational Capacity Data Section</span>
                    </div>

                    {/* Review Decision */}
                    <div className="bg-[#2D2D2D] rounded-lg border border-[#3D3D3D] p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText size={20} className="text-blue-500" />
                            <h3 className="font-bold text-white">Review Decision</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">Add comments for the applicant or internal notes before making a decision.</p>

                        <textarea
                            className="w-full bg-[#1A1A1A] border border-[#3D3D3D] rounded-lg p-4 text-sm text-white focus:outline-none focus:border-gray-500 mb-6 font-mono"
                            rows={4}
                            placeholder="e.g. 'The Medical License uploaded seems to be expired. Please upload the 2024 renewal.'"
                            value={reviewNote}
                            onChange={(e) => setReviewNote(e.target.value)}
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm">
                                <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white">
                                    <input type="checkbox" className="form-checkbox bg-[#1A1A1A] border-[#3D3D3D] rounded hover:border-gray-500" />
                                    Notify applicant via email
                                </label>
                                <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white">
                                    <input type="checkbox" defaultChecked className="form-checkbox bg-[#1A1A1A] border-[#3D3D3D] rounded hover:border-gray-500" />
                                    Save as internal note
                                </label>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-6 py-2 rounded-lg border border-red-900/50 text-red-500 font-bold hover:bg-red-900/20 text-sm">
                                    Reject
                                </button>
                                <button className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm">
                                    Request Changes
                                </button>
                                <button className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold text-sm">
                                    Approve Application
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Documents & Verification */}
                <div className="space-y-6">
                    {/* Documents */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-bold text-gray-400 mb-1">Submitted Documents</h3>
                        {[
                            { name: 'CAC_Certificate_2023.pdf', size: '2.4 MB', date: 'Oct 24' },
                            { name: 'Medical_Practice_License.jpg', size: '4.1 MB', date: 'Oct 24' },
                            { name: 'Director_ID_Card.pdf', size: '1.2 MB', date: 'Oct 24' },
                            { name: 'Facility_Photos_Set.zip', size: '15.0 MB', date: 'Oct 25' },
                        ].map((doc, idx) => (
                            <div key={idx} className="bg-[#2D2D2D] rounded-lg border border-[#3D3D3D] p-3 flex items-center justify-between group hover:border-gray-500 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-[#1A1A1A] flex items-center justify-center text-red-500">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white truncate max-w-[150px]">{doc.name}</p>
                                        <p className="text-[10px] text-gray-500">{doc.size} • Uploaded {doc.date}</p>
                                    </div>
                                </div>
                                <Eye size={16} className="text-gray-500 group-hover:text-white" />
                            </div>
                        ))}
                    </div>

                    {/* Location Verification */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-400 mb-3">Location Verification</h3>
                        <div className="bg-[#2D2D2D] p-1 rounded-lg border border-[#3D3D3D]">
                            <div className="relative h-48 bg-[#1A1A1A] rounded overflow-hidden">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Nigeria_location_map.svg/1707px-Nigeria_location_map.svg.png"
                                    alt="Map"
                                    className="w-full h-full object-cover opacity-50"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <MapPin className="text-red-500 drop-shadow-lg" size={32} />
                                </div>
                                <button className="absolute bottom-2 right-2 bg-white text-black p-1.5 rounded shadow hover:bg-gray-100">
                                    <ExternalLink size={14} />
                                </button>
                                <div className="absolute top-2 left-2 bg-[#1F1F1F]/90 backdrop-blur px-2 py-1 rounded border border-[#3D3D3D]">
                                    <p className="text-xs font-bold text-white">Agege</p>
                                    <p className="text-[10px] text-gray-400">12 Marina Road, Lagos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetails;
