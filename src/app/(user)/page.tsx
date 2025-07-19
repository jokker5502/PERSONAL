'use client'

import FarshLogoMonoSVG from '@/components/icon/ikarusBoxIconMonocromatico'
import Navbar from '@/modules/home/atoms/Navbar/Navbar'
import { UserButton } from '@clerk/nextjs'
import * as React from 'react'

export default function Home() {
	return (
		<>
			<Navbar /> {/* Barra de navegación arriba */}
			<main className="min-h-screen bg-gradient-to-br from-background via-destructive/20 to-background flex flex-col items-center  p-4 relative overflow-hidden">
				{/* Efectos de fondo */}
				<div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-destructive/10 via-transparent to-accent/5"></div>

				{/* Círculos decorativos */}
				<div className="absolute top-20 left-20 w-64 h-64 bg-destructive/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/15 rounded-full blur-3xl"></div>

				<div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10 mt-24">
					{/* Contenedor del logo (centrado con flex) */}
					<div className="flex justify-center">
						<FarshLogoMonoSVG className="h-80 w-80 lg:h-120 lg:w-150" />
					</div>

					{/* Botón (centrado por herencia de text-center) */}
					<div className="mt-8">
						{/* Añade margen superior si es necesario */}
						<button
							onClick={() => (window.location.href = '/state')}
							className="bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive/70 text-primary-foreground font-medium py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-destructive/30 font-display border border-destructive/30 backdrop-blur-sm"
						>
							Comienza ahora!
						</button>
					</div>
				</div>
			</main>
		</>
	)
}
