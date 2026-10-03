import Icon from "./Icon";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const fallbackImage = "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80";

export default function VehicleCard({ vehicle }) {
  const image = vehicle.images?.[0]?.image_url || fallbackImage;

  return (
    <article className="overflow-hidden rounded-lg border border-gray-700 bg-[#1e2328] text-gray-100">
      <img className="h-32 w-full object-cover grayscale-[.2]" src={image} alt={`${vehicle.name} ${vehicle.type}`} />
      <div className="p-2.5">
        <div className="mb-3 flex items-start justify-between">
          <div><h3 className="text-sm font-bold">{vehicle.name}</h3><p className="text-xs text-gray-400">{vehicle.type}</p></div>
          <div className="text-right"><strong className="block text-base text-[#ff9e0b]">{vehicle.price} €</strong><small className="text-[10px] text-gray-400">par jour</small></div>
        </div>
        <div className="mb-3 flex flex-wrap justify-between gap-2 text-[10px] text-gray-400"><span className="flex items-center gap-1"><Icon name="motorcycle" size={15} /> {vehicle.transmission}</span><span>◉ {vehicle.fuel_type}</span><span>✣ Casque inclus</span></div>
        <Link className="flex min-h-10 w-full items-center justify-center rounded bg-[#ff9e0b] text-sm font-bold text-[#15181c] transition-colors hover:bg-[#ffb83d]" to={`/details?id=${vehicle.id}`}>Voir le détail</Link>
      </div>
    </article>
  );
}
