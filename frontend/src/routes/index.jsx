import { Route, Routes } from 'react-router-dom'
import App from '../App'
import Register from '../pages/Register'

function Index() {
    return (
        <Routes>
            <Route path="/"  element={<App />}/>
            <Route path="/register" element={<Register />}> </Route>
        </Routes>
    )
}

export default Index