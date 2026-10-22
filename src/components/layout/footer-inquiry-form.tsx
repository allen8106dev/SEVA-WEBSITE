"use client";

import { useState, type FormEvent } from "react";

export type InquiryDraft = {
  name: string;
  email: string;
  message: string;
};

export function buildInquiryMailto(recipient: string, draft: InquiryDraft) {
  const params = new URLSearchParams({
    subject: "Website inquiry",
    body: [
      `Name: ${draft.name.trim()}`,
      `Email: ${draft.email.trim()}`,
      "",
      draft.message.trim(),
    ].join("\n"),
  });
  return `mailto:${recipient}?${params.toString()}`;
}

export function FooterInquiryForm({ recipient }: { recipient: string }) {
  const [status, setStatus] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  function openEmailDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    window.location.href = buildInquiryMailto(recipient, {
      name: String(values.get("name") ?? ""),
      email: String(values.get("email") ?? ""),
      message: String(values.get("message") ?? ""),
    });
    setStatus(
      `Your email app should open with a prepared draft. This website has not sent your inquiry. If it does not open, email ${recipient} directly.`,
    );
  }

  return (
    <form
      className="footer-inquiry"
      aria-labelledby="footer-inquiry-title"
      onSubmit={openEmailDraft}
    >
      <p className="footer-inquiry__notice">
        Submit opens a draft in your email app. This website does not send
        messages.
      </p>
      <div className="footer-inquiry__contact-fields">
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
      </div>
      <label className="footer-inquiry__message">
        <span className="footer-inquiry__message-heading">
          <span>Message</span>
          <span className="footer-inquiry__count" aria-hidden="true">
            {messageLength} / 180
          </span>
        </span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={180}
          onChange={(event) =>
            setMessageLength(event.currentTarget.value.length)
          }
        />
      </label>
      <button className="footer-inquiry__submit" type="submit">
        Submit
      </button>
      <p className="footer-inquiry__status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
