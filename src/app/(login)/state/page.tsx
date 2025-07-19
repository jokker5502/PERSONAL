'use client'

import MultipleChoiceSelector from '@/components/ui/menu'

export default function HomePage() {
	const options = [
		{ name: 'Viajes', value: 'Viajes' },
		{ name: 'Pasajeros', value: 'Pasajeros' },
	]

	const handleSelectionChange = (selectedValue: string) => {
		console.log('Opción seleccionada:', selectedValue)
		// Aquí puedes hacer lo que necesites con el valor seleccionado
	}

	return (
		<div className="min-h-screen px-4  ">
			{/* Logo en la parte superior con imagen de fondo */}
			<div
				className="rounded-b-[3rem] shadow-md flex justify-center pt-60 pb-10 bg-cover bg-center"
				style={{
					backgroundImage:
						'url(https://i.pinimg.com/736x/b6/1e/2f/b61e2f13aa87a3aef47221f1a7bc08d7.jpg)',
				}}
			>
				{/* Logo SVG desde la carpeta public */}
			</div>

			{/* Menu de navegacion Secundario */}
			{/* Menu de navegacion Secundario */}
			<div className="mx-auto">
				<div className=" mt-50">
					<MultipleChoiceSelector
						options={options}
						onSelectionChange={handleSelectionChange}
						defaultValue="option1"
						placeholder="Elige una opción"
					/>
				</div>
				<div className="border border-slate-200 dark:border-slate-800 rounded-xl p-2 mx-2">
					<a>Lleva</a>
				</div>
			</div>
		</div>
	)
}
