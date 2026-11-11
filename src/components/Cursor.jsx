import { useEffect, useRef } from "react";
import gsap from "gsap";
export default function Cursor() {
  const d = useRef(),
    r = useRef();
  useEffect(() => {
    if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    document.documentElement.classList.add("cc");
    const dx = gsap.quickTo(d.current, "x", { duration: 0.1 }),
      dy = gsap.quickTo(d.current, "y", { duration: 0.1 }),
      rx = gsap.quickTo(r.current, "x", { duration: 0.5, ease: "power3" }),
      ry = gsap.quickTo(r.current, "y", { duration: 0.5, ease: "power3" });
    const mv = (e) => {
      gsap.set(d.current, { opacity: 1 });
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const h = !!e.target.closest("a,button,input,textarea,select");
      gsap.to(r.current, {
        scale: h ? 1.8 : 1,
        opacity: h ? 0.6 : 1,
        duration: 0.3,
        overwrite: "auto",
      });
    };
    addEventListener("mousemove", mv);
    return () => {
      removeEventListener("mousemove", mv);
      document.documentElement.classList.remove("cc");
    };
  }, []);
  return (
    <>
      <div
        ref={r}
        aria-hidden
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 z-[95] w-9 h-9 -ml-[18px] -mt-[18px] rounded-full border border-gold pointer-events-none hidden [.cc_&]:block"
      />
      <div
        ref={d}
        aria-hidden
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 z-[95] w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-gold pointer-events-none hidden [.cc_&]:block"
      />
    </>
  );
}
