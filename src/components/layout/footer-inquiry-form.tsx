"use client";

import { useState, type FormEvent } from "react";

export type InquiryDraft = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function buildInquiryMailto(recipient: string, draft: InquiryDraft) {
  const params = new URLSearchParams({
    subject: `Website inquiry: ${draft.subject.trim()}`,
    body: [
      `Name: ${draft.name.trim()}`,
      `Email: ${draft.email.trim()}`,
      "",
      "Message:",
      draft.message.trim(),
    ].join("\n"),
  });
  return `mailto:${recipient}?${params.toString()}`;
}

export function FooterInquiryForm({ recipient }: { recipient: string }) {
  const [status, setStatus] = useState("");

  function openEmailDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    window.location.href = buildInquiryMailto(recipient, {
      name: String(values.get("name") ?? ""),
      email: String(values.get("email") ?? ""),
      subject: String(values.get("subject") ?? ""),
      message: String(values.get("message") ?? ""),
    });
    setStatus(
      "Your email app should open with a draft. This website has not sent your message. If it does not open, email SEVA directly using the address beside this form.",
    );
  }

  return (
    <form
      className="footer-inquiry"
      aria-labelledby="footer-inquiry-title"
      onSubmit={openEmailDraft}
    >
      <p className="footer-inquiry__intro">
        Send an inquiry through your email app.
      </p>
      <p className="footer-inquiry__notice">
        This opens a draft in your email app. The website does not send or store
        your inquiry.
      </p>
      <div className="footer-inquiry__fields">
        <label>
          <span>Name</span>
          <input
            autoComplete="name"
            name="name"
            type="text"
            required
            maxLength={120}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            autoComplete="email"
            name="email"
            type="email"
            required
            maxLength={254}
          />
        </label>
        <label className="footer-inquiry__wide">
          <span>Subject</span>
          <input name="subject" type="text" required maxLength={160} />
        </label>
        <label className="footer-inquiry__wide">
          <span>Message</span>
          <textarea name="message" required rows={3} maxLength={2000} />
        </label>
      </div>
      <button className="footer-inquiry__submit" type="submit">
        Continue in email app
      </button>
      <p className="footer-inquiry__status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
