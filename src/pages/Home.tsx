import {useHistory} from 'react-router-dom'

import '../styles/auth.scss'
import illustrationImg from '../assets/images/illustration.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import {Button} from '../components/Button'
import {useAuth} from '../hooks/useAuth'
import {FormEvent, useState} from 'react'
import {database} from '../services/firebase'
import {getLogo} from '../utils/getLogo'

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

		if (!roomRef.exists()) return alert('Room does not exist!')

		if (roomRef.val().endedAt) return alert('Room already ended!')

		history.push(`rooms/${roomCode}`)
	}

	return (
		<div id="page-auth">
			<aside>
				<img
					src={illustrationImg}
					alt="Illustration of questions and answers"
				/>
				<strong>Create live Q&amp;A rooms</strong>
				<p>Solve your audience questions in real time</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={getLogo()} alt="Letmeask" />
					<button onClick={handleCreateRoom} className="create-room">
						<img src={googleIconImg} alt="Google icon" />
						Create your room with Google
					</button>
					<div className="separator">or join a room</div>
					<form onSubmit={handleJoinRoom}>
						<input
							type="text"
							placeholder="Type the room's code"
							value={roomCode}
							onChange={e => setRoomCode(e.target.value)}
						/>
						<Button type="submit">Join room</Button>
					</form>
				</div>
			</main>
		</div>
	)
}
