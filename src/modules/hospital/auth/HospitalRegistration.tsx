import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Share2, Activity, Clock } from 'lucide-react';
import { toast } from 'react-toastify';
import { postData } from '../../../api/api';

const HospitalRegistration = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        adminName: '',
        email: '',
        password: '',
        hospitalName: '',
        address: '',
        regNumber: '',
        role: 'hospital',
        emergencyName: '',
        emergencyPhone: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await postData('auth/register/', {
                email: formData.email,
                password: formData.password,
                first_name: formData.hospitalName, 
                last_name: formData.adminName, 
                role: formData.role,
                address: `${formData.address} (Reg: ${formData.regNumber})`,
                phone_number: formData.emergencyPhone
            });
            
            toast.success("Facility registered successfully! Please log in.");
            navigate('/hospital/login');
        } catch (error: any) {
            console.error("Registration error:", error);
            toast.error(error.message || "Registration failed. Email might already be in use.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-white font-['Montserrat']">
            {/* Left Side - Scrollable Form */}
            <div className="w-full lg:w-[50%] flex flex-col h-full overflow-y-auto">
                <div className="p-8 md:p-16 max-w-2xl mx-auto w-full">
                    <div className="flex items-center gap-2 mb-10">
                        <div className="w-8 h-8 flex items-center justify-center font-bold text-2xl tracking-tighter">BLOOD<br />DECK</div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        Join BloodLink and Help Solve Nigeria's Blood Shortage Crisis
                    </h1>
                    <p className="text-gray-500 mb-10">
                        Complete the steps below to register your hospital on our life-saving platform.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-12">
                        {/* Section 1: Create Account */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Create Your Account</h2>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Administrator's Full Name</label>
                                    <input required type="text" name="adminName" value={formData.adminName} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-1 focus:ring-black bg-transparent" placeholder="Enter the full name of the administrator" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Administrator's Email Address</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-1 focus:ring-black bg-transparent" placeholder="e.g., admin@hospital.org" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Create Password</label>
                                    <div className="relative">
                                        <input required type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-3.5 pr-12 focus:outline-none focus:ring-1 focus:ring-black bg-transparent" placeholder="Enter a secure password" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Hospital Profile */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Hospital Profile</h2>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Official Hospital Name</label>
                                    <input required type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-1 focus:ring-black bg-transparent" placeholder="e.g., The General Hospital" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Hospital Address</label>
                                    <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-1 focus:ring-black bg-transparent" placeholder="Enter hospital's full address" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Hospital Registration Number</label>
                                    <input required type="text" name="regNumber" value={formData.regNumber} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-1 focus:ring-black bg-transparent" placeholder="e.g., CAC/RC/123456" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">Primary Role</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.role === 'bloodbank' ? 'border-black bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                            <input type="radio" name="role" value="bloodbank" checked={formData.role === 'bloodbank'} onChange={handleChange} className="w-4 h-4 text-black border-gray-300 focus:ring-black" />
                                            <span className="ml-3 text-sm font-medium text-gray-900">We have an internal blood bank</span>
                                        </label>
                                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.role === 'hospital' ? 'border-black bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                            <input type="radio" name="role" value="hospital" checked={formData.role === 'hospital'} onChange={handleChange} className="w-4 h-4 text-black border-gray-300 focus:ring-black" />
                                            <span className="ml-3 text-sm font-medium text-gray-900">We are a requester only</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Emergency Contact */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Emergency Contact</h2>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Emergency Contact Person's Name</label>
                                    <input required type="text" name="emergencyName" value={formData.emergencyName} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-1 focus:ring-black bg-transparent" placeholder="Full name of emergency contact" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Emergency Contact Phone Number</label>
                                    <input required type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-1 focus:ring-black bg-transparent" placeholder="e.g., +234 801 234 5678" />
                                </div>
                            </div>
                        </section>

                        <div className="pt-4">
                            <button type="submit" disabled={loading} className="w-full bg-[#3D3D3D] hover:bg-black text-white font-bold py-4 rounded-lg text-sm transition-all shadow-lg disabled:opacity-50">
                                {loading ? 'Registering...' : 'Complete Onboarding'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Side - Info/Marketing */}
            <div className="hidden lg:flex w-[50%] bg-[#f4f4f5] items-center justify-center p-16 relative">
                <div className="absolute top-8 right-8 text-sm flex items-center gap-4">
                    <span className="text-gray-500">Already have an account?</span>
                    <Link to="/hospital/login" className="font-bold text-white bg-black px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors">Log In</Link>
                </div>
                <div className="max-w-lg">
                    <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-6 leading-tight">Connecting Hospitals.<br />Saving Lives.</h2>
                    <p className="text-gray-500 text-center mb-16 max-w-sm mx-auto text-lg">Join our network to ensure no patient in Nigeria suffers due to a lack of safe, available blood.</p>
                </div>
            </div>
        </div>
    );
};

export default HospitalRegistration;