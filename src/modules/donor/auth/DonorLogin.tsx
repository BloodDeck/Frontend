

const DonorLogin = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 border-t-4 border-red-500">
                <h1 className="text-2xl font-bold mb-6 text-center text-red-600">Donor Login</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 border p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DonorLogin;
