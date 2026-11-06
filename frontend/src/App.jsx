import './App.css'
import { NavLink } from 'react-router-dom'

function App() {

  return (
    <>
      <h1>Please login or register</h1>
      <div className='login_register'>
        <NavLink to="/login">Login</NavLink> |
        <NavLink to="/register">Register</NavLink>
      </div>
    </>
  )
}

export default App
