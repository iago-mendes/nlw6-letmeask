import {t} from '@lingui/macro'

import {MySwal} from '.'

export function errorAlert(message: string, title = t`Error`) {
	MySwal.fire({
		icon: 'error',
		title,
		text: message
	})
}
