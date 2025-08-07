'use client'

import IkarusBoxIcon from '@/components/icon/ikarusBoxIconMonocromatico'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function LandingPage() {
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

	const itemVariants = {
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
				duration: 1.5,
			},
		},
	}

	return (
		<AnimatePresence>
			{show && (
				<main className="min-h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden relative">
					<div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(var(--primary-rgb),0.1),rgba(255,255,255,0))]"></div>

					<motion.div
						className="flex flex-col items-center justify-center text-center gap-10 w-full"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						{/* Icono animado */}
						<motion.div variants={boxVariants}>
							<IkarusBoxIcon
								className="h-48 w-48 text-destructive drop-shadow-2xl"
								colorScheme="warm"
							/>
						</motion.div>

						{/* Sección de texto principal */}
						<motion.div variants={itemVariants} className="max-w-3xl">
							<h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
								La forma más fácil de enviar y recibir paquetes
							</h1>
							<p className="mt-6 text-lg md:text-xl text-muted-foreground">
								Conecta con viajeros de confianza y transportistas eficientes.
								Tus envíos, seguros y a tiempo.
							</p>
						</motion.div>

						{/* Botones de llamada a la acción*/}
						<motion.div
							variants={itemVariants}
							className="flex flex-col sm:flex-row gap-4"
						>
							<Link href="/login">
								<Button size="lg" variant="link">
									Iniciar Sesión
									<ArrowRight className="h-4 w-4 ml-2" />
								</Button>
							</Link>
							<Link href="/about-us">
								<Button size="lg" variant="link">
									Conoce más
								</Button>
							</Link>
						</motion.div>
					</motion.div>
				</main>
			)}
		</AnimatePresence>
	)
}
