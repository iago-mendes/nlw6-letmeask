import {FormEvent, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Trans, t} from '@lingui/macro'

import '../styles/auth.scss'
import illustrationImg from '../assets/images/illustration.svg'

import {Button} from '../components/Button'
import {useAuth} from '../hooks/useAuth'
import {database} from '../services/firebase'
import {getLogo} from '../utils/getLogo'
import {ThemeSwitch} from '../components/ThemeSwitch'

export function NewRoom() {
	const {user} = useAuth()
	const history = useHistory()
	const [newRoom, setNewRoom] = useState('')

	async function handleCreateRoom(e: FormEvent) {
		e.preventDefault()

		if (newRoom.trim() === '') return

		const roomRef = database.ref('rooms')
		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id
		})

		history.push(`/admin/rooms/${firebaseRoom.key}`)
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
					<h2>
						<Trans>Create a room</Trans>
					</h2>
					<form onSubmit={handleCreateRoom}>
						<input
							type="text"
							placeholder={t`Room's name`}
							value={newRoom}
							onChange={e => setNewRoom(e.target.value)}
						/>
						<Button type="submit">
							<Trans>Create room</Trans>
						</Button>
					</form>
					<p>
						<Trans>
							Want to join an existing room? <Link to="/">click here</Link>
						</Trans>
					</p>
				</div>
			</main>
		</div>
	)
}
