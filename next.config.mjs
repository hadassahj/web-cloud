/** @type {import('next').Config} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Permite poze de la Supabase
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Permite poze de la Unsplash (pt teste)
      },
    ],
  },
};

export default nextConfig;