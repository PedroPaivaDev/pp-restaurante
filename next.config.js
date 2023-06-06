/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com', '192.168.2.198'],
  },
}

module.exports = nextConfig
