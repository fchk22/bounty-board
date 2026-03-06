"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bounty, setBounty] = useState(0);

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

  async function submitQuestion() {
    const { error } = await supabase.from("questions").insert([
      {
        title: title,
        description: description,
        bounty: bounty
      }
    ]);

    if (error) {
      console.error(error);
    } else {
      setTitle("");
      setDescription("");
      setBounty(0);
      loadQuestions();
    }
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  return (
    <main style={{ padding: "40px" }}>
      <h1>Bounty Board v1.1</h1>

      <h2>Ask Question</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Bounty"
        value={bounty}
        onChange={(e) => setBounty(Number(e.target.value))}
      />

      <br /><br />

      <button onClick={submitQuestion}
        style={{
          padding: "10px 20px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        Submit Question
      </button>

      <hr />

      <h2>Questions</h2>

      {questions.length === 0 ? (
        <p>No questions yet.</p>
      ) : (
        questions.map((q) => (
          <div key={q.id} style={{ marginBottom: "20px" }}>
            <h3>{q.title}</h3>
            <p>{q.description}</p>
            <p><b>Bounty:</b> {q.bounty} BC</p>
          </div>
        ))
      )}
    </main>
  );
}