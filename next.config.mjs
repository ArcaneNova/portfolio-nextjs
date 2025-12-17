/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Set to true to fail build on TypeScript errors
    ignoreBuildErrors: false,
  },
  eslint: {
    // Set to true to fail build on ESLint errors
    ignoreDuringBuilds: false,
  },
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com'],
  },
  // Add trailingSlash: true to help with path resolution
  trailingSlash: true,
}

export default nextConfig
