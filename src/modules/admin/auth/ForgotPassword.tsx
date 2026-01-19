import { AuthInput } from './components/AuthInput';
import { AuthButton } from './components/AuthButton';
import lockIcon from '../../../assets/images/lock_icon.png';

const ForgotPassword = () => {
    return (
        <div className="w-full text-center">
            {/* Icon */}
            <div className="mb-8 flex justify-center">
                <img src={lockIcon} alt="Lock" className="w-40 h-40 object-contain" />
            </div>

            <h1 className="text-3xl font-bold mb-2">Lost your password?</h1>
            <h2 className="text-2xl font-bold mb-4">Enter your details to recover</h2>
            <p className="text-gray-500 mb-8 text-sm">Enter your details to proceed further</p>

            <form className="space-y-6 max-w-sm mx-auto text-left">
                <AuthInput
                    label="Email"
                    type="email"
                    placeholder="helloblooddeck@gmail.com"
                />

                <AuthButton type="submit">
                    Send
                </AuthButton>
            </form>
        </div>
    );
};

export default ForgotPassword;
