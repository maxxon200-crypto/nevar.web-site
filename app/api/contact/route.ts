import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  nome?: string;
  email?: string;
  tipo?: string;
  budget?: string;
  messaggio?: string;
  website?: string; // honeypot
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const DEST = "nevar.web@gmail.com";

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "bad_request" },
      { status: 400 }
    );
  }

  const nome = (data.nome ?? "").trim();
  const email = (data.email ?? "").trim();
  const tipo = (data.tipo ?? "").trim();
  const budget = (data.budget ?? "").trim();
  const messaggio = (data.messaggio ?? "").trim();

  // Honeypot: bots fill hidden fields. Pretend success, send nothing.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  if (
    nome.length < 2 ||
    !EMAIL_RE.test(email) ||
    messaggio.length < 10 ||
    nome.length > 120 ||
    email.length > 160 ||
    messaggio.length > 5000
  ) {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM || "nevar.web <onboarding@resend.dev>";

  // No provider configured: tell the client to use the mailto fallback.
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "email_not_configured" },
      { status: 200 }
    );
  }

  const text = [
    "Nuova richiesta dal sito nevar.web",
    "",
    `Nome: ${nome}`,
    `Email: ${email}`,
    `Tipo progetto: ${tipo || "non indicato"}`,
    `Budget indicativo: ${budget || "non indicato"}`,
    "",
    "Messaggio:",
    messaggio,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [DEST],
        reply_to: email,
        subject: `Richiesta preventivo (${tipo || "progetto"}): ${nome}`,
        text,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "send_failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 502 }
    );
  }
}
