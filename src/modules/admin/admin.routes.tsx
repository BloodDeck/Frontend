import React from 'react';
import { RouteObject } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import AdminLogin from './auth/AdminLogin';

const Dashboard = () => <div>Admin Dashboard Content</div>;
const Users = () => <div>Admin Users Management</div>;

export const adminRoutes: RouteObject[] = [
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'users', element: <Users /> },
        ]
    },
    {
        path: '/admin/login',
        element: <AdminLogin />
    }
];
