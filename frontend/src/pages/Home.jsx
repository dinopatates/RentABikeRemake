import Layout from "../layouts/Layout";
import HeroSection from "../components/HeroSection";
import FeatureStrip from "../components/FeatureStrip";
import VehicleCard from "../components/VehicleCard";
import StatsBand from "../components/StatsBand";
import Icon from "../components/Icon";

const vehicles = [
    { name: "Mercedes", type: "Sedan", price: 25, seats: 95, imageClass: "car-mercedes" },
    { name: "Mercedes", type: "Sport", price: 50, seats: 95, imageClass: "car-mercedes-sport" },
    { name: "Mercedes", type: "Sedan", price: 45, seats: 95, imageClass: "car-mercedes-dark" },
    { name: "Porsche", type: "SUV", price: 40, seats: 95, imageClass: "car-porsche" },
    { name: "Toyota", type: "Sedan", price: 35, seats: 95, imageClass: "car-toyota" },
    { name: "Porsche", type: "SUV", price: 50, seats: 95, imageClass: "car-porsche-dark" },
];

export default function Home() {
    return (
        <Layout>
          <HeroSection />
          <FeatureStrip />
          <section className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-11 px-6 py-4 pb-16 max-md:grid-cols-1">
            <img className="h-52 w-full rounded-xl object-cover" src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80" alt="A car waiting for a new journey" />
            <div><p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#5534e7]">Why choose us</p><h2 className="mb-4 text-3xl font-bold leading-none tracking-tight">Move freely,<br />go further.</h2><p className="mb-5 max-w-xs text-sm leading-relaxed text-gray-600">We make renting a car feel easy from the first click. Choose your vehicle, pick your destination and enjoy the freedom of a trip made around you.</p><ul className="grid gap-4">{[["Easy at every step", "Simple booking from start to finish."], ["One new view from each road", "Discover places made for your own pace."], ["Freedom without limits", "Comfortable cars, wherever you go."]].map(([title, text], index) => <li className="flex items-center gap-3" key={title}><span className="grid h-6 w-6 place-items-center rounded-full bg-[#5534e7] text-xs font-bold text-white">{index + 1}</span><div><strong className="block text-sm">{title}</strong><small className="mt-0.5 block text-xs text-gray-600">{text}</small></div></li>)}</ul></div>
          </section>
          <section className="mx-auto max-w-6xl px-6 pb-16" id="vehicles"><div className="mb-6 flex items-end justify-between"><div><p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#5534e7]">Our collection</p><h2 className="text-3xl font-bold leading-none tracking-tight">Choose the car that<br />suits you</h2></div><a className="flex min-h-10 items-center gap-2 text-sm font-bold hover:text-[#5534e7]" href="/vehicles">View All <Icon name="arrow" size={18} /></a></div><div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-[420px]:grid-cols-1">{vehicles.map((vehicle) => <VehicleCard key={`${vehicle.name}-${vehicle.type}-${vehicle.price}`} vehicle={vehicle} />)}</div></section>
          <StatsBand />
          <section className="mx-auto grid max-w-6xl grid-cols-2 items-center px-6 pb-16 max-md:grid-cols-1"><div><p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#5534e7]">Car Rental app</p><h2 className="mb-4 text-3xl font-bold leading-none tracking-tight">Download<br />mobile app</h2><p className="mb-5 max-w-xs text-sm leading-relaxed text-gray-600">Take your next adventure with you. Our app makes booking, managing and driving simpler than ever.</p><div className="flex gap-2"><div className="flex min-h-10 items-center gap-1 rounded bg-black px-3 py-1 text-sm text-white"> <small className="text-[8px]">Download on the<br /><strong className="text-xs">App Store</strong></small></div><div className="flex min-h-10 items-center gap-1 rounded bg-black px-3 py-1 text-sm text-white">▶ <small className="text-[8px]">GET IT ON<br /><strong className="text-xs">Google Play</strong></small></div></div></div><div className="relative h-64"><div className="absolute bottom-1 left-1/2 h-52 w-24 -translate-x-1/2 rounded-[20px] border-4 border-black bg-blue-50 shadow-inner before:absolute before:left-1/2 before:top-1 before:h-2 before:w-8 before:-translate-x-1/2 before:rounded-full before:bg-black" /><div className="absolute bottom-6 left-[62%] h-52 w-24 scale-90 rounded-[20px] border-4 border-black bg-blue-50 shadow-inner before:absolute before:left-1/2 before:top-1 before:h-2 before:w-8 before:-translate-x-1/2 before:rounded-full before:bg-black" /></div></section>
          <section className="relative mx-6 mb-0 flex min-h-40 items-center gap-7 overflow-hidden rounded-xl bg-[#5534e7] px-9 py-8 text-white max-md:flex-col max-md:items-start"><div><h2 className="mb-2 text-2xl font-bold leading-none">Enjoy every mile with<br />adorable companionship.</h2><p className="text-xs text-white/80">Tell us where you are going and we will help you get there.</p></div><form className="z-10 flex min-h-12 w-64 rounded-md bg-white p-1" onSubmit={(event) => event.preventDefault()}><input className="min-w-0 flex-1 border-0 px-3 text-sm text-gray-900 outline-none" aria-label="City" placeholder="City" /><button className="min-h-10 rounded bg-[#ff9e0b] px-4 text-sm font-bold" type="submit">Search</button></form></section>
        </Layout>
    )
}

