import {Route, Switch} from 'react-router-dom'

import {Home} from './pages/Home'
import {NewRoom} from './pages/NewRoom'
import {Room} from './pages/Room'
import {AdminRoom} from './pages/AdminRoom'
import {withPrivateRoute} from './components/withPrivateRoute'

export function Routes() {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/rooms/new" component={() => withPrivateRoute(NewRoom)} />
			<Route path="/rooms/:id" component={Room} />
			<Route
				path="/admin/rooms/:id"
				component={() => withPrivateRoute(AdminRoom, true)}
			/>
		</Switch>
	)
}
