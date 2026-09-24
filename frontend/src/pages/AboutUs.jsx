import Layout from "../layouts/Layout";
import StatsBand from "../components/StatsBand";
import Icon from "../components/Icon";

const values = [
  ["Easy by design", "A simple booking experience that keeps every step clear.", "check"],
  ["Comfort first", "Well-kept cars selected to make every journey feel better.", "shield"],
  ["Here when needed", "A helpful team ready to make your plans move smoothly.", "users"],
];

export default function AboutUs() {
  return (
    <Layout>
      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section className="mb-16 rounded-2xl bg-[#5534e7] px-8 py-14 text-white md:px-16"><p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-white/80">About Car Rental</p><h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-5xl">More than a rental.<br />A better way to move.</h1><p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">We help people get where they are going with simple tools, reliable cars and a little more freedom.</p></section>
        <section className="mb-16 grid grid-cols-2 items-center gap-12 max-md:grid-cols-1"><img className="h-80 w-full rounded-xl object-cover" src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1000&q=80" alt="Car ready for a journey" /><div><p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#5534e7]">Our story</p><h2 className="text-3xl font-bold leading-tight">Every road has a reason.</h2><p className="mt-5 text-base leading-relaxed text-gray-600">Car Rental started with one simple idea: renting a car should feel as easy as starting the engine. Today, we bring that feeling to every booking, every city and every customer.</p><a className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#5534e7] px-5 text-sm font-bold text-white" href="/contact">Talk to our team <Icon name="arrow" size={18} /></a></div></section>
        <section className="mb-16"><div className="mb-8"><p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#5534e7]">What matters to us</p><h2 className="text-3xl font-bold">Built around your journey.</h2></div><div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">{values.map(([title, text, icon]) => <article className="rounded-xl border border-gray-200 p-6" key={title}><span className="mb-5 grid h-11 w-11 place-items-center rounded-lg bg-orange-100 text-[#ff9e0b]"><Icon name={icon} size={24} /></span><h3 className="text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-gray-600">{text}</p></article>)}</div></section>
        <StatsBand />
        <section className="grid grid-cols-2 items-center gap-10 py-16 max-md:grid-cols-1"><div><p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#5534e7]">A little inspiration</p><h2 className="text-3xl font-bold">Unique, unforgettable memories on the road.</h2><p className="mt-5 text-base leading-relaxed text-gray-600">From a quick city trip to a long weekend away, the right car gives every plan a little more possibility.</p></div><img className="h-64 w-full rounded-xl object-cover" src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1000&q=80" alt="Car on the road" /></section>
        <section className="rounded-xl bg-[#5534e7] px-8 py-10 text-white md:flex md:items-center md:justify-between"><div><h2 className="text-3xl font-bold">Download our app</h2><p className="mt-3 text-base text-white/80">Your next journey is always within reach.</p></div><a className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-[#ff9e0b] px-5 text-base font-bold md:mt-0" href="/">Get the app</a></section>
      </main>
    </Layout>
  );
}
