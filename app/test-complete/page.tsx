"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function TestCompletePage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user completed the test
    const task1Answer = localStorage.getItem("writingTask1Answer")
    const task2Answer = localStorage.getItem("writingTask2Answer")

    if (!task1Answer && !task2Answer) {
      router.push("/")
      return
    }

    // Send results to Telegram
    sendResultsToTelegram(task1Answer || "", task2Answer || "")

    // Clear test data after 5 seconds
    const timer = setTimeout(() => {
      localStorage.removeItem("writingTask1Answer")
      localStorage.removeItem("writingTask2Answer")
      localStorage.removeItem("writingTask1TopicIndex")
      localStorage.removeItem("writingTask2TopicIndex")
      sessionStorage.removeItem("isLoggedIn")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  const sendResultsToTelegram = async (task1Answer: string, task2Answer: string) => {
    try {
      const studentName = sessionStorage.getItem("currentUser") || "Unknown Student"

      // Calculate word counts
      const task1Words = task1Answer.split(/\s+/).filter((word) => word.length > 0).length
      const task2Words = task2Answer.split(/\s+/).filter((word) => word.length > 0).length

      const message = `
📊 *IELTS Test Results*

👤 *Student*: ${studentName}

✍️ *Writing Task 1*:
Words: ${task1Words}
Content: "${task1Answer.substring(0, 200)}${task1Answer.length > 200 ? "..." : ""}"

✍️ *Writing Task 2*:
Words: ${task2Words}
Content: "${task2Answer.substring(0, 200)}${task2Answer.length > 200 ? "..." : ""}"

⏰ *Completed*: ${new Date().toLocaleString()}
      `

      // Log results to console as a reliable fallback
      console.log("========== TEST RESULTS ==========")
      console.log(message)
      console.log("==================================")

      // Send to API endpoint
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        console.error("Failed to send results to Telegram")
      }
    } catch (error) {
      console.error("Error sending results:", error)
    }
  }

  const handleReturnHome = () => {
    // Clear any remaining test data
    localStorage.removeItem("writingTask1Answer")
    localStorage.removeItem("writingTask2Answer")
    localStorage.removeItem("writingTask1TopicIndex")
    localStorage.removeItem("writingTask2TopicIndex")
    sessionStorage.removeItem("isLoggedIn")

    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold">Test Complete</CardTitle>
          <CardDescription>Your test has been completed and results submitted</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Thank you for completing the IELTS test. Your results have been submitted successfully.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You will be redirected to the home page in a few seconds.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleReturnHome} className="w-full">
            Go to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
