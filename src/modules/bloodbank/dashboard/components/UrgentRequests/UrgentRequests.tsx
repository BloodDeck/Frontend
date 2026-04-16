import Card from "@/shared/components/Card"
import RequestItem from "./RequestItem"

export default function UrgentRequests() {
  return (
    <Card className="space-y-4">

      <h3 className="text-lg font-semibold">
        Urgent Requests
      </h3>

      <RequestItem
        hospital="General Hospital, Ikeja"
        request="5 Units O-Negative"
      />

      <RequestItem
        hospital="Reddington Hospital"
        request="12 Units AB+"
      />

    </Card>
  )
}