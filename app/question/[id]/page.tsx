"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function QuestionPage({ params }: any) {
  const [question, setQuestion] = useState<any>(null);

  useEffect(() => {
    async function loadQuestion() {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setQuestion(data);
      }
    }

    loadQuestion();
  }, []);

  if (!question) return <p>Loading...</p>;

  return (
    <main style={{ padding: "40px" }}>
      <h1>{question.title}</h1>
      <p>{question.description}</p>
      <p><b>Bounty:</b> {question.bounty} BC</p>
    </main>
  );
}