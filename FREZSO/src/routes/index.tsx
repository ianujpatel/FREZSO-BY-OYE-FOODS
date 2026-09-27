import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Phone } from "lucide-react";
import { SiteChrome, CustomCursor } from "@/components/frezso/SiteChrome";
import { ProductDetail } from "@/components/frezso/ProductDetail";
import { products, type Product, whatsappUrl } from "@/data/products";
const wetlands = "/images/bihar-wetlands.jpg";
const macro = "/images/makhana-macro.png";
const redChilliAsset = { url: "/images/spice-red-chilli.jpeg" };
const corianderAsset = { url: "/images/spice-coriander.jpeg" };
const turmericAsset = { url: "/images/spice-turmeric.jpeg" };
const logoAsset = { url: "/images/logo.webp" };
const openingMakhanaAsset = { url: "/images/frezso-makhana-opening.jpeg" };
const periPeriActionAsset = { url: "/images/frezso-peri-peri-action.jpeg" };
const creamOnionWideAsset = { url: "/images/frezso-cream-onion-wide.jpeg" };

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "FREZSO — Premium Roasted Makhana from Bihar" },
    { name: "description", content: "Bihar's iconic makhana, reimagined for the modern world. Discover premium roasted FREZSO flavours." },
    { property: "og:title", content: "FREZSO — Makhana. Elevated." },
    { property: "og:description", content: "Rooted in Bihar. Reimagined by FREZSO." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Index,
});

function FloatingMakhana({ count = 7 }: { count?: number }) {
  return <div className="floating-makhana" aria-hidden="true">{Array.from({ length: count }).map((_, index) => <img key={index} src={macro} alt="" style={{ "--i": index } as React.CSSProperties} />)}</div>;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, .2, .72, 1], [.72, 1.05, .86, 1.08]);
  const rotate = useTransform(scrollYProgress, [.12, .42, .75], [-3, 4, 0]);
  const x = useTransform(scrollYProgress, [.42, .62, .78], ["0%", "28%", "0%"]);
  const background = useTransform(scrollYProgress, [0, .38, .58, .82], ["#090908", "#11110f", "#6d5039", "#f5f1e8"]);
  const initialOpacity = useTransform(scrollYProgress, [0, .1, .18], [1, 1, 0]);
  const distinctOpacity = useTransform(scrollYProgress, [.14, .24, .36], [0, 1, 0]);
  const rootedOpacity = useTransform(scrollYProgress, [.34, .44, .54], [0, 1, 0]);
  const todayOpacity = useTransform(scrollYProgress, [.52, .62, .7], [0, 1, 0]);
  const elevatedOpacity = useTransform(scrollYProgress, [.68, .79, .9], [0, 1, 0]);
  const flavourIndex = useTransform(scrollYProgress, [.86, .91, .95, .985], [0, 1, 2, 3]);
  const [active, setActive] = useState(0);
  const heroVisuals = [openingMakhanaAsset.url, periPeriActionAsset.url, products[1]?.image ?? openingMakhanaAsset.url, creamOnionWideAsset.url];
  useEffect(() => flavourIndex.on("change", latest => setActive(Math.min(3, Math.round(latest)))), [flavourIndex]);
  return <motion.section id="top" ref={ref} className="hero-scroll" style={{ background }}>
    <div className="hero-sticky">
      <div className="heritage-pattern" aria-hidden="true" />
      <motion.div className="hero-product" style={{ scale, rotate, x }}>
        {heroVisuals.map((image, index) => <motion.img key={image} src={image} alt={index === 0 ? "FREZSO premium Makhana with a bowl of loose makhana" : ""} width={1024} height={1280} className={active === index ? "active" : ""} initial={false} animate={{ opacity: active === index ? 1 : 0, scale: active === index ? 1 : .92, filter: active === index ? "blur(0px)" : "blur(14px)" }} transition={{ duration: .7 }} />)}
      </motion.div>
      <FloatingMakhana />
      <motion.div className="hero-copy hero-copy--initial" style={{ opacity: initialOpacity }}><span>FROM BIHAR, INDIA</span><h1>PREMIUM<br/>ROASTED<br/>MAKHANA.</h1><p>LIGHT. CRUNCHY. FULL OF FLAVOUR.</p></motion.div>
      <motion.div className="hero-copy hero-copy--center" style={{ opacity: distinctOpacity }}><span>FROM BIHAR.</span><h2>ONE OF INDIA'S<br/>MOST DISTINCTIVE<br/>SNACKS.</h2></motion.div>
      <motion.div className="hero-copy hero-copy--center dark-copy" style={{ opacity: rootedOpacity }}><h2>ROOTED IN<br/>BIHAR.</h2></motion.div>
      <motion.div className="hero-copy hero-copy--left dark-copy" style={{ opacity: todayOpacity }}><h2>REIMAGINED<br/>FOR TODAY.</h2></motion.div>
      <motion.div className="hero-copy hero-copy--center dark-copy" style={{ opacity: elevatedOpacity }}><h2>MAKHANA.<br/><em>ELEVATED.</em></h2></motion.div>
      <div className="scroll-cue">SCROLL TO DISCOVER <ArrowDown size={14}/></div>
    </div>
  </motion.section>;
}

