import { Leaf } from "lucide-react"

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-green-600 rounded-full opacity-20 animate-pulse"></div>
      <div className="relative bg-green-600 text-white p-1.5 rounded-full flex items-center justify-center">
        <Leaf className="h-full w-full" />
      </div>
    </div>
  )
}
