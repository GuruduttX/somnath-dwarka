"use client"

import CMSActions from '@/components/Admin/CMS/CMSActions';
import CMSContentSection from '@/components/Admin/CMS/CMSContentSection';
import CMSHeader from '@/components/Admin/CMS/CMSHeader';
import CMSMediaSection from '@/components/Admin/CMS/CMSMediaSection';
import CMSMetaSection from '@/components/Admin/CMS/CMSMetaSection';
import CMSSeoSection from '@/components/Admin/CMS/CMSSeoSection';
import FaqHandler from '@/components/Admin/CMS/FaqHandler';
import CMSSchema from '@/components/Admin/CMS/CMSSchema';

import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import toast from 'react-hot-toast';
import CmsLoader from '@/components/Admin/Components/CmsLoader';

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

export default function EditBlog() {

  const params = useParams();
  const id = params.id ;

  const [loading, setLoading] = useState(true);
  const [dataId , setDataId] = useState("");

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
    schemaDescription: ""
  });

  const [faqs, setFaqs] = useState<FAQ[]>([])

  const updateForm = (field: keyof BlogForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  /* ---------------- FETCH BLOG ---------------- */

  useEffect(() => {

    const fetchBlog = async () => {

      try {

        const res = await fetch(`/api/admin/blog/${id}`);
        const data = await res.json();

        console.log("THE DATA COME IS : ");
        console.log(data);

        if (!data.success) {
          toast.error("Failed to load blog");
          return;
        }

        console.log("The data come from the database is : ");
        console.log(data);

        const blog = data.data;

        setForm({
          title: blog.title,
          category: blog.category,
          slug: blog.slug,
          author: blog.author,
          metaTitle: blog.meta?.title || "",
          metaDescription: blog.meta?.description || "",
          image: blog.image,
          alt: blog.alt,
          subContent: blog.subContent,
          content: blog.content,
          schemaTitle: blog.structuredData?.title || "",
          schemaDescription: blog.structuredData?.description || ""
        });

        setFaqs(blog.faqs || []);
        setDataId(blog._id)

      } catch (error) {
        toast.error("Error fetching blog");
      } finally {
        setLoading(false);
      }

    };

    if (id) fetchBlog();

  }, []);


    const getBlogBySlug = async (slug: string) => {
  try {
    const res = await fetch(
      `/api/admin/blog/check-slug?slug=${slug}`
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


  /* ---------------- UPDATE BLOG ---------------- */

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

     if(form.slug){
    const result = await getBlogBySlug(form.slug);

    if (result?.exists &&   result?.data?._id !== id) {
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
        description: form.schemaDescription
      },
      image: form.image,
      alt: form.alt,
      subContent: form.subContent,
      content: form.content,
      author: form.author,
      status : "published",
      faqs
    };

    try {

      const res = await fetch(`/api/admin/blog/${dataId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.error || "Failed to update blog");
        return;
      }

      toast.success("Blog Updated Successfully");

    } catch (error) {
      toast.error("Server Error");
    }

  };

  const handlePublish = async() => {

    if(form.slug){
    const result = await getBlogBySlug(form.slug);

    if (result?.exists &&   result?.data?._id !== id) {
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
        description: form.schemaDescription
      },
      image: form.image,
      alt: form.alt,
      subContent: form.subContent,
      content: form.content,
      author: form.author,
      status : "draft",
      faqs
    };
      
    

    try {

      const res = await fetch(`/api/admin/blog/${dataId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!data.success) {
        
        let errorMessage = "Failed to update blog";

        if (data.error) {
          if (typeof data.error === "string") {
            // Handle simple string errors
            errorMessage = data.error;
          } else if (data.error.fieldErrors) {
            // Extract the first validation error from the object to show in the toast
            const firstField = Object.keys(data.error.fieldErrors)[0];
            const firstErrorMsg = data.error.fieldErrors[firstField][0];
            errorMessage = `Validation Error: ${firstField} - ${firstErrorMsg}`;
          }
        }
        toast.error(errorMessage);
        return;
      }


      toast.success("Blog Updated Successfully");

    } catch (error) {
      console.error("Publish Error:", error);
      toast.error("Server Error. Please try again later.");    }
  }



  if (loading) {
    return <CmsLoader />;
  }

  return (

    <section id="admin-edit-blog" className="relative min-h-screen p-6">

      <div className="max-w-8xl mx-auto p-8 rounded-2xl
      bg-[#0b1220]
      backdrop-blur-xl border border-white/10
      shadow-[0_0_60px_-15px_rgba(56,189,248,0.25)]">

        <form className='space-y-6' onSubmit={handleUpdate}>

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

          <FaqHandler
            faqs={faqs}
            setFaqs={setFaqs}
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

          <CMSActions
            actionType="create"
            editorType="Blog"
            onSaveDraft={handlePublish}
          />
        </form>
      </div>
    </section>

  );
}