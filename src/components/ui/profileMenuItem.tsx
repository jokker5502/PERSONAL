'use client'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface ProfileMenuItemProps {
	icon: React.ReactNode
	label: string
	href: string
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
	icon,
	label,
	href,
}) => {
	return (
		<Link
			href={href}
			className="flex items-center justify-between w-full p-4 hover:bg-gray-100/50 active:bg-gray-200/30 transition-colors dark:hover:bg-muted/10 "
		>
			<div className="flex items-center">
				<div className="text-gray-700 mr-3 dark:text-foreground">{icon}</div>
				<span className="text-gray-800 font-medium dark:text-foreground">
					{label}
				</span>
			</div>
			<ChevronRight
				size={20}
				className="text-gray-400 dark:text-foreground	"
			/>
		</Link>
	)
}

interface ProfileMenuProps {
	menuItems: ProfileMenuItemProps[]
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ menuItems }) => {
	return (
		<div className="w-full bg-white/70 backdrop-blur-md rounded-xl overflow-hidden mb-6 shadow-sm  border-gray-200/50 dark:bg-primary-foreground">
			<div className="flex flex-col divide-y divide-gray-200/30">
				{menuItems.map((item, index) => (
					<ProfileMenuItem
						key={index}
						icon={item.icon}
						label={item.label}
						href={item.href}
					/>
				))}
			</div>
		</div>
	)
}
