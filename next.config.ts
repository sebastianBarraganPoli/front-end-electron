import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/nombre-de-tu-repositorio',
  images: {
    unoptimized: true,
  },
  typescript: {
    // ¡ADVERTENCIA! Esto permite que la compilación se complete incluso con errores de TypeScript
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignorar errores de ESLint durante la compilación
    ignoreDuringBuilds: true,
  },
}

export default nextConfig