
import { RouteObject } from 'react-router-dom';
import HospitalLayout from './layout/HospitalLayout';
import HospitalRegistration from './auth/HospitalRegistration';
import HospitalLogin from './auth/HospitalLogin';
import Dashboard from './pages/Dashboard';
import SearchAndRequest from './pages/SearchAndRequest';
import MatchingAndAllocation from './pages/MatchingAndAllocation';
import DispatchTracking from './pages/DispatchTracking';

const Requests = () => <div>Blood Requests</div>;
const Inventory = () => <div>Hospital Inventory</div>;

export const hospitalRoutes: RouteObject[] = [
    {
        path: '/hospital',
        element: <HospitalLayout />,
        children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'search', element: <SearchAndRequest /> },
            { path: 'allocation', element: <MatchingAndAllocation /> },
            { path: 'dispatch', element: <DispatchTracking /> },
            { path: 'requests', element: <Requests /> },
            { path: 'inventory', element: <Inventory /> },
        ]
    },
    {
        path: '/hospital/login',
        element: <HospitalLogin />
    },
    {
        path: '/hospital/register',
        element: <HospitalRegistration />
    }
];
