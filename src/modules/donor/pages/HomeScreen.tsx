import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDroplet } from "@fortawesome/free-solid-svg-icons";

const HomeScreen = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Card */}
            <section className="bg-linear-to-r from-[#040E08] via-[#2E2C2C] to-[#4C4747] text-white w-[72%] mx-auto rounded-xl p-6 mb-8 shadow-md">
                <h1 className="text-white text-3xl font-black">Welcome back, Hero! 🩸</h1>
                <div className="flex mt-4 gap-10 justify-between items-center">
                    <p className="text-white/80 w-[36%] leading-relaxed">Your contributions have directly saved lives in Lagos. Keep going, your next donation can be someone's second chance.</p>
                    <button className="bg-white text-[#242824] px-6 py-3.5 rounded-xl font-bold text-center flex items-center gap-2"><FontAwesomeIcon icon={faHandHoldingDroplet} />Donate Now</button>
                </div>
                {/* Stats Cards */}
                <div>
                    {/* LifePoint Card */}
                </div>
            </section>
        </div>
    ) 
}

export default HomeScreen;