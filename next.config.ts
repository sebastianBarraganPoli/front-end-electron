import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  // Nombre de tu repositorio
  basePath: '/electron-store',
  images: {
    unoptimized: true,
  },
}

export default nextConfig