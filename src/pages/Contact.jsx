import { useState } from "react";
import { Banner, Seo, Eyebrow, FAQ, CTA } from "../components/ui";
import { faqs } from "../data";
import { send } from "../submit";
const F = faqs.slice(0, 4);
export default function Contact() {
  const [ok, setOk] = useState(false);
  const fld =
    "w-full bg-transparent border-b border-gold/40 py-3 outline-none focus:border-gold";
  return (
    <>
      <Seo
        title="Contact"
        path="contact"
        desc="Book a call with UNDEROOZ STUDIO for commercial ads, brand films, product photography or digital marketing."
        faq={F}
      />
      <Banner
        kicker="Contact"
        title="Let us make something"
        sub="Tell us about your project. We reply within two working days."
        imageKey="contact"
      />
      <section className="sec">
        <div className="wrap grid md:grid-cols-[3fr_2fr] gap-16">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const f = e.target;
              setOk("");
              try {
                await send("enquiry", Object.fromEntries(new FormData(f)));
                setOk("ok");
                f.reset();
              } catch {
                setOk("err");
              }
            }}
            className="space-y-8"
            aria-label="Project enquiry"
          >
            {[
              ["name", "Your name", "text"],
              ["email", "Email", "email"],
            ].map(([i, l, t]) => (
              <div key={i}>
                <label htmlFor={i} className="text-sm text-stone/70">
                  {l}
                </label>
                <input id={i} name={i} type={t} required className={fld} />
              </div>
            ))}
            <div>
              <label htmlFor="svc" className="text-sm text-stone/70">
                Service
              </label>
              <select id="svc" name="service" className={`${fld} bg-obsidian`}>
                <option>Advertisement & Shoots</option>
                <option>Digital Marketing</option>
                <option>Both</option>
              </select>
            </div>
            <div>
              <label htmlFor="msg" className="text-sm text-stone/70">
                Project details
              </label>
              <textarea
                id="msg"
                name="message"
                rows="4"
                required
                className={fld}
              />
            </div>
            <button className="btn">Send enquiry</button>
            {ok && (
              <p role="status" className="text-gold">
                {ok === "err"
                  ? "Could not send. Email hello@underooz.studio instead."
                  : "Thank you. We will reply within two working days."}
              </p>
            )}
          </form>
          <address className="not-italic space-y-8">
            <div>
              <Eyebrow>Email</Eyebrow>
              <p>hello@underooz.studio</p>
            </div>
            <div>
              <Eyebrow>Phone</Eyebrow>
              <p>+91 00000 00000</p>
            </div>
            <div>
              <Eyebrow>Studio hours</Eyebrow>
              <p>Mon to Sat, 10:00 to 19:00</p>
            </div>
          </address>
        </div>
      </section>
      <section className="sec bg-ivory text-obsidian">
        <div className="wrap">
          <h2 className="h2 mb-12">What happens next</h2>
          <ol className="grid md:grid-cols-3 gap-10">
            {[
              "We read your brief and reply within two days.",
              "We hold a 30-minute discovery call.",
              "You receive a clear proposal, timeline and quote.",
            ].map((t, i) => (
              <li key={i} className="border-t-2 border-gold pt-5">
                <span className="font-display text-gold">Step {i + 1}</span>
                <p className="mt-2">{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="sec">
        <div className="wrap text-center max-w-2xl">
          <h2 className="h2 !text-3xl">Shooting worldwide</h2>
          <p className="mt-5 text-stone/80">
            Based in India and available to travel. Remote reviews keep distance
            out of the way.
          </p>
        </div>
      </section>
      <FAQ list={F} />
      <CTA
        title="Prefer to talk?"
        text="Call or email and we will set up a time."
      />
    </>
  );
}
