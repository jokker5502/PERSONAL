import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,

	images: {
		domains: ['firebasestorage.googleapis.com'],
		// En producción permitimos optimización, en desarrollo desactivamos para velocidad
		unoptimized: process.env.NODE_ENV !== 'production',
	},

	// URL con / final o no, según prefieras
	trailingSlash: false,

	// Aquí no necesitas exponer variables explícitamente,
	// Next las toma automáticamente si empiezan con NEXT_PUBLIC_

	webpack: (config, { isServer }) => {
		if (isServer) {
			config.externals = config.externals || []
			// No empaquetar firebase-admin en el bundle cliente
			config.externals.push('firebase-admin')
		}
		return config
	},
}

export default nextConfig
