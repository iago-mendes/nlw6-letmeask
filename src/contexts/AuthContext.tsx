import {ReactNode, useEffect, useState} from 'react'
import {createContext} from 'react'

import {auth, firebase} from '../services/firebase'

type User = {
	id: string
	name: string
	avatar: string
}

type AuthContextType = {
	user: User | undefined
	signInWithGoogle: () => Promise<void>
	loading: boolean
}

export const AuthContext = createContext({} as AuthContextType)

type AuthContextProviderProps = {
	children: ReactNode
}

export function AuthContextProvider({children}: AuthContextProviderProps) {
	const [user, setUser] = useState<User>()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				const {displayName, photoURL, uid} = user

				if (!displayName || !photoURL)
					throw new Error('Missing information from Google Account.')

				setUser({
					id: uid,
					name: displayName,
					avatar: photoURL
				})
			}
			setLoading(false)
		})

		return () => {
			unsubscribe()
		}
	}, [])

	async function signInWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider()

		const result = await auth.signInWithPopup(provider)

		if (result.user) {
			const {displayName, photoURL, uid} = result.user

			if (!displayName || !photoURL)
				throw new Error('Missing information from Google Account.')

			setUser({
				id: uid,
				name: displayName,
				avatar: photoURL
			})
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				signInWithGoogle,
				loading
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
