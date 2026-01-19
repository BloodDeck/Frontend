
import { RouteObject } from 'react-router-dom';
import DonorLayout from './layout/DonorLayout';
import DonorLogin from './auth/DonorLogin';

const Dashboard = () => <div>Donor Dashboard Content</div>;
const Donate = () => <div>Donation Form</div>;
const History = () => <div>Donation History</div>;

export const donorRoutes: RouteObject[] = [
    {
        path: '/donor',
        element: <DonorLayout />,
        children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'donate', element: <Donate /> },
            { path: 'history', element: <History /> },
        ]
    },
    {
        path: '/donor/login',
        element: <DonorLogin />
    }
];
