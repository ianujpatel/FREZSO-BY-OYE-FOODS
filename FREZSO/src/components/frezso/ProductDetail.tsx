import { X, ArrowUpRight, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import type { Product } from "@/data/products";
import { whatsappUrl } from "@/data/products";

export function ProductDetail({ product, onClose }: { product: Product | null; onClose: () => void }) {
  useEffect(() => {
    if (!product) return;
    const key = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden"; window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", key); };
  }, [product, onClose]);
  return <AnimatePresence>{product && <motion.div className="product-modal" role="dialog" aria-modal="true" aria-label={product.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <button className="modal-close" onClick={onClose} aria-label="Close product details"><X /></button>
    <motion.div className={`modal-visual tone-${product.tone}`} initial={{ scale: .88, rotate: -4 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: .65, ease: [0.16,1,0.3,1] }}>
      <img src={product.image} alt={`${product.name} pack`} width={1024} height={1280} />
    </motion.div>
    <div className="modal-copy">
      <span className="eyebrow">{product.category}</span>
      <h2>{product.name}</h2><p>{product.description}</p>
      <ul>{product.notes.map(note => <li key={note}>{note}</li>)}</ul>
      <div className="modal-actions">
        <a href={whatsappUrl(product.name)} target="_blank" rel="noreferrer" data-cursor="ENQUIRE">Enquire on WhatsApp <ArrowUpRight /></a>
        <a href="tel:+916200895416">Call FREZSO <Phone /></a>
      </div>
    </div>
  </motion.div>}</AnimatePresence>;
}
