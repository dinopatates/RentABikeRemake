import Icon from "./Icon";

const fields = [
  { label: "Car type", value: "Choose a car", icon: "chevron" },
  { label: "Place of rental", value: "Select a location", icon: "location" },
  { label: "Place of return", value: "Select a location", icon: "location" },
  { label: "Rental date", value: "Choose a date", icon: "calendar" },
  { label: "Return date", value: "Choose a date", icon: "calendar" },
];

export default function BookingForm() {
  return (
    <form className="absolute bottom-6 right-8 z-10 w-56 rounded-xl bg-white p-5 text-gray-900 shadow-xl max-md:inset-x-6 max-md:bottom-6 max-md:w-auto" onSubmit={(event) => event.preventDefault()}>
      <h2 className="mb-4 text-center text-base font-bold">Book your car</h2>
      <div className="grid gap-2 max-md:grid-cols-2">
        {fields.map((field) => (
          <label className={`text-[10px] text-gray-600 ${field.label === "Car type" ? "max-md:col-span-2" : ""}`} key={field.label}>
            <span className="mb-1 ml-1 block">{field.label}</span>
            <button type="button" className="flex min-h-10 w-full items-center justify-between rounded border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600">
              <span>{field.value}</span>
              <Icon name={field.icon} size={14} />
            </button>
          </label>
        ))}
      </div>
      <button className="mt-4 min-h-10 w-full rounded bg-[#ff9e0b] text-sm font-bold text-white" type="submit">Book now</button>
    </form>
  );
}
