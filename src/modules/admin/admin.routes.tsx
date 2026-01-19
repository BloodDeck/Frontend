import { RouteObject, Navigate } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import AuthLayout from './auth/components/AuthLayout';
import AdminLogin from './auth/AdminLogin';
import AdminRegister from './auth/AdminRegister';
import ForgotPassword from './auth/ForgotPassword';
import EmailVerification from './auth/EmailVerification';
// Pages
import Dashboard from './pages/Dashboard';
import BloodBankApplications from './pages/BloodBankApplications';
import ApplicationDetails from './pages/ApplicationDetails';
import Inventory from './pages/Inventory';

import HospitalApplications from './pages/HospitalApplications';

const Users = () => <div>Admin Users Management</div>;

export const adminRoutes: RouteObject[] = [
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'users', element: <Users /> },
            // Placeholders for future routes to avoid 404s on sidebar click
            { path: 'applications', element: <BloodBankApplications /> },
            { path: 'applications/:id', element: <ApplicationDetails /> },
            { path: 'hospitals', element: <HospitalApplications /> },
            { path: 'inventory', element: <Inventory /> },
            { path: 'settings', element: <div>Settings (Coming Soon)</div> },
        ]
    },
    {
        element: <AuthLayout />,
        children: [
            { path: '/admin/login', element: <AdminLogin /> },
            { path: '/admin/register', element: <AdminRegister /> },
            { path: '/admin/forgot-password', element: <ForgotPassword /> },
            { path: '/admin/verify-email', element: <EmailVerification /> },
        ]
    }
];
