import React from 'react';
import { RouteObject } from 'react-router-dom';

// pages
import HomeScreen from './pages/HomeScreen';
import LocateAndBook from './pages/LocateAndBook';
import MyAppointment from './pages/MyAppointment';
import MyImpact from './pages/MyImpact';
import MyReward from './pages/MyReward';

export const donorRoutes: RouteObject[] = [
    {path: '/donor', element: <HomeScreen />},
    {path: '/donor/locate-and-book', element: <LocateAndBook />},
    {path: '/donor/my-appointment', element: <MyAppointment />},
    {path: '/donor/my-impact', element: <MyImpact />},
    {path: '/donor/my-rewards', element: <MyReward />}
]