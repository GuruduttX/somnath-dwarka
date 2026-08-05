"use client"
import CMSActions from '@/src/components/Admin/CMS/CMSActions';
import CMSContentSection from '@/src/components/Admin/CMS/CMSContentSection';
import CMSHeader from '@/src/components/Admin/CMS/CMSHeader';
import CMSMediaSection from '@/src/components/Admin/CMS/CMSMediaSection';
import CMSMetaSection from '@/src/components/Admin/CMS/CMSMetaSection';
import CMSSeoSection from '@/src/components/Admin/CMS/CMSSeoSection';
import FaqHandler from '@/src/components/Admin/CMS/FaqHandler';
import TestimonialHandler, { type testimonial as Testimonial } from '@/src/components/Admin/CMS/TestimonialHandler';
import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import CMSSchema from '@/src/components/Admin/CMS/CMSSchema';
import DraftRecoveryBanner from '@/src/components/Admin/CMS/DraftRecoveryBanner';
import { useDraftRecovery } from '@/src/components/Admin/CMS/useDraftRecovery';

type BlogForm = {

  title: string;
  category: string
  slug: string
  author: string
  metaTitle: string
  metaDescription: string
  image: string
  alt: string
  subContent: string
  content: string
  schemaTitle: string
  schemaDescription: string
  
}

type FAQ = {
  id: string
  question: string
  answer: string
}

