'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function ModeToggle() {
	const { setTheme, theme } = useTheme()

	return (
		<button
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
			className="relative inline-flex h-12 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
			aria-label="Toggle theme"
		>
			<span className="sr-only">Toggle theme</span>
			<span className="relative inline-block h-10 w-10 rounded-full bg-white ring-0 transition">
				<span className="pointer-events-none relative block h-full rounded-full p-3">
					{theme === 'dark' ? (
						<SunIcon className="h-6 w-6 text-yellow-500" />
					) : (
						<MoonIcon className="h-6 w-6 text-gray-900" />
					)}
				</span>
			</span>
		</button>
	)
}
