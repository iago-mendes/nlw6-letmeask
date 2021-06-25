import {BrowserRouter} from 'react-router-dom'

import {AuthContextProvider} from './contexts/AuthContext'
import {ThemeProvider} from './contexts/Theme'
import {Routes} from './Routes'
import {I18nProvider} from './utils/I18nProvider'

function App() {
	return (
		<BrowserRouter>
			<I18nProvider>
				<ThemeProvider>
					<AuthContextProvider>
						<Routes />
					</AuthContextProvider>
				</ThemeProvider>
			</I18nProvider>
		</BrowserRouter>
	)
}

export default App
