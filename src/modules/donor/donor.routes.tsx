import { RouteObject } from 'react-router-dom';
import DonorLayout from './layout/DonorLayout';
import DonorLogin from './auth/DonorLogin';
import DonorDashboard from './dashboard/DonorDashboard';
import Donate from './dashboard/Donate';
import History from './dashboard/History'; 
import Profile from './dashboard/Profile'; 

export const donorRoutes: RouteObject[] = [
    {
        path: '/donor',
        element: <DonorLayout />,
        children: [
            { path: 'dashboard', element: <DonorDashboard /> },
            { path: 'donate', element: <Donate /> },
            { path: 'history', element: <History /> }, 
            { path: 'profile', element: <Profile /> },   
        ]
    },
    {
        path: '/donor/login',
        element: <DonorLogin />
    }
];