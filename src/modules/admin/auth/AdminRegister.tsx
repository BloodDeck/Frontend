
import { Link } from 'react-router-dom';
import { AuthInput } from './components/AuthInput';
import { AuthButton } from './components/AuthButton';
import { SocialButton } from './components/SocialButton';

const AdminRegister = () => {
    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-2 text-center">Sign Up to get started</h1>
            <p className="text-gray-500 text-center mb-8 text-sm">Enter your details to proceed further</p>

            <form className="space-y-4">
                <AuthInput
                    label="Email"
                    type="email"
                    placeholder="helloblooddeck@gmail.com"
                />

                <div className="grid grid-cols-2 gap-4">
                    <AuthInput label="First name" type="text" />
                    <AuthInput label="Last name" type="text" />
                </div>

                <AuthInput label="Password" type="password" />
                <AuthInput label="Confirm password" type="password" />

                <div className="flex items-center mb-6">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-gray-900 border-gray-300 rounded" />
                    <span className="ml-2 text-sm text-gray-500 font-bold">I agree with terms & conditions</span>
                </div>

                <AuthButton type="submit">
                    Sign Up
                </AuthButton>
            </form>

            <div className="mt-8 mb-6 relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-400">Or</span>
                </div>
            </div>

            <div className="space-y-3">
                <SocialButton provider="google" />
                <SocialButton provider="apple" />
            </div>

            <p className="mt-8 text-center text-sm font-medium">
                Already have an account? <Link to="/admin/login" className="font-bold text-black hover:underline">Sign In</Link>
            </p>
        </div>
    );
};

export default AdminRegister;
