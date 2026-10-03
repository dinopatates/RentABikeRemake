import Brand from "./Brand";
import Icon from "./Icon";
import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-800 bg-[#1e2328] px-6 py-7 text-gray-100">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 border-b border-gray-700 pb-6">
        <Brand />
        <div className="flex items-center gap-2 text-xs"><Icon className="text-[#ff9e0b]" name="location" size={18} /><span><small className="block text-[10px] text-gray-400">Adresse</small><strong>Oxford Ave, Cary, NC 27511</strong></span></div>
        <div className="flex items-center gap-2 text-xs"><Icon className="text-[#ff9e0b]" name="wallet" size={18} /><span><small className="block text-[10px] text-gray-400">Email</small><strong>hello@ridelibre.com</strong></span></div>
        <div className="flex items-center gap-2 text-xs"><Icon className="text-[#ff9e0b]" name="phone" size={18} /><span><small className="block text-[10px] text-gray-400">Téléphone</small><strong>+537 547-6401</strong></span></div>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-[1.8fr_1fr_1fr_1fr] gap-9 py-7 max-md:grid-cols-2">
        <div><p className="text-xs leading-relaxed text-gray-400">Des motos fiables pour chaque route,<br />chaque trajet et chaque aventure.</p><div className="mt-4 flex gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#15181c] text-xs text-white">f</span><span className="grid h-6 w-6 place-items-center rounded-full bg-[#15181c] text-xs text-white">◎</span><span className="grid h-6 w-6 place-items-center rounded-full bg-[#15181c] text-xs text-white">𝕏</span></div></div>
        <div><h3 className="mb-3 text-sm font-bold">Liens utiles</h3>{["À propos", "Contact", "Galerie", "Blog", "FAQ"].map((link) => <Link className="mb-2 block text-xs text-gray-400 hover:text-[#ff9e0b]" to="/" key={link}>{link}</Link>)}</div>
        <div><h3 className="mb-3 text-sm font-bold">Deux-roues</h3>{["Scooters", "Motos", "Électriques", "125 cc", "Roadsters"].map((link) => <Link className="mb-2 block text-xs text-gray-400 hover:text-[#ff9e0b]" to="/vehicles" key={link}>{link}</Link>)}</div>
        <div><h3 className="mb-3 text-sm font-bold">Download App</h3><div className="mb-1 flex min-h-10 w-28 items-center gap-1 rounded bg-black px-2 py-1 text-sm text-white"><span></span><small className="text-[8px]">Download on the<br /><strong className="text-xs">App Store</strong></small></div><div className="flex min-h-10 w-28 items-center gap-1 rounded bg-black px-2 py-1 text-sm text-white"><span>▶</span><small className="text-[8px]">GET IT ON<br /><strong className="text-xs">Google Play</strong></small></div></div>
      </div>
      <p className="mx-auto max-w-6xl border-t border-gray-700 pt-3 text-center text-xs text-gray-500">© Ride Libre 2026</p>
    </footer>
  );
}
