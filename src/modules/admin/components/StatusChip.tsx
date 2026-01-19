import React from 'react';

const StatusChip = ({ status }: { status: 'Pending' | 'In Review' | 'Approved' | 'Rejected' | 'Critical' | 'Completed' }) => {
    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-900/30 text-yellow-500 border border-yellow-700/50';
            case 'In Review': return 'bg-blue-900/30 text-blue-500 border border-blue-700/50';
            case 'Approved':
            case 'Completed': return 'bg-green-900/30 text-green-500 border border-green-700/50';
            case 'Rejected':
            case 'Critical': return 'bg-red-900/30 text-red-500 border border-red-700/50';
            default: return 'bg-gray-800 text-gray-400';
        }
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(status)}`}>
            • {status}
        </span>
    );
};

export default StatusChip;
