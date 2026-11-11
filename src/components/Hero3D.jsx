import { image } from "../data";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Link } from "react-router-dom";
export default function Hero3D() {
  const m = useRef(),
    [tc, setTc] = useState("00:00:00:00");
  useEffect(() => {
    const el = m.current,
      W = () => el.clientWidth,
      H = () => el.clientHeight;
    const R = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    R.setPixelRatio(Math.min(devicePixelRatio, 2));
    R.setSize(W(), H());
    el.appendChild(R.domElement);
    const S = new THREE.Scene(),
      C = new THREE.PerspectiveCamera(50, W() / H(), 0.1, 100);
    C.position.z = 8;
    const g = new THREE.Group();
    S.add(g);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xc49c5f,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    g.add(new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.4, 14, 64), mat));
    // 3D spider hanging on a silk thread inside the ring
    const sp = new THREE.Group(),
      sb = new THREE.Group();
    sp.add(sb);
    S.add(sp);
    sp.scale.setScalar(0.8);
    sp.position.y = 0.1;
    const sm = new THREE.MeshBasicMaterial({
        color: 0xc49c5f,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
      }),
      fill = new THREE.MeshBasicMaterial({ color: 0x181b19 }),
      gm = new THREE.MeshBasicMaterial({
        color: 0xc49c5f,
        transparent: true,
        opacity: 0.92,
      });
    const part = (geo, pos, sc) => {
      const w = new THREE.Mesh(geo, sm),
        f = new THREE.Mesh(geo, fill);
      [w, f].forEach((o) => {
        o.position.set(...pos);
        o.scale.set(...sc);
      });
      f.scale.multiplyScalar(0.97);
      sb.add(f, w);
    };
    part(
      new THREE.LatheGeometry(
        [
          [0, 0.35],
          [0.3, 0.15],
          [0.46, -0.2],
          [0.28, -0.85],
          [0, -1.3],
        ].map((q) => new THREE.Vector2(q[0], q[1])),
        12,
      ),
      [0, 0, 0],
      [1, 1, 0.8],
    );
    part(new THREE.SphereGeometry(0.3, 12, 10), [0, 0.5, 0], [1.1, 1, 0.85]);
    [-0.1, 0.1].forEach((x) => {
      const e = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), gm);
      e.position.set(x, 0.62, 0.24);
      sb.add(e);
    });
    const L = [
      [
        [0.1, 0.55, 0],
        [0.6, 0.95, 0.2],
        [1.15, 1.25, 0.3],
        [1.45, 1.85, 0.1],
      ],
      [
        [0.15, 0.4, 0],
        [0.9, 0.75, 0.25],
        [1.5, 0.5, 0.3],
        [1.7, -0.2, 0.15],
        [1.75, -1.2, 0],
      ],
      [
        [0.15, 0.28, 0],
        [0.7, 0.2, 0.25],
        [1.15, -0.3, 0.3],
        [1.3, -1.1, 0.15],
        [1.35, -1.9, 0],
      ],
      [
        [0.15, 0.15, 0],
        [0.45, 0, 0.2],
        [0.75, -0.6, 0.25],
        [0.9, -1.5, 0.1],
        [0.95, -2.2, 0],
      ],
    ];
    const legs = [];
    L.forEach((p) =>
      [1, -1].forEach((s) => {
        const c = new THREE.CatmullRomCurve3(
          p.map((v) => new THREE.Vector3(v[0] * s, v[1], v[2])),
        );
        const m = new THREE.Mesh(new THREE.TubeGeometry(c, 40, 0.035, 6), gm);
        sb.add(m);
        legs.push({ m, s });
      }),
    );
    const thread = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 1, 0),
      ]),
      new THREE.LineBasicMaterial({
        color: 0xd8d3c8,
        transparent: true,
        opacity: 0.5,
      }),
    );
    sp.add(thread);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2,
        c = new THREE.Mesh(
          new THREE.CylinderGeometry(0.45, 0.45, 0.12, 24),
          mat,
        );
      c.position.set(Math.cos(a) * 2.6, Math.sin(a) * 2.6, 0);
      c.rotation.x = Math.PI / 2;
      g.add(c);
    }
    const N = 900,
      p = new Float32Array(N * 3).map(() => (Math.random() - 0.5) * 22);
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(p, 3));
    const pts = new THREE.Points(
      pg,
      new THREE.PointsMaterial({
        color: 0xfbfaf2,
        size: 0.03,
        transparent: true,
        opacity: 0.6,
      }),
    );
    S.add(pts);
    let mx = 0,
      my = 0,
      raf;
    const mv = (e) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    };
    addEventListener("mousemove", mv);
    const rs = () => {
      R.setSize(W(), H());
      C.aspect = W() / H();
      C.updateProjectionMatrix();
    };
    addEventListener("resize", rs);
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const clk = new THREE.Clock(),
      anim = () => {
        if (reduce) return;
        const k = clk.getElapsedTime();
        sb.position.y = Math.sin(k * 0.9) * 0.15;
        thread.position.y = sb.position.y + 0.62;
        thread.scale.y = 6 - thread.position.y;
        sp.rotation.z = Math.sin(k * 0.6) * 0.05;
        sp.rotation.y += (mx * 0.9 - sp.rotation.y) * 0.05;
        sp.rotation.x += (my * 0.5 - sp.rotation.x) * 0.05;
        legs.forEach((l, i) => {
          l.m.rotation.z = l.s * Math.sin(k * 2.2 + i * 0.8) * 0.035;
          l.m.rotation.x = Math.sin(k * 2.2 + i * 0.8 + 1) * 0.02;
        });
      };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!reduce) {
        g.rotation.z += 0.0015;
        g.rotation.y += (mx * 1.2 - g.rotation.y) * 0.04;
        g.rotation.x += (my * 0.8 - g.rotation.x) * 0.04;
        pts.rotation.y += 0.0004;
      }
      anim();
      R.render(S, C);
    };
    tick();
    const t0 = Date.now(),
      iv = setInterval(() => {
        const d = Date.now() - t0,
          f = Math.floor(d / 40) % 25,
          s = Math.floor(d / 1000) % 60,
          mi = Math.floor(d / 60000);
        setTc([0, mi, s, f].map((v) => String(v).padStart(2, "0")).join(":"));
      }, 80);
    const tl = gsap.timeline({ delay: 0.3 });
    tl.from(".hr-l", {
      yPercent: 120,
      stagger: 0.12,
      duration: 1.4,
      ease: "power4.out",
    }).from(".hr-f", { opacity: 0, y: 20, duration: 1, stagger: 0.15 }, "-=.6");
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(iv);
      removeEventListener("mousemove", mv);
      removeEventListener("resize", rs);
      R.dispose();
      el.removeChild(R.domElement);
      tl.kill();
    };
  }, []);
  return (
    <section
      className="relative h-screen min-h-[640px] overflow-hidden bg-[radial-gradient(ellipse_at_60%_40%,#3a2f1d_0%,#181B19_65%)]"
      aria-label="UNDEROOZ STUDIO hero"
    >
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src={image("studio")}
        alt="Professional cinema camera on a warmly lit production set"
        fetchPriority="high"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/60" />
      <div ref={m} className="absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-[7vh] bg-black" />
      <div className="absolute inset-x-0 bottom-0 h-[7vh] bg-black" />
      <div className="absolute inset-[9vh_4vw] pointer-events-none hidden md:block">
        {[
          "top-0 left-0 border-t border-l",
          "top-0 right-0 border-t border-r",
          "bottom-0 left-0 border-b border-l",
          "bottom-0 right-0 border-b border-r",
        ].map((c) => (
          <i key={c} className={`absolute w-8 h-8 border-gold/70 ${c}`} />
        ))}
      </div>
      <div className="absolute top-[11vh] right-[5vw] hidden md:flex items-center gap-3 font-display text-xs track text-ivory/80">
        <i
          className="w-2.5 h-2.5 rounded-full bg-red-500"
          style={{ animation: "rec 1.4s infinite" }}
        />
        REC {tc}
      </div>
      <div className="relative z-10 h-full wrap flex flex-col justify-center">
        <p className="hr-f font-display text-[11px] track text-gold mb-6">
          Cinematic craft. Precision. Elevated storytelling.
        </p>
        <h1
          className="font-display font-extralight uppercase leading-[.95] text-[13vw] md:text-[9vw]"
          style={{ letterSpacing: ".08em" }}
        >
          {["Underooz", "Studio"].map((w) => (
            <span key={w} className="block overflow-hidden">
              <span className="hr-l block">{w}</span>
            </span>
          ))}
        </h1>
        <p className="hr-f mt-6 font-display text-sm track text-stone">
          Shoot. Edit. Elevate.
        </p>
        <div className="hr-f mt-10 flex flex-wrap gap-5">
          <Link to="/projects" className="btn">
            Watch the reel
          </Link>
          <Link to="/contact" className="btn border-stone/40">
            Start a project
          </Link>
        </div>
      </div>
      <div className="absolute bottom-[9vh] left-1/2 -translate-x-1/2 font-display text-[10px] track text-stone/60">
        Scroll
      </div>
    </section>
  );
}
