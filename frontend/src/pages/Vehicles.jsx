import Layout from "../layouts/Layout";
import VehicleCard from "../components/VehicleCard";
import Icon from "../components/Icon";

const vehicles = [
  { name: "Mercedes", type: "Sedan", price: 25, seats: 5 },
  { name: "Mercedes", type: "Sport", price: 50, seats: 2 },
  { name: "Mercedes", type: "Sedan", price: 45, seats: 5 },
  { name: "Porsche", type: "SUV", price: 40, seats: 5 },
  { name: "Toyota", type: "Sedan", price: 35, seats: 5 },
  { name: "Porsche", type: "SUV", price: 50, seats: 7 },
  { name: "Toyota", type: "Minivan", price: 42, seats: 7 },
  { name: "Mercedes", type: "Cabriolet", price: 55, seats: 2 },
  { name: "Porsche", type: "Sport", price: 65, seats: 2 },
];

export default function Vehicles() {
  return (
    <Layout>
      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section className="mb-12 rounded-2xl bg-[#5534e7] px-8 py-14 text-white md:px-16">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-white/80">Our collection</p>
          <h1 className="max-w-xl text-4xl font-bold leading-tight md:text-5xl">Find the car for your next road.</h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80">Browse our comfortable, reliable cars and choose the one that fits your plans.</p>
        </section>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div><h2 className="text-2xl font-bold">All vehicles</h2><p className="mt-1 text-sm text-gray-600">{vehicles.length} cars available for your journey</p></div>
          <div className="flex flex-wrap gap-2">
            {["All cars", "Sedan", "SUV", "Sport"].map((filter, index) => <button className={`min-h-10 rounded-full px-4 text-sm font-bold ${index === 0 ? "bg-[#5534e7] text-white" : "border border-gray-200 bg-white text-gray-700"}`} type="button" key={filter}>{filter}</button>)}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{vehicles.map((vehicle) => <VehicleCard vehicle={vehicle} key={`${vehicle.name}-${vehicle.type}-${vehicle.price}`} />)}</div>
        <button className="mx-auto mt-10 flex min-h-11 items-center gap-2 rounded-lg border border-[#5534e7] px-5 text-sm font-bold text-[#5534e7]" type="button">Load more cars <Icon name="arrow" size={18} /></button>
      </main>
    </Layout>
  );
}
