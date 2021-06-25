import {useEffect} from 'react'
import {useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'

import {useAuth} from '../hooks/useAuth'
import {database} from '../services/firebase'

type RouteParams = {
	id: string
}

export function withPrivateRoute(Component: React.FC, requiresAdmin = false) {
	const {user, loading: isUserLoading} = useAuth()
	const {push} = useHistory()
	const {id: roomId} = useParams<RouteParams>()

	const [isRouteAvailable, setIsRouteAvailable] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!isUserLoading) {
			if (!isAuthenticated()) {
				setLoading(false)
			} else if (requiresAdmin) {
				isRoomAdmin().then(res => {
					setIsRouteAvailable(res)
					setLoading(false)
				})
			} else {
				setIsRouteAvailable(true)
				setLoading(false)
			}
		}
	}, [isUserLoading])

	useEffect(() => {
		if (!loading && !isRouteAvailable) push('/')
	}, [loading, isRouteAvailable])

	function isAuthenticated() {
		return user != undefined
	}

	async function isRoomAdmin() {
		const room = (await database.ref(`rooms/${roomId}`).get()).val()
		if (!room) return false

		return room.authorId == user?.id
	}

	if (loading || !isRouteAvailable) return <h1>Loading...</h1>

	return <Component />
}
