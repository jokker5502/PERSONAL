import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: {
		default: 'Ikarus | Cliente',
		template: '%s | Ikarus Cliente',
	},
	description: 'Plataforma de courier y envíos',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <div>{children}</div>
}
