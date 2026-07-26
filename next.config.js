/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ai-gateway-backend-lime.vercel.app/api/:path*', // Aapka live backend
      },
      {
        source: '/v1/:path*',
        destination: 'https://ai-gateway-backend-lime.vercel.app/v1/:path*', // AI OpenAI compatible routes
      },
    ];
  },
};

export default nextConfig;