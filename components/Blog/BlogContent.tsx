interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <section className="py-20 bg-white">
    
            <section className="mx-auto px-4 ">
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