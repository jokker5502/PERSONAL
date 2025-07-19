'use client'
import FarshLogoSVG from '@/components/icon/ikarusNameIcon'
import React from 'react'

interface IkarusCardProps {
	href: string
	subText: string
	bgColor?: string
}

const IkarusCard: React.FC<IkarusCardProps> = ({
	href,
	subText = 'Recibe',
	bgColor = 'bg-red-900', // Color rojo oscuro similar a la imagen
}) => {
	return (
		<a
			href={href}
			className={`block w-full max-w-sm ${bgColor} rounded-[10px] shadow-lg hover:shadow-xl transition-all duration-300 transform  text-white overflow-hidden`}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div className="p-6 flex flex-col items-center text-center">
				{/* Logo Text */}
				<FarshLogoSVG className="h-10 w-30" />
				{/* Subtitle */}
				<p className="text-lg mb-4">{subText}</p>
			</div>

			{/* Footer Text */}
		</a>
	)
}

export default IkarusCard
