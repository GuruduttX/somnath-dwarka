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
import PriceTiers, { type PriceTier } from '@/src/components/Admin/PackageEditor/PriceTiers';
import Document from '@/src/components/Admin/PackageEditor/Document';
import Testimonials from '@/src/components/Admin/PackageEditor/Testimonials';
import ItinearyMaker from '@/src/components/Admin/PackageEditor/Itinerary';
import DANDestination from '@/src/components/Admin/PackageEditor/DANDestination';
import ChildImagePicker from '@/src/components/Admin/PackageEditor/ChildImagePicker';
import CMSSchema from '@/src/components/Admin/CMS/CMSSchema';
import { withIds } from '@/src/utils/withIds';
import DurationSection from '@/src/components/Admin/PackageEditor/DurationSection';
import DestRoutes from '@/src/components/Admin/PackageEditor/DestRoute';
import SelectedInclusion from '@/src/components/Admin/PackageEditor/SelectedInclusion';
import PackageOverview from '@/src/components/Admin/PackageEditor/PackageOverview';
import { useParams } from 'next/navigation';
import PageCopy, { emptyPageCopy, type PageCopyState } from '@/src/components/Admin/PackageEditor/PageCopy';
import { toPageCopyState, fromPageCopyState } from '@/src/utils/pageCopy';


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

type FAQ = { id: string; question: string; answer: string };
type Testimonial = { id: string; name: string; description: string; rating: string };
type HighLights = { id: string; description: string };
type Inclusions = { id: string; description: string };
type Exclusions = { id: string; description: string };
type Documents = { id: string; description: string };
type Itinerary = { id: string; day: number; title: string; description: string; steps?: { time: string; activity: string }[] };
type ChildImage = { id: string; image: string; alt: string };
type BreakdownItem = { id: string; days: string; place: string };
type SegmentType = { id: string; from: string; to: string };
type RouteType = { source: string; destination: string; segments: SegmentType[] };

