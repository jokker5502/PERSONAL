import Navbar from '@/modules/home/atoms/Navbar/Navbar'

import React from 'react'

interface HeaderProps {
	className?: string
	variant?: 'fixed' | 'sticky' | 'static'
}

const Header: React.FC<HeaderProps> = ({
	className = '',
	variant = 'sticky',
}) => {
	const getPositionClasses = () => {
		switch (variant) {
			case 'fixed':
				return 'fixed top-0 left-0 right-0 z-50'
			case 'sticky':
				return 'sticky top-0 z-50'
			case 'static':
				return 'relative'
			default:
				return 'sticky top-0 z-50'
		}
	}

	return (
		<header
			className={`
        ${getPositionClasses()}
        bg-background/55 backdrop-blur supports-[backdrop-filter]:bg-background/10  transition-colors duration-200
        ${className}
      `}
		>
			<Navbar /> {/* Barra de navegación arriba */}
		</header>
	)
}

export default Header
