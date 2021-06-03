import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { RegisterScreen } from './pages/signUp';
import { LoginScreen } from './pages/login';



export default function App() {
  return (
    <Router>
      <div className="App bg">
        <Switch>
          <Route path='/' exact component ={LoginScreen} />
          {/* <Route path='/login' component={LoginScreen} />
          <Route path='/logout' component={Logout} />
          <Route path='/signup' component={Signup} /> */}
        </Switch>  
      </div>
    </Router>
  )
}
  