export default function page() {
  const { id } = useParams();


  const [form, setForm] = useState<PackageForm>({
    title: "", category: "", slug: "", price: "", duration: "", overview: "",
    day: "", night: "", destination: "", metaTitle: "", metaDescription: "",
    schemaTitle: "", schemaDescription: "", image: "", alt: "",
    reviews: "", rating: "",
    breakfast_included: false, stay_included: false,
    transfer_included: false, sightseeing_included: false,
    status: ""
  });

  const [loading, setLoading] = useState(false);
  const [childImage, setChildImage] = useState<ChildImage[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([{ id: crypto.randomUUID(), question: "", answer: "" }]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([{ id: crypto.randomUUID(), name: "", description: "", rating: "" }]);
  const [highLights, setHighLights] = useState<HighLights[]>([{ id: crypto.randomUUID(), description: "" }]);
  const [inclusions, setInclusions] = useState<Inclusions[]>([{ id: crypto.randomUUID(), description: "" }]);
  const [exclusions, setExclusions] = useState<Exclusions[]>([{ id: crypto.randomUUID(), description: "" }]);
  const [priceTiers, setPriceTiers] = useState<PriceTier[]>([]);
  const [documents, setDocuments] = useState<Documents[]>([{ id: crypto.randomUUID(), description: "" }]);
  const [itinerary, setItinerary] = useState<Itinerary[]>([{ id: crypto.randomUUID(), day: 1, title: "", description: "" }]);
  const [breakdown, setBreakdown] = useState<BreakdownItem[]>([{ id: crypto.randomUUID(), days: "0", place: "" }]);
  const [route, setRoute] = useState<RouteType>({ source: "", destination: "", segments: [] });
  const [pageCopy, setPageCopy] = useState<PageCopyState>(emptyPageCopy());


  //Fill data

   const handleZodErrors = (errors : any)=>{
      const fieldErrors = errors.fieldErrors;


      for(const [field , messages] of Object.entries(fieldErrors) as [string, string[]][]){
          if (messages && messages?.length > 0) {
            toast.error(`${field}: ${messages[0]}`); 
            return;
          }
      }

      if (errors.formErrors?.length) {
    toast.error(errors.formErrors[0]);
  }
  }

  const getPackages = async () => {
    try {
      const res = await fetch(`/api/admin/tour-packages/${id}`);
      if (!res.ok) {
        toast.error("Error fetching package");
      }
      const result = await res.json();

      const data = result.data;

      console.log("data", data,childImage);


      setForm({
        title: data.title ?? "",
        price: data.price?.toString() ?? "",
        duration: data.duration ?? "",
        category: data.category ?? "",
        slug: data.slug ?? "",

        metaTitle: data.metaTitle ?? "",
        metaDescription: data.metaDescription ?? "",

        schemaTitle: data.schemaTitle ?? "",
        schemaDescription: data.schemaDescription ?? "",

        image: data.heroImage.image ?? "",
        alt: data.heroImage.alt ?? "",

        overview: data.overview ?? "",


        day: data.days?.toString() ?? "",
        night: data.nights?.toString() ?? "",

        rating: data.rating?.toString() ?? "",

        breakfast_included: data.isBreakfastIncluded ?? false,
        stay_included: data.isStayIncluded ?? false,
        transfer_included: data.isTransferIncluded ?? false,
        sightseeing_included: data.isSightseeingIncluded ?? false,

        status: data.status ?? "",
        destination: data.destination ?? "",
        reviews: data.reviews ?? ""
      });

      // Records written outside the editor (seed scripts, imports) may carry
      // array items with no `id`. The editor lists key on it, so normalise here.
      setFaqs(withIds(data.faqs));

      setTestimonials(withIds(data.testimonials))
      setHighLights(withIds(data.highlights))
      setInclusions(withIds(data.inclusions))
      setExclusions(withIds(data.exclusions))
      setPriceTiers(withIds(data.priceTiers))
      setDocuments(withIds(data.knowBeforeYouGo))
      setItinerary(withIds(data.itinerary))
      setChildImage(withIds(data.childImages));
      setBreakdown(withIds(data.durationbreakdown));
      setPageCopy(toPageCopyState(data));
      setRoute({
        source: data.routes?.source ?? "",
        destination: data.routes?.destination ?? "",
        segments: withIds(data.routes?.segments),
      })
      


    } catch (error) {
      console.log("Errro", error);
    }


  }

  useEffect(() => {
    getPackages();
  }, [id])



  const updateForm = (field: keyof PackageForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const findPackages = async (slug: string) => {
  try {
    const res = await fetch(
      `/api/admin/tour-packages/check-slug?slug=${form.slug}`
    );

    const data = await res.json();

    

    return data; 
  } catch (err) {
    toast.error("Error checking slug");
    return null;
  }
};

  const buildPayload = (status: "published" | "draft") => ({
    title: form.title,
    category: form.category,
    slug: form.slug,

    price: Number(form.price),
    days: Number(form.day),
    nights: Number(form.night),

    destination: form.destination,
    rating: Number(form.rating),
    reviews: Number(form.reviews),

    overview: form.overview,
    duration: form.duration,

    heroImage: {image : form.image || "", alt : form.alt},

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
    priceTiers,
    knowBeforeYouGo: documents,
    itinerary,

    durationbreakdown: breakdown,

    routes: route,

    ...fromPageCopyState(pageCopy),

    isBreakfastIncluded: form.breakfast_included,
    isStayIncluded: form.stay_included,
    isTransferIncluded: form.transfer_included,
    isSightseeingIncluded: form.sightseeing_included,

    status,
  });

  const postPayload = async (payload: object) => {
    const res = await fetch(`/api/admin/tour-packages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data.success){
       console.log(data.errors.fieldErrors)
       handleZodErrors(data.errors);
       throw new Error(data.errors || "Something went wrong");
    }
    return data;
  };

 const validateForPublish = async (formEl: HTMLFormElement): Promise<boolean> => {
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


  if (result?.exists &&   result?.data?._id !== id) {
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

    if(!valid){
        return;
    }


    setLoading(true);
    try {
      await postPayload(buildPayload("published"));
      toast.success("Package published successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to publish package");
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


    if (result?.exists && result?.data?._id !== id) {
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

    if(!valid){
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



  return (
    <div
      className=" p-8 rounded-2xl border border-blue-900/40
        shadow-[0_0_60px_-15px_rgba(236,72,153,0.15)]"
      style={{ background: "#1a0b11" }}
    >
      {/* Ambient glow */}

      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 35% at 15% 15%, rgba(236,72,153,0.08) 0%, transparent 60%), radial-gradient(ellipse 45% 30% at 85% 75%, rgba(244,114,182,0.05) 0%, transparent 55%)",
        }}
      />

      <form className="space-y-6" onSubmit={handleSave}>
        <CMSHeader editorType="Package" />
        <CMSMetaSection title={form.title} category={form.category} slug={form.slug} onChange={updateForm} editorType="Package" />
        <PackageDetails reviews={form.reviews} rating={form.rating} price={form.price} duration={form.duration} onChange={updateForm} editorType="Package" />
        <DANDestination destination={form.destination} onChange={updateForm} editorType="Package" />
        <CMSSeoSection metaTitle={form.metaTitle} metaDescription={form.metaDescription} onChange={updateForm} editorType="Package" />
        <CMSSchema schemaTitle={form.schemaTitle} schemaDescription={form.schemaDescription} onChange={updateForm} editorType="Package" />
        <SelectedInclusion transfer_included={form.transfer_included} breakfast_included={form.breakfast_included} stay_included={form.stay_included} sightseeing_included={form.sightseeing_included} onChange={updateForm} />
        <DurationSection days={form.day} nights={form.night} onChange={updateForm} breakdown={breakdown} setBreakdown={setBreakdown} />
        <DestRoutes route={route} setRoute={setRoute} />
        <PackageOverview overview={form.overview} onChange={updateForm} editorType="Package" />
        <ItinearyMaker itinerary={itinerary} setItinerary={setItinerary} editorType="Package" />
        <PageCopy value={pageCopy} onChange={setPageCopy} />
        <FaqHandler faqs={faqs} setFaqs={setFaqs} editorType="Package" />
        <TripHighlights highLights={highLights} setHighLights={setHighLights} editorType="Package" />
        <Inclusion inclusions={inclusions} setInclusions={setInclusions} editorType="Package" />
        <Exclusion exclusions={exclusions} setExclusions={setExclusions} editorType="Package" />
        <PriceTiers priceTiers={priceTiers} setPriceTiers={setPriceTiers} />
        <Testimonials testimonials={testimonials} setTestimonials={setTestimonials} editorType="Package" />
        <Document documents={documents} setDocuments={setDocuments} editorType="Package" />
        <CMSMediaSection image={form.image} alt={form.alt} onChange={updateForm} editorType="Package" />
        <ChildImagePicker childImage={childImage} setChildImage={setChildImage} />
        <CMSActions
          actionType="update"
          editorType="Package"
          onSaveDraft={handleSaveDraft}
          loading={loading}
        />
      </form>
    </div>
  );
}