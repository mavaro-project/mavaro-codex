import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase server persistence is not configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  if (!isValidLead(body)) {
    return NextResponse.json({ error: "Please complete every field with a valid work email." }, { status: 400 });
  }

  const { error } = await supabase.from("pilot_requests").insert({
    full_name: body.fullName.trim(),
    work_email: body.workEmail.trim().toLowerCase(),
    company_name: body.companyName.trim(),
    company_size: body.companySize,
    city: body.city.trim(),
    title: body.title.trim(),
    primary_goal: body.primaryGoal,
    workplace_model: body.workplaceModel,
    message: body.message.trim() || null,
  });

  if (error) return NextResponse.json({ error: "The pilot request could not be saved." }, { status: 500 });
  return NextResponse.json({ ok: true });
}

function isValidLead(value: unknown): value is {
  fullName: string;
  workEmail: string;
  companyName: string;
  companySize: string;
  city: string;
  title: string;
  primaryGoal: string;
  workplaceModel: string;
  message: string;
} {
  if (!value || typeof value !== "object") return false;
  const lead = value as Record<string, unknown>;
  const required = ["fullName", "workEmail", "companyName", "companySize", "city", "title", "primaryGoal", "workplaceModel"];
  if (!required.every((key) => typeof lead[key] === "string" && String(lead[key]).trim().length > 0)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(lead.workEmail)) && required.every((key) => String(lead[key]).length <= 200);
}
