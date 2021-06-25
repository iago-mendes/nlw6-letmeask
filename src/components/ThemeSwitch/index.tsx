import Switch from 'react-switch'
import {FiSun, FiMoon} from 'react-icons/fi'

import './styles.scss'

import {useTheme} from '../../hooks/useTheme'

export function ThemeSwitch() {
	const {theme, toggleTheme} = useTheme()
	return (
		<Switch
			checked={theme === 'dark'}
			onChange={toggleTheme}
			offColor="#ffe4ad"
			offHandleColor="#ffad05"
			uncheckedIcon={
				<div style={{color: '#ffad05'}} className="themeIcon">
					<FiSun />
				</div>
			}
			onColor="#44475a"
			onHandleColor="#6272a4"
			checkedIcon={
				<div style={{color: '#6272a4'}} className="themeIcon">
					<FiMoon />
				</div>
			}
			height={30}
			width={65}
			className="theme-switch"
		/>
	)
}
