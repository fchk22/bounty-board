"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

type Props = {
  questionId: string
}

export default function AnswerForm({ questionId }: Props) {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) return

    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from("answers").insert([
      {
        question_id: questionId,
        content,
        user_id: user?.id,
      },
    ]);

    setLoading(false)

    if (error) {
      alert("Error submitting answer")
      
      console.error("Supabase error:", {
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
        code: error?.code
      })
      return
    }

    setContent("")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <textarea
        className="w-full border rounded p-2"
        rows={4}
        placeholder="Write your answer..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit Answer"}
      </button>
    </form>
  )
}