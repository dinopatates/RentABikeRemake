import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setMessage(response.ok ? data.message || "Connexion reussie." : data.message || "Connexion impossible.");
    } catch {
      setMessage("Le serveur est indisponible pour le moment.");
    }
  }

  return (
    <Layout>
      <main className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-10 md:grid-cols-2">
        <section>
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#5534e7]">Welcome back</p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">Ready for your next drive?</h1>
          <p className="mt-5 max-w-md leading-relaxed text-gray-600">Connectez-vous pour retrouver vos reservations et vos prochaines aventures.</p>
        </section>
        <form className="grid gap-5 rounded-2xl border border-gray-200 p-7 shadow-sm" onSubmit={handleSubmit}>
          <div><h2 className="text-2xl font-bold">Login</h2><p className="mt-1 text-sm text-gray-600">Accedez a votre compte.</p></div>
          <label className="grid gap-2 text-sm font-bold">Email<input className="min-h-12 rounded-lg border border-gray-300 px-4 text-base font-normal outline-none focus:border-[#5534e7] focus:ring-2 focus:ring-[#5534e7]/20" name="email" onChange={updateField} required type="email" value={form.email} /></label>
          <label className="grid gap-2 text-sm font-bold">Password<input className="min-h-12 rounded-lg border border-gray-300 px-4 text-base font-normal outline-none focus:border-[#5534e7] focus:ring-2 focus:ring-[#5534e7]/20" name="password" onChange={updateField} required type="password" value={form.password} /></label>
          {message && <p className="text-sm text-[#5534e7]" role="status">{message}</p>}
          <button className="min-h-12 rounded-lg bg-[#5534e7] px-5 text-base font-bold text-white" type="submit">Login</button>
          <p className="text-center text-sm text-gray-600">Pas encore de compte ? <Link className="font-bold text-[#5534e7]" to="/register">Register</Link></p>
        </form>
      </main>
    </Layout>
  );
}
