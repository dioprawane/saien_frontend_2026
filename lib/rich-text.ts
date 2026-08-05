/**
 * Splits a Tiptap HTML output (e.g. "<p>A</p><p>B</p>") into an array of
 * top-level block-level HTML fragments (e.g. ["<p>A</p>", "<p>B</p>"]).
 * Used to persist rich-text article paragraphs into a List<String> field
 * on the backend while keeping each entry as a self-contained HTML block.
 */
export function splitHtmlIntoBlocks(html: string): string[] {
  if (typeof window === "undefined" || !html || !html.trim()) {
    return [];
  }

  const container = document.createElement("div");
  container.innerHTML = html;

  return Array.from(container.children)
    .map((element) => element.outerHTML.trim())
    .filter((fragment) => fragment.length > 0 && !isHtmlBlockEmpty(fragment));
}

/**
 * Returns true when the given rich-text HTML has no meaningful text content
 * (e.g. "<p></p>" produced by an empty Tiptap editor).
 */
export function isHtmlBlockEmpty(html: string): boolean {
  if (!html) return true;
  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>/g, "").trim().length === 0;
  }
  const container = document.createElement("div");
  container.innerHTML = html;
  return (container.textContent ?? "").trim().length === 0;
}