export default function CreateNewBlog() {
  const [form, setForm] = useState<BlogForm>({
    title: "",
    category: "",
    slug: "",
    author: "",
    metaTitle: "",
    metaDescription: "",
    image: "",
    alt: "",
    subContent: "",
    content: "",
    schemaTitle: "",
    schemaDescription: "",
  });

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  /* ---------- autosave + recovery ---------- *
   * The draft is stored in the same nested shape the API takes, so recovering
   * it is a straight un-nest back into form state. Nothing is restored until
   * the editor clicks Recover on the banner. */
  const draft = useMemo(
    () => ({
      title: form.title,
      category: form.category,
      slug: form.slug,
      meta: {
        title: form.metaTitle,
        description: form.metaDescription,
      },
      structuredData: {
        title: form.schemaTitle,
        description: form.schemaDescription,
      },
      image: form.image,
      alt: form.alt,
      subContent: form.subContent,
      content: form.content,
      author: form.author,
      status: "draft",
      faqs,
      testimonials,
    }),
    [form, faqs, testimonials],
  );

  type BlogDraft = typeof draft;

  const applyDraft = useCallback((saved: BlogDraft) => {
    setForm((prev) => ({
      ...prev,
      title: saved.title || "",
      category: saved.category || "",
      slug: saved.slug || "",
      author: saved.author || "",
      image: saved.image || "",
      alt: saved.alt || "",
      subContent: saved.subContent || "",
      content: saved.content || "",

      // Un-nest the SEO data
      metaTitle: saved.meta?.title || "",
      metaDescription: saved.meta?.description || "",
      schemaTitle: saved.structuredData?.title || "",
      schemaDescription: saved.structuredData?.description || "",
    }));

    setFaqs(saved.faqs?.length ? saved.faqs : []);
    setTestimonials(saved.testimonials?.length ? saved.testimonials : []);
  }, []);

  /** A draft is only worth keeping once some real text has been typed. */
  const hasContent = useCallback(
    (saved: BlogDraft) =>
      Boolean(
        saved.title?.trim() ||
          saved.slug?.trim() ||
          saved.content?.trim() ||
          saved.subContent?.trim() ||
          saved.faqs?.length ||
          saved.testimonials?.length,
      ),
    [],
  );

  const recovery = useDraftRecovery({
    storageKey: "blogs",
    draft,
    ready: true,
    onRecover: applyDraft,
    hasContent,
  });

  const updateForm = (field: keyof BlogForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateBeforePublish = async () => {
    if (form.content.length < 300) {
      toast.error("At least 300 characters required in blog content");
      return false;
    }

    if (!form.image) {
      toast.error("Blog image is missing");
      return false;
    }

    if (!form.category) {
      toast.error("Blog category is missing");
      return false;
    }

    if (!form.slug) {
      toast.error("Slug is required");
      return;
    }

    const result = await getBlogBySlug(form.slug);

    if (result?.exists) {
      toast.error("Slug already exists");
      return false;
    }

    return true;
  };

  const getBlogBySlug = async (slug: string) => {
    try {
      const res = await fetch(
        `/api/admin/blog/check-slug?slug=${encodeURIComponent(slug)}`,
      );

      if (res.status === 404) {
        return { exists: false };
      }

      const data = await res.json();

      return {
        exists: true,
        data: data.data || data, // handle both formats
      };
    } catch (error) {
      console.error("Slug check error:", error);
      return { exists: false };
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    const isValid = await validateBeforePublish();

    if (!isValid) return;

    const payload = {
      title: form.title,
      category: form.category,
      slug: form.slug,
      meta: {
        title: form.metaTitle,
        description: form.metaDescription,
      },
      structuredData: {
        title: form.schemaTitle,
        description: form.schemaDescription,
      },
      image: form.image,
      alt: form.alt,
      subContent: form.subContent,
      content: form.content,
      author: form.author,
      status: "published",
      faqs,
      testimonials,
    };

    try {
      const res = await fetch(`/api/admin/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.error || "Failed to publish blog");
        return;
      }

      // Saved server-side now, so the local autosave must not be re-offered.
      recovery.clear();

      toast.success("Blog Published Successfully");

      setForm({
        title: "",
        category: "",
        slug: "",
        author: "",
        metaTitle: "",
        metaDescription: "",
        image: "",
        alt: "",
        subContent: "",
        content: "",
        schemaTitle: "",
        schemaDescription: "",
      });

      setFaqs([{ id: crypto.randomUUID(), question: "", answer: "" }]);
      setTestimonials([]);
    } catch (error) {
      toast.error("Server Error");
    }
  };

  const SaveDraft = async () => {
    if (form.slug) {
      const result = await getBlogBySlug(form.slug);

      if (result?.exists) {
        toast.error("Slug already exists");
        return false;
      }
    }

    const payload = {
      title: form.title,
      category: form.category,
      slug: form.slug,
      meta: {
        title: form.metaTitle,
        description: form.metaDescription,
      },
      structuredData: {
        title: form.schemaTitle,
        description: form.schemaDescription,
      },
      image: form.image,
      alt: form.alt,
      subContent: form.subContent,
      content: form.content,
      author: form.author,
      status: "draft",
      faqs,
      testimonials,
    };

    const result = await getBlogBySlug(form.slug);

    if (result?.exists) {
      toast.error("Slug already exists");
      return false;
    }

    try {
      const res = await fetch(`/api/admin/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.error || "Failed to publish blog");
        return;
      }

      // Saved server-side now, so the local autosave must not be re-offered.
      recovery.clear();

      toast.success("Blog Drafted Successfully");

      setForm({
        title: "",
        category: "",
        slug: "",
        author: "",
        metaTitle: "",
        metaDescription: "",
        image: "",
        alt: "",
        subContent: "",
        content: "",
        schemaTitle: "",
        schemaDescription: "",
      });

      setFaqs([{ id: crypto.randomUUID(), question: "", answer: "" }]);
      setTestimonials([]);
    } catch (error) {
      toast.error("Server Error");
    }
  };

  return (
    <section id="admin-create-blog" className="relative min-h-screen p-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-10 w-72 h-72 bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-blue-400/10 blur-3xl" />
      </div>

      <div
        className="max-w-8xl mx-auto p-8 rounded-2xl
      bg-[#0b1220]
      backdrop-blur-xl border border-white/10
      shadow-[0_0_60px_-15px_rgba(56,189,248,0.25)]"
      >
        {recovery.pending && (
          <DraftRecoveryBanner
            savedAt={recovery.savedAt}
            onRecover={recovery.recover}
            onDiscard={recovery.discard}
            editorType="blog"
          />
        )}

        <form className="space-y-6" onSubmit={handleSave}>
          <CMSHeader editorType="Blog" />
          <CMSMetaSection
            title={form.title}
            category={form.category}
            slug={form.slug}
            onChange={updateForm}
            editorType="Blog"
          />
          <div>
            <label className="text-sm text-white/70">Author</label>

            <input
              value={form.author}
              required
              onChange={(e) => updateForm("author", e.target.value)}
              placeholder="author name..."
              className="mt-2 w-full px-5 py-3 rounded-xl bg-white/5 text-white
            border border-white/10 focus:ring-2 focus:ring-sky-500 transition"
            />
          </div>
          <CMSSeoSection
            metaTitle={form.metaTitle}
            metaDescription={form.metaDescription}
            onChange={updateForm}
            editorType="Blog"
          />
          <CMSSchema
            schemaTitle={form.schemaTitle}
            schemaDescription={form.schemaDescription}
            onChange={updateForm}
            editorType="Blog"
          />

          <CMSMediaSection
            image={form.image}
            alt={form.alt}
            onChange={updateForm}
            editorType="Blog"
          />


          <CMSContentSection
            subContent={form.subContent}
            content={form.content}
            onChange={updateForm}
            editorType="Blog"
          />

          <FaqHandler faqs={faqs} setFaqs={setFaqs} editorType="Blog" />

          <TestimonialHandler
            testimonials={testimonials}
            setTestimonials={setTestimonials}
            editorType="Blog"
          />

          <CMSActions
            actionType="create"
            editorType="Blog"
            onSaveDraft={SaveDraft}
          />
        </form>
      </div>
    </section>
  );
}