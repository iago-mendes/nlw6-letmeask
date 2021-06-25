import {MySwal} from '.'

export function confirmAlert(
	title: string,
	text: string,
	callback: () => void
) {
	MySwal.fire({
		icon: 'question',
		title: title,
		text: text,
		showCancelButton: true
	}).then(res => {
		if (res.isConfirmed) callback()
	})
}
