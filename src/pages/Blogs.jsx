import { Link } from "react-router-dom";
import {
  Banner,
  Seo,
  Reveal,
  Eyebrow,
  FAQ,
  CTA,
  Newsletter,
} from "../components/ui";
import { posts, faqs, slug } from "../data";
const F = faqs.slice(3, 6);
export default function Blogs() {
  return (
    <>
      <Seo
        title="Blogs"
        path="blogs"
        desc="Insights on videography, commercial advertising, product photography and digital marketing from UNDEROOZ STUDIO."
        faq={F}
      />
      <Banner
        kicker="Journal"
        title="Notes from the edit suite"
        sub="Practical thinking on production, branding and marketing."
        imageKey="editing"
      />
      <section className="sec">
        <article className="wrap relative grid md:grid-cols-2 gap-12 items-center">
          <img
            src={posts[0].image}
            alt={posts[0].t}
            className="w-full aspect-[4/3] object-cover"
          />
          <div>
            <Eyebrow>Featured, {posts[0].c}</Eyebrow>
            <h2 className="h2 !text-3xl">
              <Link
                to={`/blogs/${slug(posts[0].t)}`}
                className="after:absolute after:inset-0"
              >
                {posts[0].t}
              </Link>
            </h2>
            <p className="mt-5 text-stone/80">
              A step-by-step method for turning one idea into a shot list that
              is quick to film and easy to edit.
            </p>
            <time className="block mt-6 text-sm text-gold">{posts[0].d}</time>
          </div>
        </article>
      </section>
      <section className="sec bg-ivory text-obsidian">
        <div className="wrap">
          <h2 className="h2 mb-12">Latest articles</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {posts.slice(1).map((p, i) => (
              <article key={p.t} className="relative">
                <img
                  src={p.image}
                  style={{ objectPosition: p.position }}
                  alt=""
                  loading="lazy"
                  className="w-full aspect-video object-cover"
                />
                <p className="mt-4 text-sm text-gold">{p.c}</p>
                <h3 className="font-display text-xl font-light mt-1">
                  <Link
                    to={`/blogs/${slug(p.t)}`}
                    className="after:absolute after:inset-0"
                  >
                    {p.t}
                  </Link>
                </h3>
                <time className="text-sm opacity-60">{p.d}</time>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap flex flex-wrap gap-4 justify-center">
          {[
            "Production",
            "Photography",
            "Strategy",
            "Social",
            "Post-production",
            "Marketing",
          ].map((t) => (
            <span
              key={t}
              className="border border-gold/40 px-6 py-3 font-display text-xs track uppercase"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
      <section className="sec bg-charcoal/40 text-center">
        <Reveal className="wrap max-w-xl">
          <h2 className="h2 !text-3xl">One useful email a month</h2>
          <Newsletter cls="mt-8 flex justify-center" />
        </Reveal>
      </section>
      <FAQ list={F} />
      <CTA />
    </>
  );
}
