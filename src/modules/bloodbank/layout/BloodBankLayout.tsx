import { Outlet } from "react-router-dom"
import BloodBankSidebar from "./BloodBankSidebar"

export default function BloodBankLayout() {
  return (
    <div className="flex min-h-screen bg-[#121212] text-gray-200">
      <BloodBankSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  )
}