"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AuthForm({
  mode,
  configured,
  nextPath = "/employee/dashboard",
  audience = "employee",
}: {
  mode: "login" | "signup";
  configured: boolean;
  nextPath?: string;
  audience?: "employee" | "admin";
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      router.push(mode === "signup" ? fallbackSignupPath(audience) : nextPath);
      return;
    }

    setPending(true);
    setError("");
    setMessage("");

    if (mode === "login") {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      setPending(false);

      if (authError) {
        setError(authError.message);
        return;
      }

      router.push(nextPath);
      router.refresh();
      return;
    }

    const emailRedirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(fallbackSignupPath(audience))}`;
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo },
    });
    setPending(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    if (data.session) {
      router.push(fallbackSignupPath(audience));
      router.refresh();
    } else {
      setMessage("Check your email to confirm your account, then continue to onboarding.");
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-[2.25rem] border border-espresso/10 bg-white/72 p-6 shadow-soft md:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-bronze">
        {mode === "login" ? "Welcome back" : audience === "admin" ? "Employer access" : "Employee invite"}
      </p>
      <h1 className="mt-4 font-display text-5xl text-espresso">
        {mode === "login" ? "Enter Mavaro." : audience === "admin" ? "Create your admin account." : "Join your employee circle."}
      </h1>
      <p className="mt-4 leading-7 text-espresso/65">
        {configured
          ? mode === "login"
            ? audience === "admin"
              ? "Sign in to manage employee connection programs, circles, events, and feedback."
              : "Sign in to see your employee circle, gatherings, and account."
            : audience === "admin"
              ? "Create an account before your company workspace is approved."
              : "Create an account before completing your employee profile."
          : "Supabase is not configured, so this workspace will continue in private demo mode."}
      </p>

      <form className="mt-7 space-y-4" onSubmit={submit}>
        <div>
          <label className="label" htmlFor={`${mode}-email`}>Email</label>
          <input
            id={`${mode}-email`}
            className="input"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={!configured}
          />
        </div>
        <div>
          <label className="label" htmlFor={`${mode}-password`}>Password</label>
          <input
            id={`${mode}-password`}
            className="input"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={!configured}
          />
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "One moment..." : configured ? (mode === "login" ? "Sign in" : "Create account") : "Continue in demo mode"}
        </Button>
      </form>

      {message ? <p className="mt-4 text-sm leading-6 text-olive">{message}</p> : null}
      {error ? <p className="mt-4 text-sm leading-6 text-wine" role="alert">{error}</p> : null}

      <p className="mt-6 text-center text-sm text-espresso/60">
        {mode === "login" ? (
          <>New to Mavaro? <a className="font-semibold text-espresso underline underline-offset-4" href={audience === "admin" ? "/admin/signup" : "/employee/signup"}>Create an account</a></>
        ) : (
          <>Already have access? <a className="font-semibold text-espresso underline underline-offset-4" href={audience === "admin" ? "/admin/login" : "/employee/login"}>Sign in</a></>
        )}
      </p>
    </div>
  );
}

function fallbackSignupPath(audience: "employee" | "admin") {
  return audience === "admin" ? "/admin/request-access" : "/employee/onboarding";
}
