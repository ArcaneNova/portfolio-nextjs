/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com'],
  },
  // Add trailingSlash: true to help with path resolution
  trailingSlash: true,
  // Configure rewrites for paths that might be causing issues
  async rewrites() {
    return [
      {
        source: '/journey/challenges/:id',
        destination: '/journey/challenges/:id',
      },
    ];
  },
}

export default nextConfig
