'use client'
import { FC, useState } from 'react'

type OptionItem = {
	name: string
	value: string
}

interface MultipleChoiceSelectorProps {
	options: OptionItem[]
	onSelectionChange: (selectedValue: string) => void
	isVisible?: boolean
	defaultValue?: string
	placeholder?: string
}

const MultipleChoiceSelector: FC<MultipleChoiceSelectorProps> = ({
	options,
	onSelectionChange,
	isVisible = true,
	defaultValue,
	placeholder = 'Selecciona una opción',
}) => {
	const [selectedValue, setSelectedValue] = useState<string>(defaultValue || '')

	// Si no es visible, no renderizar nada
	if (!isVisible) {
		return null
	}

	const handleSelection = (value: string) => {
		setSelectedValue(value)
		onSelectionChange(value)
	}

	return (
		<nav className="py-4 px-2">
			<div className="flex space-x-2 overflow-x-auto">
				{options.map((option) => (
					<button
						key={option.value}
						onClick={() => handleSelection(option.value)}
						className={`px-6 py-2 rounded-full text-center whitespace-nowrap transition-colors ${
							selectedValue === option.value
								? 'bg-category-selected dark:bg-category-selected text-white dark:text-button-primary-text hover:text-white hover:bg-category-selected'
								: 'bg-gray-200 text-gray-700 dark:bg-category-default dark:text-white hover:text-white hover:bg-category-selected'
						}`}
					>
						{option.name}
					</button>
				))}
			</div>
			{!selectedValue && (
				<p className="text-gray-500 text-sm mt-2 px-2">{placeholder}</p>
			)}
		</nav>
	)
}

export default MultipleChoiceSelector
