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
    async function loadCatalog() {
      try {
        const response = await fetch("/api/cars", { headers: { Accept: "application/json" } });
        const data = await response.json();

        setVehicles(data.cars || []);
        setCategories(data.categories || []);
      } finally {
        setLoading(false);
      }
    }

    loadCatalog();
  }, []);

  const filteredVehicles = activeCategory === null
    ? vehicles
    : vehicles.filter((vehicle) => vehicle.categories.some((category) => category.id === activeCategory));

  return (
    <Layout>
      {loading && <Loading />}
      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section className="mb-12 rounded-2xl bg-[#5534e7] px-8 py-14 text-white md:px-16">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-white/80">Our collection</p>
          <h1 className="max-w-xl text-4xl font-bold leading-tight md:text-5xl">Find the car for your next road.</h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80">Browse our comfortable, reliable cars and choose the one that fits your plans.</p>
        </section>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div><h2 className="text-2xl font-bold">All vehicles</h2><p className="mt-1 text-sm text-gray-600">{filteredVehicles.length} cars available for your journey</p></div>
          <div className="flex flex-wrap gap-2">
            <button className={`min-h-10 rounded-full px-4 text-sm font-bold transition-colors ${activeCategory === null ? "bg-[#5534e7] text-white" : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`} onClick={() => setActiveCategory(null)} type="button">All cars</button>
            {categories.map((category) => <button className={`min-h-10 rounded-full px-4 text-sm font-bold transition-colors ${activeCategory === category.id ? "bg-[#5534e7] text-white" : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`} onClick={() => setActiveCategory(category.id)} type="button" key={category.id}>{category.name}</button>)}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredVehicles.map((vehicle) => <VehicleCard vehicle={{ ...vehicle, name: `${vehicle.brand} ${vehicle.model}`, type: vehicle.categories.map((category) => category.name).join(", "), price: vehicle.price_per_day }} key={vehicle.id} />)}</div>
      </main>
    </Layout>
  );
}
