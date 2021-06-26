import {Trans, t} from '@lingui/macro'

import '../styles/room-code.scss'
import copyImg from '../assets/images/copy.svg'

import {successAlert} from '../utils/alerts/success'

type RoomCodeProps = {
	code: string
}

export function RoomCode({code}: RoomCodeProps) {
	function copyRoomCodeToClipboard() {
		navigator.clipboard.writeText(code)
		successAlert(t`Copied!`)
	}

	return (
		<button className="room-code" onClick={copyRoomCodeToClipboard}>
			<div>
				<img src={copyImg} alt={t`Copy room code`} />
			</div>
			<span>
				<Trans>Room #{code}</Trans>
			</span>
		</button>
	)
}
