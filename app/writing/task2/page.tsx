"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NavigationButtons from "@/components/navigation-buttons"
import TextAnnotation from "@/components/text-annotation"
import { writingTask2Topics } from "@/components/writing-task-data"

export default function WritingTask2() {
  const [answer, setAnswer] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [topicIndex, setTopicIndex] = useState(0)

  useEffect(() => {
    const savedAnswer = localStorage.getItem("writingTask2Answer")
    if (savedAnswer) {
      setAnswer(savedAnswer)
      countWords(savedAnswer)
    }

    const savedTopicIndex = localStorage.getItem("writingTask2TopicIndex")
    if (savedTopicIndex) {
      setTopicIndex(Number.parseInt(savedTopicIndex))
    } else {
      const randomIndex = Math.floor(Math.random() * writingTask2Topics.length)
      setTopicIndex(randomIndex)
      localStorage.setItem("writingTask2TopicIndex", randomIndex.toString())
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("writingTask2Answer", answer)
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

  const currentTopic = writingTask2Topics[topicIndex]

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Writing Task 2</CardTitle>
          <div className="text-sm text-muted-foreground">Word Count: {wordCount}/250</div>
        </CardHeader>
        <CardContent>
          <TextAnnotation isWritingSection={true}>
            <div className="mb-6 space-y-4">
              <p className="text-lg font-medium">{currentTopic}</p>
              <p>
                Write at least 250 words. Give reasons for your answer and include any relevant examples from your own
                knowledge or experience.
              </p>
            </div>
          </TextAnnotation>

          <Textarea
            placeholder="Write your answer here..."
            className="min-h-[400px] mt-4"
            value={answer}
            onChange={handleAnswerChange}
          />
        </CardContent>
      </Card>

      <NavigationButtons
        previousUrl="/writing/task1"
        nextUrl="/test-complete"
        previousLabel="Previous: Task 1"
        nextLabel="Complete Test"
      />
    </div>
  )
}
