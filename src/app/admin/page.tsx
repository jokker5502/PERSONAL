'use client'

import { useUser } from '@clerk/nextjs'

export default function AdminPage() {
	const { user, isLoaded } = useUser()

	if (!isLoaded) return <p>Loading...</p>

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold">Admin Dashboard</h1>
			<p>Hola, {user?.fullName}</p>
			<p>
				Tu rol es: {String(user?.publicMetadata?.role) || 'sin rol asignado'}
			</p>
		</div>
	)
}
