export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/20" role="status" aria-label="Chargement">
      <div className="grid gap-2 rounded-lg bg-white px-5 py-4 text-center shadow-lg">
        <span className="h-7 w-7 animate-spin rounded-full border-4 border-[#ff9e0b] border-t-[#5534e7]" />
        <span className="text-sm font-bold text-gray-700">Chargement...</span>
      </div>
    </div>
  );
}
