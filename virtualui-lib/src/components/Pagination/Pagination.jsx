export default function Pagination({ totalPages = 5, currentPage, onPageChange }) {
  const [internalPage, setInternalPage] = React.useState(1);
  const page = currentPage || internalPage;
  const setPage = onPageChange || setInternalPage;

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-8 h-8 rounded-lg text-sm text-white/50 hover:text-white bg-white/[0.04] border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        ‹
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => setPage(num)}
          className="w-8 h-8 rounded-lg text-sm font-medium border-none cursor-pointer transition-colors"
          style={{
            background: page === num ? "rgba(59,232,255,0.2)" : "rgba(255,255,255,0.04)",
            color: page === num ? "#3be8ff" : "rgba(255,255,255,0.5)",
          }}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-8 h-8 rounded-lg text-sm text-white/50 hover:text-white bg-white/[0.04] border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        ›
      </button>
    </div>
  );
}