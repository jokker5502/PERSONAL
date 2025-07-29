'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import {
	AlertTriangle,
	ArrowLeft,
	Box,
	ChevronDown,
	Info,
	Link as LinkIcon,
	Plus,
	Star,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

// --- ¡PARA EL BACKEND! ---
// Esta es la estructura de datos que el formulario irá construyendo.
// Al final, este objeto es el que se debería enviar a la API para crear el pedido.
const initialFormData = {
	productName: '',
	productLink: '',
	unitValue: '',
	quantity: 1,
	category: '',
	needsBox: true,
	weightOver5kg: null,
	sizeOver50cm: null,
	multipleUnits: null,
	senderType: '',
	deliveryMethod: '',
	selectedCourierId: null,
}

// Componente para la barra de progreso
const ProgressBar = ({ step }: { step: number }) => {
	const progressPercentage = ((step - 1) / 2) * 100 // 3 pasos en total
	return (
		<div className="w-full bg-gray-200 rounded-full h-2 mb-8">
			<motion.div
				className="bg-red-600 h-2 rounded-full"
				initial={{ width: 0 }}
				animate={{ width: `${progressPercentage}%` }}
				transition={{ duration: 0.5, ease: 'easeInOut' }}
			/>
		</div>
	)
}

// Componentes UI simples para el formulario (Inputs, Radio, etc.)
const FormLabel = ({ children }: { children: React.ReactNode }) => (
	<label className="block text-sm font-medium text-gray-700 mb-2">
		{children}
	</label>
)

const FormInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
	<input
		{...props}
		className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
	/>
)

const InfoBox = ({ children }: { children: React.ReactNode }) => (
	<div className="bg-sky-100 border-l-4 border-sky-500 text-sky-800 p-4 rounded-r-lg mt-4 flex gap-3">
		<Info className="h-5 w-5 flex-shrink-0" />
		<p className="text-sm">{children}</p>
	</div>
)

//Comienzo de la Página del Formulario
export default function CreatePackagePage() {
	const [step, setStep] = useState(1)
	const [_formData, _setFormData] = useState(initialFormData)

	const handleNext = () => setStep((prev) => Math.min(prev + 1, 3))
	const handleBack = () => setStep((prev) => Math.max(prev - 1, 1))

	const renderStep = () => {
		switch (step) {
			case 1:
				return <Step1 onNext={handleNext} />
			case 2:
				return <Step2 onNext={handleNext} onBack={handleBack} />
			case 3:
				return <Step3 onBack={handleBack} />
			default:
				return <Step1 onNext={handleNext} />
		}
	}

	return (
		<div className="bg-gray-50 min-h-screen">
			<div className="max-w-2xl mx-auto py-8 px-4">
				<ProgressBar step={step} />
				<AnimatePresence mode="wait">
					<motion.div
						key={step}
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -50 }}
						transition={{ duration: 0.3 }}
					>
						{renderStep()}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}

const Step1 = ({ onNext }: { onNext: () => void }) => (
	<div className="space-y-6">
		{/* Card 1: Ciudad */}
		<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
			<h2 className="font-bold text-xl mb-4">
				¿De qué ciudad traemos tus pedidos?
			</h2>
			{/* Simulación de selects */}
			<div className="space-y-3">
				<div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg flex justify-between items-center text-gray-500">
					<span>Selecciona el lugar</span>
					<ChevronDown className="h-5 w-5" />
				</div>
				<div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg flex justify-between items-center text-gray-500">
					<span>Selecciona una ciudad</span>
					<ChevronDown className="h-5 w-5" />
				</div>
			</div>
		</div>

		{/* Card 2: Detalles del Producto */}
		<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
			<h2 className="font-bold text-xl mb-1">
				Adquiere y especifica tu producto
			</h2>
			<div>
				<FormLabel>¿Qué quieres comprar?</FormLabel>
				<FormInput placeholder="Ej. Apple MacBook Pro 16-inch" />
			</div>
			<div>
				<FormLabel>Link del producto</FormLabel>
				<FormInput placeholder="https://ejemplo.com/producto" />
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<FormLabel>Valor Unitario (USD)</FormLabel>
					<FormInput type="number" placeholder="0.00" />
				</div>
				<div>
					<FormLabel>Cantidad</FormLabel>
					<FormInput type="number" defaultValue={1} />
				</div>
			</div>
			<Button variant="outline" className="w-full">
				<Plus className="h-4 w-4 mr-2" />
				Agregar otro pedido
			</Button>
		</div>

		<InfoBox>
			<span className="font-bold">ATENCIÓN:</span> NO COMPRES EL PRODUCTO AÚN.
			SOLO NECESITAMOS EL LINK PARA LA COTIZACIÓN.
		</InfoBox>

		<div className="flex justify-end">
			<Button onClick={onNext} className="bg-red-600 hover:bg-red-700">
				Siguiente
			</Button>
		</div>
	</div>
)

