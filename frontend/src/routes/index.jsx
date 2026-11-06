import { Route, Routes } from 'react-router-dom'
import App from '../App'
import Register from '../pages/Register'
import Login from '../pages/Login'

function Index() {
    return (
        <Routes>
            <Route path="/"  element={<App />}/>
            <Route path="/register" element={<Register />}> </Route>
            <Route path="/login" element={<Login />}> </Route>
        </Routes>
    )
}

export default Index