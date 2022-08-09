/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.pravatar.cc', 'picsum.photos', 'images.unsplash.com'],
  },
};

module.exports = nextConfig;
