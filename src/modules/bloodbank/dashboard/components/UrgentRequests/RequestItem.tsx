interface Props {
  hospital: string
  request: string
}

export default function RequestItem({
  hospital,
  request
}: Props) {
  return (
    <div className="border border-gray-800 rounded-lg p-4 space-y-2">

      <p className="font-medium">
        {hospital}
      </p>

      <p className="text-sm text-gray-400">
        {request}
      </p>

      <div className="flex gap-2">

        <button className="flex-1 bg-gray-800 rounded-md py-2 text-sm">
          Approve
        </button>

        <button className="flex-1 border border-gray-700 rounded-md py-2 text-sm">
          Details
        </button>

      </div>

    </div>
  )
}