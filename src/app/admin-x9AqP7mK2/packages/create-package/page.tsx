"use client"
import CMSActions from '@/src/components/Admin/CMS/CMSActions';
import CMSHeader from '@/src/components/Admin/CMS/CMSHeader';
import CMSMediaSection from '@/src/components/Admin/CMS/CMSMediaSection';
import CMSMetaSection from '@/src/components/Admin/CMS/CMSMetaSection';
import CMSSeoSection from '@/src/components/Admin/CMS/CMSSeoSection';
import FaqHandler from '@/src/components/Admin/CMS/FaqHandler';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PackageDetails from '@/src/components/Admin/PackageEditor/PackageDetails';
import TripHighlights from '@/src/components/Admin/PackageEditor/TripHighlights';
import Inclusion from '@/src/components/Admin/PackageEditor/Inclusion';
import Exclusion from '@/src/components/Admin/PackageEditor/Exclusion';
import Policy from '@/src/components/Admin/PackageEditor/Policy';
import Document from '@/src/components/Admin/PackageEditor/Document';
import Testimonials from '@/src/components/Admin/PackageEditor/Testimonials';
import ItinearyMaker from '@/src/components/Admin/PackageEditor/Itinerary';
import DANDestination, { destinations } from '@/src/components/Admin/PackageEditor/DANDestination';
import ChildImagePicker from '@/src/components/Admin/PackageEditor/ChildImagePicker';
import CMSSchema from '@/src/components/Admin/CMS/CMSSchema';
import DurationSection from '@/src/components/Admin/PackageEditor/DurationSection';
import DestRoutes from '@/src/components/Admin/PackageEditor/DestRoute';
import SelectedInclusion from '@/src/components/Admin/PackageEditor/SelectedInclusion';
import PackageOverview from '@/src/components/Admin/PackageEditor/PackageOverview';
import SourceCitySelector from '@/src/components/Admin/PackageEditor/SourceCitySelector';
import { object } from 'zod';

type PackageForm = {
  title: string;
  category: string;
  slug: string;
  price: string;
  overview: string;
  duration: string;
  metaTitle: string;
  metaDescription: string;
  schemaTitle: string;
  schemaDescription: string;
  image: string;
  alt: string;
  refund: string;
  cancel: string;
  confirmation: string;
  payment: string;
  day: string;
  night: string;
  destination: string;
  reviews: string;
  rating: string;
  breakfast_included: boolean;
  stay_included: boolean;
  transfer_included: boolean;
  sightseeing_included: boolean;
  status: string;
};

type FAQ        = { id: string; question: string; answer: string };
type Testimonial = { id: string; name: string; description: string; rating: string };
type HighLights  = { id: string; description: string };
type Inclusions  = { id: string; description: string };
type Exclusions  = { id: string; description: string };
type Documents   = { id: string; description: string };
type Itinerary   = { id: string; day: number; title: string; description: string };
type ChildImage  = { id: string; image: string; alt: string };
type BreakdownItem = { id: string; days: string; place: string };
type SegmentType = { id: string; from: string; to: string };
type RouteType   = { source: string; destination: string; segments: SegmentType[] };

