import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/site";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card">
      <Link className="blog-card__image-link" href="/blog/">
        <Image alt={post.title} className="blog-card__image" height={1000} src={post.image} width={1600} />
      </Link>
      <div className="blog-card__meta">
        <span>{post.category}</span>
        <span>{post.date}</span>
      </div>
      <Link className="blog-card__title" href="/blog/">
        {post.title}
      </Link>
    </article>
  );
}
