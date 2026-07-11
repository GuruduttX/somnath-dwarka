import Image from "next/image";
import { serviceSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_VEHICLES, CAB_HUB, cabPath, type SeedVehicle } from "@/src/lib/seed/cabs";
import { buildRelatedLinks } from "@/src/lib/links";
import TaxiHero from "@/src/components/taxi/TaxiHero";

/**
 * Vehicle page body (/somnath-dwarka-taxi-service/{vehicle}/). Extracted so the
 * hub's [slug] segment can dispatch between vehicles and cab routes, which the
 * URL map places at the same level.
 */
export default function VehiclePage({ slug, vehicle: v }: { slug: string; vehicle: SeedVehicle }) {
  const related = buildRelatedLinks({
    self: cabPath(slug),
    pillar: { target: CAB_HUB, anchor: "all cabs & fares" },
    money: "packages",
    siblings: SEED_VEHICLES.filter((x) => x.slug !== slug).map((x) => ({
      target: cabPath(x.slug),
      anchor: `${x.vehicle_name} fare`,
      type: "sibling" as const,
    })),
  });

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Taxi service", path: CAB_HUB },
    { name: v.vehicle_name, path: cabPath(slug) },
  ];

  return (
    <PageShell crumbs={crumbs} flushHero>
      <TaxiHero
        title={v.h1}
        description={v.answer_first}
        breadcrumbs={crumbs}
        badge="Vehicle Fleet"
        ctaContext={`${v.vehicle_name} for Somnath Dwarka`}
        vehicleName={v.vehicle_name}
        seats={v.seats}
      />

      <div className="w-full bg-gradient-to-br from-amber-50/45 via-white to-orange-50/50 border-b border-orange-100/30 relative overflow-hidden py-10">
        <svg className="absolute right-0 top-4 w-60 h-40 opacity-[0.12] text-orange-500 pointer-events-none" viewBox="0 0 200 100" fill="none">
          <path d="M 0,50 Q 50,20 100,50 T 200,50" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
          <circle cx="100" cy="50" r="4" fill="currentColor" />
        </svg>

        <Section id="fares" title="Indicative fares" wide={true} className="!py-0">
          <p className="text-sm text-gray-600 mb-4 max-w-2xl">
            Estimated base rates for major segments and daily operations. Tolls, parking, and driver allowances are extra.
          </p>
          <div className={`grid gap-5 ${v.image ? "lg:grid-cols-[1.4fr_1fr]" : ""}`}>
            <div className="bg-white/60 backdrop-blur-xs p-3 rounded-2xl border border-orange-100/40">
              <DataTable columns={["Route / Basis", "Indicative Rate"]} rows={v.fares.map((f) => [f.route, f.rate])} />
            </div>
            {v.image ? (
              <figure className="relative overflow-hidden rounded-2xl border border-orange-100/40 bg-white shadow-sm">
                <Image
                  src={v.image.src}
                  alt={v.image.alt}
                  width={800}
                  height={500}
                  className="h-full w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-2.5 text-xs font-semibold text-white">
                  {v.vehicle_name} — up to {v.seats} seats
                </figcaption>
              </figure>
            ) : null}
          </div>
        </Section>
      </div>

      <div className="w-full bg-gradient-to-br from-orange-50/60 via-white to-amber-50/70 border-b border-orange-100/30 relative overflow-hidden py-10">
        <svg className="absolute -left-10 top-6 w-36 h-36 opacity-[0.08] text-orange-500 pointer-events-none animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ animationDuration: "40s" }}>
          <circle cx="50" cy="50" r="40" />
          <line x1="50" y1="10" x2="50" y2="90" />
          <line x1="10" y1="50" x2="90" y2="50" />
          <path d="M 50,10 L 55,45 L 90,50 L 55,55 L 50,90 L 45,55 L 10,50 L 45,45 Z" fill="currentColor" fillOpacity="0.1" />
        </svg>

        <Section id="suitability" title="Best suited for" wide={true} className="!py-0">
          <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-xs border border-orange-100/50 shadow-2xs max-w-4xl">
            <p className="text-gray-700 leading-relaxed font-semibold">{v.suitable_for}.</p>
            <p className="text-sm text-gray-500 mt-2">
              Comfortably accommodates up to {v.seats} passengers with luggage capacity. Equipped with individual air-conditioning controls, responsive suspension, and a professional driver for a relaxed highway travel experience.
            </p>
          </div>
        </Section>
      </div>

      <Faq items={v.faq} heading={`${v.vehicle_name} FAQs`} />
      <CtaBand context={`${v.vehicle_name} for Somnath Dwarka`} title="Book this vehicle" subtitle="Share your route and dates for a firm fare." />
      <RelatedLinks links={related} />

      <JsonLd
        data={serviceSchema({
          name: v.h1,
          description: v.answer_first,
          path: cabPath(slug),
          areaServed: "Saurashtra, Gujarat",
        })}
      />
    </PageShell>
  );
}
