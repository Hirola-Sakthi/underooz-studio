import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
export const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/services", "Services"],
  ["/projects", "Projects"],
  ["/blogs", "Blogs"],
  ["/contact", "Contact"],
];
export const Logo = ({ s = 34 }) => (
  <svg width={s} height={s} viewBox="0 0 40 40" aria-hidden>
    <path
      d="M6 4h10v18a4 4 0 0 0 8 0V4h10v18a14 14 0 0 1-28 0z"
      fill="#FBFAF2"
      stroke="#C49C5F"
      strokeWidth="1"
    />
    <path d="M17 9l7 4-7 4z" fill="#C49C5F" />
  </svg>
);
export default function Nav() {
  const [s, setS] = useState(false),
    [o, setO] = useState(false);
  useEffect(() => {
    const f = () => setS(scrollY > 60);
    f();
    addEventListener("scroll", f);
    return () => removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <nav
        aria-label="Primary"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${s ? "bg-obsidian/85 backdrop-blur-md py-3 border-b border-gold/20" : "py-6"}`}
      >
        <div className="wrap flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Logo />
            <span className="font-display font-light track text-sm hidden sm:block">
              UNDEROOZ
            </span>
          </Link>
          <ul className="hidden lg:flex gap-10">
            {links.map(([p, l]) => (
              <li key={p}>
                <NavLink
                  to={p}
                  end={p === "/"}
                  className={({ isActive }) =>
                    `font-display text-[11px] track uppercase transition-colors hover:text-gold ${isActive ? "text-gold" : "text-ivory/80"}`
                  }
                >
                  {l}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn !py-3 !px-6 hidden lg:inline-flex">
            Book a call
          </Link>
          <button
            className="lg:hidden font-display text-xs track"
            aria-expanded={o}
            onClick={() => setO(!o)}
          >
            {o ? "Close" : "Menu"}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {o && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 z-40 bg-obsidian flex flex-col justify-center items-center gap-6"
          >
            {links.map(([p, l]) => (
              <Link
                key={p}
                to={p}
                onClick={() => setO(false)}
                className="font-display font-extralight text-4xl uppercase track hover:text-gold"
              >
                {l}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
