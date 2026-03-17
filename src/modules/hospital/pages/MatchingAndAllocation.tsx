import React, { useState, useEffect } from 'react';
import { MapPin, Search, AlertCircle, CheckCircle, Package, ArrowUpRight, X, Cpu, Zap, Dna } from 'lucide-react';
import { toast } from 'react-toastify';
import { fetchData, updateData } from '../../../api/api';

const MatchingAndAllocation = () => {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [allocating, setAllocating] = useState(false);
    
    // Algorithm State
    const [matches, setMatches] = useState<any[]>([]);
    const [runningAlgo, setRunningAlgo] = useState(false);

    useEffect(() => {
        loadRequests();
    }, []);

    // Whenever a request is selected, run the matching algorithm!
    useEffect(() => {
        if (selectedRequest) {
            runMatchingAlgorithm(selectedRequest.id);
        }
    }, [selectedRequest]);

    const loadRequests = async () => {
        try {
            const data = await fetchData('hospital/requests/');
            const actualData = Array.isArray(data) ? data : (data?.results || []);
            const pendingReqs = actualData.filter((r: any) => r.status === 'pending');
            setRequests(pendingReqs);
            if (pendingReqs.length > 0 && !selectedRequest) {
                setSelectedRequest(pendingReqs[0]);
            }
        } catch (error) {
            toast.error("Failed to load requests.");
        } finally {
            setLoading(false);
        }
    };

    const runMatchingAlgorithm = async (id: number) => {
        setRunningAlgo(true);
        setMatches([]);
        try {
            // Give a slight fake delay for UX "processing" feel
            await new Promise(resolve => setTimeout(resolve, 800));
            const data = await fetchData(`applications/${id}/match/`);
            setMatches(data.matches || []);
        } catch (error) {
            toast.error("Algorithm failed to compute matches.");
        } finally {
            setRunningAlgo(false);
        }
    };

    const handleConfirmAllocation = async () => {
        if (!selectedRequest) return;
        setAllocating(true);
        try {
            await updateData(`applications/${selectedRequest.id}/`, { status: 'approved' });
            toast.success("Request allocated. Donors have been notified via the RandMax policy!");
            setShowPaymentModal(false);
            setSelectedRequest(null);
            setMatches([]);
            loadRequests(); 
        } catch (error: any) {
            toast.error(error.message || "Failed to confirm allocation.");
        } finally {
            setAllocating(false);
        }
    };

    // --- NEW LIGHT-THEMED SKELETON LOADER ---
    if (loading) {
        return (
            <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-6rem)] -m-4 md:-m-8 font-['Montserrat'] animate-pulse bg-gray-50">
                {/* Left Sidebar Skeleton */}
                <div className="w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col h-full z-10">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <div className="h-5 w-32 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="p-4 border-b border-gray-100">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                                </div>
                                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Center Content Skeleton */}
                <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
                            <div className="h-8 w-64 bg-gray-200 rounded mb-3"></div>
                            <div className="h-4 w-full max-w-md bg-gray-200 rounded mb-5"></div>
                            <div className="h-6 w-40 bg-gray-200 rounded-lg"></div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="h-6 w-48 bg-gray-200 rounded"></div>
                            <div className="h-6 w-24 bg-gray-200 rounded"></div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                            <div className="h-3 w-20 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2 flex flex-col items-end">
                                        <div className="h-3 w-16 bg-gray-200 rounded"></div>
                                        <div className="h-4 w-12 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel Skeleton */}
                <div className="w-full lg:w-80 bg-white border-l border-gray-200 flex flex-col p-6 z-10">
                    <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>
                    <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-5/6 bg-gray-200 rounded mb-8"></div>
                    <div className="h-14 w-full bg-gray-200 rounded-xl"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-6rem)] -m-4 md:-m-8 font-['Montserrat']">
            {/* Left Sidebar - Request Queue */}
            <div className="w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col h-full z-10">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-900">Request Queue ({requests.length})</h3>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {requests.length === 0 ? (
                        <div className="p-8 text-center text-sm text-gray-500">No pending requests found.</div>
                    ) : (
                        requests.map((req) => (
                            <div
                                key={req.id}
                                onClick={() => setSelectedRequest(req)}
                                className={`p-4 border-b border-gray-100 cursor-pointer transition-all ${selectedRequest?.id === req.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-sm font-bold text-gray-900 truncate pr-2">{req.applicant_name}</span>
                                    {req.details?.includes('Emergency') ? (
                                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded">Urgent</span>
                                    ) : (
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded">Standard</span>
                                    )}
                                </div>
                                <div className="text-xs text-gray-500 mb-1 truncate">{req.details}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Center - Main Content (Algorithm Results) */}
            <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
                {selectedRequest ? (
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedRequest.applicant_name}</h1>
                            <p className="text-gray-500 text-sm mb-4">{selectedRequest.details}</p>
                            <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg">
                                Logged: {new Date(selectedRequest.created_at).toLocaleString()}
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <Cpu size={18} className="text-blue-600" /> RandMax Matching Results
                            </h3>
                            <span className="text-xs text-gray-500 font-medium bg-white px-2 py-1 border border-gray-200 rounded">Gamma Factor: 0.3</span>
                        </div>

                        {runningAlgo ? (
                            <div className="w-full h-48 bg-blue-50 rounded-xl border border-blue-100 flex flex-col items-center justify-center text-blue-600 font-bold animate-pulse">
                                <Dna size={32} className="mb-3 animate-spin" />
                                Processing Donor Network...
                            </div>
                        ) : matches.length > 0 ? (
                            <div className="grid grid-cols-1 gap-3">
                                {matches.map((match, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between hover:border-blue-300 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-inner ${match.match_policy.includes('Max') ? 'bg-gradient-to-br from-blue-600 to-blue-800' : 'bg-gradient-to-br from-purple-500 to-purple-700'}`}>
                                                {match.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-gray-900">{match.name}</h4>
                                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                    <MapPin size={12}/> {match.city}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1.5 justify-end mb-1">
                                                {match.match_policy.includes('Max') ? <Zap size={14} className="text-amber-500" fill="currentColor"/> : <AlertCircle size={14} className="text-purple-500"/>}
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">{match.match_policy}</span>
                                            </div>
                                            <p className="text-sm font-bold text-gray-900">Score: {match.score}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="w-full h-32 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 text-sm">
                                No eligible donors found nearby.
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">Select a request to view matching analysis</div>
                )}
            </div>

            {/* Right Panel - Allocate */}
            {selectedRequest && (
                <div className="w-full lg:w-80 bg-white border-l border-gray-200 flex flex-col p-6 z-10 shadow-[-10px_0_15px_-10px_rgba(0,0,0,0.05)]">
                    <h3 className="font-bold text-gray-900 mb-2">Finalize Allocation</h3>
                    <p className="text-xs text-gray-500 mb-6 leading-relaxed">Approving this request will automatically dispatch notifications to the algorithmically matched donors.</p>
                    
                    <button
                        onClick={() => setShowPaymentModal(true)}
                        disabled={runningAlgo || matches.length === 0}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <CheckCircle size={18} /> Approve & Notify
                    </button>
                </div>
            )}

            {/* Payment / Confirmation Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-8 bg-gray-50 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Confirm Allocation</h2>
                            <p className="text-xs text-gray-500 mb-6">You are approving this blood request and notifying {matches.length} matched donors.</p>
                            <div className="space-y-4 text-sm bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Applicant</span>
                                    <span className="font-bold text-gray-900 truncate max-w-[150px]">{selectedRequest?.applicant_name}</span>
                                </div>
                                <div className="flex justify-between border-t border-gray-100 pt-3">
                                    <span className="text-gray-500">Donors to Notify</span>
                                    <span className="font-bold text-blue-600">{matches.length} Donors</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 flex gap-4">
                            <button onClick={() => setShowPaymentModal(false)} className="flex-1 text-gray-500 font-bold hover:text-gray-700 transition-colors">Cancel</button>
                            <button onClick={handleConfirmAllocation} disabled={allocating} className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg flex justify-center disabled:opacity-50 hover:bg-blue-700 transition-colors shadow-md">
                                {allocating ? 'Processing...' : 'Confirm & Dispatch'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MatchingAndAllocation;