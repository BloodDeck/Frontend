
import { RouteObject } from 'react-router-dom';
import HospitalLayout from './layout/HospitalLayout';
import HospitalLogin from './auth/HospitalLogin';

const Dashboard = () => <div>Hospital Dashboard</div>;
const Requests = () => <div>Blood Requests</div>;
const Inventory = () => <div>Hospital Inventory</div>;

export const hospitalRoutes: RouteObject[] = [
    {
        path: '/hospital',
        element: <HospitalLayout />,
        children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'requests', element: <Requests /> },
            { path: 'inventory', element: <Inventory /> },
        ]
    },
    {
        path: '/hospital/login',
        element: <HospitalLogin />
    }
];
