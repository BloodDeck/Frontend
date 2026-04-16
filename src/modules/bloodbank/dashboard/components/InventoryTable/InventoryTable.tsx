import Card from "@/shared/components/Card"
import InventoryRow from "./InventoryRow"

export default function InventoryTable() {
  return (
    <Card>

      <h3 className="text-lg font-semibold mb-4">
        Inventory Detail
      </h3>

      <table className="w-full text-sm">

        <thead className="text-gray-400 border-b border-gray-800">
          <tr>
            <th className="text-left py-2">Blood Type</th>
            <th className="text-left py-2">Units</th>
            <th className="text-left py-2">Expiry</th>
            <th className="text-left py-2">Screening</th>
          </tr>
        </thead>

        <tbody>

          <InventoryRow type="A+" units="42" expiry="2023-11-28" status="Cleared" />
          <InventoryRow type="O-" units="08" expiry="2023-10-31" status="Cleared" />
          <InventoryRow type="B+" units="115" expiry="2023-12-05" status="Testing" />
          <InventoryRow type="AB-" units="04" expiry="2023-10-24" status="Rejected" />

        </tbody>

      </table>

    </Card>
  )
}