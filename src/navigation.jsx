import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login/login.jsx'
import Register from './pages/registes/register.jsx'
import Appointments from './pages/appointments/appointments'
import AppointmentAdd from './pages/appointment-add/appointment-add.jsx'


function Navigation() {
    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/appointments' element={<Appointments />} />
            <Route path='/appointments/add' element={<AppointmentAdd />} />
            <Route path='/appointments/edit/:id_appointment' element={<AppointmentAdd />} />

        </Routes>

    </BrowserRouter>
}
export default Navigation