'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import {
	Calendar,
	DollarSign,
	Inbox,
	Loader2,
	MapPin,
	Package,
	Plane,
} from 'lucide-react'
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

//Componentes de UI (sin cambios)
const HeaderCard = ({
	children,
	className = '',
}: {
	children: React.ReactNode
	className?: string
}) => (
	<div
		className={cn('bg-gray-900 text-white rounded-2xl shadow-md', className)}
	>
		<div className="p-6">{children}</div>
	</div>
)

const PackageCard = ({ item }: { item: PackageDetails }) => {
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
			className="bg-white border border-gray-900/10 rounded-2xl p-5 space-y-4 group transition-all duration-300 hover:border-gray-900/40 hover:shadow-lg"
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.4, ease: 'easeOut' }}
		>
			<div className="flex justify-between items-start">
				<div className="flex items-center gap-3">
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

// Componente para mostrar cuando no hay datos
const EmptyState = () => (
	<div className="text-center py-16 px-6 bg-white rounded-2xl border border-gray-200">
		<Inbox className="mx-auto h-12 w-12 text-gray-400" />
		<h3 className="mt-4 text-lg font-semibold text-gray-900">
			No tienes viajes activos
		</h3>
		<p className="mt-2 text-sm text-gray-500">
			Cuando aceptes un nuevo envío, aparecerá aquí.
		</p>
	</div>
)

// Página Principal
export default function TripsPage() {
	const [packages, _setPackages] = useState<PackageDetails[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// Este es el lugar para poner la llamada a la API.
		// El código de abajo está comentado, te lo pongo para que veas como es.
		const _fetchPackages = async () => {
			try {
				// const response = await fetch('/api/trips');
				// const data = await response.json();
				// setPackages(data); // <-- Descomentar y usar los datos reales
			} catch (error) {
				console.error('Error al cargar los viajes:', error)
			} finally {
				setIsLoading(false)
			}
		}

		// fetchPackages(); // <-- Descomentar esta línea para activar la llamada real.

		const timer = setTimeout(() => setIsLoading(false), 1000)
		return () => clearTimeout(timer)
	}, [])

	return (
		<div className="bg-gray-50 font-sans">
			<div className="py-8 px-4 sm:px-6 space-y-6">
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

				{/* --- LÓGICA DE RENDERIZADO FINAL --- */}
				{isLoading ? (
					<div className="flex justify-center items-center h-40">
						<Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
						<p className="ml-4 text-gray-600">Cargando tus viajes...</p>
					</div>
				) : packages.length > 0 ? (
					// Si hay paquetes, los mostramos
					<motion.div
						className="space-y-4"
						variants={{
							visible: { transition: { staggerChildren: 0.1 } },
							hidden: {},
						}}
						initial="hidden"
						animate="visible"
					>
						<AnimatePresence>
							{packages.map((pkg) => (
								<PackageCard key={pkg.id} item={pkg} />
							))}
						</AnimatePresence>
					</motion.div>
				) : (
					// Si no hay paquetes, mostramos el estado vacío
					<EmptyState />
				)}
			</div>
		</div>
	)
}
