import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

import '../styles/room.scss'

type FirebaseQuestions = Record<string, {
	author: {
		name: string
		avatar: string
	}
	content: string
	isAnswered: boolean
	isHighlighted: boolean
}>

type Question = {
	id: string
	author: {
		name: string
		avatar: string
	}
	content: string
	isAnswered: boolean
	isHighlighted: boolean
}

type RoomParams = {
	id: string
}

export function Room() {
	const {user} = useAuth()
	const {id: roomId} = useParams<RoomParams>()
	const [newQuestion, setNewQuestion] = useState('')
	const [questions, setQuestions] = useState<Question[]>([])
	const [title, setTitle] = useState('')

	useEffect(() =>
	{
		const roomRef = database.ref(`rooms/${roomId}`)

		roomRef.on('value', room => {
			const databaseRoom = room.val()
			const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}
			const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => ({
				id: key,
				content: value.content,
				author: value.author,
				isHighlighted: value.isHighlighted,
				isAnswered: value.isAnswered
			}))

			setTitle(databaseRoom.title)
			setQuestions(parsedQuestions)
		})
	}, [roomId])

	async function handleSendQuestion(e: FormEvent) {
		e.preventDefault()

		if (newQuestion.trim() === '')
			return
		
		if (!user)
			throw new Error('You must be logged in!')
		
		const question = {
			content: newQuestion,
			author: {
				name: user.name,
				avatar: user.avatar,
			},
			isHighlighted: false,
			isAnswered: false
		}

		await database.ref(`rooms/${roomId}/questions`).push(question)

		setNewQuestion('')
	}

	return (
		<div id='page-room'>
			<header>
				<div className='content'>
					<img src={logoImg} alt='Letmeask' />
					<RoomCode code={roomId} />
				</div>
			</header>

			<main>
				<div className='room-title'>
					<h1>Room {title}</h1>
					{questions.length > 0 && (
						<span>{questions.length} question(s)</span>
					)}
				</div>

				<form onSubmit={handleSendQuestion} >
					<textarea
						placeholder='What do you want to ask?'
						value={newQuestion}
						onChange={e => setNewQuestion(e.target.value)}
					/>
					<div className='form-footer'>
						{
							user
								? (
									<div className='user-info'>
										<img src={user.avatar} alt={user.name} />
										<span>{user.name}</span>
									</div>
								)
								: (
									<span>To send a question, <button>log into your account</button>.</span>
								)
						}
						<Button type='submit' disabled={!user} >
							Send question
						</Button>
					</div>
				</form>

				{JSON.stringify(questions)}
			</main>
		</div>
	)
}