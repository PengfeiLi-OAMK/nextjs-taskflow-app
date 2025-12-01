/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ["img.clerk.com", "images.unsplash.com"],
//   },
// };
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',

        hostname: 'img.clerk.com',
      },
    ],
  },
};

module.exports = nextConfig;
