import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import {
  getAllShopCategorySlugs,
  getCategoryBySlug,
  getHotProductsByCategorySlug,
  getProductsByCategorySlug,
  getSuggestedCategorySlug,
} from "@/data/site";
import { ProductCard } from "@/components/ui/product-card";

interface ShopCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const prettifyCategorySlug = (slug: string) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export function generateStaticParams() {
  return getAllShopCategorySlugs().map((category) => ({
    category,
  }));
}

export default async function ShopCategoryPage({ params }: ShopCategoryPageProps) {
  const { category: categorySlug } = await params;
  const categoryProducts = [...getProductsByCategorySlug(categorySlug)].sort((left, right) => right.id - left.id);

  if (!categoryProducts.length) {
    notFound();
  }

  const categoryData = getCategoryBySlug(categorySlug);
  const categoryName = categoryData?.name ?? categoryProducts[0].category ?? prettifyCategorySlug(categorySlug);
  const relatedCategorySlug = getSuggestedCategorySlug(categorySlug);
  const relatedCategoryData = getCategoryBySlug(relatedCategorySlug);
  const relatedCategoryProducts = getHotProductsByCategorySlug(relatedCategorySlug, 3);
  const relatedCategoryName =
    relatedCategoryData?.name ??
    relatedCategoryProducts[0]?.category ??
    prettifyCategorySlug(relatedCategorySlug);

  return (
    <section className="shop-page shop-page--category">
      <div className="container">
        <header className="shop-page__hero">
          <p className="shop-page__eyebrow">Category Collection</p>
          <h1>{categoryName}</h1>
          <p className="shop-page__category-detail-note">
            Explore all {categoryName.toLowerCase()} products curated in one place.
          </p>
          <Link className="shop-page__back-link" href={`/shop/?section=${categorySlug}#category-${categorySlug}`}>
            <ArrowLeft size={16} />
            Back to Shop Categories
          </Link>
        </header>

        <div className="shop-page__category-detail">
          <div className="shop-page__catalog-head">
            <div>
              <p className="shop-page__catalog-eyebrow">{categoryName}</p>
              <h2>{categoryName}</h2>
            </div>
            <p>
              Showing all {categoryProducts.length} products from the {categoryName.toLowerCase()} collection.
            </p>
          </div>

          <div className="shop-page__grid">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} variant="shop" />
            ))}
          </div>

          <section className="shop-page__related">
            <div className="shop-page__category-section-head">
              <div>
                <p className="shop-page__catalog-eyebrow">You May Like This Category</p>
                <h3>{relatedCategoryName}</h3>
              </div>
              <Link className="shop-page__see-more" href={`/shop/${relatedCategorySlug}/`}>
                View {relatedCategoryName}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="shop-page__related-copy">
              <p>
                Another playful pick for you: hot favorites from the {relatedCategoryName.toLowerCase()} category.
              </p>
            </div>

            <div className="shop-page__grid shop-page__grid--related">
              {relatedCategoryProducts.map((product) => (
                <ProductCard key={`${relatedCategorySlug}-${product.id}`} product={product} variant="shop" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
