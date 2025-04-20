import { Sparkles } from "lucide-react"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="bg-gradient-to-br from-brand-blue to-brand-green rounded-full p-1.5 ai-glow">
          <div className={`flex items-center justify-center text-white font-bold ${sizeClasses[size]}`}>DP</div>
        </div>
        <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-brand-green" />
      </div>

      {showText && (
        <div className={`font-heading font-bold ${textSizeClasses[size]}`}>
          <span>DEX</span>
          <span className="text-brand-blue">PRICE</span>
          <span className="ai-gradient-text ml-1">AI</span>
        </div>
      )}
    </div>
  )
}
