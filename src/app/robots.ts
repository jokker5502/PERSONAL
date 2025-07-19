import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			// Opcional: bloquear rutas privadas
			disallow: ['/dashboard', '/profile', '/api/'],
		},
		sitemap: 'https://ikarusapp.com/sitemap.xml',
	}
}
