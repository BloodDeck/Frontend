import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DonorLayout = () => {
    return (
        <div className="min-h-screen overflow-x-hidden bg-donor-bg">
            <Navbar />
            <main className="pt-20">
                <Outlet />
            </main>
        </div>
    );
};

export default DonorLayout;
