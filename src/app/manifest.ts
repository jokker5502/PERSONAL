import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Ikarus',
		short_name: 'Ikarus',
		description: 'Busca un currier para tu envío',
		start_url: '/',
		display: 'standalone',
		background_color: '#8b0414',
		theme_color: '#ff8e06',
	}
}
