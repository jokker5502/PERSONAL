
'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, DollarSign, MapPin, Package, Plane } from 'lucide-react'
import { useEffect, useState } from 'react'

interface PackageDetails {
	id: string
	title: string
	origin: string
	destination: string
	pickupDate: string
	status: 'por_recoger' | 'en_camino' | 'entregado'
	payout: number
}

const mockPackages: PackageDetails[] = [
	{
		id: 'pkg_01',
		title: 'Documentos Urgentes',
		origin: 'Texas',
		destination: 'Miami 57346',
		pickupDate: '28 de Julio, 2025',
		status: 'por_recoger',
		payout: 25.0,
	},
	{
		id: 'pkg_02',
		title: 'Repuestos de Laptop',
		origin: 'New York',
		destination: 'Miami 57346',
		pickupDate: '30 de Julio, 2025',
		status: 'en_camino',
		payout: 40.5,
	},
	{
		id: 'pkg_03',
		title: 'Ropa de Boutique',
		origin: 'Utah',
		destination: 'Miami 57346',
		pickupDate: '25 de Julio, 2025',
		status: 'entregado',
		payout: 32.0,
	},
]

// Componente de tarjeta de encabezado
const HeaderCard = ({
	children,
	className = '',
}: {
	children: React.ReactNode
	className?: string
}) => {
	return (
		<div
			className={cn(
				'bg-gray-900 text-white rounded-2xl shadow-md', // Un fondo oscuro para el encabezado crea un contraste fuerte y elegante
				className
			)}
		>
			<div className="p-6">{children}</div>
		</div>
	)
}

// Tarjeta de paquete, rediseñada para el tema claro
const PackageCard = ({ item }: { item: PackageDetails }) => {
	// Paletas de colores para los estados, adaptadas a un fondo claro
	const statusStyles = {
		por_recoger: 'bg-yellow-100 text-yellow-800 border-yellow-200',
		en_camino: 'bg-sky-100 text-sky-800 border-sky-200',
		entregado: 'bg-emerald-100 text-emerald-800 border-emerald-200',
	}

	const statusText = {
		por_recoger: 'Por Recoger',
		en_camino: 'En Camino',
		entregado: 'Entregado',
	}

	return (
		<motion.div
			// Tarjeta blanca con borde negro sutil
			className="bg-white border border-gray-900/10 rounded-2xl p-5 space-y-4 group transition-all duration-300 hover:border-gray-900/40 hover:shadow-lg"
			whileHover={{ scale: 1.02 }}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
		>
			<div className="flex justify-between items-start">
				<div className="flex items-center gap-3">
					{/* Icono ahora en el color primario de la marca (rojo) */}
					<Package className="h-5 w-5 text-red-600" />
					<h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
				</div>
				<div className="flex items-center gap-1 text-emerald-600 font-bold">
					<DollarSign size={16} />
					<span>{item.payout.toFixed(2)}</span>
				</div>
			</div>

			<div className="flex items-center gap-3 text-gray-600">
				<MapPin size={18} />
				<span className="font-medium">{item.origin}</span>
				<div className="flex-grow border-t-2 border-dashed border-gray-300"></div>
				<Plane size={18} />
				<div className="flex-grow border-t-2 border-dashed border-gray-300"></div>
				<MapPin size={18} />
				<span className="font-medium">{item.destination}</span>
			</div>

			<div className="flex justify-between items-center border-t border-gray-200 pt-4">
				<div className="flex items-center gap-2 text-sm text-gray-500">
					<Calendar size={16} />
					<span>{item.pickupDate}</span>
				</div>
				<div
					className={cn(
						'px-3 py-1 text-xs font-bold rounded-full border',
						statusStyles[item.status]
					)}
				>
					{statusText[item.status]}
				</div>
			</div>
		</motion.div>
	)
}

// Página Principal
export default function TripsPage() {
	const [packages, setPackages] = useState<PackageDetails[]>([])

	useEffect(() => {
		setTimeout(() => {
			setPackages(mockPackages)
		}, 300)
	}, [])

	return (
		// Fondo principal ahora es un gris muy claro, más suave que el blanco puro
		<div className="bg-gray-50 font-sans">
			<div className="py-8 px-4 sm:px-6 space-y-6">
				{/* Filtros con estilo adaptado al tema claro */}
				<div className="flex space-x-2">
					<button className="bg-red-600 rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm">
						Viajes
					</button>
					<button className="bg-white border border-gray-300 rounded-full px-5 py-2 text-sm text-gray-600 font-medium">
						Historial
					</button>
					<button className="bg-white border border-gray-300 rounded-full px-5 py-2 text-sm text-gray-600 font-medium">
						Ganancias
					</button>
				</div>

				<HeaderCard>
					<div className="flex justify-between items-center">
						<div>
							<h2 className="text-2xl font-bold">Tus Envíos Activos</h2>
							<p className="text-white/70">
								Paquetes que aceptaste transportar.
							</p>
						</div>
						<div className="bg-white/20 p-3 rounded-full">
							<Package className="h-6 w-6 text-white" />
						</div>
					</div>
				</HeaderCard>

				<motion.div
					className="space-y-4"
					initial="hidden"
					animate="visible"
					variants={{
						visible: { transition: { staggerChildren: 0.1 } },
						hidden: {},
					}}
				>
					<AnimatePresence>
						{packages.map((pkg) => (
							<PackageCard key={pkg.id} item={pkg} />
						))}
					</AnimatePresence>
				</motion.div>
			</div>
		</div>
	)
}