const Step2 = ({
	onNext,
	onBack,
}: { onNext: () => void; onBack: () => void }) => (
	<div className="space-y-6">
		<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
			<h2 className="font-bold text-xl">
				Información adicional sobre tu paquete
			</h2>
			{/* Grupo de preguntas */}
			<div>
				<p className="font-medium text-gray-800 mb-2">
					¿Alguno de los links pesa más de 5 kilos?
				</p>
				<div className="flex gap-4">
					<Button variant="outline">Sí</Button>
					<Button variant="outline">No</Button>
				</div>
			</div>
			<div>
				<p className="font-medium text-gray-800 mb-2">
					¿Alguno de tus artículos mide más de 50cms en uno de sus lados?
				</p>
				<div className="flex gap-4">
					<Button variant="outline">Sí</Button>
					<Button variant="outline">No</Button>
				</div>
			</div>
		</div>

		<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
			<h2 className="font-bold text-xl mb-4">
				¿Cómo te entregamos tu paquete?
			</h2>
			<div className="space-y-3">
				<div className="border border-gray-300 rounded-lg p-4">
					<p className="font-semibold">En nuestras oficinas en Quito</p>
				</div>
				<div className="border border-gray-300 rounded-lg p-4">
					<p className="font-semibold">Por medio de un servicio externo</p>
					<p className="text-sm text-gray-600">
						(Precio por confirmar dependiendo del destino y peso)
					</p>
				</div>
			</div>
		</div>

		<div className="flex justify-between">
			<Button onClick={onBack} variant="ghost">
				<ArrowLeft className="h-4 w-4 mr-2" />
				Atrás
			</Button>
			<Button onClick={onNext} className="bg-red-600 hover:bg-red-700">
				Siguiente
			</Button>
		</div>
	</div>
)

const Step3 = ({ onBack }: { onBack: () => void }) => (
	<div className="space-y-6">
		<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
			<h2 className="font-bold text-xl mb-1">Couriers disponibles en Quito</h2>
			<p className="text-sm text-gray-600 mb-4">Disponibilidad inmediata</p>
			<div className="space-y-3">
				<Button size="lg" className="w-full bg-sky-500 hover:bg-sky-600">
					Selecciona tu viajero de preferencia
				</Button>
				<Button size="lg" variant="outline" className="w-full">
					Buscar viajeros ahora
				</Button>
			</div>
		</div>

		<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
			<h3 className="font-bold text-lg mb-4">
				Futuros viajes (15 días desde ahora)
			</h3>
			{/* Tarjeta de Courier */}
			<div className="flex items-center gap-4 border border-gray-200 rounded-lg p-4">
				<Image
					src=""
					alt="Foto del usuario"
					width={60}
					height={60}
					className="rounded-full"
				/>
				<div>
					<p className="font-bold text-lg">Juanda Pro</p>
					<p className="text-sm text-gray-600">Fecha de salida: (25/10/2025)</p>
					<div className="flex text-yellow-500 mt-1">
						<Star className="h-4 w-4" fill="currentColor" />
						<Star className="h-4 w-4" fill="currentColor" />
						<Star className="h-4 w-4" fill="currentColor" />
						<Star className="h-4 w-4" />
						<Star className="h-4 w-4" />
					</div>
				</div>
			</div>
		</div>

		<div className="text-center text-sm text-gray-500">
			<p>
				<span className="font-bold">Importante:</span> Todas las fechas pueden
				estar sujetas a variaciones o cambios.
			</p>
		</div>

		<div className="flex justify-between">
			<Button onClick={onBack} variant="ghost">
				<ArrowLeft className="h-4 w-4 mr-2" />
				Atrás
			</Button>
			<Button className="bg-red-600 hover:bg-red-700">Confirmar Pedido</Button>
		</div>
	</div>
)
