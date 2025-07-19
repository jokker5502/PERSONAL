'use client'

import { auth } from '@/lib/firebase'
import { User, onAuthStateChanged } from 'firebase/auth'
import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react'

// Definimos el tipo para el valor del contexto
interface AuthContextType {
	user: User | null
	loading: boolean
}

// Creamos el contexto con un valor inicial
const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
})

// Creamos el proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// onAuthStateChanged es el observador de Firebase que escucha los cambios de estado de autenticación
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user)
			setLoading(false)
		})

		// Limpiamos el observador cuando el componente se desmonta
		return () => unsubscribe()
	}, [])

	return (
		<AuthContext.Provider value={{ user, loading }}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

// Creamos un hook personalizado para usar el contexto más fácilmente
export const useAuth = () => {
	return useContext(AuthContext)
}
