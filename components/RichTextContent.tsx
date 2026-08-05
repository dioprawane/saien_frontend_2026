import DOMPurify from "isomorphic-dompurify";

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
 */
export default function RichTextContent({ html, className }: RichTextContentProps) {
  const safeHtml = DOMPurify.sanitize(html ?? "", {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ["href", "target", "rel"],
  });

  return (
    <div
      className={`rich-text-content ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
