import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Home } from './pages/home';
import { RegisterScreen } from './pages/signUp';
import { LoginScreen } from './pages/login';



export default function App() {
  return (
    <Router>
      <div className="App bg">
        <Switch>
          <Route path='/' exact component ={Home} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/signup' component={RegisterScreen} />
        </Switch>  
      </div>
    </Router>
  )
}
  
