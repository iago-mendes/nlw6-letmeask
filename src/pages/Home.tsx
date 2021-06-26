import {FormEvent, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Trans, t} from '@lingui/macro'

import '../styles/auth.scss'
import illustrationImg from '../assets/images/illustration.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import {Button} from '../components/Button'
import {useAuth} from '../hooks/useAuth'
import {database} from '../services/firebase'
import {getLogo} from '../utils/getLogo'
import {ThemeSwitch} from '../components/ThemeSwitch'
import {errorAlert} from '../utils/alerts/error'

export function Home() {
	const history = useHistory()
	const {user, signInWithGoogle} = useAuth()
	const [roomCode, setRoomCode] = useState('')

	async function handleCreateRoom() {
		if (!user) await signInWithGoogle()

		history.push('/rooms/new')
	}

	async function handleJoinRoom(e: FormEvent) {
		e.preventDefault()

		if (roomCode.trim() === '') return

		const roomRef = await database.ref(`rooms/${roomCode}`).get()

		if (!roomRef.exists()) return errorAlert('Room does not exist!')

		if (roomRef.val().endedAt) return errorAlert('Room already ended!')

		history.push(`rooms/${roomCode}`)
	}

	return (
		<div id="page-auth">
			<aside>
				<ThemeSwitch />
				<img
					src={illustrationImg}
					alt={t`Illustration of questions and answers`}
				/>
				<strong>
					<Trans>Create live Q&amp;A rooms</Trans>
				</strong>
				<p>
					<Trans>Solve your audience questions in real time</Trans>
				</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={getLogo()} alt="Letmeask" />
					<button onClick={handleCreateRoom} className="create-room">
						<img src={googleIconImg} alt={t`Google icon`} />
						<Trans>Create your room with Google</Trans>
					</button>
					<div className="separator">
						<Trans>or join a room</Trans>
					</div>
					<form onSubmit={handleJoinRoom}>
						<input
							type="text"
							placeholder={t`Type the room's code`}
							value={roomCode}
							onChange={e => setRoomCode(e.target.value)}
						/>
						<Button type="submit">
							<Trans>Join room</Trans>
						</Button>
					</form>
				</div>
			</main>
		</div>
	)
}
