import React from 'react';
import { RouteObject } from 'react-router-dom';
import BloodBankLayout from './layout/BloodBankLayout';
import BloodBankLogin from './auth/BloodBankLogin';

const Dashboard = () => <div>Blood Bank Dashboard</div>;
const Stock = () => <div>Stock Management</div>;
const Distribution = () => <div>Distribution</div>;

export const bloodBankRoutes: RouteObject[] = [
    {
        path: '/bloodbank',
        element: <BloodBankLayout />,
        children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'stock', element: <Stock /> },
            { path: 'distribution', element: <Distribution /> },
        ]
    },
    {
        path: '/bloodbank/login',
        element: <BloodBankLogin />
    }
];
