import {useContext} from 'react'

import {ThemeContext} from '../contexts/Theme'

export function useTheme() {
	const theme = useContext(ThemeContext)
	return theme
}
