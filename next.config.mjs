/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // For static export compatibility; enable optimization when using Vercel
    unoptimized: true,
  },
}

export default nextConfig
