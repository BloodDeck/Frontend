import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDroplet, faAward, faDroplet, faLocationDot, faChevronLeft, faChevronRight, faShield, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import logoWhite from "../../../assets/images/blood_drop_bg.png";
import Map from "../components/Map";

const HomeScreen = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Card */}
            <section className="relative bg-linear-to-r from-[#040E08] via-[#2E2C2C] to-[#4C4747] text-white w-[72%] mx-auto rounded-xl p-6 mb-8 shadow-md overflow-hidden">
                <img src={logoWhite} alt="Blood Drop Background" className="absolute -top-36 -right-25 w-50 object-contain pointer-events-none" />
                <h1 className="text-white text-3xl font-black mt-3.5">Welcome back, Hero! 🩸</h1>
                <div className="flex mt-4 gap-10 justify-between items-center">
                    <p className="text-white/80 w-[46%] leading-relaxed">Your contributions have directly saved lives in Lagos. Keep going, your next donation can be someone's second chance.</p>
                    <button className="bg-white text-[#242824] px-6 py-3.5 rounded-xl font-bold text-center flex items-center gap-2"><FontAwesomeIcon icon={faHandHoldingDroplet} />Donate Now</button>
                </div>
                {/* Stats Cards */}
                <div className="flex gap-4 mt-6 mb-4">
                    {/* LifePoint Card */}
                    <div className="bg-white/20 blur-effect backdrop-blur-md rounded-xl p-4 w-38 border border-solid border-white/20">
                        <p className="text-xs leading-relaxed text-white/60">LIFEPOINTS</p>
                        <div className="flex gap-2 items-center font-black text-xl">
                            <FontAwesomeIcon icon={faAward} className="text-[#FACC15]" />
                            <h2>1,250</h2>
                        </div>
                    </div>
                    {/* Donations Card */}
                    <div className="bg-white/20 blur-effect backdrop-blur-md rounded-xl p-4 w-38 border border-solid border-white/20">
                        <p className="text-xs leading-relaxed text-white/60">DONATIONS</p>
                        <div className="flex gap-2 items-center font-black text-xl">
                            <FontAwesomeIcon icon={faHeart} className="text-[#FECACA]" />
                            <h2>12</h2>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[72%] mx-auto">
                {/* Info Card 1 */}
                <div className="bg-white blur-effect backdrop-blur-md rounded-xl p-4 border border-solid border-[#cdd1d6] shadow-md">
                    <div className="flex gap-4 items-center">
                        <div className="p-4 bg-[#0E1B131A] rounded-2xl"><FontAwesomeIcon icon={faCalendar} className="text-[#0E1B13] text-2xl" /></div>
                        <div className="leading-relaxed">
                            <p className="text-[#64748B] text-sm">Next Eligible Date</p>
                            <h3 className="text-[#1E293B] font-bold text-lg mt-1">October 15, 2024</h3>
                            <p className="text-[#0E1B13] mt-1">2 weeks to go!</p>
                        </div>
                    </div>
                </div>
                {/* Info Card 2 */}
                <div className="bg-white blur-effect backdrop-blur-md rounded-xl p-4 border border-solid border-[#cdd1d6] shadow-md">
                    <div className="flex gap-4 items-center">
                        <div className="p-4 bg-[#0E1B131A] rounded-2xl"><FontAwesomeIcon icon={faDroplet} className="text-[#0E1B13] text-2xl" /></div>
                        <div className="leading-relaxed">
                            <p className="text-[#64748B] text-sm">Blood Type</p>
                            <h3 className="text-[#1E293B] font-bold text-lg mt-1">O Positive (Universal)</h3>
                            <p className="text-[#0E1B13] mt-1">Critical need in your area</p>
                        </div>
                    </div>
                </div>
                {/* Info Card 3 */}
                <div className="bg-white blur-effect backdrop-blur-md rounded-xl p-4 border border-solid border-[#cdd1d6] shadow-md">
                    <div className="flex gap-4 items-center">
                        <div className="p-4 bg-[#0E1B131A] rounded-2xl"><FontAwesomeIcon icon={faClock} className="text-[#0E1B13] text-2xl" /></div>
                        <div className="leading-relaxed">
                            <p className="text-[#64748B] text-sm">Recent Activity</p>
                            <h3 className="text-[#1E293B] font-bold text-lg mt-1">Donation at Lagos GH</h3>
                            <p className="text-[#0E1B13] mt-1">July 20, 2024</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Map Section and Health Tips */}
            <div className="mt-10 flex justify-between w-[72%] mx-auto gap-6">
                {/* Map Section */}
                <div className="w-[66%] border border-solid border-[#cdd1d6] rounded-xl overflow-hidden shadow-md">
                    <div className="bg-white p-4 flex item-center justify-between gap-4">
                        <div className="flex item-center gap-3 p-4 my-auto font-black text-lg">
                            <FontAwesomeIcon icon={faLocationDot} className="text-[#0E1B13] pt-1" />
                            <h1 className="text-[#1E293B] w-full">Find a Donation Center Near You</h1>
                        </div>
                        <div className="flex item-center gap-4 p-4 my-auto">
                            <select className="bg-[#F8FAFC] border border-solid border-[#cdd1d6] rounded-lg p-3 w-30 overflow-hidden text-ellipsis whitespace-nowrap focus:outline-none">
                                <option>Location</option>
                                <option>Lagos</option>
                                <option>Abuja</option>
                                <option>Kano</option>
                            </select>
                            <select className="bg-[#F8FAFC] border border-solid border-[#cdd1d6] rounded-lg p-3 w-30 overflow-hidden text-ellipsis whitespace-nowrap focus:outline-none">
                                <option>Center</option>
                                <option>Lagos General Hospital</option>
                                <option>Abuja Medical Center</option>
                                <option>Kano Health Clinic</option>
                            </select>
                        </div>
                    </div>
                    <div className="relative h-[70vh]">
                        {/* Map Component */}
                        <Map />
                    </div>
                </div>
                <div className="w-[32%]">
                    {/* Health Tips Section */}
                    <div className="w-full bg-white mx-auto border border-solid border-[#cdd1d6] rounded-xl overflow-hidden shadow-md">
                        <div className="flex justify-between gap-4">
                            <h1 className="text-[#1E293B] font-bold text-lg p-4">Health Tips</h1>
                            <div className="flex gap-2 p-4 my-auto">
                                <FontAwesomeIcon icon={faChevronLeft} className="bg-[#F8FAFC] p-2.5 rounded-xl" />
                                <FontAwesomeIcon icon={faChevronRight} className="bg-[#F8FAFC] p-2.5 rounded-xl" />
                            </div>
                        </div>
                        <div className="m-4 p-4 bg-[#F8FAFC] rounded-xl">
                            <FontAwesomeIcon icon={faShield} />
                            <h3 className="font-bold mt-4">Iron-Rich Diet</h3>
                            <p className="text-[#64748B] font-medium text-sm mt-4">Eat plenty of leafy greens and beans 2 days before donation</p>
                            <button className="mt-4">Read more</button>
                        </div>
                        <div className="p-4 m-4 border-t border-solid border-[#bfc5ce]">
                            <p className="text-[#64748B]">Share your impact</p>
                            <div className="flex gap-4 mt-3">
                                <button className="bg-[#0E1B13] text-white w-[50%] p-1 rounded-xl"><FontAwesomeIcon icon={faFacebook} />Post</button>
                                <button className="bg-[#0E1B13] text-white w-[50%] p-1 rounded-xl"><FontAwesomeIcon icon={faTwitter} />Tweet</button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#0E1B130D] w-full mx-auto border border-solid border-[#cdd1d6] rounded-xl overflow-hidden shadow-md p-6 mt-6">
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faCircleInfo} />
                                <h3 className="text-[#0E1B13] font-bold pl-4">Need Support?</h3>
                            </div>
                            <p className="text-[#64748B] text-sm pt-3">Have questions about your last donation or eligibility? Our medical team is online.</p>
                            <button className="bg-white border-2 border-solid border-[#0E1B13] w-full text-center font-bold p-2 rounded-xl mt-4">Chat with BloodDeck</button>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;