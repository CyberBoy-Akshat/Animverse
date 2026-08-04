import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl mb-6">👻</p>
        <h1 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Page Not Found</h1>
        <p className="text-zinc-500 text-sm mb-8 max-w-sm mx-auto">
          The anime you&apos;re looking for doesn&apos;t exist or was removed from the source.
        </p>
        <Link href="/" className="btn-glow inline-flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
