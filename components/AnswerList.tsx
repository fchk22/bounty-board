"use client"

import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Answer = {
  id: string
  content: string
  created_at: string
  accepted: boolean
  question_id: string
}

type Props = {
  answers: Answer[]
  questionOwnerId: string
}

export default function AnswerList({ answers, questionOwnerId }: Props) {
  const router = useRouter()

  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setCurrentUserId(data.user?.id ?? null)
    }

    getUser()
  }, [])

  console.log("currentUserId:", currentUserId)
  console.log("questionOwnerId:", questionOwnerId)

  const acceptAnswer = async (answerId: string) => {

    console.log("Accept button clicked:", answerId)
    
    if (!answers.length) return

    // remove previous accepted answer
    await supabase
      .from("answers")
      .update({ accepted: false })
      .eq("question_id", answers[0].question_id)

    // accept selected answer
    const { data, error } = await supabase
    .from("answers")
    .update({ accepted: true })
    .eq("id", answerId)
    .select()

    console.log("update result:", data)
    console.log("update error:", error)

    if (error) {
      console.error(error)
      alert("Error accepting answer")
      return
    }

    router.refresh()
  }

  if (!answers || answers.length === 0) {
    return <p className="mt-4 text-gray-500">No answers yet.</p>
  }

  return (
    <div className="mt-4 space-y-3">
      {answers.map((answer) => (
        <div
          key={answer.id}
          className={`border rounded p-3 ${
            answer.accepted
              ? "bg-green-100 border-green-500"
              : "bg-gray-50"
          }`}
        >
          {answer.accepted && (
            <p className="text-green-700 font-semibold mb-2">
              ✔ Accepted Answer
            </p>
          )}

          <p>{answer.content}</p>

          <p className="text-sm text-gray-500" suppressHydrationWarning>
            {new Date(answer.created_at).toLocaleString()}
          </p>

          {!answer.accepted && currentUserId === questionOwnerId && (
            <button
              onClick={() => acceptAnswer(answer.id)}
              className="mt-3 text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded cursor-pointer transition"
            >
              Accept Answer
            </button>
          )}
        </div>
      ))}
    </div>
  )
}