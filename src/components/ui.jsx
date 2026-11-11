import { send } from "../submit";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { image, faqs } from "../data";
gsap.registerPlugin(ScrollTrigger);
export function Seo({ title, desc, path = "", faq }) {
  useEffect(() => {
    document.title = `${title} | UNDEROOZ STUDIO`;
    const set = (sel, mk, attr, val) => {
      let e = document.querySelector(sel);
      if (!e) {
        e = document.createElement(mk[0]);
        e.setAttribute(mk[1], mk[2]);
        document.head.appendChild(e);
      }
      e.setAttribute(attr, val);
    };
    set(
      "meta[name=description]",
      ["meta", "name", "description"],
      "content",
      desc,
    );
    set(
      "link[rel=canonical]",
      ["link", "rel", "canonical"],
      "href",
      `https://underooz.studio/${path}`,
    );
    set(
      'meta[property="og:title"]',
      ["meta", "property", "og:title"],
      "content",
      title,
    );
    document.getElementById("ld-page")?.remove();
    const s = document.createElement("script");
    s.id = "ld-page";
    s.type = "application/ld+json";
    const g = [
      {
        "@type": "WebPage",
        name: title,
        description: desc,
        url: `https://underooz.studio/${path}`,
        isPartOf: { "@id": "https://underooz.studio/#org" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://underooz.studio/",
          },
          ...(path ? [{ "@type": "ListItem", position: 2, name: title }] : []),
        ],
      },
    ];
    if (faq)
      g.push({
        "@type": "FAQPage",
        mainEntity: faq.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      });
    s.text = JSON.stringify({ "@context": "https://schema.org", "@graph": g });
    document.head.appendChild(s);
  }, [title, desc, path, faq]);
  return null;
}
export const Reveal = ({ children, d = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);
export const Eyebrow = ({ children }) => (
  <p className="font-display text-[11px] track text-gold mb-5">{children}</p>
);
export function Banner({ title, sub, imageKey = "studio", src, position = "center", kicker }) {
  const r = useRef();
  useEffect(() => {
    const c = gsap.context(() => {
      gsap.fromTo(
        ".bn-img",
        { yPercent: -8, scale: 1.15 },
        {
          yPercent: 12,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: r.current,
            scrub: true,
            start: "top top",
            end: "bottom top",
          },
        },
      );
      gsap.from(".bn-t span", {
        yPercent: 110,
        stagger: 0.08,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
      });
    }, r);
    return () => c.revert();
  }, []);
  return (
    <header
      ref={r}
      className="relative h-[78vh] min-h-[520px] overflow-hidden flex items-end"
    >
      <img
        src={src || image(imageKey)}
        style={{ objectPosition: position }}
        alt=""
        className="bn-img absolute inset-0 w-full h-[120%] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/30" />
      <div className="absolute top-0 inset-x-0 h-12 bg-black" />
      <div className="wrap relative pb-20 w-full">
        <Eyebrow>{kicker}</Eyebrow>
        <h1 className="h1 bn-t overflow-hidden">
          {title.split(" ").map((w, i) => (
            <span key={i} className="inline-block mr-[.25em]">
              {w}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-xl text-stone/80 font-light">{sub}</p>
      </div>
    </header>
  );
}
export function FAQ({ list = faqs.slice(0, 4) }) {
  const [o, setO] = useState(0);
  return (
    <section className="sec bg-charcoal/40" aria-labelledby="faq">
      <div className="wrap grid md:grid-cols-[1fr_2fr] gap-14">
        <div>
          <Eyebrow>Answers</Eyebrow>
          <h2 id="faq" className="h2">
            Frequently asked questions
          </h2>
        </div>
        <div>
          {list.map(([q, a], i) => (
            <div key={q} className="border-b border-gold/25">
              <h3>
                <button
                  onClick={() => setO(o === i ? -1 : i)}
                  aria-expanded={o === i}
                  className="w-full flex justify-between gap-6 py-6 text-left font-display font-light text-lg"
                >
                  {q}
                  <span className="text-gold text-2xl">
                    {o === i ? "–" : "+"}
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {o === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden text-stone/80 leading-relaxed pr-10"
                  >
                    {a}
                    <span className="block pb-6" />
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export const CTA = ({
  title = "Have a story worth telling?",
  text = "Share your brief. We will reply within two working days.",
}) => (
  <section className="relative sec overflow-hidden text-center">
    <img
      src={image("contact")}
      alt=""
      className="absolute inset-0 w-full h-full object-cover opacity-40"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
    <Reveal className="wrap relative">
      <h2 className="h1 !text-4xl md:!text-7xl">{title}</h2>
      <p className="mt-6 text-stone/80 max-w-lg mx-auto">{text}</p>
      <Link to="/contact" className="btn mt-10">
        Book a call
      </Link>
    </Reveal>
  </section>
);
export const Marquee = ({ words }) => (
  <div className="overflow-hidden border-y border-gold/25 py-6" aria-hidden>
    <div
      className="flex w-max gap-16 font-display font-extralight text-3xl md:text-5xl uppercase text-stone/70 whitespace-nowrap"
      style={{ animation: "mq 40s linear infinite" }}
    >
      {[...words, ...words, ...words, ...words].map((w, i) => (
        <span key={i}>
          {w} <span className="text-gold">◆</span>
        </span>
      ))}
    </div>
  </div>
);
export function Stats({ items }) {
  const r = useRef();
  useEffect(() => {
    const c = gsap.context(() => {
      r.current.querySelectorAll("[data-n]").forEach((e) => {
        const o = { v: 0 },
          n = +e.dataset.n;
        gsap.to(o, {
          v: n,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: e, start: "top 90%", once: true },
          onUpdate: () =>
            (e.textContent = Math.round(o.v) + (e.dataset.s || "")),
        });
      });
    }, r);
    return () => c.revert();
  }, []);
  return (
    <div
      ref={r}
      className="wrap grid grid-cols-2 md:grid-cols-4 gap-10 text-center"
    >
      {items.map(([n, s, l]) => (
        <div key={l}>
          <p
            data-n={n}
            data-s={s}
            className="font-display font-extralight text-5xl md:text-7xl text-gold"
          >
            0
          </p>
          <p className="mt-3 text-sm text-stone/70">{l}</p>
        </div>
      ))}
    </div>
  );
}

export function Newsletter({ cls = "" }) {
  const [s, setS] = useState("");
  return (
    <div className={cls}>
      <form
        className="flex max-w-sm border-b border-gold/50"
        onSubmit={async (e) => {
          e.preventDefault();
          const f = e.target;
          setS("Sending...");
          try {
            await send("newsletter", { email: f.email.value });
            setS("Subscribed. Thank you.");
            f.reset();
          } catch {
            setS("Could not subscribe. Email hello@underooz.studio instead.");
          }
        }}
      >
        <label htmlFor="nl" className="sr-only">
          Email
        </label>
        <input
          id="nl"
          name="email"
          type="email"
          required
          placeholder="Your email"
          className="bg-transparent flex-1 py-3 outline-none placeholder:text-stone/50"
        />
        <button className="font-display text-xs track text-gold">Join</button>
      </form>
      <p role="status" className="mt-2 text-sm text-gold">
        {s}
      </p>
    </div>
  );
}
