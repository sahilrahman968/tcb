/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  "--jsx": true,
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig
