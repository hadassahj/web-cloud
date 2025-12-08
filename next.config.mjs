/** @type {import('next').Config} */
const nextConfig = {
  /* Pastram configurarea pentru imagini */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;