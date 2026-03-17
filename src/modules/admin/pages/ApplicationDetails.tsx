import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MapPin, Building, FileText, Download, Eye, ExternalLink, CheckCircle, ArrowLeft } from 'lucide-react';
import { fetchData, updateData } from '../../../api/api';

interface ApplicationData {
    id: number;
    user: number;
    user_email: string;
    applicant_name: string;
    category: string;
    status: string;
    details: string;
    created_at: string;
}

const ApplicationDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const [application, setApplication] = useState<ApplicationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [reviewNote, setReviewNote] = useState('');

    useEffect(() => {
        const loadApplication = async () => {
            try {
                const data = await fetchData(`applications/${id}/`);
                setApplication(data);
                // If there are existing details, load them into the review note
                if (data.details) setReviewNote(data.details);
            } catch (error) {
                console.error('Failed to load application:', error);
                toast.error('Failed to load application details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadApplication();
        }
    }, [id]);

    const handleStatusUpdate = async (newStatus: 'approved' | 'rejected' | 'pending') => {
        if (!application) return;
        setUpdating(true);
        try {
            const updatedData = await updateData(`applications/${application.id}/`, {
                status: newStatus,
                details: reviewNote // Saving the review note to the details field
            });
            setApplication(updatedData);
            toast.success(`Application marked as ${newStatus.toUpperCase()}`);
            
            // Optional: navigate back to list if approved/rejected
            // navigate('/admin/applications');
        } catch (error: any) {
            console.error('Failed to update status:', error);
            toast.error(error.message || 'Failed to update application status.');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6 max-w-6xl mx-auto animate-pulse">
                <div className="flex items-center justify-between">
                    <div className="space-y-3">
                        <div className="h-4 w-48 bg-[#2D2D2D] rounded-lg"></div>
                        <div className="h-8 w-72 bg-[#2D2D2D] rounded-lg"></div>
                    </div>
                    <div className="h-10 w-32 bg-[#2D2D2D] rounded-lg"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 h-[400px] bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>
                    <div className="h-[400px] bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>
                </div>
                <div className="h-64 bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>
            </div>
        );
    }
    
    if (!application) return <div className="p-8 text-center text-red-500">Application not found.</div>;

    // Helper to colorize status
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-900/30 text-green-500 border border-green-700/50';
            case 'rejected': return 'bg-red-900/30 text-red-500 border border-red-700/50';
            default: return 'bg-yellow-900/30 text-yellow-500 border border-yellow-700/50';
        }
    };

    return (
        <div className="space-y-6">
            {/* Breadcrumbs & Back Button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="cursor-pointer hover:text-white" onClick={() => navigate('/admin/dashboard')}>Dashboard</span> &gt; 
                    <span className="cursor-pointer hover:text-white" onClick={() => navigate('/admin/applications')}>Applications</span> &gt; 
                    <span className="text-white">{application.applicant_name}</span>
                </div>
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
                    <ArrowLeft size={16} /> Back
                </button>
            </div>

            {/* Header / Overview Card */}
            <div className="bg-[#2D2D2D] rounded-lg border border-[#3D3D3D] p-6 relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-24 h-24 bg-[#B91C1C] rounded-lg flex flex-col items-center justify-center text-white shrink-0">
                        <Building size={32} className="mb-1" />
                        <span className="text-[10px] font-bold uppercase">{application.category}</span>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl font-bold text-white">{application.applicant_name}</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusStyle(application.status)}`}>
                                {application.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                            Application ID: Blooddeck-{new Date(application.created_at).getFullYear()}-{application.id.toString().padStart(4, '0')} • Submitted on {new Date(application.created_at).toLocaleDateString()}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center gap-2 text-xs text-green-500 bg-green-900/20 px-3 py-1.5 rounded border border-green-900/50">
                                <CheckCircle size={14} /> User Account Registered
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Contact & Legal */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#2D2D2D] rounded-lg border border-[#3D3D3D] p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-white">Application Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Registered Email</p>
                                <p className="text-sm text-white font-medium flex items-center gap-2">
                                    {application.user_email}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Facility Type</p>
                                <p className="text-sm text-white font-medium capitalize">{application.category}</p>
                            </div>
                            
                            {/* Note: The following fields are placeholders as they don't exist in the backend model yet */}
                            <div className="space-y-1 md:col-span-2">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Additional Details / Bio</p>
                                <div className="bg-[#1A1A1A] p-4 rounded border border-[#3D3D3D] text-sm text-gray-300 min-h-[80px]">
                                    {application.details || "No additional details provided."}
                                </div>
                            </div>
                        </div>
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
                            placeholder="e.g. 'The Medical License uploaded seems to be expired...'"
                            value={reviewNote}
                            onChange={(e) => setReviewNote(e.target.value)}
                            disabled={updating}
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm">
                                <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white">
                                    <input type="checkbox" defaultChecked className="form-checkbox bg-[#1A1A1A] border-[#3D3D3D] rounded hover:border-gray-500" />
                                    Save as internal note
                                </label>
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => handleStatusUpdate('rejected')}
                                    disabled={updating || application.status === 'rejected'}
                                    className="px-6 py-2 rounded-lg border border-red-900/50 text-red-500 font-bold hover:bg-red-900/20 text-sm disabled:opacity-50"
                                >
                                    Reject
                                </button>
                                <button 
                                    onClick={() => handleStatusUpdate('approved')}
                                    disabled={updating || application.status === 'approved'}
                                    className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold text-sm disabled:opacity-50"
                                >
                                    Approve Application
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Documents & Verification */}
                {/* <div className="space-y-6">
                    <div className="bg-[#2D2D2D] p-6 rounded-lg border border-[#3D3D3D]">
                        <h3 className="text-sm font-bold text-gray-400 mb-4">Note on Documents & Location</h3>
                        <p className="text-xs text-gray-500 leading-relaxed mb-4">
                            Your current Django <code className="bg-[#1A1A1A] px-1 rounded text-red-400">Application</code> model does not yet have fields for file uploads (like CAC certificates), phone numbers, or addresses. 
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Once you add `models.FileField` or `models.ImageField` to your backend, they will appear here dynamically.
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default ApplicationDetails;