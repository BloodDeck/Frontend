import React from 'react';
import { RouteObject } from 'react-router-dom';

// pages
import HomeScreen from './pages/HomeScreen';
import LocateAndBook from './pages/LocateAndBook';

export const donorRoutes: RouteObject[] = [
    {path: '/donor', element: <HomeScreen />},
    {path: '/donor/locate-and-book', element: <LocateAndBook />},
]