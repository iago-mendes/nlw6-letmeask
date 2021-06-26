import '../styles/room-code.scss'
import copyImg from '../assets/images/copy.svg'

import {successAlert} from '../utils/alerts/success'

type RoomCodeProps = {
	code: string
}

export function RoomCode({code}: RoomCodeProps) {
	function copyRoomCodeToClipboard() {
		navigator.clipboard.writeText(code)
		successAlert('Copied!')
	}

	return (
		<button className="room-code" onClick={copyRoomCodeToClipboard}>
			<div>
				<img src={copyImg} alt="Copy room code" />
			</div>
			<span>Room #{code}</span>
		</button>
	)
}
