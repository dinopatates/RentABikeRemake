import Brand from "./Brand";
import Icon from "./Icon";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 px-6 py-7">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 border-b border-gray-200 pb-6">
        <Brand />
        <div className="flex items-center gap-2 text-xs"><Icon className="text-[#ff9e0b]" name="location" size={18} /><span><small className="block text-[10px] text-gray-600">Address</small><strong>Oxford Ave, Cary, NC 27511</strong></span></div>
        <div className="flex items-center gap-2 text-xs"><Icon className="text-[#ff9e0b]" name="wallet" size={18} /><span><small className="block text-[10px] text-gray-600">Email</small><strong>nigelr@yahoo.com</strong></span></div>
        <div className="flex items-center gap-2 text-xs"><Icon className="text-[#ff9e0b]" name="phone" size={18} /><span><small className="block text-[10px] text-gray-600">Phone</small><strong>+537 547-6401</strong></span></div>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-[1.8fr_1fr_1fr_1fr] gap-9 py-7 max-md:grid-cols-2">
        <div><p className="text-xs leading-relaxed text-gray-600">Reliable cars for every road,<br />every plan and every story.</p><div className="mt-4 flex gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-black text-xs text-white">f</span><span className="grid h-6 w-6 place-items-center rounded-full bg-black text-xs text-white">◎</span><span className="grid h-6 w-6 place-items-center rounded-full bg-black text-xs text-white">𝕏</span></div></div>
        <div><h3 className="mb-3 text-sm font-bold">Useful links</h3>{["About us", "Contact us", "Gallery", "Blog", "F.A.Q"].map((link) => <a className="mb-2 block text-xs text-gray-600" href="/" key={link}>{link}</a>)}</div>
        <div><h3 className="mb-3 text-sm font-bold">Vehicles</h3>{["Sedan", "Cabriolet", "Pickup", "Minivan", "SUV"].map((link) => <a className="mb-2 block text-xs text-gray-600" href="/vehicles" key={link}>{link}</a>)}</div>
        <div><h3 className="mb-3 text-sm font-bold">Download App</h3><div className="mb-1 flex min-h-10 w-28 items-center gap-1 rounded bg-black px-2 py-1 text-sm text-white"><span></span><small className="text-[8px]">Download on the<br /><strong className="text-xs">App Store</strong></small></div><div className="flex min-h-10 w-28 items-center gap-1 rounded bg-black px-2 py-1 text-sm text-white"><span>▶</span><small className="text-[8px]">GET IT ON<br /><strong className="text-xs">Google Play</strong></small></div></div>
      </div>
      <p className="mx-auto max-w-6xl border-t border-gray-200 pt-3 text-center text-xs text-gray-500">© Copyright Car Rental 2024. Design by Figma guru</p>
    </footer>
  );
}
