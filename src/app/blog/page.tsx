import { blogPosts, pageBanners } from "@/data/site";
import { PageHero } from "@/components/ui/page-hero";
import { PortfolioCard } from "@/components/ui/portfolio-card";

export default function BlogPage() {
  return (
    <>
      <PageHero
        {...pageBanners.blog}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {blogPosts.map((post) => (
              <PortfolioCard key={post.id} post={post} />
            ))}
          </div>
          <div className="pagination">
            <span className="page-btn">1</span>
            <span className="page-btn active">2</span>
            <span className="page-btn">3</span>
          </div>
        </div>
      </section>
    </>
  );
}
