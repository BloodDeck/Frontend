import StatCard from "./StatCard/StatCard"
import {
  Droplet,
  AlertTriangle,
  Calendar,
  BarChart3
} from "lucide-react"

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-4 gap-6">

      <StatCard
        title="Total Units in Stock"
        value="1,248 units"
        icon={<Droplet size={18} />}
      />

      <StatCard
        title="Hospital Requests"
        value="18 pending"
        icon={<AlertTriangle size={18} />}
      />

      <StatCard
        title="Today's Appointments"
        value="24 scheduled"
        icon={<Calendar size={18} />}
      />

      <StatCard
        title="Inventory Health"
        value="Healthy"
        icon={<BarChart3 size={18} />}
      />

    </div>
  )
}