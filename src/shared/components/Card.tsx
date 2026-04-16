import { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-800 bg-[#1c1c1c] p-5 shadow-sm ${className}`}
    >
      {children}
    </div>
  )
}