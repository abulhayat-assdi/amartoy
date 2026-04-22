import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/site";

export default function BlogPage() {
  return (
    <section className="blog-page">
      <div className="container">
        <header className="blog-page__hero">
          <p className="blog-page__eyebrow">Our Blog</p>
          <h1>Blog</h1>
          <p>
            Parenting ideas, toy stories, and playful inspiration arranged in an editorial-style
            visual grid.
          </p>
        </header>

        <div className="blog-page__grid">
          {blogPosts.map((post) => (
            <article className="blog-page__card" key={post.id}>
              <Link className="blog-page__card-link" href="/blog/">
                <Image alt={post.title} fill className="blog-page__image" src={post.image} />
                <div className="blog-page__overlay" />
                <div className="blog-page__content">
                  <div className="blog-page__meta">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h2>{post.title}</h2>
                  <span className="blog-page__arrow">
                    <ArrowRight size={18} />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
