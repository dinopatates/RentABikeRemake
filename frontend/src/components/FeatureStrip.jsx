import Icon from "./Icon";

const features = [
  { icon: "location", title: "Disponibilité", text: "Trouvez une moto ou un scooter quand vous en avez besoin." },
  { icon: "motorcycle", title: "Liberté", text: "Un deux-roues fiable pour chaque trajet." },
  { icon: "wallet", title: "Économies", text: "Des motos et scooters entretenus à prix juste." },
];

export default function FeatureStrip() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-3 gap-12 px-6 py-8 text-center max-md:gap-3" aria-label="Why choose us">
      {features.map((feature) => (
        <article className="flex flex-col items-center" key={feature.title}>
          <span className="mb-2 grid h-8 place-items-center"><Icon name={feature.icon} size={30} strokeWidth={1.6} /></span>
          <h3 className="mb-2 text-sm font-bold">{feature.title}</h3>
          <p className="max-w-52 text-xs leading-relaxed text-gray-600">{feature.text}</p>
        </article>
      ))}
    </section>
  );
}
