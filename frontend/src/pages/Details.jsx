import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import Icon from "../components/Icon";
import VehicleCard from "../components/VehicleCard";
import VehicleCarousel from "../components/VehicleCarousel";

export default function Details() {
  const [searchParams] = useSearchParams();
  const vehicleId = searchParams.get("id");
  const [vehicle, setVehicle] = useState(null);
  const [otherVehicles, setOtherVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVehicle() {
      if (!vehicleId) {
        setLoading(false);
        return;
      }

      try {
        const [vehicleResponse, catalogResponse] = await Promise.all([
          fetch(`/api/vehicles/${vehicleId}`, { headers: { Accept: "application/json" } }),
          fetch("/api/vehicles", { headers: { Accept: "application/json" } }),
        ]);
        const currentVehicle = await vehicleResponse.json();
        const catalog = await catalogResponse.json();

        setVehicle(currentVehicle);
        setOtherVehicles((catalog.vehicles || []).filter((item) => item.id !== currentVehicle.id).slice(0, 3));
      } finally {
        setLoading(false);
      }
    }

    loadVehicle();
  }, [vehicleId]);

  if (loading) {
    return (
      <Layout>
        <main className="mx-auto max-w-6xl px-6 pb-20">
          <section className="grid animate-pulse grid-cols-2 gap-10 rounded-2xl bg-gray-50 p-6 md:p-10 max-md:grid-cols-1" aria-label="Chargement du véhicule">
            <div className="min-h-72 rounded-xl bg-gray-200" />
            <div className="flex flex-col justify-center gap-4">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-10 w-3/4 rounded bg-gray-200" />
              <div className="h-24 rounded bg-gray-200" />
            </div>
          </section>
        </main>
      </Layout>
    );
  }

  if (!vehicle) {
    return (
      <Layout>
        <main className="mx-auto max-w-6xl px-6 pb-20 pt-10">
          <h1 className="text-3xl font-bold">Vehicle not found</h1>
          <Link className="mt-5 inline-flex font-bold text-[#5534e7]" to="/vehicles">Back to catalogue</Link>
        </main>
      </Layout>
    );
  }

  const vehicleName = `${vehicle.brand} ${vehicle.model}`;
  const vehicleType = vehicle.categories.map((category) => category.name).join(", ");
  const details = [
    ["Transmission", vehicle.transmission, "motorcycle"],
    ["Motorisation", vehicle.fuel_type, "wallet"],
    ["Année", vehicle.year, "calendar"],
  ];

  return (
    <Layout>
      <main className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600"><Link className="hover:text-[#5534e7]" to="/">Accueil</Link><span>/</span><Link className="hover:text-[#5534e7]" to="/vehicles">Véhicules</Link><span>/</span><span className="font-bold text-gray-900">{vehicleName}</span></div>
        <section className="grid grid-cols-2 gap-10 rounded-2xl bg-gray-50 p-6 md:p-10 max-md:grid-cols-1">
          <VehicleCarousel alt={vehicleName} images={vehicle.images.map((image) => image.image_url)} />
          <div className="flex flex-col justify-center"><p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#5534e7]">Disponible maintenant</p><div className="flex items-start justify-between gap-4"><div><h1 className="text-4xl font-bold">{vehicleName}</h1><p className="mt-2 text-base text-gray-600">{vehicleType}</p></div><p className="text-right"><strong className="block text-2xl text-[#5534e7]">{vehicle.price_per_day} €</strong><span className="text-sm text-gray-600">par jour</span></p></div><p className="mt-7 text-base leading-relaxed text-gray-600">{vehicle.description}</p><div className="my-8 grid grid-cols-2 gap-4">{details.map(([label, value, icon]) => <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3" key={label}><span className="text-[#5534e7]"><Icon name={icon} size={22} /></span><span><strong className="block text-sm">{value}</strong><small className="text-xs text-gray-600">{label}</small></span></div>)}</div><Link className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#ff9e0b] text-base font-bold text-white transition-colors hover:bg-[#ffb83d]" to={`/?vehicle=${vehicle.id}#booking`}>Réserver ce véhicule <Icon name="arrow" size={19} /></Link></div>
        </section>
        <section className="pt-16"><div className="mb-7 flex items-end justify-between"><div><p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#5534e7]">Vous aimerez aussi</p><h2 className="text-3xl font-bold">Autres véhicules</h2></div><Link className="flex min-h-10 items-center gap-2 text-sm font-bold text-[#5534e7]" to="/vehicles">Tout voir <Icon name="arrow" size={18} /></Link></div><div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">{otherVehicles.map((item) => <VehicleCard key={item.id} vehicle={{ ...item, name: `${item.brand} ${item.model}`, type: item.categories.map((category) => category.name).join(", "), price: item.price_per_day }} />)}</div></section>
      </main>
    </Layout>
  );
}
