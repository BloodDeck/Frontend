import React from 'react';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ children, className = "", ...props }) => {
    return (
        <button
            className={`w-full bg-black text-white font-bold py-3.5 rounded-lg hover:bg-gray-800 transition-colors uppercase text-sm tracking-wider ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
