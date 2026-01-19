import React from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({ label, className = "", ...props }) => {
    return (
        <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-2 ml-1 uppercase tracking-wide">
                {label}
            </label>
            <input
                className={`w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${className}`}
                {...props}
            />
        </div>
    );
};
