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
import {ThemeSwitch} from '../components/ThemeSwitch'
import {confirmAlert} from '../utils/alerts/confirm'
import {MySwal} from '../utils/alerts'

type RoomParams = {
	id: string
}

export function AdminRoom() {
	const history = useHistory()
	const {id: roomId} = useParams<RoomParams>()

	const {questions, title, youtubeEmbedId} = useRoom(roomId)

	async function handleEndRoom() {
		await database.ref(`rooms/${roomId}`).update({
			endedAt: new Date()
		})

		history.push('/')
	}

	async function handleDeleteQuestion(questionId: string) {
		confirmAlert(
			'Do you want to remove this question?',
			'You cannot undo this action.',
			async () =>
				await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
		)
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

	function handleStreamYoutubeLiveStream() {
		MySwal.fire({
			title: 'What is the embed ID?',
			text: 'The embed ID is informed in the URL after "/embed/".',
			input: 'text',
			showCancelButton: true
		}).then(async res => {
			if (res.isConfirmed && res.value && res.value !== '')
				await database.ref(`rooms/${roomId}`).update({
					youtubeEmbedId: res.value
				})
		})
	}

	function handleStopYoutubeLiveStream() {
		confirmAlert(
			'Do you want to stop?',
			'If you continue, your YouTube live will stop streamming.',
			async () =>
				await database.ref(`rooms/${roomId}`).update({
					youtubeEmbedId: ''
				})
		)
	}

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<div>
						<img src={getLogo()} alt="Letmeask" />
						<ThemeSwitch />
					</div>
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

				<div className="youtube-controller">
					{youtubeEmbedId === '' ? (
						<button onClick={handleStreamYoutubeLiveStream}>
							Stream YouTube live
						</button>
					) : (
						<>
							<span>You are streamming a YouTube live</span>
							<button onClick={handleStopYoutubeLiveStream}>Stop live</button>
						</>
					)}
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
