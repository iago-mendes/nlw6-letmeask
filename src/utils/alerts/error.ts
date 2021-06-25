import {MySwal} from '.'

export function errorAlert(message: string, title = 'Error') {
	MySwal.fire({
		icon: 'error',
		title,
		text: message
	})
}
