import {useHistory, useParams} from 'react-router-dom'
import {Trans, t, Plural} from '@lingui/macro'

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
			t`Do you want to remove this question?`,
			t`You cannot undo this action.`,
			async () =>
				await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
		)
	}

	async function handleCheckQuestionAsAnswered(questionId: string) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isAnswered: true
		})
	}

	async function handleHighlightQuestion(questionId: string, value?: boolean) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isHighlighted: value ?? true
		})
	}

	function handleStreamYoutubeLiveStream() {
		MySwal.fire({
			title: t`What is the embed ID?`,
			text: t`The embed ID is informed in the URL after "/embed/".`,
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
			t`Do you want to stop?`,
			t`If you continue, your YouTube live will stop streamming.`,
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
					<h1>
						<Trans>Room {title}</Trans>
					</h1>
					{questions.length > 0 && (
						<span>
							<Plural
								value={questions.length}
								one="# question"
								other="# questions"
							/>
						</span>
					)}
				</div>

				<div className="youtube-controller">
					{youtubeEmbedId === '' ? (
						<button onClick={handleStreamYoutubeLiveStream}>
							<Trans>Stream YouTube live</Trans>
						</button>
					) : (
						<>
							<span>
								<Trans>You are streamming a YouTube live</Trans>
							</span>
							<button onClick={handleStopYoutubeLiveStream}>
								<Trans>Stop live</Trans>
							</button>
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
										<img src={checkImg} alt={t`Mark question as answered`} />
									</button>
									<button
										type="button"
										onClick={() =>
											handleHighlightQuestion(
												question.id,
												!question.isHighlighted
											)
										}
									>
										<img src={answerImg} alt={t`Highlight question`} />
									</button>
								</>
							)}
							<button
								type="button"
								onClick={() => handleDeleteQuestion(question.id)}
							>
								<img src={deleteImg} alt={t`Remove question`} />
							</button>
						</Question>
					))}
				</div>
			</main>
		</div>
	)
}
