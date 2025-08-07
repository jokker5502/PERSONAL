'use client'

import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ChevronDown, Info, Plus, Star, X } from 'lucide-react'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'

type Product = {
	id: number
	productName: string
	productLink: string
	unitValue: string
	quantity: string
}

const initialFormData = {
	products: [
		{ id: 1, productName: '', productLink: '', unitValue: '', quantity: '1' },
	] as Product[],
	weightOver5kg: null as boolean | null,
	sizeOver50cm: null as boolean | null,
	deliveryMethod: '',
}

type FormDataState = typeof initialFormData
type FormErrors = {
	products?: { [key: number]: Partial<Omit<Product, 'id'>> }
	weightOver5kg?: string
	sizeOver50cm?: string
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
	const addProduct = () => {
		setFormData((prev) => ({
			...prev,
			products: [
				...prev.products,
				{
					id: Date.now(),
					productName: '',
					productLink: '',
					unitValue: '',
					quantity: '1',
				},
			],
		}))
	}

	const removeProduct = (id: number) => {
		setFormData((prev) => ({
			...prev,
			products: prev.products.filter((p) => p.id !== id),
		}))
	}

	const handleProductChange = (
		id: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			products: prev.products.map((p) =>
				p.id === id ? { ...p, [name]: value } : p
			),
		}))
	}

	return (
		<div className="space-y-6">
			<FormCard title="Adquiere y especifica tus productos">
				<AnimatePresence>
					{formData.products.map((product, index) => (
						<motion.div
							key={product.id}
							className="space-y-4 border-b border-border pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0"
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
						>
							<div className="flex justify-between items-center">
								<h3 className="font-semibold text-lg text-foreground">
									Producto {index + 1}
								</h3>
								{formData.products.length > 1 && (
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8"
										onClick={() => removeProduct(product.id)}
									>
										<X className="h-4 w-4 text-destructive" />
									</Button>
								)}
							</div>
							<div>
								<FormLabel>¿Qué quieres comprar?</FormLabel>
								<FormInput
									name="productName"
									value={product.productName}
									onChange={(e) => handleProductChange(product.id, e)}
									placeholder="Ej. Apple MacBook Pro 16-inch"
									error={errors.products?.[index]?.productName}
								/>
							</div>
							<div>
								<FormLabel>Link del producto</FormLabel>
								<FormInput
									name="productLink"
									value={product.productLink}
									onChange={(e) => handleProductChange(product.id, e)}
									placeholder="https://ejemplo.com/producto"
									error={errors.products?.[index]?.productLink}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<FormLabel>Valor Unitario (USD)</FormLabel>
									<FormInput
										name="unitValue"
										type="number"
										value={product.unitValue}
										onChange={(e) => handleProductChange(product.id, e)}
										placeholder="0.00"
										error={errors.products?.[index]?.unitValue}
									/>
								</div>
								<div>
									<FormLabel>Cantidad</FormLabel>
									<FormInput
										name="quantity"
										type="number"
										value={product.quantity}
										onChange={(e) => handleProductChange(product.id, e)}
										error={errors.products?.[index]?.quantity}
									/>
								</div>
							</div>
						</motion.div>
					))}
				</AnimatePresence>
				<Button variant="outline" className="w-full" onClick={addProduct}>
					<Plus className="h-4 w-4 mr-2" />
					Agregar otro pedido
				</Button>
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
								variant={formData.weightOver5kg === true ? 'link' : 'ghost'}
								onClick={() => handleSelect('weightOver5kg', true)}
								className={
									formData.weightOver5kg === true
										? 'text-primary font-bold bg-amber-950'
										: 'text-muted-foreground'
								}
							>
								Sí
							</Button>
							<Button
								variant={formData.weightOver5kg === false ? 'link' : 'ghost'}
								onClick={() => handleSelect('weightOver5kg', false)}
								className={
									formData.weightOver5kg === false
										? 'text-primary font-bold  bg-amber-950'
										: 'text-muted-foreground'
								}
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
								variant={formData.sizeOver50cm === true ? 'link' : 'ghost'}
								onClick={() => handleSelect('sizeOver50cm', true)}
								className={
									formData.sizeOver50cm === true
										? 'text-primary font-bold  bg-amber-950'
										: 'text-muted-foreground'
								}
							>
								Sí
							</Button>
							<Button
								variant={formData.sizeOver50cm === false ? 'link' : 'ghost'}
								onClick={() => handleSelect('sizeOver50cm', false)}
								className={
									formData.sizeOver50cm === false
										? 'text-primary font-bold  bg-amber-950'
										: 'text-muted-foreground'
								}
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
				<Button size="lg" className="w-full bg-stone-800 hover:bg-stone-700">
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
		const newErrors: FormErrors = { products: {} }

		if (step === 1) {
			formData.products.forEach((product, index) => {
				const productErrors: Partial<Omit<Product, 'id'>> = {}
				if (!product.productName.trim())
					productErrors.productName = 'El nombre es obligatorio.'
				if (!product.productLink.trim()) {
					productErrors.productLink = 'El link es obligatorio.'
				} else {
					try {
						new URL(product.productLink)
					} catch (_) {
						productErrors.productLink = 'URL inválida.'
					}
				}
				if (!product.unitValue)
					productErrors.unitValue = 'El valor es obligatorio.'
				else if (
					isNaN(Number(product.unitValue)) ||
					Number(product.unitValue) <= 0
				)
					productErrors.unitValue = 'Debe ser > 0.'

				const quantityNum = Number(product.quantity)
				if (!product.quantity) {
					productErrors.quantity = 'La cantidad es obligatoria.'
				} else if (!Number.isInteger(quantityNum) || quantityNum <= 0) {
					productErrors.quantity = 'Debe ser un entero > 0.'
				}

				if (Object.keys(productErrors).length > 0) {
					if (!newErrors.products) newErrors.products = {}
					newErrors.products[index] = productErrors
				}
			})
		}

		if (step === 2) {
			if (formData.weightOver5kg === null)
				newErrors.weightOver5kg = 'Por favor, selecciona una opción.'
			if (formData.sizeOver50cm === null)
				newErrors.sizeOver50cm = 'Por favor, selecciona una opción.'
		}

		setErrors(newErrors)
		return (
			(!newErrors.products || Object.keys(newErrors.products).length === 0) &&
			!newErrors.weightOver5kg &&
			!newErrors.sizeOver50cm
		)
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
							<Button onClick={handleNext} variant="ghost">
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
