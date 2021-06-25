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
		showCancelButton: true,
		confirmButtonText: 'Continuar',
		cancelButtonText: 'Cancelar'
	}).then(res => {
		if (res.isConfirmed) callback()
	})
}