function Origin() {
  const ref = useRef<HTMLElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0,1], ["-8%","8%"]);
  return <section id="story" ref={ref} className="origin-section">
    <motion.img src={wetlands} alt="Makhana cultivation wetland in Bihar at dawn" width={1920} height={1088} loading="lazy" style={{ y }} />
    <div className="origin-overlay"/><div className="origin-copy"><span>THE ORIGIN</span><h2>BORN WHERE<br/>MAKHANA BELONGS.</h2><strong>BIHAR, INDIA</strong><p>Drawn from a landscape of water, earth and patient craft. A regional icon, presented with a new point of view.</p></div>
    <div className="water-line">FROM LOCAL ROOTS <i/> TO MODERN TABLES.</div>
  </section>;
}

function Heritage() { const creamOnion = products.find(product => product.id === "cream-onion"); if (!creamOnion) return null; return <section className="heritage-section"><div className="heritage-art"><div className="motif"/><span>भूमि · जल · शिल्प</span></div><div className="heritage-product"><img src={creamOnion.image} alt="FREZSO Cream and Onion Makhana pack" width={1024} height={1280} loading="lazy"/></div><div className="heritage-copy"><span>BIHAR × MODERN INDIA</span><h2>ROOTED IN TRADITION.<br/><em>DESIGNED FOR NOW.</em></h2><p>Heritage is not decoration. It is a way of seeing—translated into material, restraint and unmistakably modern flavour.</p></div></section>; }

function WhyMakhana() {
  const ref = useRef<HTMLElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start start","end end"] });
  const words = ["LIGHT.","CRUNCHY.","FULL OF FLAVOUR.","ROOTED IN INDIA."];
  return <section id="makhana" ref={ref} className="why-scroll"><div className="why-sticky"><span className="eyebrow">WHY MAKHANA?</span><div className="why-product why-product--wide"><img src={openingMakhanaAsset.url} alt="FREZSO premium plain Makhana pack with a bowl of loose makhana" width={768} height={1024} loading="lazy"/></div><FloatingMakhana count={5}/><div className="why-words">{words.map((word,index) => <WhyWord key={word} word={word} progress={scrollYProgress} index={index}/>)}</div></div></section>;
}
function WhyWord({word,progress,index}:{word:string;progress:any;index:number}) { const start=index*.22; const opacity=useTransform(progress,[start,start+.08,start+.19],[0,1,index===3?1:0]); const y=useTransform(progress,[start,start+.08],[50,0]); return <motion.h2 style={{opacity,y}}>{word}</motion.h2>; }

function Macro() { return <section className="macro-section"><div className="macro-copy"><span>THE BITE</span><h2>SMALL BITE.<br/><em>BIG CRUNCH.</em></h2></div><div className="macro-cloud">{Array.from({length:8}).map((_,i)=><img key={i} src={macro} alt={i===0?"Roasted makhana close-up":""} width={1024} height={1024} loading="lazy" style={{"--i":i} as React.CSSProperties}/>)}</div></section>; }

function Flavours() {
  return <section id="flavours" className="flavours-section"><div className="flavour-heading"><span>THE RANGE</span><h2>FIND YOUR CRUNCH.</h2></div><div className="flavour-track">{products.map((product,index)=><article key={product.id} className={`flavour-panel tone-${product.tone}`}><div className="flavour-number">0{index+1}</div><div className="flavour-copy"><span>{product.category}</span><h3>{product.shortName}</h3><p>{product.notes.join(". ")}.</p></div><img src={product.image} alt={`${product.name} pack`} width={1024} height={1280} loading="lazy"/><div className="flavour-ghost">{product.shortName}</div></article>)}</div></section>;
}

function Collection({ onSelect }: { onSelect:(p:Product)=>void }) { return <section className="collection-section"><header><span>THE COLLECTION</span><h2>THE FREZSO<br/>MAKHANA COLLECTION.</h2></header><div className="collection-grid">{products.map((product,index)=><motion.button key={product.id} className={`product-card card-${index+1} tone-${product.tone}`} onClick={()=>onSelect(product)} whileHover={{y:-8}} data-cursor="EXPLORE"><span>0{index+1}</span><img src={product.image} alt={product.name} width={1024} height={1280} loading="lazy"/><div><small>{product.category}</small><h3>{product.name}</h3><p>{product.description}</p><strong>Discover <ArrowUpRight/></strong></div></motion.button>)}</div></section>; }

