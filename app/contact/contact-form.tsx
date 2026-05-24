"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="relative overflow-hidden rounded-3xl border border-border bg-card p-10"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[5000px]"
        aria-hidden
      />

      <Field label="Your name" name="name" placeholder="Jane Doe" required />
      <Field label="Company" name="company" placeholder="Acme Corp" />
      <Field label="Email" name="email" type="email" placeholder="jane@acme.com" required />
      <Field
        label="What are you trying to build?"
        name="message"
        as="textarea"
        rows={5}
        placeholder="A short paragraph about the problem, the timeline, and what you've tried so far."
        required
      />

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-full rounded-xl bg-gold px-6 py-3.5 text-[15px] font-semibold text-black transition-all hover:-translate-y-px hover:bg-gold-light hover:shadow-[0_8px_24px_rgba(201,168,76,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending..." : "Send message"}
      </button>

      {state.status === "success" && (
        <p className="mt-4 rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-3 text-center text-sm text-green-300">
          {state.message ?? "Message sent."}
        </p>
      )}
      {state.status === "error" && (
        <p className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-center text-sm text-red-300">
          {state.message}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  as = "input",
  rows,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
  placeholder?: string;
  required?: boolean;
}) {
  const className =
    "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-gold/45";
  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="mb-2 block text-[13px] font-semibold tracking-wide text-text-secondary"
      >
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          required={required}
          className={`${className} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={className}
        />
      )}
    </div>
  );
}
