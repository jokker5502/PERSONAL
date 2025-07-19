'use client'
import { Briefcase, Home, Plane, Search, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface MenuItemProps {
	icon: React.ReactNode
	isActive: boolean
	href: string
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, isActive, href }) => {
	return (
		<Link
			href={href}
			className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
				isActive
					? 'text-primary dark:text-primary' // Naranja en ambos modos (#ff8e06 y #fec16f)
					: 'text-white dark:text-white' // Blanco por defecto en ambos modos
			}`}
		>
			{icon}
		</Link>
	)
}

const MenuBarMobile: React.FC = () => {
	const pathname = usePathname()

	const menuItems = [
		{ icon: <Home size={24} />, href: '/state' },
		{ icon: <Plane size={24} />, href: '/trips' },
		{ icon: <Search size={24} />, href: '/c' },
		{ icon: <Briefcase size={24} />, href: '/package' },
		{ icon: <User size={24} />, href: '/settings' },
	]

	return (
		<div className="fixed bottom-0 left-0 right-0 flex justify-between bg-destructive dark:bg-primary-foreground  z-50">
			{menuItems.map((item, index) => (
				<MenuItem
					key={index}
					icon={item.icon}
					isActive={
						pathname === item.href ||
						(pathname.startsWith(item.href) && item.href !== '/')
					}
					href={item.href}
				/>
			))}
		</div>
	)
}

export default MenuBarMobile
