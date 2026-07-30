interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <section id="blog-content" className="py-6 bg-white">

            <section id="blog-article" className="mx-auto px-0 sm:px-2">
                <div className="BlogContent
                    prose prose-slate max-w-none
                    prose-ul:list-disc prose-ul:pl-6
                    prose-ol:list-decimal prose-ol:pl-6
                    prose-li:my-1
                    prose-li:marker:text-slate-500
                    prose-p:leading-7
                    "
                    dangerouslySetInnerHTML={{ __html: content ?? "" }}
                />

            </section>
    </section>
  );
}