'use client'

import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ChevronDown, Info, Plus, Star } from 'lucide-react'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'

const initialFormData = {
	productName: '',
	productLink: '',
	unitValue: '',
	quantity: '1',

	weightOver5kg: null as boolean | null,
	sizeOver50cm: null as boolean | null,
	deliveryMethod: '',
}

type FormDataState = typeof initialFormData

type FormErrors = {
	[key in keyof FormDataState]?: string
}

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

const FormInput = ({
	error,
	...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) => (
	<div>
		<input
			{...props}
			className={`w-full px-4 py-2 bg-background border rounded-lg focus:ring-primary focus:border-primary transition text-foreground ${
				error ? 'border-destructive ring-destructive' : 'border-border'
			}`}
		/>
		{error && <p className="mt-1 text-sm text-destructive">{error}</p>}
	</div>
)

const InfoBox = ({ children }: { children: React.ReactNode }) => (
	<div className="bg-sky-100 dark:bg-sky-900/30 border-l-4 border-sky-500 text-sky-800 dark:text-sky-200 p-4 rounded-r-lg mt-4 flex gap-3">
		<Info className="h-5 w-5 flex-shrink-0" />
		<p className="text-sm">{children}</p>
	</div>
)

interface StepProps {
	formData: FormDataState
	setFormData: Dispatch<SetStateAction<FormDataState>>
	errors: FormErrors
}

const Step1 = ({ formData, setFormData, errors }: StepProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	return (
		<div className="space-y-6">
			<FormCard title="Adquiere y especifica tu producto">
				<div className="space-y-4">
					<div>
						<FormLabel>¿Qué quieres comprar?</FormLabel>
						<FormInput
							name="productName"
							value={formData.productName}
							onChange={handleChange}
							placeholder="Ej. Apple MacBook Pro 16-inch"
							error={errors.productName}
						/>
					</div>
					<div>
						<FormLabel>Link del producto</FormLabel>
						<FormInput
							name="productLink"
							value={formData.productLink}
							onChange={handleChange}
							placeholder="https://ejemplo.com/producto"
							error={errors.productLink}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<FormLabel>Valor Unitario (USD)</FormLabel>
							<FormInput
								name="unitValue"
								type="number"
								value={formData.unitValue}
								onChange={handleChange}
								placeholder="0.00"
								error={errors.unitValue}
							/>
						</div>
						<div>
							<FormLabel>Cantidad</FormLabel>
							<FormInput
								name="quantity"
								type="number"
								value={formData.quantity}
								onChange={handleChange}
								error={errors.quantity}
							/>
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
			</InfoBox>
		</div>
	)
}

const Step2 = ({ formData, setFormData, errors }: StepProps) => {
	const handleSelect = (field: keyof FormDataState, value: boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
	}

	return (
		<div className="space-y-6">
			<FormCard title="Información adicional sobre tu paquete">
				<div className="space-y-6">
					<div>
						<p className="font-medium text-foreground mb-2">
							¿Alguno de los links pesa más de 5 kilos?
						</p>
						<div className="flex gap-4">
							<Button
								variant={
									formData.weightOver5kg === true ? 'default' : 'outline'
								}
								onClick={() => handleSelect('weightOver5kg', true)}
							>
								Sí
							</Button>
							<Button
								variant={
									formData.weightOver5kg === false ? 'default' : 'outline'
								}
								onClick={() => handleSelect('weightOver5kg', false)}
							>
								No
							</Button>
						</div>
						{errors.weightOver5kg && (
							<p className="mt-2 text-sm text-destructive">
								{errors.weightOver5kg}
							</p>
						)}
					</div>
					<div>
						<p className="font-medium text-foreground mb-2">
							¿Alguno de tus artículos mide más de 50cms en uno de sus lados?
						</p>
						<div className="flex gap-4">
							<Button
								variant={formData.sizeOver50cm === true ? 'default' : 'outline'}
								onClick={() => handleSelect('sizeOver50cm', true)}
							>
								Sí
							</Button>
							<Button
								variant={
									formData.sizeOver50cm === false ? 'default' : 'outline'
								}
								onClick={() => handleSelect('sizeOver50cm', false)}
							>
								No
							</Button>
						</div>
						{errors.sizeOver50cm && (
							<p className="mt-2 text-sm text-destructive">
								{errors.sizeOver50cm}
							</p>
						)}
					</div>
				</div>
			</FormCard>
		</div>
	)
}

const Step3 = () => (
	<div className="space-y-6">
		<FormCard title="Couriers disponibles en Quito">
			<div className="space-y-3">
				<Button size="lg" className="w-full" variant="outline">
					Selecciona tu viajero de preferencia
				</Button>
				<Button size="lg" variant="outline" className="w-full">
					Buscar viajeros ahora
				</Button>
			</div>
		</FormCard>
	</div>
)

export default function CreatePackagePage() {
	const [step, setStep] = useState(1)
	const [formData, setFormData] = useState(initialFormData)
	const [errors, setErrors] = useState<FormErrors>({})

	const validateStep = () => {
		const newErrors: FormErrors = {}

		if (step === 1) {
			if (!formData.productName.trim())
				newErrors.productName = 'El nombre del producto es obligatorio.'
			if (!formData.productLink.trim()) {
				newErrors.productLink = 'El link del producto es obligatorio.'
			} else {
				try {
					new URL(formData.productLink)
				} catch (_) {
					newErrors.productLink = 'Por favor, introduce una URL válida.'
				}
			}
			if (!formData.unitValue) newErrors.unitValue = 'El valor es obligatorio.'
			else if (
				isNaN(Number(formData.unitValue)) ||
				Number(formData.unitValue) <= 0
			)
				newErrors.unitValue = 'El valor debe ser un número mayor a cero.'

			const quantityNum = Number(formData.quantity)
			if (!formData.quantity) newErrors.quantity = 'La cantidad es obligatoria.'
			else if (!Number.isInteger(quantityNum) || quantityNum <= 0)
				newErrors.quantity = 'Debe ser un número entero mayor a cero.'
		}

		if (step === 2) {
			if (formData.weightOver5kg === null)
				newErrors.weightOver5kg = 'Por favor, selecciona una opción.'
			if (formData.sizeOver50cm === null)
				newErrors.sizeOver50cm = 'Por favor, selecciona una opción.'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleNext = () => {
		if (validateStep()) {
			setStep((prev) => Math.min(prev + 1, 3))
		}
	}

	const handleBack = () => {
		setErrors({})
		setStep((prev) => Math.max(prev - 1, 1))
	}

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<Step1
						formData={formData}
						setFormData={setFormData}
						errors={errors}
					/>
				)
			case 2:
				return (
					<Step2
						formData={formData}
						setFormData={setFormData}
						errors={errors}
					/>
				)
			case 3:
				return <Step3 />
			default:
				return (
					<Step1
						formData={formData}
						setFormData={setFormData}
						errors={errors}
					/>
				)
		}
	}

	return (
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

					<div className="flex mt-8">
						{step > 1 && (
							<Button onClick={handleBack} variant="ghost">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Atrás
							</Button>
						)}
						<div className="flex-grow" />
						{step < 3 && (
							<Button onClick={handleNext} variant="outline">
								Siguiente
							</Button>
						)}
						{step === 3 && <Button variant="ghost">Confirmar Pedido</Button>}
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
