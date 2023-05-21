/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  images: {
    unoptimized: true,
    domains: ['127.0.0.1','vercel.app','herokuapp.com'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
