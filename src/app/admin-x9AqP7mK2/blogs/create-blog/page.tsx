"use client"
import CMSActions from '@/src/components/Admin/CMS/CMSActions';
import CMSContentSection from '@/src/components/Admin/CMS/CMSContentSection';
import CMSHeader from '@/src/components/Admin/CMS/CMSHeader';
import CMSMediaSection from '@/src/components/Admin/CMS/CMSMediaSection';
import CMSMetaSection from '@/src/components/Admin/CMS/CMSMetaSection';
import CMSSeoSection from '@/src/components/Admin/CMS/CMSSeoSection';
import FaqHandler from '@/src/components/Admin/CMS/FaqHandler';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CMSSchema from '@/src/components/Admin/CMS/CMSSchema';

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
  const [isLoaded, setIsLoaded] = useState(false);

  // 3. THE READ EFFECT (Fires once on mount)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBlog = localStorage.getItem("blogs"); // Matches your dashboard init

      if (!savedBlog) {
        // Initialize with the exact nested payload structure
        localStorage.setItem(
          "blogs",
          JSON.stringify({
            title: "",
            category: "",
            slug: "",
            author: "",
            meta: { title: "", description: "" },
            structuredData: { title: "", description: "" },
            image: "",
            alt: "",
            subContent: "",
            content: "",
            status: "draft",
            faqs: [],
          }),
        );
      } else {
        const parsedData = JSON.parse(savedBlog || "{}");

        // Map payload back to flat form state
        setForm((prev) => ({
          ...prev,
          title: parsedData.title || "",
          category: parsedData.category || "",
          slug: parsedData.slug || "",
          author: parsedData.author || "",
          image: parsedData.image || "",
          alt: parsedData.alt || "",
          subContent: parsedData.subContent || "",
          content: parsedData.content || "",

          // Un-nest the SEO data
          metaTitle: parsedData.meta?.title || "",
          metaDescription: parsedData.meta?.description || "",
          schemaTitle: parsedData.structuredData?.title || "",
          schemaDescription: parsedData.structuredData?.description || "",
        }));

        // Set FAQs safely
        if (parsedData.faqs?.length > 0) {
          setFaqs(parsedData.faqs);
        }
      }

      // Unlock the auto-save!
      setIsLoaded(true);
    }
  }, []);

  // 4. THE WRITE EFFECT (Auto-saves on keystrokes)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Bouncer: Stop auto-saving until the initial read is complete
      if (!isLoaded) return;

      // Build the exact nested payload format your API expects
      const currentDraft = {
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
        faqs: faqs,
      };

      // Save it!
      localStorage.setItem("blogs", JSON.stringify(currentDraft));
    }

    // Watches form and faqs for any changes
  }, [form, faqs, isLoaded]);

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

    try {
      const res = await fetch(
        `/api/admin/blog/${form.slug}`,
      );
      const data = await res.json();

      if (data?.exists) {
        toast.error("Slug already exists");
        return false;
      }
    } catch (error) {
      toast.error("Error validating slug");
      return false;
    }

    return true;
  };

  const getBlogBySlug = async (slug: string) => {
    try {
      const res = await fetch(
        `/api/admin/blogs/check-slug?slug=${slug}`,
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

      localStorage.setItem(
          "blogs",
          JSON.stringify({
            title: "",
            category: "",
            slug: "",
            author: "",
            meta: { title: "", description: "" },
            structuredData: { title: "", description: "" },
            image: "",
            alt: "",
            subContent: "",
            content: "",
            status: "draft",
            faqs: [],
          }),
        );

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

      localStorage.setItem(
          "blogs",
          JSON.stringify({
            title: "",
            category: "",
            slug: "",
            author: "",
            meta: { title: "", description: "" },
            structuredData: { title: "", description: "" },
            image: "",
            alt: "",
            subContent: "",
            content: "",
            status: "draft",
            faqs: [],
          }),
        );

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
    } catch (error) {
      toast.error("Server Error");
    }
  };

  return (
    <section id="admin-create-blog" className="relative min-h-screen p-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-10 w-72 h-72 bg-pink-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-pink-400/10 blur-3xl" />
      </div>

      <div
        className="max-w-8xl mx-auto p-8 rounded-2xl
      bg-[#1e0d14]
      backdrop-blur-xl border border-white/10
      shadow-[0_0_60px_-15px_rgba(56,189,248,0.25)]"
      >
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

          <FaqHandler faqs={faqs} setFaqs={setFaqs} editorType="Blog" />

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