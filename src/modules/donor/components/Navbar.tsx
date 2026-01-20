import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import user_icon from "../../../assets/images/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
const navLinks = [
    {href: "/donor", label: "Home"},
    {href: "/donor/locate-and-book", label: "Find a Center"},
    {href: "", label: "My Appointment"},
    {href: "", label: "My Rewards"},
    {href: "", label: "My Impact"}
]

const Navbar = () => {
    const navLinkStyles = ({ isActive }: { isActive: boolean }) => ({
            fontWeight: isActive ? '800' : '500'
        });

        return (
            <header className="fixed top-0 w-full bg-donor-card border-donor-border shadow-md">
                <nav className="container mx-auto flex justify-between items-center py-2 px-0 backdrop-blur-md border-b border-donor-border">
                <NavLink to="/donor">
                    <img src={logo} alt="Logo" className="w-16" />
                </NavLink>
                <div className="flex items-center gap-10">
                    {navLinks.map((link, index) => (
                        <NavLink key={index} to={link.href} style={navLinkStyles}>
                            {link.label}
                        </NavLink>
                    ))}
                </div>
                <div className="flex justify-between items-center gap-3">
                    <button className="bg-donor-primary text-white px-4 py-2 rounded-xl font-medium">Donate Now</button>
                    <button className="bg-[#F3F4F6] px-4 py-2 rounded-xl"><FontAwesomeIcon icon={faBell} /></button>
                    <img src={user_icon} alt="User Icon" className="w-8 h-8 rounded-full" />
                </div>
            </nav>
        </header>
    );
}

export default Navbar;