import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import HeroSection from "../components/HeroSection";
import FeatureStrip from "../components/FeatureStrip";
import VehicleCard from "../components/VehicleCard";
import StatsBand from "../components/StatsBand";
import Icon from "../components/Icon";
import { Link } from "react-router-dom";

export default function Home() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function loadVehicles() {
      try {
        const response = await fetch("/api/vehicles", { headers: { Accept: "application/json" } });
        const data = await response.json();

        setVehicles((data.vehicles || []).map((vehicle) => ({
          ...vehicle,
          name: `${vehicle.brand} ${vehicle.model}`,
          type: vehicle.categories.map((category) => category.name).join(", "),
          price: vehicle.price_per_day,
        })));
      } catch {
        setVehicles([]);
      }
    }

    loadVehicles();
  }, []);

    return (
        <Layout>
          <HeroSection />
          <FeatureStrip />
          <section className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-11 px-6 py-4 pb-16 max-md:grid-cols-1">
            <img className="h-52 w-full rounded-xl object-cover" src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80" alt="Une moto prête pour la route" />
            <div><p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#5534e7]">Pourquoi nous choisir</p><h2 className="mb-4 text-3xl font-bold leading-none tracking-tight">Bougez librement,<br />allez plus loin.</h2><p className="mb-5 max-w-xs text-sm leading-relaxed text-gray-600">Louez une moto ou un scooter simplement, choisissez votre trajet et profitez de la route à votre rythme.</p><ul className="grid gap-4">{[["Simple à chaque étape", "Une réservation claire du début à la fin."], ["Une nouvelle route à chaque sortie", "Découvrez chaque destination à votre rythme."], ["Liberté sans limites", "Des deux-roues fiables où que vous alliez."]].map(([title, text], index) => <li className="flex items-center gap-3" key={title}><span className="grid h-6 w-6 place-items-center rounded-full bg-[#5534e7] text-xs font-bold text-white">{index + 1}</span><div><strong className="block text-sm">{title}</strong><small className="mt-0.5 block text-xs text-gray-600">{text}</small></div></li>)}</ul></div>
          </section>
          <section className="mx-auto max-w-6xl px-6 pb-16" id="vehicles"><div className="mb-6 flex items-end justify-between"><div><p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#5534e7]">Notre collection</p><h2 className="text-3xl font-bold leading-none tracking-tight">Trouvez le deux-roues<br />qui vous ressemble</h2></div><Link className="flex min-h-10 items-center gap-2 text-sm font-bold hover:text-[#5534e7]" to="/vehicles">Tout voir <Icon name="arrow" size={18} /></Link></div><div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-[420px]:grid-cols-1">{vehicles.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}</div></section>
          <StatsBand />
          <section className="mx-auto grid max-w-6xl grid-cols-2 items-center px-6 pb-16 max-md:grid-cols-1"><div><p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#5534e7]">Application Ride Libre</p><h2 className="mb-4 text-3xl font-bold leading-none tracking-tight">Emportez<br />votre liberté</h2><p className="mb-5 max-w-xs text-sm leading-relaxed text-gray-600">Votre prochaine aventure vous accompagne. Gérez vos réservations de motos et scooters simplement.</p><div className="flex gap-2"><div className="flex min-h-10 items-center gap-1 rounded bg-black px-3 py-1 text-sm text-white"> <small className="text-[8px]">Download on the<br /><strong className="text-xs">App Store</strong></small></div><div className="flex min-h-10 items-center gap-1 rounded bg-black px-3 py-1 text-sm text-white">▶ <small className="text-[8px]">GET IT ON<br /><strong className="text-xs">Google Play</strong></small></div></div></div><div className="relative h-64"><div className="absolute bottom-1 left-1/2 h-52 w-24 -translate-x-1/2 rounded-[20px] border-4 border-black bg-blue-50 shadow-inner before:absolute before:left-1/2 before:top-1 before:h-2 before:w-8 before:-translate-x-1/2 before:rounded-full before:bg-black" /><div className="absolute bottom-6 left-[62%] h-52 w-24 scale-90 rounded-[20px] border-4 border-black bg-blue-50 shadow-inner before:absolute before:left-1/2 before:top-1 before:h-2 before:w-8 before:-translate-x-1/2 before:rounded-full before:bg-black" /></div></section>
          <section className="relative mx-6 mb-0 flex min-h-40 items-center gap-7 overflow-hidden rounded-xl bg-[#5534e7] px-9 py-8 text-white max-md:flex-col max-md:items-start"><div><h2 className="mb-2 text-2xl font-bold leading-none">Enjoy every mile with<br />adorable companionship.</h2><p className="text-xs text-white/80">Tell us where you are going and we will help you get there.</p></div><form className="z-10 flex min-h-12 w-64 rounded-md bg-white p-1" onSubmit={(event) => event.preventDefault()}><input className="min-w-0 flex-1 border-0 px-3 text-sm text-gray-900 outline-none" aria-label="City" placeholder="City" /><button className="min-h-10 rounded bg-[#ff9e0b] px-4 text-sm font-bold" type="submit">Search</button></form></section>
        </Layout>
    )
}

