import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function BookingForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({ vehicle_id: searchParams.get("vehicle") || "", start_date: "", end_date: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // pour permettre au formulaire d'avoir la liste des véhicules sans forcément dépendre d'un composant qui l'aurait fait
    fetch("/api/vehicles", { headers: { Accept: "application/json" } })
      .then((response) => response.json())
      .then((data) => setVehicles(data.vehicles || []))
      .catch(() => setMessage("Impossible de charger les véhicules."));
  }, []);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || Object.values(data.errors || {}).flat()[0] || "Réservation impossible.");
        return;
      }

      setMessage(`Réservation confirmée : ${data.booking.total_price} €.`);
      setForm({ ...form, start_date: "", end_date: "" });
    } catch {
      setMessage("Le serveur est indisponible pour le moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="absolute bottom-6 right-8 z-10 w-56 rounded-xl bg-white p-5 text-gray-900 shadow-xl max-md:inset-x-6 max-md:bottom-6 max-md:w-auto" id="booking" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-center text-base font-bold">Réserver un deux-roues</h2>
      <div className="grid gap-2">
        <label className="grid gap-1 text-[10px] text-gray-600">
          Vehicle
          <select className="min-h-10 rounded border border-gray-200 bg-white px-3 text-xs text-gray-600" name="vehicle_id" onChange={updateField} required value={form.vehicle_id}>
            <option value="">Choisir un véhicule</option>
            {vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.brand} {vehicle.model}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-[10px] text-gray-600">
          Date de départ
          <input className="min-h-10 rounded border border-gray-200 px-3 text-xs text-gray-600" min={today()} name="start_date" onChange={updateField} required type="date" value={form.start_date} />
        </label>
        <label className="grid gap-1 text-[10px] text-gray-600">
          Date de retour
          <input className="min-h-10 rounded border border-gray-200 px-3 text-xs text-gray-600" min={form.start_date || today()} name="end_date" onChange={updateField} required type="date" value={form.end_date} />
        </label>
      </div>
      {message && <p className="mt-3 text-xs text-[#5534e7]" role="status">{message}</p>}
      <button className="mt-4 min-h-10 w-full rounded bg-[#ff9e0b] text-sm font-bold text-white disabled:opacity-60" disabled={loading} type="submit">{loading ? "Réservation..." : "Réserver"}</button>
    </form>
  );
}
