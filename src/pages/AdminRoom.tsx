import {useHistory, useParams} from 'react-router-dom'

import '../styles/room.scss'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import {Button} from '../components/Button'
import {Question} from '../components/Question'
import {RoomCode} from '../components/RoomCode'
import {useRoom} from '../hooks/useRoom'
import {database} from '../services/firebase'
import {getLogo} from '../utils/getLogo'

type RoomParams = {
	id: string
}

export function AdminRoom() {
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
		if (window.confirm('Do you want to remove this question?'))
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
	}

	async function handleCheckQuestionAsAnswered(questionId: string) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isAnswered: true
		})
	}

	async function handleHighlightQuestion(questionId: string) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isHighlighted: true
		})
	}

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={getLogo()} alt="Letmeask" />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleEndRoom}>
							End room
						</Button>
					</div>
				</div>
			</header>

			<main>
				<div className="room-title">
					<h1>Room {title}</h1>
					{questions.length > 0 && <span>{questions.length} question(s)</span>}
				</div>

				<div className="question-list">
					{questions.map(question => (
						<Question
							key={question.id}
							content={question.content}
							author={question.author}
							isAnswered={question.isAnswered}
							isHighlighted={question.isHighlighted}
						>
							{!question.isAnswered && (
								<>
									<button
										type="button"
										onClick={() => handleCheckQuestionAsAnswered(question.id)}
									>
										<img src={checkImg} alt="Mark question as answered" />
									</button>
									<button
										type="button"
										onClick={() => handleHighlightQuestion(question.id)}
									>
										<img src={answerImg} alt="Highlight question" />
									</button>
								</>
							)}
							<button
								type="button"
								onClick={() => handleDeleteQuestion(question.id)}
							>
								<img src={deleteImg} alt="Remove question" />
							</button>
						</Question>
					))}
				</div>
			</main>
		</div>
	)
}
