import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";

function emptyVehicle() {
  return { brand: "", model: "", year: new Date().getFullYear(), price_per_day: "", description: "", transmission: "Automatique", fuel_type: "Essence", category_ids: [] };
}

function isAdmin(user) {
  return user && [1, "1", "admin"].includes(user.role);
}

export default function AdminVehicles() {
  const navigate = useNavigate();
  const [user] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [form, setForm] = useState(emptyVehicle());
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAdmin(user)) return;

    fetch("/api/vehicles", { headers: { Accept: "application/json" } })
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data.vehicles || []);
        setCategories(data.categories || []);
      })
      .catch(() => setMessage("Impossible de charger les véhicules."));
  }, [user]);

  if (!isAdmin(user)) {
    return (
      <Layout>
        <main className="mx-auto max-w-3xl px-6 py-24 text-center text-white">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[1.5px] text-[#ff9e0b]">Accès restreint</p>
          <h1 className="text-4xl font-bold">Espace administrateur</h1>
          <p className="mt-4 text-gray-400">Cette page est réservée aux administrateurs.</p>
          <button className="mt-8 rounded bg-[#ff9e0b] px-5 py-3 text-sm font-bold text-[#15181c]" onClick={() => navigate(user ? "/vehicles" : "/login")} type="button">{user ? "Retour au catalogue" : "Se connecter"}</button>
        </main>
      </Layout>
    );
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function toggleCategory(categoryId) {
    setForm((current) => ({
      ...current,
      category_ids: current.category_ids.includes(categoryId) ? current.category_ids.filter((id) => id !== categoryId) : [...current.category_ids, categoryId],
    }));
  }

  function editVehicle(vehicle) {
    setEditingVehicle(vehicle);
    setForm({ brand: vehicle.brand, model: vehicle.model, year: vehicle.year, price_per_day: vehicle.price_per_day, description: vehicle.description || "", transmission: vehicle.transmission, fuel_type: vehicle.fuel_type, category_ids: vehicle.categories.map((category) => category.id) });
    setMessage("");
  }

  function resetForm() {
    setEditingVehicle(null);
    setForm(emptyVehicle());
    setMessage("");
  }

  async function saveVehicle(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(editingVehicle ? `/api/vehicles/${editingVehicle.id}` : "/api/vehicles", {
        method: editingVehicle ? "PUT" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || Object.values(data.errors || {}).flat()[0] || "Enregistrement impossible.");
        return;
      }

      setVehicles((current) => editingVehicle ? current.map((vehicle) => vehicle.id === data.id ? data : vehicle) : [...current, data]);
      setMessage(editingVehicle ? "Véhicule modifié." : "Véhicule ajouté.");
      resetForm();
    } catch {
      setMessage("Le serveur est indisponible.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteVehicle(vehicle) {
    if (!window.confirm(`Supprimer ${vehicle.brand} ${vehicle.model} ?`)) return;
    const response = await fetch(`/api/vehicles/${vehicle.id}`, { method: "DELETE", credentials: "include", headers: { Accept: "application/json" } });
    if (response.ok) {
      setVehicles((current) => current.filter((item) => item.id !== vehicle.id));
      setMessage("Véhicule supprimé.");
    } else {
      setMessage("Suppression impossible.");
    }
  }

  return (
    <Layout>
      <main className="mx-auto max-w-6xl px-6 pb-20 text-gray-100">
        <div className="mb-8 flex items-end justify-between gap-4"><div><p className="mb-2 text-xs font-extrabold uppercase tracking-[1.5px] text-[#ff9e0b]">Administration</p><h1 className="text-4xl font-bold">Gestion des véhicules</h1></div><span className="rounded border border-gray-700 bg-[#252a30] px-3 py-2 text-xs text-gray-300">{vehicles.length} véhicules</span></div>
        <section className="mb-8 rounded-lg border border-gray-700 bg-[#1e2328] p-6">
          <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold">{editingVehicle ? "Modifier le véhicule" : "Nouveau véhicule"}</h2>{editingVehicle && <button className="text-sm text-gray-400 hover:text-[#ff9e0b]" onClick={resetForm} type="button">Annuler</button>}</div>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={saveVehicle}>
            {[['brand', 'Marque'], ['model', 'Modèle'], ['year', 'Année'], ['price_per_day', 'Prix par jour']].map(([name, label]) => <label className="grid gap-1 text-xs font-bold text-gray-300" key={name}>{label}<input className="min-h-10 rounded border border-gray-600 bg-[#15181c] px-3 text-sm font-normal text-white outline-none focus:border-[#ff9e0b]" name={name} onChange={updateField} required type={name === "price_per_day" || name === "year" ? "number" : "text"} value={form[name]} /></label>)}
            <label className="grid gap-1 text-xs font-bold text-gray-300">Transmission<select className="min-h-10 rounded border border-gray-600 bg-[#15181c] px-3 text-sm font-normal text-white" name="transmission" onChange={updateField} value={form.transmission}><option>Automatique</option><option>Manuelle</option></select></label>
            <label className="grid gap-1 text-xs font-bold text-gray-300">Motorisation<select className="min-h-10 rounded border border-gray-600 bg-[#15181c] px-3 text-sm font-normal text-white" name="fuel_type" onChange={updateField} value={form.fuel_type}><option>Essence</option><option>Electrique</option><option>Hybride</option></select></label>
            <label className="grid gap-1 text-xs font-bold text-gray-300 md:col-span-2">Description<textarea className="rounded border border-gray-600 bg-[#15181c] px-3 py-2 text-sm font-normal text-white" name="description" onChange={updateField} rows="2" value={form.description} /></label>
            <fieldset className="grid gap-2 md:col-span-2"><legend className="text-xs font-bold text-gray-300">Catégories</legend><div className="flex flex-wrap gap-4">{categories.map((category) => <label className="flex items-center gap-2 text-sm text-gray-300" key={category.id}><input checked={form.category_ids.includes(category.id)} onChange={() => toggleCategory(category.id)} type="checkbox" />{category.name}</label>)}</div></fieldset>
            <div className="flex items-center gap-4 md:col-span-2"><button className="rounded bg-[#ff9e0b] px-5 py-3 text-sm font-bold text-[#15181c] disabled:opacity-60" disabled={saving} type="submit">{saving ? "Enregistrement..." : editingVehicle ? "Enregistrer" : "Ajouter"}</button>{message && <p className="text-sm text-[#ffb83d]" role="status">{message}</p>}</div>
          </form>
        </section>
        <section className="overflow-x-auto rounded-lg border border-gray-700 bg-[#1e2328]"><table className="w-full min-w-[720px] text-left text-sm"><thead className="border-b border-gray-700 bg-[#252a30] text-xs uppercase tracking-wider text-gray-400"><tr><th className="px-5 py-4">Véhicule</th><th className="px-5 py-4">Catégorie</th><th className="px-5 py-4">Année</th><th className="px-5 py-4">Prix / jour</th><th className="px-5 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-gray-700">{vehicles.map((vehicle) => <tr className="hover:bg-[#252a30]" key={vehicle.id}><td className="px-5 py-4"><strong className="block text-white">{vehicle.brand} {vehicle.model}</strong><span className="text-xs text-gray-400">{vehicle.transmission} · {vehicle.fuel_type}</span></td><td className="px-5 py-4 text-gray-300">{vehicle.categories.map((category) => category.name).join(", ") || "-"}</td><td className="px-5 py-4 text-gray-300">{vehicle.year}</td><td className="px-5 py-4 font-bold text-[#ff9e0b]">{vehicle.price_per_day} €</td><td className="px-5 py-4 text-right"><button className="mr-3 text-xs font-bold text-[#ffb83d] hover:text-white" onClick={() => editVehicle(vehicle)} type="button">Modifier</button><button className="text-xs font-bold text-red-400 hover:text-red-300" onClick={() => deleteVehicle(vehicle)} type="button">Supprimer</button></td></tr>)}</tbody></table></section>
      </main>
    </Layout>
  );
}
