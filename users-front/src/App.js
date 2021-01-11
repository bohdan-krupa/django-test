import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import './App.css'
import Users from './components/Users'
import Groups from './components/Groups'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/groups'>
          <Groups />
        </Route>
        <Route path='/'>
          <Users />
        </Route>
      </Switch>
    </Router>
  )
}

export default App