function Spices() { const spiceProducts = [{ name: "Red Chilli", image: redChilliAsset.url }, { name: "Turmeric", image: turmericAsset.url }, { name: "Coriander", image: corianderAsset.url }]; return <section id="spices" className="spices-section"><div className="spice-transition"><span>MAKHANA → SPICES</span><h2>FROM THE SNACK BOWL<br/>TO THE KITCHEN.</h2></div><div className="spice-image spice-gallery">{spiceProducts.map(spice => <figure key={spice.name}><img src={spice.image} alt={`FREZSO ${spice.name} Powder`} width={1024} height={768} loading="lazy"/><figcaption>{spice.name} Powder</figcaption></figure>)}</div><div className="spice-copy"><span>A SECOND CHAPTER</span><h2>THE FREZSO<br/><em>SPICE COLLECTION.</em></h2><p>Red Chilli · Turmeric · Coriander</p><a className="spice-enquire" href={`https://wa.me/916200895416?text=${encodeURIComponent("Hello FRESZO, I'm interested in your spices. Please share the details.")}`} target="_blank" rel="noreferrer" data-cursor="ENQUIRE">Enquire on WhatsApp <ArrowUpRight/></a></div></section>; }

function Manifesto() { return <section className="manifesto-section"><div><span>OUR POINT OF VIEW</span><h2>FROM BIHAR.<br/>FOR EVERYWHERE.</h2><p>FREZSO brings the character of Bihar into a modern premium food experience.</p></div><div className="manifesto-words"><span>TRADITION.</span><span>CRAFT.</span><span>FLAVOUR.</span><strong>FREZSO.</strong></div></section>; }

function Finale() { return <><section className="finale-section"><div className="spotlight"/><img className="finale-main-pack" src={openingMakhanaAsset.url} alt="FRESZO Makhana pack with a bowl of loose makhana" width={768} height={1024} loading="lazy"/><div className="finale-copy"><span>ROOTED IN BIHAR</span><h2>THE CRUNCH<br/>FROM BIHAR.</h2><p>MADE FOR THE WORLD.</p><div><a href={whatsappUrl("Premium Makhana")} target="_blank" rel="noreferrer" data-cursor="ENQUIRE">Enquire on WhatsApp <ArrowUpRight/></a><a href="tel:+916200895416">Call +91 6200895416</a></div></div></section><section id="contact" className="contact-section"><span>CONTACT</span><h2>LET'S TALK FLAVOUR.</h2><p>Have a question about FREZSO products?</p><div><a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp us <ArrowUpRight/></a><a href="tel:+916200895416">Call FREZSO <Phone/></a></div></section></>; }

function Footer(){
  const links: Array<[string,string]> = [["Makhana","makhana"],["Flavours","flavours"],["Spices","spices"],["Our Story","story"],["Contact","contact"]];
  const address = "Oye Foods, Sirsiya Chowk, P.S. Simraha, Block Forbesganj, District Araria, Bihar 854318, India";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  return <motion.footer initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.8,ease:[.22,1,.36,1]}}>
    <div className="footer-main">
      <div className="footer-business">
        <img className="footer-logo" src={logoAsset.url} alt="FRESZO — Nature's Fresh" width={280} height={180}/>
        <span>COMPANY</span>
        <h2>Oye Foods</h2>
        <strong>FRESZO</strong>
        <address>Sirsiya Chowk<br/>P.S. – Simraha<br/>Block – Forbesganj<br/>District – Araria<br/>PIN – 854318<br/>Bihar, India</address>
        <p><b>Contact Person</b> Sumit Kumar</p>
        <a className="footer-phone" href="tel:+918340279077"><b>Mobile</b> +91 83402 79077</a>
        <a className="footer-directions" href={mapsUrl} target="_blank" rel="noreferrer">Get Directions <ArrowUpRight size={16}/></a>
      </div>
      <div className="footer-map">
        <iframe title="Oye Foods, FRESZO location on Google Maps" src={embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/>
        <a href={mapsUrl} target="_blank" rel="noreferrer">View on Map <ArrowUpRight size={16}/></a>
      </div>
    </div>
    <div className="footer-links">
      <nav aria-label="Footer navigation">{links.map(([label,id])=><button key={id} onClick={()=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"})}>{label}</button>)}</nav>
      <div><a href="tel:+916200895416">+91 6200895416</a><a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp enquiry ↗</a></div>
    </div>
    <small>© 2026 FRESZO · Oye Foods · Rooted in Bihar.</small>
  </motion.footer>
}

function Index() { const [selected,setSelected]=useState<Product|null>(null); useEffect(()=>{ let ctx:{ revert:()=>void }|undefined; const setup=async()=>{const gsap=(await import("gsap")).default; const {ScrollTrigger}=await import("gsap/ScrollTrigger"); gsap.registerPlugin(ScrollTrigger); if(window.matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)").matches){ctx=gsap.context(()=>{const track=document.querySelector<HTMLElement>(".flavour-track"); if(track) gsap.to(track,{x:()=>-(track.scrollWidth-window.innerWidth),ease:"none",scrollTrigger:{trigger:".flavours-section",start:"top top",end:()=>`+=${track.scrollWidth}`,pin:true,scrub:1,invalidateOnRefresh:true}});});}}; void setup(); return()=>ctx?.revert();},[]); return <main><SiteChrome/><CustomCursor/><Hero/><Origin/><Heritage/><WhyMakhana/><Macro/><Flavours/><Collection onSelect={setSelected}/><Spices/><Manifesto/><Finale/><Footer/><ProductDetail product={selected} onClose={()=>setSelected(null)}/></main>; }
