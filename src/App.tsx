import {BrowserRouter, Route, Switch} from 'react-router-dom'

import {Home} from './pages/Home'
import {NewRoom} from './pages/NewRoom'
import {AuthContextProvider} from './contexts/AuthContext'
import {Room} from './pages/Room'
import {AdminRoom} from './pages/AdminRoom'
import {ThemeProvider} from './contexts/Theme'

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider>
				<AuthContextProvider>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/rooms/new" component={NewRoom} />
						<Route path="/rooms/:id" component={Room} />
						<Route path="/admin/rooms/:id" component={AdminRoom} />
					</Switch>
				</AuthContextProvider>
			</ThemeProvider>
		</BrowserRouter>
	)
}

export default App
