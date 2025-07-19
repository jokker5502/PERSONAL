'use client'

import BoringAvatar from 'boring-avatars'
import Image from 'next/image'
import React from 'react'

interface AvatarProps {
	/**
	 * URL de imagen del usuario (opcional)
	 */
	imageUrl?: string | null

	/**
	 * Nombre del usuario para generar avatar si no hay imagen
	 */
	name: string

	/**
	 * Tamaño del avatar en píxeles
	 */
	size?: number

	/**
	 * Variante del avatar generado (solo aplica cuando se usa el avatar generado)
	 */
	variant?: 'marble' | 'beam' | 'pixel' | 'sunset' | 'ring' | 'bauhaus'

	/**
	 * Si es true, el avatar será cuadrado en lugar de circular
	 */
	square?: boolean

	/**
	 * Clase CSS adicional
	 */
	className?: string

	/**
	 * Texto alternativo para la imagen
	 */
	alt?: string
}

/**
 * Componente de Avatar que muestra una imagen si está disponible
 * o genera un avatar automáticamente a partir del nombre usando Boring Avatars.
 * Puede ser circular (por defecto) o cuadrado.
 */
const Avatar: React.FC<AvatarProps> = ({
	imageUrl,
	name,
	size = 40,
	variant = 'beam',
	square = false,
	className = '',
	alt,
}) => {
	// Paleta de colores basada en el tema
	const defaultColors = [
		'var(--color-primary)', // #ff8e06 (light) / #fec16f (dark)
		'var(--color-secondary)', // #fec16f (light) / #fda936 (dark)
		'var(--color-accent)', // #fda936 (light) / #ff8e06 (dark)
		'var(--color-destructive)', // #b90221 (light) / #f2022b (dark)
		'var(--color-ring)', // #8b0414 (ambos modos)
	]

	// Determinar la clase de redondeo basada en la prop square
	const roundingClass = square ? 'rounded-md' : 'rounded-full'

	return (
		<div
			className={`relative overflow-hidden ${roundingClass} flex items-center justify-center ${className}`}
			style={{ width: size, height: size }}
		>
			{imageUrl ? (
				<Image
					src={imageUrl}
					alt={alt || `Avatar de ${name}`}
					fill
					sizes={`${size}px`}
					className="object-cover"
					priority
				/>
			) : (
				<BoringAvatar
					size={size}
					name={name}
					variant={variant}
					colors={defaultColors}
					square={square}
				/>
			)}
		</div>
	)
}

export default Avatar
