// src/app/(login)/(currier)/trips/page.tsx

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

// El "contrato" de datos que el backend debe seguir
interface PackageDetails {
	id: string
	title: string
	origin: string
	destination: string
	pickupDate: string
	status: 'por_recoger' | 'en_camino' | 'entregado'
	payout: number
}

// --- COMPONENTES REUTILIZABLES ---
// He creado componentes pequeños y enfocados para cada parte de la UI.

const HeaderCard = ({
	title,
	subtitle,
}: { title: string; subtitle: string }) => (
	<div className="bg-foreground text-background rounded-2xl shadow-md p-6">
		<div className="flex justify-between items-center">
			<div>
				<h2 className="text-2xl font-bold">{title}</h2>
				<p className="text-background/70">{subtitle}</p>
			</div>
			<div className="bg-background/20 p-3 rounded-full">
				<Package className="h-6 w-6" />
			</div>
		</div>
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
			className="bg-card text-card-foreground border rounded-2xl p-5 space-y-4 group transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
		>
			<div className="flex justify-between items-start">
				<div className="flex items-center gap-3">
					<Package className="h-5 w-5 text-primary" />
					<h3 className="font-bold text-lg">{item.title}</h3>
				</div>
				<div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
					<DollarSign size={16} />
					<span>{item.payout.toFixed(2)}</span>
				</div>
			</div>
			<div className="flex items-center gap-3 text-muted-foreground">
				<MapPin size={18} />
				<span className="font-medium">{item.origin}</span>
				<div className="flex-grow border-t-2 border-dashed border-border"></div>
				<Plane size={18} />
				<div className="flex-grow border-t-2 border-dashed border-border"></div>
				<MapPin size={18} />
				<span className="font-medium">{item.destination}</span>
			</div>
			<div className="flex justify-between items-center border-t pt-4">
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
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

const EmptyState = () => (
	<div className="text-center py-16 px-6 bg-card rounded-2xl border">
		<Inbox className="mx-auto h-12 w-12 text-muted-foreground" />
		<h3 className="mt-4 text-lg font-semibold text-foreground">
			No tienes viajes activos
		</h3>
		<p className="mt-2 text-sm text-muted-foreground">
			Cuando aceptes un nuevo envío, aparecerá aquí.
		</p>
	</div>
)

// --- PÁGINA PRINCIPAL ---
export default function TripsPage() {
	const [packages, _setPackages] = useState<PackageDetails[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const _fetchPackages = async () => {
			try {
				// LUGAR PARA LA LLAMADA DEL BACKEND
				// const response = await fetch('/api/trips');
				// const data = await response.json();
				// setPackages(data);
			} catch (error) {
				console.error('Error al cargar los viajes:', error)
			} finally {
				setIsLoading(false)
			}
		}
		// fetchPackages(); // Descomentar para activar la llamada real

		const timer = setTimeout(() => setIsLoading(false), 1000)
		return () => clearTimeout(timer)
	}, [])

	return (
		// El div principal ya no tiene 'bg-gray-50'. Hereda el color del layout.
		<div className="py-8 px-4 sm:px-6 space-y-6">
			<HeaderCard
				title="Tus Envíos Activos"
				subtitle="Paquetes que aceptaste transportar."
			/>

			{isLoading ? (
				<div className="flex justify-center items-center h-40">
					<Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
				</div>
			) : packages.length > 0 ? (
				<motion.div
					className="space-y-4"
					variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
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
				<EmptyState />
			)}
		</div>
	)
}
