import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Head from 'next/head'
import './globals.css'
import { GoogleAnalytics } from '@/components/Analytics/GoogleAnalytics/GoogleAnalytics'
import { GoogleTagManager } from '@/components/Analytics/GoogleTagManager/GoogleTagManager'
import { ClerkProviderWrapper } from '@/components/clerk/clerk-provider-wrapper'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/context/AuthContext'

// Font configuration
const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
	display: 'swap',
	adjustFontFallback: true,
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
	display: 'swap',
})

// SEO and PWA metadata
export const metadata: Metadata = {
	title: {
		default: 'Ikarus',
		template: '%s | ',
	},
	description: 'Delivery management application for Ikarus Courier services',
	applicationName: 'Ikarus Courier',
	keywords: ['courier', 'delivery', 'logistics', 'shipping', 'management'],
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL || 'https://ikarusapp.com/'
	),
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: '/',
		siteName: 'Ikarus',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Ikarus Courier',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		creator: '@ikarus',
		images: '/twitter-image.jpg',
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
	manifest: '/manifest.json',
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#0f172a' },
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
		<html
			lang="en"
			suppressHydrationWarning
			className={`${geistSans.variable} ${geistMono.variable}`}
		>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="stylesheet" href="https://use.typekit.net/fgg0hph.css" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
			</Head>

			<body className="min-h-screen dark:bg-background text-foreground antialiased">
				<GoogleAnalytics />
				<GoogleTagManager />
				<ClerkProviderWrapper>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
						storageKey="ikarus-theme"
					>
						<AuthProvider>
							<div className="relative flex flex-col min-h-screen">
								<main>{children}</main>
							</div>
						</AuthProvider>
					</ThemeProvider>
				</ClerkProviderWrapper>
			</body>
		</html>
	)
}
