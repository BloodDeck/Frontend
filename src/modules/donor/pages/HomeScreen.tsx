import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDroplet, faAward, faDroplet } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import logoWhite from "../../../assets/images/blood_drop_bg.png";

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
                            <FontAwesomeIcon icon={faAward} className="text-yellow-400" />
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
                <div className="bg-white blur-effect backdrop-blur-md rounded-xl p-4 border border-solid border-[#E2E8F0] shadow-md">
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
                <div className="bg-white blur-effect backdrop-blur-md rounded-xl p-4 border border-solid border-[#E2E8F0] shadow-md">
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
                <div className="bg-white blur-effect backdrop-blur-md rounded-xl p-4 border border-solid border-[#E2E8F0] shadow-md">
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
        </div>
    ) 
}

export default HomeScreen;