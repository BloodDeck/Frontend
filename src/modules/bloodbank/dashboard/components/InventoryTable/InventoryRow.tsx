interface Props {
  type: string
  units: string
  expiry: string
  status: string
}

export default function InventoryRow({
  type,
  units,
  expiry,
  status
}: Props) {
  return (
    <tr className="border-b border-gray-800">

      <td className="py-3 text-red-400 font-medium">{type}</td>

      <td>{units}</td>

      <td>{expiry}</td>

      <td>
        <span className="text-xs bg-gray-800 px-2 py-1 rounded">
          {status}
        </span>
      </td>

    </tr>
  )
}