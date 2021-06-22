import { Link } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'

import '../styles/auth.scss'

export function NewRoom() {
	return (
		<div id='page-auth' >
			<aside>
				<img src={illustrationImg} alt='Illustration of questions and answers' />
				<strong>Create live Q&amp;A rooms</strong>
				<p>Solve your audience questions in real time</p>
			</aside>
			<main>
				<div className='main-content' >
					<img src={logoImg} alt='Letmeask' />
					<h2>Create a room</h2>
					<form>
						<input
							type='text'
							placeholder="Room's name"
						/>
						<Button type='submit'>
							Create room
						</Button>
					</form>
					<p>
						Want to join an existing room? <Link to='/'>click here</Link>
					</p>
				</div>
			</main>
		</div>
	)
}