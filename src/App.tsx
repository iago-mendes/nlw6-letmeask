import {BrowserRouter} from 'react-router-dom'

import {AuthContextProvider} from './contexts/AuthContext'
import {ThemeProvider} from './contexts/Theme'
import {Routes} from './Routes'

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider>
				<AuthContextProvider>
					<Routes />
				</AuthContextProvider>
			</ThemeProvider>
		</BrowserRouter>
	)
}

export default App
