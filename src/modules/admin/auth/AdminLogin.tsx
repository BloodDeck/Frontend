
import { Link } from 'react-router-dom';
import { AuthInput } from './components/AuthInput';
import { AuthButton } from './components/AuthButton';
import { SocialButton } from './components/SocialButton';

const AdminLogin = () => {
    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back!</h1>
            <p className="text-gray-500 text-center mb-8 text-sm">Enter your details to proceed further</p>

            <form className="space-y-4">
                <AuthInput
                    label="Email"
                    type="email"
                    placeholder="helloblooddeck@gmail.com"
                    defaultValue="helloblooddeck@gmail.com"
                />
                <AuthInput
                    label="Your password"
                    type="password"
                    placeholder="Vitalink_NG"
                    defaultValue="Vitalink_NG"
                />

                <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-gray-900 border-gray-300 rounded" />
                        <span className="ml-2 text-sm font-bold text-gray-700">Remember me</span>
                    </label>
                    <Link to="/admin/forgot-password" className="text-sm font-bold text-blue-900 hover:text-blue-700">
                        Recover password
                    </Link>
                </div>

                <AuthButton type="submit">
                    Sign In
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
                Don't have an account? <Link to="/admin/register" className="font-bold text-black hover:underline">Sign Up</Link>
            </p>
        </div>
    );
};

export default AdminLogin;