export default function CreateNewPackage() {
  const [form, setForm] = useState<PackageForm>({
    title: "",
    category: "",
    slug: "",
    price: "",
    duration: "",
    overview: "",
    day: "",
    night: "",
    destination: "",
    metaTitle: "",
    metaDescription: "",
    schemaTitle: "",
    schemaDescription: "",
    image: "",
    alt: "",
    refund: "",
    cancel: "",
    confirmation: "",
    payment: "",
    reviews: "",
    rating: "",
    breakfast_included: false,
    stay_included: false,
    transfer_included: false,
    sightseeing_included: false,
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [childImage, setChildImage] = useState<ChildImage[]>([
    { id: "init-child-image", image: "", alt: "" },
  ]);
  const [faqs, setFaqs] = useState<FAQ[]>([
    { id: "init-faq", question: "", answer: "" },
  ]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { id: "init-testimonial", name: "", description: "", rating: "" },
  ]);
  const [highLights, setHighLights] = useState<HighLights[]>([
    { id: "init-highlight", description: "" },
  ]);
  const [inclusions, setInclusions] = useState<Inclusions[]>([
    { id: "init-inclusion", description: "" },
  ]);
  const [exclusions, setExclusions] = useState<Exclusions[]>([
    { id: "init-exclusion", description: "" },
  ]);
  const [documents, setDocuments] = useState<Documents[]>([
    { id: "init-document", description: "" },
  ]);
  const [itinerary, setItinerary] = useState<Itinerary[]>([
    { id: "init-itinerary", day: 1, title: "", description: "" },
  ]);
  const [breakdown, setBreakdown] = useState<BreakdownItem[]>([
    { id: "init-breakdown", days: "0", place: "" },
  ]);
  const [route, setRoute] = useState<RouteType>({
    source: "",
    destination: "",
    segments: [],
  });
  const [availableSrc, setAvailableSrc] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 2. THE READ EFFECT (Fires once on mount)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPackage = localStorage.getItem("package");

      if (!savedPackage) {
        // Initialize with the exact payload structure
        localStorage.setItem(
          "package",
          JSON.stringify({
            title: "",
            category: "",
            slug: "",
            price: 0,
            days: 0,
            nights: 0,
            reviews: 0,
            destination: "",
            rating: 0,
            overview: "",
            duration: "",
            refund: "",
            cancel: "",
            confirmation: "",
            payment: "",
            heroImage: { image: "", alt: "" },
            metaTitle: "",
            metaDescription: "",
            schemaTitle: "",
            schemaDescription: "",
            childImages: [],
            faqs: [],
            testimonials: [],
            highlights: [],
            inclusions: [],
            exclusions: [],
            knowBeforeYouGo: [],
            itinerary: [],
            availableSrc: [],
            durationbreakdown: [],
            routes: { source: "", destination: "", segments: [] },
            isBreakfastIncluded: false,
            isStayIncluded: false,
            isTransferIncluded: false,
            isSightseeingIncluded: false,
            status: "draft",
          }),
        );
      } else {
        const parsedData = JSON.parse(savedPackage || "{}");

        // Map payload back to your flat form state
        setForm((prev) => ({
          ...prev,
          title: parsedData.title || "",
          category: parsedData.category || "",
          slug: parsedData.slug || "",
          destination: parsedData.destination || "",
          overview: parsedData.overview || "",
          duration: parsedData.duration || "",
          refund: parsedData.refund || "",
          cancel: parsedData.cancel || "",
          confirmation: parsedData.confirmation || "",
          payment: parsedData.payment || "",

          // Number to String conversions
          price: parsedData.price ? String(parsedData.price) : "",
          day: parsedData.days ? String(parsedData.days) : "",
          night: parsedData.nights ? String(parsedData.nights) : "",
          reviews: parsedData.reviews ? String(parsedData.reviews) : "",
          rating: parsedData.rating ? String(parsedData.rating) : "",

          // Un-nest the hero image
          image: parsedData.heroImage?.image || "",
          alt: parsedData.heroImage?.alt || "",

          // SEO mapping
          metaTitle: parsedData.metaTitle || "",
          metaDescription: parsedData.metaDescription || "",
          schemaTitle: parsedData.schemaTitle || "",
          schemaDescription: parsedData.schemaDescription || "",

          // Booleans
          breakfast_included: parsedData.isBreakfastIncluded || false,
          stay_included: parsedData.isStayIncluded || false,
          transfer_included: parsedData.isTransferIncluded || false,
          sightseeing_included: parsedData.isSightseeingIncluded || false,
        }));

        // Set Array and Object States Safely
        if (parsedData.childImages?.length > 0)
          setChildImage(parsedData.childImages);
        if (parsedData.faqs?.length > 0) setFaqs(parsedData.faqs);
        if (parsedData.testimonials?.length > 0)
          setTestimonials(parsedData.testimonials);
        if (parsedData.highlights?.length > 0)
          setHighLights(parsedData.highlights);
        if (parsedData.inclusions?.length > 0)
          setInclusions(parsedData.inclusions);
        if (parsedData.exclusions?.length > 0)
          setExclusions(parsedData.exclusions);

        // Notice the key name changes from your payload generator
        if (parsedData.knowBeforeYouGo?.length > 0)
          setDocuments(parsedData.knowBeforeYouGo);
        if (parsedData.itinerary?.length > 0)
          setItinerary(parsedData.itinerary);
        if (parsedData.durationbreakdown?.length > 0)
          setBreakdown(parsedData.durationbreakdown);
        if (parsedData.availableSrc?.length > 0)
          setAvailableSrc(parsedData.availableSrc);

        // Set the Route object (check if source exists so we don't overwrite with empty)
        if (parsedData.routes?.source) setRoute(parsedData.routes);
      }

      // Unlock the auto-save!
      setIsLoaded(true);
    }
  }, []);

  // 3. THE WRITE EFFECT (Auto-saves on keystrokes)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Bouncer: Stop auto-saving until the initial read is complete
      if (!isLoaded) return;

      // Use the exact shape from your buildPayload function
      const currentDraft = {
        title: form.title,
        category: form.category,
        slug: form.slug,
        price: Number(form.price) || 0,
        days: Number(form.day) || 0,
        nights: Number(form.night) || 0,
        reviews: Number(form.reviews) || 0,
        destination: form.destination,
        rating: Number(form.rating) || 0,
        overview: form.overview,
        duration: form.duration,
        refund: form.refund,
        cancel: form.cancel,
        confirmation: form.confirmation,
        payment: form.payment,
        heroImage: { image: form.image || "", alt: form.alt || "" },
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        schemaTitle: form.schemaTitle,
        schemaDescription: form.schemaDescription,

        // Complex States
        childImages: childImage,
        faqs: faqs,
        testimonials: testimonials,
        highlights: highLights,
        inclusions: inclusions,
        exclusions: exclusions,
        knowBeforeYouGo: documents, // Maps document state to payload key
        itinerary: itinerary,
        availableSrc: availableSrc,
        durationbreakdown: breakdown, // Maps breakdown state to payload key
        routes: route, // Maps route state to payload key

        // Booleans
        isBreakfastIncluded: form.breakfast_included,
        isStayIncluded: form.stay_included,
        isTransferIncluded: form.transfer_included,
        isSightseeingIncluded: form.sightseeing_included,
        status: "draft",
      };

      // Save it!
      localStorage.setItem("package", JSON.stringify(currentDraft));
    }

    // The massive dependency array: watches ALL these states
  }, [
    form,
    childImage,
    faqs,
    testimonials,
    highLights,
    inclusions,
    exclusions,
    documents,
    itinerary,
    breakdown,
    route,
    availableSrc,
    isLoaded,
  ]);

  const updateForm = (field: keyof PackageForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleZodErrors = (errors: any) => {
    const fieldErrors = errors.fieldErrors;

    for (const [field, messages] of Object.entries(fieldErrors) as [
      string,
      string[],
    ][]) {
      if (messages && messages?.length > 0) {
        toast.error(`${field}: ${messages[0]}`);
        return;
      }
    }

    if (errors.formErrors?.length) {
      toast.error(errors.formErrors[0]);
    }
  };

  const buildPayload = (status: "published" | "draft") => ({
    title: form.title,
    category: form.category,
    slug: form.slug,

    price: Number(form.price),
    days: Number(form.day),
    nights: Number(form.night),
    reviews: Number(form.reviews),

    destination: form.destination,
    rating: Number(form.rating),

    overview: form.overview,
    duration: form.duration,
    refund: form.refund,
    cancel: form.cancel,
    confirmation: form.confirmation,
    payment: form.payment,

    heroImage: { image: form.image || "", alt: form.alt || "" },

    metaTitle: form.metaTitle,
    metaDescription: form.metaDescription,

    schemaTitle: form.schemaTitle,
    schemaDescription: form.schemaDescription,

    childImages: childImage,
    faqs,
    testimonials: testimonials,

    highlights: highLights,
    inclusions,
    exclusions,
    knowBeforeYouGo: documents,
    itinerary,
    availableSrc,

    durationbreakdown: breakdown,

    routes: route,

    isBreakfastIncluded: form.breakfast_included,
    isStayIncluded: form.stay_included,
    isTransferIncluded: form.transfer_included,
    isSightseeingIncluded: form.sightseeing_included,

    status,
  });

  const postPayload = async (payload: object) => {
    const res = await fetch(
      `/api/admin/tour-packages`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const data = await res.json();
    if (!res.ok || !data.success) {
      console.log("Errors", data.errors);
      handleZodErrors(data.errors);

      throw new Error("");
    }
     localStorage.setItem(
          "package",
          JSON.stringify({
            title: "",
            category: "",
            slug: "",
            price: 0,
            days: 0,
            nights: 0,
            reviews: 0,
            destination: "",
            rating: 0,
            overview: "",
            duration: "",
            refund: "",
            cancel: "",
            confirmation: "",
            payment: "",
            heroImage: { image: "", alt: "" },
            metaTitle: "",
            metaDescription: "",
            schemaTitle: "",
            schemaDescription: "",
            childImages: [],
            faqs: [],
            testimonials: [],
            highlights: [],
            inclusions: [],
            exclusions: [],
            knowBeforeYouGo: [],
            itinerary: [],
            availableSrc: [],
            durationbreakdown: [],
            routes: { source: "", destination: "", segments: [] },
            isBreakfastIncluded: false,
            isStayIncluded: false,
            isTransferIncluded: false,
            isSightseeingIncluded: false,
            status: "draft",
          }),
        );
    return data;
  };

  const findPackages = async (slug: string) => {
    try {
      const res = await fetch(
        `/api/admin/tour-packages/check-slug?slug=${form.slug}`,
      );

      if (res.status === 404) {
        return { exists: false };
      }

      const data = await res.json();

      return data;
    } catch (err) {
      toast.error("Error checking slug");
      return { exists: false };
    }
  };

  const validateForPublish = async (
    formEl: HTMLFormElement,
  ): Promise<boolean> => {
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return false;
    }

    if (!form.image) {
      toast.error("Package image is missing");
      return false;
    }

    if (!form.category) {
      toast.error("Package category is missing");
      return false;
    }

    if (!form.slug) {
      toast.error("Package slug is required");
      return false;
    }

    const result = await findPackages(form.slug);

    if (result?.exists) {
      toast.error("Slug already exists");
      return false;
    }

    const validImages = childImage.filter((img) => img?.image);

    if (validImages.length < 4) {
      toast.error(`Only ${validImages.length} child image(s) added — need 4`);
      return false;
    }

    return true;
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = await validateForPublish(e.currentTarget);

    if (!valid) return;

    setLoading(true);
    try {
      await postPayload(buildPayload("published"));
      toast.success("Package published successfully!");
    } catch (err: any) {
      toast.error("Failed to publish package");
    } finally {
      setLoading(false);
    }
  };

  const validateForDraft = async (): Promise<boolean> => {
    if (!form.image) {
      toast.error("Package image is missing");
      return false;
    }

    if (form.slug) {
      const result = await findPackages(form.slug);
      if (result?.exists) {
        toast.error("Slug already exists");
        return false;
      }
    }

    return true;
  };

  // Save Draft
  const handleSaveDraft = async () => {
    if (!form.title.trim()) {
      toast.error("Please add a title before saving as draft");
      return;
    }

    const valid = await validateForDraft();

    if (!valid) {
      return;
    }

    setLoading(true);
    try {
      await postPayload(buildPayload("draft"));
      toast.success("Draft saved successfully!");
    } catch (err: any) {
      toast.error("Failed to save draft");
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {};

  return (
    <div
      className=" p-8 rounded-2xl border border-blue-900/40
        shadow-[0_0_60px_-15px_rgba(236,72,153,0.15)]"
      style={{ background: "#1a0b11" }}
    >
      {/* Ambient glow */}

      <form className="relative z-10 space-y-6" onSubmit={handleSave}>
        <CMSHeader editorType="Package" />
        <CMSMetaSection
          title={form.title}
          category={form.category}
          slug={form.slug}
          onChange={updateForm}
          editorType="Package"
        />
        <PackageDetails
          reviews={form.reviews}
          rating={form.rating}
          price={form.price}
          duration={form.duration}
          onChange={updateForm}
          editorType="Package"
        />
        <DANDestination
          destination={form.destination}
          onChange={updateForm}
          editorType="Package"
        />
        <CMSSeoSection
          metaTitle={form.metaTitle}
          metaDescription={form.metaDescription}
          onChange={updateForm}
          editorType="Package"
        />
        <CMSSchema
          schemaTitle={form.schemaTitle}
          schemaDescription={form.schemaDescription}
          onChange={updateForm}
          editorType="Package"
        />
        <SourceCitySelector
          availableSrc={availableSrc}
          setAvailableSrc={setAvailableSrc}
        />
        <SelectedInclusion
          transfer_included={form.transfer_included}
          breakfast_included={form.breakfast_included}
          stay_included={form.stay_included}
          sightseeing_included={form.sightseeing_included}
          onChange={updateForm}
        />
        <DurationSection
          days={form.day}
          nights={form.night}
          onChange={updateForm}
          breakdown={breakdown}
          setBreakdown={setBreakdown}
        />
        <DestRoutes route={route} setRoute={setRoute} />
        <PackageOverview
          overview={form.overview}
          onChange={updateForm}
          editorType="Package"
        />
        <ItinearyMaker
          itinerary={itinerary}
          setItinerary={setItinerary}
          editorType="Package"
        />
        <FaqHandler faqs={faqs} setFaqs={setFaqs} editorType="Package" />
        <TripHighlights
          highLights={highLights}
          setHighLights={setHighLights}
          editorType="Package"
        />
        <Inclusion
          inclusions={inclusions}
          setInclusions={setInclusions}
          editorType="Package"
        />
        <Exclusion
          exclusions={exclusions}
          setExclusions={setExclusions}
          editorType="Package"
        />
        <Testimonials
          testimonials={testimonials}
          setTestimonials={setTestimonials}
          editorType="Package"
        />
        <Document
          documents={documents}
          setDocuments={setDocuments}
          editorType="Package"
        />
        <Policy
          refund={form.refund}
          cancel={form.cancel}
          confirm={form.confirmation}
          payment={form.payment}
          editorType="Package"
          onChange={updateForm}
        />
        <CMSMediaSection
          image={form.image}
          alt={form.alt}
          onChange={updateForm}
          editorType="Package"
        />
        <ChildImagePicker
          childImage={childImage}
          setChildImage={setChildImage}
        />

        <CMSActions
          actionType="create"
          editorType="Package"
          onSaveDraft={handleSaveDraft}
          loading={loading}
        />
      </form>
    </div>
  );
}