import Card from "@/shared/components/Card"
import { StatCardProps } from "./types"

export default function StatCard({
  title,
  value,
  icon,
  description,
  footer
}: StatCardProps) {
  return (
    <Card className="flex flex-col gap-4">

      <div className="flex items-center gap-3">

        <div className="h-10 w-10 flex items-center justify-center rounded-md bg-gray-800">
          {icon}
        </div>

        <p className="text-sm text-gray-400">{title}</p>

      </div>

      <div>

        <p className="text-3xl font-semibold text-white">
          {value}
        </p>

        {description && (
          <p className="text-sm text-gray-400">
            {description}
          </p>
        )}

      </div>

      {footer && (
        <div>{footer}</div>
      )}

    </Card>
  )
}