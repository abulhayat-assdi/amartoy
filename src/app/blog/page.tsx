export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { getBlogPageContent, getPublishedPosts } from "@/lib/blogpage-management";

export default async function BlogPage() {
  const content = await getBlogPageContent();
  const published = getPublishedPosts(content);

  // Mirror the original layout: first 2 = recent sidebar, rest = main grid
  const featuredPosts = published.slice(2);
  const recentPosts = published.slice(0, 2);

  const { header, sidebarBanner } = content;

  return (
    <section className="blog-page">
      <div className="container">
        <header className="blog-page__hero">
          <p className="blog-page__eyebrow">{header.eyebrow}</p>
          <h1>{header.title}</h1>
          <p>{header.description}</p>
        </header>

        <div className="blog-page__layout">
          <div className="blog-page__posts">
            {featuredPosts.map((post) => (
              <article className="blog-featured-card" key={post.id}>
                <Link className="blog-featured-card__image-link" href={`/blog/${post.slug}/`}>
                  <Image alt={post.title} fill className="blog-featured-card__image" src={post.image} />
                </Link>

                <div className="blog-featured-card__body">
                  <span className="blog-featured-card__tag">{post.category}</span>
                  <h2>
                    <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                  </h2>
                  <p>{post.excerpt}</p>
                  <span className="blog-featured-card__divider" />

                  <div className="blog-featured-card__meta">
                    <span>{post.date}</span>
                    <span>0 Comments</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="blog-sidebar">
            <div className="blog-sidebar__panel">
              <div className="blog-sidebar__section">
                <h3>Search</h3>
                <form className="blog-sidebar__search" role="search">
                  <Search size={18} strokeWidth={2.1} />
                  <input aria-label="Search blog posts" placeholder="Search ..." type="search" />
                </form>
              </div>

              <div className="blog-sidebar__section">
                <h3>Recent Posts</h3>

                <div className="blog-sidebar__recent-list">
                  {recentPosts.map((post) => (
                    <article className="blog-sidebar__recent-item" key={post.id}>
                      <Link className="blog-sidebar__recent-thumb" href={`/blog/${post.slug}/`}>
                        <Image alt={post.title} fill className="blog-sidebar__recent-image" src={post.image} />
                      </Link>

                      <div className="blog-sidebar__recent-content">
                        <p className="blog-sidebar__recent-meta">
                          <span>{post.category}</span>
                          <span>{post.date}</span>
                        </p>
                        <h4>
                          <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                        </h4>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <Link className="blog-sidebar__banner" href={sidebarBanner.href}>
                <Image
                  alt={sidebarBanner.tagline}
                  fill
                  className="blog-sidebar__banner-image"
                  src={sidebarBanner.imageUrl}
                />
                <div className="blog-sidebar__banner-overlay" />
                <div className="blog-sidebar__banner-content">
                  <span>{sidebarBanner.brandLabel}</span>
                  <strong>{sidebarBanner.tagline}</strong>
                </div>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
