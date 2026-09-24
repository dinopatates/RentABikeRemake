import Layout from "../layouts/Layout";
import Icon from "../components/Icon";
import VehicleCard from "../components/VehicleCard";

const carImage = "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1000&q=80";

const details = [
  ["Transmission", "Automatic", "car"],
  ["Seats", "5 passengers", "users"],
  ["Fuel type", "Petrol", "wallet"],
  ["Air conditioner", "Available", "shield"],
];

const otherCars = [
  { name: "Mercedes", type: "Sport", price: 50, seats: 2 },
  { name: "Porsche", type: "SUV", price: 40, seats: 5 },
  { name: "Toyota", type: "Sedan", price: 35, seats: 5 },
];

export default function Details() {
  return (
    <Layout>
      <main className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600"><a className="hover:text-[#5534e7]" href="/">Home</a><span>/</span><span className="font-bold text-gray-900">Vehicle details</span></div>
        <section className="grid grid-cols-2 gap-10 rounded-2xl bg-gray-50 p-6 md:p-10 max-md:grid-cols-1">
          <img className="h-full min-h-72 w-full rounded-xl object-cover" src={carImage} alt="Mercedes Sedan" />
          <div className="flex flex-col justify-center"><p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#5534e7]">Available now</p><div className="flex items-start justify-between gap-4"><div><h1 className="text-4xl font-bold">Mercedes</h1><p className="mt-2 text-base text-gray-600">Comfortable Sedan</p></div><p className="text-right"><strong className="block text-2xl text-[#5534e7]">$25</strong><span className="text-sm text-gray-600">per day</span></p></div><p className="mt-7 text-base leading-relaxed text-gray-600">A smooth, comfortable car for city drives, weekend escapes and everything between. Make every mile yours.</p><div className="my-8 grid grid-cols-2 gap-4">{details.map(([label, value, icon]) => <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3" key={label}><span className="text-[#5534e7]"><Icon name={icon} size={22} /></span><span><strong className="block text-sm">{value}</strong><small className="text-xs text-gray-600">{label}</small></span></div>)}</div><button className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#ff9e0b] text-base font-bold text-white" type="button">Book this car <Icon name="arrow" size={19} /></button></div>
        </section>
        <section className="pt-16"><div className="mb-7 flex items-end justify-between"><div><p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#5534e7]">You may also like</p><h2 className="text-3xl font-bold">Other cars</h2></div><a className="flex min-h-10 items-center gap-2 text-sm font-bold text-[#5534e7]" href="/vehicles">View all <Icon name="arrow" size={18} /></a></div><div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">{otherCars.map((vehicle) => <VehicleCard vehicle={vehicle} key={vehicle.type} />)}</div></section>
      </main>
    </Layout>
  );
}
