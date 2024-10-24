import "./login.css"
import logo from "../../assets/logo.png"
import image from "../../assets/fundo.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import api from "../../constants/api";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    async function HandleLogin() {

        try {
            setMessage("")
            const response = await api.post("/admin/login", {
                email,
                password
            });

            if (response.data) {
                localStorage.setItem("admin", JSON.stringify(response.data))
                api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
                navigate("/appointments")
            } else {
                setMessage("Erro ao efetuar login.Tente novamente mais tarde.")
            }


        } catch (error) {
            if (error.response?.data.error) {

                setMessage(error.response.data.error)
            } else {
                setMessage("Erro ao efetuar login.Tente novamente mais tarde.")
            }
        }
    }


return <div className="row">
    <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
        <form className="form-signin">
            <img src={logo} className="mb-4" />
            <h5 className="mb-5">Gerencie seus agendamentos de forma descomplicada.</h5>
            <h5 className="mb-4 text-secondary">Acesse sua conta.</h5>
            <div className="mt-4">
                <input type="email" placeholder="E-mail" className="form-control" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="mt-2">
                <input type="password" placeholder="Senha" className="form-control" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mt-3 mb-5">
                <button onClick={HandleLogin} className="btn btn-primary w-100" type="button">Login</button>
            </div>
            {
                message.length > 0 &&
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            }

            <div>
                <span className="me-1">Não tenho uma conta.</span>
                <Link to="/register">Criar agora</Link>
            </div>
        </form>
    </div>
    <div className="col-sm-7">
        <img src={image} className="background-login" />

    </div>
</div>

}

export default Login