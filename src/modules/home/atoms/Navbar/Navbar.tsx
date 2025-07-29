'use client'

import FarshLogoSVG from '@/components/icon/ikarusNameIcon'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { MENU_ITEMS } from './constants'

const Navbar = () => {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<nav className="fixed top-0 left-0 w-full z-50 px-6 backdrop-blur-xl bg-background/70 shadow-lg supports-[backdrop-filter]:bg-background/60">
			<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
				{/* Logo */}
				<FarshLogoSVG className="h-10 w-30 lg:h-10 lg:w-50" />

				{/* Desktop menu */}
				<div className="hidden md:flex gap-12">
					{MENU_ITEMS.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={clsx(
								'flex items-center gap-6 text-foreground hover:text-primary transition',
								pathname === item.href && 'text-primary font-semibold'
							)}
						>
							<span>{item.label}</span>
						</Link>
					))}
				</div>

				{/* Mobile hamburger */}
				<div className="md:hidden">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="text-foreground hover:text-primary"
						aria-label="Toggle menu"
					>
						{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
					</button>
				</div>
			</div>

			{/* Mobile menu animated */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className="md:hidden px-4 pb-4 pt-2"
					>
						<div className="bg-background/50 backdrop-blur-lg rounded-xl shadow-xl p-4 space-y-3">
							{MENU_ITEMS.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={clsx(
										'flex items-center gap-3 text-foreground hover:text-primary transition',
										pathname === item.href && 'text-primary font-semibold'
									)}
									onClick={() => setIsOpen(false)}
								>
									<span>{item.label}</span>
								</Link>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	)
}

export default Navbar
