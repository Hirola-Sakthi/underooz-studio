import { Banner, Seo, Reveal, Eyebrow, FAQ, CTA } from "../components/ui";
import { services, faqs } from "../data";
const F = faqs.slice(1, 5);
const steps = [
  "Brief and concept",
  "Storyboard and planning",
  "Shoot day",
  "Edit, grade and sound",
  "Delivery and distribution",
];
const pk = [
  ["Spark", "Reels and product stills for a single launch."],
  [
    "Signature",
    "A full commercial or brand film with cut-downs for every channel.",
  ],
  ["Studio retainer", "Monthly content and marketing with one dedicated team."],
];
export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        path="services"
        desc="Advertisement and shoots plus digital marketing: commercial ads, brand films, product photography, social content, branding and ads."
        faq={F}
      />
      <Banner
        kicker="What we do"
        title="Two disciplines one studio"
        sub="Production that looks like cinema and marketing that takes it further."
        imageKey="studio"
      />
      {services.map((s, i) => (
        <section key={s.id} className={`sec ${i ? "bg-charcoal/40" : ""}`}>
          <div className="wrap grid md:grid-cols-2 gap-14 items-center">
            <Reveal className={i ? "md:order-2" : ""}>
              <Eyebrow>{i ? "Digital" : "Production"}</Eyebrow>
              <h2 className="h2 !text-3xl">{s.title}</h2>
              <p className="mt-5 text-stone/80">{s.blurb}</p>
              <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                {s.items.map((x) => (
                  <li
                    key={x}
                    className="border border-gold/30 px-4 py-3 text-sm"
                  >
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
            <img
              src={s.image}
              alt={s.title}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </section>
      ))}
      <section className="sec">
        <div className="wrap">
          <h2 className="h2 mb-14">How a project runs</h2>
          <ol className="grid md:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <li key={s} className="border-t border-gold pt-5">
                <span className="font-display text-gold text-sm">
                  Step {i + 1}
                </span>
                <p className="mt-2 font-display font-light text-lg">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="sec bg-ivory text-obsidian">
        <div className="wrap">
          <h2 className="h2 mb-12">Ways to work together</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pk.map(([t, d], i) => (
              <div
                key={t}
                className={`p-10 ${i == 1 ? "bg-obsidian text-ivory" : "border border-obsidian/20"}`}
              >
                <h3 className="font-display text-xl">{t}</h3>
                <p className="mt-4 opacity-80">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FAQ list={F} />
      <CTA />
    </>
  );
}
