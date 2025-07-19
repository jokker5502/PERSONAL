import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	// Lista estática de todas las páginas de tu sitio
	const pages = [
		{
			url: 'https://ikarusapp.com/',
			lastModified: new Date('2025-06-24'),
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		},
	]

	return pages
}
