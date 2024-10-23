import { Link, useParams } from "react-router-dom"
import NavBar from "../../components/navbar/navbar"
import { doctors, services } from "../../constants/data"

function AppointmentAdd() {

    const {id_appointment} = useParams();

    return <>
        <NavBar />
        <div className="container-fluid mt-page">
            <div className="row col-lg-4 offset-lg-4">
                <div className="col-12 mt-2">
                    <h2>
                        {
                            id_appointment ? "Editar Agendamento" : "Novo Agendamento"
                        }
                        </h2>

                </div>
                <div className="col-12 mt-4">
                    <label htmlFor="doctor" className="form-label">Médico</label>
                    <div className="form-control mb-2">
                        <select name="doctor" id="doctor">
                            <option value="0">Selecione o médico</option>
                            {
                                doctors.map((doctor) => {
                                    return <option key={doctor.id} value={doctor.id}>
                                        {doctor.name}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <label htmlFor="service" className="form-label">Serviço</label>
                    <div className="form-control mb-2">
                        <select name="service" id="service">
                            <option value="0">Selecione o serviço</option>
                            {
                                services.map((service) => {
                                    return <option key={service.id_service} value={service.id_service}>
                                        {service.description}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="bookingDate" className="form-label">Selecione a data</label>
                    <input min={new Date().toISOString().split("T")[0]} type="date" name="bookingDate" id="bookingDate" className="form-control" />
                </div>
                <div className="col-6 mt-3" >
                    <label htmlFor="bookingDate" className="form-label">Selecione o horario</label>
                  <div className="form-control mb-2">
                    <select name="bookingHour" id="bookingHour">
                        <option value="0">Selecione o horário</option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                        <option value="21:00">21:00</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end">
                        <Link to="/appointments" className="btn btn-outline-primary me-3">
                        Cancelar
                        </Link>
                        <button className="btn btn-primary ms-2">Salvas dados</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AppointmentAdd