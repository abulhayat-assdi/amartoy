import { pageBanners, products, tags } from "@/data/site";
import { PageHero } from "@/components/ui/page-hero";
import { ProductCard } from "@/components/ui/product-card";

export default function ShopPage() {
  return (
    <>
      <PageHero
        {...pageBanners.shop}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
      />

      <section className="section">
        <div className="container shop-layout">
          <aside className="shop-sidebar">
            <div className="sidebar-widget">
              <h3>Cart</h3>
              <p>No products in the cart.</p>
            </div>
            <div className="sidebar-widget">
              <h3>Search for products</h3>
              <input className="shop-search" placeholder="Search products ..." type="text" />
            </div>
            <div className="sidebar-widget">
              <h3>Product categories</h3>
              <ul className="sidebar-list">
                <li>Bath Toys (5)</li>
                <li>Electronic (6)</li>
                <li>Figures Play (5)</li>
                <li>Learning (8)</li>
                <li>Musical (5)</li>
              </ul>
            </div>
            <div className="sidebar-widget">
              <h3>Price range</h3>
              <input defaultValue="65" type="range" />
            </div>
            <div className="sidebar-widget">
              <h3>Tags</h3>
              <div className="tag-cloud">
                {tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="shop-toolbar">
              <span>Showing 1-12 of 12 products</span>
              <select defaultValue="latest">
                <option value="latest">Sort by latest</option>
                <option value="popular">Sort by popularity</option>
                <option value="price-low">Price: low to high</option>
              </select>
            </div>
            <div className="grid-3 product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="pagination">
              <span className="page-btn active">1</span>
              <span className="page-btn">2</span>
              <span className="page-btn">3</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
