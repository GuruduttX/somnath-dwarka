import FactTag, { type FactTagType } from "./FactTag";

/**
 * Answer-first callout (SOP §5 — every template opens with a 40–60 word
 * direct answer in server HTML, optionally with a fact tag + speakable class).
 */
export default function AnswerFirst({
  children,
  tag,
  speakable = false,
}: {
  children: React.ReactNode;
  tag?: FactTagType;
  speakable?: boolean;
}) {
  return (
    <div className={`answer-first ${speakable ? "speakable" : ""}`}>
      {tag ? (
        <div className="mb-1">
          <FactTag type={tag} />
        </div>
      ) : null}
      <p>{children}</p>
    </div>
  );
}
