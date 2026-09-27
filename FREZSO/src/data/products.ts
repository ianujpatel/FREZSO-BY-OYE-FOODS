const periPeriAsset = { url: "/images/frezso-peri-peri-hero.jpeg" };
const pudinaAsset = { url: "/images/frezso-pudina-hero.jpeg" };
const creamOnionAsset = { url: "/images/frezso-cream-onion-scene.jpeg" };
const pinkSaltAsset = { url: "/images/frezso-himalayan-salt.jpeg" };

const periPeri = periPeriAsset.url;
const pudina = pudinaAsset.url;
const creamOnion = creamOnionAsset.url;
const pinkSalt = pinkSaltAsset.url;

export type Product = {
  id: string;
  name: string;
  shortName: string;
  category: string;
  notes: string[];
  description: string;
  image: string;
  tone: string;
};

export const products: Product[] = [
  { id: "peri-peri", name: "Peri-Peri Makhana", shortName: "PERI-PERI", category: "Premium Roasted Makhana", notes: ["Bold", "Spicy", "Crunchy"], description: "A lively, layered heat wrapped around a remarkably light crunch.", image: periPeri, tone: "burgundy" },
  { id: "pudina", name: "Pudina Makhana", shortName: "PUDINA", category: "Premium Roasted Makhana", notes: ["Cool", "Fresh", "Crisp"], description: "Garden mint and bright Indian spice meet an airy, satisfying bite.", image: pudina, tone: "green" },
  { id: "cream-onion", name: "Cream & Onion Makhana", shortName: "CREAM & ONION", category: "Premium Roasted Makhana", notes: ["Creamy", "Savoury", "Crunchy"], description: "A smooth savoury classic, balanced for an elegant everyday snack.", image: creamOnion, tone: "ivory" },
  { id: "pink-salt", name: "Himalayan Pink Salt Makhana", shortName: "HIMALAYAN PINK SALT", category: "Premium Roasted Makhana", notes: ["Simple", "Balanced", "Pure"], description: "A restrained seasoning that lets the character of makhana lead.", image: pinkSalt, tone: "earth" },
];

export function whatsappUrl(product?: string) {
  const message = product
    ? `Hello FREZSO,\n\nI am interested in ${product}.\n\nPlease share the price, availability and details.\n\nThank you.`
    : "Hello FREZSO,\n\nI would like to know more about your products.\n\nPlease share the details.\n\nThank you.";
  return `https://wa.me/916200895416?text=${encodeURIComponent(message)}`;
}
