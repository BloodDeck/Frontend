import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MapPin, Calendar, Droplet, Send, Info } from 'lucide-react';
import { postData, fetchData } from '../../../api/api';

const Donate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [facilities, setFacilities] = useState<any[]>([]); // Dynamic facilities state
    
    const [formData, setFormData] = useState({
        blood_group: 'O+',
        donation_date: '',
        location_id: '' 
    });

    // Fetch the list of verified hospitals and blood banks when the page loads
    useEffect(() => {
        const loadFacilities = async () => {
            try {
                const data = await fetchData('facilities/');
                setFacilities(data);
            } catch (error) {
                console.error("Failed to load facilities:", error);
                toast.error("Could not load donation centers. Please refresh.");
            }
        };
        loadFacilities();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.donation_date || !formData.location_id) {
            toast.error("Please select a date and a location.");
            return;
        }

        setLoading(true);
        try {
            await postData('donor/history/', {
                blood_group: formData.blood_group,
                donation_date: formData.donation_date,
                location: formData.location_id, // Sent as 'location' to match your Django Donation model
                units: 1,
                status: 'scheduled'
            });
            
            toast.success("Donation appointment scheduled successfully!");
            navigate('/donor/history');
            
        } catch (error: any) {
            console.error("Failed to schedule donation:", error);
            toast.error(error.message || "Failed to schedule donation. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Droplet className="text-red-500 fill-current" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Schedule a Donation</h1>
                    <p className="text-gray-500">Book an appointment at a verified blood bank or hospital near you.</p>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 mb-8 text-sm text-blue-800">
                    <Info size={20} className="shrink-0 mt-0.5" />
                    <p>
                        <strong>Before you book:</strong> Please ensure you have eaten a healthy meal, are well-hydrated, and weigh at least 50kg. You should wait at least 8 weeks between whole blood donations.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Blood Group */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Blood Group</label>
                        <div className="relative">
                            <Droplet className="absolute left-4 top-3.5 text-gray-400" size={18} />
                            <select
                                name="blood_group"
                                value={formData.blood_group}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors appearance-none"
                            >
                                <option value="A+">A Positive (A+)</option>
                                <option value="A-">A Negative (A-)</option>
                                <option value="B+">B Positive (B+)</option>
                                <option value="B-">B Negative (B-)</option>
                                <option value="AB+">AB Positive (AB+)</option>
                                <option value="AB-">AB Negative (AB-)</option>
                                <option value="O+">O Positive (O+)</option>
                                <option value="O-">O Negative (O-)</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Dynamic Location / Facility */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Donation Center</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                <select
                                    name="location_id"
                                    value={formData.location_id}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors appearance-none"
                                    required
                                >
                                    <option value="" disabled>Select a facility...</option>
                                    {facilities.map(facility => (
                                        <option key={facility.id} value={facility.id}>
                                            {/* Now it will display: "Lagos General Hospital - Lagos" */}
                                            {facility.first_name || facility.email} {facility.city ? `- ${facility.city}` : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Preferred Date */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                <input
                                    type="date"
                                    name="donation_date"
                                    value={formData.donation_date}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full pl-11 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/30"
                        >
                            <Send size={20} />
                            {loading ? 'Processing Request...' : 'Confirm Appointment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Donate;