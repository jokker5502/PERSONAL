// src/app/layout.tsx (CÓDIGO CORREGIDO)

import MenuBarMobile from '@/components/menuBar/menuBarMobile'
import MenuTopMobile from '@/components/menuTopMobile/menuTopMobile'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/context/AuthContext'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
	title: {
		default: 'Ikarus',
		template: '%s | Ikarus Courier',
	},
	description: 'Aplicación de gestión de envíos para Ikarus Courier',
	keywords: ['courier', 'envíos', 'logística', 'delivery'],
	authors: [{ name: 'Ikarus Team' }],
	creator: 'Ikarus',
	publisher: 'Ikarus',
	metadataBase: new URL('https://ikarusapp.com/'),
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#000000' },
	],
	colorScheme: 'light dark',
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
			storageKey="ikarus-theme"
		>
			<AuthProvider>
				<div className="flex flex-col min-h-screen">
					{/* Menu superior con posición fija/sticky */}
					<MenuTopMobile variant="sticky" />

					{/* --- ¡AQUÍ ESTÁ LA SOLUCIÓN! --- */}
					{/* Añadimos pt-16 para el menú de arriba y pb-20 para el de abajo */}
					<main className="flex-1 pt-16 pb-20">{children}</main>

					{/* Menú inferior que también es fijo */}
					<MenuBarMobile />
				</div>
			</AuthProvider>
		</ThemeProvider>
	)
}