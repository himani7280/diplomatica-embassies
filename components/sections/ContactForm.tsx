"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import type { ContactFormData } from "@/data/siteData";

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

const DEFAULT_FORM: ContactFormData = {
  eyebrow: "Send Us a Message",
  title: "We’d Love to",
  titleAccent: "Hear from You",
  placeholders: {
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    subject: "Subject",
    message: "Your Message",
  },
  buttons: {
    submit: "Send Message",
    submitting: "Sending...",
  },
  errors: {
    name: "Please enter your full name.",
    email: "Please enter a valid email address.",
    phone: "Please enter a valid phone number.",
    subject: "Please add a subject.",
    message: "Please write at least 10 characters.",
  },
  success: {
    title: "Thank you! Your message has been sent successfully.",
    text: "Our consular adviser team will review your enquiry and contact you within 24 hours.",
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

function validate(v: Record<Field, string>, errMsgs: ContactFormData["errors"]): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = errMsgs.name;
  if (!EMAIL_RE.test(v.email.trim())) errors.email = errMsgs.email;
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) errors.phone = errMsgs.phone;
  if (v.subject.trim().length < 2) errors.subject = errMsgs.subject;
  if (v.message.trim().length < 10) errors.message = errMsgs.message;
  return errors;
}

const inputClass =
  "w-full rounded-md border border-[#0c2250]/15 bg-white px-3.5 text-[14px] text-[#0c2250] placeholder:text-[#666d82]/70 outline-none transition focus:border-[#b4841f] focus:ring-4 focus:ring-[#b4841f]/10";

export function ContactForm({ data }: { data?: ContactFormData }) {
  const config = data ?? DEFAULT_FORM;
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

    const found = validate(values, config.errors);
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
      <p role="alert" className="mt-1 text-[14px] text-[#b4841f]">
        {errors[f]}
      </p>
    ) : null;

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
            placeholder={config.placeholders.name}
            aria-label={config.placeholders.name}
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
            placeholder={config.placeholders.email}
            aria-label={config.placeholders.email}
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
            placeholder={config.placeholders.phone}
            aria-label={config.placeholders.phone}
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
            placeholder={config.placeholders.subject}
            aria-label={config.placeholders.subject}
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
          placeholder={config.placeholders.message}
          aria-label={config.placeholders.message}
          rows={2}
          value={values.message}
          onChange={set("message")}
        />
        {fieldError("message")}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group/btn relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-[#0a1a3d] px-6 py-2.5 text-[14px] sm:text-[15px] font-semibold text-[#f0d78c] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] ring-1 ring-[#e2bd5c]/40 transition-colors duration-500 hover:bg-[#e2bd5c] hover:text-[#060f27] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-[#f0d78c]" /> {config.buttons.submitting}
          </>
        ) : (
          <>
            <span>{config.buttons.submit}</span>
            <Send className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
          </>
        )}
        <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
      </button>

      {/* Alert shown directly below the form on submit */}
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent-alert"
            role="alert"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 flex items-start gap-3 rounded-xl border border-emerald-500/40 bg-emerald-50/95 p-4 text-emerald-900 shadow-md backdrop-blur-sm"
          >
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" strokeWidth={2} />
            <div className="flex-1">
              <p className="font-sans text-[15px] font-bold text-emerald-950">
                {config.success.title}
              </p>
              <p className="mt-0.5 text-[14px] text-emerald-800">
                {config.success.text}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              aria-label="Dismiss alert"
              className="text-[15px] font-bold text-emerald-700 hover:text-emerald-950 px-1"
            >
              ✕
            </button>
          </motion.div>
        ) : null}

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
