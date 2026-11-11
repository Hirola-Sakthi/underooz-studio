import { Link } from "react-router-dom";
import { links, Logo } from "./Nav";
import { Newsletter } from "./ui";
export default function Footer() {
  return (
    <footer className="relative border-t border-gold/25 bg-charcoal/50 overflow-hidden">
      <p
        aria-hidden
        className="absolute -bottom-6 left-0 w-full text-center font-display font-extralight uppercase text-[15vw] leading-none text-ivory/[.04] whitespace-nowrap"
      >
        Underooz
      </p>
      <div className="wrap relative py-20 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Logo s={48} />
          <p className="mt-6 font-display font-light text-2xl max-w-sm">
            Cinematic craft, precision, elevated storytelling.
          </p>
          <Newsletter cls="mt-8" />
        </div>
        <nav aria-label="Footer">
          <h2 className="font-display text-[11px] track text-gold mb-5">
            Explore
          </h2>
          <ul className="space-y-3">
            {links.map(([p, l]) => (
              <li key={p}>
                <Link to={p} className="text-stone/80 hover:text-gold">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <address className="not-italic text-stone/80 space-y-3">
          <h2 className="font-display text-[11px] track text-gold mb-5">
            Studio
          </h2>
          <p>hello@underooz.studio</p>
          <p>+91 00000 00000</p>
          <p>Instagram, YouTube, Vimeo, LinkedIn</p>
        </address>
      </div>
      <div className="wrap relative border-t border-gold/15 py-6 flex flex-wrap justify-between gap-3 text-xs text-stone/60">
        <p>
          © {new Date().getFullYear()} UNDEROOZ STUDIO. All rights reserved.
        </p>
        <p className="font-display track">Shoot. Edit. Elevate.</p>
      </div>
    </footer>
  );
}
