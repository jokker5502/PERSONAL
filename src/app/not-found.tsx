import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Custom404: NextPage = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
			<Head>
				<title>Página no encontrada | TuNombre</title>
				<meta name="description" content="Página no encontrada" />
			</Head>

			<div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
				<h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
				<h2 className="text-2xl font-semibold text-gray-700 mb-6">
					Página no encontrada
				</h2>
				<p className="text-gray-600 mb-8">
					Lo sentimos, la página que estás buscando no existe o ha sido movida.
				</p>

				<Link
					href="/"
					className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded  mb-8"
					aria-label="Volver al inicio"
				>
					Volver al inicio
				</Link>

				<div className="border-t pt-6">
					<p className="text-gray-500 mb-2">Creado por</p>
					<a
						href="https://github.com/tu-usuario-github"
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-500 hover:text-blue-600 font-medium flex items-center justify-center"
						aria-label="Visitar mi perfil de GitHub"
					>
						<GitHubIcon />
					</a>
				</div>
			</div>
		</div>
	)
}

// Componente del ícono de GitHub
const GitHubIcon = () => (
	<svg
		className="w-5 h-5 mr-2"
		fill="currentColor"
		viewBox="0 0 24 24"
		aria-hidden="true"
		role="img"
	>
		<title>GitHub</title>
		<path
			fillRule="evenodd"
			d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
			clipRule="evenodd"
		/>
	</svg>
)

export default Custom404
