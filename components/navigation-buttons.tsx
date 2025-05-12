"\"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NavigationButtonsProps {
  previousUrl?: string
  nextUrl?: string
  previousLabel?: string
  nextLabel?: string
}

export default function NavigationButtons({
  previousUrl,
  nextUrl,
  previousLabel = "Previous",
  nextLabel = "Next",
}: NavigationButtonsProps) {
  const router = useRouter()

  return (
    <div className="flex justify-between items-center w-full mt-6 mb-4">
      <div>
        {previousUrl && (
          <Button variant="outline" onClick={() => router.push(previousUrl)} className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            {previousLabel}
          </Button>
        )}
      </div>

      <div>
        {nextUrl && (
          <Button onClick={() => router.push(nextUrl)} className="flex items-center gap-2">
            {nextLabel}
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
