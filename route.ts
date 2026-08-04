export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      <div className="animate-pulse space-y-8">
        {/* Hero skeleton */}
        <div className="text-center space-y-4">
          <div className="h-4 w-48 skeleton mx-auto" />
          <div className="h-12 w-64 skeleton mx-auto" />
          <div className="h-4 w-80 skeleton mx-auto" />
        </div>

        {/* Grid skeleton */}
        <div>
          <div className="h-6 w-40 skeleton mb-5" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-[2/3] skeleton rounded-xl" />
                <div className="h-3 skeleton w-3/4" />
                <div className="h-2 skeleton w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
