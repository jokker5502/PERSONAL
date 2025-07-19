'use client'

import { auth, googleProvider } from '@/lib/firebase'
import { signInWithPopup } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// Iconos
import GoogleIcon from '@/components/icon/GoogleIcon'
import FarshLogoMonoSVG from '@/components/icon/ikarusBoxIconMonocromatico'

const LoginPage = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		document.title = 'Ikarus - Iniciar sesión'
	}, [])

	// Función para manejar el inicio de sesión con Google
	const handleGoogleLogin = async () => {
		if (isLoading) return // Evitar múltiples clics mientras carga

		setIsLoading(true)
		setError(null) // Limpiar errores anteriores

		try {
			// Usamos la función de Firebase para mostrar el popup de Google
			const result = await signInWithPopup(auth, googleProvider)

			// Opcional: puedes acceder a información del usuario
			const user = result.user
			console.log('Usuario autenticado:', user.displayName)

			// Redirigir al dashboard después de login exitoso
			router.push('/dash e')
		} catch (err: unknown) {
			// Manejo de errores más seguro con TypeScript
			if (err instanceof Error) {
				console.error('Error de inicio de sesión con Google:', err.message)

				// Tipado específico para errores de Firebase
				if (typeof err === 'object' && err !== null && 'code' in err) {
					const firebaseError = err as { code: string; message: string }

					// No mostrar error si el usuario cerró el popup
					if (firebaseError.code !== 'auth/popup-closed-by-user') {
						setError('No se pudo iniciar sesión. Por favor, intenta de nuevo.')
					}

					// Manejo específico para otros errores comunes
					switch (firebaseError.code) {
						case 'auth/account-exists-with-different-credential':
							setError('Este email ya está registrado con otro método.')
							break
						case 'auth/auth-domain-config-required':
							console.error('Error de configuración de Firebase')
							break
					}
				}
			}
		} finally {
			// Nos aseguramos de detener el estado de carga
			setIsLoading(false)
		}
	}

	return (
		<main className="min-h-screen flex items-center justify-center bg-gradient-to-br  via-white to-indigo-50 dark:from-black dark:via-neutral-900 dark:to-neutral-800 px-6">
			<div className="w-full max-w-sm">
				{/* Logo Container */}
				<div className="flex justify-center mb-2">
					<div
						onClick={() => (window.location.href = '/	')}
						className="backdrop-blur-xl shadow-lg"
					>
						<FarshLogoMonoSVG className="h-35 w-50 lg:h-45 lg:w-60" />
					</div>
				</div>

				{/* Main Card */}
				<div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10">
					{/* Title */}
					<div className="text-center mb-8">
						<h1 className="text-3xl font-light text-gray-900 dark:text-white mb-1">
							Ikarus,
						</h1>
						<h2 className="text-lg font-light text-gray-600 dark:text-gray-300">
							¿qué pedimos?
						</h2>
					</div>

					{/* Google Login Button */}
					<button
						onClick={handleGoogleLogin}
						disabled={isLoading} // Deshabilitamos el botón mientras carga
						className="w-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-neutral-700/50 rounded-2xl px-6 py-4 mb-4 shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-neutral-800 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
					>
						<div className="flex items-center justify-center gap-3">
							<GoogleIcon className="w-5 h-5" />
							<span className="text-base font-medium text-gray-800 dark:text-gray-200">
								{/* Cambiamos el texto del botón si está cargando */}
								{isLoading ? 'Iniciando sesión...' : 'Continuar con Google'}
							</span>
						</div>
					</button>

					{/* Contenedor para el mensaje de error */}
					{error && (
						<div className="text-center mb-4">
							<p className="text-sm text-red-600 dark:text-red-500">{error}</p>
						</div>
					)}

					{/* Terms (corregí el anidamiento incorrecto de las etiquetas <p>) */}
					<p className="text-xs text-center text-gray-500 dark:text-gray-400 leading-relaxed">
						Al continuar aceptas nuestros{' '}
						<Link href="/terminos" className="underline hover:text-primary">
							términos y condiciones
						</Link>
						.
					</p>
				</div>

				{/* Bottom spacing for mobile */}
				<div className="h-8"></div>
			</div>
		</main>
	)
}

export default LoginPage
