import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Link2, Mail, MessageCircle, Quote, Search, Send } from "lucide-react";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/data/site";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  return {
    title: post ? `${post.title} | AmarToy` : "Blog | AmarToy",
    description: post?.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const recentPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <section className="blog-detail-page">
      <header className="blog-detail-hero">
        <Image alt={post.title} fill className="blog-detail-hero__image" priority src={post.image} />
        <div className="blog-detail-hero__overlay" />
        <div className="container blog-detail-hero__inner">
          <span className="blog-detail-hero__tag">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="blog-detail-hero__meta">
            <Image
              alt={post.author}
              className="blog-detail-hero__author-image"
              height={48}
              src={post.authorImage}
              width={48}
            />
            <span>{post.author}</span>
            <span>{post.date}</span>
            <span>0 Comments</span>
          </div>
        </div>
      </header>

      <div className="container blog-detail-page__layout">
        <article className="blog-detail-article">
          <div className="blog-detail-article__intro">
            <Quote size={56} strokeWidth={1.7} />
            <p>{post.intro}</p>
          </div>

          {post.paragraphs.slice(0, 2).map((paragraph, index) => (
            <p key={`${post.slug}-top-${index}`}>{paragraph}</p>
          ))}

          <blockquote className="blog-detail-article__quote">{post.quote}</blockquote>

          {post.paragraphs.slice(2).map((paragraph, index) => (
            <p key={`${post.slug}-bottom-${index}`}>{paragraph}</p>
          ))}

          <div className="blog-detail-article__image-wrap">
            <Image
              alt={`${post.title} article illustration`}
              className="blog-detail-article__image"
              height={720}
              src={post.detailImage}
              width={1280}
            />
          </div>

          <h2>Creative approach to every project</h2>
          <p>
            Aenean et egestas nulla. Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Fusce gravida, ligula non molestie tristique, justo
            elit blandit risus, blandit maximus augue magna accumsan ante. Duis id mi tristique,
            pulvinar neque at, lobortis tortor.
          </p>
          <p>
            Etiam vitae leo et diam pellentesque porta. Sed eleifend ultricies risus, vel rutrum
            erat commodo ut. Praesent finibus congue euismod. Nullam scelerisque massa vel augue
            placerat, a tempor sem egestas. Curabitur placerat finibus lacus.
          </p>

          <div className="blog-detail-article__tags">
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="blog-detail-article__footer">
            <div className="blog-detail-article__likes">
              <button aria-label="Like article" type="button">
                <Heart size={18} />
              </button>
              <span>{post.likes}</span>
            </div>

            <div className="blog-detail-article__share">
              <a aria-label="Share on Twitter" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}>
                <Send size={18} />
              </a>
              <a aria-label="Share on Facebook" href={`https://www.facebook.com/sharer/sharer.php?u=https://amartoy.com/blog/${post.slug}/`}>
                <MessageCircle size={18} />
              </a>
              <a aria-label="Share by email" href={`mailto:?subject=${encodeURIComponent(post.title)}`}>
                <Mail size={18} />
              </a>
              <a aria-label="Copy link" href={`/blog/${post.slug}/`}>
                <Link2 size={18} />
              </a>
            </div>
          </div>

          <section className="blog-detail-comments">
            <h2>Leave a comment</h2>
            <form className="blog-detail-comments__form">
              <div className="blog-detail-comments__row">
                <label>
                  <span>Your Name *</span>
                  <input type="text" />
                </label>
                <label>
                  <span>Your E-mail *</span>
                  <input type="email" />
                </label>
              </div>

              <label className="blog-detail-comments__textarea">
                <span>Your comment *</span>
                <textarea rows={6} />
              </label>

              <label className="blog-detail-comments__agree">
                <input type="checkbox" />
                <span>I agree that my submitted data is being collected and stored.</span>
              </label>

              <button className="blog-detail-comments__submit" type="submit">
                Leave a comment
              </button>
            </form>
          </section>

          <section className="blog-detail-related">
            <h2>You May Also Like</h2>
            <div className="blog-detail-related__grid">
              {relatedPosts.map((item) => (
                <article className="blog-detail-related__card" key={item.id}>
                  <Link className="blog-detail-related__image-link" href={`/blog/${item.slug}/`}>
                    <Image alt={item.title} className="blog-detail-related__image" height={520} src={item.image} width={720} />
                  </Link>
                  <span>{item.category}</span>
                  <h3>
                    <Link href={`/blog/${item.slug}/`}>{item.title}</Link>
                  </h3>
                </article>
              ))}
            </div>
          </section>
        </article>

        <aside className="blog-sidebar blog-detail-sidebar">
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
                {recentPosts.map((item) => (
                  <article className="blog-sidebar__recent-item" key={item.id}>
                    <Link className="blog-sidebar__recent-thumb" href={`/blog/${item.slug}/`}>
                      <Image alt={item.title} fill className="blog-sidebar__recent-image" src={item.image} />
                    </Link>

                    <div className="blog-sidebar__recent-content">
                      <p className="blog-sidebar__recent-meta">
                        <span>{item.category}</span>
                        <span>{item.date}</span>
                      </p>
                      <h4>
                        <Link href={`/blog/${item.slug}/`}>{item.title}</Link>
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
    </section>
  );
}
