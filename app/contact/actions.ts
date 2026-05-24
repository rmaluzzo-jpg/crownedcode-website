"use server";

import { getDb, schema } from "@/db/client";
import { sendLeadNotification } from "@/lib/email";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { status: "success" };
  }

  const name = (formData.get("name") || "").toString().trim();
  const company = (formData.get("company") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const message = (formData.get("message") || "").toString().trim();

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Name, email, and message are required.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That email doesn't look right." };
  }

  if (message.length > 5000) {
    return { status: "error", message: "Message too long. Keep it under 5000 characters." };
  }

  const lead = {
    name,
    company: company || undefined,
    email,
    message,
  };

  const db = getDb();
  if (db) {
    try {
      await db.insert(schema.leads).values({
        name,
        company: company || null,
        email,
        message,
        source: "contact_form",
      });
    } catch (e) {
      console.error("[lead] failed to insert", e);
    }
  } else {
    console.log("[lead] DATABASE_URL not set, skipping insert", lead);
  }

  await sendLeadNotification(lead);

  return {
    status: "success",
    message: "Thanks — we'll be in touch within one business day.",
  };
}
