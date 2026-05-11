"use client";

const styles = `
  .pooja-content h2 { font-size: 1.6rem; font-weight: 600; color: #EB8D1B; margin: 1.5rem 0 0.5rem; font-family: 'Georgia', serif; }
  .pooja-content h3 { font-size: 1.2rem; font-weight: 600; color: #c2185b; margin: 1.2rem 0 0.4rem; }
  .pooja-content p  { color: #4a1030; line-height: 1.8; margin-bottom: 0.9rem; }
  .pooja-content ul, .pooja-content ol { padding-left: 1.4rem; margin-bottom: 0.9rem; color: #4a1030; line-height: 1.8; }
  .pooja-content li { margin-bottom: 0.3rem; }
  .pooja-content strong { color: #EB8D1B; }
  .pooja-content a  { color: #EB8D1B; text-decoration: underline; }
  .pooja-content blockquote {
    border-left: 3px solid #f48fb1;
    padding: 0.6rem 1rem;
    margin: 1rem 0;
    background: #FEF3E3;
    color: #6b3050;
    border-radius: 0 8px 8px 0;
    font-style: italic;
  }
  .pooja-content hr { border: none; border-top: 1px solid #f8bbd0; margin: 1.5rem 0; }
  .pooja-content table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
  .pooja-content th { background: #fce4ec; color: #EB8D1B; padding: 0.5rem 0.8rem; text-align: left; font-weight: 600; }
  .pooja-content td { padding: 0.5rem 0.8rem; border-bottom: 1px solid #fce4ec; color: #4a1030; }
`;

interface PoojaContentProps {
  html: string;
}

export default function PoojaContent({ html }: PoojaContentProps) {
  return (
    <>
      <style>{styles}</style>

      <section className="w-full py-12 px-4 mb-0" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xl">🪔</span>
            <h2
              className="text-lg font-semibold tracking-wide uppercase"
              style={{ color: "#EB8D1B", letterSpacing: "0.08em" }}
            >
              About this Pooja
            </h2>
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(to right, #EB8D1B, transparent)",
              }}
            />
          </div>

          {/* HTML content from backend */}
          <div
            className="pooja-content "
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>
    </>
  );
}