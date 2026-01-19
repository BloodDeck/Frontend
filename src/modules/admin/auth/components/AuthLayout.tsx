import { Outlet } from 'react-router-dom';
import logo from '../../../../assets/images/logo.png';
import bloodDropBg from '../../../../assets/images/blood_drop_bg.png';

const AuthLayout = () => {
    return (
        <div className="relative min-h-screen bg-white font-['Montserrat'] overflow-x-hidden">
            {/* Top Left Logo */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
                <img src={logo} alt="BloodDeck Logo" className="h-24 md:h-32 w-auto" />
            </div>

            {/* Bottom Left Blood Drop Background */}
            <div className="absolute -bottom-20 -left-20 z-0 pointer-events-none opacity-20 md:opacity-100">
                <img src={bloodDropBg} alt="Background Decoration" className="h-[600px] w-auto object-contain" />
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 w-full max-w-[500px] px-4 mx-auto pt-[200px] pb-20">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
