import React from 'react';

interface StatCardProps {
    label: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    subtext?: string;
    icon?: React.ReactNode;
    iconColor?: string;
    alert?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, trendUp, subtext, icon, iconColor = "text-blue-500", alert }) => {
    return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-xl flex flex-col justify-between h-full text-white shadow-lg">
            <div className="flex justify-between items-start mb-2">
                <span className="text-gray-400 text-sm font-medium">{label}</span>
                {icon && <div className={`${iconColor}`}>{icon}</div>}
                {alert && <div className="text-red-500">*</div>}
            </div>

            <div>
                <div className="flex items-end gap-2 mb-1">
                    <span className="text-3xl font-bold">{value}</span>
                    {trend && (
                        <span className={`text-xs font-medium mb-1 ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
                            {trend}
                        </span>
                    )}
                </div>
                {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
            </div>
        </div>
    );
};

export default StatCard;
