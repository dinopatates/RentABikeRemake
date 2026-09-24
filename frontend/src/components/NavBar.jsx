import Brand from "./Brand";
import Icon from "./Icon";

export default function NavBar() {
  return (
    <header className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-8 px-6">
      <a href="/" aria-label="Car Rental home"><Brand /></a>
      <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Main navigation">
        <a className="text-[#5534e7]" href="/">Home</a>
        <a className="hover:text-[#5534e7]" href="/vehicles">Vehicles</a>
        <a className="hover:text-[#5534e7]" href="/details">Details</a>
        <a className="hover:text-[#5534e7]" href="/about-us">About Us</a>
        <a className="hover:text-[#5534e7]" href="/contact">Contact Us</a>
      </nav>
      <a className="hidden items-center gap-3 text-sm md:flex" href="tel:+9962471680">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#5534e7] text-white"><Icon name="phone" size={18} /></span>
        <span><small className="mb-0.5 block text-xs text-gray-500">Need help?</small><strong>+996 247-1680</strong></span>
      </a>
      <button className="text-sm font-bold md:hidden" type="button" aria-label="Open menu">Menu</button>
    </header>
  );
}