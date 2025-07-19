import FarshLogoMonoSVG from '@/components/icon/ikarusBoxIconMonocromatico'
import FarshLogoSVG from '@/components/icon/ikarusNameIcon'
import React, { useState, useEffect } from 'react'

// Define the data for each tab
interface TabData {
	description: string
}

const IkarusComponent: React.FC = () => {
	// State to track which tab is active, default to 'lleva'
	const [activeTab, setActiveTab] = useState<'recibe' | 'lleva'>('lleva')

	// Use useEffect to safely access localStorage after component mounts (client-side only)
	useEffect(() => {
		// Check if we're in the browser environment
		if (typeof window !== 'undefined') {
			const savedTab = localStorage.getItem('ikarusActiveTab')
			// Only update state if there's a valid value saved
			if (savedTab === 'recibe' || savedTab === 'lleva') {
				setActiveTab(savedTab as 'recibe' | 'lleva')
			}
		}
	}, [])

	// Save value to localStorage when it changes (client-side only)
	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('ikarusActiveTab', activeTab)
		}
	}, [activeTab])

	// Tab content data
	const tabData: Record<'recibe' | 'lleva', TabData> = {
		recibe: {
			description:
				'Descripción de esta estapa si seleccionas RECIBE. Aquí puedes agregar toda la información para la sección RECIBE.',
		},
		lleva: {
			description:
				'Descripción de esta estapa. Descripción de esta estapa. Descripción de esta estapa. Descripción de esta estapa',
		},
	}

	// Handler for tab clicks
	const handleTabClick = (tab: 'recibe' | 'lleva') => {
		setActiveTab(tab)
	}

	return (
		<div className="px-8">
			{/* Logo Section - Usando bg-chart-5 del CSS global */}
			<div
				className="rounded-b-[3rem] shadow-md flex justify-center pt-20 bg-chart-5"
				style={{
					backgroundImage:
						"url('https://i.pinimg.com/736x/46/63/a2/4663a25e1149f1ed0d732d0eb6de478f.jpg')",
				}}
			>
				<FarshLogoMonoSVG className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-40 lg:w-40" />
			</div>
			<div className="relative flex flex-col rounded-b-[3rem] items-center justify-between h-full py-6 px-4 ">
				{/* Bottom Navigation & Content */}
				<div className="w-full mt-80">
					{/* Tab Navigation - Usando colores del CSS global */}
					<div className="space-x-4 mb-6 text-white">
						<button
							onClick={() => handleTabClick('recibe')}
							className={`px-5 py-3 uppercase font-bold text-sm sm:text-base rounded-[2rem] bg-card ${
								activeTab === 'recibe' ? 'bg-sidebar-ring  ' : 'text-foreground'
							}`}
						>
							Recibe
						</button>
						<button
							onClick={() => handleTabClick('lleva')}
							className={`px-5 py-3 uppercase font-bold text-sm sm:text-base rounded-[2rem] bg-card ${
								activeTab === 'lleva' ? 'bg-sidebar-ring ' : 'text-foreground'
							}`}
						>
							Lleva
						</button>
					</div>
					{/* Content Section */}
					<div className="text-foreground mb-6 px-10 py-10 border border--foreground rounded-[1rem]">
						<div className="mb-4">
							<FarshLogoSVG className="h-5 w-22 lg:h-10 lg:w-28" />
						</div>
						<p className="text-sm sm:text-base text-foreground">
							{tabData[activeTab].description}
						</p>
					</div>
					{/* Next Button - Usando colores del CSS global */}
					<div className="flex justify-end px-4">
						<button className="text-primary font-medium hover:text-accent transition-colors">
							Siguiente
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default IkarusComponent
