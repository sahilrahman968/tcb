/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  "--jsx": true,
  images: {
    domains: ['res.cloudinary.com','lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig