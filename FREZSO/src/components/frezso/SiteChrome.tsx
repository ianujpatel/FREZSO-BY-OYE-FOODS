import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { whatsappUrl } from "@/data/products";
const logoAsset = { url: "/images/logo.webp" };

const links: Array<[string, string]> = [
  ["Home", "top"], ["Makhana", "makhana"], ["Flavours", "flavours"],
  ["Spices", "spices"], ["Our Story", "story"], ["Contact", "contact"],
];

export function SiteChrome() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return <>
    <motion.div className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-gold" style={{ scaleX: scrollYProgress }} />
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
      <button className="brand-lockup" onClick={() => go("top")} aria-label="FREZSO home">
        <img src={logoAsset.url} alt="FREZSO — Nature's Fresh" width={220} height={140} /><span>FROM BIHAR, INDIA</span>
      </button>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label,id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
      </nav>
      <div className="nav-actions">
        <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="nav-enquire">WhatsApp</a>
        <a href="tel:+916200895416" aria-label="Call FREZSO"><Phone size={16} /></a>
        <button className="menu-trigger" onClick={() => setOpen(!open)} aria-label="Open menu">{open ? <X /> : <Menu />}</button>
      </div>
    </header>
    <AnimatePresence>{open && <motion.div className="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      {links.map(([label,id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
      <a href={whatsappUrl()} target="_blank" rel="noreferrer">Enquire on WhatsApp</a>
    </motion.div>}</AnimatePresence>
  </>;
}

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState("EXPLORE");
  const [active, setActive] = useState(false);
  useEffect(() => {
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    const over = (event: MouseEvent) => { const target = event.target as HTMLElement; const text = target.closest("[data-cursor]")?.getAttribute("data-cursor"); setActive(Boolean(text)); if (text) setLabel(text); };
    window.addEventListener("mousemove", move); document.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); };
  }, []);
  return <motion.div className={`custom-cursor ${active ? "is-active" : ""}`} animate={{ x: position.x, y: position.y }} transition={{ type: "spring", stiffness: 500, damping: 35, mass: .2 }}>{label}</motion.div>;
}
