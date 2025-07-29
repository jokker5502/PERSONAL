import { ProfileMenu } from '@/components/ui/profileMenuItem'
import { useUser } from '@clerk/nextjs' // Importa useUser de Clerk
import { CreditCard, Lock, MapPin, User } from 'lucide-react'
import Image from 'next/image' // Para manejar imágenes optimizadas

const SettingsPage: React.FC = () => {
	const { user } = useUser() // Obtén los datos del usuario
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

	return (
		<div className="container mx-auto p-4 gap-y-2  items-center">
			{/* Sección de foto de perfil */}
			<div
				className="flex items-center gap-4 my-10 p-4 rounded-2xl 
                bg-white/30 dark:bg-gray-800/30 
                backdrop-blur-md 
                border border-white/20 dark:border-gray-600/30
                shadow-sm hover:shadow-md 
                transition-all duration-300
                hover:bg-white/40 dark:hover:bg-gray-800/40"
			>
				{/* Imagen de perfil con borde sutil */}
				<div
					className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 
                    border-2 border-white/30 dark:border-gray-600/30
                    shadow-inner"
				>
					{user?.imageUrl ? (
						<Image
							src={user.imageUrl}
							alt="Foto de perfil"
							width={64}
							height={64}
							className="object-cover w-full h-full"
						/>
					) : (
						<div className="bg-gray-200/50 dark:bg-gray-600/50 w-full h-full flex items-center justify-center">
							<User size={24} className="text-gray-500 dark:text-gray-300" />
						</div>
					)}
				</div>

				{/* Datos del usuario */}
				<div className="text-left">
					<h2 className="text-lg font-semibold text-gray-800 dark:text-white">
						{user?.fullName || 'Usuario'}
					</h2>
					<p className="text-gray-600/90 dark:text-gray-300/80 text-sm">
						{user?.primaryEmailAddress?.emailAddress}
					</p>
				</div>
			</div>
			{/* Menú de ajustes */}
			<div>
				<h1 className="text-2xl font-bold mb-6">Perfil</h1>
				<ProfileMenu menuItems={profileMenuItems} />
			</div>
		</div>
	)
}

export default SettingsPage
