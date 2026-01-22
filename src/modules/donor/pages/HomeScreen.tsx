import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDroplet, faAward } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import logoWhite from "../../../assets/images/blood_drop_bg.png";

const HomeScreen = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Card */}
            <section className="relative bg-linear-to-r from-[#040E08] via-[#2E2C2C] to-[#4C4747] text-white w-[72%] mx-auto rounded-xl p-6 mb-8 shadow-md overflow-hidden">
                <img src={logoWhite} alt="Blood Drop Background" className="absolute -top-36 -right-25 w-50 object-contain pointer-events-none" />
                <h1 className="text-white text-3xl font-black">Welcome back, Hero! 🩸</h1>
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
                <div className="bg-white/20 blur-effect backdrop-blur-md rounded-xl p-4 border border-solid border-white/20">
                    <h3 className="text-white font-bold text-lg">How to Donate</h3>
                    <p className="text-white/80 mt-2">Learn about the donation process and what to expect.</p>
                </div>
                {/* Info Card 2 */}
                <div className="bg-white/20 blur-effect backdrop-blur-md rounded-xl p-4 border border-solid border-white/20">
                    <h3 className="text-white font-bold text-lg">Blood Types</h3>
                    <p className="text-white/80 mt-2">Understand the different blood types and their compatibility.</p>
                </div>
                {/* Info Card 3 */}
                <div className="bg-white/20 blur-effect backdrop-blur-md rounded-xl p-4 border border-solid border-white/20">
                    <h3 className="text-white font-bold text-lg">FAQs</h3>
                    <p className="text-white/80 mt-2">Find answers to common questions about blood donation.</p>
                </div>
            </div>
        </div>
    ) 
}

export default HomeScreen;