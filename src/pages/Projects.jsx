import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Banner, Seo, Eyebrow, FAQ, CTA, Stats } from "../components/ui";
import { projects, faqs, slug } from "../data";
const F = faqs.slice(2, 6);
export default function Projects() {
  const cats = ["All", ...new Set(projects.map((p) => p.c))],
    [f, setF] = useState("All"),
    list = projects.filter((p) => f === "All" || p.c === f);
  return (
    <>
      <Seo
        title="Projects"
        path="projects"
        desc="Selected commercial ads, brand films, product photography and social campaigns by UNDEROOZ STUDIO."
        faq={F}
      />
      <Banner
        kicker="Portfolio"
        title="Frames we are proud of"
        sub="Brand films, ads and campaigns shot and edited in-house."
        imageKey="lenses"
      />
      <section className="sec">
        <div className="wrap">
          <div className="flex flex-wrap gap-3 mb-12">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setF(c)}
                aria-pressed={f === c}
                className={`px-5 py-2 border font-display text-[11px] track uppercase ${f === c ? "bg-gold text-obsidian border-gold" : "border-gold/30"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <motion.div layout className="grid md:grid-cols-3 gap-6">
            <AnimatePresence>
              {list.map((p, i) => (
                <motion.article
                  layout
                  key={p.t}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`group relative overflow-hidden ${i % 4 === 0 ? "md:col-span-2" : ""}`}
                >
                  <img
                    src={p.image}
                    style={{ objectPosition: p.position }}
                    alt={`${p.t} still frame`}
                    loading="lazy"
                    className="w-full h-full min-h-[320px] object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 to-transparent flex flex-col justify-end p-6">
                    <h3 className="font-display text-xl font-light">
                      <Link
                        to={`/projects/${slug(p.t)}`}
                        className="after:absolute after:inset-0"
                      >
                        {p.t}
                      </Link>
                    </h3>
                    <p className="text-gold text-sm">
                      {p.c}, {p.y}
                    </p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <section className="sec bg-charcoal/40">
        <div className="wrap grid md:grid-cols-2 gap-14 items-center">
          <img
            src={projects[1].image}
            alt="Maison Aurum campaign case study"
            className="w-full aspect-video object-cover"
          />
          <div>
            <Eyebrow>Case study</Eyebrow>
            <h2 className="h2 !text-3xl">
              Maison Aurum: a launch told in 60 seconds
            </h2>
            <p className="mt-5 text-stone/80">
              One shoot day produced a hero film, six cut-downs and 40 stills.
              The campaign doubled reach in its first month.
            </p>
          </div>
        </div>
      </section>
      <section className="sec">
        <Stats
          items={[
            [6, "", "Industries"],
            [300, "+", "Deliverables"],
            [12, "M+", "Views generated"],
            [4, "", "Countries shot in"],
          ]}
        />
      </section>
      <FAQ list={F} />
      <CTA />
    </>
  );
}
