import { Link, useNavigate } from "react-router-dom"
import NavBar from "../../components/navbar/navbar"
import { doctors, appointments } from "../../constants/data.js"
import Appointment from "../../components/appointment/appointment.jsx"
import "./appointments.css"

function Appointments() {
const navigate = useNavigate();
    function ClickEdit(id_appointment) {
      navigate(`/appointments/edit/${id_appointment}`)
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
                <input type="date" id="startDate" className="form-control" />
                <span className="m-2">Até</span>
                <input type="date" id="endDate" className="form-control" />
                <div className="form-control ms-3 me-3">
                    <select name="doctor" id="doctor">
                        <option value="">Todos os médicos</option>
                        {
                            doctors.map((doctor) => {
                                return <option key={doctor.id} value={doctor.id}>
                                    {doctor.name}
                                </option>
                            })
                        }
                    </select>
                </div>
                <button className="btn btn-primary">Filtrar</button>
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