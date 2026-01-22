
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Building2, User, Phone, Mail, ShieldCheck, Share2, Activity, Clock } from 'lucide-react';

const HospitalRegistration = () => {
    const [showPassword, setShowPassword] = useState(false);

    // Form inputs state would go here in a real app
    // const [formData, setFormData] = ...

    return (
        <div className="flex h-screen w-full bg-white font-['Montserrat']">
            {/* Left Side - Scrollable Form */}
            <div className="w-full lg:w-[50%] flex flex-col h-full overflow-y-auto">
                <div className="p-8 md:p-16 max-w-2xl mx-auto w-full">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-10">
                        <div className="w-8 h-8 flex items-center justify-center font-bold text-2xl tracking-tighter">BLOOD<br />DECK</div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        Join BloodLink and Help Solve Nigeria's Blood Shortage Crisis
                    </h1>
                    <p className="text-gray-500 mb-10">
                        Complete the steps below to register your hospital on our life-saving platform.
                    </p>

                    {/* Progress Indicator (Static for single page flow or indicative) */}
                    <div className="mb-10">
                        <div className="flex items-center justify-between text-sm font-bold text-gray-900 mb-2">
                            <span>Step 1 of 3: Account Details</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-black h-full w-1/3 rounded-full"></div>
                        </div>
                    </div>

                    <form className="space-y-12">
                        {/* Section 1: Create Account */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Create Your Account</h2>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Administrator's Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-1 focus:ring-black transition-shadow bg-transparent"
                                        placeholder="Enter the full name of the administrator"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Administrator's Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-1 focus:ring-black transition-shadow bg-transparent"
                                        placeholder="e.g., admin@hospital.org"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Create Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="w-full border border-gray-200 rounded-lg p-3.5 pr-12 focus:outline-none focus:ring-1 focus:ring-black transition-shadow bg-transparent"
                                            placeholder="Enter a secure password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
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
                                    <input
                                        type="text"
                                        className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-1 focus:ring-black transition-shadow bg-transparent"
                                        placeholder="e.g., The General Hospital"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Hospital Address</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-1 focus:ring-black transition-shadow bg-transparent"
                                        placeholder="Enter hospital's full address"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Hospital Registration Number</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-1 focus:ring-black transition-shadow bg-transparent"
                                        placeholder="e.g., CAC/RC/123456"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">Primary Role</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <label className="flex items-center p-4 border border-black bg-gray-50 rounded-lg cursor-pointer transition-all">
                                            <input type="radio" name="role" className="w-4 h-4 text-black border-gray-300 focus:ring-black" defaultChecked />
                                            <span className="ml-3 text-sm font-medium text-gray-900">We have an internal blood bank</span>
                                        </label>
                                        <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                                            <input type="radio" name="role" className="w-4 h-4 text-black border-gray-300 focus:ring-black" />
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
                                    <input
                                        type="text"
                                        className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-1 focus:ring-black transition-shadow bg-transparent"
                                        placeholder="Full name of emergency contact"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Emergency Contact Phone Number</label>
                                    <input
                                        type="tel"
                                        className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-1 focus:ring-black transition-shadow bg-transparent"
                                        placeholder="e.g., +234 801 234 5678"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Actions */}
                        <div className="pt-4">
                            <button
                                type="button"
                                className="w-full bg-[#3D3D3D] hover:bg-black text-white font-bold py-4 rounded-lg text-sm transition-all shadow-lg hover:shadow-xl"
                            >
                                Complete Onboarding
                            </button>
                            <p className="mt-6 text-center text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                                By creating an account, you agree to our <a href="#" className="underline text-gray-700">Terms of Service</a> and <a href="#" className="underline text-gray-700">Privacy Policy</a>.
                            </p>
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
                    {/* Floating Icon */}
                    <div className="mb-12 flex justify-center">
                        <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center transform -rotate-6">
                            <div className="w-10 h-10 bg-black rounded-xl"></div>
                        </div>
                    </div>

                    <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-6 leading-tight">
                        Connecting Hospitals.<br />Saving Lives.
                    </h2>
                    <p className="text-gray-500 text-center mb-16 max-w-sm mx-auto text-lg">
                        Join our network to ensure no patient in Nigeria suffers due to a lack of safe, available blood.
                    </p>

                    <div className="space-y-10 pl-8">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 bg-[#e4e4e7] rounded-full flex items-center justify-center shrink-0">
                                <Share2 className="text-gray-600" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base mb-1">Access a Nationwide Network</h3>
                                <p className="text-sm text-gray-500 leading-relaxed text-left">Instantly connect with blood banks and hospitals across the country to find or supply blood.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 bg-[#e4e4e7] rounded-full flex items-center justify-center shrink-0">
                                <Activity className="text-gray-600" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base mb-1">AI-Powered Inventory Matching</h3>
                                <p className="text-sm text-gray-500 leading-relaxed text-left">Our smart system efficiently matches blood requests with available, compatible units.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 bg-[#e4e4e7] rounded-full flex items-center justify-center shrink-0">
                                <Clock className="text-gray-600" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base mb-1">Reduce Critical Wait Times</h3>
                                <p className="text-sm text-gray-500 leading-relaxed text-left">Save precious time in emergencies with a streamlined, digital request and supply workflow.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HospitalRegistration;
