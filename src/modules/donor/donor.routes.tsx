import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import DonorLayout from './layout/DonorLayout';

// pages
import HomeScreen from './pages/HomeScreen';
import LocateAndBook from './pages/LocateAndBook';
import MyAppointment from './pages/MyAppointment';
import MyImpact from './pages/MyImpact';
import MyReward from './pages/MyReward';

export const donorRoutes: RouteObject[] = [
    {
        path: '/donor',
        element: <DonorLayout />,
        children: [
            { index: true, element: <Navigate to="homescreen" replace /> },
            { path: 'homescreen', element: <HomeScreen /> },
            { path: 'locate-and-book', element: <LocateAndBook /> },
            { path: 'my-appointment', element: <MyAppointment /> },
            { path: 'my-impact', element: <MyImpact /> },
            { path: 'my-rewards', element: <MyReward /> }
        ]
    }
];
