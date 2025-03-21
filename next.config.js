/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Add any external image domains here if needed
    unoptimized: false,
  },
  output: 'standalone',
}

module.exports = nextConfig 