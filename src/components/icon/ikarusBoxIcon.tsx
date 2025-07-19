'use client'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

interface FarshLogoProps {
	width?: number | string
	height?: number | string
	overrideBackgroundColor?: string
	overrideTextColor?: string
	className?: string
}

const FarshLogoSVG: React.FC<FarshLogoProps> = ({
	width = 80,
	height = 80,
	overrideBackgroundColor,
	overrideTextColor,
	className,
}) => {
	const { theme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	// Evitar problemas de hidratación renderizando solo en el cliente
	useEffect(() => {
		setMounted(true)
	}, [])

	// Usar valores por defecto para el renderizado inicial del servidor
	const currentTheme = mounted ? resolvedTheme || theme : 'light'

	const backgroundColor =
		overrideBackgroundColor || (currentTheme === 'dark' ? '#ae0519' : '#8b0414')
	const textColor =
		overrideTextColor || (currentTheme === 'dark' ? '#fff9fb' : '#fff7f9')

	// Si no está montado aún, usar un placeholder con las mismas dimensiones
	if (!mounted) {
		return (
			<div
				style={{
					width,
					height,
					// Opcional: puedes añadir un color de fondo neutro mientras carga
					backgroundColor: '#8b0414',
				}}
				className={className}
			/>
		)
	}

	return (
		<svg
			width={width}
			height={height}
			className={className}
			viewBox="270 345 655 150"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill={backgroundColor}
				d="M922.37,461.71c0,24.96-19.67,34.94-39.48,34.94-7.87,0-14.52-1.51-20.73-4.54l-.15,2.12h-110.56l-2.27-2.27c-5.29,3.03-12.4,4.69-20.42,4.69-11.5,0-20.42-3.48-26.47-9.53l-27.23-27.23c-2.33-2.33-4.25-5.06-5.75-8.16h-2.11v42.5h-79.48c-6.64,1.84-12.65,2.42-20.64,2.42-10.14,0-18.15-.91-25.72-6.35-8.62,4.99-18.75,6.35-27.22,6.35-7.9,0-16.8-1.2-23.75-5.59v1.36c-10.74,3.32-17.54,4.23-25.71,4.23-10.29,0-21.03-1.66-29.5-8.77v6.35h-139.76l-27.22-27.23v-53.54h6.05v-4.84l-6.05-6.05v-53.55h67.15v-3.78h67.01l21.63,21.63h37.21l6.58,6.58c9.1-5.9,22.75-9,40.76-9,14.52,0,34.18,1.66,45.83,13.31l5.89,5.89v-16.78h64.29l.75.76c4.39-2.12,9.69-3.18,15.58-3.18,7.08,0,13.53,1.69,18.75,5.08v-2.66h124.49l5.84,5.84c7.28-5.66,16.97-8.26,26.07-8.26,6.81,0,13.46,1.21,19.51,4.08l.15-1.66h54.76l27.23,27.23v48.55h-1.82c3.93,4.54,6.51,10.74,6.51,19.06Z"
			/>
			<g fill={textColor}>
				<path d="M275.44,419.2h6.05v-26.02h-6.05v-38.42h60.81v38.42h-6.05v26.02h6.05v38.42h-60.81v-38.42Z" />
				<path d="M406.13,444.92l-11.04-20.57h-.6v2.72c0,7.26,1.51,12.71,5.6,20.27v10.29h-57.48v-38.42h5.6v-29.8h-5.6v-38.42h51.88v60.05h.6l10.59-12.71h-5.6v-25.71h53.24v38.42h-13.31l3.63,5.45c2.12,3.18,3.93,3.93,7.26,3.93,1.51,0,3.03-.15,4.39-.45v37.66c-5.9,1.66-11.65,2.42-18.15,2.42-14.97,0-25.11-4.08-31.01-15.13Z" />
				<path d="M458.76,438.57c0-14.82,9.38-21.18,30.86-21.18,7.71,0,14.37.76,20.42,2.57v-17.24c0-6.96-1.36-11.19-4.69-14.07l-.6.3c.91,2.12,1.36,4.99,1.36,8.02,0,12.86-8.17,19.82-21.78,19.82s-22.69-7.26-22.69-20.27c0-17.7,16.03-26.32,46.59-26.32,33.13,0,48.1,10.13,48.1,32.37v16.64h5.6v37.51c-6.35,2.27-14.07,3.33-22.39,3.33-13.31,0-21.18-2.72-24.35-8.62h-.6c-6.5,5.75-16.03,8.62-27.98,8.62-18.76,0-27.83-6.96-27.83-21.48ZM510.04,440.23v-8.17c-.76-1.21-2.42-1.81-4.08-1.81-2.87,0-4.39,2.12-4.39,6.05s1.51,5.9,4.39,5.9c1.82,0,3.33-.76,4.08-1.97Z" />
				<path d="M567.51,419.2h5.6v-8.17h-5.6v-38.42h49.16v2.72c-2.27,3.48-3.18,8.02-3.63,15.43h.6c3.63-13.01,13.01-20.57,26.92-20.57,14.67,0,23.6,8.47,23.6,22.39s-8.47,22.54-22.54,22.54c-10.74,0-18.45-5.14-21.63-14.67h-.6v18.76h12.71v38.42h-64.59v-38.42Z" />
				<path d="M672.48,430.09v-19.06h-5.6v-38.42h51.88v46.89c0,3.48,1.82,5.45,4.99,5.45,2.72,0,4.84-1.51,6.2-4.54v-9.38h-5.6v-38.42h51.88v46.59h5.6v38.42h-50.37v-15.28h-.6c-6.05,11.95-15.73,17.7-29.65,17.7-18.91,0-28.74-10.44-28.74-29.95Z" />
				<path d="M829.34,450.82h-.61l-.91,6.81h-40.54v-36.45h7.56c7.41,4.69,16.94,7.56,28.44,7.56,4.54,0,7.56-.45,10.74-1.66v-.6c-35.24-4.69-48.4-14.82-48.4-30.86,0-14.98,11.65-25.41,30.1-25.41,9.98,0,18.15,3.03,24.81,9.23h.6l.91-6.81h40.54v33.43h-7.56c-6.81-3.78-16.49-6.05-26.32-6.05-4.39,0-7.11.45-9.98,1.36v.6c37.21,7.56,48.56,14.07,48.56,30.71s-11.8,27.38-31.92,27.38c-9.98,0-17.4-2.57-26.02-9.23Z" />
			</g>
		</svg>
	)
}

export default FarshLogoSVG
