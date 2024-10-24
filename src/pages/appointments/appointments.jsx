import { Link, useNavigate } from "react-router-dom"
import NavBar from "../../components/navbar/navbar"
// import { doctors, appointments } from "../../constants/data.js"
import Appointment from "../../components/appointment/appointment.jsx"
import "./appointments.css"
import api from "../../constants/api.js"
import { useEffect, useState } from "react"

function Appointments() {
    const [appointments, setAppointments] = useState([])
    const [doctors, setDoctors] = useState([])

    const [idDoctor, setIdDoctor] = useState("")
    const [date_start, setDateStart] = useState("")
    const [date_end, setDateEnd] = useState("")
    async function GetAppointments() {
        try {
            const result = await api.get("/admin/appointments", {
                params: {
                    id_doctor: idDoctor,
                    date_start: date_start,
                    date_end: date_end
                }
            })
            if (result.data) setAppointments(result.data)
            return result.data
        } catch (error) {
            if (error.response?.data.error) {

                if (error.response.status == 401) { return navigate("/") }
                alert(error.response.data.error)
            } else {
                alert("Erro ao buscar os dados.Tente novamente mais tarde.")
            }
        }
    }
    async function GetDoctors() {
        try {
            const result = await api.get("/doctors")
            if (result.data) setDoctors(result.data)
            return result.data
        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401) { return navigate("/") }
                alert(error.response.data.error)
            } else {
                alert("Erro ao buscar os dados.Tente novamente mais tarde.")
            }
        }
    }

    useEffect(() => {
        GetAppointments()
        GetDoctors()
    }, [])
    const navigate = useNavigate();
    function ClickEdit(id_appointment) {
        navigate(`/appointments/edit/${id_appointment}`)
    }
    function ChangeDoctor(e) {
        setIdDoctor(e.target.value)
    }

    function ClickDelete(id_appointment) {
        console.log("delete" + id_appointment)
    }
    return <div className="container-fluid mt-page">
        <NavBar />
        <div className="d-flex justify-content-between align-items-center">
            <div>
                <h2 className="d-inline">Agendamentos</h2>
                <Link to="/appointments/add" className="btn btn-outline-primary ms-5 mb-2">
                    Novo agendamento
                </Link>
            </div>
            <div className="d-flex justify-content-between" >
                <input type="date" id="startDate" className="form-control" onChange={(e) => setDateStart(e.target.value)} />
                <span className="m-2">Até</span>
                <input type="date" id="endDate" className="form-control" onChange={(e) => setDateEnd(e.target.value)} />
                <div className="form-control ms-3 me-3">
                    <select name="doctor" id="doctor" value={idDoctor} onChange={ChangeDoctor}>
                        <option value="">Todos os médicos</option>
                        {
                            doctors.map((doctor) => {
                                return <option key={doctor.id} value={doctor.id_doctor} >
                                    {doctor.name}
                                </option>
                            })
                        }
                    </select>
                </div>
                <button className="btn btn-primary" type="button" onClick={GetAppointments}>Filtrar</button>
            </div>
        </div>
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Paciente</th>
                        <th scope="col">Médico</th>
                        <th scope="col">Serviço</th>
                        <th scope="col">Data/Hora</th>
                        <th scope="col" className="text-end">Valor</th>
                        <th scope="col" className="col-buttons"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointments.map((appointment) => {
                            return <Appointment key={appointment.id}
                                id_appointment={appointment.id_appointment}
                                user={appointment.user}
                                doctor={appointment.doctor}
                                service={appointment.service}
                                booking_date={appointment.booking_date}
                                booking_hour={appointment.booking_hour}
                                price={appointment.price}
                                clickEdit={ClickEdit}
                                clickDelete={ClickDelete} />
                        })
                    }
                </tbody>
            </table>

        </div>
    </div>
}
export default Appointments