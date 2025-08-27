/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ui/components', '@utils/helpers'],
}

module.exports = nextConfig