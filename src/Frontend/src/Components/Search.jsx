export default function Search({ value, onChange }) {
  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Buscar filme..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border"
      />
    </div>
  );
}
