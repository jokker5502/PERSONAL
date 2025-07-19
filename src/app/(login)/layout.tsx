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

// Configuración del viewport (Next.js 13.2+)
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
				<div className="flex flex-col min-h-screen  via-white to-indigo-50 dark:from-black dark:via-neutral-900 dark:to-neutral-800">
					{/* Menu superior con logo */}
					<MenuTopMobile variant="sticky" />

					<div className="flex-1 pb-16  via-white to-indigo-50 dark:from-black dark:via-neutral-900 dark:to-neutral-800">
						{children}
					</div>
					<MenuBarMobile />
				</div>
			</AuthProvider>
		</ThemeProvider>
	)
}
