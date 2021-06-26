import {MySwal} from '.'

export function successAlert(text: string) {
	MySwal.fire({
		text,
		icon: 'success',
		timer: 1000,
		showConfirmButton: false
	})
}
