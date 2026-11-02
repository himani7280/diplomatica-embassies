"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

type Field = "name" | "email" | "phone" | "subject" | "message";
type Errors = Partial<Record<Field | "form", string>>;

const EMPTY: Record<Field, string> = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

function validate(v: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_RE.test(v.email.trim())) errors.email = "Please enter a valid email address.";
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) errors.phone = "Please enter a valid phone number.";
  if (v.subject.trim().length < 2) errors.subject = "Please add a subject.";
  if (v.message.trim().length < 10) errors.message = "Please write at least 10 characters.";
  return errors;
}

const inputClass =
  "w-full rounded-md border border-[#0c2250]/15 bg-white px-3.5 text-[14px] text-[#0c2250] placeholder:text-[#666d82]/70 outline-none transition focus:border-[#b4841f] focus:ring-4 focus:ring-[#b4841f]/10";

export function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const set = (field: Field) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrors({});

    const form = new FormData(e.currentTarget);
    if (String(form.get("company") ?? "").trim() !== "") {
      setValues(EMPTY);
      setStatus("sent");
      return;
    }

    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus("idle");
      return;
    }
    setValues(EMPTY);
    setStatus("sent");
  }

  const fieldError = (f: Field) =>
    errors[f] ? (
      <p role="alert" className="mt-1 text-[12px] text-[#b4841f]">
        {errors[f]}
      </p>
    ) : null;

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" strokeWidth={1.5} />
        </span>
        <h3 className="font-[family-name:Playfair_Display,Georgia,serif] text-2xl font-bold text-[#0c2250]">Thank you!</h3>
        <p className="text-[#666d82]">
          Your message has been received. Our team will get back to you within{" "}
          <strong className="text-[#0c2250]">24 hours</strong>.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="font-semibold text-[#b4841f] underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-2.5">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-2.5 sm:grid-cols-2">
        <div>
          <input
            className={cn(inputClass, "h-10 sm:h-10.5", errors.name && "border-[#b4841f]")}
            type="text"
            name="name"
            placeholder="Full Name"
            aria-label="Full Name"
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
          />
          {fieldError("name")}
        </div>
        <div>
          <input
            className={cn(inputClass, "h-10 sm:h-10.5", errors.email && "border-[#b4841f]")}
            type="email"
            name="email"
            placeholder="Email Address"
            aria-label="Email Address"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
          />
          {fieldError("email")}
        </div>
        <div>
          <input
            className={cn(inputClass, "h-10 sm:h-10.5", errors.phone && "border-[#b4841f]")}
            type="tel"
            name="phone"
            placeholder="Phone Number"
            aria-label="Phone Number"
            autoComplete="tel"
            value={values.phone}
            onChange={set("phone")}
          />
          {fieldError("phone")}
        </div>
        <div>
          <input
            className={cn(inputClass, "h-10 sm:h-10.5", errors.subject && "border-[#b4841f]")}
            type="text"
            name="subject"
            placeholder="Subject"
            aria-label="Subject"
            value={values.subject}
            onChange={set("subject")}
          />
          {fieldError("subject")}
        </div>
      </div>

      <div>
        <textarea
          className={cn(inputClass, "min-h-[70px] resize-none py-2 text-[14px]", errors.message && "border-[#b4841f]")}
          name="message"
          placeholder="Your Message"
          aria-label="Your Message"
          rows={2}
          value={values.message}
          onChange={set("message")}
        />
        {fieldError("message")}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-md bg-gradient-to-b from-[#e2bd5c] to-[#b98a28] px-6 py-2.5 text-sm font-semibold text-[#060f27] shadow-[0_8px_20px_-6px_rgba(185,138,40,0.5)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>

      <AnimatePresence mode="wait">
        {errors.form ? (
          <motion.div
            key="error"
            role="alert"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 rounded-md border border-[#b4841f]/30 bg-[#fbf6e8] p-4 text-[#8f6a1a]"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-[15px]">{errors.form}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
