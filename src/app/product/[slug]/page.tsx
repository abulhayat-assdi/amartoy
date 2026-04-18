import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/site";
import { ProductDetailClient } from "@/components/pages/product-detail-client";
import { ProductsShowcase } from "@/components/sections/products-showcase";
import { PageHero } from "@/components/ui/page-hero";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return {
    title: product ? `${product.name} | AmarToy` : "Product | AmarToy",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <>
      <PageHero
        eyebrow={product.category}
        title={product.name}
        description={product.shortDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop/" },
          { label: product.name },
        ]}
      />
      <section className="section">
        <div className="container">
          <ProductDetailClient product={product} />
        </div>
      </section>
      <ProductsShowcase
        background="section section-alt"
        eyebrow="Related Products"
        products={products.filter((item) => item.id !== product.id).slice(0, 3)}
        title="You may also like"
      />
    </>
  );
}
