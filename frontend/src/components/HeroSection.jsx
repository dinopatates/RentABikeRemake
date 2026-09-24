import BookingForm from "./BookingForm";
import Icon from "./Icon";

export default function HeroSection() {
	return (
		<section className="relative mx-auto min-h-[266px] max-w-6xl overflow-hidden rounded-[17px] bg-[#5534e7] text-white after:absolute after:inset-0 after:bg-[repeating-radial-gradient(ellipse_at_15%_120%,transparent_0_17px,rgba(255,255,255,.35)_18px_20px,transparent_21px_32px)] after:opacity-20 after:content-['']">
			<div className="relative z-[1] w-3/5 p-14 max-md:w-full max-md:p-8">
				<p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-white/80">Your journey starts here</p>
				<h1 className="mb-3 text-4xl font-bold leading-none tracking-tight max-md:text-3xl">Experience the road<br />like never before</h1>
				<p className="mb-5 max-w-72 text-sm leading-relaxed text-white/80">All you need is a perfect drive. Run on new roads, discover new places and make every mile count.</p>
				<a className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#ff9e0b] px-5 text-sm font-bold" href="#vehicles">View all cars <Icon name="arrow" size={18} /></a>
			</div>
			<BookingForm />
		</section>
	);
}