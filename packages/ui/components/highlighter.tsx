import latinize from "@repo/ui/utils/latinize";

interface HighlighterProps {
  text: string;
  searchQuery: string;
  highlightClassName?: string;
}

function Highlighter({
  text,
  searchQuery,
  highlightClassName = "rounded-xs bg-yellow-200",
}: HighlighterProps) {
  if (!searchQuery.trim()) return <>{text}</>;

  const normalizedQuery = latinize(searchQuery);
  const normalizedText = latinize(text);

  const regex = new RegExp(
    normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    "gi",
  );

  const matches: Array<{ start: number; end: number }> = [];
  let match;
  while ((match = regex.exec(normalizedText)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  if (matches.length === 0) return <>{text}</>;

  const parts: Array<{ text: string; isHighlight: boolean }> = [];
  let lastIndex = 0;

  matches.forEach((match) => {
    if (match.start > lastIndex) {
      parts.push({
        text: text.slice(lastIndex, match.start),
        isHighlight: false,
      });
    }

    parts.push({
      text: text.slice(match.start, match.end),
      isHighlight: true,
    });

    lastIndex = match.end;
  });

  if (lastIndex < text.length) {
    parts.push({
      text: text.slice(lastIndex),
      isHighlight: false,
    });
  }

  return (
    <>
      {parts.map((part, index) =>
        part.isHighlight ? (
          <mark key={index} className={highlightClassName}>
            {part.text}
          </mark>
        ) : (
          part.text
        ),
      )}
    </>
  );
}

export function isHighlighted(text: string, searchQuery: string): boolean {
  if (!searchQuery.trim()) return false;

  const normalizedQuery = latinize(searchQuery);
  const normalizedText = latinize(text);

  const regex = new RegExp(
    normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    "gi",
  );

  return regex.test(normalizedText);
}

export { Highlighter };
