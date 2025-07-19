'use client'

import IkarusNameIcon from '@/components/icon/ikarusNameIcon' // Asegúrate que la ruta al logo sea correcta
import { Briefcase, Home, Plane, PlusCircle, User } from 'lucide-react'

// Un componente para las tarjetas con patrón para no repetir el estilo
const PatternCard = ({
	children,
	className = '',
}: {
	children?: React.ReactNode
	className?: string
}) => {
	const patternImageUrl =
		'https://img.freepik.com/vector-gratis/fondo-diseno-patrones-organicos-abstractos_1048-19286.jpg?semt=ais_hybrid&w=740' // URL de un patrón de ejemplo

	return (
		<div
			className={`bg-red-600/90 bg-blend-multiply rounded-2xl bg-cover bg-center ${className}`}
			style={{
				backgroundImage: `url(${patternImageUrl})`,
				backgroundSize: '30%', // Ajusta el tamaño del patrón si es necesario
			}}
		>
			{/* El padding se aplica aquí para que el contenido interior no toque los bordes */}
			<div className="p-10">{children}</div>
		</div>
	)
}

const HomePage = () => {
	return (
		<div className="bg-[#111111] text-white min-h-screen font-sans flex flex-col pt-20">
			<div className="flex-grow py-4 px-8 space-y-4 overflow-y-auto">
				{/* Pestañas de navegación */}
				<div className="flex space-x-2">
					<button className="bg-red-600 rounded-full px-4 py-1.5 text-sm font-semibold">
						Viajes
					</button>
					<button className="bg-[#2a2a2a] rounded-full px-4 py-1.5 text-sm">
						Componente
					</button>
					<button className="bg-[#2a2a2a] rounded-full px-4 py-1.5 text-sm">
						Componente
					</button>
				</div>
				{/* Encabezado Grande */}
				<PatternCard className="rounded-3xl min-h-[140px] flex items-center justify-center">
					<h2 className="text-2xl font-bold">Encabezado grande</h2>
				</PatternCard>

				{/* Botón de Componente (se alinea al inicio del contenedor) */}
				<button className="bg-[#2a2a2a] rounded-full px-4 py-2 text-sm flex items-center gap-2 self-start">
					<PlusCircle size={16} />
					<span>Componente</span>
				</button>

				{/* Lista de tarjetas */}
				<div className="space-y-3">
					<PatternCard className="p-12" />
					<PatternCard className="p-12" />
					<PatternCard className="p-12" />
				</div>
			</div>
		</div>
	)
}

export default HomePage
