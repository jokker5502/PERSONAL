'use client'

import IkarusBoxIcon from '@/components/icon/ikarusBoxIconMonocromatico'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Box, History, Send } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
	const { user, isLoaded } = useUser()
	const [show, setShow] = useState(false)

	useEffect(() => {
		setShow(true)
	}, [])

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
			},
		},
	}

	const textVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: 'easeOut',
			},
		},
	}

	const boxVariants = {
		hidden: { opacity: 0, y: -200, rotate: -45, scale: 0.5 },
		visible: {
			opacity: 1,
			y: 0,
			rotate: 0,
			scale: 1,
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 80,
				duration: 1.2,
			},
		},
	}

	const cardVariants = {
		hidden: { opacity: 0, scale: 0.9 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.5,
				ease: 'circOut',
			},
		},
	}

	return (
		<AnimatePresence>
			{show && (
				<main className="min-h-screen w-full flex flex-col items-center justify-center pt-10 px-6 overflow-hidden relative ">
					<div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(var(--primary-rgb),0.15),rgba(255,255,255,0))]"></div>

					<motion.div
						className="flex flex-col items-center justify-center text-center gap-12 w-full"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						<motion.div variants={textVariants} className="max-w-2xl">
							<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
								¡Hola de nuevo
								<span className="text-primary">
									, {isLoaded ? user?.firstName : 'viajero'}!
								</span>
							</h1>
							<p className="mt-4 text-lg text-muted-foreground">
								Estás a un paso de conectar con el mundo. ¿Qué te gustaría hacer
								hoy?
							</p>
						</motion.div>

						<motion.div variants={boxVariants}>
							<IkarusBoxIcon
								className="h-40 w-40 text-destructive drop-shadow-2xl"
								colorScheme="warm"
							/>
						</motion.div>

						<motion.div
							variants={containerVariants}
							className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
						>
							{/* --- CAMBIO 1: RUTA CORREGIDA --- */}
							<motion.div variants={cardVariants}>
								<Link href="/trips">
									<div className="group relative p-8 h-full w-full bg-card/80 backdrop-blur-sm rounded-2xl border border-border/20 shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden">
										<div className="flex flex-col items-start gap-4">
											<div className="p-3 bg-primary/10 rounded-full">
												<Send className="h-6 w-6 text-primary" />
											</div>
											<h2 className="text-2xl font-bold text-foreground">
												Quiero Enviar
											</h2>
											<p className="text-muted-foreground text-wrap">
												Crea un nuevo envío, cotízalo y encuentra al
												transportista ideal para tu paquete.
											</p>
											<div className="mt-4 flex items-center text-primary font-semibold">
												<span>Empezar envío</span>
												<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
											</div>
										</div>
									</div>
								</Link>
							</motion.div>

							{/* El botón de transportar apunta a /trips */}
							<motion.div variants={cardVariants}>
								<Link href="/fromOrder/packageInformation">
									<div className="group relative p-8 h-full w-full bg-card/80 backdrop-blur-sm rounded-2xl border border-border/20 shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden">
										<div className="flex flex-col items-start gap-4">
											<div className="p-3 bg-primary/10 rounded-full">
												<Box className="h-6 w-6 text-primary" />
											</div>
											<h2 className="text-2xl font-bold text-foreground">
												Quiero Transportar
											</h2>
											<p className="text-muted-foreground">
												Publica tus próximos viajes y aprovecha el espacio extra
												para ganar dinero transportando paquetes.
											</p>
											<div className="mt-4 flex items-center text-primary font-semibold">
												<span>Ver mis viajes</span>
												<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
											</div>
										</div>
									</div>
								</Link>
							</motion.div>
						</motion.div>

						{/* --- CAMBIO 2: NUEVO BOTÓN AÑADIDO --- */}
						<motion.div variants={cardVariants}>
							<Link href="/my-packages">
								<Button
									variant="ghost"
									className="text-muted-foreground hover:text-primary"
								>
									<History className="h-4 w-4 mr-2" />
									Ver el historial de mis envíos
								</Button>
							</Link>
						</motion.div>
					</motion.div>
				</main>
			)}
		</AnimatePresence>
	)
}
