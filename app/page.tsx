"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("*");

      if (error) {
        console.error(error);
      } else {
        setPosts(data || []);
      }
    }

    loadPosts();
  }, []);

  return (
    <main style={{ padding: "40px" }}>
      <h1>Bounty Board</h1>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ marginBottom: "20px" }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </main>
  );
}