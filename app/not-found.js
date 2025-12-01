import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-20">
      <h1 className="font-serif text-8xl font-bold mb-4">404</h1>
      <h2 className="font-sans text-xl text-gray-400 mb-8 uppercase tracking-widest">Page Not Found</h2>
      <p className="font-sans text-lg mb-12 text-center max-w-md">
        Looks like you've wandered off the trail. The content you're looking for might have been moved or doesn't exist.
      </p>
      {/* Folosim clasa corectata Alb pe Negru */}
      <Link href="/" className="bg-white px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
        <span className="text-black">Go Home</span>
      </Link>
    </div>
  );
}