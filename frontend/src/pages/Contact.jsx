import Layout from "../layouts/Layout";
import Icon from "../components/Icon";

const contacts = [["Call us", "+537 547-6401", "phone"], ["Write to us", "hello@carrental.com", "wallet"], ["Find us", "Oxford Ave, Cary, NC 27511", "location"]];

export default function Contact() {
  return (
    <Layout>
      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section className="mb-12 rounded-2xl bg-[#5534e7] px-8 py-14 text-white md:px-16"><p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-white/80">Get in touch</p><h1 className="text-4xl font-bold leading-tight md:text-5xl">Let&apos;s make your<br />next trip happen.</h1><p className="mt-5 max-w-lg text-base leading-relaxed text-white/80">Have a question about a car, a booking or your next destination? Our team is here to help.</p></section>
        <section className="mb-14 grid grid-cols-3 gap-5 max-md:grid-cols-1">{contacts.map(([title, detail, icon]) => <article className="flex items-center gap-4 rounded-xl border border-gray-200 p-5" key={title}><span className="grid h-11 w-11 place-items-center rounded-full bg-orange-100 text-[#ff9e0b]"><Icon name={icon} size={22} /></span><span><strong className="block text-base">{title}</strong><small className="mt-1 block text-sm text-gray-600">{detail}</small></span></article>)}</section>
        <section className="grid grid-cols-2 gap-12 max-md:grid-cols-1"><div><p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#5534e7]">Send a message</p><h2 className="text-3xl font-bold">How can we help?</h2><p className="mt-4 max-w-md text-base leading-relaxed text-gray-600">Fill out the form and we&apos;ll get back to you as soon as possible.</p></div><form className="grid gap-4" onSubmit={(event) => event.preventDefault()}><label className="grid gap-2 text-sm font-bold">Your name<input className="min-h-12 rounded-lg border border-gray-300 px-4 text-base font-normal outline-none focus:border-[#5534e7] focus:ring-2 focus:ring-[#5534e7]/20" required type="text" placeholder="Your name" /></label><label className="grid gap-2 text-sm font-bold">Email address<input className="min-h-12 rounded-lg border border-gray-300 px-4 text-base font-normal outline-none focus:border-[#5534e7] focus:ring-2 focus:ring-[#5534e7]/20" required type="email" placeholder="you@example.com" /></label><label className="grid gap-2 text-sm font-bold">Message<textarea className="min-h-32 rounded-lg border border-gray-300 px-4 py-3 text-base font-normal outline-none focus:border-[#5534e7] focus:ring-2 focus:ring-[#5534e7]/20" placeholder="Tell us what you need" /></label><button className="min-h-12 rounded-lg bg-[#ff9e0b] text-base font-bold text-white" type="submit">Send message</button></form></section>
      </main>
    </Layout>
  );
}
