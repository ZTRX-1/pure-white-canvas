import { Link } from "@tanstack/react-router";
import { posts } from "@/lib/dhg-posts";

export function PostCard({ post }: { post: (typeof posts)[number] }) {
  return (
    <article data-motion-card className="interactive-card group flex h-full flex-col overflow-hidden border border-border bg-background focus-within:border-primary">
      <Link to={post.to} className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary">
        <div className="overflow-hidden">
          <img
            src={post.image}
            alt={post.alt}
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
            width="1448"
            height="1086"
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <span className="eyebrow text-primary">{post.category}</span>
          <h3 className="mt-4 text-xl font-semibold leading-snug text-brand-deep">{post.title}</h3>
          <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{post.text}</p>
          <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:underline">
            Ler mais <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}