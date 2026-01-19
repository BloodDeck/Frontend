
import mailIcon from '../../../assets/images/mail_icon.png';

const EmailVerification = () => {
    return (
        <div className="w-full text-center">
            <div className="mb-8 flex justify-center">
                <img src={mailIcon} alt="Mail" className="w-40 h-40 object-contain" />
            </div>

            <h1 className="text-4xl font-bold mb-4">Thank you!</h1>

            <p className="text-gray-500 mb-2">We sent an email to <span className="font-semibold text-black">codemonk123@gmail.com</span></p>
            <p className="text-gray-500 text-sm">
                Click confirmation link in the email to verify your account
            </p>
        </div>
    );
};

export default EmailVerification;
