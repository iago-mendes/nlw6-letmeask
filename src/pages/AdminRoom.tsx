import { useHistory, useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

import '../styles/room.scss'

type RoomParams = {
	id: string
}

export function AdminRoom() {
	const {user} = useAuth()
	const history = useHistory()
	const {id: roomId} = useParams<RoomParams>()
	
	const {questions, title} = useRoom(roomId)

	async function handleEndRoom() {
		await database.ref(`rooms/${roomId}`).update({
			endedAt: new Date()
		})

		history.push('/')
	}

	async function handleDeleteQuestion(questionId: string) {
		if(window.confirm('Do you want to remove this question?'))
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
	}
	
	return (
		<div id='page-room'>
			<header>
				<div className='content'>
					<img src={logoImg} alt='Letmeask' />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleEndRoom} >End room</Button>
					</div>
				</div>
			</header>

			<main>
				<div className='room-title'>
					<h1>Room {title}</h1>
					{questions.length > 0 && (
						<span>{questions.length} question(s)</span>
					)}
				</div>

				<div className='question-list'>
					{questions.map(question => (
						<Question
							key={question.id}
							content={question.content}
							author={question.author}
						>
							<button
								type='button'
								onClick={() => handleDeleteQuestion(question.id)}
							>
								<img src={deleteImg} alt='Remove question' />
							</button>
						</Question>
					))}
				</div>
			</main>
		</div>
	)
}