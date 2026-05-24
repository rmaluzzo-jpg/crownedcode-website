import { Resend } from "resend";
import { SITE } from "./utils";

type LeadPayload = {
  name: string;
  company?: string;
  email: string;
  message: string;
};

let cached: Resend | null = null;
function client(): Resend | null {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  cached = new Resend(key);
  return cached;
}

export async function sendLeadNotification(lead: LeadPayload) {
  const c = client();
  const to = process.env.LEADS_NOTIFY_TO || SITE.email;
  const from =
    process.env.RESEND_FROM || `Crowned Code <noreply@crownedcode.com>`;

  if (!c) {
    console.log("[lead-email] RESEND_API_KEY not set, skipping send", { to, lead });
    return { ok: false, skipped: true };
  }

  const html = `
    <div style="font-family:-apple-system,Inter,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0a0a0a;">
      <h2 style="margin:0 0 16px;font-size:20px;">New lead — ${escape(lead.name)}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#666;width:120px;">Name</td><td>${escape(lead.name)}</td></tr>
        <tr><td style="padding:6px 0;color:#666;">Company</td><td>${escape(lead.company ?? "—")}</td></tr>
        <tr><td style="padding:6px 0;color:#666;">Email</td><td><a href="mailto:${escape(lead.email)}">${escape(lead.email)}</a></td></tr>
      </table>
      <h3 style="margin:24px 0 8px;font-size:15px;">Message</h3>
      <div style="white-space:pre-wrap;padding:16px;background:#f6f6f6;border-radius:8px;font-size:14px;line-height:1.6;">${escape(lead.message)}</div>
    </div>
  `;

  try {
    const result = await c.emails.send({
      from,
      to,
      replyTo: lead.email,
      subject: `New lead: ${lead.name}${lead.company ? ` — ${lead.company}` : ""}`,
      html,
    });
    return { ok: !result.error, error: result.error };
  } catch (e) {
    return { ok: false, error: e };
  }
}

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
