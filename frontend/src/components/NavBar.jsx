import Brand from "./Brand";
import Icon from "./Icon";

export default function NavBar() {
  return (
    <header className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-8 px-6">
      <a href="/" aria-label="Car Rental home"><Brand /></a>
      <nav className="hidden items-center gap-7 text-xs md:flex" aria-label="Main navigation">
        <a className="text-[#5534e7]" href="/">Home</a>
        <a className="hover:text-[#5534e7]" href="/vehicles">Vehicles</a>
        <a className="hover:text-[#5534e7]" href="/details">Details</a>
        <a className="hover:text-[#5534e7]" href="/about-us">About Us</a>
        <a className="hover:text-[#5534e7]" href="/contact">Contact Us</a>
      </nav>
      <a className="hidden items-center gap-2 text-xs md:flex" href="tel:+9962471680">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#5534e7] text-white"><Icon name="phone" size={16} /></span>
        <span><small className="mb-0.5 block text-[10px] text-gray-500">Need help?</small><strong>+996 247-1680</strong></span>
      </a>
      <button className="text-[11px] font-bold md:hidden" type="button" aria-label="Open menu">Menu</button>
    </header>
  );
}