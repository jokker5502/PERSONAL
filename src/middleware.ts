import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware(async (auth, req) => {
	if (isPublicRoute(req)) return

	const session = await auth()

	// Verifica el rol para rutas de admin
	if (isAdminRoute(req)) {
		// PRIMERO: Si no está autenticado, redirige a sign-in
		if (!session.userId) {
			return session.redirectToSignIn()
		}

		// SEGUNDO: Si está autenticado, verifica el rol de admin
		try {
			// Hacer una petición fetch a la API de Clerk para obtener el usuario completo
			const clerkApiUrl = `https://api.clerk.com/v1/users/${session.userId}`
			const clerkSecretKey = process.env.CLERK_SECRET_KEY

			if (!clerkSecretKey) {
				console.error('CLERK_SECRET_KEY no está configurado')
				return new Response('Server Configuration Error', {
					status: 500,
					headers: {
						'Content-Type': 'text/html',
					},
				})
			}

			const response = await fetch(clerkApiUrl, {
				headers: {
					Authorization: `Bearer ${clerkSecretKey}`,
					'Content-Type': 'application/json',
				},
			})

			if (!response.ok) {
				console.error('Error fetching user from Clerk API:', response.status)
				return new Response('Error fetching user data', {
					status: 500,
					headers: {
						'Content-Type': 'text/html',
					},
				})
			}

			const userData = await response.json()

			// Buscar el rol en los diferentes metadatos
			const userRole =
				userData.public_metadata?.role ||
				userData.private_metadata?.role ||
				userData.unsafe_metadata?.role

			console.log('User role from Clerk API:', userRole)
			console.log('User metadata:', {
				public: userData.public_metadata,
				private: userData.private_metadata,
				unsafe: userData.unsafe_metadata,
			})

			if (userRole !== 'admin') {
				return NextResponse.redirect(new URL('/', req.url))
			}

			// Si es admin, continúa con la request normal
			return NextResponse.next()
		} catch (error) {
			console.error('Error checking admin role:', error)
			return NextResponse.redirect(new URL('/', req.url))
		}
	}

	// Para rutas no-admin: Si no está autenticado, redirige a sign-in
	if (!session.userId) {
		return session.redirectToSignIn()
	}

	// Para rutas no-admin autenticadas: continúa normalmente
	return NextResponse.next()
})

export const config = {
	matcher: [
		'/admin(.*)',
		'/((?!_next|.*\\.(?:png|jpg|jpeg|svg|css|js|ico|json)).*)',
		'/(api|trpc)(.*)',
	],
}
