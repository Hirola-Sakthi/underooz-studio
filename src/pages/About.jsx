import { Banner, Seo, Reveal, Eyebrow, FAQ, CTA } from "../components/ui";
import { image, faqs } from "../data";
const F = faqs.slice(0, 3);
const vals = [
  ["Craft", "Every frame is lit, composed and graded with intent."],
  ["Precision", "Planning removes guesswork so shoot days stay calm and fast."],
  [
    "Story",
    "We start with what the audience should feel, then build the visuals.",
  ],
  ["Care", "Clear communication and honest timelines from brief to delivery."],
];
const tl = [
  ["2018", "Founded with a single camera and a clear point of view."],
  ["2021", "Grew into a full production crew and opened a studio space."],
  ["2024", "Added digital marketing so campaigns ship with the films."],
  ["2026", "Working with brands across industries and countries."],
];
export default function About() {
  return (
    <>
      <Seo
        title="About"
        path="about"
        desc="Meet UNDEROOZ STUDIO, a cinematic production and digital marketing studio built on craft and precision."
        faq={F}
      />
      <Banner
        kicker="About the studio"
        title="Craft with a point of view"
        sub="A small, focused team that treats every brief like a film."
        imageKey="corporate"
      />
      <section className="sec">
        <div className="wrap grid md:grid-cols-5 gap-14">
          <img
            src={image("studio")}
            alt="Cinema camera and crew on a warmly lit production set"
            className="md:col-span-3 w-full aspect-[4/3] object-cover"
          />
          <Reveal className="md:col-span-2 self-center">
            <Eyebrow>Our story</Eyebrow>
            <h2 className="h2 !text-3xl">Shoot. Edit. Elevate.</h2>
            <p className="mt-6 text-stone/80 leading-loose">
              UNDEROOZ STUDIO began with a belief that commercial work can feel
              like cinema. We direct, shoot and edit in-house, so the idea you
              approve is the one that reaches the screen.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="sec bg-ivory text-obsidian">
        <div className="wrap">
          <h2 className="h2 mb-14">What guides our work</h2>
          <div className="grid md:grid-cols-4 gap-10">
            {vals.map(([t, d]) => (
              <div key={t} className="border-t-2 border-gold pt-6">
                <h3 className="font-display text-xl font-medium">{t}</h3>
                <p className="mt-3 text-charcoal/80">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap max-w-3xl">
          <h2 className="h2 mb-14">Our timeline</h2>
          {tl.map(([y, t]) => (
            <Reveal
              key={y}
              className="grid grid-cols-[90px_1fr] gap-6 py-6 border-l border-gold/40 pl-6"
            >
              <span className="font-display text-gold text-2xl font-light">
                {y}
              </span>
              <p className="text-stone/90">{t}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="sec bg-charcoal/40">
        <div className="wrap grid md:grid-cols-3 gap-6">
          {[
            "Cinema cameras & lenses",
            "Lighting & grip",
            "Edit, grade & sound suite",
          ].map((t, i) => (
            <figure key={t}>
              <img
                src={image(["lenses", "lighting", "editing"][i])}
                alt={t}
                loading="lazy"
                className="w-full aspect-square object-cover"
              />
              <figcaption className="mt-3 font-display font-light">
                {t}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <FAQ list={F} />
      <CTA />
    </>
  );
}
