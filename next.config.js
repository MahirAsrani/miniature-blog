/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    baseURL: 'http://localhost:3000',
    secret: 'bQil2hHD1B79epXMjyoV5Lvt1bLl1SYYNj4AIBYSAzzOK51T4LODj1QCifHihA0',
  },

  async rewrites() {
    return [
      {
        source: '/signin',
        destination: '/login',
      },

      {
        source: '/blogs/:slug',
        destination: '/posts/:slug',
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/posts',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
