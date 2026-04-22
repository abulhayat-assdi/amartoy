import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { blogPosts } from "@/data/site";

export default function BlogPage() {
  const featuredPosts = blogPosts.slice(3);
  const recentPosts = blogPosts.slice(0, 2);

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

              <Link className="blog-sidebar__banner" href="/shop/">
                <Image
                  alt="Happy kids enjoying AmarToy collection"
                  fill
                  className="blog-sidebar__banner-image"
                  src="/images/real/happy-outdoors.jpg"
                />
                <div className="blog-sidebar__banner-overlay" />
                <div className="blog-sidebar__banner-content">
                  <span>AmarToy</span>
                  <strong>Playful picks for bright little moments</strong>
                </div>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
