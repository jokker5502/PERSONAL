// src/app/(customer)/formOrder/PackageInformation/page.tsx

'use client'

import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ChevronDown, Info, Plus, Star } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

// El estado inicial del formulario que el backend necesitará
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

// --- COMPONENTES UI REUTILIZABLES ---
// Pequeños componentes que construyen la UI del formulario.
// Usan variables de `globals.css` para el modo claro/oscuro.

const ProgressBar = ({ step }: { step: number }) => {
	const progressPercentage = ((step - 1) / 2) * 100
	return (
		<div className="w-full bg-muted rounded-full h-2 mb-8">
			<motion.div
				className="bg-primary h-2 rounded-full"
				initial={{ width: 0 }}
				animate={{ width: `${progressPercentage}%` }}
				transition={{ duration: 0.5, ease: 'easeInOut' }}
			/>
		</div>
	)
}

const FormCard = ({
	children,
	title,
}: { children: React.ReactNode; title: string }) => (
	<div className="bg-card p-6 rounded-2xl shadow-sm border">
		<h2 className="font-bold text-xl mb-4 text-card-foreground">{title}</h2>
		{children}
	</div>
)

const FormLabel = ({ children }: { children: React.ReactNode }) => (
	<label className="block text-sm font-medium text-muted-foreground mb-2">
		{children}
	</label>
)

const FormInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
	<input
		{...props}
		className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-primary focus:border-primary transition text-foreground"
	/>
)

const InfoBox = ({ children }: { children: React.ReactNode }) => (
	<div className="bg-sky-100 dark:bg-sky-900/30 border-l-4 border-sky-500 text-sky-800 dark:text-sky-200 p-4 rounded-r-lg mt-4 flex gap-3">
		<Info className="h-5 w-5 flex-shrink-0" />
		<p className="text-sm">{children}</p>
	</div>
)

// --- COMPONENTES PARA CADA PASO DEL FORMULARIO ---

const Step1 = ({ onNext }: { onNext: () => void }) => (
	<div className="space-y-6">
		<FormCard title="¿De qué ciudad traemos tus pedidos?">
			<div className="space-y-3">
				<div className="w-full px-4 py-3 bg-input border rounded-lg flex justify-between items-center text-muted-foreground cursor-pointer">
					<span>Selecciona el lugar</span>
					<ChevronDown className="h-5 w-5" />
				</div>
				<div className="w-full px-4 py-3 bg-input border rounded-lg flex justify-between items-center text-muted-foreground cursor-pointer">
					<span>Selecciona una ciudad</span>
					<ChevronDown className="h-5 w-5" />
				</div>
			</div>
		</FormCard>

		<FormCard title="Adquiere y especifica tu producto">
			<div className="space-y-4">
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
		</FormCard>

		<InfoBox>
			<span className="font-bold">ATENCIÓN:</span> NO COMPRES EL PRODUCTO AÚN.
			SOLO NECESITAMOS EL LINK PARA LA COTIZACIÓN.
		</InfoBox>

		<div className="flex justify-end">
			{/* Quitamos bg-red-600 para que use los colores del tema por defecto */}
			<Button onClick={onNext}>Siguiente</Button>
		</div>
	</div>
)

const Step2 = ({
	onNext,
	onBack,
}: { onNext: () => void; onBack: () => void }) => (
	<div className="space-y-6">
		<FormCard title="Información adicional sobre tu paquete">
			<div className="space-y-6">
				<div>
					<p className="font-medium text-foreground mb-2">
						¿Alguno de los links pesa más de 5 kilos?
					</p>
					<div className="flex gap-4">
						<Button variant="outline">Sí</Button>
						<Button variant="outline">No</Button>
					</div>
				</div>
				<div>
					<p className="font-medium text-foreground mb-2">
						¿Alguno de tus artículos mide más de 50cms en uno de sus lados?
					</p>
					<div className="flex gap-4">
						<Button variant="outline">Sí</Button>
						<Button variant="outline">No</Button>
					</div>
				</div>
			</div>
		</FormCard>

		<FormCard title="¿Cómo te entregamos tu paquete?">
			<div className="space-y-3">
				<div className="border border-border rounded-lg p-4 cursor-pointer hover:border-primary">
					<p className="font-semibold text-foreground">
						En nuestras oficinas en Quito
					</p>
				</div>
				<div className="border border-border rounded-lg p-4 cursor-pointer hover:border-primary">
					<p className="font-semibold text-foreground">
						Por medio de un servicio externo
					</p>
					<p className="text-sm text-muted-foreground">
						(Precio por confirmar dependiendo del destino y peso)
					</p>
				</div>
			</div>
		</FormCard>

		<div className="flex justify-between">
			<Button onClick={onBack} variant="ghost">
				<ArrowLeft className="h-4 w-4 mr-2" />
				Atrás
			</Button>
			<Button onClick={onNext}>Siguiente</Button>
		</div>
	</div>
)

const Step3 = ({ onBack }: { onBack: () => void }) => (
	<div className="space-y-6">
		<FormCard title="Couriers disponibles en Quito">
			<div className="space-y-3">
				<Button size="lg" className="w-full bg-sky-500 hover:bg-sky-600">
					Selecciona tu viajero de preferencia
				</Button>
				<Button size="lg" variant="outline" className="w-full">
					Buscar viajeros ahora
				</Button>
			</div>
		</FormCard>

		<FormCard title="Futuros viajes (15 días desde ahora)">
			<div className="flex items-center gap-4 border border-border rounded-lg p-4">
				<Image
					src="https://i.pravatar.cc/150?u=juanda"
					alt="Foto del usuario"
					width={60}
					height={60}
					className="rounded-full"
				/>
				<div>
					<p className="font-bold text-lg text-foreground">Juanda Pro</p>
					<p className="text-sm text-muted-foreground">
						Fecha de salida: (25/10/2025)
					</p>
					<div className="flex text-yellow-500 mt-1">
						<Star className="h-4 w-4" fill="currentColor" />
						<Star className="h-4 w-4" fill="currentColor" />
						<Star className="h-4 w-4" fill="currentColor" />
						<Star className="h-4 w-4" />
						<Star className="h-4 w-4" />
					</div>
				</div>
			</div>
		</FormCard>

		<div className="text-center text-sm text-muted-foreground">
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
			<Button>Confirmar Pedido</Button>
		</div>
	</div>
)

// --- PÁGINA PRINCIPAL ---
// Este componente gestiona el estado del paso actual y renderiza el componente de paso correspondiente.
export default function CreatePackagePage() {
	const [step, setStep] = useState(1)
	const [_formData, _setFormData] = useState(initialFormData)

	const handleNext = () => setStep((prev) => Math.min(prev + 1, 3))
	const handleBack = () => setStep((prev) => Math.max(prev - 1, 1))

	// Esta función decide qué componente de paso mostrar
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
		// El contenedor principal ya no tiene fondo, lo hereda del layout.
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
	)
}
