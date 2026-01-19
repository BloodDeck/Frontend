import { RouteObject } from 'react-router-dom';
import WebsiteLayout from './layout/WebsiteLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

export const websiteRoutes: RouteObject[] = [
    {
        path: '/',
        element: <WebsiteLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'about', element: <About /> },
            { path: 'contact', element: <Contact /> },
        ]
    }
];
