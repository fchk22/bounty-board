"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    async function loadQuestions() {
      const { data, error } = await supabase
        .from("questions")
        .select("*");

      if (error) {
        console.error(error);
      } else {
        setQuestions(data || []);
      }
    }

    loadQuestions();
  }, []);

  return (
    <main style={{ padding: "40px" }}>
      <h1>Bounty Board</h1>

      {questions.length === 0 ? (
        <p>No questions yet.</p>
      ) : (
        questions.map((q) => (
          <div key={q.id} style={{ marginBottom: "20px" }}>
            <h3>{q.title}</h3>
            <p>{q.description}</p>
          </div>
        ))
      )}
    </main>
  );
}