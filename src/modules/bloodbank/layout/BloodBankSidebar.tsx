import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Archive,
  Droplet,
  Users,
  Settings,
  LogOut
} from "lucide-react"

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/bloodbank/dashboard",
  },
  {
    label: "Inventory",
    icon: Archive,
    path: "/bloodbank/inventory",
  },
  {
    label: "Donations",
    icon: Droplet,
    path: "/bloodbank/donations",
  },
  {
    label: "Donors",
    icon: Users,
    path: "/bloodbank/donors",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/bloodbank/settings",
  },
]

export default function BloodBankSidebar() {
  return (
    <aside className="w-[260px] border-r border-gray-800 bg-[#1c1c1c] flex flex-col">

      {/* Logo */}

      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-800">

        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-700">
          🩸
        </div>

        <div>
          <p className="font-semibold">Lagos Blood Bank</p>
          <p className="text-xs text-gray-400">Admin Portal</p>
        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6 space-y-1">

        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-sm transition
                 ${
                   isActive
                     ? "bg-gray-800 text-white"
                     : "text-gray-400 hover:bg-gray-800 hover:text-white"
                 }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          )
        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-gray-800 p-4">
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
          <LogOut size={16} />
          Logout
        </button>
      </div>

    </aside>
  )
}