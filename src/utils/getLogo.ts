import logoLight from '../assets/images/logo.svg'
import logoDark from '../assets/images/logo-dark.svg'

import {useTheme} from '../hooks/useTheme'

export function getLogo() {
	const {theme} = useTheme()

	if (theme === 'dark') return logoDark

	return logoLight
}
