import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login/login.jsx'
import Register from './pages/registes/register.jsx'
import Appointments from './pages/appointments/appointments'


function Navigation() {
    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/appointments' element={<Appointments />} />

        </Routes>

    </BrowserRouter>
}
export default Navigation