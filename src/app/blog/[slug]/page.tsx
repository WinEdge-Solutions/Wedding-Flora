import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { blogPosts } from "@/lib/content/blog";
import { Clock, ArrowLeft, Sparkles, Tag } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found | Wedding Flora" };

  return {
    title: `${post.title} | Wedding Flora Journal`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Find other posts for related reading
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <main className="min-h-screen text-ivory relative z-10">
      {/* ── Breadcrumb Bar ── */}
      <div className="bg-[#090614]/80 backdrop-blur-md border-b border-white/10 py-3">
        <Container>
          <div className="flex items-center justify-between text-xs">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-ivory/70 hover:text-gold transition-colors font-medium"
            >
              <ArrowLeft size={14} className="text-gold" />
              <span>Back to All Guides</span>
            </Link>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
              {post.category}
            </span>
          </div>
        </Container>
      </div>

      {/* ── Article Header ── */}
      <section className="relative py-12 sm:py-20 overflow-hidden bg-white/[0.02] border-b border-gold/20">
        <Container size="narrow" className="space-y-5 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold/15 text-gold border border-gold/30">
              {post.category}
            </span>
            <span className="text-xs text-ivory/50 flex items-center gap-1.5">
              <Clock size={12} className="text-gold" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-ivory tracking-[0.02em] leading-tight">
            {post.title}
          </h1>

          <p className="font-sans text-sm sm:text-base text-ivory/80 max-w-xl mx-auto leading-relaxed">
            {post.excerpt}
          </p>

          <Divider variant="ornamental" className="my-2" />

          {/* Author Byline */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold/40 bg-midnight">
              <Image src={post.author.avatar} alt={post.author.name} fill className="object-contain p-1" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-ivory block leading-tight">
                {post.author.name}
              </span>
              <span className="text-[10px] text-gold font-medium uppercase tracking-wider block">
                {post.author.role} • {post.publishedAt}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Featured Image & Article Body ── */}
      <Section variant="charcoal">
        <Container size="narrow" className="space-y-10 sm:space-y-12">
          {/* Main Hero Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090614]/60 via-transparent to-transparent" />
          </div>

          {/* Content Blocks */}
          <div className="space-y-8 text-ivory/85 font-sans leading-relaxed text-sm sm:text-base">
            {post.content.map((block, idx) => (
              <div key={idx} className="space-y-4">
                {block.heading && (
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ivory tracking-tight pt-4 border-t border-white/5">
                    {block.heading}
                  </h2>
                )}

                {block.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed font-medium text-ivory/80">
                    {p}
                  </p>
                ))}

                {block.callout && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-gold/10 border-l-4 border-gold border-y border-r border-gold/20 my-6">
                    <p className="text-xs sm:text-sm text-ivory font-medium leading-relaxed italic">
                      {block.callout}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <Tag size={14} className="text-gold" />
            <span className="text-xs font-bold text-ivory/70 mr-2">Tags:</span>
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded text-xs font-medium bg-white/[0.04] text-ivory/80 border border-white/10"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Consultation Box inside Article */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#06040e]/80 border border-gold/40 shadow-xl space-y-4 text-center">
            <Sparkles className="w-6 h-6 text-gold mx-auto" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory">
              Planning a Destination Wedding with These Requirements?
            </h3>
            <p className="text-xs sm:text-sm text-ivory/80 max-w-lg mx-auto font-medium">
              Our principal directors in Jaipur and Delhi NCR can prepare a personalized feasibility proposal, palace date options, and accurate budget blueprint.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button href={`/contact?subject=${encodeURIComponent(post.title)}`} variant="primary" size="md">
                Request Custom Proposal
              </Button>
              <a
                href={`${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                  `Hello Wedding Flora! I read your guide "${post.title}" and would like to consult on planning our celebration.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-[2px] bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 font-sans text-xs uppercase tracking-wider font-bold transition-all border border-emerald-500/30"
              >
                WhatsApp Inquiry
              </a>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="pt-8 border-t border-white/10 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-ivory">
                Continue Reading
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group block p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-gold/60 transition-all"
                  >
                    <span className="text-[10px] uppercase font-bold text-gold tracking-wider block mb-1">
                      {related.category}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-ivory group-hover:text-gold transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-xs text-ivory/60 line-clamp-2 mt-1">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
