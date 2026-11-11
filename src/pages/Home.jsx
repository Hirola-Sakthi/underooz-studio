import { Link } from "react-router-dom";
import Hero3D from "../components/Hero3D";
import {
  Seo,
  Reveal,
  Eyebrow,
  FAQ,
  CTA,
  Marquee,
  Stats,
} from "../components/ui";
import { projects, services, faqs, slug } from "../data";
const F = faqs.slice(0, 4);
export default function Home() {
  return (
    <>
      <Seo
        title="Cinematic Videography & Digital Marketing Studio"
        desc="UNDEROOZ STUDIO shoots, edits and markets cinematic commercial ads, brand films and product visuals."
        faq={F}
      />
      <Hero3D />
      <Marquee
        words={[
          "Commercial ads",
          "Brand films",
          "Product photography",
          "Reels",
          "Branding",
          "Digital advertising",
        ]}
      />
      <section className="sec">
        <div className="wrap grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <Eyebrow>Our essence</Eyebrow>
            <h2 className="h2">We turn ideas into cinematic content</h2>
          </Reveal>
          <Reveal d={0.15}>
            <p className="text-stone/80 leading-loose">
              UNDEROOZ STUDIO is a creative production studio focused on
              powerful visuals, thoughtful editing and stories that inspire.
              Every frame is made with craft, precision and a relentless eye for
              detail.
            </p>
            <Link to="/about" className="btn mt-8">
              Our story
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="sec bg-charcoal/40 overflow-hidden">
        <div className="wrap mb-12 flex justify-between items-end">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="h2">Featured projects</h2>
          </div>
          <Link to="/projects" className="btn hidden md:inline-flex">
            All projects
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto px-6 md:px-10 pb-6 snap-x">
          {projects.map((p, i) => (
            <Link
              to={`/projects/${slug(p.t)}`}
              key={p.t}
              className="group snap-start shrink-0 w-[80vw] md:w-[34vw]"
            >
              <div className="overflow-hidden aspect-[4/5]">
                <img
                  src={p.image}
                  style={{ objectPosition: p.position }}
                  alt={`${p.t} still frame`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                />
              </div>
              <p className="mt-4 font-display text-lg font-light">{p.t}</p>
              <p className="text-gold text-sm">
                {p.c}, {p.y}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section className="sec">
        <div className="wrap grid md:grid-cols-2 gap-px bg-gold/25">
          {services.map((s) => (
            <Reveal key={s.id} className="bg-obsidian p-10 md:p-16">
              <Eyebrow>Service</Eyebrow>
              <h2 className="h2 !text-3xl">{s.title}</h2>
              <p className="mt-5 text-stone/80">{s.blurb}</p>
              <ul className="mt-8 space-y-2 text-stone">
                {s.items.map((x) => (
                  <li key={x} className="border-b border-gold/15 py-2">
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="sec border-y border-gold/25">
        <Stats
          items={[
            [120, "+", "Projects delivered"],
            [45, "+", "Brands served"],
            [8, "", "Years of craft"],
            [98, "%", "Clients who return"],
          ]}
        />
      </section>
      <section className="sec">
        <div className="wrap text-center max-w-3xl">
          <Reveal>
            <p className="font-display font-extralight text-2xl md:text-4xl leading-snug">
              “They shot our launch like a feature film. The campaign doubled
              our reach in a month.”
            </p>
            <p className="mt-8 text-gold font-display track text-xs">
              Brand Director, Maison Aurum
            </p>
          </Reveal>
        </div>
      </section>
      <FAQ list={F} />
      <CTA />
    </>
  );
}
