

const Contact = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <p className="text-lg text-gray-600 mb-6">
                        Have questions or suggestions? We'd love to hear from you.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <span className="font-bold w-24">Email:</span>
                            <span>support@blooddeck.com</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold w-24">Phone:</span>
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold w-24">Address:</span>
                            <span>123 Health Street, MedCity, MC 12345</span>
                        </div>
                    </div>
                </div>
                <form className="bg-gray-50 p-6 rounded-lg">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" className="w-full border-gray-300 rounded-md shadow-sm border p-2" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" className="w-full border-gray-300 rounded-md shadow-sm border p-2" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea rows={4} className="w-full border-gray-300 rounded-md shadow-sm border p-2"></textarea>
                    </div>
                    <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
