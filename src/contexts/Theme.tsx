import {createContext, useEffect, useState} from 'react'

type Theme = 'light' | 'dark'

type ThemeContextType = {
	theme: Theme
	toggleTheme: () => void
}

export const ThemeContext = createContext({} as ThemeContextType)

export const ThemeProvider: React.FC = ({children}) => {
	const [theme, setTheme] = useState<Theme>(getSavedTheme())

	useEffect(() => {
		document.body.className = theme
	}, [])

	function getSavedTheme() {
		const savedTheme = localStorage.getItem('theme')
		if (!savedTheme) return 'dark'

		return savedTheme as Theme
	}

	function toggleTheme() {
		const newTheme: Theme = theme === 'light' ? 'dark' : 'light'

		setTheme(newTheme)
		localStorage.setItem('theme', newTheme)
	}

	return (
		<ThemeContext.Provider value={{theme, toggleTheme}}>
			{children}
		</ThemeContext.Provider>
	)
}
