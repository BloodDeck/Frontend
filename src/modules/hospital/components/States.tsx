
import { RefreshCw, Map } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                Success State                               */
/* -------------------------------------------------------------------------- */
export const SuccessState = ({ title = "Action Successful", message = "Your action has been successfully logged and verified on the blockchain.", actionLabel = "Continue to Dashboard", onAction }: { title?: string, message?: string, actionLabel?: string, onAction?: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center p-8 bg-[#262626] text-white rounded-xl">
            <div className="mb-8">
                {/* Using custom SVG with requested box-shadow via inline style or CSS class if preferred. 
                      Since user specific box-shadow: 0px 0px 40.99px 0px #F5F5F566; was requested, we apply it here directly or via style prop if needed.
                      However, if the SVG itself contains the shadow (implied by filename "Check+Background+Shadow"), we might just display it.
                      I will assume the SVG is the image itself and the user wants that specific shadow effect around it or it is built in.
                      Given the user explicit CSS instruction, I will apply it to the container or image.
                  */}
                <img
                    src="/src/assets/svg/Check+Background+Shadow.svg"
                    alt="Success"
                    className="w-24 h-24"
                    style={{ filter: 'drop-shadow(0px 0px 40.99px #F5F5F566)' }}
                />
            </div>

            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-12 text-lg">
                {message}
            </p>

            <button
                onClick={onAction}
                className="bg-[#3D3D3D] hover:bg-gray-600 text-white font-bold py-4 px-12 rounded-lg transition-colors border border-gray-600"
            >
                {actionLabel}
            </button>
        </div>
    );
};


/* -------------------------------------------------------------------------- */
/*                                Loading State                               */
/* -------------------------------------------------------------------------- */
export const LoadingState = ({ progress = 65 }: { progress?: number }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center p-8 bg-[#262626] text-white rounded-xl">
            <div className="mb-12 relative">
                <img src="/src/assets/svg/blood.svg" alt="Loading" className="w-24 h-24 animate-pulse" />
            </div>

            <h2 className="text-3xl font-bold mb-2">Securing life-saving connections...</h2>
            <p className="text-gray-400 mb-12">Verifying records on the blockchain...</p>

            <div className="bg-white text-black p-6 rounded-xl w-full max-w-md relative overflow-hidden">
                <div className="flex justify-between items-center mb-3 font-bold uppercase tracking-wider text-xs">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 bg-black rounded-full animate-pulse"></div> Processing Network Data</span>
                    <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-black h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-500">
                    <Map size={14} /> Verifying records on blockchain
                </div>
            </div>
        </div>
    );
};


/* -------------------------------------------------------------------------- */
/*                                 Empty State                                */
/* -------------------------------------------------------------------------- */
export const EmptyState = ({ type = 'records' }: { type?: 'records' | 'error' }) => {
    if (type === 'error') {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center p-8 bg-[#262626] text-white rounded-xl">
                <div className="mb-8 opacity-80">
                    <img src="/src/assets/svg/beat.svg" alt="Error" className="w-64 h-auto" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Something missed a beat</h2>
                <p className="text-gray-400 max-w-md mx-auto mb-8">
                    We encountered an unexpected interruption while processing your request. Our systems are working to restore the pulse.
                </p>
                <div className="flex gap-4">
                    <button className="bg-[#3D3D3D] hover:bg-gray-600 px-6 py-3 rounded-lg font-bold flex items-center gap-2">
                        <RefreshCw size={16} /> Retry Action
                    </button>
                    <button className="border border-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-bold flex items-center gap-2">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8 bg-white rounded-xl">
            <div className="mb-6">
                <img src="/src/assets/svg/folder.svg" alt="Empty" className="w-32 h-auto" />
            </div>
            <p className="text-gray-500 max-w-xs mx-auto mb-8 leading-relaxed">
                There are no active records or units to display right now. Start by logging a new blood unit or searching for nearby centers.
            </p>
            <button className="bg-[#3D3D3D] hover:bg-black text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 mx-auto transition-colors shadow-lg">
                <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[10px]">+</div>
                Request Blood
            </button>
            <p className="mt-8 text-xs text-gray-400 flex items-center justify-center gap-1">
                <span className="w-3 h-3 border border-gray-300 rounded-full flex items-center justify-center text-[8px]">?</span>
                Need help managing your blood bank inventory?
            </p>
        </div>
    );
};
