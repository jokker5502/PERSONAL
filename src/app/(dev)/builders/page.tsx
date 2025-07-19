'use client'

import buildres from '@/components/icon/enProceso.png'
import FarshLogoMonoSVG from '@/components/icon/ikarusBoxIconMonocromatico'
import FarshLogoSVG from '@/components/icon/ikarusNameIcon'
import MenuBarMobile from '@/components/menuBar/menuBarMobile'
import Avatar from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import MultipleChoiceSelector from '@/components/ui/menu'
import { ProfileMenu } from '@/components/ui/profileMenuItem'
import { ModeToggle } from '@/modules/home/atoms/buttonTheme'
import { CreditCard, Lock, MapPin, User } from 'lucide-react'
import Image from 'next/image'

export default function HomePage() {
	const profileMenuItems = [
		{
			icon: <User size={24} />,
			label: 'Información personal',
			href: '/perfil/informacion',
		},
		{
			icon: <Lock size={24} />,
			label: 'Contraseña y Seguridad',
			href: '/perfil/seguridad',
		},
		{
			icon: <CreditCard size={24} />,
			label: 'Pagos y cobros',
			href: '/perfil/pagos',
		},
		{
			icon: <MapPin size={24} />,
			label: 'Direcciones',
			href: '/perfil/direcciones',
		},
	]

	const options = [
		{ name: 'Opción 1', value: 'option1' },
		{ name: 'Opción 2', value: 'option2' },
	]

	const handleSelectionChange = (selectedValue: string) => {
		console.log('Opción seleccionada:', selectedValue)
		// Aquí puedes hacer lo que necesites con el valor seleccionado
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
			{/* Logo en la parte superior */}
			<div className="bg-chart-5 rounded-b-[3rem] shadow-md flex justify-center pt-6 ">
				<FarshLogoSVG className="h-20 w-60 lg:h-40 lg:w-150" />
				<ModeToggle />
			</div>

			{/* Sección principal */}
			<div className="flex flex-col justify-center items-center pt-12 pb-6">
				<FarshLogoSVG className="h-20 w-60 lg:h-40 lg:w-150" />
				<div className="grid grid-cols-2 mx-auto items-center gap-4">
					{/* Logo Mono (blanco/negro) */}
					<FarshLogoMonoSVG className="h-30 w-25 lg:h-50 lg:w-80" />

					{/* Logo Warm (rojo/naranja) */}
					<FarshLogoMonoSVG
						colorScheme="warm"
						className="h-30 w-25 lg:h-50 lg:w-80"
					/>
				</div>

				<h1 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">
					Sitio en construcción
				</h1>
				<Image
					src={buildres}
					alt="Logo de Ikarus - En proceso"
					width={256}
					height={256}
					className="w-60 h-75 lg:w-70 lg:h-85 mx-auto my-6"
					priority
				/>
				<p className="text-lg mb-6 text-slate-600 dark:text-slate-300 text-center max-w-2xl">
					Estamos trabajando para traerte una experiencia increíble muy pronto.
					Mientras tanto, explora todas las variantes de nuestros botones.
				</p>
			</div>

			{/* Menu de navegacion Secundario */}

			<div className="mx-auto">
				<MultipleChoiceSelector
					options={options}
					onSelectionChange={handleSelectionChange}
					defaultValue="option1"
					placeholder="Elige una opción"
				/>{' '}
			</div>

			{/* Avatar de usuario */}
			<div className="grid grid-cols-2 md:grid-cols-3 container mx-auto space-y-4">
				<div className="flex flex-col items-center">
					<Avatar name="Usuario Ejemplo" />
					<p>Default (circular, beam)</p>
				</div>
				<div className="flex flex-col items-center">
					<Avatar name="Margaret Brent" square />
					<p>Square</p>
				</div>

				<div className="flex flex-col items-center">
					<Avatar name="Margaret Brent" variant="marble" />
					<p>Marble variant</p>
				</div>

				<div className="flex flex-col items-center">
					<Avatar name="Margaret Brent" variant="pixel" />
					<p>Pixel variant</p>
				</div>

				<div className="flex flex-col items-center">
					<Avatar name="Margaret Brent" />
					<p>Custom colors</p>
				</div>

				<div className="flex flex-col items-center">
					<Avatar name="Margaret Brent" variant="sunset" square />
					<p>Sunset + Square</p>
				</div>
			</div>
			{/* Menu de ajustes */}
			<div className="container mx-auto p-4">
				<h1 className="text-2xl font-bold mb-6">Perfil</h1>
				<ProfileMenu menuItems={profileMenuItems} />
			</div>

			{/* Sección de botones */}
			<div className="max-w-5xl mx-auto">
				{/* Botones estándar */}
				<div className="mb-10">
					<h3 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-200">
						Variantes principales
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						<Button>Botón Default</Button>
						<Button variant="destructive">Eliminar</Button>
						<Button variant="secondary">Secundario</Button>
						<Button variant="outline">Con Borde</Button>
						<Button variant="ghost">Fantasma</Button>
					</div>
				</div>

				{/* Enlaces con diferentes colores */}
				<div className="mb-10">
					<h3 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-200">
						Enlaces con colores
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						<Button variant="link" href="https://ejemplo.com">
							Enlace Default
						</Button>
						<Button variant="link" color="blue" href="https://ejemplo.com">
							Enlace Azul
						</Button>
						<Button variant="link" color="green" href="https://ejemplo.com">
							Enlace Verde
						</Button>
						<Button variant="link" color="red" href="https://ejemplo.com">
							Enlace Rojo
						</Button>
						<Button variant="link" color="purple" href="https://ejemplo.com">
							Enlace Morado
						</Button>
						<Button variant="link" color="pink" href="https://ejemplo.com">
							Enlace Rosa
						</Button>
						<Button variant="link" color="yellow" href="https://ejemplo.com">
							Enlace Amarillo
						</Button>
						<Button
							variant="link"
							color="destructive"
							href="https://ejemplo.com"
						>
							Enlace Destructivo
						</Button>
					</div>
				</div>

				{/* Botones con combinaciones de variantes */}
				<div className="mb-10">
					<h3 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-200">
						Combinaciones
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						<Button variant="secondary" size="lg">
							Secundario Grande
						</Button>
						<Button variant="outline" color="blue" size="sm">
							Outline Azul Pequeño
						</Button>
						<Button variant="secondary" size="sm">
							Secundario Pequeño
						</Button>
						<Button variant="destructive" size="lg">
							Destructivo Grande
						</Button>
						<Button variant="ghost" size="lg">
							Fantasma Grande
						</Button>
						<Button variant="outline" color="destructive">
							Outline Destructivo
						</Button>
					</div>
				</div>
			</div>

			{/* Ejemplos de uso */}
			<div className="max-w-5xl mx-auto mb-12">
				<h3 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-200">
					Ejemplos de uso
				</h3>
				<div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
					<h4 className="text-lg font-medium mb-4 text-slate-800 dark:text-slate-100">
						Panel de navegación
					</h4>
					<div className="flex flex-wrap gap-3">
						<Button variant="ghost" size="sm">
							Inicio
						</Button>
						<Button variant="ghost" size="sm">
							Productos
						</Button>
						<Button variant="ghost" size="sm">
							Servicios
						</Button>
						<Button variant="ghost" size="sm">
							Contacto
						</Button>
						<Button variant="secondary" size="sm">
							Iniciar sesión
						</Button>
					</div>
				</div>
			</div>
			<div>
				<MenuBarMobile />
			</div>

			{/* Footer */}
			<footer className="text-center py-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
				&copy; {new Date().getFullYear()} Ikarus. Todos los derechos reservados.
			</footer>
		</div>
	)
}
