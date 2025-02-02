/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_KEY: process.env.API_KEY,
  },
  poweredByHeader: false, // Oculta el header "X-Powered-By: Next.js"
  compress: !isDev, // Solo comprimir en producción
  swcMinify: !isDev, // Solo minificar en producción
  webpack: (config, { dev }) => {
    if (dev) {
      console.log('🛠️ Modo Desarrollo: No se están minimizando assets.');
    } else {
      console.log('🚀 Modo Producción: Si se están minimizando assets.');
    }

    return config;
  },
};

export default nextConfig;
