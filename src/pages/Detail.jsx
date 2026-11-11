import { useParams, Link, Navigate } from "react-router-dom";
import { Banner, Seo, Eyebrow, Reveal, CTA } from "../components/ui";
import { image, projects, posts, slug } from "../data";
export default function Detail({ kind }) {
  const { slug: s } = useParams(),
    pr = kind === "project",
    list = pr ? projects : posts,
    base = pr ? "projects" : "blogs",
    i = list.findIndex((x) => slug(x.t) === s);
  if (i < 0) return <Navigate to={`/${base}`} replace />;
  const p = list[i],
    n = list[(i + 1) % list.length];
  const parts = pr
    ? [
        [
          "The brief",
          `${p.t} started with a clear ask: a ${p.c.toLowerCase()} that feels premium and stands out in a crowded feed.`,
        ],
        [
          "Our approach",
          "We planned the story frame by frame, shot on cinema cameras with controlled lighting, and graded every cut to the brand palette.",
        ],
        [
          "The result",
          "The final package shipped in every format the client needed, with cut-downs ready for social, web and broadcast.",
        ],
      ]
    : [
        [
          "Start with the outcome",
          "Decide what the viewer should feel or do after the last frame. Every later choice, from lens to edit, serves that outcome.",
        ],
        [
          "Plan before you shoot",
          "A short shot list and a simple storyboard save hours on set and keep the crew focused on the frames that matter.",
        ],
        [
          "Keep the look consistent",
          "Use one colour palette, one lighting style and one pace across all deliverables so the brand is recognised instantly.",
        ],
      ];
  return (
    <>
      <Seo
        title={p.t}
        path={`${base}/${s}`}
        desc={`${p.t}: ${p.c} by UNDEROOZ STUDIO.`}
      />
      <Banner
        kicker={`${p.c}, ${p.y || p.d}`}
        title={p.t}
        sub={
          pr
            ? "A closer look at the idea, the shoot and the result."
            : "Practical notes from the UNDEROOZ STUDIO team."
        }
        src={p.image}
        position={p.position}
      />
      <article className="sec">
        <div className="wrap max-w-3xl space-y-14">
          {parts.map(([h, t]) => (
            <Reveal key={h}>
              <h2 className="h2 !text-2xl">{h}</h2>
              <p className="mt-4 text-stone/85 leading-loose">{t}</p>
            </Reveal>
          ))}
        </div>
        {pr && (
          <div className="wrap mt-20 grid md:grid-cols-3 gap-6">
            {[
              [p.image, `${p.t} campaign concept`],
              [image("planning"), "Storyboard and production planning"],
              [image("editing"), "Colour grading and post-production suite"],
            ].map(([src, alt], k) => (
              <img
                key={k}
                src={src}
                style={{ objectPosition: k === 0 ? p.position : "center" }}
                alt={alt}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover"
              />
            ))}
          </div>
        )}
      </article>
      <section className="sec bg-charcoal/40">
        <div className="wrap flex flex-wrap justify-between items-end gap-6">
          <div>
            <Eyebrow>Next {pr ? "project" : "article"}</Eyebrow>
            <h2 className="h2 !text-3xl">{n.t}</h2>
          </div>
          <Link to={`/${base}/${slug(n.t)}`} className="btn">
            Read next
          </Link>
        </div>
      </section>
      <CTA />
    </>
  );
}
