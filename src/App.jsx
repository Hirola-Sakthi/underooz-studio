import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import Cursor from "./components/Cursor";
import Detail from "./pages/Detail";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
export default function App() {
  const l = useLocation();
  useEffect(() => {
    scrollTo(0, 0);
  }, [l.pathname]);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:bg-gold focus:text-obsidian focus:p-3"
      >
        Skip to content
      </a>
      <Cursor />
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          key={l.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Routes location={l}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/projects/:slug" element={<Detail kind="project" />} />
            <Route path="/blogs/:slug" element={<Detail kind="post" />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}
