import { blogPosts } from "@/data/site";
import { isSupabaseConfigured, isSupabaseWriteConfigured, supabaseRestRequest } from "@/lib/supabase-rest";
import type { BlogPageContent, BlogPageHeader, BlogPostItem, BlogSidebarBanner } from "@/types/blogpage";

const BLOG_SLUG = "blog";

type BlogPageRow = {
  content: BlogPageContent;
  updated_at?: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ensureText(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function ensureList<T>(value: unknown, fallback: T[]) {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function ensureNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function ensureBool(value: unknown, fallback = true) {
  return typeof value === "boolean" ? value : fallback;
}

function makeId(prefix: string, fallbackIndex: number) {
  return `${prefix}-${fallbackIndex + 1}`;
}

// ─── Default values (mirrors static site data) ───────────────────────────────

const DEFAULT_HEADER: BlogPageHeader = {
  eyebrow: "Our Blog",
  title: "Blog",
  description: "Parenting ideas, toy stories, and playful inspiration arranged in an editorial-style visual grid.",
};

const DEFAULT_SIDEBAR_BANNER: BlogSidebarBanner = {
  imageUrl: "/images/real/happy-outdoors.jpg",
  brandLabel: "AmarToy",
  tagline: "Playful picks for bright little moments",
  href: "/shop/",
};

function staticPostToItem(post: (typeof blogPosts)[0], index: number): BlogPostItem {
  return {
    id: makeId("post", index),
    slug: post.slug,
    title: post.title,
    category: post.category,
    date: post.date,
    image: post.image,
    excerpt: post.excerpt,
    author: post.author,
    authorImage: post.authorImage,
    intro: post.intro,
    paragraphs: post.paragraphs,
    quote: post.quote,
    detailImage: post.detailImage,
    tags: post.tags,
    likes: post.likes,
    published: true,
  };
}

export const DEFAULT_BLOG_CONTENT: BlogPageContent = {
  header: DEFAULT_HEADER,
  posts: blogPosts.map(staticPostToItem),
  sidebarBanner: DEFAULT_SIDEBAR_BANNER,
};

// ─── Normalizers ─────────────────────────────────────────────────────────────

function normalizeHeader(value: unknown): BlogPageHeader {
  const input = (value || {}) as Partial<BlogPageHeader>;
  return {
    eyebrow: ensureText(input.eyebrow, DEFAULT_HEADER.eyebrow),
    title: ensureText(input.title, DEFAULT_HEADER.title),
    description: ensureText(input.description, DEFAULT_HEADER.description),
  };
}

function normalizeSidebarBanner(value: unknown): BlogSidebarBanner {
  const input = (value || {}) as Partial<BlogSidebarBanner>;
  return {
    imageUrl: ensureText(input.imageUrl, DEFAULT_SIDEBAR_BANNER.imageUrl),
    brandLabel: ensureText(input.brandLabel, DEFAULT_SIDEBAR_BANNER.brandLabel),
    tagline: ensureText(input.tagline, DEFAULT_SIDEBAR_BANNER.tagline),
    href: ensureText(input.href, DEFAULT_SIDEBAR_BANNER.href),
  };
}

function normalizePost(item: Partial<BlogPostItem>, index: number): BlogPostItem {
  const fallback = DEFAULT_BLOG_CONTENT.posts[index];
  return {
    id: ensureText(item?.id, fallback?.id || makeId("post", index)),
    slug: ensureText(item?.slug, fallback?.slug || ""),
    title: ensureText(item?.title, fallback?.title || ""),
    category: ensureText(item?.category, fallback?.category || ""),
    date: ensureText(item?.date, fallback?.date || ""),
    image: ensureText(item?.image, fallback?.image || ""),
    excerpt: ensureText(item?.excerpt, fallback?.excerpt || ""),
    author: ensureText(item?.author, fallback?.author || ""),
    authorImage: ensureText(item?.authorImage, fallback?.authorImage || ""),
    intro: ensureText(item?.intro, fallback?.intro || ""),
    paragraphs: ensureList<string>(item?.paragraphs, fallback?.paragraphs || []).map((p) => ensureText(p)),
    quote: ensureText(item?.quote, fallback?.quote || ""),
    detailImage: ensureText(item?.detailImage, fallback?.detailImage || ""),
    tags: ensureList<string>(item?.tags, fallback?.tags || []).map((t) => ensureText(t)),
    likes: ensureNumber(item?.likes, fallback?.likes ?? 0),
    published: ensureBool(item?.published, true),
  };
}

function normalizePosts(value: unknown): BlogPostItem[] {
  return ensureList<Partial<BlogPostItem>>(value, DEFAULT_BLOG_CONTENT.posts).map(normalizePost);
}

export function normalizeBlogContent(value: unknown): BlogPageContent {
  const input = (value || {}) as Partial<BlogPageContent>;
  return {
    header: normalizeHeader(input.header),
    posts: normalizePosts(input.posts),
    sidebarBanner: normalizeSidebarBanner(input.sidebarBanner),
    updatedAt: ensureText(input.updatedAt),
  };
}

// ─── Read ─────────────────────────────────────────────────────────────────────

export async function getBlogPageContent(): Promise<BlogPageContent> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_BLOG_CONTENT;
  }

  try {
    const rows = await supabaseRestRequest<BlogPageRow[]>(
      `/rest/v1/homepage_content?select=content,updated_at&slug=eq.${BLOG_SLUG}&limit=1`,
    );
    const row = rows[0];

    if (!row?.content) {
      return DEFAULT_BLOG_CONTENT;
    }

    return normalizeBlogContent({
      ...row.content,
      updatedAt: row.updated_at,
    });
  } catch {
    return DEFAULT_BLOG_CONTENT;
  }
}

// ─── Write ────────────────────────────────────────────────────────────────────

export async function saveBlogPageContent(content: BlogPageContent) {
  if (!isSupabaseWriteConfigured()) {
    throw new Error("Saving Blog page content requires Supabase service role configuration.");
  }

  const normalized = normalizeBlogContent({
    ...content,
    updatedAt: new Date().toISOString(),
  });

  await supabaseRestRequest(
    "/rest/v1/homepage_content",
    {
      method: "POST",
      headers: {
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({
        slug: BLOG_SLUG,
        content: normalized,
        updated_at: normalized.updatedAt,
      }),
    },
    true,
  );

  return normalized;
}

// ─── Helpers for the public pages ────────────────────────────────────────────

export function getPublishedPosts(content: BlogPageContent) {
  return content.posts.filter((post) => post.published);
}

export function findPostBySlug(content: BlogPageContent, slug: string) {
  return content.posts.find((post) => post.slug === slug && post.published);
}
