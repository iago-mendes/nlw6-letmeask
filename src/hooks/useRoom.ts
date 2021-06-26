import {useEffect, useState} from 'react'
import {database} from '../services/firebase'
import {useAuth} from './useAuth'

type FirebaseQuestions = Record<
	string,
	{
		author: {
			name: string
			avatar: string
		}
		content: string
		isAnswered: boolean
		isHighlighted: boolean
		likes: Record<
			string,
			{
				authorId: string
			}
		>
	}
>

type QuestionType = {
	id: string
	author: {
		name: string
		avatar: string
	}
	content: string
	isAnswered: boolean
	isHighlighted: boolean
	likeCount: number
	likeId: string | undefined
}

export function useRoom(roomId: string) {
	const {user} = useAuth()
	const [questions, setQuestions] = useState<QuestionType[]>([])
	const [title, setTitle] = useState('')
	const [hasEnded, setHasEnded] = useState(false)
	const [youtubeEmbedId, setYoutubeEmbedId] = useState('')

	const sortedQuestions = [...questions].sort((a, b) => {
		if (a.isAnswered && !b.isAnswered) return 1
		if (a.isHighlighted && !b.isHighlighted) return -1
		if (a.likeCount > b.likeCount) return -1
		else return 1
	})

	useEffect(() => {
		const roomRef = database.ref(`rooms/${roomId}`)

		roomRef.on('value', room => {
			const databaseRoom = room.val()
			const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}
			const parsedQuestions = Object.entries(firebaseQuestions).map(
				([key, value]) => ({
					id: key,
					content: value.content,
					author: value.author,
					isHighlighted: value.isHighlighted,
					isAnswered: value.isAnswered,
					likeCount: Object.values(value.likes ?? {}).length,
					likeId: Object.entries(value.likes ?? {}).find(
						([, like]) => like.authorId === user?.id
					)?.[0]
				})
			)

			setTitle(databaseRoom.title)
			setQuestions(parsedQuestions)
			setHasEnded(databaseRoom.endedAt != undefined)

			if (databaseRoom.youtubeEmbedId != undefined)
				setYoutubeEmbedId(databaseRoom.youtubeEmbedId)
		})

		return () => {
			roomRef.off('value')
		}
	}, [roomId, user?.id])

	return {questions: sortedQuestions, title, hasEnded, youtubeEmbedId}
}
