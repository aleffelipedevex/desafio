export default function Paginate({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  // Limita quantidade visível (ex.: 5 páginas)
  const max = 5;
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + max - 1);

  if (end - start < max - 1) {
    start = Math.max(1, end - max + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      
      {/* Anterior */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        ⟵
      </button>

      {/* Números */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded ${
            p === currentPage ? "bg-blue-600 text-white" : "bg-white border"
          }`}
        >
          {p}
        </button>
      ))}

      {/* Próxima */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        ⟶
      </button>

    </div>
  );
}
