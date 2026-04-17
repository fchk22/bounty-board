"use client";

import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Login</h1>

      <button
        onClick={loginWithGoogle}
        style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: "6px",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}