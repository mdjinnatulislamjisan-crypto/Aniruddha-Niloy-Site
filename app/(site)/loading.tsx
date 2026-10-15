export default function Loading() {
  return (
    <div className="container-page py-16" aria-busy="true" aria-label="Loading">
      <div className="skeleton h-12 w-2/3 max-w-md" />
      <div className="skeleton mt-4 h-5 w-1/2 max-w-sm" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton h-56" />
        ))}
      </div>
    </div>
  );
}
