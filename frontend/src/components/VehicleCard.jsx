import Icon from "./Icon";
import { Link } from "react-router-dom";

const fallbackImage = "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80";

export default function VehicleCard({ vehicle }) {
  const image = vehicle.images?.[0]?.image_url || fallbackImage;

  return (
    <article className="overflow-hidden rounded-lg bg-gray-50">
      <img className="h-32 w-full object-cover grayscale-[.2]" src={image} alt={`${vehicle.name} ${vehicle.type}`} />
      <div className="p-2.5">
        <div className="mb-3 flex items-start justify-between">
          <div><h3 className="text-sm font-bold">{vehicle.name}</h3><p className="text-xs text-gray-600">{vehicle.type}</p></div>
          <div className="text-right"><strong className="block text-base text-[#5534e7]">${vehicle.price}</strong><small className="text-[10px] text-gray-600">per day</small></div>
        </div>
        <div className="mb-3 flex flex-wrap justify-between gap-2 text-[10px] text-gray-600"><span className="flex items-center gap-1"><Icon name="car" size={15} /> Automatic</span><span>◉ {vehicle.seats} seats</span><span>✣ Air Conditioner</span></div>
        <Link className="flex min-h-10 w-full items-center justify-center rounded bg-[#5534e7] text-sm font-bold text-white transition-colors hover:bg-[#7058ed]" to={`/details?id=${vehicle.id}`}>View Details</Link>
      </div>
    </article>
  );
}
