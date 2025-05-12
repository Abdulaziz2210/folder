"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NavigationButtons from "@/components/navigation-buttons"
import TextAnnotation from "@/components/text-annotation"
import Image from "next/image"

const chartImages = [
  "/images/task1/chart1.png",
  "/images/task1/chart2.png",
  "/images/task1/chart3.png",
  "/images/task1/chart4.png",
  "/images/task1/chart5.png",
  "/images/task1/chart6.png",
]

const chartDescriptions = [
  "The graph shows average carbon dioxide emissions per person in the UK, Sweden, Italy and Portugal between 1967 and 2007.",
  "The chart shows men and women in further education in Britain across three time periods.",
  "The maps show changes in the town of Springer from 1970 until now.",
  "The diagram shows the stages in the recycling of aluminium drinks cans.",
  "The pie charts show ages of populations of Oman and Spain in 2005 and projections for 2055.",
  "The table shows data about underground railway systems in six major cities.",
]

export default function WritingTask1() {
  const router = useRouter()
  const [answer, setAnswer] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [selectedChartIndex, setSelectedChartIndex] = useState(4) // Default to chart5.png

  useEffect(() => {
    const savedAnswer = localStorage.getItem("writingTask1Answer")
    if (savedAnswer) {
      setAnswer(savedAnswer)
      countWords(savedAnswer)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("writingTask1Answer", answer)
  }, [answer])

  const countWords = (text: string) => {
    const words = text.trim().split(/\s+/)
    setWordCount(text.trim() === "" ? 0 : words.length)
  }

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswer = e.target.value
    setAnswer(newAnswer)
    countWords(newAnswer)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Writing Task 1</CardTitle>
          <div className="text-sm text-muted-foreground">Word Count: {wordCount}/150</div>
        </CardHeader>
        <CardContent>
          <TextAnnotation isWritingSection={true}>
            <div className="mb-6 space-y-4">
              <p className="text-lg font-medium">
                {chartDescriptions[selectedChartIndex]} Summarise the information by selecting and reporting the main
                features, and make comparisons where relevant.
              </p>
              <p>Write at least 150 words.</p>
              <div className="flex justify-center my-4">
                <div className="relative w-full max-w-2xl h-[300px]">
                  <Image
                    src={chartImages[selectedChartIndex] || "/placeholder.svg"}
                    alt="Task 1 Chart"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>
            </div>
          </TextAnnotation>

          <Textarea
            placeholder="Write your answer here..."
            className="min-h-[300px] mt-4"
            value={answer}
            onChange={handleAnswerChange}
          />
        </CardContent>
      </Card>

      <NavigationButtons
        previousUrl="/test"
        nextUrl="/writing/task2"
        previousLabel="Previous"
        nextLabel="Next: Task 2"
      />
    </div>
  )
}
