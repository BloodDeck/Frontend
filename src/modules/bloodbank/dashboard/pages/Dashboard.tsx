import DashboardStats from "../components/DashboardStats"
import InventoryTable from "../components/InventoryTable/InventoryTable"
import UrgentRequests from "../components/UrgentRequests/UrgentRequests"

export default function Dashboard() {
  return (
    <div className="space-y-6">

      <DashboardStats />

      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2">
          <InventoryTable />
        </div>

        <UrgentRequests />

      </div>

    </div>
  )
}