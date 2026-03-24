import React from 'react';
import { RouteObject } from 'react-router-dom';

// Layout
import BloodBankLayout from './layout/BloodBankLayout';

// Auth Pages (We will create these below)
import BloodBankLogin from './auth/BloodBankLogin';

// Main Pages
import Dashboard from './pages/Dashboard';
import Stock from './pages/Stock';
import Distribution from './pages/Distribution';

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
    // {
    //     path: '/login',
    //     element: <BloodBankLogin />
    // },
    // {
    //     path: '/register',
    //     element: <BloodBankRegistration />
    // }
];