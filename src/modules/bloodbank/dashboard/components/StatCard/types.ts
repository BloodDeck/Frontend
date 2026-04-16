import { ReactNode } from "react"

export interface StatCardProps {
  title: string
  value: string
  icon: ReactNode
  description?: string
  footer?: ReactNode
}