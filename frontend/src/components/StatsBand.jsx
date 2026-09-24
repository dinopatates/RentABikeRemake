const stats = [
  ["540+", "Cars", "car"],
  ["20k+", "Customers", "users"],
  ["25+", "Years", "calendar"],
  ["20m+", "Miles", "location"],
];

import Icon from "./Icon";

export default function StatsBand() {
  return (
    <section className="mx-auto mb-16 max-w-5xl rounded-xl bg-[#5534e7] px-7 py-7 text-white">
      <div className="relative z-10 text-center"><h2 className="mb-2 text-2xl font-bold">Facts In Numbers</h2><p className="mx-auto mb-5 max-w-sm text-xs text-white/80">Our customers choose freedom, comfort and a smooth ride for every adventure.</p></div>
      <div className="relative z-10 grid grid-cols-4 gap-4 max-md:grid-cols-2">
        {stats.map(([number, label, icon]) => <div className="flex min-h-14 items-center gap-3 rounded-lg bg-white p-3 text-gray-900" key={label}><span className="grid h-9 w-9 place-items-center rounded bg-orange-100 text-[#ff9e0b]"><Icon name={icon} size={22} /></span><span><strong className="block text-sm">{number}</strong><small className="block text-xs text-gray-600">{label}</small></span></div>)}
      </div>
    </section>
  );
}
