import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import VehicleCard from "../components/VehicleCard";
import Loading from "../components/Loading";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/vehicles", { headers: { Accept: "application/json" } })
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data.vehicles || []);
        setCategories(data.categories || []);
      })
      .catch(() => {
        setVehicles([]);
        setCategories([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <main className="mx-auto max-w-6xl px-6 pb-20">
          <section className="mb-12 rounded-2xl bg-[#252a30] px-8 py-14 text-white md:px-16">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#ff9e0b]">Notre collection</p>
            <h1 className="max-w-xl text-4xl font-bold leading-tight md:text-5xl">La route commence sur deux roues.</h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-300">Motos et scooters fiables pour vos trajets urbains, vos balades et vos escapades.</p>
          </section>
          <section id="loading" className="w-full justify-center items-center h-24">

              <div className="flex flex-col justify-center items-center px-5 py-4 text-center">
                <span className="h-7 w-7 animate-spin rounded-full border-4 border-[#ff9e0b] border-t-[#5534e7]" />
                <span className="text-sm font-bold text-white">Chargement...</span>
              </div>

          </section>
        </main>
      </Layout>
    );
  }

  const filteredVehicles = activeCategory === null
    ? vehicles
    : vehicles.filter((vehicle) => vehicle.categories.some((category) => category.id === activeCategory));

  return (
    <Layout>
      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section className="mb-12 rounded-2xl bg-[#252a30] px-8 py-14 text-white md:px-16">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#ff9e0b]">Notre collection</p>
          <h1 className="max-w-xl text-4xl font-bold leading-tight md:text-5xl">La route commence sur deux roues.</h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-300">Motos et scooters fiables pour vos trajets urbains, vos balades et vos escapades.</p>
        </section>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div><h2 className="text-2xl font-bold text-white">Tous les véhicules</h2><p className="mt-1 text-sm text-gray-400">{filteredVehicles.length} motos et scooters disponibles</p></div>
          <div className="flex flex-wrap gap-2">
            <button className={`min-h-10 rounded px-4 text-sm font-bold transition-colors ${activeCategory === null ? "bg-[#ff9e0b] text-[#15181c]" : "border border-gray-700 bg-[#252a30] text-gray-300 hover:border-[#ff9e0b]"}`} onClick={() => setActiveCategory(null)} type="button">Tous</button>
            {categories.map((category) => <button className={`min-h-10 rounded px-4 text-sm font-bold transition-colors ${activeCategory === category.id ? "bg-[#ff9e0b] text-[#15181c]" : "border border-gray-700 bg-[#252a30] text-gray-300 hover:border-[#ff9e0b]"}`} onClick={() => setActiveCategory(category.id)} type="button" key={category.id}>{category.name}</button>)}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredVehicles.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={{ ...vehicle, name: `${vehicle.brand} ${vehicle.model}`, type: vehicle.categories.map((category) => category.name).join(", "), price: vehicle.price_per_day }} />)}</div>
      </main>
    </Layout>
  );
}
