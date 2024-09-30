/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
//   },
// };
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://ewn-api.vercel.app/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
