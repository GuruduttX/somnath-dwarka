import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";

/** Plain-content policy/trust page (SOP §5 #16). */
export default function PolicyPage({
  title,
  path,
  intro,
  sections,
}: {
  title: string;
  path: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: title, path }]}>
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-3">{intro}</p>
      </div>
      {sections.map((s) => (
        <Section key={s.heading} title={s.heading}>
          {s.body.map((p, i) => (
            <p key={i} className="text-gray-700 mb-3 leading-relaxed">
              {p}
            </p>
          ))}
        </Section>
      ))}
    </PageShell>
  );
}
