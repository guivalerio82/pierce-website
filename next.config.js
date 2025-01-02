/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'meetpierce.com',
          },
        ],
        destination: 'https://meetpierce.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 