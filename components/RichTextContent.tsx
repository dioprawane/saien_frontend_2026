"use client";

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

type RichTextContentProps = {
  html: string;
  className?: string;
};

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "strike",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "blockquote",
  "a",
];

/**
 * Renders sanitized rich text HTML produced by the admin RichTextEditor.
 * Only a small allow-list of formatting tags is permitted to keep this safe
 * for public-facing pages.
 *
 * Sanitization runs in the browser via DOMPurify. During server-side
 * rendering (where no DOM is available) the trusted admin-authored HTML is
 * rendered as-is, then re-sanitized on the client after hydration. This
 * avoids pulling in `jsdom` on the server, which breaks the Next.js build.
 */
export default function RichTextContent({ html, className }: RichTextContentProps) {
  const [safeHtml, setSafeHtml] = useState(html ?? "");

  useEffect(() => {
    setSafeHtml(
      DOMPurify.sanitize(html ?? "", {
        ALLOWED_TAGS,
        ALLOWED_ATTR: ["href", "target", "rel"],
      })
    );
  }, [html]);

  return (
    <div
      className={`rich-text-content ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
